// EJERCICIO 22
// Sistema de Validación y Procesamiento de Solicitudes Académicas

// ---------- FUNCIÓN CALLBACK ----------
// Valida reglas básicas antes de continuar el flujo
function validarSolicitudBasica(solicitud, callback) {
  try {
    if (typeof solicitud.id !== "number") {
      throw new Error("ID inválido");
    }
    if (typeof solicitud.nombre !== "string") {
      throw new Error("Nombre inválido");
    }
    if (!Array.isArray(solicitud.requisitos)) {
      throw new Error("Requisitos inválidos");
    }

    callback(null, true);
  } catch (error) {
    callback(error.message, null);
  }
}

// ---------- FUNCIÓN PROMESA ----------
// Simula un procesamiento asincrónico
function procesarAsync(solicitud) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (solicitud.prioridad < 1 || solicitud.prioridad > 5) {
        reject("Prioridad fuera de rango");
      } else {
        resolve(true);
      }
    }, 300);
  });
}

// ---------- FUNCIÓN PRINCIPAL ----------
async function procesarSolicitudesEj22(solicitudes) {

  // Se conserva el arreglo original sin modificaciones
  const originales = [...solicitudes];

  const aprobadas = [];
  const rechazadas = [];

  // Se recorren las solicitudes una a una
  for (const solicitud of solicitudes) {
    try {

      // Validación básica con callback
      await new Promise((resolve, reject) => {
        validarSolicitudBasica(solicitud, (error) => {
          if (error) reject(error);
          else resolve(true);
        });
      });

      // Validación asincrónica
      await procesarAsync(solicitud);

      // Evaluación de requisitos
      let cumpleRequisitos = true;
      for (const r of solicitud.requisitos) {
        if (r !== true) {
          cumpleRequisitos = false;
        }
      }

      if (!cumpleRequisitos) {
        rechazadas.push({ id: solicitud.id, motivo: "No cumple requisitos" });
        continue;
      }

      // Se agrega como aprobada sin modificar el objeto original
      aprobadas.push({
        ...solicitud,
        estadoFinal: "aprobada"
      });

    } catch (error) {
      rechazadas.push({
        id: solicitud.id,
        motivo: error
      });
    }
  }

  return {
    originales,
    aprobadas,
    rechazadas
  };
}

export { procesarSolicitudesEj22 };
