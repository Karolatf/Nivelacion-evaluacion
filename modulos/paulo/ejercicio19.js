// SISTEMA DE SIMULACION DE PROCESAMIENTO DE SOLICITUDES DE SOPORTE TECNICO
// Este archivo contiene la logica completa del Ejercicio 19 (ejercicio 1 de Paulo)


// FUNCION CALLBACK (NO SE EXPORTA)
// Se usa callback para validar datos iniciales de la solicitud
// Justificacion: callbacks permiten simular validaciones externas asincronas
function validarSolicitudCallback(solicitud, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    try {

      // Se valida que el ID sea un numero
      if (typeof solicitud.id !== "number" || isNaN(solicitud.id)) {
        throw new Error("ID invalido");
      }

      // Se valida que el usuario sea un string no vacio
      if (typeof solicitud.usuario !== "string" || solicitud.usuario.trim() === "") {
        throw new Error("Usuario invalido");
      }

      // Se valida que el area sea un string no vacio
      if (typeof solicitud.area !== "string" || solicitud.area.trim() === "") {
        throw new Error("Area invalida");
      }

      // Se valida que el tipoProblema sea un string no vacio
      if (typeof solicitud.tipoProblema !== "string" || solicitud.tipoProblema.trim() === "") {
        throw new Error("Tipo de problema invalido");
      }

      // Se valida que la prioridad sea un numero entre 1 y 5
      if (typeof solicitud.prioridad !== "number" || isNaN(solicitud.prioridad) || solicitud.prioridad < 1 || solicitud.prioridad > 5) {
        throw new Error("Prioridad fuera de rango (1 a 5)");
      }

      // Se valida que el estado sea exactamente "pendiente"
      if (solicitud.estado !== "pendiente") {
        throw new Error("Estado debe ser pendiente");
      }

      // Si todas las validaciones son correctas se retorna la solicitud
      callback(null, solicitud);

    } catch (error) {

      // Si hay error se retorna mediante callback
      callback(error, null);
    }

  }, 300);
}


// FUNCION DE RECALCULO (FUNCION PURA)
// Recalcula la prioridad segun reglas de negocio
// No modifica el objeto recibido
function recalcularPrioridad(solicitud) {

  // Se crea una nueva prioridad inicializada con la actual
  let nuevaPrioridad = solicitud.prioridad;

  // Si el area es infraestructura se incrementa la prioridad
  // Se usa Math.min para no exceder el maximo de 5
  if (solicitud.area.toLowerCase() === "infraestructura") {
    nuevaPrioridad = Math.min(5, nuevaPrioridad + 1);
  }

  // Se retorna un nuevo objeto con la prioridad actualizada
  // Se garantiza inmutabilidad usando spread operator
  return {
    ...solicitud,
    prioridad: nuevaPrioridad
  };
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Se usa promesa para simular la atencion de la solicitud
// Justificacion: promesas permiten manejo moderno de operaciones asincronas
function atenderSolicitudPromesa(solicitud) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // Se muestra mensaje de inicio de atencion
    console.log("Iniciando atencion de solicitud " + solicitud.id + "...");

    // setTimeout simula tiempo de procesamiento
    setTimeout(() => {

      // Se verifica que la prioridad sea valida
      if (solicitud.prioridad >= 1) {

        // Se resuelve la promesa con la solicitud atendida
        resolve({
          ...solicitud,
          estado: "atendida"
        });

      } else {

        // Si la prioridad es invalida se rechaza
        reject("No se pudo atender la solicitud");
      }

    }, 1000);
  });
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
// Justificacion: async/await coordina todo el flujo de validacion y procesamiento
export async function procesarSolicitudesEj19(solicitudes) {

  // Arreglos para almacenar resultados
  const atendidas = [];
  const rechazadas = [];

  // Contadores para resumen
  let totalRecibidas = 0;
  let totalExitosas = 0;
  let totalFallidas = 0;

  try {

    // Se valida que la entrada sea un arreglo
    if (!Array.isArray(solicitudes)) {
      throw new Error("La entrada debe ser un arreglo de solicitudes");
    }

    // Se obtiene el total de solicitudes
    totalRecibidas = solicitudes.length;

    // VALIDACION Y PROCESAMIENTO DE SOLICITUDES
    // Se recorre el arreglo usando ciclo for clasico
    for (let i = 0; i < solicitudes.length; i++) {

      // Se obtiene la solicitud actual
      // Se crea una copia para garantizar inmutabilidad
      const solicitud = { ...solicitudes[i] };

      try {

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

        // RECALCULO DE PRIORIDAD
        // Se aplica la regla de negocio usando funcion pura
        const solicitudAjustada = recalcularPrioridad(solicitudValidada);

        // PROCESAMIENTO CON PROMESA
        // Se simula la atencion de la solicitud
        const resultado = await atenderSolicitudPromesa(solicitudAjustada);

        // Se muestra mensaje de exito
        console.log("Solicitud " + resultado.id + " atendida correctamente");

        // Se agrega a solicitudes atendidas
        atendidas.push(resultado);
        totalExitosas = totalExitosas + 1;

      } catch (error) {

        // Si falla se muestra mensaje de rechazo
        console.log("Solicitud " + solicitud.id + " rechazada: " + error.message);

        // Se agrega a solicitudes rechazadas
        rechazadas.push({
          id: solicitud.id,
          motivo: error.message || error,
          estado: "rechazada"
        });

        totalFallidas = totalFallidas + 1;
      }
    }

    // Se muestra mensaje final
    console.log("\nProcesamiento finalizado sin bloqueos");

    // Se retorna el objeto con todos los resultados y el resumen
    return {
      resumen: {
        totalProcesadas: totalRecibidas,
        exitosas: totalExitosas,
        fallidas: totalFallidas
      },
      solicitudesAtendidas: atendidas,
      solicitudesRechazadas: rechazadas
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna error controlado
    return {
      resumen: {
        totalProcesadas: 0,
        exitosas: 0,
        fallidas: 0
      },
      solicitudesAtendidas: [],
      solicitudesRechazadas: [],
      error: errorGeneral.message
    };
  }
}