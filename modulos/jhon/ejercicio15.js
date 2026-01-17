// SISTEMA DE GESTION Y VALIDACION DE SOLICITUDES DE SOPORTE TECNICO
// Este archivo contiene la logica completa del Ejercicio 15 (ejercicio 3 de Jhon)


// FUNCION DE VALIDACION (NO SE EXPORTA)
// Valida los datos basicos de la solicitud
// Si falla lanza un Error
function validarSolicitud(solicitud) {

  // Se valida que el ID sea un numero entero positivo
  if (typeof solicitud.id !== "number" || !Number.isInteger(solicitud.id) || solicitud.id <= 0) {
    throw new Error("ID invalido");
  }

  // Se valida que el usuario sea un string no vacio
  if (typeof solicitud.usuario !== "string" || solicitud.usuario.trim() === "") {
    throw new Error("Usuario invalido");
  }

  // Se valida que el tipo sea hardware, software o red
  const tiposPermitidos = ["hardware", "software", "red"];
  if (typeof solicitud.tipo !== "string" || !tiposPermitidos.includes(solicitud.tipo)) {
    throw new Error("Tipo de problema invalido");
  }

  // Se valida que el nivel sea un numero entero entre 1 y 5
  if (typeof solicitud.nivel !== "number" || !Number.isInteger(solicitud.nivel) || solicitud.nivel < 1 || solicitud.nivel > 5) {
    throw new Error("Nivel de urgencia fuera de rango");
  }

  // Se valida que activo sea booleano
  if (typeof solicitud.activo !== "boolean") {
    throw new Error("Campo activo invalido");
  }

  // Se valida que la solicitud este activa
  if (solicitud.activo !== true) {
    throw new Error("Solicitud inactiva");
  }

  // Si todas las validaciones son correctas, retorna true
  return true;
}


// FUNCION DE CLASIFICACION (FUNCION PURA)
// Determina la clasificacion de prioridad
// No modifica el objeto recibido
function clasificarPrioridad(nivel) {

  // Se clasifica en alta prioridad si es 4 o 5
  if (nivel >= 4) {
    return "ALTA";
  }

  // Se clasifica en prioridad media si es 2 o 3
  if (nivel >= 2) {
    return "MEDIA";
  }

  // Se clasifica en baja prioridad si es 1
  return "BAJA";
}


// FUNCION CALLBACK (NO SE EXPORTA)
// Simula procesamiento con callback
function procesarConCallback(solicitud, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    // Se retorna el resultado mediante callback
    callback("Solicitud " + solicitud.id + " enviada con CALLBACK");

  }, 500);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Simula procesamiento con promesa
function procesarConPromesa(solicitud) {

  // Se retorna una promesa
  return new Promise((resolve) => {

    // setTimeout simula un proceso asincronico
    setTimeout(() => {

      // Se resuelve la promesa con el resultado
      resolve("Solicitud " + solicitud.id + " enviada con PROMESA");

    }, 700);
  });
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
export async function procesarSolicitudesEj15(solicitudes) {

  // Arreglos para almacenar resultados
  const solicitudesValidas = [];
  const solicitudesInvalidas = [];
  const resultados = [];

  // Contadores para resumen final
  let total = 0;
  let validas = 0;
  let invalidas = 0;

  try {

    // Se valida que la entrada sea un arreglo
    if (!Array.isArray(solicitudes)) {
      throw new Error("La entrada debe ser un arreglo de solicitudes");
    }

    // Se obtiene el total de solicitudes
    total = solicitudes.length;

    // VALIDACION DE SOLICITUDES
    // Se recorre el arreglo usando un ciclo for clasico
    for (let i = 0; i < solicitudes.length; i++) {

      // Se obtiene la solicitud actual
      const solicitud = solicitudes[i];

      try {

        // Se valida la solicitud
        validarSolicitud(solicitud);

        // Se usa destructuring para extraer campos relevantes
        const { id, usuario, tipo, nivel, activo } = solicitud;

        // Si es valida se agrega al arreglo de validas
        // Se usa spread operator para garantizar inmutabilidad
        solicitudesValidas.push({ id, usuario, tipo, nivel, activo });

        // Se incrementa el contador de validas
        validas = validas + 1;

      } catch (errorValidacion) {

        // Si falla la validacion se agrega al arreglo de invalidas
        solicitudesInvalidas.push({
          id: solicitud.id ?? null,
          error: errorValidacion.message
        });

        // Se incrementa el contador de invalidas
        invalidas = invalidas + 1;
      }
    }

    // PROCESAMIENTO ASINCRONO DE SOLICITUDES VALIDAS
    // Se recorre el arreglo de solicitudes validas
    for (let i = 0; i < solicitudesValidas.length; i++) {

      // Se obtiene la solicitud actual usando destructuring
      const { id, usuario, tipo, nivel } = solicitudesValidas[i];

      try {

        // Se clasifica la prioridad
        const clasificacion = clasificarPrioridad(nivel);

        // PROCESO CON CALLBACK
        // Se envuelve el callback en una promesa
        const resultadoCallback = await new Promise((resolve) => {
          procesarConCallback({ id }, resolve);
        });

        // PROCESO CON PROMESA
        const resultadoPromesa = await procesarConPromesa({ id });

        // PROCESO CON ASYNC / AWAIT
        // Se simula un proceso adicional
        await new Promise((resolve) => setTimeout(resolve, 400));

        // Se crea el resultado final de la solicitud
        // Se garantiza inmutabilidad
        resultados.push({
          id,
          usuario,
          tipo,
          nivel,
          clasificacion,
          estadoFinal: "PROCESADA",
          detalles: [
            resultadoCallback,
            resultadoPromesa,
            "Solicitud procesada con ASYNC/AWAIT"
          ]
        });

      } catch (errorProcesamiento) {

        // Si falla el procesamiento se agrega como error
        resultados.push({
          id: solicitudesValidas[i].id,
          estadoFinal: "ERROR",
          mensaje: errorProcesamiento.message
        });
      }
    }

    // Se retorna un objeto con todos los resultados
    return {
      resumen: {
        totalRecibidas: total,
        validas: validas,
        invalidas: invalidas
      },
      solicitudesInvalidas: solicitudesInvalidas,
      solicitudesProcesadas: resultados
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna error controlado
    return {
      resumen: {
        totalRecibidas: 0,
        validas: 0,
        invalidas: 0
      },
      solicitudesInvalidas: [],
      solicitudesProcesadas: [],
      error: errorGeneral.message
    };
  }
}