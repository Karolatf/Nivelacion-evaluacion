// EJERCICIO 14 - Sistema de Análisis y Validación de Transacciones Bancarias
// Este módulo se encarga de cargar, validar, clasificar y analizar transacciones bancarias
// utilizando programación asincrónica, callbacks y manejo controlado de errores.


// -------------------------------
// Simulación de carga asincrónica
// -------------------------------
const cargarTransacciones = (transacciones) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!Array.isArray(transacciones)) {
        reject(new Error("Los datos de entrada deben ser un arreglo de transacciones"));
      } else {
        resolve([...transacciones]); // se devuelve copia (inmutabilidad)
      }
    }, 500);
  });
};


// -------------------------------
// Validación con callback
// -------------------------------
const validarAutorizacion = (transaccion, callback) => {
  if (transaccion.autorizado !== true) {
    callback("Transacción no autorizada");
  } else {
    callback(null);
  }
};


// -------------------------------
// Validación principal
// -------------------------------
const validarTransaccion = (transaccion, callback) => {
  if (typeof transaccion.id !== "number") {
    return "ID inválido";
  }

  if (typeof transaccion.cliente !== "string" || transaccion.cliente.trim() === "") {
    return "Cliente inválido";
  }

  if (!["deposito", "retiro", "transferencia"].includes(transaccion.tipo)) {
    return "Tipo de transacción inválido";
  }

  if (typeof transaccion.monto !== "number" || transaccion.monto <= 0) {
    return "Monto inválido";
  }

  let errorAutorizacion = null;
  validarAutorizacion(transaccion, (error) => {
    if (error) errorAutorizacion = error;
  });

  if (errorAutorizacion) {
    return errorAutorizacion;
  }

  return null;
};


// -------------------------------
// Proceso principal
// -------------------------------
export const procesarTransaccionesEj14 = async (transacciones) => {
  try {
    const datos = await cargarTransacciones(transacciones);

    let totalDepositos = 0;
    let totalRetiros = 0;
    let validas = 0;
    let rechazadas = 0;

    const motivosRechazo = [];

    for (let i = 0; i < datos.length; i++) {
      const transaccion = datos[i];
      const error = validarTransaccion(transaccion);

      if (error) {
        rechazadas++;
        motivosRechazo.push({
          id: transaccion.id ?? null,
          motivo: error
        });
        continue;
      }

      validas++;

      if (transaccion.tipo === "deposito") {
        totalDepositos += transaccion.monto;
      }

      if (transaccion.tipo === "retiro") {
        totalRetiros += transaccion.monto;
      }
    }

    // Resultado final
    return {
      estado: "ANÁLISIS COMPLETADO",
      totalProcesadas: datos.length,
      transaccionesValidas: validas,
      transaccionesRechazadas: rechazadas,
      totalDepositos,
      totalRetiros,
      motivosRechazo
    };

  } catch (error) {
    return {
      estado: "ERROR",
      mensaje: error.message
    };
  }
};
