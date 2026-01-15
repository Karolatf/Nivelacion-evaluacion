// SISTEMA DE TRANSACCIONES Y CONTROL DE RIESGO
// Este archivo contiene TODA la lógica del ejercicio


// FUNCIÓN CALLBACK (NO SE EXPORTA)
// Simula una validación estructural externa
function validarEstructuraTransaccion(transaccion, callback) {

  // setTimeout simula un proceso asincrónico
  setTimeout(() => {

    try {

      // Se valida que la transacción sea un objeto válido
      if (typeof transaccion !== "object" || transaccion === null) {
        throw new Error("La transacción no es un objeto válido");
      }

      // Se valida que el id sea un número entero positivo
      if (typeof transaccion.id !== "number" || transaccion.id <= 0) {
        throw new Error("ID inválido");
      }

      // Se valida que el usuario sea un string no vacío
      if (typeof transaccion.usuario !== "string" || transaccion.usuario.trim() === "") {
        throw new Error("Usuario inválido");
      }

      // Se valida que el monto sea de tipo numérico
      if (typeof transaccion.monto !== "number") {
        throw new Error("Monto inválido");
      }

      // Se valida que el tipo sea ingreso o egreso
      if (transaccion.tipo !== "ingreso" && transaccion.tipo !== "egreso") {
        throw new Error("Tipo de transacción inválido");
      }

      // Se valida que el estado de autorización sea booleano
      if (typeof transaccion.autorizada !== "boolean") {
        throw new Error("Estado de autorización inválido");
      }

      // Si todas las validaciones son correctas
      // se retorna la transacción sin modificar
      callback(null, transaccion);

    } catch (error) {

      // Si ocurre cualquier error
      // se retorna de forma controlada por callback
      callback(error, null);
    }

  }, 300); // Retardo artificial para simular asincronía
}


// FUNCIÓN CON PROMESA (NO SE EXPORTA)
// Valida lógicamente el monto de la transacción
function validarMontoTransaccion(transaccion) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // Se simula un proceso asincrónico
    setTimeout(() => {

      // isNaN verifica que el monto sea numérico
      if (isNaN(transaccion.monto)) {

        // Si el monto no es válido se rechaza la promesa
        reject(new Error("El monto no es un número válido"));

      } else {

        // Si el monto es correcto se resuelve la promesa
        resolve(transaccion);
      }

    }, 300);
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// ESTA FUNCIÓN SÍ SE EXPORTA
// Es la única función visible para el menú general
export async function procesarTransaccionesEj4(transacciones) {

  // Arreglo para almacenar transacciones válidas
  const validas = [];

  // Arreglo para almacenar transacciones sospechosas                 // ESTA FUNCION VA DE LA MANO DE VALIDACION CON PROMESAS
                                                                      // YA QUE EL ARREGLO INICIA VACIO Y DENTRO DEL CICLO DE transaccionValida
  const sospechosas = [];                                             // SE VA GUARDANDO CADA OBJETO COMPLETO. 
                                                                      // ESTO YA QUE NECESITO RETORNAR LAS TRANSACCIONES COMPLETAS, NO SOLO CONTARLAS. 
  // Arreglo para almacenar transacciones inválidas
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

    // Se recorre el arreglo usando un ciclo for clásico
    for (let i = 0; i < copiaTransacciones.length; i++) {

      // Se obtiene la transacción actual
      const transaccion = copiaTransacciones[i];

      try {

        // - VALIDACIÓN CON CALLBACK -
        // Se envuelve la función callback dentro de una promesa
        const estructuraValida = await new Promise((resolve, reject) => {

          // Se llama a la validación estructural
          validarEstructuraTransaccion(transaccion, (error, data) => {

            // Si hay error se rechaza la promesa
            if (error) {
              reject(error);
            } 
            // Si no hay error se continúa
            else {
              resolve(data);
            }
          });
        });

        // --- VALIDACIÓN CON PROMESA ---
        // Se valida el monto usando promesas
        const transaccionValida = await validarMontoTransaccion(estructuraValida);       // ESTA FUNCION VA DE LA MANO DE ASYNC / AWAIT

        // -- CLASIFICACIÓN LÓGICA --
        // Se evalúa si la transacción está autorizada
        if (transaccionValida.autorizada === true) {

          // Se agrega al arreglo de válidas
          validas.push(transaccionValida);

          // Se evalúa el tipo de transacción
          if (transaccionValida.tipo === "ingreso") {

            // Se suma al total de ingresos
            totalIngresos += transaccionValida.monto;

          } else {

            // Se suma al total de egresos
            totalEgresos += transaccionValida.monto;
          }

        } else {

          // Si no está autorizada se marca como sospechosa
          sospechosas.push(transaccionValida);
        }

      } catch (errorInterno) {

        // Si falla una transacción
        // se almacena como inválida sin detener el sistema
        invalidas.push({
          transaccion: transaccion,
          motivo: errorInterno.message
        });
      }
    }

    // -- RESULTADO FINAL --
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

    // Si ocurre un error crítico
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

