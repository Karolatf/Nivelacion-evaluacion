// EJERCICIO 6 - SISTEMA DE GESTIÓN Y VALIDACIÓN DE SERVICIOS

/**
 * FUNCIÓN PRINCIPAL (ASYNC / AWAIT)
 * Es la ÚNICA función exportada
 * Controla el flujo completo del sistema
 */
export async function procesarSolicitudesServicio(solicitudes) {

  const resultados = [];

  let aprobadas = 0;
  let rechazadas = 0;

  // Ciclo for para mantener orden y permitir await real
  for (let i = 0; i < solicitudes.length; i++) {
    try {

      // Se clona la solicitud para garantizar inmutabilidad
      const solicitudCopia = { ...solicitudes[i] };

      // VALIDACIÓN CON CALLBACK (envuelta en promesa)
      await new Promise((resolve, reject) => {
        validarSolicitudInicial(solicitudCopia, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });

      // PROCESAMIENTO ASINCRÓNICO (PROMESA)
      const resultado = await evaluarSolicitudExterna(solicitudCopia);

      resultados.push(resultado);
      aprobadas++;

    } catch (error) {

      // Manejo de error SIN BLOQUEAR EL FLUJO
      resultados.push({
        id: solicitudes[i]?.id ?? null,
        estado: "RECHAZADA",
        motivo: error.message
      });

      rechazadas++;
    }
  }

  // Resumen final
  return {
    totalProcesadas: solicitudes.length,
    totalAprobadas: aprobadas,
    totalRechazadas: rechazadas,
    detalle: resultados
  };
}

/**
 * VALIDACIÓN INICIAL CON CALLBACK
 * Separa reglas rápidas y críticas
 */
function validarSolicitudInicial(solicitud, callback) {

  setTimeout(() => {
    try {

      // Validación de ID
      if (typeof solicitud.id !== "number") {
        throw new Error("ID inválido");
      }

      // Validación de cliente
      if (typeof solicitud.cliente !== "string" || solicitud.cliente.trim() === "") {
        throw new Error("Nombre de cliente inválido");
      }

      // Validación de tipo de servicio
      if (typeof solicitud.tipoServicio !== "string") {
        throw new Error("Tipo de servicio inválido");
      }

      // Validación de prioridad (1 a 5)
      if (
        !Number.isInteger(solicitud.prioridad) ||
        solicitud.prioridad < 1 ||
        solicitud.prioridad > 5
      ) {
        throw new Error("Prioridad fuera de rango (1 a 5)");
      }

      // Validación de estado activo
      if (solicitud.activo !== true) {
        throw new Error("La solicitud está desactivada");
      }

      // Si todo es correcto
      callback(null);

    } catch (error) {
      callback(error);
    }
  }, 300);
}

/**
 * PROCESAMIENTO ASINCRÓNICO CON PROMESA
 * Simula dependencia de servicio externo
 */
function evaluarSolicitudExterna(solicitud) {

  return new Promise((resolve, reject) => {

    const tiempo = Math.floor(Math.random() * 2000) + 500;

    setTimeout(() => {

      try {

        // Reglas de negocio simuladas
        if (solicitud.prioridad < 3) {
          throw new Error("Prioridad insuficiente para el servicio");
        }

        // Solicitud aprobada
        resolve({
          id: solicitud.id,
          estado: "APROBADA",
          motivo: "Solicitud validada y aceptada correctamente"
        });

      } catch (error) {
        reject(error);
      }

    }, tiempo);
  });
}
