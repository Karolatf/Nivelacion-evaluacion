// SISTEMA DE GESTION DE SOLICITUDES DE SOPORTE
// Este archivo contiene la logica completa del Ejercicio 21 (ejercicio 3 de Paulo)


// FUNCION DE VALIDACION (NO SE EXPORTA)
// Valida los datos basicos de la solicitud
// Si falla lanza un Error
function validarSolicitud(solicitud) {

  // Se valida que el ID sea un numero
  if (typeof solicitud.id !== "number" || isNaN(solicitud.id)) {
    throw new Error("ID invalido");
  }

  // Se valida que el usuario sea un string
  if (typeof solicitud.usuario !== "string") {
    throw new Error("Usuario invalido");
  }

  // Se valida que el tipo sea hardware, software o red
  const tiposPermitidos = ["hardware", "software", "red"];
  if (!tiposPermitidos.includes(solicitud.tipo)) {
    throw new Error("Tipo de solicitud no permitido");
  }

  // Se valida que la prioridad sea un numero entre 1 y 5
  if (typeof solicitud.prioridad !== "number" || isNaN(solicitud.prioridad) || solicitud.prioridad < 1 || solicitud.prioridad > 5) {
    throw new Error("Prioridad fuera de rango (1 a 5)");
  }

  // Se valida que el estado sea exactamente "pendiente"
  if (solicitud.estado !== "pendiente") {
    throw new Error("Estado inicial invalido");
  }

  // Si todas las validaciones son correctas, retorna true
  return true;
}


// FUNCION DE CLASIFICACION (FUNCION PURA)
// Clasifica la solicitud segun su prioridad
// No modifica el objeto recibido
function clasificarSolicitud(solicitud) {

  // Variable para almacenar la clasificacion
  let clasificacion;
  let nuevoEstado;

  // Se clasifica segun el nivel de prioridad
  // Prioridad alta: 4 o 5
  if (solicitud.prioridad >= 4) {
    clasificacion = "ALTA";
    nuevoEstado = "escalado";
  }
  // Prioridad media: 2 o 3
  else if (solicitud.prioridad >= 2) {
    clasificacion = "MEDIA";
    nuevoEstado = "en_proceso";
  }
  // Prioridad baja: 1
  else {
    clasificacion = "BAJA";
    nuevoEstado = "en_proceso";
  }

  // Se retorna un nuevo objeto con la clasificacion y nuevo estado
  // Se garantiza inmutabilidad usando spread operator
  return {
    ...solicitud,
    clasificacion: clasificacion,
    estadoFinal: nuevoEstado
  };
}


// FUNCION CALLBACK (NO SE EXPORTA)
// Simula el envio de la solicitud con callback
// Justificacion: callbacks permiten simular validaciones externas asincronas
function enviarConCallback(solicitud, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    // Se retorna el resultado mediante callback
    const mensaje = "Solicitud " + solicitud.id + " enviada con callback";
    callback(null, mensaje);

  }, 300);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Simula el envio de la solicitud con promesa
// Justificacion: promesas permiten manejo moderno de operaciones asincronas
function enviarConPromesa(solicitud) {

  // Se retorna una promesa
  return new Promise((resolve) => {

    // setTimeout simula un proceso asincronico
    setTimeout(() => {

      // Se resuelve la promesa con el resultado
      const mensaje = "Solicitud " + solicitud.id + " enviada con promesa";
      resolve(mensaje);

    }, 400);
  });
}


// FUNCION ASYNC/AWAIT (NO SE EXPORTA)
// Simula el envio de la solicitud con async/await
// Justificacion: async/await facilita la coordinacion de flujos asincronos
async function enviarConAsync(solicitud) {

  // Se retorna una promesa
  return new Promise((resolve) => {

    // setTimeout simula un proceso asincronico
    setTimeout(() => {

      // Se resuelve la promesa con el resultado
      const mensaje = "Solicitud " + solicitud.id + " enviada con async/await";
      resolve(mensaje);

    }, 500);
  });
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
// Justificacion: async/await coordina todo el flujo de validacion y procesamiento
export async function procesarSolicitudesEj21(solicitudes) {

  // Arreglo para almacenar solicitudes procesadas
  const procesadas = [];

  // Arreglo para almacenar solicitudes rechazadas
  const rechazadas = [];

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
        // Se valida la solicitud
        validarSolicitud(solicitud);

        // CLASIFICACION
        // Se clasifica la solicitud segun su prioridad
        const solicitudClasificada = clasificarSolicitud(solicitud);

        // PROCESO ASINCRONO CON CALLBACK
        // Se envuelve el callback en una promesa
        await new Promise((resolve, reject) => {

          // Se ejecuta el envio con callback
          enviarConCallback(solicitud, (error, mensaje) => {

            // Si hay error se rechaza
            if (error) {
              reject(error);
            } else {
              // Si no hay error se muestra el mensaje y se resuelve
              console.log(mensaje);
              resolve();
            }
          });
        });

        // PROCESO ASINCRONO CON PROMESA
        const mensajePromesa = await enviarConPromesa(solicitud);
        console.log(mensajePromesa);

        // PROCESO ASINCRONO CON ASYNC/AWAIT
        const mensajeAsync = await enviarConAsync(solicitud);
        console.log(mensajeAsync);

        // Se muestra mensaje de procesamiento exitoso
        console.log("Solicitud " + solicitud.id + " procesada correctamente");

        // Se agrega a solicitudes procesadas
        // Se garantiza inmutabilidad
        procesadas.push(solicitudClasificada);

      } catch (errorValidacion) {

        // Si falla la validacion se agrega al arreglo de rechazadas
        // Se muestra el motivo del rechazo
        console.log("Solicitud " + (solicitud.id || "desconocido") + " rechazada: " + errorValidacion.message);

        rechazadas.push({
          id: solicitud.id ?? "desconocido",
          estadoFinal: "rechazada",
          motivo: errorValidacion.message
        });
      }
    }

    // Se muestra mensaje de confirmacion del proceso asincronico
    console.log("\nProceso asincronico completado");

    // Se retorna un objeto con todos los resultados
    // Se incluye el arreglo original sin modificaciones
    return {
      originales: solicitudes,
      procesadas: procesadas,
      rechazadas: rechazadas
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna error controlado
    return {
      originales: [],
      procesadas: [],
      rechazadas: [],
      error: errorGeneral.message
    };
  }
}