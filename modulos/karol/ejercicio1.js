// SISTEMA DE VALIDACIÓN Y PROCESAMIENTO DE SOLICITUDES
// Este archivo contiene TODA la lógica del Ejercicio 1

// FUNCIÓN CALLBACK (NO SE EXPORTA)
// Simula una validación externa usando callback
// Solo se usa internamente en este archivo
function validarEstadoInicial(estado, callback) {

  // setTimeout simula un proceso asincrónico
  setTimeout(() => {

    // Se valida que el estado sea booleano
    if (typeof estado !== "boolean") {

      // Si no es booleano, se retorna un error controlado
      callback(new Error("El estado inicial debe ser booleano"), null);

    } else {

      // Si el estado es correcto, se retorna éxito
      callback(null, true);
    }

  }, 500);
}


// FUNCIÓN CON PROMESA (NO SE EXPORTA)
// Valida que los requisitos sean correctos
function evaluarRequisitos(requisitos) {

  // Se retorna una promesa para manejo asincrónico
  return new Promise((resolve, reject) => {

    // Se valida que los requisitos sean un arreglo
    if (!Array.isArray(requisitos)) {
      reject(new Error("Los requisitos deben ser un arreglo"));
    }

    // Se recorre el arreglo de requisitos
    for (let i = 0; i < requisitos.length; i++) {

      // Cada requisito debe ser booleano
      if (typeof requisitos[i] !== "boolean") {
        reject(new Error("Requisito mal tipado"));
      }
    }

    // every verifica que TODOS los valores sean true
    const completos = requisitos.every(r => r === true);

    // Se resuelve la promesa con el resultado
    resolve(completos);
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// ESTA FUNCIÓN SÍ SE EXPORTA
// Es la única función visible para el menú y el barril
export async function procesarSolicitud(solicitud) {

  try {

    // VALIDACIONES BÁSICAS DE DATOS

    // Validación del ID
    if (typeof solicitud.id !== "number" || isNaN(solicitud.id)) {
      throw new Error("ID inválido");
    }

    // Validación del nombre
    if (typeof solicitud.nombre !== "string" || solicitud.nombre.trim() === "") {
      throw new Error("Nombre inválido");
    }

    // Validación del tipo de solicitud
    if (typeof solicitud.tipo !== "string" || solicitud.tipo.trim() === "") {
      throw new Error("Tipo de solicitud inválido");
    }

    // Validación de prioridad (entero entre 1 y 5)
    if (
      !Number.isInteger(solicitud.prioridad) ||
      solicitud.prioridad < 1 ||
      solicitud.prioridad > 5
    ) {
      throw new Error("Prioridad fuera de rango (1 a 5)");
    }

    // VALIDACIÓN CON CALLBACK
    // Se envuelve la función callback en una promesa
    await new Promise((resolve, reject) => {

      // Se llama a la función con callback
      validarEstadoInicial(solicitud.estado, (error) => {

        // Si hay error, se rechaza la promesa
        if (error) {
          reject(error);
        } 
        // Si no hay error, se continúa
        else {
          resolve();
        }
      });
    });

    // VALIDACIÓN CON PROMESA
    // Se valida que los requisitos estén completos
    const requisitosOk = await evaluarRequisitos(solicitud.requisitos);

    // ANÁLISIS LÓGICO
    // Rechazo por requisitos incompletos
    if (!requisitosOk) {
      return {
        id: solicitud.id,
        estado: "RECHAZADA",
        motivo: "Requisitos incompletos"
      };
    }

    // Rechazo por prioridad insuficiente
    if (solicitud.prioridad < 3) {
      return {
        id: solicitud.id,
        estado: "RECHAZADA",
        motivo: "Prioridad insuficiente"
      };
    }

    // RESULTADO FINAL
    // Si todo se cumple, la solicitud se aprueba
    return {
      id: solicitud.id,
      estado: "APROBADA",
      mensaje: "Solicitud procesada correctamente"
    };

  } catch (error) {

    // MANEJO DE ERRORES
    // Se retorna un objeto de error controlado
    return {
      id: solicitud?.id ?? null,
      estado: "ERROR",
      mensaje: error.message
    };
  }
}
