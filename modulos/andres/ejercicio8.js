// SISTEMA DE ANALISIS Y CONTROL DE INVENTARIO POR LOTES
// Este archivo contiene la logica completa del Ejercicio 8 (ejercicio 2 de Andres)


// FUNCION CALLBACK (NO SE EXPORTA)
// Simula la validacion externa de un lote
function validarLoteCallback(movimiento, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    try {

      // Se valida que el lote sea un string no vacio
      if (typeof movimiento.lote !== "string" || movimiento.lote.trim() === "") {
        throw new Error("Lote invalido");
      }

      // Se valida que el estado activo sea booleano
      if (typeof movimiento.activo !== "boolean") {
        throw new Error("Producto inactivo o dato de estado incorrecto");
      }

      // Si todas las validaciones son correctas, se retorna el movimiento
      callback(null, movimiento);

    } catch (error) {

      // Si ocurre un error, se retorna de forma controlada por callback
      callback(error, null);
    }

  }, 300);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Valida que la cantidad sea un numero mayor a cero
function validarCantidadPromesa(movimiento) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // setTimeout simula un proceso asincronico
    setTimeout(() => {

      // Se verifica que la cantidad sea numerica y positiva
      if (typeof movimiento.cantidad !== "number" || movimiento.cantidad <= 0) {

        // Si la cantidad no es valida se rechaza la promesa
        reject(new Error("Cantidad invalida"));

      } else {

        // Si la cantidad es correcta se resuelve la promesa
        resolve(movimiento);
      }

    }, 300);
  });
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
export async function procesarInventarioEj8(movimientos) {

  // Arreglo de movimientos validos
  const validos = [];

  // Arreglo de movimientos rechazados
  const rechazados = [];

  // Objeto que almacenara el inventario final por producto
  const inventarioFinal = {};

  try {

    // Se valida que la entrada sea un arreglo
    if (!Array.isArray(movimientos)) {
      throw new Error("Los movimientos deben ser un arreglo");
    }

    // Se crea una copia para garantizar inmutabilidad
    const copiaMovimientos = [...movimientos];

    // Se recorre el arreglo usando un ciclo for clasico
    for (let i = 0; i < copiaMovimientos.length; i++) {

      // Se obtiene el movimiento actual
      const movimiento = copiaMovimientos[i];

      try {

        // VALIDACION CON CALLBACK
        // Se envuelve la funcion callback dentro de una promesa
        const movimientoCallback = await new Promise((resolve, reject) => {

          // Se llama a la validacion del lote
          validarLoteCallback(movimiento, (error, data) => {

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
        // Se valida la cantidad usando promesas
        const movimientoValido = await validarCantidadPromesa(movimientoCallback);

        // CLASIFICACION LOGICA
        // Solo se procesan productos activos
        if (movimientoValido.activo) {

          // Se agrega al arreglo de validos
          validos.push(movimientoValido);

          // Se inicializa el inventario del producto si no existe
          if (!inventarioFinal[movimientoValido.idProducto]) {
            inventarioFinal[movimientoValido.idProducto] = {
              nombreProducto: movimientoValido.nombreProducto,
              cantidad: 0
            };
          }

          // Se suma o resta cantidad segun tipo de movimiento
          if (movimientoValido.tipoMovimiento === "entrada") {

            // Si es entrada, se suma al inventario
            inventarioFinal[movimientoValido.idProducto].cantidad = 
              inventarioFinal[movimientoValido.idProducto].cantidad + movimientoValido.cantidad;

          } else if (movimientoValido.tipoMovimiento === "salida") {

            // Si es salida, se resta del inventario
            inventarioFinal[movimientoValido.idProducto].cantidad = 
              inventarioFinal[movimientoValido.idProducto].cantidad - movimientoValido.cantidad;

          } else {

            // Si el tipo de movimiento no es valido, se rechaza
            rechazados.push({
              movimiento: movimientoValido,
              motivo: "Tipo de movimiento invalido"
            });
          }

        } else {

          // Si el producto esta inactivo, se rechaza
          rechazados.push({
            movimiento: movimientoValido,
            motivo: "Producto inactivo"
          });
        }

      } catch (errorInterno) {

        // Si falla un movimiento, se almacena como rechazado
        rechazados.push({
          movimiento: movimiento,
          motivo: errorInterno.message
        });
      }
    }

    // DETECCION DE INVENTARIO NEGATIVO
    // Se filtran productos con cantidad negativa
    const inventarioNegativo = [];
    
    // Se recorren los productos del inventario
    const productosIds = Object.keys(inventarioFinal);
    for (let i = 0; i < productosIds.length; i++) {
      const id = productosIds[i];
      const info = inventarioFinal[id];
      
      // Si la cantidad es negativa, se agrega al arreglo
      if (info.cantidad < 0) {
        inventarioNegativo.push({
          idProducto: id,
          nombreProducto: info.nombreProducto,
          cantidad: info.cantidad
        });
      }
    }

    // Se retorna un objeto con todos los resultados
    return {
      validos: validos,
      rechazados: rechazados,
      inventarioFinal: inventarioFinal,
      inventarioNegativo: inventarioNegativo
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna de forma controlada
    return {
      estado: "ERROR",
      mensaje: errorGeneral.message
    };
  }
}