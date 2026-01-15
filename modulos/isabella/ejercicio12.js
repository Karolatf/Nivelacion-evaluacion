// EJERCICIO 12
// SISTEMA DE GESTIÓN ASÍNCRONA DE SOLICITUDES

// CALLBACK → Validación básica de datos
function validarSolicitudCallback(solicitud, callback) {
  setTimeout(() => {
    if (
      typeof solicitud.id !== "number" || solicitud.id <= 0 ||
      typeof solicitud.usuario !== "string" || solicitud.usuario.trim() === "" ||
      (solicitud.tipo !== "software" && solicitud.tipo !== "hardware") ||
      typeof solicitud.prioridad !== "number" ||
      typeof solicitud.descripcion !== "string" || solicitud.descripcion.trim() === "" ||
      solicitud.estado !== "pendiente"
    ) {
      callback(new Error("Datos inválidos en la solicitud"), null);
    } else {
      callback(null, solicitud);
    }
  }, 300);
}

// PROMESA → Validación de prioridad
function validarPrioridadPromesa(solicitud) {
  return new Promise((resolve, reject) => {
    if (solicitud.prioridad < 1 || solicitud.prioridad > 5) {
      reject(new Error("Prioridad fuera del rango permitido (1 a 5)"));
    } else {
      resolve(solicitud);
    }
  });
}

// CLASIFICACIÓN DE PRIORIDAD
function clasificarPrioridad(prioridad) {
  if (prioridad >= 4) return "Alta prioridad";
  if (prioridad >= 2) return "Prioridad media";
  return "Baja prioridad";
}

// PROMESA → Simulación de atención según prioridad
function atenderSolicitudPromesa(solicitud) {
  const tiempoAtencion = solicitud.prioridad >= 4
    ? 500
    : solicitud.prioridad >= 2
    ? 800
    : 1200;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...solicitud,
        estado: "atendida"
      });
    }, tiempoAtencion);
  });
}

// FUNCIÓN PRINCIPAL ASYNC
export async function procesarSolicitudesEj12(solicitudes = []) {
  const resultados = [];
  const errores = [];

  if (!Array.isArray(solicitudes) || solicitudes.length === 0) {
    return {
      resultados: [],
      errores: [{ mensaje: "El arreglo de solicitudes está vacío o es inválido" }],
      estadoSistema: "PROCESO FINALIZADO CON ERRORES"
    };
  }

  for (const solicitud of solicitudes) {
    try {
      console.log(`Iniciando validación de la solicitud ${solicitud.id}`);

      const validada = await new Promise((resolve, reject) => {
        validarSolicitudCallback(solicitud, (error, data) => {
          error ? reject(error) : resolve(data);
        });
      });

      const prioridadValida = await validarPrioridadPromesa(validada);

      const clasificacion = clasificarPrioridad(prioridadValida.prioridad);

      console.log(`Atendiendo solicitud ${prioridadValida.id} (${clasificacion})`);

      const atendida = await atenderSolicitudPromesa(prioridadValida);

      // Inmutabilidad: se crea un nuevo objeto de salida
      resultados.push({
        id: atendida.id,
        usuario: atendida.usuario,
        tipo: atendida.tipo,
        prioridad: atendida.prioridad,
        clasificacion,
        estado: atendida.estado
      });

      console.log(`Solicitud ${atendida.id} procesada correctamente`);

    } catch (error) {
      errores.push({
        id: solicitud.id ?? "SIN ID",
        mensaje: error.message
      });

      console.log(`Solicitud rechazada: ${error.message}`);
    }
  }

  return {
    resultados,
    errores,
    estadoSistema:
      errores.length === 0
        ? "TODAS LAS SOLICITUDES FUERON PROCESADAS"
        : "PROCESO COMPLETADO CON ERRORES"
  };
}
