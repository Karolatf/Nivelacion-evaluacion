// SISTEMA DE VALIDACIÓN Y PROCESAMIENTO DE SOLICITUDES
// Este archivo contiene TODA la lógica de procesamiento del Ejercicio 1  (valida y procesa los datos recibidos)

// FUNCIÓN CALLBACK (NO SE EXPORTA)
// Definimos una función que recibe un dato 'estado' y una función de retorno 'callback' para manejar la asincronía tradicional.
function validarEstadoInicial(estado, callback) {

  // Utilizamos el método global setTimeout para simular una tarea que no es inmediata (asincrónica), como una consulta a base de datos.
  setTimeout(() => {

    // Aplicamos el operador 'typeof' para verificar que el tipo de dato recibido sea estrictamente un valor booleano.
    if (typeof estado !== "boolean") {

      // Si la validación falla, ejecutamos el callback pasando un nuevo objeto Error como primer argumento (estándar Error-First Callback).
      callback(new Error("El estado inicial debe ser booleano"), null);

    } else {

      // Si el dato es correcto, ejecutamos el callback enviando 'null' en el error y 'true' como segundo argumento para indicar éxito.
      callback(null, true);
    }

  }, 500); // Definimos un retraso de 500 milisegundos para la simulación.
}


// Definimos una función que recibe 'requisitos' y retorna un objeto Promise para gestionar su resolución o rechazo futuro.
function evaluarRequisitos(requisitos) {

  // Retornamos la instancia de la Promesa que expone los métodos resolve (éxito) y reject (fallo).
  return new Promise((resolve, reject) => {

    // Usamos el método estático Array.isArray para comprobar que la estructura de datos recibida sea un arreglo.
    if (!Array.isArray(requisitos)) {
      // Si no es un arreglo, rechazamos la promesa inmediatamente con un mensaje descriptivo.
      reject(new Error("Los requisitos deben ser un arreglo"));
    }

    // Iniciamos un ciclo for para iterar sobre cada índice del arreglo y validar la integridad de cada elemento.
    for (let i = 0; i < requisitos.length; i++) {

      // Verificamos individualmente que cada elemento dentro del arreglo sea de tipo booleano.
      if (typeof requisitos[i] !== "boolean") {
        // Si encontramos un dato que no cumple, rechazamos la promesa y cortamos la ejecución.
        reject(new Error("Requisito mal tipado"));
      }
    }

    // Aplicamos el método de orden superior '.every', que evalúa si todos los elementos del array cumplen la condición de ser true.
    const completos = requisitos.every(r => r === true);

    // Finalizamos la promesa con éxito pasando el valor booleano resultante (true si todos se cumplen, false si no).
    resolve(completos);
  });
}


// Exportamos la función principal con la palabra clave 'async', lo que nos permite usar 'await' en su interior para manejar flujos asíncronos.
export async function procesarSolicitud(solicitud) {

  // Iniciamos un bloque try para intentar ejecutar la lógica principal y capturar posibles excepciones en el bloque catch.
  try {

    // Validamos que el ID sea de tipo numérico y descartamos el valor NaN (Not a Number) mediante la función isNaN.
    if (typeof solicitud.id !== "number" || isNaN(solicitud.id)) {
      throw new Error("ID inválido");
    }

    // Comprobamos que el nombre sea un string y que no esté vacío, eliminando espacios innecesarios con el método .trim().
    if (typeof solicitud.nombre !== "string" || solicitud.nombre.trim() === "") {
      throw new Error("Nombre inválido");
    }

    // Verificamos que el tipo de solicitud sea una cadena de texto válida y no vacía.
    if (typeof solicitud.tipo !== "string" || solicitud.tipo.trim() === "") {
      throw new Error("Tipo de solicitud inválido");
    }

    // Validamos la prioridad asegurándonos de que sea un número entero y que se encuentre dentro del rango lógico de 1 a 5.
    if (
      !Number.isInteger(solicitud.prioridad) ||
      solicitud.prioridad < 1 ||
      solicitud.prioridad > 5
    ) {
      throw new Error("Prioridad fuera de rango (1 a 5)");
    }

    // Implementamos 'await' para pausar la ejecución y envolver la función de callback en una Promesa (Promisificación).
    await new Promise((resolve, reject) => {

      // Invocamos la función con callback; si responde con error, llamamos a 'reject', de lo contrario a 'resolve'.
      validarEstadoInicial(solicitud.estado, (error) => {
        if (error) {
          reject(error);
        } 
        else {
          resolve();
        }
      });
    });

    // Ejecutamos la función evaluarRequisitos y usamos 'await' para obtener directamente el valor resuelto de la promesa.
    const requisitosOk = await evaluarRequisitos(solicitud.requisitos);

    // Evaluamos el resultado de la validación anterior; si es falso, retornamos un objeto indicando el rechazo por falta de requisitos.
    if (!requisitosOk) {
      return {
        id: solicitud.id,
        estado: "RECHAZADA",
        motivo: "Requisitos incompletos"
      };
    }

    // Aplicamos una regla de negocio adicional: si la prioridad es menor a 3, la solicitud se marca como rechazada.
    if (solicitud.prioridad < 3) {
      return {
        id: solicitud.id,
        estado: "RECHAZADA",
        motivo: "Prioridad insuficiente"
      };
    }

    // Si todas las validaciones y promesas anteriores fueron exitosas, retornamos el objeto final con el estado APROBADA.
    return {
      id: solicitud.id,
      estado: "APROBADA",
      mensaje: "Solicitud procesada correctamente"
    };

  } catch (error) {

    // En caso de cualquier error en el bloque try, capturamos el objeto error y retornamos una respuesta controlada.
    // Usamos el operador de encadenamiento opcional (?.) y el de coalescencia nula (??) para devolver el ID o null de forma segura.
    return {
      id: solicitud?.id ?? null,
      estado: "ERROR",
      mensaje: error.message
    };
  }
}