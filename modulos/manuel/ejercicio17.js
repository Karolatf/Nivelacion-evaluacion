// EJERCICIO 17
// Sistema de Análisis y Validación de Transacciones Bancarias
// Este módulo se encarga de cargar, validar, clasificar y analizar transacciones
// sin asumir que los datos son correctos y sin bloquear la ejecución del sistema.

// ---------------- FUNCIONES AUXILIARES ----------------

// Callback para validar autorización
// Se usa callback para cumplir el requisito de validación externa simulada
function validarAutorizacion(transaccion, callback) {
  setTimeout(() => {
    if (transaccion.autorizado !== true) {
      callback("Transacción no autorizada");
    } else {
      callback(null);
    }
  }, 300);
}

// Función tradicional para validar datos básicos
function validarDatos(transaccion) {
  if (typeof transaccion.id !== "number") {
    return "ID inválido";
  }

  if (typeof transaccion.cliente !== "string" || transaccion.cliente.trim() === "") {
    return "Cliente inválido";
  }

  if (
    transaccion.tipo !== "deposito" &&
    transaccion.tipo !== "retiro" &&
    transaccion.tipo !== "transferencia"
  ) {
    return "Tipo de transacción inválido";
  }

  if (typeof transaccion.monto !== "number" || transaccion.monto <= 0) {
    return "Monto inválido";
  }

  if (typeof transaccion.autorizado !== "boolean") {
    return "Campo autorizado inválido o faltante";
  }

  return null;
}

// Promesa que simula la carga de datos desde una fuente externa
function cargarTransacciones(datos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!Array.isArray(datos)) {
        reject(new Error("Los datos recibidos no son un arreglo"));
      } else {
        resolve([...datos]); // se respeta la inmutabilidad
      }
    }, 500);
  });
}

// ---------------- FUNCIÓN PRINCIPAL ----------------

export async function procesarTransaccionesEj17(transacciones) {
  try {
    // Carga asincrónica de las transacciones
    const datos = await cargarTransacciones(transacciones);

    let transaccionesValidas = [];
    let transaccionesRechazadas = [];

    let totalDepositos = 0;
    let totalRetiros = 0;

    // Recorrido usando ciclo for
    for (let i = 0; i < datos.length; i++) {
      const transaccion = datos[i];

      // Validación básica
      const errorValidacion = validarDatos(transaccion);
      if (errorValidacion) {
        transaccionesRechazadas.push({
          id: transaccion.id ?? null,
          motivo: errorValidacion
        });
        continue;
      }

      // Validación con callback (autorización)
      const errorAutorizacion = await new Promise(resolve => {
        validarAutorizacion(transaccion, error => {
          resolve(error);
        });
      });

      if (errorAutorizacion) {
        transaccionesRechazadas.push({
          id: transaccion.id,
          motivo: errorAutorizacion
        });
        continue;
      }

      // Clasificación y acumulación de montos
      if (transaccion.tipo === "deposito") {
        totalDepositos += transaccion.monto;
      }

      if (transaccion.tipo === "retiro") {
        totalRetiros += transaccion.monto;
      }

      transaccionesValidas.push({
        ...transaccion
      });
    }

    // Resultado final estructurado
    return {
      mensaje: "Análisis finalizado correctamente",
      totalProcesadas: datos.length,
      validas: transaccionesValidas.length,
      rechazadas: transaccionesRechazadas.length,
      totalDepositos,
      totalRetiros,
      transaccionesValidas,
      transaccionesRechazadas
    };

  } catch (error) {
    // Error crítico controlado
    return {
      mensaje: "Error crítico durante el análisis",
      error: error.message
    };
  }
}
