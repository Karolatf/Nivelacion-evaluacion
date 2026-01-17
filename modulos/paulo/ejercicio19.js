// EJERCICIO 19
// Sistema de Simulación de procesamiento de solicitudes de soporte técnico

// ---------------- VALIDACIÓN (CALLBACK) ----------------
function validarSolicitud(solicitud, callback) {
  try {
    const { id, usuario, area, tipoProblema, prioridad, estado } = solicitud;

    if (
      typeof id !== "number" ||
      typeof usuario !== "string" || usuario.trim() === "" ||
      typeof area !== "string" || area.trim() === "" ||
      typeof tipoProblema !== "string" || tipoProblema.trim() === "" ||
      typeof prioridad !== "number" || prioridad < 1 || prioridad > 5 ||
      estado !== "pendiente"
    ) {
      throw new Error("Datos inválidos o incompletos");
    }

    callback(null, solicitud);

  } catch (error) {
    callback(error.message, null);
  }
}

// ---------------- REGLA DE PRIORIDAD (FUNCIÓN PURA) ----------------
function recalcularPrioridad(solicitud) {
  let nuevaPrioridad = solicitud.prioridad;

  if (solicitud.area.toLowerCase() === "infraestructura") {
    nuevaPrioridad = Math.min(5, nuevaPrioridad + 1);
  }

  return {
    ...solicitud,
    prioridad: nuevaPrioridad
  };
}

// ---------------- SIMULACIÓN ASÍNCRONA (PROMESA) ----------------
function atenderSolicitud(solicitud) {
  return new Promise((resolve, reject) => {
    console.log(`⏳ Iniciando atención de solicitud ${solicitud.id}...`);

    setTimeout(() => {
      if (solicitud.prioridad >= 1) {
        resolve({
          ...solicitud,
          estado: "atendida"
        });
      } else {
        reject("No se pudo atender la solicitud");
      }
    }, 1000);
  });
}

// ---------------- PROCESO PRINCIPAL (ASYNC / AWAIT) ----------------
async function procesarSolicitudesEj19(solicitudes) {
  const validas = [];
  const rechazadas = [];

  for (const solicitud of solicitudes) {
    try {
      const solicitudValidada = await new Promise((resolve, reject) => {
        validarSolicitud({ ...solicitud }, (error, data) => {
          if (error) reject(error);
          else resolve(data);
        });
      });

      const solicitudAjustada = recalcularPrioridad(solicitudValidada);
      const resultado = await atenderSolicitud(solicitudAjustada);

      console.log(`Solicitud ${resultado.id} atendida correctamente`);
      validas.push(resultado);

    } catch (error) {
      console.log(`Solicitud ${solicitud.id} rechazada: ${error}`);

      rechazadas.push({
        id: solicitud.id,
        motivo: error,
        estado: "rechazada"
      });
    }
  }

  console.log("\n✔ Procesamiento finalizado sin bloqueos");

  return {
    totalProcesadas: solicitudes.length,
    exitosas: validas.length,
    fallidas: rechazadas.length,
    atendidas: validas,
    rechazadas
  };
}

// ---------------- EXPORTACIÓN ----------------
export { procesarSolicitudesEj19 };
