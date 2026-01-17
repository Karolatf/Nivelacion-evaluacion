// SISTEMA DE GESTION Y VALIDACION DE TRANSACCIONES FINANCIERAS
// Este archivo contiene la logica completa del Ejercicio 7 (ejercicio 1 de Andres)


// FUNCION CALLBACK (NO SE EXPORTA)
// Valida la estructura basica de cada transaccion
function validarEstructuraTransaccion(transaccion, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    try {

      // Se verifica que la transaccion sea un objeto valido
      if (typeof transaccion !== "object" || transaccion === null) {
        throw new Error("La transaccion no es un objeto valido");
      }

      // Se verifica que el idUsuario sea un numero mayor a 0
      if (typeof transaccion.idUsuario !== "number" || isNaN(transaccion.idUsuario) || transaccion.idUsuario <= 0) {
        throw new Error("ID de usuario invalido");
      }

      // Se verifica que el tipo de transaccion sea ingreso o egreso
      if (!["ingreso", "egreso"].includes(transaccion.tipo)) {
        throw new Error("Tipo de transaccion invalido");
      }

      // Se verifica que el monto sea un numero positivo
      if (typeof transaccion.monto !== "number" || transaccion.monto <= 0) {
        throw new Error("Monto invalido");
      }

      // Se verifica que la categoria sea un string no vacio
      if (!transaccion.categoria || typeof transaccion.categoria !== "string") {
        throw new Error("Categoria invalida");
      }

      // Se verifica que la fecha sea un string no vacio
      if (!transaccion.fecha || typeof transaccion.fecha !== "string") {
        throw new Error("Fecha invalida");
      }

      // Si todas las validaciones pasan, se retorna la transaccion
      callback(null, transaccion);

    } catch (error) {

      // Si ocurre un error, se retorna de forma controlada por callback
      callback(error, null);
    }

  }, 300);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Valida logicamente el monto de la transaccion
function validarMontoTransaccion(transaccion) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // setTimeout simula un proceso asincronico
    setTimeout(() => {

      // Se verifica que el monto sea numerico y positivo
      if (isNaN(transaccion.monto) || transaccion.monto <= 0) {

        // Si el monto no es valido se rechaza la promesa
        reject(new Error("El monto debe ser un numero positivo"));

      } else {

        // Si el monto es correcto se resuelve la promesa
        resolve(transaccion);
      }

    }, 300);
  });
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Procesa todas las transacciones y genera resultados
export async function procesarTransaccionesEj7(transacciones) {

  // Arreglo para almacenar transacciones validas
  const validas = [];

  // Arreglo para almacenar transacciones invalidas
  const invalidas = [];

  // Objeto para almacenar los saldos por usuario
  const saldos = {};

  // Objeto para almacenar alertas de saldo negativo
  const saldoNegativo = {};

  // Objeto para almacenar patrones de riesgo por usuario
  const patronesRiesgo = {};

  try {

    // Se valida que la entrada sea un arreglo
    if (!Array.isArray(transacciones)) {
      throw new Error("Las transacciones deben ser un arreglo");
    }

    // Se crea una copia para garantizar inmutabilidad
    const copiaTransacciones = [...transacciones];

    // Objeto auxiliar para contar egresos consecutivos por usuario
    const contadorEgresos = {};

    // Se recorre el arreglo usando un ciclo for clasico
    for (let i = 0; i < copiaTransacciones.length; i++) {

      // Se obtiene la transaccion actual
      const transaccion = copiaTransacciones[i];

      try {

        // VALIDACION CON CALLBACK
        // Se envuelve la funcion callback dentro de una promesa
        const estructuraValida = await new Promise((resolve, reject) => {

          // Se llama a la validacion estructural
          validarEstructuraTransaccion(transaccion, (error, data) => {

            // Si hay error se rechaza la promesa
            if (error) {
              reject(error);
            } else {
              // Si no hay error se continua
              resolve(data);
            }
          });
        });

        // VALIDACION CON PROMESA
        // Se valida el monto usando promesas
        const transaccionValida = await validarMontoTransaccion(estructuraValida);

        // PROCESAMIENTO
        // Se extraen los datos necesarios de la transaccion
        const idUsuario = transaccionValida.idUsuario;
        const tipo = transaccionValida.tipo;
        const monto = transaccionValida.monto;

        // Se inicializa el saldo del usuario si no existe
        if (saldos[idUsuario] === undefined) {
          saldos[idUsuario] = 0;
        }

        // Se suma o resta segun el tipo de transaccion
        if (tipo === "ingreso") {
          saldos[idUsuario] = saldos[idUsuario] + monto;
        } else {
          saldos[idUsuario] = saldos[idUsuario] - monto;
        }

        // Se almacena la transaccion valida
        validas.push(transaccionValida);

        // DETECCION DE SALDO NEGATIVO
        // Se verifica si el saldo del usuario es negativo
        if (saldos[idUsuario] < 0) {
          saldoNegativo[idUsuario] = true;
        }

        // DETECCION DE PATRON DE RIESGO
        // Se inicializa el contador de egresos consecutivos
        if (contadorEgresos[idUsuario] === undefined) {
          contadorEgresos[idUsuario] = 0;
        }

        // Se verifica el tipo de transaccion
        if (tipo === "egreso") {

          // Se incrementa el contador de egresos
          contadorEgresos[idUsuario] = contadorEgresos[idUsuario] + 1;

          // Se marca patron de riesgo si hay 2 o mas egresos consecutivos
          if (contadorEgresos[idUsuario] >= 2) {
            patronesRiesgo[idUsuario] = true;
          }

        } else {

          // Si es ingreso, se reinicia el contador
          contadorEgresos[idUsuario] = 0;
        }

      } catch (errorInterno) {

        // Si falla una transaccion, se almacena como invalida
        invalidas.push({
          transaccion: transaccion,
          motivo: errorInterno.message
        });
      }
    }

    // Se retorna un objeto con todos los resultados
    return {
      totalProcesadas: copiaTransacciones.length,
      validas: validas,
      invalidas: invalidas,
      saldos: saldos,
      saldoNegativo: saldoNegativo,
      patronesRiesgo: patronesRiesgo
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna de forma controlada
    return {
      estado: "ERROR",
      mensaje: errorGeneral.message
    };
  }
}