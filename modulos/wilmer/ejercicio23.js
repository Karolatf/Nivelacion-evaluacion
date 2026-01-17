// EJERCICIO 23
// Sistema de Procesos y Validación de Operaciones

// Callback para validar datos mínimos
function validarOperacionBasica(op, callback) {
  if (typeof op.id !== "number" || typeof op.valor !== "number") {
    callback("Datos básicos inválidos", null);
  } else {
    callback(null, true);
  }
}

// Promesa para simular proceso asincrónico
function validarOperacionAsync(op) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (op.prioridad < 1 || op.prioridad > 5) {
        reject("Prioridad inválida");
      } else {
        resolve(true);
      }
    }, 300);
  });
}

// Función principal
async function procesarSolicitudesEj23(solicitudes) {

  const aprobadas = [];
  const rechazadas = [];
  const invalidas = [];

  for (const solicitud of solicitudes) {
    try {

      // Validación con callback
      await new Promise((resolve, reject) => {
        validarOperacionBasica(solicitud, (error) => {
          if (error) reject(error);
          else resolve(true);
        });
      });

      // Validación asincrónica
      await validarOperacionAsync(solicitud);

      // Decisiones lógicas
      if (solicitud.estado !== true && solicitud.estado !== "activo") {
        rechazadas.push({ id: solicitud.id, motivo: "Estado no permitido" });
        continue;
      }

      aprobadas.push({
        ...solicitud,
        estadoFinal: "aprobada"
      });

    } catch (error) {
      invalidas.push({
        id: solicitud.id,
        motivo: error
      });
    }
  }

  return {
    total: solicitudes.length,
    aprobadas,
    rechazadas,
    invalidas
  };
}

export { procesarSolicitudesEj23 };
