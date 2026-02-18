// SISTEMA DE VALIDACIÓN Y DECISIÓN DE SOLICITUDES
// Este archivo centraliza la lógica de negocio, validaciones y procesamiento estadístico del Ejercicio 2.

// FUNCIÓN DE VALIDACIÓN (Interna)
// Implementa la verificación de tipos y reglas lógicas para asegurar la integridad de cada objeto.
function validarSolicitud(solicitud) {

  // Verificamos que el ID sea numérico y descartamos valores NaN para garantizar una identificación única válida.
  if (typeof solicitud.id !== "number" || isNaN(solicitud.id)) {
    throw new Error("ID inválido");
  }

  // Validamos que el tipo sea una cadena y usamos .trim() para asegurar que no se envíen textos vacíos.
  if (typeof solicitud.tipo !== "string" || solicitud.tipo.trim() === "") {
    throw new Error("Tipo de operación inválido");
  }

  // Aseguramos que el valor económico de la operación sea un número real.
  if (typeof solicitud.valor !== "number" || isNaN(solicitud.valor)) {
    throw new Error("Valor inválido");
  }

  // Verificación estricta del tipo booleano para el estado, cumpliendo con el requisito de tipos de datos.
  if (typeof solicitud.estado !== "boolean") {
    throw new Error("Estado inválido");
  }

  // Validamos que la prioridad se encuentre dentro del rango operativo permitido (1 a 5).
  if (
    typeof solicitud.prioridad !== "number" ||
    solicitud.prioridad < 1 ||
    solicitud.prioridad > 5
  ) {
    throw new Error("Prioridad fuera de rango");
  }

  // Si todas las reglas se cumplen, la función confirma la validez de la estructura.
  return true;
}


// FUNCIÓN DE DECISIÓN (Función Pura)
// Aplica las reglas de negocio para clasificar la solicitud sin alterar el objeto original (Inmutabilidad).
function decidirResultado(solicitud) {

  // Regla 1: Valores menores o iguales a cero se clasifican automáticamente como INVÁLIDA.
  if (solicitud.valor <= 0) {
    return "INVÁLIDA";
  }

  // Regla 2: Solicitudes inactivas con baja prioridad son rechazadas por política del sistema.
  if (!solicitud.estado && solicitud.prioridad < 3) {
    return "RECHAZADA";
  }

  // Regla 3: Si no se cumplen los criterios de rechazo o invalidez, la solicitud es APROBADA.
  return "APROBADA";
}


// CALLBACK (Simulación de Proceso Externo)
// Representa una acción dependiente que se ejecuta después de procesar la solicitud.
function notificarResultado(resultado) {
  // Retornamos un string interpolado que confirma la acción del sistema.
  return `Notificación enviada: ${resultado}`;
}


// PROMESA ASINCRÓNICA
// Simula una dependencia de red o base de datos con un retardo controlado.
function procesoAsincronico() {
  // Retornamos una nueva Promesa que se resuelve tras 800 milisegundos usando setTimeout.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Proceso externo finalizado");
    }, 800);
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT (Exportada)
// Recibe el arreglo completo de solicitudes y gestiona el flujo de procesamiento y estadísticas.
export async function procesarSolicitudEj2(solicitudes) {

  // Definimos acumuladores locales para generar el resumen final requerido por la guía.
  let totalProcesadas = 0;
  let aprobadas = 0;
  let rechazadas = 0;
  let invalidas = 0;
  let errores = 0;

  // Estructura de datos inmutable para almacenar los resultados individuales.
  const resultados = [];

  // Iteramos sobre el arreglo de solicitudes de manera secuencial para procesarlas una por una.
  for (let i = 0; i < solicitudes.length; i++) {
    
    const solicitud = solicitudes[i];

    try {
      // FASE 1: Validación técnica. Si falla, el flujo salta directamente al bloque 'catch'.
      validarSolicitud(solicitud);

      // FASE 2: Consumo de la Promesa. 'await' detiene la ejecución actual hasta que el proceso finalice.
      await procesoAsincronico();

      // FASE 3: Aplicación de lógica de negocio para obtener la clasificación.
      const resultado = decidirResultado(solicitud);

      // FASE 4: Ejecución del Callback para generar el mensaje de notificación.
      const notificacion = notificarResultado(resultado);

      // FASE 5: Almacenamiento del resultado procesado con éxito.
      resultados.push({
        id: solicitud.id,
        resultado: resultado,
        notificacion: notificacion
      });

      // Actualizamos los contadores de control estadístico.
      totalProcesadas = totalProcesadas + 1;

      // Estructuras condicionales para clasificar el resultado en el resumen final.
      if (resultado === "APROBADA") {
        aprobadas = aprobadas + 1;
      }
      if (resultado === "RECHAZADA") {
        rechazadas = rechazadas + 1;
      }
      if (resultado === "INVÁLIDA") {
        invalidas = invalidas + 1;
      }

    } catch (error) {
      // FASE DE CONTINGENCIA: Si ocurre un error, el programa no se detiene y registra la falla.
      resultados.push({
        id: solicitud?.id ?? null,
        resultado: "ERROR",
        mensaje: error.message
      });

      // Incrementamos el contador de errores sin interrumpir el ciclo de las demás solicitudes.
      errores = errores + 1;
    }
  }

  // Al finalizar el ciclo, retornamos un objeto compuesto con el detalle individual y el resumen consolidado.
  return {
    resultados: resultados,
    resumen: {
      total: totalProcesadas,
      aprobadas: aprobadas,
      rechazadas: rechazadas,
      invalidas: invalidas,
      errores: errores
    }
  };
}