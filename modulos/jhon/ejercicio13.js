// EJERCICIO 13
// Sistema de Gestión y Validación de Solicitudes de Soporte Técnico
// Este archivo contiene TODA la lógica del ejercicio

// --------------------------------------------------
// FUNCIÓN DE VALIDACIÓN DE SOLICITUD
// No modifica el objeto recibido (inmutabilidad)
// --------------------------------------------------
function validarSolicitud(solicitud) {

  // Validación del ID
  if (
    typeof solicitud.id !== "number" ||
    !Number.isInteger(solicitud.id) ||
    solicitud.id <= 0
  ) {
    throw new Error("ID inválido: debe ser un número entero positivo");
  }

  // Validación del usuario
  if (
    typeof solicitud.usuario !== "string" ||
    solicitud.usuario.trim() === ""
  ) {
    throw new Error("Usuario inválido");
  }

  // Validación del tipo de solicitud
  const tiposPermitidos = ["hardware", "software", "red"];
  if (
    typeof solicitud.tipo !== "string" ||
    !tiposPermitidos.includes(solicitud.tipo)
  ) {
    throw new Error("Tipo de solicitud no permitido");
  }

  // Validación de prioridad
  if (
    typeof solicitud.prioridad !== "number" ||
    !Number.isInteger(solicitud.prioridad) ||
    solicitud.prioridad < 1 ||
    solicitud.prioridad > 5
  ) {
    throw new Error("Prioridad fuera de rango (1 a 5)");
  }

  // Validación de descripción
  if (
    typeof solicitud.descripcion !== "string" ||
    solicitud.descripcion.length < 10
  ) {
    throw new Error("Descripción demasiado corta");
  }

  // Validación del estado activo
  if (typeof solicitud.activo !== "boolean") {
    throw new Error("Estado activo inválido");
  }

  // Si todo es correcto, la solicitud es válida
  return true;
}

// --------------------------------------------------
// FUNCIÓN DE CLASIFICACIÓN (FUNCIÓN PURA)
// --------------------------------------------------
function clasificarPrioridad(prioridad) {

  if (prioridad >= 4) {
    return "ALTA";
  }

  if (prioridad >= 2) {
    return "MEDIA";
  }

  return "BAJA";
}

// --------------------------------------------------
// CALLBACK DE PROCESAMIENTO
// --------------------------------------------------
function procesarConCallback(solicitud, callback) {

  setTimeout(() => {
    callback(
      `Solicitud ${solicitud.id} procesada con CALLBACK`
    );
  }, 600);
}

// --------------------------------------------------
// PROMESA DE PROCESAMIENTO
// --------------------------------------------------
function procesarConPromesa(solicitud) {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `Solicitud ${solicitud.id} procesada con PROMESA`
      );
    }, 800);
  });
}

// --------------------------------------------------
// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// ESTA FUNCIÓN SÍ SE EXPORTA
// --------------------------------------------------
export async function procesarSolicitudesEj13(solicitudes) {

  // Validación del arreglo de entrada
  if (!Array.isArray(solicitudes)) {
    throw new Error("La entrada debe ser un arreglo de solicitudes");
  }

  // Arreglos inmutables de resultados
  const solicitudesValidas = [];
  const solicitudesInvalidas = [];
  const resultados = [];

  // Contadores para el resumen
  let total = solicitudes.length;
  let validas = 0;
  let invalidas = 0;

  // --------------------------------------------------
  // VALIDACIÓN DE SOLICITUDES
  // --------------------------------------------------
  for (let i = 0; i < solicitudes.length; i++) {

    const solicitud = solicitudes[i];

    try {
      validarSolicitud(solicitud);
      solicitudesValidas.push({ ...solicitud });
      validas = validas + 1;

    } catch (error) {

      solicitudesInvalidas.push({
        id: solicitud?.id ?? null,
        error: error.message
      });

      invalidas = invalidas + 1;
    }
  }

  // --------------------------------------------------
  // PROCESAMIENTO ASÍNCRONO DE SOLICITUDES VÁLIDAS
  // --------------------------------------------------
  for (let i = 0; i < solicitudesValidas.length; i++) {

    const solicitud = solicitudesValidas[i];

    try {

      // Clasificación por prioridad
      const clasificacion = clasificarPrioridad(solicitud.prioridad);

      // PROCESO CON CALLBACK
      const resultadoCallback = await new Promise((resolve) => {
        procesarConCallback(solicitud, resolve);
      });

      // PROCESO CON PROMESA
      const resultadoPromesa = await procesarConPromesa(solicitud);

      // PROCESO CON ASYNC / AWAIT
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Resultado final de la solicitud
      resultados.push({
        id: solicitud.id,
        tipo: solicitud.tipo,
        prioridad: solicitud.prioridad,
        clasificacion: clasificacion,
        estadoFinal: "PROCESADA",
        detalles: [
          resultadoCallback,
          resultadoPromesa,
          "Solicitud procesada con ASYNC/AWAIT"
        ]
      });

    } catch (error) {

      // Manejo de errores de procesamiento
      resultados.push({
        id: solicitud.id,
        estadoFinal: "ERROR",
        mensaje: error.message
      });
    }
  }

  // --------------------------------------------------
  // RETORNO FINAL
  // --------------------------------------------------
  return {
    resumen: {
      totalRecibidas: total,
      validas: validas,
      invalidas: invalidas
    },
    solicitudesInvalidas: solicitudesInvalidas,
    solicitudesProcesadas: resultados
  };
}
