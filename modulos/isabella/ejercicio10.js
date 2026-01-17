// SISTEMA DE GESTION LOGICA DE SOLICITUDES DE SOPORTE TECNICO
// Este archivo contiene la logica completa del Ejercicio 10 (ejercicio 1 de Isabella)


// FUNCION CALLBACK (NO SE EXPORTA)
// Valida los datos basicos de la solicitud
function validarSolicitudCallback(solicitud, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    // Se valida que el ID sea un numero positivo
    if (typeof solicitud.id !== "number" || isNaN(solicitud.id) || solicitud.id <= 0) {
      callback(new Error("Datos basicos invalidos"), null);
      return;
    }

    // Se valida que el area sea un string no vacio
    if (typeof solicitud.area !== "string" || solicitud.area.trim() === "") {
      callback(new Error("Datos basicos invalidos"), null);
      return;
    }

    // Se valida que la descripcion sea un string no vacio
    if (typeof solicitud.descripcion !== "string" || solicitud.descripcion.trim() === "") {
      callback(new Error("Datos basicos invalidos"), null);
      return;
    }

    // Se valida que reportadoPorSistema sea booleano
    if (typeof solicitud.reportadoPorSistema !== "boolean") {
      callback(new Error("Datos basicos invalidos"), null);
      return;
    }

    // Se valida que intentosPrevios sea un numero mayor o igual a 0
    if (typeof solicitud.intentosPrevios !== "number" || solicitud.intentosPrevios < 0) {
      callback(new Error("Datos basicos invalidos"), null);
      return;
    }

    // Si todas las validaciones son correctas, se retorna la solicitud
    callback(null, solicitud);

  }, 300);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Valida que el nivel de urgencia este en rango
function validarUrgenciaPromesa(solicitud) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // Se valida que el nivel de urgencia sea numerico
    if (typeof solicitud.nivelUrgencia !== "number") {
      reject(new Error("Nivel de urgencia fuera de rango (1 a 5)"));
      return;
    }

    // Se valida que el nivel de urgencia este entre 1 y 5
    if (solicitud.nivelUrgencia < 1 || solicitud.nivelUrgencia > 5) {
      reject(new Error("Nivel de urgencia fuera de rango (1 a 5)"));
      return;
    }

    // Si la validacion es correcta, se resuelve la promesa
    resolve(solicitud);
  });
}


// FUNCION DE DECISION (FUNCION PURA)
// Determina el estado final de la solicitud
// No modifica el objeto recibido
function determinarEstado(solicitud) {

  // Se atiende si la urgencia es alta (4 o 5) y fue reportada por sistema
  if (solicitud.nivelUrgencia >= 4 && solicitud.reportadoPorSistema) {
    return "ATENDIDA";
  }

  // Se rechaza si hay 3 o mas intentos previos
  if (solicitud.intentosPrevios >= 3) {
    return "RECHAZADA";
  }

  // En cualquier otro caso, queda en espera
  return "EN ESPERA";
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
export async function procesarSolicitudesEj10(solicitudes) {

  // Arreglo para almacenar solicitudes procesadas correctamente
  const resultados = [];

  // Arreglo para almacenar solicitudes con errores
  const errores = [];

  try {

    // Se valida que la entrada sea un arreglo
    if (!Array.isArray(solicitudes)) {
      throw new Error("Las solicitudes deben ser un arreglo");
    }

    // Se recorre el arreglo usando un ciclo for clasico
    for (let i = 0; i < solicitudes.length; i++) {

      // Se obtiene la solicitud actual
      const solicitud = solicitudes[i];

      try {

        // VALIDACION CON CALLBACK
        // Se envuelve la funcion callback dentro de una promesa
        const validada = await new Promise((resolve, reject) => {

          // Se llama a la validacion basica
          validarSolicitudCallback(solicitud, (error, data) => {

            // Si hay error se rechaza la promesa
            if (error) {
              reject(error);
            } else {
              // Si no hay error se resuelve
              resolve(data);
            }
          });
        });

        // VALIDACION CON PROMESA
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

      } catch (errorInterno) {

        // Si falla una solicitud, se almacena el error
        errores.push({
          id: solicitud.id ?? "SIN ID",
          mensaje: errorInterno.message
        });
      }
    }

    // Se retorna un objeto con todos los resultados
    return {
      resultados: resultados,
      errores: errores
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna error controlado
    return {
      estado: "ERROR",
      mensaje: errorGeneral.message
    };
  }
}