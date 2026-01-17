// SISTEMA DE SOLICITUD DE INGRESOS
// Este archivo contiene la logica completa del Ejercicio 20 (ejercicio 2 de Paulo)


// FUNCION DE VALIDACION (NO SE EXPORTA)
// Valida los datos basicos de la solicitud
// Si falla lanza un Error
function validarSolicitud(solicitud) {

  // Se valida que el identificador sea un numero
  if (typeof solicitud.id !== "number" || isNaN(solicitud.id)) {
    throw new Error("Identificador invalido");
  }

  // Se valida que el valor sea un numero
  if (typeof solicitud.valor !== "number" || isNaN(solicitud.valor)) {
    throw new Error("Valor invalido");
  }

  // Se valida que el estado sea un string
  if (typeof solicitud.estado !== "string" || solicitud.estado.trim() === "") {
    throw new Error("Estado invalido");
  }

  // Se valida que aprobado sea booleano
  if (typeof solicitud.aprobado !== "boolean") {
    throw new Error("Indicador de aprobacion invalido");
  }

  // Si todas las validaciones son correctas, retorna true
  return true;
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Simula validacion externa de la solicitud
// Justificacion: promesas permiten simular consultas externas asincronas
function validarExternaPromesa(solicitud) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // setTimeout simula un proceso asincronico
    setTimeout(() => {

      // Se valida que el valor sea mayor a cero
      if (solicitud.valor <= 0) {
        reject(new Error("Valor debe ser mayor a cero"));
        return;
      }

      // Si la validacion es correcta, se resuelve la promesa
      resolve(solicitud);

    }, 400);
  });
}


// FUNCION DE DECISION (FUNCION PURA)
// Determina el estado final de la solicitud
// No modifica el objeto recibido
function determinarEstadoFinal(solicitud) {

  // Se aprueba si el indicador es true y el valor es mayor a 100
  if (solicitud.aprobado === true && solicitud.valor > 100) {
    return {
      estadoFinal: "APROBADA",
      motivo: "Solicitud cumple criterios de aprobacion"
    };
  }

  // Se rechaza si el indicador es false
  if (solicitud.aprobado === false) {
    return {
      estadoFinal: "RECHAZADA",
      motivo: "Solicitud no autorizada"
    };
  }

  // Estado intermedio: aprobado pero valor bajo
  if (solicitud.aprobado === true && solicitud.valor <= 100) {
    return {
      estadoFinal: "REVISION",
      motivo: "Requiere validacion adicional por monto bajo"
    };
  }

  // Caso por defecto
  return {
    estadoFinal: "PENDIENTE",
    motivo: "No cumple criterios definidos"
  };
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
// Justificacion: async/await coordina todo el flujo de validacion y procesamiento
export async function procesarSolicitudesEj20(solicitudes) {

  // Arreglos para almacenar resultados
  const aprobadas = [];
  const rechazadas = [];
  const errores = [];

  // Contadores para resumen general
  let totalAprobadas = 0;
  let totalRechazadas = 0;
  let totalErrores = 0;

  try {

    // Se valida que la entrada sea un arreglo
    if (!Array.isArray(solicitudes)) {
      throw new Error("La entrada debe ser un arreglo de solicitudes");
    }

    // PROCESAMIENTO DE SOLICITUDES
    // Se recorre el arreglo usando ciclo for clasico
    for (let i = 0; i < solicitudes.length; i++) {

      // Se obtiene la solicitud actual
      const solicitud = solicitudes[i];

      try {

        // VALIDACION DE DATOS
        // Se valida la estructura basica
        validarSolicitud(solicitud);

        // VALIDACION EXTERNA CON PROMESA
        // Se ejecuta validacion asincronica externa
        const solicitudValidada = await validarExternaPromesa(solicitud);

        // DECISION FINAL
        // Se determina el estado final segun reglas de negocio
        const decision = determinarEstadoFinal(solicitudValidada);

        // Se crea un nuevo objeto con el estado final
        // Se garantiza inmutabilidad usando spread operator
        const resultado = {
          ...solicitudValidada,
          estadoFinal: decision.estadoFinal,
          motivo: decision.motivo
        };

        // Se clasifica segun el estado final
        if (decision.estadoFinal === "APROBADA" || decision.estadoFinal === "REVISION") {
          aprobadas.push(resultado);
          totalAprobadas = totalAprobadas + 1;
        } else {
          rechazadas.push(resultado);
          totalRechazadas = totalRechazadas + 1;
        }

        // Se muestra resumen individual
        console.log("Solicitud " + solicitud.id + " - Estado: " + decision.estadoFinal + " - Motivo: " + decision.motivo);

      } catch (errorValidacion) {

        // Si falla la validacion se agrega al arreglo de errores
        // No se detiene el procesamiento de las demas
        errores.push({
          id: solicitud.id ?? null,
          error: errorValidacion.message
        });

        totalErrores = totalErrores + 1;

        console.log("Solicitud " + (solicitud.id || "desconocido") + " - Error: " + errorValidacion.message);
      }
    }

    // Se retorna un objeto con todos los resultados
    // Se incluye el arreglo original sin modificaciones
    return {
      originales: solicitudes,
      aprobadas: aprobadas,
      rechazadas: rechazadas,
      errores: errores,
      resumen: {
        totalAprobadas: totalAprobadas,
        totalRechazadas: totalRechazadas,
        totalErrores: totalErrores
      }
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna error controlado
    return {
      originales: [],
      aprobadas: [],
      rechazadas: [],
      errores: [],
      resumen: {
        totalAprobadas: 0,
        totalRechazadas: 0,
        totalErrores: 0
      },
      error: errorGeneral.message
    };
  }
}