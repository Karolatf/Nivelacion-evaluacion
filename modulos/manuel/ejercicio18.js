// SISTEMA DE GESTIÓN Y VALIDACIÓN DE SOLICITUDES
// Ejercicio 18 - Guía Manuel

// Valida los datos iniciales de la solicitud usando callback
function validarSolicitudInicial(solicitud, callback) {
  setTimeout(() => {
    try {
      if (typeof solicitud.id !== "number" || isNaN(solicitud.id)) {
        throw new Error("ID inválido");
      }

      if (typeof solicitud.cliente !== "string" || solicitud.cliente.trim() === "") {
        throw new Error("Cliente inválido");
      }

      if (typeof solicitud.tipoServicio !== "string") {
        throw new Error("Tipo de servicio inválido");
      }

      if (
        !Number.isInteger(solicitud.prioridad) ||
        solicitud.prioridad < 1 ||
        solicitud.prioridad > 5
      ) {
        throw new Error("Prioridad fuera de rango (1 a 5)");
      }

      if (solicitud.activo !== true) {
        throw new Error("La solicitud está desactivada");
      }

      callback(null, solicitud);
    } catch (error) {
      callback(error);
    }
  }, 300);
}

// Evalúa la solicitud mediante una promesa
function evaluarSolicitudExterna(solicitud) {
  return new Promise((resolve, reject) => {
    const tiempo = Math.floor(Math.random() * 2000) + 500;

    setTimeout(() => {
      try {
        if (solicitud.prioridad < 3) {
          throw new Error("Prioridad insuficiente para el servicio");
        }

        resolve({
          id: solicitud.id,
          estado: "APROBADA",
          motivo: "Solicitud validada correctamente"
        });
      } catch (error) {
        reject({
          id: solicitud.id,
          estado: "RECHAZADA",
          motivo: error.message
        });
      }
    }, tiempo);
  });
}

// Procesa la solicitud usando async/await
async function procesarSolicitudFinal(solicitud) {
  try {
    const resultado = await evaluarSolicitudExterna(solicitud);
    return resultado;
  } catch (error) {
    return error;
  }
}

// FUNCIÓN ÚNICA EXPORTADA (COINCIDE CON EL BARRIL)
export async function procesarSolicitudesEj18(solicitudes) {
  const resultados = [];

  for (let i = 0; i < solicitudes.length; i++) {
    const solicitud = solicitudes[i];

    await new Promise((resolve) => {
      validarSolicitudInicial(solicitud, async (error) => {
        if (error) {
          resultados.push({
            id: solicitud.id,
            estado: "ERROR",
            motivo: error.message
          });
          return resolve();
        }

        const resultadoFinal = await procesarSolicitudFinal(solicitud);
        resultados.push(resultadoFinal);
        resolve();
      });
    });
  }

  return resultados;
}
