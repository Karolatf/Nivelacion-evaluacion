// SISTEMA DE GESTION Y VALIDACION DE SOLICITUDES DE SOPORTE TECNICO
// Este archivo contiene la logica completa del Ejercicio 18 (ejercicio 3 de Manuel)


// FUNCION CALLBACK (NO SE EXPORTA)
// Se usa callback para validar datos iniciales de la solicitud
// Justificacion: callbacks permiten simular validaciones externas asincronas
function validarSolicitudCallback(solicitud, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    try {

      // Se valida que el ID sea un numero
      if (typeof solicitud.id !== "number") {
        throw new Error("ID invalido");
      }

      // Se valida que el usuario sea un string no vacio
      if (typeof solicitud.usuario !== "string" || solicitud.usuario.trim() === "") {
        throw new Error("Usuario invalido");
      }

      // Se valida que el tipo sea valido
      const tiposPermitidos = ["hardware", "software", "red"];
      if (!tiposPermitidos.includes(solicitud.tipo)) {
        throw new Error("Tipo de solicitud invalido");
      }

      // Se valida que el nivel sea un numero entero entre 1 y 5
      if (!Number.isInteger(solicitud.nivel) || solicitud.nivel < 1 || solicitud.nivel > 5) {
        throw new Error("Nivel fuera de rango (1 a 5)");
      }

      // Se valida que activo sea booleano
      if (typeof solicitud.activo !== "boolean") {
        throw new Error("Estado activo invalido");
      }

      // Si activo es false se rechaza
      if (solicitud.activo !== true) {
        throw new Error("La solicitud esta inactiva");
      }

      // Si todas las validaciones son correctas se retorna la solicitud
      callback(null, solicitud);

    } catch (error) {

      // Si hay error se retorna mediante callback
      callback(error, null);
    }

  }, 300);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Se usa promesa para clasificar solicitudes por nivel de urgencia
// Justificacion: promesas permiten manejo moderno de operaciones asincronas
function clasificarPorNivelPromesa(solicitud) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // setTimeout simula tiempo de procesamiento
    setTimeout(() => {

      // Se clasifica segun el nivel de urgencia
      // Alta: nivel 4 o 5
      if (solicitud.nivel >= 4) {

        resolve({
          ...solicitud,
          prioridad: "ALTA"
        });

      } else if (solicitud.nivel >= 2) {

        // Media: nivel 2 o 3
        resolve({
          ...solicitud,
          prioridad: "MEDIA"
        });

      } else {

        // Baja: nivel 1
        resolve({
          ...solicitud,
          prioridad: "BAJA"
        });
      }

    }, 500);
  });
}


// FUNCION ASYNC/AWAIT (NO SE EXPORTA)
// Se usa async/await para procesar cada solicitud individualmente
// Justificacion: async/await facilita la coordinacion de flujos asincronos
async function procesarSolicitudIndividual(solicitud) {

  try {

    // Se espera la clasificacion por nivel
    const solicitudClasificada = await clasificarPorNivelPromesa(solicitud);

    // Se retorna la solicitud procesada
    return {
      id: solicitudClasificada.id,
      usuario: solicitudClasificada.usuario,
      tipo: solicitudClasificada.tipo,
      nivel: solicitudClasificada.nivel,
      prioridad: solicitudClasificada.prioridad,
      estadoFinal: "PROCESADA"
    };

  } catch (error) {

    // Si falla se retorna el error
    return {
      id: solicitud.id,
      estadoFinal: "ERROR",
      motivo: error.message
    };
  }
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
// Justificacion: async/await coordina todo el flujo de validacion y procesamiento
export async function procesarSolicitudesEj18(solicitudes) {

  // Arreglos para almacenar resultados
  const validas = [];
  const invalidas = [];

  // Contadores para resumen
  let totalRecibidas = 0;
  let totalValidas = 0;
  let totalInvalidas = 0;

  try {

    // Se valida que la entrada sea un arreglo
    if (!Array.isArray(solicitudes)) {
      throw new Error("La entrada debe ser un arreglo de solicitudes");
    }

    // Se obtiene el total de solicitudes
    totalRecibidas = solicitudes.length;

    // VALIDACION Y PROCESAMIENTO DE SOLICITUDES
    // Se recorre el arreglo usando ciclo for
    for (let i = 0; i < solicitudes.length; i++) {

      // Se obtiene la solicitud actual
      const solicitud = solicitudes[i];

      // VALIDACION CON CALLBACK
      // Se envuelve el callback en una promesa
      const solicitudValidada = await new Promise((resolve, reject) => {

        // Se ejecuta la validacion
        validarSolicitudCallback(solicitud, (error, data) => {

          // Si hay error se rechaza
          if (error) {
            reject(error);
          } else {
            // Si no hay error se resuelve
            resolve(data);
          }
        });
      });

      // Si la validacion fue exitosa se procesa la solicitud
      const resultado = await procesarSolicitudIndividual(solicitudValidada);

      // Se agrega a solicitudes validas
      validas.push(resultado);
      totalValidas = totalValidas + 1;

    }

    // Se capturan errores individuales por solicitud
  } catch (errorValidacion) {

    // Si falla se verifica si es error de validacion individual
    if (errorValidacion.message) {

      // Se agrega a invalidas
      invalidas.push({
        id: solicitudes[invalidas.length]?.id ?? null,
        motivo: errorValidacion.message
      });
      totalInvalidas = totalInvalidas + 1;
    }
  }

  // PROCESAMIENTO DE SOLICITUDES RESTANTES
  // Se continua procesando las demas solicitudes
  for (let i = validas.length; i < solicitudes.length; i++) {

    const solicitud = solicitudes[i];

    try {

      // VALIDACION CON CALLBACK
      const solicitudValidada = await new Promise((resolve, reject) => {

        validarSolicitudCallback(solicitud, (error, data) => {

          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });

      // PROCESAMIENTO CON ASYNC/AWAIT
      const resultado = await procesarSolicitudIndividual(solicitudValidada);

      validas.push(resultado);
      totalValidas = totalValidas + 1;

    } catch (error) {

      // Si falla se agrega a invalidas
      invalidas.push({
        id: solicitud.id ?? null,
        motivo: error.message
      });
      totalInvalidas = totalInvalidas + 1;
    }
  }

  // Se retorna el objeto con todos los resultados
  return {
    resumen: {
      totalRecibidas: totalRecibidas,
      validas: totalValidas,
      invalidas: totalInvalidas
    },
    solicitudesValidas: validas,
    solicitudesInvalidas: invalidas
  };
}