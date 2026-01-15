// EJERCICIO 8 - SISTEMA DE ANÁLISIS Y CONTROL DE INVENTARIO POR LOTES
// Este archivo contiene TODA la lógica del ejercicio


// FUNCIÓN CALLBACK (NO SE EXPORTA)
// Simula la validación externa de un lote
function validarLoteCallback(movimiento, callback) {

  // setTimeout simula un proceso asincrónico
  setTimeout(() => {

    try {

      // Se valida que el lote sea un string no vacío
      if (typeof movimiento.lote !== "string" || movimiento.lote.trim() === "") {
        throw new Error("Lote inválido");
      }

      // Se valida que el estado activo sea booleano
      if (typeof movimiento.activo !== "boolean") {
        throw new Error("Producto inactivo o dato de estado incorrecto");
      }

      // Si todas las validaciones son correctas
      // se retorna el movimiento sin modificar
      callback(null, movimiento);

    } catch (error) {

      // Si ocurre un error
      // se retorna de forma controlada por callback
      callback(error, null);
    }

  }, 300); // Retardo artificial para simular asincronía
}


// FUNCIÓN CON PROMESA (NO SE EXPORTA)
// Valida que la cantidad sea un número mayor a cero
function validarCantidadPromesa(movimiento) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // setTimeout simula un proceso asincrónico
    setTimeout(() => {

      // Se verifica que la cantidad sea numérica y positiva
      if (typeof movimiento.cantidad !== "number" || movimiento.cantidad <= 0) {

        // Si la cantidad no es válida se rechaza la promesa
        reject(new Error("Cantidad inválida"));

      } else {

        // Si la cantidad es correcta se resuelve la promesa
        resolve(movimiento);
      }

    }, 300);
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// ESTA FUNCIÓN SÍ SE EXPORTA
// Es la única función visible para el menú general
export async function procesarInventarioEj8(movimientos) {

  // Arreglo de movimientos válidos
  const validos = [];

  // Arreglo de movimientos rechazados
  const rechazados = [];

  // Objeto que almacenará el inventario final por producto
  const inventarioFinal = {};

  try {

    // Validación inicial: debe ser un arreglo
    if (!Array.isArray(movimientos)) {
      throw new Error("Los movimientos deben ser un arreglo");
    }

    // Se crea una copia para garantizar inmutabilidad
    const copiaMovimientos = [...movimientos];

    // Se recorre el arreglo usando un ciclo for clásico
    for (let i = 0; i < copiaMovimientos.length; i++) {

      // Se obtiene el movimiento actual
      const movimiento = copiaMovimientos[i];

      try {

        // VALIDACIÓN CON CALLBACK
        // Se envuelve la función callback dentro de una promesa
        const movimientoCallback = await new Promise((resolve, reject) => {

          // Se llama a la validación del lote
          validarLoteCallback(movimiento, (error, data) => {

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
        // Se valida la cantidad usando promesas
        const movimientoValido = await validarCantidadPromesa(movimientoCallback);

        // CLASIFICACIÓN LÓGICA
        // Solo se procesan productos activos
        if (movimientoValido.activo) {

          // Se agrega al arreglo de válidos
          validos.push(movimientoValido);

          // Se inicializa el inventario del producto si no existe
          if (!inventarioFinal[movimientoValido.idProducto]) {
            inventarioFinal[movimientoValido.idProducto] = {
              nombreProducto: movimientoValido.nombreProducto,
              cantidad: 0
            };
          }

          // Se suma o resta cantidad según tipo de movimiento
          if (movimientoValido.tipoMovimiento === "entrada") {

            // Si es entrada, se suma al inventario
            inventarioFinal[movimientoValido.idProducto].cantidad += movimientoValido.cantidad;

          } else if (movimientoValido.tipoMovimiento === "salida") {

            // Si es salida, se resta del inventario
            inventarioFinal[movimientoValido.idProducto].cantidad -= movimientoValido.cantidad;

          } else {

            // Si el tipo de movimiento no es válido, se rechaza
            rechazados.push({
              movimiento: movimientoValido,
              motivo: "Tipo de movimiento inválido"
            });
          }

        } else {

          // Si el producto está inactivo, se rechaza
          rechazados.push({
            movimiento: movimientoValido,
            motivo: "Producto inactivo"
          });
        }

      } catch (errorInterno) {

        // Si falla un movimiento
        // se almacena como rechazado sin detener el sistema
        rechazados.push({
          movimiento: movimiento,
          motivo: errorInterno.message
        });
      }
    }

    // DETECCIÓN DE INVENTARIO NEGATIVO
    // Se filtran productos con cantidad negativa
    const inventarioNegativo = Object.entries(inventarioFinal)
      .filter(([id, info]) => info.cantidad < 0)
      .map(([id, info]) => ({ 
        idProducto: id, 
        nombreProducto: info.nombreProducto, 
        cantidad: info.cantidad 
      }));

    // RESULTADO FINAL
    // Se retorna un objeto con todos los resultados
    return {
      validos: validos,
      rechazados: rechazados,
      inventarioFinal: inventarioFinal,
      inventarioNegativo: inventarioNegativo
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