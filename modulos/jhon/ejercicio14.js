// SISTEMA DE ANALISIS Y VALIDACION DE TRANSACCIONES BANCARIAS
// Este archivo contiene la logica completa del Ejercicio 14 (ejercicio 2 de Jhon)


// FUNCION DE VALIDACION (NO SE EXPORTA)
// Valida los datos basicos de la transaccion
// Si falla lanza un Error
function validarTransaccion(transaccion) {

  // Se valida que el ID sea un numero
  if (typeof transaccion.id !== "number") {
    throw new Error("ID invalido");
  }

  // Se valida que el cliente sea un string no vacio
  if (typeof transaccion.cliente !== "string" || transaccion.cliente.trim() === "") {
    throw new Error("Cliente invalido");
  }

  // Se valida que el tipo sea deposito, retiro o transferencia
  const tiposPermitidos = ["deposito", "retiro", "transferencia"];
  if (typeof transaccion.tipo !== "string" || !tiposPermitidos.includes(transaccion.tipo)) {
    throw new Error("Tipo de transaccion invalido");
  }

  // Se valida que el monto sea un numero mayor a cero
  if (typeof transaccion.monto !== "number" || transaccion.monto <= 0) {
    throw new Error("Monto invalido debe ser mayor a cero");
  }

  // Se valida que autorizado sea booleano
  if (typeof transaccion.autorizado !== "boolean") {
    throw new Error("Campo autorizado invalido");
  }

  // Se valida que la transaccion este autorizada
  if (transaccion.autorizado !== true) {
    throw new Error("Transaccion no autorizada");
  }

  // Si todas las validaciones son correctas, retorna true
  return true;
}


// FUNCION CALLBACK (NO SE EXPORTA)
// Simula procesamiento con callback
function procesarConCallback(transaccion, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    // Se retorna el resultado mediante callback
    callback("Transaccion " + transaccion.id + " cargada con CALLBACK");

  }, 400);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Simula carga de datos con promesa
function cargarConPromesa(transacciones) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // setTimeout simula un proceso asincronico
    setTimeout(() => {

      // Se valida que sea un arreglo
      if (!Array.isArray(transacciones)) {
        reject(new Error("Los datos deben ser un arreglo"));
      }

      // Se resuelve la promesa con copia inmutable
      resolve([...transacciones]);

    }, 600);
  });
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
export async function procesarTransaccionesEj14(transacciones) {

  // Arreglos para almacenar resultados
  const transaccionesValidas = [];
  const transaccionesRechazadas = [];

  // Contadores para resumen final
  let totalProcesadas = 0;
  let validas = 0;
  let rechazadas = 0;
  let totalDepositos = 0;
  let totalRetiros = 0;

  try {

    // CARGA ASINCRONICA CON PROMESA
    // Se simula la carga de datos desde una fuente externa
    const datosRecibidos = await cargarConPromesa(transacciones);

    // Se obtiene el total de transacciones
    totalProcesadas = datosRecibidos.length;

    // VALIDACION Y CLASIFICACION DE TRANSACCIONES
    // Se recorre el arreglo usando un ciclo for clasico
    for (let i = 0; i < datosRecibidos.length; i++) {

      // Se obtiene la transaccion actual
      const transaccion = datosRecibidos[i];

      try {

        // Se valida la transaccion
        validarTransaccion(transaccion);

        // PROCESO CON CALLBACK
        // Se envuelve el callback en una promesa
        await new Promise((resolve) => {
          procesarConCallback(transaccion, resolve);
        });

        // PROCESO ADICIONAL CON ASYNC / AWAIT
        // Se simula validacion extra
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Si es valida se agrega al arreglo de validas
        // Se usa spread operator para garantizar inmutabilidad
        transaccionesValidas.push({ ...transaccion });

        // Se incrementa el contador de validas
        validas = validas + 1;

        // Se calculan los totales por tipo
        if (transaccion.tipo === "deposito") {
          totalDepositos = totalDepositos + transaccion.monto;
        }

        if (transaccion.tipo === "retiro") {
          totalRetiros = totalRetiros + transaccion.monto;
        }

      } catch (errorValidacion) {

        // Si falla la validacion se agrega al arreglo de rechazadas
        transaccionesRechazadas.push({
          id: transaccion.id ?? null,
          motivo: errorValidacion.message
        });

        // Se incrementa el contador de rechazadas
        rechazadas = rechazadas + 1;
      }
    }

    // Se retorna un objeto con todos los resultados
    return {
      totalProcesadas: totalProcesadas,
      validas: validas,
      rechazadas: rechazadas,
      totalDepositos: totalDepositos,
      totalRetiros: totalRetiros,
      errores: transaccionesRechazadas
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna error controlado
    return {
      totalProcesadas: 0,
      validas: 0,
      rechazadas: 0,
      totalDepositos: 0,
      totalRetiros: 0,
      errores: [],
      error: errorGeneral.message
    };
  }
}