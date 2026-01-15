// EJERCICIO 6 - SISTEMA DE GESTIÓN Y VALIDACIÓN DE SERVICIOS
// Este archivo contiene TODA la lógica del ejercicio


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// ESTA FUNCIÓN SÍ SE EXPORTA
// Es la única función visible para el menú general
export async function procesarSolicitudesServicio(solicitudes) {

  // Arreglo para almacenar los resultados de cada solicitud
  const resultados = [];

  // Contador de solicitudes aprobadas
  let aprobadas = 0;

  // Contador de solicitudes rechazadas
  let rechazadas = 0;

  // Se recorre el arreglo usando un ciclo for clásico
  for (let i = 0; i < solicitudes.length; i++) {

    try {

      // Se clona la solicitud para garantizar inmutabilidad
      const solicitudCopia = { ...solicitudes[i] };

      // VALIDACIÓN CON CALLBACK
      // Se envuelve la función callback dentro de una promesa
      await new Promise((resolve, reject) => {

        // Se llama a la validación inicial
        validarSolicitudInicial(solicitudCopia, (error) => {

          // Si hay error se rechaza la promesa
          if (error) {
            reject(error);
          } 
          // Si no hay error se continúa
          else {
            resolve();
          }
        });
      });

      // PROCESAMIENTO ASINCRÓNICO CON PROMESA
      // Se evalúa la solicitud con un servicio externo simulado
      const resultado = await evaluarSolicitudExterna(solicitudCopia);

      // Se agrega el resultado al arreglo
      resultados.push(resultado);

      // Se incrementa el contador de aprobadas
      aprobadas++;

    } catch (error) {

      // Manejo de error sin bloquear el flujo
      // Si falla una solicitud, se registra pero el sistema continúa
      resultados.push({
        id: solicitudes[i]?.id ?? null,
        estado: "RECHAZADA",
        motivo: error.message
      });

      // Se incrementa el contador de rechazadas
      rechazadas++;
    }
  }

  // Se retorna un objeto con el resumen final
  return {
    totalProcesadas: solicitudes.length,
    totalAprobadas: aprobadas,
    totalRechazadas: rechazadas,
    detalle: resultados
  };
}


// FUNCIÓN CALLBACK (NO SE EXPORTA)
// Valida los datos iniciales de la solicitud
function validarSolicitudInicial(solicitud, callback) {

  // setTimeout simula un proceso asincrónico
  setTimeout(() => {

    try {

      // Se valida que el ID sea un número
      if (typeof solicitud.id !== "number") {
        throw new Error("ID inválido");
      }

      // Se valida que el cliente sea un string no vacío
      if (typeof solicitud.cliente !== "string" || solicitud.cliente.trim() === "") {
        throw new Error("Nombre de cliente inválido");
      }

      // Se valida que el tipo de servicio sea un string
      if (typeof solicitud.tipoServicio !== "string") {
        throw new Error("Tipo de servicio inválido");
      }

      // Se valida que la prioridad sea un número entero entre 1 y 5
      if (
        !Number.isInteger(solicitud.prioridad) ||
        solicitud.prioridad < 1 ||
        solicitud.prioridad > 5
      ) {
        throw new Error("Prioridad fuera de rango (1 a 5)");
      }

      // Se valida que la solicitud esté activa
      if (solicitud.activo !== true) {
        throw new Error("La solicitud está desactivada");
      }

      // Si todas las validaciones son correctas
      // se retorna éxito mediante el callback
      callback(null);

    } catch (error) {

      // Si ocurre cualquier error
      // se retorna de forma controlada por callback
      callback(error);
    }

  }, 300); // Retardo artificial para simular asincronía
}


// FUNCIÓN CON PROMESA (NO SE EXPORTA)
// Simula la evaluación de la solicitud por un servicio externo
function evaluarSolicitudExterna(solicitud) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // Se calcula un tiempo de procesamiento variable (entre 500ms y 2500ms)
    const tiempo = Math.floor(Math.random() * 2000) + 500;

    // setTimeout simula un proceso asincrónico
    setTimeout(() => {

      try {

        // Se aplica regla de negocio
        // Se rechaza si la prioridad es menor a 3
        if (solicitud.prioridad < 3) {
          throw new Error("Prioridad insuficiente para el servicio");
        }

        // Si la prioridad es suficiente, se aprueba la solicitud
        resolve({
          id: solicitud.id,
          estado: "APROBADA",
          motivo: "Solicitud validada y aceptada correctamente"
        });

      } catch (error) {

        // Si ocurre un error, se rechaza la promesa
        reject(error);
      }

    }, tiempo);
  });
}