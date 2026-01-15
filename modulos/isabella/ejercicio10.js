// EJERCICIO 10
// SISTEMA DE GESTIÓN DE SOPORTE TÉCNICO

// CALLBACK → Validación básica
function validarSolicitudCallback(solicitud, callback) {
  setTimeout(() => {
    if (
      typeof solicitud.id !== "number" || solicitud.id <= 0 ||
      typeof solicitud.area !== "string" || solicitud.area.trim() === "" ||
      typeof solicitud.descripcion !== "string" || solicitud.descripcion.trim() === "" ||
      typeof solicitud.reportadoPorSistema !== "boolean" ||
      typeof solicitud.intentosPrevios !== "number" || solicitud.intentosPrevios < 0
    ) {
      callback(new Error("Datos básicos inválidos"), null);
    } else {
      callback(null, solicitud);
    }
  }, 300);
}

// PROMESA → Validación de urgencia
function validarUrgenciaPromesa(solicitud) {
  return new Promise((resolve, reject) => {
    if (
      typeof solicitud.nivelUrgencia !== "number" ||
      solicitud.nivelUrgencia < 1 ||
      solicitud.nivelUrgencia > 5
    ) {
      reject(new Error("Nivel de urgencia fuera de rango (1 a 5)"));
    } else {
      resolve(solicitud);
    }
  });
}

// LÓGICA DE DECISIÓN
function determinarEstado(solicitud) {
  if (solicitud.nivelUrgencia >= 4 && solicitud.reportadoPorSistema) {
    return "ATENDIDA";
  }

  if (solicitud.intentosPrevios >= 3) {
    return "RECHAZADA";
  }

  return "EN ESPERA";
}

// FUNCIÓN PRINCIPAL ASYNC
export async function procesarSolicitudesEj10(solicitudes) {
  const resultados = [];
  const errores = [];

  for (const solicitud of solicitudes) {
    try {
      const validada = await new Promise((resolve, reject) => {
        validarSolicitudCallback(solicitud, (error, data) => {
          error ? reject(error) : resolve(data);
        });
      });

      const urgenciaValida = await validarUrgenciaPromesa(validada);

      // Inmutabilidad: se crea un nuevo objeto
      const resultadoFinal = {
        ...urgenciaValida,
        estado: determinarEstado(urgenciaValida)
      };

      resultados.push(resultadoFinal);

    } catch (error) {
      errores.push({
        id: solicitud.id ?? "SIN ID",
        mensaje: error.message
      });
    }
  }

  return { resultados, errores };
}
