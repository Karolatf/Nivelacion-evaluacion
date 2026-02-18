// SISTEMA DE GESTIÓN Y VALIDACIÓN DE TRANSACCIONES FINANCIERAS
// Este módulo centraliza la auditoría de saldos y la detección de patrones de riesgo conductual.

// FUNCIÓN CALLBACK (Validación Estructural)
// JUSTIFICACIÓN: Implementada para realizar una verificación de esquema obligatoria antes de cualquier cálculo.
// RECIBE: El objeto 'transaccion' y la función 'callback'. RETORNA: El resultado de la validación asíncrona.
function validarEstructuraTransaccion(transaccion, callback) {

  // Iniciamos un temporizador para simular la latencia de una validación de esquema en un servidor externo.
  setTimeout(() => {

    // Iniciamos un bloque try para capturar cualquier error de validación de datos.
    try {

      // Verificamos que la entrada sea un objeto y no sea nula para evitar errores de lectura de propiedades.
      if (typeof transaccion !== "object" || transaccion === null) {
        throw new Error("La transaccion no es un objeto valido");
      }

      // Validamos que el ID de usuario sea un número, que no sea NaN y que sea un valor positivo.
      if (typeof transaccion.idUsuario !== "number" || isNaN(transaccion.idUsuario) || transaccion.idUsuario <= 0) {
        throw new Error("ID de usuario invalido");
      }

      // Comprobamos que el tipo de transacción coincida exactamente con los valores permitidos en el sistema.
      if (!["ingreso", "egreso"].includes(transaccion.tipo)) {
        throw new Error("Tipo de transaccion invalido");
      }

      // Validamos que el monto sea un número y que sea estrictamente mayor a cero según la regla financiera.
      if (typeof transaccion.monto !== "number" || transaccion.monto <= 0) {
        throw new Error("Monto invalido");
      }

      // Verificamos que la categoría exista y sea una cadena de texto para la clasificación del gasto.
      if (!transaccion.categoria || typeof transaccion.categoria !== "string") {
        throw new Error("Categoria invalida");
      }

      // Validamos que la fecha esté presente como string para mantener la trazabilidad temporal.
      if (!transaccion.fecha || typeof transaccion.fecha !== "string") {
        throw new Error("Fecha invalida");
      }

      // Si todas las validaciones son exitosas, ejecutamos el callback enviando 'null' en el error y la transacción válida.
      callback(null, transaccion);

    } catch (error) {

      // En caso de encontrar un error, lo enviamos como primer argumento del callback siguiendo el estándar de Node.js.
      callback(error, null);
    }

  }, 300); // Definimos un tiempo de espera de 300 milisegundos.
}


