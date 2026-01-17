// SISTEMA DE PROCESOS Y VALIDACION DE OPERACIONES
// Este archivo contiene la logica completa del Ejercicio 23 (ejercicio 2 de Wilmer)


// FUNCION DE VALIDACION (NO SE EXPORTA)
// Valida los datos basicos de la operacion
// Si falla lanza un Error
function validarOperacion(operacion) {

  // Se valida que el ID sea un numero entero positivo
  if (typeof operacion.id !== "number" || !Number.isInteger(operacion.id) || operacion.id <= 0) {
    throw new Error("ID invalido: debe ser un numero entero positivo");
  }

  // Se valida que el tipo de operacion sea un string no vacio
  if (typeof operacion.tipoOperacion !== "string" || operacion.tipoOperacion.trim() === "") {
    throw new Error("Tipo de operacion invalido");
  }

  // Se valida que el valor sea un numero
  if (typeof operacion.valor !== "number" || isNaN(operacion.valor)) {
    throw new Error("Valor invalido: debe ser un numero");
  }

  // Se valida que el valor sea mayor a cero
  if (operacion.valor <= 0) {
    throw new Error("Valor debe ser mayor a cero");
  }

  // Se valida que el estado sea booleano
  if (typeof operacion.estado !== "boolean") {
    throw new Error("Estado invalido: debe ser booleano");
  }

  // Se valida que la prioridad sea un numero entero entre 1 y 5
  if (typeof operacion.prioridad !== "number" || !Number.isInteger(operacion.prioridad) || operacion.prioridad < 1 || operacion.prioridad > 5) {
    throw new Error("Prioridad fuera de rango (1 a 5)");
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


// FUNCION CALLBACK (NO SE EXPORTA)
// Simula procesamiento con callback
function procesarConCallback(operacion, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    // Se retorna el resultado mediante callback
    callback("Operacion " + operacion.id + " procesada con CALLBACK");

  }, 400);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Simula procesamiento con promesa
function procesarConPromesa(operacion) {

  // Se retorna una promesa
  return new Promise((resolve) => {

    // setTimeout simula un proceso asincronico
    setTimeout(() => {

      // Se resuelve la promesa con el resultado
      resolve("Operacion " + operacion.id + " procesada con PROMESA");

    }, 600);
  });
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
export async function procesarSolicitudesEj23(solicitudes) {

  // Arreglos para almacenar resultados
  const operacionesValidas = [];
  const operacionesInvalidas = [];
  const operacionesAprobadas = [];
  const operacionesRechazadas = [];

  // Contadores para resumen final
  let total = 0;
  let validas = 0;
  let invalidas = 0;
  let aprobadas = 0;
  let rechazadas = 0;

  try {

    // Se valida que la entrada sea un arreglo
    if (!Array.isArray(solicitudes)) {
      throw new Error("La entrada debe ser un arreglo de operaciones");
    }

    // Se obtiene el total de operaciones
    total = solicitudes.length;

    // VALIDACION DE OPERACIONES
    // Se recorre el arreglo usando un ciclo for clasico
    for (let i = 0; i < solicitudes.length; i++) {

      // Se obtiene la operacion actual
      const operacion = solicitudes[i];

      try {

        // Se valida la operacion
        validarOperacion(operacion);

        // Se usa destructuring para extraer campos relevantes
        const { id, tipoOperacion, valor, estado, prioridad } = operacion;

        // Si es valida se agrega al arreglo de validas
        // Se usa spread operator con propiedades abreviadas
        operacionesValidas.push({ id, tipoOperacion, valor, estado, prioridad });

        // Se incrementa el contador de validas
        validas = validas + 1;

      } catch (errorValidacion) {

        // Si falla la validacion se agrega al arreglo de invalidas
        operacionesInvalidas.push({
          id: operacion.id ?? null,
          error: errorValidacion.message
        });

        // Se incrementa el contador de invalidas
        invalidas = invalidas + 1;
      }
    }

    // PROCESAMIENTO ASINCRONO DE OPERACIONES VALIDAS
    // Se recorre el arreglo de operaciones validas
    for (let i = 0; i < operacionesValidas.length; i++) {

      // Se obtiene la operacion actual usando destructuring
      const { id, tipoOperacion, valor, estado, prioridad } = operacionesValidas[i];

      try {

        // Se verifica que el estado sea activo
        if (estado === false) {
          
          // Se agrega a rechazadas
          operacionesRechazadas.push({
            id: id,
            motivo: "Operacion inactiva"
          });

          // Se incrementa contador de rechazadas
          rechazadas = rechazadas + 1;

          // Se continua con la siguiente operacion
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

        // Se crea el resultado final de la operacion
        // Se garantiza inmutabilidad
        operacionesAprobadas.push({
          id,
          tipoOperacion,
          valor,
          prioridad,
          clasificacion,
          estadoFinal: "APROBADA",
          detalles: [
            resultadoCallback,
            resultadoPromesa,
            "Operacion procesada con ASYNC/AWAIT"
          ]
        });

        // Se incrementa contador de aprobadas
        aprobadas = aprobadas + 1;

      } catch (errorProcesamiento) {

        // Si falla el procesamiento se agrega como rechazada
        operacionesRechazadas.push({
          id: operacionesValidas[i].id,
          motivo: errorProcesamiento.message
        });

        // Se incrementa contador de rechazadas
        rechazadas = rechazadas + 1;
      }
    }

    // Se retorna un objeto con todos los resultados
    return {
      resumen: {
        totalProcesadas: total,
        validas: validas,
        invalidas: invalidas,
        aprobadas: aprobadas,
        rechazadas: rechazadas
      },
      operacionesInvalidas: operacionesInvalidas,
      operacionesAprobadas: operacionesAprobadas,
      operacionesRechazadas: operacionesRechazadas
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna error controlado
    return {
      resumen: {
        totalProcesadas: 0,
        validas: 0,
        invalidas: 0,
        aprobadas: 0,
        rechazadas: 0
      },
      operacionesInvalidas: [],
      operacionesAprobadas: [],
      operacionesRechazadas: [],
      error: errorGeneral.message
    };
  }
}