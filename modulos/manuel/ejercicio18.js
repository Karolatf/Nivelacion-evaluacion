// SISTEMA DE GESTIÓN Y VALIDACIÓN DE SOLICITUDES DE SOPORTE
// Archivo: ejercicio18.js

// -------- FUNCIÓN CALLBACK INTERNA --------
// Valida el estado activo de la solicitud de forma asincrónica
function validarActivo(activo, callback) {
  setTimeout(() => {
    if (typeof activo !== "boolean") {
      callback(new Error("El campo 'activo' debe ser booleano"), null);
    } else if (!activo) {
      callback(new Error("La solicitud está inactiva"), null);
    } else {
      callback(null, true);
    }
  }, 300);
}

// -------- FUNCIÓN PROMESA INTERNA --------
// Valida que el nivel de urgencia esté dentro del rango permitido
function validarNivel(nivel) {
  return new Promise((resolve, reject) => {
    if (typeof nivel !== "number" || !Number.isInteger(nivel)) {
      reject(new Error("El nivel debe ser un número entero"));
    } else if (nivel < 1 || nivel > 5) {
      reject(new Error("Nivel fuera de rango (1-5)"));
    } else {
      resolve(true);
    }
  });
}

// -------- FUNCIÓN PRINCIPAL ASYNC / AWAIT --------
// Se exporta para ser usada por app.js o barril.js
// En ejercicio18.js
export async function procesarSolicitudesEj18(solicitud) {  
  try {
    // VALIDACIÓN DE DATOS BÁSICOS
    if (typeof solicitud.id !== "number" || isNaN(solicitud.id)) {
      throw new Error("ID inválido");
    }

    if (typeof solicitud.usuario !== "string" || solicitud.usuario.trim() === "") {
      throw new Error("Usuario inválido");
    }

    if (
      typeof solicitud.tipo !== "string" ||
      !["hardware", "software", "red"].includes(solicitud.tipo.toLowerCase())
    ) {
      throw new Error("Tipo de solicitud inválido (hardware/software/red)");
    }

    // VALIDACIÓN ASINCRÓNICA CON CALLBACK
    await new Promise((resolve, reject) => {
      validarActivo(solicitud.activo, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    // VALIDACIÓN DE NIVEL CON PROMESA
    await validarNivel(solicitud.nivel);

    // CLASIFICACIÓN POR PRIORIDAD
    let prioridad;
    if (solicitud.nivel >= 4) prioridad = "ALTA";
    else if (solicitud.nivel >= 2) prioridad = "MEDIA";
    else prioridad = "BAJA";

    // RESULTADO FINAL
    return {
      id: solicitud.id,
      estado: "VÁLIDA",
      prioridad: prioridad,
      mensaje: "Solicitud procesada correctamente"
    };

  } catch (error) {
    // RETORNA OBJETO CONTROLADO EN CASO DE ERROR
    return {
      id: solicitud?.id ?? null,
      estado: "INVALIDA",
      motivo: error.message
    };
  }
}
