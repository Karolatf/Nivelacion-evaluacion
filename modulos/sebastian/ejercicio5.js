// EJERCICIO 5 - SISTEMA DE ANÁLISIS Y VALIDACIÓN POR LOTES
// Este archivo contiene TODA la lógica del ejercicio


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// ESTA FUNCIÓN SÍ SE EXPORTA
// Es la única función visible para el menú general
export async function procesarTransaccionesEj5(operaciones) {

  // Arreglo donde se almacenan los resultados finales
  const reporte = [];

  // Se recorre el arreglo usando un ciclo for clásico
  for (let i = 0; i < operaciones.length; i++) {

    try {

      // Se clona la operación para garantizar inmutabilidad
      const operacionCopia = { ...operaciones[i] };

      // Procesamiento asincrónico
      // Se valida y procesa la operación
      const resultado = await validarOperacionAsync(operacionCopia);

      // Se almacena el resultado
      reporte.push(resultado);

    } catch (error) {

      // Manejo de error sin detener el flujo
      // Si una operación falla, se registra pero el sistema continúa
      reporte.push({
        id: operaciones[i]?.id ?? "SIN ID",
        estado: "RECHAZADA",
        motivo: error.message
      });
    }
  }

  // Se retorna el arreglo completo con todos los resultados
  return reporte;
}


// FUNCIÓN CON PROMESA (NO SE EXPORTA)
// Valida y procesa una operación simulando tiempo variable
function validarOperacionAsync(operacion) {

  // Se retorna una promesa
  return new Promise((resolve) => {

    // Se calcula un tiempo de procesamiento variable (entre 500ms y 2500ms)
    const tiempo = Math.floor(Math.random() * 2000) + 500;

    // setTimeout simula un proceso asincrónico
    setTimeout(() => {

      try {

        // Se validan los datos de la operación
        validarDatos(operacion);

        // Se calcula el resultado de la operación
        const resultado = calcularOperacion(operacion);

        // Se valida que el resultado sea mayor a cero
        if (resultado <= 0) {
          throw new Error("Resultado inválido: debe ser mayor a cero");
        }

        // Si todo es correcto, se resuelve la promesa con operación aprobada
        resolve({
          id: operacion.id,
          estado: "APROBADA",
          motivo: `Operación válida. Resultado: ${resultado}`
        });

      } catch (error) {

        // Si ocurre un error, se resuelve la promesa con operación rechazada
        resolve({
          id: operacion.id,
          estado: "RECHAZADA",
          motivo: error.message
        });
      }

    }, tiempo);
  });
}


// FUNCIÓN DE VALIDACIÓN (NO SE EXPORTA)
// Valida coherencia y tipos de datos de la operación
function validarDatos(operacion) {

  // Se valida que la operación tenga identificador
  if (operacion.id === undefined) {
    throw new Error("La operación no tiene identificador");
  }

  // Se valida que la operación esté activa
  if (operacion.activo !== true) {
    throw new Error("La operación está desactivada");
  }

  // Se valida que los valores sean un arreglo no vacío
  if (!Array.isArray(operacion.valores) || operacion.valores.length === 0) {
    throw new Error("El arreglo de valores es inválido o está vacío");
  }

  // Se recorre el arreglo de valores
  for (let valor of operacion.valores) {

    // Se valida que cada valor sea numérico
    if (typeof valor !== "number") {
      throw new Error("Existen valores no numéricos en la operación");
    }
  }

  // Se define un arreglo con los tipos de operación válidos
  const tiposValidos = ["suma", "promedio", "multiplicacion"];

  // Se valida que el tipo de operación sea uno de los permitidos
  if (!tiposValidos.includes(operacion.tipo)) {
    throw new Error("Tipo de operación no reconocido");
  }
}


// FUNCIÓN DE CÁLCULO (NO SE EXPORTA)
// Realiza el cálculo matemático según el tipo de operación
function calcularOperacion(operacion) {

  // Variable para almacenar el resultado
  let resultado = 0;

  // Cálculo según el tipo de operación

  // Si es suma, se suman todos los valores
  if (operacion.tipo === "suma") {
    for (let valor of operacion.valores) {
      resultado += valor;
    }
  }

  // Si es promedio, se calcula la media aritmética
  if (operacion.tipo === "promedio") {
    let suma = 0;
    for (let valor of operacion.valores) {
      suma += valor;
    }
    resultado = suma / operacion.valores.length;
  }

  // Si es multiplicación, se multiplican todos los valores
  if (operacion.tipo === "multiplicacion") {
    resultado = 1;
    for (let valor of operacion.valores) {
      resultado *= valor;
    }
  }

  // Se retorna el resultado del cálculo
  return resultado;
}