// SISTEMA DE VALIDACION Y PROCESAMIENTO DE SOLICITUDES ACADEMICAS
// Este archivo contiene la logica completa del Ejercicio 22 (ejercicio 1 de Wilmer)


// FUNCION DE VALIDACION (NO SE EXPORTA)
// Valida los datos basicos de la solicitud
// Si falla lanza un Error
function validarSolicitud(solicitud) {

  // Se valida que el ID sea un numero entero positivo
  if (typeof solicitud.id !== "number" || !Number.isInteger(solicitud.id) || solicitud.id <= 0) {
    throw new Error("ID invalido: debe ser un numero entero positivo");
  }

  // Se valida que el nombre sea un string no vacio
  if (typeof solicitud.nombre !== "string" || solicitud.nombre.trim() === "") {
    throw new Error("Nombre invalido");
  }

  // Se valida que el tipo sea un string no vacio
  if (typeof solicitud.tipo !== "string" || solicitud.tipo.trim() === "") {
    throw new Error("Tipo de solicitud invalido");
  }

  // Se valida que la prioridad sea un numero entero entre 1 y 5
  if (typeof solicitud.prioridad !== "number" || !Number.isInteger(solicitud.prioridad) || solicitud.prioridad < 1 || solicitud.prioridad > 5) {
    throw new Error("Prioridad fuera de rango (1 a 5)");
  }

  // Se valida que el estado sea booleano
  if (typeof solicitud.estado !== "boolean") {
    throw new Error("Estado invalido");
  }

  // Se valida que requisitos sea un arreglo
  if (!Array.isArray(solicitud.requisitos)) {
    throw new Error("Requisitos debe ser un arreglo");
  }

  // Se valida que requisitos tenga al menos un elemento
  if (solicitud.requisitos.length === 0) {
    throw new Error("Debe tener al menos un requisito");
  }

  // Se valida que todos los elementos del arreglo sean booleanos
  for (let i = 0; i < solicitud.requisitos.length; i++) {
    if (typeof solicitud.requisitos[i] !== "boolean") {
      throw new Error("Todos los requisitos deben ser booleanos");
    }
  }

  // Si todas las validaciones son correctas, retorna true
  return true;
}


// FUNCION DE CLASIFICACION (FUNCION PURA)
// Determina la clasificacion de prioridad
// No modifica el objeto recibido
function clasificarPrioridad(prioridad) {

  // Se clasifica en alta prioridad si es 4 o 5
  if (prioridad >= 4) {
    return "ALTA";
  }

  // Se clasifica en prioridad media si es 2 o 3
  if (prioridad >= 2) {
    return "MEDIA";
  }

  // Se clasifica en baja prioridad si es 1
  return "BAJA";
}


// FUNCION DE EVALUACION DE REQUISITOS (FUNCION PURA)
// Verifica si todos los requisitos estan cumplidos
// No modifica el arreglo recibido
function evaluarRequisitos(requisitos) {

  // Se recorre el arreglo de requisitos
  for (let i = 0; i < requisitos.length; i++) {

    // Si encuentra un requisito en false, retorna false
    if (requisitos[i] === false) {
      return false;
    }
  }

  // Si todos son true, retorna true
  return true;
}


// FUNCION CALLBACK (NO SE EXPORTA)
// Simula procesamiento con callback
function procesarConCallback(solicitud, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    // Se retorna el resultado mediante callback
    callback("Solicitud " + solicitud.id + " procesada con CALLBACK");

  }, 400);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Simula procesamiento con promesa
function procesarConPromesa(solicitud) {

  // Se retorna una promesa
  return new Promise((resolve) => {

    // setTimeout simula un proceso asincronico
    setTimeout(() => {

      // Se resuelve la promesa con el resultado
      resolve("Solicitud " + solicitud.id + " procesada con PROMESA");

    }, 600);
  });
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
export async function procesarSolicitudesEj22(solicitudes) {

  // Arreglos para almacenar resultados
  const solicitudesValidas = [];
  const solicitudesInvalidas = [];
  const solicitudesAprobadas = [];
  const solicitudesRechazadas = [];

  // Contadores para resumen final
  let total = 0;
  let validas = 0;
  let invalidas = 0;
  let aprobadas = 0;
  let rechazadas = 0;

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
        const { id, nombre, tipo, prioridad, estado, requisitos } = solicitud;

        // Si es valida se agrega al arreglo de validas
        // Se usa spread operator con propiedades abreviadas
        solicitudesValidas.push({ id, nombre, tipo, prioridad, estado, requisitos });

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
      const { id, nombre, tipo, prioridad, estado, requisitos } = solicitudesValidas[i];

      try {

        // Se verifica que el estado sea activo
        if (estado === false) {
          
          // Se agrega a rechazadas
          solicitudesRechazadas.push({
            id: id,
            motivo: "Solicitud inactiva"
          });

          // Se incrementa contador de rechazadas
          rechazadas = rechazadas + 1;

          // Se continua con la siguiente solicitud
          continue;
        }

        // Se evaluan los requisitos
        const cumpleRequisitos = evaluarRequisitos(requisitos);

        // Si no cumple requisitos se rechaza
        if (cumpleRequisitos === false) {

          // Se agrega a rechazadas
          solicitudesRechazadas.push({
            id: id,
            motivo: "No cumple todos los requisitos"
          });

          // Se incrementa contador de rechazadas
          rechazadas = rechazadas + 1;

          // Se continua con la siguiente solicitud
          continue;
        }

        // Se clasifica la prioridad
        const clasificacion = clasificarPrioridad(prioridad);

        // PROCESO CON CALLBACK
        // Se envuelve el callback en una promesa
        const resultadoCallback = await new Promise((resolve) => {
          procesarConCallback({ id }, resolve);
        });

        // PROCESO CON PROMESA
        const resultadoPromesa = await procesarConPromesa({ id });

        // PROCESO CON ASYNC / AWAIT
        // Se simula un proceso adicional
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Se crea el resultado final de la solicitud
        // Se garantiza inmutabilidad
        solicitudesAprobadas.push({
          id,
          nombre,
          tipo,
          prioridad,
          clasificacion,
          estadoFinal: "APROBADA",
          detalles: [
            resultadoCallback,
            resultadoPromesa,
            "Solicitud procesada con ASYNC/AWAIT"
          ]
        });

        // Se incrementa contador de aprobadas
        aprobadas = aprobadas + 1;

      } catch (errorProcesamiento) {

        // Si falla el procesamiento se agrega como rechazada
        solicitudesRechazadas.push({
          id: solicitudesValidas[i].id,
          motivo: errorProcesamiento.message
        });

        // Se incrementa contador de rechazadas
        rechazadas = rechazadas + 1;
      }
    }

    // Se retorna un objeto con todos los resultados
    return {
      resumen: {
        totalRecibidas: total,
        validas: validas,
        invalidas: invalidas,
        aprobadas: aprobadas,
        rechazadas: rechazadas
      },
      solicitudesInvalidas: solicitudesInvalidas,
      solicitudesAprobadas: solicitudesAprobadas,
      solicitudesRechazadas: solicitudesRechazadas
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna error controlado
    return {
      resumen: {
        totalRecibidas: 0,
        validas: 0,
        invalidas: 0,
        aprobadas: 0,
        rechazadas: 0
      },
      solicitudesInvalidas: [],
      solicitudesAprobadas: [],
      solicitudesRechazadas: [],
      error: errorGeneral.message
    };
  }
}