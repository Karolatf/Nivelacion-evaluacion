// EJERCICIO 21
// Sistema de Gestión de Solicitudes de Soporte Técnico
// Este archivo contiene TODA la lógica del ejercicio

// ===============================
// VALIDACIÓN DE UNA SOLICITUD
// ===============================
// Función pura: valida sin modificar el objeto original
function validarSolicitud(solicitud) {

  // Validación del id
  if (typeof solicitud.id !== "number" || isNaN(solicitud.id)) {
    throw new Error("ID inválido");
  }

  // Validación del usuario
  if (typeof solicitud.usuario !== "string" || solicitud.usuario.trim() === "") {
    throw new Error("Usuario inválido");
  }

  // Validación del tipo de problema
  const tiposPermitidos = ["hardware", "software", "red"];
  if (!tiposPermitidos.includes(solicitud.tipo)) {
    throw new Error("Tipo de problema no permitido");
  }

  // Validación de prioridad
  if (
    typeof solicitud.prioridad !== "number" ||
    solicitud.prioridad < 1 ||
    solicitud.prioridad > 5
  ) {
    throw new Error("Prioridad fuera de rango (1 a 5)");
  }

  // Validación del estado inicial
  if (solicitud.estado !== "pendiente") {
    throw new Error("Estado inicial inválido");
  }

  return true;
}

// ===============================
// CLASIFICACIÓN POR PRIORIDAD
// ===============================
// Función pura: retorna la clasificación sin modificar datos
function clasificarPrioridad(prioridad) {
  if (prioridad >= 4) return "alta";
  if (prioridad >= 2) return "media";
  return "baja";
}

// ===============================
// ASIGNACIÓN DE NUEVO ESTADO
// ===============================
// Función pura que define el nuevo estado
function asignarEstado(clasificacion) {
  if (clasificacion === "alta") return "escalado";
  if (clasificacion === "media") return "en_proceso";
  return "pendiente";
}

// ===============================
// CALLBACK ASÍNCRONO
// ===============================
// Simula el envío con callback
function envioConCallback(solicitud, callback) {
  setTimeout(() => {
    callback(null, `Solicitud ${solicitud.id} enviada con callback`);
  }, 400);
}

// ===============================
// PROMESA ASÍNCRONA
// ===============================
function envioConPromesa(solicitud) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Solicitud ${solicitud.id} enviada con promesa`);
    }, 400);
  });
}

// ===============================
// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// ===============================
// ESTA FUNCIÓN SÍ SE EXPORTA
export async function procesarSolicitudesEj21(solicitudes) {

  // Arreglos inmutables de salida
  const procesadas = [];
  const rechazadas = [];

  // Se recorre el arreglo original SIN modificarlo
  for (let i = 0; i < solicitudes.length; i++) {

    const solicitud = solicitudes[i];

    try {
      // VALIDACIÓN
      validarSolicitud(solicitud);

      // CLASIFICACIÓN
      const clasificacion = clasificarPrioridad(solicitud.prioridad);

      // NUEVO ESTADO
      const nuevoEstado = asignarEstado(clasificacion);

      // PROCESAMIENTO INMUTABLE
      const nuevaSolicitud = {
        ...solicitud,
        clasificacion: clasificacion,
        estado: nuevoEstado
      };

      // CALLBACK
      await new Promise((resolve, reject) => {
        envioConCallback(nuevaSolicitud, (error, mensaje) => {
          if (error) reject(error);
          console.log(mensaje);
          resolve();
        });
      });

      // PROMESA
      const mensajePromesa = await envioConPromesa(nuevaSolicitud);
      console.log(mensajePromesa);

      // ASYNC / AWAIT (simulación final)
      await new Promise(resolve => setTimeout(resolve, 300));

      procesadas.push(nuevaSolicitud);

    } catch (error) {

      // MANEJO DE ERRORES CONTROLADO
      rechazadas.push({
        id: solicitud?.id ?? null,
        error: error.message
      });
    }
  }

  return {
    originales: solicitudes,
    procesadas: procesadas,
    rechazadas: rechazadas
  };
}
