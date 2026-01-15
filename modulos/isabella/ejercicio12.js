// EJERCICIO 12 - SISTEMA DE GESTIÓN ASÍNCRONA DE SOLICITUDES
// Este archivo contiene TODA la lógica del ejercicio


// FUNCIÓN CALLBACK (NO SE EXPORTA)
// Valida los datos básicos de la solicitud
function validarSolicitudCallback(solicitud, callback) {

  // setTimeout simula un proceso asincrónico
  setTimeout(() => {

    // Se valida que el ID sea un número positivo
    if (typeof solicitud.id !== "number" || solicitud.id <= 0) {
      callback(new Error("Datos inválidos en la solicitud"), null);
      return;
    }

    // Se valida que el usuario sea un string no vacío
    if (typeof solicitud.usuario !== "string" || solicitud.usuario.trim() === "") {
      callback(new Error("Datos inválidos en la solicitud"), null);
      return;
    }

    // Se valida que el tipo sea "software" o "hardware"
    if (solicitud.tipo !== "software" && solicitud.tipo !== "hardware") {
      callback(new Error("Datos inválidos en la solicitud"), null);
      return;
    }

    // Se valida que la prioridad sea numérica
    if (typeof solicitud.prioridad !== "number") {
      callback(new Error("Datos inválidos en la solicitud"), null);
      return;
    }

    // Se valida que la descripción sea un string no vacío
    if (typeof solicitud.descripcion !== "string" || solicitud.descripcion.trim() === "") {
      callback(new Error("Datos inválidos en la solicitud"), null);
      return;
    }

    // Se valida que el estado sea "pendiente"
    if (solicitud.estado !== "pendiente") {
      callback(new Error("Datos inválidos en la solicitud"), null);
      return;
    }

    // Si todas las validaciones son correctas
    // se retorna la solicitud sin modificar
    callback(null, solicitud);

  }, 300); // Retardo artificial para simular asincronía
}


// FUNCIÓN CON PROMESA (NO SE EXPORTA)
// Valida que la prioridad esté en rango
function validarPrioridadPromesa(solicitud) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // Se valida que la prioridad esté entre 1 y 5
    if (solicitud.prioridad < 1 || solicitud.prioridad > 5) {

      // Si está fuera de rango, se rechaza la promesa
      reject(new Error("Prioridad fuera del rango permitido (1 a 5)"));

    } else {

      // Si está en rango, se resuelve la promesa
      resolve(solicitud);
    }
  });
}


// FUNCIÓN DE CLASIFICACIÓN (NO SE EXPORTA)
// Clasifica la prioridad en categorías
function clasificarPrioridad(prioridad) {

  // Alta prioridad: 4 o 5
  if (prioridad >= 4) {
    return "Alta prioridad";
  }

  // Prioridad media: 2 o 3
  if (prioridad >= 2) {
    return "Prioridad media";
  }

  // Baja prioridad: 1
  return "Baja prioridad";
}


// FUNCIÓN CON PROMESA (NO SE EXPORTA)
// Simula la atención de una solicitud con tiempo variable
function atenderSolicitudPromesa(solicitud) {

  // Se calcula el tiempo de atención según la prioridad
  // Alta prioridad: 500ms, Media: 800ms, Baja: 1200ms
  const tiempoAtencion = solicitud.prioridad >= 4
    ? 500
    : solicitud.prioridad >= 2
    ? 800
    : 1200;

  // Se retorna una promesa
  return new Promise((resolve) => {

    // setTimeout simula el tiempo de atención
    setTimeout(() => {

      // Se crea un nuevo objeto con estado "atendida"
      // Se garantiza inmutabilidad usando spread operator
      resolve({
        ...solicitud,
        estado: "atendida"
      });

    }, tiempoAtencion);
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// ESTA FUNCIÓN SÍ SE EXPORTA
// Es la única función visible para el menú general
export async function procesarSolicitudesEj12(solicitudes = []) {

  // Arreglo para almacenar solicitudes procesadas correctamente
  const resultados = [];

  // Arreglo para almacenar solicitudes con errores
  const errores = [];

  // Validación inicial: debe ser un arreglo no vacío
  if (!Array.isArray(solicitudes) || solicitudes.length === 0) {
    return {
      resultados: [],
      errores: [{ mensaje: "El arreglo de solicitudes está vacío o es inválido" }],
      estadoSistema: "PROCESO FINALIZADO CON ERRORES"
    };
  }

  // Se recorre el arreglo usando un ciclo for...of
  for (const solicitud of solicitudes) {

    try {

      // Se registra el inicio de la validación en consola
      console.log(`Iniciando validación de la solicitud ${solicitud.id}`);

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
      // Se valida la prioridad usando promesas
      const prioridadValida = await validarPrioridadPromesa(validada);

      // Se clasifica la prioridad
      const clasificacion = clasificarPrioridad(prioridadValida.prioridad);

      // Se registra el inicio de la atención en consola
      console.log(`Atendiendo solicitud ${prioridadValida.id} (${clasificacion})`);

      // ATENCIÓN ASINCRÓNICA
      // Se simula la atención de la solicitud
      const atendida = await atenderSolicitudPromesa(prioridadValida);

      // Se crea un nuevo objeto de salida
      // Se garantiza inmutabilidad
      resultados.push({
        id: atendida.id,
        usuario: atendida.usuario,
        tipo: atendida.tipo,
        prioridad: atendida.prioridad,
        clasificacion: clasificacion,
        estado: atendida.estado
      });

      // Se registra el éxito en consola
      console.log(`Solicitud ${atendida.id} procesada correctamente`);

    } catch (error) {

      // Si falla una solicitud
      // se almacena el error sin detener el sistema
      errores.push({
        id: solicitud.id ?? "SIN ID",
        mensaje: error.message
      });

      // Se registra el error en consola
      console.log(`Solicitud rechazada: ${error.message}`);
    }
  }

  // Se determina el estado general del sistema
  const estadoSistema = errores.length === 0
    ? "TODAS LAS SOLICITUDES FUERON PROCESADAS"
    : "PROCESO COMPLETADO CON ERRORES";

  // RESULTADO FINAL
  // Se retorna un objeto con todos los resultados
  return {
    resultados: resultados,
    errores: errores,
    estadoSistema: estadoSistema
  };
}