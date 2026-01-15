// EJERCICIO 8: SISTEMA DE ANÁLISIS Y CONTROL DE INVENTARIO POR LOTES
// Contiene toda la lógica de procesamiento del inventario

// FUNCIÓN CALLBACK (NO SE EXPORTA)
// Simula la validación externa de un lote
// Recibe un movimiento y un callback, valida lote y estado
function validarLoteCallback(movimiento, callback) {
  setTimeout(() => {
    try {
      // Validación del lote
      if (typeof movimiento.lote !== "string" || movimiento.lote.trim() === "") {
        throw new Error("Lote inválido");
      }

      // Validación del estado activo
      if (typeof movimiento.activo !== "boolean") {
        throw new Error("Producto inactivo o dato de estado incorrecto");
      }

      // Si pasa validaciones, retorna el movimiento
      callback(null, movimiento);

    } catch (error) {
      // Si ocurre error, lo retorna en callback
      callback(error, null);
    }
  }, 300); // Simula demora de validación externa
}


// FUNCIÓN CON PROMESA (NO SE EXPORTA)
// Valida que la cantidad sea un número mayor a cero
function validarCantidadPromesa(movimiento) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof movimiento.cantidad !== "number" || movimiento.cantidad <= 0) {
        reject(new Error("Cantidad inválida"));
      } else {
        resolve(movimiento);
      }
    }, 300); // Simula validación asincrónica
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// ESTA FUNCIÓN SÍ SE EXPORTA
// Procesa todos los movimientos de inventario
export async function procesarInventarioEj8(movimientos) {
  // Arreglo de movimientos válidos
  const validos = [];

  // Arreglo de movimientos rechazados
  const rechazados = [];

  // Objeto que almacenará el inventario final por producto
  const inventarioFinal = {};

  try {
    // Validar que la entrada sea un arreglo
    if (!Array.isArray(movimientos)) {
      throw new Error("Los movimientos deben ser un arreglo");
    }

    // Copiar los datos para garantizar inmutabilidad
    const copiaMovimientos = [...movimientos];

    // Recorrer todos los movimientos
    for (let i = 0; i < copiaMovimientos.length; i++) {
      const movimiento = copiaMovimientos[i];

      try {
        // -- VALIDACIÓN CON CALLBACK --
        const movimientoCallback = await new Promise((resolve, reject) => {
          validarLoteCallback(movimiento, (error, data) => {
            if (error) reject(error);
            else resolve(data);
          });
        });

        // -- VALIDACIÓN CON PROMESA --
        const movimientoValido = await validarCantidadPromesa(movimientoCallback);

        // - CLASIFICACIÓN LÓGICA -
        // Solo procesamos productos activos
        if (movimientoValido.activo) {
          validos.push(movimientoValido);

          // Inicializar inventario si no existe
          if (!inventarioFinal[movimientoValido.idProducto]) {
            inventarioFinal[movimientoValido.idProducto] = {
              nombreProducto: movimientoValido.nombreProducto,
              cantidad: 0
            };
          }

          // Sumar o restar cantidad según tipo de movimiento
          if (movimientoValido.tipoMovimiento === "entrada") {
            inventarioFinal[movimientoValido.idProducto].cantidad += movimientoValido.cantidad;
          } else if (movimientoValido.tipoMovimiento === "salida") {
            inventarioFinal[movimientoValido.idProducto].cantidad -= movimientoValido.cantidad;
          } else {
            // Si tipoMovimiento no es válido
            rechazados.push({
              movimiento: movimientoValido,
              motivo: "Tipo de movimiento inválido"
            });
          }

        } else {
          // Producto inactivo
          rechazados.push({
            movimiento: movimientoValido,
            motivo: "Producto inactivo"
          });
        }

      } catch (errorInterno) {
        // Registrar movimientos inválidos sin detener el sistema
        rechazados.push({
          movimiento: movimiento,
          motivo: errorInterno.message
        });
      }
    }

    // -- DETECTAR INVENTARIO NEGATIVO 
    const inventarioNegativo = Object.entries(inventarioFinal)
      .filter(([id, info]) => info.cantidad < 0)
      .map(([id, info]) => ({ 
        idProducto: id, 
        nombreProducto: info.nombreProducto, 
        cantidad: info.cantidad 
      }));

    // -- RETORNAR RESULTADOS --
    return {
      validos,
      rechazados,
      inventarioFinal,
      inventarioNegativo
    };

  } catch (errorGeneral) {
    // Error crítico: devuelve mensaje para el usuario
    return {
      estado: "ERROR",
      mensaje: errorGeneral.message
    };
  }
}
