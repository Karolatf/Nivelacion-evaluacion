// SISTEMA DE ANALISIS Y CONTROL DE INVENTARIO POR LOTES
// Este archivo contiene la logica completa del Ejercicio 8 (ejercicio 2 de Andres)

// FUNCIÓN CALLBACK (NO SE EXPORTA)
// Definimos esta función para simular una validación externa del lote, recibiendo el objeto
// 'movimiento' y una función 'callback' que gestiona la asincronía bajo el patrón Error-First Callback.
function validarLoteCallback(movimiento, callback) {

  // Utilizamos setTimeout para simular una operación asincrónica con latencia controlada,
  // representando consultas externas como verificaciones de lote en un sistema de bodega real.
  setTimeout(() => {

    try {

      // Aplicamos 'typeof' para verificar que el lote sea una cadena de texto y usamos
      // '.trim()' para descartar entradas vacías o compuestas solo por espacios en blanco.
      if (typeof movimiento.lote !== "string" || movimiento.lote.trim() === "") {
        throw new Error("Lote invalido");
      }

      // Verificamos que el campo 'activo' sea estrictamente booleano, ya que un tipo
      // incorrecto en este campo impediría clasificar el movimiento en la lógica de negocio.
      if (typeof movimiento.activo !== "boolean") {
        throw new Error("Producto inactivo o dato de estado incorrecto");
      }

      // Si ambas validaciones son superadas, ejecutamos el callback con 'null' en el error
      // y el movimiento como segundo argumento, siguiendo el estándar Error-First Callback.
      callback(null, movimiento);

    } catch (error) {

      // Capturamos cualquier excepción lanzada y la propagamos mediante el callback,
      // enviando el objeto Error como primer argumento y 'null' como dato, indicando fallo.
      callback(error, null);
    }

  }, 300); // Definimos un retardo de 300 ms para simular la latencia de una validación externa.
}


