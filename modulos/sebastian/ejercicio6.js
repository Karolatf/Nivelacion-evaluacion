// SISTEMA DE GESTION Y VALIDACION DE SERVICIOS
// Este archivo contiene la logica completa del Ejercicio 6 (ejercicio 3 de Sebastian)


// FUNCION CALLBACK (NO SE EXPORTA)
// Valida los datos iniciales de la solicitud
function validarSolicitudInicial(solicitud, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    try {

      // Se valida que el ID sea un numero
      if (typeof solicitud.id !== "number" || isNaN(solicitud.id)) {
        throw new Error("ID invalido");
      }

      // Se valida que el cliente sea un string no vacio
      if (typeof solicitud.cliente !== "string" || solicitud.cliente.trim() === "") {
        throw new Error("Nombre de cliente invalido");
      }

      // Se valida que el tipo de servicio sea un string
      if (typeof solicitud.tipoServicio !== "string") {
        throw new Error("Tipo de servicio invalido");
      }

      // Se valida que la prioridad sea un numero entero entre 1 y 5
      if (
        !Number.isInteger(solicitud.prioridad) ||
        solicitud.prioridad < 1 ||
        solicitud.prioridad > 5
      ) {
        throw new Error("Prioridad fuera de rango (1 a 5)");
      }

      // Se valida que la solicitud este activa
      if (solicitud.activo !== true) {
        throw new Error("La solicitud esta desactivada");
      }

      // Si todas las validaciones son correctas, se retorna exito
      callback(null);

    } catch (error) {

      // Si ocurre cualquier error, se retorna por callback
      callback(error);
    }

  }, 300);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Simula la evaluacion de la solicitud por un servicio externo
function evaluarSolicitudExterna(solicitud) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // Se calcula un tiempo de procesamiento variable entre 500ms y 2500ms
    const tiempo = Math.floor(Math.random() * 2000) + 500;

    // setTimeout simula un proceso asincronico
    setTimeout(() => {

      try {

        // Se aplica regla de negocio
        // Se rechaza si la prioridad es menor a 3
        if (solicitud.prioridad < 3) {
          throw new Error("Prioridad insuficiente para el servicio");
        }

        // Si la prioridad es suficiente, se aprueba la solicitud
        resolve({
          id: solicitud.id,
          estado: "APROBADA",
          motivo: "Solicitud validada y aceptada correctamente"
        });

      } catch (error) {

        // Si ocurre un error, se rechaza la promesa
        reject(error);
      }

    }, tiempo);
  });
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
export async function procesarSolicitudesServicio(solicitudes) {

  // Arreglo para almacenar los resultados de cada solicitud
  const resultados = [];

  // Contador de solicitudes aprobadas
  let aprobadas = 0;

  // Contador de solicitudes rechazadas
  let rechazadas = 0;

  try {

    // Se valida que la entrada sea un arreglo
    if (!Array.isArray(solicitudes)) {
      throw new Error("Las solicitudes deben ser un arreglo");
    }

    // Se recorre el arreglo usando un ciclo for clasico
    for (let i = 0; i < solicitudes.length; i++) {

      try {

        // Se clona la solicitud para garantizar inmutabilidad
        const solicitudCopia = { ...solicitudes[i] };

        // VALIDACION CON CALLBACK
        // Se envuelve la funcion callback dentro de una promesa
        await new Promise((resolve, reject) => {

          // Se llama a la validacion inicial
          validarSolicitudInicial(solicitudCopia, (error) => {

            // Si hay error se rechaza la promesa
            if (error) {
              reject(error);
            } else {
              // Si no hay error se continua
              resolve();
            }
          });
        });

        // PROCESAMIENTO ASINCRONICO CON PROMESA
        // Se evalua la solicitud con un servicio externo simulado
        const resultado = await evaluarSolicitudExterna(solicitudCopia);

        // Se agrega el resultado al arreglo
        resultados.push(resultado);

        // Se incrementa el contador de aprobadas
        aprobadas = aprobadas + 1;

      } catch (error) {

        // Si falla una solicitud, se registra pero el sistema continua
        resultados.push({
          id: solicitudes[i]?.id ?? null,
          estado: "RECHAZADA",
          motivo: error.message
        });

        // Se incrementa el contador de rechazadas
        rechazadas = rechazadas + 1;
      }
    }

    // Se retorna un objeto con el resumen final
    return {
      totalProcesadas: solicitudes.length,
      totalAprobadas: aprobadas,
      totalRechazadas: rechazadas,
      detalle: resultados
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna error controlado
    return {
      estado: "ERROR",
      mensaje: errorGeneral.message
    };
  }
}