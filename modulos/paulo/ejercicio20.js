export async function procesarSolicitudesEj20(solicitudes) {
  const procesadas = [];
  const rechazadas = [];

  // ---------------- CALLBACK ----------------
  function envioCallback(solicitud, callback) {
    setTimeout(() => {
      callback(`Solicitud ${solicitud.id} enviada por callback`);
    }, 300);
  }

  // ---------------- PROMESA ----------------
  function envioPromesa(solicitud) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Solicitud ${solicitud.id} enviada por promesa`);
      }, 400);
    });
  }

  // ---------------- ASYNC / AWAIT ----------------
  async function envioAsync(solicitud) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Solicitud ${solicitud.id} enviada por async/await`);
      }, 500);
    });
  }

  for (const solicitud of solicitudes) {
    try {
      // -------- VALIDACIONES --------
      if (typeof solicitud.id !== "number") {
        throw new Error("ID inválido");
      }

      if (typeof solicitud.usuario !== "string") {
        throw new Error("Usuario inválido");
      }

      if (!["hardware", "software", "red"].includes(solicitud.tipo)) {
        throw new Error("Tipo de solicitud no permitido");
      }

      if (
        typeof solicitud.prioridad !== "number" ||
        solicitud.prioridad < 1 ||
        solicitud.prioridad > 5
      ) {
        throw new Error("Prioridad fuera de rango");
      }

      if (solicitud.estado !== "pendiente") {
        throw new Error("Estado inicial inválido");
      }

      // -------- CLASIFICACIÓN --------
      let clasificacion;
      let nuevoEstado;

      if (solicitud.prioridad >= 4) {
        clasificacion = "alta";
        nuevoEstado = "escalado";
      } else if (solicitud.prioridad >= 2) {
        clasificacion = "media";
        nuevoEstado = "en_proceso";
      } else {
        clasificacion = "baja";
        nuevoEstado = "en_proceso";
      }

      // -------- PROCESO ASÍNCRONO --------
      envioCallback(solicitud, (mensaje) => {
        console.log(mensaje);
      });

      await envioPromesa(solicitud);
      await envioAsync(solicitud);

      // -------- INMUTABILIDAD --------
      procesadas.push({
        ...solicitud,
        clasificacion,
        estadoFinal: nuevoEstado
      });

    } catch (error) {
      rechazadas.push({
        id: solicitud.id ?? "desconocido",
        estadoFinal: "rechazada",
        motivo: error.message
      });
    }
  }

  return {
    originales: solicitudes,
    procesadas,
    rechazadas
  };
}
