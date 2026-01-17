// SISTEMA DE ANALISIS Y VALIDACION DE TRANSACCIONES BANCARIAS
// Este archivo contiene la logica completa del Ejercicio 17 (ejercicio 2 de Manuel)


// FUNCION CALLBACK (NO SE EXPORTA)
// Se usa callback para simular validacion externa de autorizacion
// Justificacion: callbacks son utiles para operaciones asincronas 
function validarAutorizacionCallback(transaccion, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    // Se valida que la transaccion este autorizada
    if (transaccion.autorizado !== true) {

      // Si no esta autorizada se retorna error
      callback(new Error("Transaccion no autorizada"), null);

    } else {

      // Si esta autorizada se retorna la transaccion
      callback(null, transaccion);
    }

  }, 300);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Se usa promesa para simular carga de datos desde fuente externa
// Justificacion: promesas permiten manejo moderno de asincronía
function cargarTransacciones(datos) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // setTimeout simula tiempo de carga
    setTimeout(() => {

      // Se valida que los datos sean un arreglo
      if (!Array.isArray(datos)) {
        reject(new Error("Los datos no son un arreglo"));
        return;
      }

      // Se resuelve la promesa con los datos
      // Se usa spread para respetar inmutabilidad
      resolve([...datos]);

    }, 500);
  });
}


// FUNCION TRADICIONAL DE VALIDACION (NO SE EXPORTA)
// Se usa funcion tradicional para validaciones sincronas
// Justificacion: funciones tradicionales son claras para logica de validacion
function validarDatosBasicos(transaccion) {

  // Se valida que el ID sea un numero
  if (typeof transaccion.id !== "number") {
    throw new Error("ID invalido");
  }

  // Se valida que el cliente sea un string no vacio
  if (typeof transaccion.cliente !== "string" || transaccion.cliente.trim() === "") {
    throw new Error("Cliente invalido");
  }

  // Se valida que el tipo sea valido
  const tiposPermitidos = ["deposito", "retiro", "transferencia"];
  if (!tiposPermitidos.includes(transaccion.tipo)) {
    throw new Error("Tipo de transaccion invalido");
  }

  // Se valida que el monto sea un numero mayor a cero
  if (typeof transaccion.monto !== "number" || transaccion.monto <= 0) {
    throw new Error("Monto invalido");
  }

  // Se valida que autorizado sea booleano
  if (typeof transaccion.autorizado !== "boolean") {
    throw new Error("Campo autorizado invalido");
  }

  // Si todas las validaciones son correctas retorna true
  return true;
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
// Justificacion: async/await coordina el flujo asincrono de forma clara
export async function procesarTransaccionesEj17(transacciones) {

  try {

    // CARGA ASINCRONICA DE TRANSACCIONES
    // Se consume la promesa usando await
    const datos = await cargarTransacciones(transacciones);

    // Arreglos para almacenar resultados
    const validas = [];
    const rechazadas = [];

    // Contadores para totales
    let totalDepositos = 0;
    let totalRetiros = 0;

    // RECORRIDO Y ANALISIS DE TRANSACCIONES
    // Se recorre el arreglo usando ciclo for
    for (let i = 0; i < datos.length; i++) {

      // Se obtiene la transaccion actual
      const transaccion = datos[i];

      try {

        // VALIDACION DE DATOS BASICOS
        validarDatosBasicos(transaccion);

        // VALIDACION CON CALLBACK
        // Se envuelve el callback en una promesa para usar con await
        const transaccionAutorizada = await new Promise((resolve, reject) => {

          // Se ejecuta la validacion de autorizacion
          validarAutorizacionCallback(transaccion, (error, data) => {

            // Si hay error se rechaza
            if (error) {
              reject(error);
            } else {
              // Si no hay error se resuelve
              resolve(data);
            }
          });
        });

        // CLASIFICACION Y ACUMULACION
        // Se clasifican las transacciones por tipo
        if (transaccionAutorizada.tipo === "deposito") {
          totalDepositos = totalDepositos + transaccionAutorizada.monto;
        }

        if (transaccionAutorizada.tipo === "retiro") {
          totalRetiros = totalRetiros + transaccionAutorizada.monto;
        }

        // Se agrega a transacciones validas
        // Se usa spread para garantizar inmutabilidad
        validas.push({
          ...transaccionAutorizada
        });

      } catch (errorValidacion) {

        // Si falla la validacion se agrega a rechazadas
        rechazadas.push({
          id: transaccion.id ?? null,
          motivo: errorValidacion.message
        });
      }
    }

    // Se retorna el objeto con todos los resultados
    return {
      totalProcesadas: datos.length,
      validas: validas.length,
      rechazadas: rechazadas.length,
      totalDepositos: totalDepositos,
      totalRetiros: totalRetiros,
      errores: rechazadas
    };

  } catch (errorCritico) {

    // Si ocurre un error critico se retorna error controlado
    return {
      totalProcesadas: 0,
      validas: 0,
      rechazadas: 0,
      totalDepositos: 0,
      totalRetiros: 0,
      errores: [],
      mensaje: errorCritico.message
    };
  }
}