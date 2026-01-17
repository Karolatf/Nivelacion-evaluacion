// SISTEMA DE TRANSACCIONES Y CONTROL DE RIESGO
// Este archivo contiene TODA la logica del ejercicio


// FUNCION CALLBACK (NO SE EXPORTA)
// Simula una validacion externa
function validarEstructuraTransaccion(transaccion, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    try {

      // Se valida que la transaccion sea un objeto valido
      if (typeof transaccion !== "object" || transaccion === null) {
        throw new Error("La transaccion no es un objeto valido");
      }

      // Se valida que el id sea un numero entero positivo
      if (typeof transaccion.id !== "number" || isNaN(transaccion.id) || transaccion.id <= 0) {
        throw new Error("ID invalido");
      }

      // Se valida que el usuario sea un string no vacio
      if (typeof transaccion.usuario !== "string" || transaccion.usuario.trim() === "") {
        throw new Error("Usuario invalido");
      }

      // Se valida que el monto sea de tipo numerico
      if (typeof transaccion.monto !== "number") {
        throw new Error("Monto invalido");
      }

      // Se valida que el tipo sea ingreso o egreso
      if (transaccion.tipo !== "ingreso" && transaccion.tipo !== "egreso") {
        throw new Error("Tipo de transaccion invalido");
      }

      // Se valida que el estado de autorizacion sea booleano
      if (typeof transaccion.autorizada !== "boolean") {
        throw new Error("Estado de autorizacion invalido");
      }

      // Si todas las validaciones son correctas
      // se retorna la transaccion sin modificar
      callback(null, transaccion);

    } catch (error) {

      // Si ocurre cualquier error
      // se retorna de forma controlada por callback
      callback(error, null);
    }

  }, 300);
}


// FUNCION CON PROMESA (NO SE EXPORTA)
// Valida logicamente el monto de la transaccion
function validarMontoTransaccion(transaccion) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // Se simula un proceso asincronico
    setTimeout(() => {

      // isNaN verifica que el monto sea numerico
      if (isNaN(transaccion.monto)) {

        // Si el monto no es valido se rechaza la promesa
        reject(new Error("El monto no es un numero valido"));

      } else {

        // Si el monto es correcto se resuelve la promesa
        resolve(transaccion);
      }

    }, 300);
  });
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
export async function procesarTransaccionesEj4(transacciones) {

  // Arreglo para almacenar transacciones validas
  const validas = [];

  // Arreglo para almacenar transacciones sospechosas
  const sospechosas = [];

  // Arreglo para almacenar transacciones invalidas
  const invalidas = [];

  // Variable acumuladora de ingresos
  let totalIngresos = 0;

  // Variable acumuladora de egresos
  let totalEgresos = 0;

  try {

    // Se valida que la entrada principal sea un arreglo
    if (!Array.isArray(transacciones)) {
      throw new Error("Las transacciones deben ser un arreglo");
    }

    // Se crea una copia para garantizar inmutabilidad
    const copiaTransacciones = [...transacciones];

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

        // CLASIFICACION LOGICA
        // Se evalua si la transaccion esta autorizada
        if (transaccionValida.autorizada === true) {

          // Se agrega al arreglo de validas
          validas.push(transaccionValida);

          // Se evalua el tipo de transaccion
          if (transaccionValida.tipo === "ingreso") {

            // Se suma al total de ingresos
            totalIngresos = totalIngresos + transaccionValida.monto;

          } else {

            // Se suma al total de egresos
            totalEgresos = totalEgresos + transaccionValida.monto;
          }

        } else {

          // Si no esta autorizada se marca como sospechosa
          sospechosas.push(transaccionValida);
        }

      } catch (errorInterno) {

        // Si falla una transaccion
        // se almacena como invalida sin detener el sistema
        invalidas.push({
          transaccion: transaccion,
          motivo: errorInterno.message
        });
      }
    }

    // RESULTADO FINAL
    // Se retorna un objeto con todos los resultados
    return {
      totalProcesadas: copiaTransacciones.length,
      validas: validas,
      sospechosas: sospechosas,
      invalidas: invalidas,
      totalIngresos: totalIngresos,
      totalEgresos: totalEgresos,
      balanceFinal: totalIngresos + totalEgresos
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico
    // se retorna un error controlado
    return {
      estado: "ERROR",
      mensaje: errorGeneral.message
    };
  }
}


// Yo entiendo que se puede usar un contador simple con let validas = 0, 
// pero en este ejercicio la guía pide que retorne la lista completa de transacciones válidas, 
// no solo el número. Por eso uso un arreglo con const validas = [] y voy agregando cada transacción válida con .push().
// Al final, si necesito el total, uso validas.length que me da la cantidad."