// PROMESA ASINCRÓNICA (NO SE EXPORTA)
// Definimos esta función para encapsular la validación de cantidad dentro de una Promesa,
// permitiendo consumirla con 'await' en la función principal de forma legible y ordenada.
function validarCantidadPromesa(movimiento) {

  // Retornamos una instancia de Promise que expone los métodos resolve (éxito) y reject (fallo).
  return new Promise((resolve, reject) => {

    // Empleamos setTimeout para simular asincronía, representando una validación
    // que podría depender de un servicio externo o una regla de negocio diferida.
    setTimeout(() => {

      // Verificamos que la cantidad sea de tipo 'number' y mayor a cero, ya que
      // cantidades negativas o nulas no tienen sentido semántico en un movimiento de inventario.
      if (typeof movimiento.cantidad !== "number" || movimiento.cantidad <= 0) {

        // Rechazamos la promesa con un Error descriptivo para que el bloque
        // 'catch' de la función principal pueda registrar el motivo del rechazo.
        reject(new Error("Cantidad invalida"));

      } else {

        // Si la cantidad cumple los criterios, resolvemos la promesa devolviendo
        // el movimiento completo para continuar con el flujo de procesamiento.
        resolve(movimiento);
      }

    }, 300); // Retardo de 300 ms que simula el tiempo de respuesta de un validador externo.
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT (SE EXPORTA)
// Declaramos esta función con 'export' y 'async' para hacerla accesible desde el menú general
// y para poder usar 'await' en la coordinación del flujo asincrónico de validación e inventario.
export async function procesarInventarioEj8(movimientos) {

  // Inicializamos un arreglo mutable para almacenar los movimientos que superen
  // todas las validaciones y sean clasificados como operaciones de inventario válidas.
  const validos = [];

  // Inicializamos un arreglo paralelo para registrar los movimientos que no cumplieron
  // las reglas de validación, conservando el motivo específico de cada rechazo.
  const rechazados = [];

  // Definimos un objeto vacío que actuará como estructura de datos dinámica,
  // agrupando el estado final del inventario por idProducto como clave de acceso.
  const inventarioFinal = {};

  try {

    // Usamos 'Array.isArray()' para verificar que la entrada sea un arreglo válido;
    // si no lo es, lanzamos un error que detiene el proceso general de forma controlada.
    if (!Array.isArray(movimientos)) {
      throw new Error("Los movimientos deben ser un arreglo");
    }

    // Aplicamos el operador spread ('...') para crear una copia superficial del arreglo original,
    // garantizando la inmutabilidad de los datos de entrada sin alterar la referencia original.
    const copiaMovimientos = [...movimientos];

    // Implementamos un ciclo 'for' clásico para recorrer el arreglo de forma secuencial,
    // procesando cada movimiento de manera individual y controlada dentro de su propio try/catch.
    for (let i = 0; i < copiaMovimientos.length; i++) {

      // Extraemos el movimiento actual mediante su índice para operar sobre él
      // sin modificar el arreglo de trabajo que estamos recorriendo.
      const movimiento = copiaMovimientos[i];

      try {

        // FASE 1: VALIDACIÓN CON CALLBACK (Promisificación)
        // Envolvemos manualmente la función de callback en una Promesa para integrarla
        // al flujo moderno de async/await, convirtiendo la asincronía heredada en asincronía moderna.
        const movimientoCallback = await new Promise((resolve, reject) => {

          // Invocamos la función de validación del lote; si el callback retorna un error,
          // llamamos a 'reject' para propagar el fallo hacia el bloque 'catch' del ciclo.
          validarLoteCallback(movimiento, (error, data) => {

            // Evaluamos el primer argumento del callback siguiendo el patrón Error-First:
            // si existe error, rechazamos; de lo contrario, resolvemos con los datos.
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          });
        });

        // FASE 2: VALIDACIÓN CON PROMESA
        // Consumimos directamente la promesa de validación de cantidad mediante 'await',
        // pausando la ejecución hasta obtener el movimiento validado o capturar el rechazo.
        const movimientoValido = await validarCantidadPromesa(movimientoCallback);

        // FASE 3: CLASIFICACIÓN LÓGICA Y CÁLCULO DE INVENTARIO
        // Aplicamos una condición para garantizar que solo los productos activos modifiquen
        // el inventario, descartando de forma controlada los inactivos con su motivo registrado.
        if (movimientoValido.activo) {

          // Añadimos el movimiento al arreglo de válidos para incluirlo en el reporte final.
          validos.push(movimientoValido);

          // Aplicamos inicialización condicional: si el producto no tiene entrada en el inventario,
          // creamos su registro con cantidad cero para evitar errores de referencia en la suma o resta.
          if (!inventarioFinal[movimientoValido.idProducto]) {
            inventarioFinal[movimientoValido.idProducto] = {
              nombreProducto: movimientoValido.nombreProducto,
              cantidad: 0
            };
          }

          // Usamos operadores matemáticos de suma o resta según el tipo de movimiento
          // para actualizar el saldo del inventario de forma acumulativa y precisa.
          if (movimientoValido.tipoMovimiento === "entrada") {

            // Las entradas incrementan la cantidad disponible del producto en el inventario.
            inventarioFinal[movimientoValido.idProducto].cantidad =
              inventarioFinal[movimientoValido.idProducto].cantidad + movimientoValido.cantidad;

          } else if (movimientoValido.tipoMovimiento === "salida") {

            // Las salidas decrementan la cantidad; un resultado negativo activará la alerta
            // de inventario crítico en la fase de detección posterior.
            inventarioFinal[movimientoValido.idProducto].cantidad =
              inventarioFinal[movimientoValido.idProducto].cantidad - movimientoValido.cantidad;

          } else {

            // Si el tipo de movimiento no es "entrada" ni "salida", se rechaza el registro
            // con un motivo descriptivo sin interrumpir el procesamiento del resto del lote.
            rechazados.push({
              movimiento: movimientoValido,
              motivo: "Tipo de movimiento invalido"
            });
          }

        } else {

          // Los productos con estado inactivo se registran en el arreglo de rechazados
          // con su motivo específico, manteniendo trazabilidad del descarte.
          rechazados.push({
            movimiento: movimientoValido,
            motivo: "Producto inactivo"
          });
        }

      } catch (errorInterno) {

        // Capturamos errores individuales de cada movimiento para registrarlos como rechazados,
        // garantizando que el fallo de un registro no detenga el procesamiento del resto del lote.
        rechazados.push({
          movimiento: movimiento,
          motivo: errorInterno.message
        });
      }
    }

    // FASE 4: DETECCIÓN DE INVENTARIO NEGATIVO
    // Inicializamos un arreglo para consolidar los productos cuyo saldo final resultó negativo,
    // lo que representa una inconsistencia crítica entre entradas y salidas registradas.
    const inventarioNegativo = [];

    // Extraemos las claves del objeto 'inventarioFinal' con Object.keys() para iterar
    // sobre cada producto registrado y evaluar si su cantidad final es menor a cero.
    const productosIds = Object.keys(inventarioFinal);
    for (let i = 0; i < productosIds.length; i++) {
      const id = productosIds[i];
      const info = inventarioFinal[id];

      // Aplicamos el operador de comparación para detectar saldos negativos y agregar
      // al arreglo de alertas los productos que requieren revisión urgente.
      if (info.cantidad < 0) {
        inventarioNegativo.push({
          idProducto: id,
          nombreProducto: info.nombreProducto,
          cantidad: info.cantidad
        });
      }
    }

    // Retornamos un objeto compuesto con los cuatro conjuntos de resultados del proceso,
    // separando: movimientos válidos, rechazados, estado del inventario y alertas críticas.
    return {
      validos: validos,
      rechazados: rechazados,
      inventarioFinal: inventarioFinal,
      inventarioNegativo: inventarioNegativo
    };

  } catch (errorGeneral) {

    // Capturamos errores críticos que impidan el inicio del procesamiento (ej. entrada no válida)
    // y retornamos un objeto de error controlado sin detener la ejecución del sistema general.
    return {
      estado: "ERROR",
      mensaje: errorGeneral.message
    };
  }
}