// EJERCICIO 15 - SISTEMA DE GESTIÓN Y VALIDACIÓN DE SOLICITUDES DE SOPORTE
// Este módulo analiza, valida, clasifica y procesa solicitudes de soporte técnico
// usando validaciones estrictas, asincronía y manejo controlado de errores.


// ---------------- VALIDACIÓN DE UNA SOLICITUD ----------------
// Función pura: no muta la solicitud original
function validarSolicitud(solicitud) {

  // Desestructuración para facilitar validaciones
  const { id, usuario, tipo, nivel, activo } = solicitud;

  // Validación de ID
  if (typeof id !== "number" || id <= 0) {
    return { valida: false, motivo: "ID inválido" };
  }

  // Validación de usuario
  if (typeof usuario !== "string" || usuario.trim() === "") {
    return { valida: false, motivo: "Usuario inválido" };
  }

  // Validación del tipo
  const tiposPermitidos = ["hardware", "software", "red"];
  if (!tiposPermitidos.includes(tipo)) {
    return { valida: false, motivo: "Tipo de problema inválido" };
  }

  // Validación del nivel
  if (typeof nivel !== "number" || nivel < 1 || nivel > 5) {
    return { valida: false, motivo: "Nivel de urgencia fuera de rango" };
  }

  // Validación de estado activo
  if (typeof activo !== "boolean" || activo === false) {
    return { valida: false, motivo: "Solicitud inactiva" };
  }

  // Si pasa todas las validaciones
  return { valida: true };
}


// ---------------- CLASIFICACIÓN DE PRIORIDAD ----------------
function clasificarPrioridad(nivel) {

  if (nivel >= 4) return "ALTA";
  if (nivel >= 2) return "MEDIA";
  return "BAJA";
}


// ---------------- PROCESO ASINCRÓNICO CON CALLBACK ----------------
function procesarConCallback(solicitud, callback) {
  setTimeout(() => {
    callback(null, `Solicitud ${solicitud.id} procesada por CALLBACK`);
  }, 500);
}


// ---------------- PROCESO ASINCRÓNICO CON PROMESA ----------------
function procesarConPromesa(solicitud) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Solicitud ${solicitud.id} procesada con PROMESA`);
    }, 700);
  });
}


// ---------------- PROCESO ASINCRÓNICO CON ASYNC/AWAIT ----------------
async function procesarConAsyncAwait(solicitud) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Solicitud ${solicitud.id} procesada con ASYNC/AWAIT`);
    }, 900);
  });
}


// ---------------- FUNCIÓN PRINCIPAL ----------------
export async function procesarSolicitudesEj15(solicitudes) {

  // Garantía de inmutabilidad
  const solicitudesOriginales = [...solicitudes];

  const solicitudesValidas = [];
  const solicitudesInvalidas = [];
  const procesadas = [];

  try {

    // Validación y separación
    for (const solicitud of solicitudesOriginales) {

      const resultado = validarSolicitud(solicitud);

      if (!resultado.valida) {
        solicitudesInvalidas.push({
          id: solicitud.id,
          motivo: resultado.motivo
        });
        continue;
      }

      // Clasificación
      solicitudesValidas.push({
        ...solicitud,
        prioridad: clasificarPrioridad(solicitud.nivel)
      });
    }

    // Procesamiento asincrónico
    for (let i = 0; i < solicitudesValidas.length; i++) {

      const solicitud = solicitudesValidas[i];

      // Alternancia de métodos asincrónicos
      if (i % 3 === 0) {
        await new Promise((resolve, reject) => {
          procesarConCallback(solicitud, (err, msg) => {
            if (err) reject(err);
            procesadas.push(msg);
            resolve();
          });
        });

      } else if (i % 3 === 1) {
        const msg = await procesarConPromesa(solicitud);
        procesadas.push(msg);

      } else {
        const msg = await procesarConAsyncAwait(solicitud);
        procesadas.push(msg);
      }
    }

    // Resultado final estructurado
    return {
      estadoSistema: "Proceso finalizado correctamente",
      solicitudesValidas,
      solicitudesInvalidas,
      procesadas
    };

  } catch (error) {

    // Error controlado
    return {
      estadoSistema: "Error controlado en el sistema",
      mensaje: error.message,
      solicitudesValidas,
      solicitudesInvalidas
    };
  }
}