// FUNCIÓN CON PROMESA (Validación Lógica de Monto)
// JUSTIFICACIÓN: Se utiliza para simular una validación de fondos o límites de crédito de forma asíncrona.
function validarMontoTransaccion(transaccion) {

  // Retornamos una nueva instancia de Promesa para gestionar el flujo de éxito o fallo.
  return new Promise((resolve, reject) => {

    // Simulamos un proceso asíncrono de verificación de fondos con un retraso controlado.
    setTimeout(() => {

      // Verificamos que el monto sea un número operable y mayor que cero.
      if (isNaN(transaccion.monto) || transaccion.monto <= 0) {

        // Si el monto es inconsistente, rechazamos la promesa enviando el objeto de error.
        reject(new Error("El monto debe ser un numero positivo"));

      } else {

        // Si el monto es correcto, resolvemos la promesa devolviendo el objeto de la transacción.
        resolve(transaccion);
      }

    }, 300); // El tiempo de simulación es de 300 milisegundos.
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT (Orquestador de Auditoría)
// JUSTIFICACIÓN: Coordina el análisis financiero, garantizando inmutabilidad y detección de patrones de riesgo.
export async function procesarTransaccionesEj7(transacciones) {

  // Inicializamos arreglos vacíos para clasificar las transacciones según su validez técnica.
  const validas = [];
  const invalidas = [];

  // Inicializamos objetos vacíos (diccionarios) para agrupar saldos y alertas por cada ID de usuario único.
  const saldos = {}; 
  const saldoNegativo = {}; 
  const patronesRiesgo = {}; 

  // Iniciamos el bloque try principal para capturar errores críticos en la entrada de datos general.
  try {

    // Validamos que el parámetro de entrada sea efectivamente un arreglo antes de intentar iterar sobre él.
    if (!Array.isArray(transacciones)) {
      throw new Error("Las transacciones deben ser un arreglo");
    }

    // APLICACIÓN DE INMUTABILIDAD: Creamos una copia del arreglo original para evitar efectos secundarios en la fuente de datos.
    const copiaTransacciones = [...transacciones];

    // Creamos un objeto temporal para rastrear cuántos egresos seguidos realiza cada usuario.
    const contadorEgresos = {};

    // Iniciamos un ciclo for clásico para procesar el lote de transacciones de forma secuencial y ordenada.
    for (let i = 0; i < copiaTransacciones.length; i++) {
      
      // Extraemos la transacción actual del arreglo para su análisis individual.
      const transaccion = copiaTransacciones[i];

      // Iniciamos un bloque try interno para que el fallo de una transacción no detenga el proceso de las demás.
      try {

        // PASO 1: Envolvemos el Callback en una Promesa (Promisificación) para poder usar 'await' en la validación básica.
        const estructuraValida = await new Promise((resolve, reject) => {
          validarEstructuraTransaccion(transaccion, (error, data) => {
            if (error) reject(error); // Si el callback reporta error, rechazamos la promesa interna.
            else resolve(data);      // Si el callback es exitoso, resolvemos con los datos validados.
          });
        });

        // PASO 2: Ejecutamos la validación con promesa y esperamos su resolución para confirmar el monto.
        const transaccionValida = await validarMontoTransaccion(estructuraValida);

        // PASO 3: DESTRUCTURING (Operadores Modernos): Extraemos las propiedades necesarias del objeto validado.
        const { idUsuario, tipo, monto } = transaccionValida;

        // Verificamos si es la primera vez que vemos al usuario para inicializar su saldo y contador de riesgos.
        if (saldos[idUsuario] === undefined) {
          saldos[idUsuario] = 0;
          contadorEgresos[idUsuario] = 0;
        }

        // CÁLCULO DE SALDO: Si es ingreso sumamos el monto; si es egreso lo restamos del total del usuario.
        if (tipo === "ingreso") {
          saldos[idUsuario] = saldos[idUsuario] + monto;
          // Si hay un ingreso, el patrón de "egresos consecutivos" se rompe y reiniciamos el contador a cero.
          contadorEgresos[idUsuario] = 0;
        } else {
          saldos[idUsuario] = saldos[idUsuario] - monto;
          // Si es egreso, incrementamos el contador para verificar si el usuario está gastando de forma compulsiva.
          contadorEgresos[idUsuario] = contadorEgresos[idUsuario] + 1;
        }

        // DETECCIÓN DE PATRONES DE RIESGO: Si el usuario realiza 2 o más egresos sin ingresos intermedios, activamos la alerta.
        if (contadorEgresos[idUsuario] >= 2) {
          patronesRiesgo[idUsuario] = true;
        }

        // DETECCIÓN DE SALDO NEGATIVO: Si después de la operación el saldo es menor a cero, marcamos al usuario en riesgo.
        if (saldos[idUsuario] < 0) {
          saldoNegativo[idUsuario] = true;
        }

        // Agregamos la transacción aprobada al listado de transacciones válidas.
        validas.push(transaccionValida);

      } catch (errorInterno) {

        // Si ocurre un error en los pasos anteriores, capturamos el mensaje y guardamos la transacción en el grupo de inválidas.
        invalidas.push({
          transaccion: transaccion,
          motivo: errorInterno.message
        });
      }
    }

    // Al finalizar el ciclo, retornamos un objeto estructurado con toda la información de la auditoría.
    return {
      totalProcesadas: copiaTransacciones.length,
      validas: validas,
      invalidas: invalidas,
      saldos: saldos,
      saldoNegativo: saldoNegativo,
      patronesRiesgo: patronesRiesgo
    };

  } catch (errorGeneral) {

    // Si ocurre un error crítico (como que la entrada no sea un arreglo), retornamos un estado de error global.
    return {
      estado: "ERROR",
      mensaje: errorGeneral.message
    };
  }
}