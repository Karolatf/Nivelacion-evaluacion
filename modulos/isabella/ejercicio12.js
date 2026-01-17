// SISTEMA DE GESTION ASINCRONA DE SOLICITUDES DE SERVICIO
// Este archivo contiene la logica completa del Ejercicio 12 (ejercicio 3 de Isabella)


// FUNCION CALLBACK (NO SE EXPORTA)
// Valida los datos basicos de la solicitud
function validarSolicitudCallback(solicitud, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    // Se valida que el ID sea un numero positivo
    if (typeof solicitud.id !== "number" || isNaN(solicitud.id) || solicitud.id <= 0) {
      callback(new Error("Datos invalidos en la solicitud"), null);
      return;
    }

    // Se valida que el usuario sea un string no vacio
    if (typeof solicitud.usuario !== "string" || solicitud.usuario.trim() === "") {
      callback(new Error("Datos invalidos en la solicitud"), null);
      return;
    }

    // Se valida que el tipo sea software o hardware
    if (solicitud.tipo !== "software" && solicitud.tipo !== "hardware") {
      callback(new Error("Datos invalidos en la solicitud"), null);
      return;
    }

    // Se valida que la prioridad sea numerica
    if (typeof solicitud.prioridad !== "number" || isNaN(solicitud.prioridad)) {
      callback(new Error("Datos invalidos en la solicitud"), null);
      return;
    }

    // Se valida que la descripcion sea un string no vacio
    if (typeof solicitud.descripcion !== "string" || solicitud.descripcion.trim() === "") {
      callback(new Error("Datos invalidos en la solicitud"), null);
      return;
    }

    // Se valida que el estado sea pendiente
    if (solicitud.estado !== "pendiente") {
      callback(new Error("Datos invalidos en la solicitud"), null);
      return;
    }

    // Si todas las validaciones son correctas, se retorna la solicitud
    callback(null, solicitud);

  }, 300);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Valida que la prioridad este en rango
function validarPrioridadPromesa(solicitud) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // Se valida que la prioridad este entre 1 y 5
    if (solicitud.prioridad < 1 || solicitud.prioridad > 5) {

      // Si esta fuera de rango, se rechaza la promesa
      reject(new Error("Prioridad fuera del rango permitido (1 a 5)"));

    } else {

      // Si esta en rango, se resuelve la promesa
      resolve(solicitud);
    }
  });
}


// FUNCION DE CLASIFICACION (FUNCION PURA)
// Determina la clasificacion de prioridad
// No modifica el objeto recibido
function clasificarPrioridad(prioridad) {

  // Se clasifica en alta prioridad si es 4 o 5
  if (prioridad >= 4) {
    return "Alta prioridad";
  }

  // Se clasifica en prioridad media si es 2 o 3
  if (prioridad >= 2) {
    return "Prioridad media";
  }

  // Se clasifica en baja prioridad si es 1
  return "Baja prioridad";
}


// PROMESA ASINCRONICA CON TIEMPO VARIABLE (NO SE EXPORTA)
// Simula la atencion de una solicitud
function atenderSolicitudPromesa(solicitud) {

  // Se calcula el tiempo de atencion segun la prioridad
  // Alta prioridad: 500ms
  // Prioridad media: 800ms
  // Baja prioridad: 1200ms
  const tiempoAtencion = solicitud.prioridad >= 4
    ? 500
    : solicitud.prioridad >= 2
    ? 800
    : 1200;

  // Se retorna una promesa
  return new Promise((resolve) => {

    // setTimeout simula el tiempo de atencion
    setTimeout(() => {

      // Se crea un nuevo objeto con estado atendida
      // Se garantiza inmutabilidad usando spread operator
      resolve({
        ...solicitud,
        estado: "atendida"
      });

    }, tiempoAtencion);
  });
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
export async function procesarSolicitudesEj12(solicitudes) {

  // Arreglo para almacenar solicitudes procesadas correctamente
  const resultados = [];

  // Arreglo para almacenar solicitudes con errores
  const errores = [];

  try {

    // Se valida que la entrada sea un arreglo
    if (!Array.isArray(solicitudes)) {
      throw new Error("Los datos deben ser un arreglo");
    }

    // Se valida que el arreglo no este vacio
    if (solicitudes.length === 0) {
      return {
        resultados: [],
        errores: [{ mensaje: "El arreglo de solicitudes esta vacio o es invalido" }],
        estadoSistema: "PROCESO FINALIZADO CON ERRORES"
      };
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
        // Se valida la prioridad usando promesas
        const prioridadValida = await validarPrioridadPromesa(validada);

        // Se clasifica la prioridad
        const clasificacion = clasificarPrioridad(prioridadValida.prioridad);

        // ATENCION ASINCRONICA
        // Se simula la atencion de la solicitud
        const atendida = await atenderSolicitudPromesa(prioridadValida);

        // Se crea un nuevo objeto con la clasificacion y estado
        // Se garantiza inmutabilidad usando spread operator
        const resultado = {
          id: atendida.id,
          usuario: atendida.usuario,
          tipo: atendida.tipo,
          prioridad: atendida.prioridad,
          clasificacion: clasificacion,
          estado: atendida.estado
        };

        // Se agrega al arreglo de resultados
        resultados.push(resultado);

      } catch (errorInterno) {

        // Si falla una solicitud, se almacena el error
        errores.push({
          id: solicitud.id ?? "SIN ID",
          mensaje: errorInterno.message
        });
      }
    }

    // Se determina el estado general del sistema
    const estadoSistema = errores.length === 0
      ? "TODAS LAS SOLICITUDES FUERON PROCESADAS"
      : "PROCESO COMPLETADO CON ERRORES";

    // Se retorna un objeto con todos los resultados y el estado
    return {
      resultados: resultados,
      errores: errores,
      estadoSistema: estadoSistema
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna error controlado
    return {
      resultados: [],
      errores: [{ mensaje: errorGeneral.message }],
      estadoSistema: "PROCESO FINALIZADO CON ERRORES"
    };
  }
}