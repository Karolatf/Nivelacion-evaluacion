// SISTEMA DE TRANSACCIONES Y CONTROL DE RIESGO
// Este módulo centraliza la lógica de validación estructural, integridad financiera y auditoría de riesgos.

// FUNCIÓN CALLBACK (Validación de Estructura)
// JUSTIFICACIÓN: Se utiliza un callback para simular una validación de esquema externa (tipo Middleware).
// Es asincrónica para representar el tiempo de respuesta de un validador de sintaxis de datos.
function validarEstructuraTransaccion(transaccion, callback) {

  setTimeout(() => {
    try {
      // Verificación de integridad del objeto: descartamos valores nulos o tipos no compatibles.
      if (typeof transaccion !== "object" || transaccion === null) {
        throw new Error("La transaccion no es un objeto valido");
      }

      // Validación del ID: debe ser estrictamente numérico y positivo para ser un identificador único.
      if (typeof transaccion.id !== "number" || isNaN(transaccion.id) || transaccion.id <= 0) {
        throw new Error("ID invalido");
      }

      // Validación de Usuario: aseguramos que el campo no contenga cadenas vacías o solo espacios.
      if (typeof transaccion.usuario !== "string" || transaccion.usuario.trim() === "") {
        throw new Error("Usuario invalido");
      }

      // Validación del Monto: se verifica que el dato sea de tipo number antes de cualquier operación matemática.
      if (typeof transaccion.monto !== "number") {
        throw new Error("Monto invalido");
      }

      // Consistencia del Tipo: solo se admiten las categorías financieras "ingreso" o "egreso".
      if (transaccion.tipo !== "ingreso" && transaccion.tipo !== "egreso") {
        throw new Error("Tipo de transaccion invalido");
      }

      // Integridad de Autorización: debe ser un booleano estricto para la clasificación de riesgo.
      if (typeof transaccion.autorizada !== "boolean") {
        throw new Error("Estado de autorizacion invalido");
      }

      // Si supera las pruebas, devolvemos la transacción original para el siguiente proceso.
      callback(null, transaccion);

    } catch (error) {
      // Gestión de errores por callback (Error-First Callback) para reportar fallas técnicas.
      callback(error, null);
    }
  }, 300);
}


// FUNCIÓN CON PROMESA (Validación Lógica de Monto)
// JUSTIFICACIÓN: Las promesas son ideales para procesos de evaluación de reglas de negocio que dependen de cálculos.
function validarMontoTransaccion(transaccion) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Verificamos que el monto sea un valor operable matemáticamente.
      if (isNaN(transaccion.monto)) {
        reject(new Error("El monto no es un numero valido"));
      } else {
        resolve(transaccion);
      }
    }, 300);
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT (Coordinación y Auditoría)
// JUSTIFICACIÓN: Se usa async/await para leer el flujo de validaciones como un proceso secuencial y ordenado.
export async function procesarTransaccionesEj4(transacciones) {

  // Definimos estructuras de datos independientes (listas) para clasificar las transacciones según su estado.
  // Requisito: Se retornan arreglos completos, no solo contadores, para trazabilidad total.
  const validas = [];
  const sospechosas = [];
  const invalidas = [];

  // Acumuladores numéricos para el balance financiero (Ingresos y Egresos).
  let totalIngresos = 0;
  let totalEgresos = 0;

  try {
    // Verificación de integridad de la entrada principal.
    if (!Array.isArray(transacciones)) {
      throw new Error("Las transacciones deben ser un arreglo");
    }

    // APLICACIÓN DEL PRINCIPIO DE INMUTABILIDAD
    // Creamos una copia superficial (Shallow Copy) mediante el operador Spread (...) para no alterar el origen de datos.
    const copiaTransacciones = [...transacciones];

    // Recorremos el lote de transacciones de forma secuencial.
    for (let i = 0; i < copiaTransacciones.length; i++) {
      const transaccion = copiaTransacciones[i];

      try {
        // PASO 1: Promisificación del Callback para estandarizar el flujo asincrónico.
        const estructuraValida = await new Promise((resolve, reject) => {
          validarEstructuraTransaccion(transaccion, (error, data) => {
            if (error) reject(error); else resolve(data);
          });
        });

        // PASO 2: Resolución de la promesa de validación lógica de montos.
        const transaccionValida = await validarMontoTransaccion(estructuraValida);

        // PASO 3: CLASIFICACIÓN DE RIESGO Y PROCESAMIENTO MATEMÁTICO
        // Evaluación del indicador de autorización: determina si es 'Válida' o 'Sospechosa'.
        if (transaccionValida.autorizada === true) {
          
          validas.push(transaccionValida);

          // Lógica de acumuladores según el tipo de flujo financiero.
          if (transaccionValida.tipo === "ingreso") {
            totalIngresos = totalIngresos + transaccionValida.monto;
          } else {
            // Nota: Se asume que los egresos pueden venir positivos o negativos; aquí se suma el valor tal cual.
            totalEgresos = totalEgresos + transaccionValida.monto;
          }

        } else {
          // Si los datos son correctos pero no hubo autorización, se clasifica como Sospechosa (Punto 2 de la guía).
          sospechosas.push(transaccionValida);
        }

      } catch (errorInterno) {
        // Gestión de errores individuales: evita que una transacción corrupta bloquee el análisis de las demás.
        invalidas.push({
          transaccion: transaccion,
          motivo: errorInterno.message
        });
      }
    }

    // RETORNO CONSOLIDADO DE INDICADORES
    return {
      totalProcesadas: copiaTransacciones.length,
      validas: validas,
      sospechosas: sospechosas,
      invalidas: invalidas,
      totalIngresos: totalIngresos,
      totalEgresos: totalEgresos,
      // Balance Final: Cálculo matemático neto del flujo de caja.
      balanceFinal: totalIngresos + totalEgresos
    };

  } catch (errorGeneral) {
    // Captura de errores críticos del sistema (ej: si no se recibe un arreglo).
    return {
      estado: "ERROR",
      mensaje: errorGeneral.message
    };
  }
}