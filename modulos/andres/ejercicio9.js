// EJERCICIO 9 - SISTEMA DE GESTIÓN Y VALIDACIÓN DE ÓRDENES DE SERVICIO
// Este archivo contiene TODA la lógica del ejercicio


// FUNCIÓN CALLBACK (NO SE EXPORTA)
// Valida que el cliente sea un string válido
function validarClienteCallback(orden, callback) {

  // setTimeout simula un proceso asincrónico
  setTimeout(() => {

    // Se valida que el cliente sea un string no vacío
    if (typeof orden.cliente !== "string" || orden.cliente.trim() === "") {

      // Si el cliente no es válido, se retorna un error
      callback(new Error("El cliente no es válido"), null);

    } else {

      // Si el cliente es correcto, se retorna la orden
      callback(null, orden);
    }

  }, 200); // Retardo artificial para simular asincronía
}


// FUNCIÓN CON PROMESA (NO SE EXPORTA)
// Valida el tipo de servicio, horas y estado de pago
function validarServicioPromesa(orden) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // Se define un arreglo con los tipos de servicio permitidos
    const servicios = ["mantenimiento", "instalacion", "soporte"];

    // Se valida que el tipo de servicio esté en la lista
    if (!servicios.includes(orden.tipoServicio)) {
      reject(new Error("Tipo de servicio no permitido"));
      return;
    }

    // Se valida que las horas sean un número mayor a cero
    if (typeof orden.horas !== "number" || orden.horas <= 0) {
      reject(new Error("Horas inválidas"));
      return;
    }

    // Se valida que el campo pagado sea booleano
    if (typeof orden.pagado !== "boolean") {
      reject(new Error("El campo pagado debe ser booleano"));
      return;
    }

    // Si todas las validaciones son correctas, se resuelve la promesa
    resolve(orden);
  });
}


// FUNCIÓN DE CÁLCULO (NO SE EXPORTA)
// Calcula el costo total según el tipo de servicio y las horas
function calcularCosto(tipo, horas) {

  // Se define un objeto con las tarifas por hora de cada servicio
  const tarifas = {
    mantenimiento: 40000,
    instalacion: 60000,
    soporte: 30000
  };

  // Se retorna el costo total (tarifa por hora * cantidad de horas)
  return tarifas[tipo] * horas;
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// ESTA FUNCIÓN SÍ SE EXPORTA
// Es la única función visible para el menú general
export async function procesarOrdenesEj9(ordenes) {

  // Arreglo para almacenar órdenes procesadas correctamente
  const procesadas = [];

  // Arreglo para almacenar órdenes con errores
  const errores = [];

  // Se recorre el arreglo usando un ciclo for...of
  for (const orden of ordenes) {

    try {

      // VALIDACIÓN DEL ID
      // Se valida que el ID sea un número entero positivo
      if (!Number.isInteger(orden.id) || orden.id <= 0) {
        throw new Error("ID inválido");
      }

      // VALIDACIÓN CON CALLBACK
      // Se envuelve la función callback dentro de una promesa
      const clienteValido = await new Promise((resolve, reject) => {

        // Se llama a la validación del cliente
        validarClienteCallback(orden, (err, data) =>

          // Si hay error se rechaza la promesa, si no se resuelve
          err ? reject(err) : resolve(data)
        );
      });

      // VALIDACIÓN CON PROMESA
      // Se valida el servicio usando promesas
      const ordenValida = await validarServicioPromesa(clienteValido);

      // CÁLCULO DEL COSTO
      // Se calcula el costo total de la orden
      const costo = calcularCosto(
        ordenValida.tipoServicio,
        ordenValida.horas
      );

      // Se agrega la orden procesada al arreglo
      procesadas.push({
        id: ordenValida.id,
        cliente: ordenValida.cliente,
        servicio: ordenValida.tipoServicio,
        horas: ordenValida.horas,
        pagado: ordenValida.pagado,
        costoTotal: costo
      });

    } catch (error) {

      // Si falla una orden
      // se almacena el error sin detener el sistema
      errores.push({
        id: orden.id,
        mensaje: error.message
      });
    }
  }

  // RESULTADO FINAL
  // Se retorna un objeto con todos los resultados
  return {
    procesadas: procesadas,
    errores: errores,
    estado: "PROCESO COMPLETADO"
  };
}