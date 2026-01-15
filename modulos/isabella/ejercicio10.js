// EJERCICIO 10 - SISTEMA DE GESTIÓN DE SOPORTE TÉCNICO
// Este archivo contiene TODA la lógica del ejercicio


// FUNCIÓN CALLBACK (NO SE EXPORTA)
// Valida los datos básicos de la solicitud
function validarSolicitudCallback(solicitud, callback) {

  // setTimeout simula un proceso asincrónico
  setTimeout(() => {

    // Se valida que el ID sea un número positivo
    if (typeof solicitud.id !== "number" || solicitud.id <= 0) {
      callback(new Error("Datos básicos inválidos"), null);
      return;
    }

    // Se valida que el área sea un string no vacío
    if (typeof solicitud.area !== "string" || solicitud.area.trim() === "") {
      callback(new Error("Datos básicos inválidos"), null);
      return;
    }

    // Se valida que la descripción sea un string no vacío
    if (typeof solicitud.descripcion !== "string" || solicitud.descripcion.trim() === "") {
      callback(new Error("Datos básicos inválidos"), null);
      return;
    }

    // Se valida que reportadoPorSistema sea booleano
    if (typeof solicitud.reportadoPorSistema !== "boolean") {
      callback(new Error("Datos básicos inválidos"), null);
      return;
    }

    // Se valida que intentosPrevios sea un número mayor o igual a 0
    if (typeof solicitud.intentosPrevios !== "number" || solicitud.intentosPrevios < 0) {
      callback(new Error("Datos básicos inválidos"), null);
      return;
    }

    // Si todas las validaciones son correctas
    // se retorna la solicitud sin modificar
    callback(null, solicitud);

  }, 300); // Retardo artificial para simular asincronía
}


// FUNCIÓN CON PROMESA (NO SE EXPORTA)
// Valida que el nivel de urgencia esté en rango
function validarUrgenciaPromesa(solicitud) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // Se valida que el nivel de urgencia sea numérico
    if (typeof solicitud.nivelUrgencia !== "number") {
      reject(new Error("Nivel de urgencia fuera de rango (1 a 5)"));
      return;
    }

    // Se valida que el nivel de urgencia esté entre 1 y 5
    if (solicitud.nivelUrgencia < 1 || solicitud.nivelUrgencia > 5) {
      reject(new Error("Nivel de urgencia fuera de rango (1 a 5)"));
      return;
    }

    // Si la validación es correcta, se resuelve la promesa
    resolve(solicitud);
  });
}


// FUNCIÓN DE DECISIÓN (NO SE EXPORTA)
// Determina el estado final de la solicitud
function determinarEstado(solicitud) {

  // Se atiende si la urgencia es alta (4 o 5) y fue reportada por sistema
  if (solicitud.nivelUrgencia >= 4 && solicitud.reportadoPorSistema) {
    return "ATENDIDA";
  }

  // Se rechaza si hay 3 o más intentos previos
  if (solicitud.intentosPrevios >= 3) {
    return "RECHAZADA";
  }

  // En cualquier otro caso, queda en espera
  return "EN ESPERA";
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// ESTA FUNCIÓN SÍ SE EXPORTA
// Es la única función visible para el menú general
export async function procesarSolicitudesEj10(solicitudes) {

  // Arreglo para almacenar solicitudes procesadas correctamente
  const resultados = [];

  // Arreglo para almacenar solicitudes con errores
  const errores = [];

  // Se recorre el arreglo usando un ciclo for...of
  for (const solicitud of solicitudes) {

    try {

      // VALIDACIÓN CON CALLBACK
      // Se envuelve la función callback dentro de una promesa
      const validada = await new Promise((resolve, reject) => {

        // Se llama a la validación básica
        validarSolicitudCallback(solicitud, (error, data) => {

          // Si hay error se rechaza la promesa, si no se resuelve
          error ? reject(error) : resolve(data);
        });
      });

      // VALIDACIÓN CON PROMESA
      // Se valida el nivel de urgencia usando promesas
      const urgenciaValida = await validarUrgenciaPromesa(validada);

      // Se determina el estado final de la solicitud
      const estadoFinal = determinarEstado(urgenciaValida);

      // Se crea un nuevo objeto con el estado determinado
      // Se garantiza inmutabilidad usando spread operator
      const resultadoFinal = {
        ...urgenciaValida,
        estado: estadoFinal
      };

      // Se agrega al arreglo de resultados
      resultados.push(resultadoFinal);

    } catch (error) {

      // Si falla una solicitud
      // se almacena el error sin detener el sistema
      errores.push({
        id: solicitud.id ?? "SIN ID",
        mensaje: error.message
      });
    }
  }

  // RESULTADO FINAL
  // Se retorna un objeto con todos los resultados
  return { 
    resultados: resultados, 
    errores: errores 
  };
}