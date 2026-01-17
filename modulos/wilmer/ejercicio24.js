// SISTEMA DE GESTION Y VALIDACION DE SOLICITUDES DE ACCESO
// Este archivo contiene la logica completa del Ejercicio 24 (ejercicio 3 de Wilmer)


// FUNCION DE VALIDACION (NO SE EXPORTA)
// Valida los datos basicos de la solicitud de acceso
// Si falla lanza un Error
function validarSolicitudAcceso(solicitud) {

  // Se valida que el ID sea un numero entero positivo
  if (typeof solicitud.id !== "number" || !Number.isInteger(solicitud.id) || solicitud.id <= 0) {
    throw new Error("ID invalido: debe ser un numero entero positivo");
  }

  // Se valida que el nombre sea un string no vacio
  if (typeof solicitud.nombre !== "string" || solicitud.nombre.trim() === "") {
    throw new Error("Nombre invalido");
  }

  // Se valida que la edad sea un numero
  if (typeof solicitud.edad !== "number" || isNaN(solicitud.edad)) {
    throw new Error("Edad invalida: debe ser un numero");
  }

  // Se valida que la edad sea mayor o igual a 18
  if (solicitud.edad < 18) {
    throw new Error("Edad minima requerida: 18 anos");
  }

  // Se valida que el rol sea un string no vacio
  if (typeof solicitud.rol !== "string" || solicitud.rol.trim() === "") {
    throw new Error("Rol invalido");
  }

  // Se valida que permisos sea un arreglo
  if (!Array.isArray(solicitud.permisos)) {
    throw new Error("Permisos debe ser un arreglo");
  }

  // Se valida que el estado sea un string no vacio
  if (typeof solicitud.estado !== "string" || solicitud.estado.trim() === "") {
    throw new Error("Estado invalido");
  }

  // Se valida que aceptaCondiciones sea booleano
  if (typeof solicitud.aceptaCondiciones !== "boolean") {
    throw new Error("Debe indicar si acepta condiciones");
  }

  // Si todas las validaciones son correctas, retorna true
  return true;
}


// FUNCION DE VALIDACION DE PERMISOS (FUNCION PURA)
// Verifica que los permisos no esten vacios
// No modifica el arreglo recibido
function validarPermisos(permisos) {

  // Se verifica que el arreglo tenga al menos un elemento
  if (permisos.length === 0) {
    return false;
  }

  // Se recorre el arreglo para verificar que sean strings no vacios
  for (let i = 0; i < permisos.length; i++) {
    if (typeof permisos[i] !== "string" || permisos[i].trim() === "") {
      return false;
    }
  }

  // Si todo es correcto retorna true
  return true;
}


// FUNCION CALLBACK (NO SE EXPORTA)
// Valida reglas basicas usando callback
function validarReglasBasicas(solicitud, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    // Se verifica que haya aceptado condiciones
    if (solicitud.aceptaCondiciones === false) {
      callback("No acepto las condiciones del sistema");
      return;
    }

    // Se verifica que los permisos sean validos
    const permisosValidos = validarPermisos(solicitud.permisos);
    if (permisosValidos === false) {
      callback("Lista de permisos vacia o invalida");
      return;
    }

    // Si todo es correcto, callback sin error
    callback(null);

  }, 400);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Simula validacion externa
function validacionExterna(solicitud) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // setTimeout simula un proceso asincronico
    setTimeout(() => {

      // Se simula una validacion externa que puede fallar
      // 80% de probabilidad de exito
      const exito = Math.random() > 0.2;

      if (exito === true) {
        resolve("Validacion externa exitosa para solicitud " + solicitud.id);
      } else {
        reject("Fallo en validacion externa");
      }

    }, 600);
  });
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
export async function procesarSolicitudesEj24(solicitudes) {

  // Arreglos para almacenar resultados
  const solicitudesValidas = [];
  const solicitudesInvalidas = [];
  const solicitudesAprobadas = [];
  const solicitudesRechazadas = [];
  const solicitudesEnRevision = [];

  // Contadores para resumen final
  let total = 0;
  let validas = 0;
  let invalidas = 0;
  let aprobadas = 0;
  let rechazadas = 0;
  let enRevision = 0;

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
        validarSolicitudAcceso(solicitud);

        // Se usa destructuring para extraer campos relevantes
        const { id, nombre, edad, rol, permisos, estado, aceptaCondiciones } = solicitud;

        // Si es valida se agrega al arreglo de validas
        // Se usa spread operator con propiedades abreviadas
        solicitudesValidas.push({ id, nombre, edad, rol, permisos, estado, aceptaCondiciones });

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
      const { id, nombre, edad, rol, permisos, estado, aceptaCondiciones } = solicitudesValidas[i];

      try {

        // Se verifica que el estado sea pendiente
        if (estado !== "pendiente") {
          
          // Se agrega a rechazadas
          solicitudesRechazadas.push({
            id: id,
            motivo: "Estado de solicitud no permitido"
          });

          // Se incrementa contador de rechazadas
          rechazadas = rechazadas + 1;

          // Se continua con la siguiente solicitud
          continue;
        }

        // PROCESO CON CALLBACK
        // Se envuelve el callback en una promesa
        const errorReglas = await new Promise((resolve) => {
          validarReglasBasicas({ id, permisos, aceptaCondiciones }, (error) => {
            resolve(error);
          });
        });

        // Si hay error en las reglas basicas se rechaza
        if (errorReglas !== null) {

          // Se agrega a rechazadas
          solicitudesRechazadas.push({
            id: id,
            motivo: errorReglas
          });

          // Se incrementa contador de rechazadas
          rechazadas = rechazadas + 1;

          // Se continua con la siguiente solicitud
          continue;
        }

        // PROCESO CON PROMESA
        // Se intenta validacion externa
        try {

          const resultadoExterno = await validacionExterna({ id });

          // Si la validacion externa es exitosa, se aprueba

          // PROCESO CON ASYNC / AWAIT
          // Se simula un proceso adicional
          await new Promise((resolve) => setTimeout(resolve, 300));

          // Se crea el resultado final de la solicitud
          // Se garantiza inmutabilidad
          solicitudesAprobadas.push({
            id,
            nombre,
            edad,
            rol,
            permisos,
            estadoFinal: "APROBADA",
            detalles: [
              "Reglas basicas validadas con CALLBACK",
              resultadoExterno,
              "Solicitud procesada con ASYNC/AWAIT"
            ]
          });

          // Se incrementa contador de aprobadas
          aprobadas = aprobadas + 1;

        } catch (errorExterno) {

          // Si falla la validacion externa, queda en revision

          // Se agrega a en revision
          solicitudesEnRevision.push({
            id: id,
            nombre: nombre,
            motivo: errorExterno
          });

          // Se incrementa contador de en revision
          enRevision = enRevision + 1;
        }

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
        rechazadas: rechazadas,
        enRevision: enRevision
      },
      solicitudesInvalidas: solicitudesInvalidas,
      solicitudesAprobadas: solicitudesAprobadas,
      solicitudesRechazadas: solicitudesRechazadas,
      solicitudesEnRevision: solicitudesEnRevision
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna error controlado
    return {
      resumen: {
        totalRecibidas: 0,
        validas: 0,
        invalidas: 0,
        aprobadas: 0,
        rechazadas: 0,
        enRevision: 0
      },
      solicitudesInvalidas: [],
      solicitudesAprobadas: [],
      solicitudesRechazadas: [],
      solicitudesEnRevision: [],
      error: errorGeneral.message
    };
  }
}