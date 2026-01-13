// EJERCICIO 3
// Sistema de Gestión y Validación de Solicitudes de Acceso
// (Lógica del sistema – sin interacción por consola)

// VALIDACIÓN BÁSICA (CALLBACK)
// Valida reglas mínimas de la solicitud
function validarBasico(solicitud, callback) {

  // Valida que la edad sea un número válido y mayor de edad
  if (typeof solicitud.edad !== "number" || isNaN(solicitud.edad) || solicitud.edad < 18) {
    callback(false, "Edad inválida o menor de edad");
    return;
  }

  // Valida que haya aceptado las condiciones
  if (solicitud.aceptaCondiciones !== true) {
    callback(false, "No aceptó las condiciones del sistema");
    return;
  }

  // Valida que los permisos sean un arreglo no vacío
  if (!Array.isArray(solicitud.permisos) || solicitud.permisos.length === 0) {
    callback(false, "No se solicitaron permisos");
    return;
  }

  // Si todo es correcto
  callback(true, "Validación básica exitosa");
}

// FUNCIÓN PURA
// Valida coherencia entre rol y permisos
function validarRolPermisos(rol, permisos) {

  // Regla: un usuario normal no puede eliminar
  if (rol === "usuario" && permisos.includes("eliminar")) {
    return false;
  }

  // Si no se viola ninguna regla
  return true;
}

// PROMESA ASINCRÓNICA
// Simula una validación externa (ej. seguridad)
function validacionExterna() {

  // Retorno una promesa
  return new Promise((resolve, reject) => {

    // Simulación de retardo externo
    setTimeout(() => {

      // Resultado aleatorio
      const exito = Math.random() > 0.3;

      // Si la validación es exitosa
      if (exito) {
        resolve("Validación externa aprobada");
      } else {
        reject("Error en validación externa");
      }

    }, 1000);
  });
}

// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// Controla todo el flujo del ejercicio
export async function procesarSolicitudEj3(solicitud) {

  try {
    // VALIDACIÓN BÁSICA (CALLBACK)
    const resultadoBasico = await new Promise((resolve, reject) => {

      // Ejecuto la validación con callback
      validarBasico(solicitud, (esValida, mensaje) => {

        // Si falla, rechazo
        if (!esValida) {
          reject(new Error(mensaje));
        } else {
          resolve(true);
        }
      });
    });

    // VALIDACIÓN ROL - PERMISOS
    if (!validarRolPermisos(solicitud.rol, solicitud.permisos)) {
      return {
        id: solicitud.id,
        estado: "RECHAZADA",
        motivo: "Rol no compatible con permisos"
      };
    }

    // VALIDACIÓN EXTERNA ASINCRÓNICA
    try {
      await validacionExterna();

      // Si todo fue correcto
      return {
        id: solicitud.id,
        estado: "APROBADA",
        mensaje: "Acceso concedido"
      };

    } catch (error) {
      // Si falla la validación externa
      return {
        id: solicitud.id,
        estado: "EN REVISIÓN",
        motivo: error
      };
    }

  } catch (error) {

    // MANEJO DE ERRORES
    return {
      id: solicitud?.id ?? null,
      estado: "ERROR",
      mensaje: error.message
    };
  }
}
