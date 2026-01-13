// SISTEMA DE VALIDACIÓN Y DECISIÓN DE SOLICITUDES
// Este archivo contiene la lógica completa del Ejercicio 2

// FUNCIÓN DE VALIDACIÓN (NO SE EXPORTA)
// Valida los datos básicos de una solicitud
function validarSolicitud(solicitud) {

  // Se valida que el ID sea un número válido
  if (typeof solicitud.id !== "number" || isNaN(solicitud.id)) {
    throw new Error("ID inválido");
  }

  // Se valida que el tipo de operación sea texto no vacío
  if (typeof solicitud.tipo !== "string" || solicitud.tipo.trim() === "") {
    throw new Error("Tipo de operación inválido");
  }

  // Se valida que el valor sea un número válido
  if (typeof solicitud.valor !== "number" || isNaN(solicitud.valor)) {
    throw new Error("Valor inválido");
  }

  // Se valida que el estado sea booleano
  if (typeof solicitud.estado !== "boolean") {
    throw new Error("Estado inválido");
  }

  // Se valida que la prioridad esté entre 1 y 5
  if (
    typeof solicitud.prioridad !== "number" ||
    solicitud.prioridad < 1 ||
    solicitud.prioridad > 5
  ) {
    throw new Error("Prioridad fuera de rango");
  }

  // Si todas las validaciones son correctas, se retorna true
  return true;
}


// FUNCIÓN DE DECISIÓN (FUNCIÓN PURA)
// Determina el resultado de la solicitud
// No modifica el objeto recibido
function decidirResultado(solicitud) {

  // Si el valor es menor o igual a cero, la solicitud es inválida
  if (solicitud.valor <= 0) {
    return "INVÁLIDA";
  }

  // Si la solicitud no está activa y tiene baja prioridad, se rechaza
  if (!solicitud.estado && solicitud.prioridad < 3) {
    return "RECHAZADA";
  }

  // En cualquier otro caso, la solicitud se aprueba
  return "APROBADA";
}


// CALLBACK (NO SE EXPORTA)
// Simula una notificación posterior al proceso
function notificarResultado(resultado) {

  // Retorna un mensaje de notificación
  return `Notificación enviada: ${resultado}`;
}


// PROMESA ASINCRÓNICA (NO SE EXPORTA)
// Simula un proceso externo asincrónico
function procesoAsincronico() {

  // Se retorna una promesa
  return new Promise((resolve) => {

    // Se simula un retardo de 800 milisegundos
    setTimeout(() => {
      resolve("Proceso externo finalizado");
    }, 800);
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// ESTA FUNCIÓN SÍ SE EXPORTA
// Es la función que usa el menú y el barril
export async function procesarSolicitudEj2(solicitud) {

  try {

    // VALIDACIÓN DE LOS DATOS
    // Se validan los datos básicos de la solicitud
    validarSolicitud(solicitud);

    // PROCESO ASINCRÓNICO
    // Se espera la finalización del proceso externo
    await procesoAsincronico();

    // DECISIÓN FINAL
    // Se decide el resultado de la solicitud
    const resultado = decidirResultado(solicitud);

    // CALLBACK DE NOTIFICACIÓN
    // Se ejecuta el callback con el resultado
    const notificacion = notificarResultado(resultado);

    // RESULTADO FINAL
    // Se retorna un objeto con la información del proceso
    return {
      id: solicitud.id,
      resultado,
      notificacion
    };

  } catch (error) {

    // MANEJO DE ERRORES CONTROLADOS
    // Se retorna un objeto de error controlado
    return {
      id: solicitud?.id ?? null,
      resultado: "ERROR",
      mensaje: error.message
    };
  }
}
