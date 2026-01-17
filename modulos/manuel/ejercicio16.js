// EJERCICIO 16
// Sistema de Gestión y Validación de Solicitudes de Soporte Técnico

// ---------------- FUNCIONES DE VALIDACIÓN ----------------
function validarSolicitud(solicitud) {
  if (
    typeof solicitud.id !== "number" || solicitud.id <= 0 ||
    typeof solicitud.usuario !== "string" || solicitud.usuario.trim() === "" ||
    typeof solicitud.tipo !== "string" ||
    !["hardware", "software", "red"].includes(solicitud.tipo) ||
    typeof solicitud.prioridad !== "number" ||
    solicitud.prioridad < 1 || solicitud.prioridad > 5 ||
    typeof solicitud.descripcion !== "string" ||
    solicitud.descripcion.length < 10 ||
    typeof solicitud.activo !== "boolean"
  ) {
    return { valida: false, motivo: "Datos inválidos o incompletos" };
  }

  if (!solicitud.activo) {
    return { valida: false, motivo: "Solicitud inactiva" };
  }

  return { valida: true };
}

// ---------------- CLASIFICACIÓN ----------------
function clasificarPrioridad(prioridad) {
  if (prioridad >= 4) return "Alta";
  if (prioridad >= 2) return "Media";
  return "Baja";
}

// ---------------- ASINCRONÍA ----------------

// Callback
function procesarConCallback(solicitud, callback) {
  setTimeout(() => {
    callback(null, {
      id: solicitud.id,
      estado: "Procesada por callback"
    });
  }, 500);
}

// Promesa
function procesarConPromesa(solicitud) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: solicitud.id,
        estado: "Procesada por promesa"
      });
    }, 700);
  });
}

// Async / Await
async function procesarConAsync(solicitud) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: solicitud.id,
        estado: "Procesada por async/await"
      });
    }, 900);
  });
}

// ---------------- FUNCIÓN PRINCIPAL ----------------
export async function procesarSolicitudesEj16(solicitudes) {
  try {
    if (!Array.isArray(solicitudes)) {
      throw new Error("La entrada debe ser un arreglo");
    }

    if (solicitudes.length === 0) {
      return {
        resumen: {
          total: 0,
          validas: 0,
          invalidas: 0
        },
        procesadas: [],
        invalidas: [],
        mensaje: "No se recibieron solicitudes"
      };
    }

    // Inmutabilidad
    const copiaSolicitudes = [...solicitudes];

    const validas = [];
    const invalidas = [];

    // Validación
    for (const solicitud of copiaSolicitudes) {
      const resultado = validarSolicitud(solicitud);

      if (resultado.valida) {
        validas.push({
          ...solicitud,
          clasificacion: clasificarPrioridad(solicitud.prioridad)
        });
      } else {
        invalidas.push({
          id: solicitud.id ?? "Sin ID",
          motivo: resultado.motivo
        });
      }
    }

    const procesadas = [];

    // Procesamiento asincrónico
    for (let i = 0; i < validas.length; i++) {
      const solicitud = validas[i];

      if (i % 3 === 0) {
        // Callback
        await new Promise(resolve => {
          procesarConCallback(solicitud, (_, resultado) => {
            procesadas.push({
              ...solicitud,
              estadoFinal: resultado.estado
            });
            resolve();
          });
        });
      } else if (i % 3 === 1) {
        // Promesa
        const resultado = await procesarConPromesa(solicitud);
        procesadas.push({
          ...solicitud,
          estadoFinal: resultado.estado
        });
      } else {
        // Async / Await
        const resultado = await procesarConAsync(solicitud);
        procesadas.push({
          ...solicitud,
          estadoFinal: resultado.estado
        });
      }
    }

    return {
      resumen: {
        total: solicitudes.length,
        validas: validas.length,
        invalidas: invalidas.length
      },
      procesadas,
      invalidas,
      mensaje: "Proceso finalizado correctamente"
    };

  } catch (error) {
    return {
      error: true,
      mensaje: "Error controlado en el sistema",
      detalle: error.message
    };
  }
}
