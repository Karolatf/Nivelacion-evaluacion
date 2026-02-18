// SISTEMA DE ANÁLISIS Y VALIDACIÓN POR LOTES
// Este módulo centraliza la lógica de procesamiento asíncrono y validación de operaciones matemáticas.

// FUNCIÓN DE VALIDACIÓN CON CALLBACK
// JUSTIFICACIÓN: Se implementa un callback para realizar la validación inicial de esquema. 
// Esto permite simular una verificación de integridad de datos antes de proceder a cálculos costosos.
function validarDatosCallback(operacion, callback) {

  // Simulamos un retraso asincrónico para representar la latencia de un validador de reglas de negocio.
  setTimeout(() => {
    try {
      // Verificación de existencia: Aseguramos que la operación posea un identificador único (requisito del PDF).
      if (operacion.id === undefined || operacion.id === null) {
        throw new Error("La operacion no tiene identificador");
      }

      // Validación del indicador lógico: Si la operación no está activa, se rechaza según las reglas definidas.
      if (operacion.activo !== true) {
        throw new Error("La operacion esta desactivada");
      }

      // Validación de estructura: Comprobamos que existan valores numéricos para procesar (evita arreglos vacíos).
      if (!Array.isArray(operacion.valores) || operacion.valores.length === 0) {
        throw new Error("El arreglo de valores es invalido o esta vacio");
      }

      // CICLO DE VALIDACIÓN TÉCNICA: Justificado para asegurar que cada elemento del lote sea del tipo esperado.
      for (let i = 0; i < operacion.valores.length; i++) {
        // Garantizamos que no existan valores no numéricos que corrompan los cálculos matemáticos.
        if (typeof operacion.valores[i] !== "number") {
          throw new Error("Existen valores no numericos en la operacion");
        }
      }

      // Definición de tipos reconocidos: Solo permitimos operaciones con lógica matemática predefinida.
      const tiposValidos = ["suma", "promedio", "multiplicacion"];
      if (!tiposValidos.includes(operacion.tipo)) {
        throw new Error("Tipo de operacion no reconocido");
      }

      // Si la integridad es correcta, retornamos la operación para el procesamiento asíncrono.
      callback(null, operacion);

    } catch (error) {
      // Retornamos el error de forma controlada mediante el patrón Error-First Callback.
      callback(error, null);
    }
  }, 200);
}


// FUNCIÓN DE CÁLCULO (Función Pura)
// JUSTIFICACIÓN: Se diseña como función pura para realizar cálculos intermedios (Punto 3 del PDF) sin efectos secundarios.
// RECIBE: Objeto con valores numéricos. RETORNA: Resultado matemático (Number).
function calcularOperacion(operacion) {

  let resultado = 0;

  // Lógica de bifurcación basada en el tipo de operación:
  if (operacion.tipo === "suma") {
    // Aplicamos operador matemático de adición sobre el arreglo de valores.
    for (let i = 0; i < operacion.valores.length; i++) {
      resultado = resultado + operacion.valores[i];
    }
  }

  if (operacion.tipo === "promedio") {
    let suma = 0;
    for (let i = 0; i < operacion.valores.length; i++) {
      suma = suma + operacion.valores[i];
    }
    // Calculamos la media aritmética como resultado parcial.
    resultado = suma / operacion.valores.length;
  }

  if (operacion.tipo === "multiplicacion") {
    resultado = 1; // Elemento neutro de la multiplicación.
    for (let i = 0; i < operacion.valores.length; i++) {
      resultado = resultado * operacion.valores[i];
    }
  }

  return resultado;
}


// PROMESA ASINCRÓNICA (Procesamiento con Tiempo Variable)
// JUSTIFICACIÓN: Se utiliza una Promesa para cumplir con el requisito del PDF de simular un tiempo variable de validación.
function procesarOperacionAsync(operacion) {

  return new Promise((resolve) => {

    // SIMULACIÓN DE TIEMPO VARIABLE: Generamos un retardo aleatorio entre 500ms y 2500ms (Punto "Procesamiento asíncrono" del PDF).
    const tiempo = Math.floor(Math.random() * 2000) + 500;

    setTimeout(() => {
      try {
        // Ejecutamos los cálculos intermedios.
        const resultado = calcularOperacion(operacion);

        // Condición lógica final: El resultado debe ser positivo para ser aprobado.
        if (resultado <= 0) {
          throw new Error("Resultado invalido: debe ser mayor a cero");
        }

        // Resolución exitosa de la operación.
        resolve({
          id: operacion.id,
          estado: "APROBADA",
          motivo: "Operacion valida. Resultado: " + resultado
        });

      } catch (error) {
        // Resolución controlada ante fallos lógicos (Rechazo justificado).
        resolve({
          id: operacion.id,
          estado: "RECHAZADA",
          motivo: error.message
        });
      }
    }, tiempo);
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// JUSTIFICACIÓN: Coordina el flujo por lotes garantizando que el sistema continúe aun ante fallos individuales.
export async function procesarTransaccionesEj5(operaciones) {

  const reporte = [];

  try {
    // Validación de entrada para asegurar que el lote sea una estructura iterable.
    if (!Array.isArray(operaciones)) {
      throw new Error("Las operaciones deben ser un arreglo");
    }

    // CICLO FOR CLÁSICO: Justificado por su capacidad de manejar 'await' de forma secuencial y ordenada.
    for (let i = 0; i < operaciones.length; i++) {

      try {
        // INMUTABILIDAD: Creamos una copia superficial del objeto para no alterar el lote original (Punto "Inmutabilidad" del PDF).
        const operacionCopia = { ...operaciones[i] };

        // Integración de Callback promidificado:
        const operacionValidada = await new Promise((resolve, reject) => {
          validarDatosCallback(operacionCopia, (error, data) => {
            if (error) reject(error); else resolve(data);
          });
        });

        // Ejecución de la Promesa con tiempo variable:
        const resultado = await procesarOperacionAsync(operacionValidada);

        // Almacenamos el resultado en el reporte final.
        reporte.push(resultado);

      } catch (error) {
        // MANEJO DE ERRORES: Capturamos fallos individuales (datos inválidos, desactivados, etc.) sin bloquear el flujo.
        reporte.push({
          id: operaciones[i]?.id ?? "SIN ID",
          estado: "RECHAZADA",
          motivo: error.message
        });
      }
    }

    // Retornamos el consolidado de operaciones procesadas.
    return reporte;

  } catch (errorGeneral) {
    // Captura de errores críticos del sistema.
    return [{
      id: "SISTEMA",
      estado: "ERROR",
      motivo: errorGeneral.message
    }];
  }
}