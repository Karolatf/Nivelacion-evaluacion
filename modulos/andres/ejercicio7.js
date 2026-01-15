// EJERCICIO 7 - SISTEMA DE TRANSACCIONES Y CONTROL DE RIESGO
// Versión completa con saldo negativo y patrón de riesgo

// FUNCIÓN CALLBACK (NO SE EXPORTA)
// Valida la estructura básica de cada transacción
function validarEstructuraTransaccion(transaccion, callback) {
  setTimeout(() => {
    try {
      // Verifica que la transacción sea un objeto válido
      if (typeof transaccion !== "object" || transaccion === null) {
        throw new Error("La transacción no es un objeto válido");
      }

      // Verifica que el idUsuario sea un número mayor a 0
      if (typeof transaccion.idUsuario !== "number" || transaccion.idUsuario <= 0) {
        throw new Error("ID de usuario inválido");
      }

      // Verifica que el tipo de transacción sea "ingreso" o "egreso"
      if (!["ingreso", "egreso"].includes(transaccion.tipo)) {
        throw new Error("Tipo de transacción inválido");
      }

      // Verifica que el monto sea un número positivo
      if (typeof transaccion.monto !== "number" || transaccion.monto <= 0) {
        throw new Error("Monto inválido");
      }

      // Verifica que la categoría sea un string no vacío
      if (!transaccion.categoria || typeof transaccion.categoria !== "string") {
        throw new Error("Categoría inválida");
      }

      // Verifica que la fecha sea un string no vacío
      if (!transaccion.fecha || typeof transaccion.fecha !== "string") {
        throw new Error("Fecha inválida");
      }

      // Si todas las validaciones pasan, se retorna la transacción
      callback(null, transaccion);

    } catch (error) {
      // Si ocurre un error, se retorna de forma controlada por callback
      callback(error, null);
    }
  }, 300);
}


// FUNCIÓN CON PROMESA (NO SE EXPORTA)
// Valida lógicamente el monto de la transacción
function validarMontoTransaccion(transaccion) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // setTimeout simula un proceso asincrónico
    setTimeout(() => {

      // Se verifica que el monto sea numérico y positivo
      if (isNaN(transaccion.monto) || transaccion.monto <= 0) {

        // Si el monto no es válido se rechaza la promesa
        reject(new Error("El monto debe ser un número positivo"));

      } else {

        // Si el monto es correcto se resuelve la promesa
        resolve(transaccion);
      }

    }, 300);
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// ESTA FUNCIÓN SÍ SE EXPORTA
// Procesa todas las transacciones y genera resultados
export async function procesarTransaccionesEj7(transacciones) {

  // Arreglo para almacenar transacciones válidas
  const validas = [];

  // Arreglo para almacenar transacciones inválidas
  const invalidas = [];

  // Objeto para almacenar los saldos por usuario
  const saldos = {};

  // Objeto para almacenar alertas de saldo negativo
  const saldoNegativo = {};

  // Objeto para almacenar patrones de riesgo por usuario (múltiples egresos consecutivos)
  const patronesRiesgo = {};

  try {

    // Validación inicial: debe ser un arreglo
    if (!Array.isArray(transacciones)) {
      throw new Error("Las transacciones deben ser un arreglo");
    }

    // Se crea una copia para garantizar inmutabilidad
    const copiaTransacciones = [...transacciones];

    // Objeto auxiliar para contar egresos consecutivos por usuario
    const contadorEgresos = {};

    // Ciclo clásico para recorrer todas las transacciones
    for (let i = 0; i < copiaTransacciones.length; i++) {

      // Se obtiene la transacción actual
      const transaccion = copiaTransacciones[i];

    try {

        // VALIDACIÓN CON CALLBACK
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

     // VALIDACIÓN CON PROMESA
        // Se valida el monto usando promesas
        const transaccionValida = await validarMontoTransaccion(estructuraValida);

        // PROCESAMIENTO
        // Se extraen los datos necesarios de la transacción
        const { idUsuario, tipo, monto } = transaccionValida;

        // Se inicializa el saldo del usuario si no existe
        saldos[idUsuario] = saldos[idUsuario] ?? 0;

        // Se suma o resta según el tipo de transacción
        saldos[idUsuario] += tipo === "ingreso" ? monto : -monto;

        // Se almacena la transacción válida
        validas.push(transaccionValida);


      // DETECCIÓN DE SALDO NEGATIVO
        // Se verifica si el saldo del usuario es negativo
        if (saldos[idUsuario] < 0) {
          saldoNegativo[idUsuario] = true;
        }

        // DETECCIÓN DE PATRÓN DE RIESGO
        // Se inicializa el contador de egresos consecutivos
        contadorEgresos[idUsuario] = contadorEgresos[idUsuario] ?? 0;

        // Se verifica el tipo de transacción
        if (tipo === "egreso") {

          // Se incrementa el contador de egresos
          contadorEgresos[idUsuario] += 1;

          // Se marca patrón de riesgo si hay 2 o más egresos consecutivos
          if (contadorEgresos[idUsuario] >= 2) {
            patronesRiesgo[idUsuario] = true;
          }

        } else {

          // Si es ingreso, se reinicia el contador
          contadorEgresos[idUsuario] = 0;
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
    // Retorna un objeto con todos los resultados
    return {
      totalProcesadas: copiaTransacciones.length, // Cantidad total de transacciones
      validas, // Arreglo de transacciones válidas
      invalidas, // Arreglo de transacciones inválidas
      saldos, // Objeto con saldo final por usuario
      saldoNegativo, // Usuarios con saldo negativo
      patronesRiesgo // Usuarios con múltiples egresos consecutivos
    };

  } catch (errorGeneral) {
    // Si ocurre un error crítico, se retorna de forma controlada
    return {
      estado: "ERROR",
      mensaje: errorGeneral.message
    };
  }
}
