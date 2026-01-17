// EJERCICIO 24
// Sistema de Gestión y Validación de Solicitudes de Acceso

// Callback para validaciones básicas
function validarDatosBasicos(solicitud, callback) {
  try {
    if (typeof solicitud.edad !== "number") {
      throw new Error("Edad inválida");
    }
    if (!Array.isArray(solicitud.permisos) || solicitud.permisos.length === 0) {
      throw new Error("Permisos inválidos");
    }
    callback(null, true);
  } catch (error) {
    callback(error.message, null);
  }
}

// Promesa para validación externa simulada
function validacionExterna() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const resultado = Math.random();
      if (resultado > 0.2) {
        resolve(true);
      } else {
        reject("Fallo en validación externa");
      }
    }, 400);
  });
}

// Función principal
async function procesarSolicitudesEj24(solicitudes) {

  const resultados = [];

  for (const solicitud of solicitudes) {
    try {

      // Validación básica
      await new Promise((resolve, reject) => {
        validarDatosBasicos(solicitud, (error) => {
          if (error) reject(error);
          else resolve(true);
        });
      });

      // Reglas lógicas
      if (!solicitud.aceptaCondiciones) {
        resultados.push({
          id: solicitud.id,
          estado: "rechazada",
          motivo: "No aceptó condiciones"
        });
        continue;
      }

      // Validación externa asincrónica
      await validacionExterna();

      resultados.push({
        ...solicitud,
        estadoFinal: "aprobada"
      });

    } catch (error) {
      resultados.push({
        id: solicitud.id,
        estado: "en revisión",
        motivo: error
      });
    }
  }

  return resultados;
}

export { procesarSolicitudesEj24 };
