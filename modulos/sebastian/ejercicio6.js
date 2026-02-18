// SISTEMA DE GESTIÓN Y VALIDACIÓN DE SERVICIOS
// Este módulo centraliza la orquestación secuencial de solicitudes técnicas y la validación de integridad.

// FUNCIÓN CALLBACK (Validación Inicial)
// JUSTIFICACIÓN: Se implementa para cumplir con el punto 'a' del PDF, realizando una verificación previa de tipos y estado.
// RECIBE: El objeto 'solicitud' y un 'callback'. RETORNA: El error o el éxito mediante la función de retorno.
function validarSolicitudInicial(solicitud, callback) {

  // Simulamos una validación interna con un retardo de 300ms.
  setTimeout(() => {
    try {
      // Verificación técnica: El identificador debe ser numérico y válido.
      if (typeof solicitud.id !== "number" || isNaN(solicitud.id)) {
        throw new Error("ID invalido");
      }

      // Validación de identidad: Se asegura que el cliente sea una cadena de texto no vacía.
      if (typeof solicitud.cliente !== "string" || solicitud.cliente.trim() === "") {
        throw new Error("Nombre de cliente invalido");
      }

      // Validación del tipo de servicio: Requisito del PDF para asegurar la coherencia del dato.
      if (typeof solicitud.tipoServicio !== "string") {
        throw new Error("Tipo de servicio invalido");
      }

      // REGLA DE NEGOCIO COMBINADA (Operadores Lógicos):
      // Validamos que la prioridad (definida por el aprendiz como 1-5) sea un entero y esté en el rango permitido.
      if (
        !Number.isInteger(solicitud.prioridad) ||
        solicitud.prioridad < 1 ||
        solicitud.prioridad > 5
      ) {
        throw new Error("Prioridad fuera de rango (1 a 5)");
      }

      // Verificación de disponibilidad: La solicitud debe estar activa para ser procesable.
      if (solicitud.activo !== true) {
        throw new Error("La solicitud esta desactivada");
      }

      // Si todas las validaciones son correctas, invocamos el callback sin errores.
      callback(null);

    } catch (error) {
      // En caso de fallo técnico, el error se captura y se envía de forma controlada.
      callback(error);
    }
  }, 300);
}


// PROMESA ASINCRÓNICA (Evaluación de Servicio Externo)
// JUSTIFICACIÓN: Se utiliza para cumplir con el punto 'b' del PDF, simulando una dependencia externa.
// RECIBE: La solicitud validada. RETORNA: Una Promesa con el resultado de la aprobación.
function evaluarSolicitudExterna(solicitud) {

  return new Promise((resolve, reject) => {

    // Simulamos un tiempo de procesamiento variable (Punto 'b' del PDF) entre 500ms y 2500ms.
    const tiempo = Math.floor(Math.random() * 2000) + 500;

    setTimeout(() => {
      try {
        // REGLA DE NEGOCIO PARA ACEPTACIÓN:
        // Decidimos rechazar si la prioridad es menor a 3, simulando un criterio de alta demanda.
        if (solicitud.prioridad < 3) {
          throw new Error("Prioridad insuficiente para el servicio");
        }

        // Si cumple la regla, resolvemos la promesa con el objeto de éxito.
        resolve({
          id: solicitud.id,
          estado: "APROBADA",
          motivo: "Solicitud validada y aceptada correctamente"
        });

      } catch (error) {
        // El rechazo de la promesa se captura en el flujo principal para gestionar la estadística de rechazadas.
        reject(error);
      }
    }, tiempo);
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT (Orquestador)
// JUSTIFICACIÓN: Coordina el flujo general (Punto 'c' del PDF) asegurando el procesamiento secuencial y ordenado.
export async function procesarSolicitudesServicio(solicitudes) {

  // Creamos una nueva estructura de datos (Resultados) para mantener la inmutabilidad de la fuente original.
  const resultados = [];
  let aprobadas = 0;
  let rechazadas = 0;

  try {
    // Verificamos que la entrada sea un arreglo para evitar bloqueos del sistema.
    if (!Array.isArray(solicitudes)) {
      throw new Error("Las solicitudes deben ser un arreglo");
    }

    // CICLO FOR CLÁSICO: Se utiliza para garantizar el procesamiento SECUENCIAL (await espera el turno de cada una).
    for (let i = 0; i < solicitudes.length; i++) {

      try {
        // INMUTABILIDAD: Realizamos un 'Shallow Copy' de la solicitud actual para proteger los datos originales.
        const solicitudCopia = { ...solicitudes[i] };

        // FASE 1: Integración del Callback promidificado para la validación inicial obligatoria.
        await new Promise((resolve, reject) => {
          validarSolicitudInicial(solicitudCopia, (error) => {
            if (error) reject(error); else resolve();
          });
        });

        // FASE 2: Procesamiento con la Promesa externa asincrónica.
        const resultado = await evaluarSolicitudExterna(solicitudCopia);

        // FASE 3: Almacenamiento del resultado y actualización de estadísticas de aprobación.
        resultados.push(resultado);
        aprobadas = aprobadas + 1;

      } catch (error) {
        // MANEJO DE ERRORES: Capturamos fallos individuales sin detener la ejecución de las demás solicitudes.
        resultados.push({
          id: solicitudes[i]?.id ?? null,
          estado: "RECHAZADA",
          motivo: error.message
        });

        // Incrementamos el contador de rechazadas para el reporte final.
        rechazadas = rechazadas + 1;
      }
    }

    // Retorno del objeto consolidado con el resumen estadístico exigido por el PDF.
    return {
      totalProcesadas: solicitudes.length,
      totalAprobadas: aprobadas,
      totalRechazadas: rechazadas,
      detalle: resultados
    };

  } catch (errorGeneral) {
    // Captura de errores críticos a nivel de sistema.
    return {
      estado: "ERROR",
      mensaje: errorGeneral.message
    };
  }
}