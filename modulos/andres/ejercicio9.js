// EJERCICIO 9 - PROCESAMIENTO DE ÓRDENES

function validarClienteCallback(orden, callback) {
  setTimeout(() => {
    if (typeof orden.cliente !== "string" || orden.cliente.trim() === "") {
      callback(new Error("El cliente no es válido"), null);
    } else {
      callback(null, orden);
    }
  }, 200);
}

function validarServicioPromesa(orden) {
  return new Promise((resolve, reject) => {
    const servicios = ["mantenimiento", "instalacion", "soporte"];

    if (!servicios.includes(orden.tipoServicio)) {
      reject(new Error("Tipo de servicio no permitido"));
      return;
    }

    if (typeof orden.horas !== "number" || orden.horas <= 0) {
      reject(new Error("Horas inválidas"));
      return;
    }

    if (typeof orden.pagado !== "boolean") {
      reject(new Error("El campo pagado debe ser booleano"));
      return;
    }

    resolve(orden);
  });
}

function calcularCosto(tipo, horas) {
  const tarifas = {
    mantenimiento: 40000,
    instalacion: 60000,
    soporte: 30000
  };
  return tarifas[tipo] * horas;
}

export async function procesarOrdenesEj9(ordenes) {
  const procesadas = [];
  const errores = [];

  for (const orden of ordenes) {
    try {
      if (!Number.isInteger(orden.id) || orden.id <= 0) {
        throw new Error("ID inválido");
      }

      const clienteValido = await new Promise((resolve, reject) => {
        validarClienteCallback(orden, (err, data) =>
          err ? reject(err) : resolve(data)
        );
      });

      const ordenValida = await validarServicioPromesa(clienteValido);
      const costo = calcularCosto(
        ordenValida.tipoServicio,
        ordenValida.horas
      );

      procesadas.push({
        id: ordenValida.id,
        cliente: ordenValida.cliente,
        servicio: ordenValida.tipoServicio,
        horas: ordenValida.horas,
        pagado: ordenValida.pagado,
        costoTotal: costo
      });

    } catch (error) {
      errores.push({
        id: orden.id,
        mensaje: error.message
      });
    }
  }

  return {
    procesadas,
    errores,
    estado: "PROCESO COMPLETADO"
  };
}
