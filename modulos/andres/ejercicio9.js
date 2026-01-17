// SISTEMA DE GESTION Y VALIDACION DE ORDENES DE SERVICIO
// Este archivo contiene la logica completa del Ejercicio 9 (ejercicio 3 de Andres)


// FUNCION CALLBACK (NO SE EXPORTA)
// Valida que el cliente sea un string valido
function validarClienteCallback(orden, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    // Se valida que el cliente sea un string no vacio
    if (typeof orden.cliente !== "string" || orden.cliente.trim() === "") {

      // Si el cliente no es valido, se retorna un error
      callback(new Error("El cliente no es valido"), null);

    } else {

      // Si el cliente es correcto, se retorna la orden
      callback(null, orden);
    }

  }, 200);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Valida el tipo de servicio, horas y estado de pago
function validarServicioPromesa(orden) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // Se define un arreglo con los tipos de servicio permitidos
    const servicios = ["mantenimiento", "instalacion", "soporte"];

    // Se valida que el tipo de servicio este en la lista
    if (!servicios.includes(orden.tipoServicio)) {
      reject(new Error("Tipo de servicio no permitido"));
      return;
    }

    // Se valida que las horas sean un numero mayor a cero
    if (typeof orden.horas !== "number" || orden.horas <= 0) {
      reject(new Error("Horas invalidas"));
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


// FUNCION DE CALCULO (FUNCION PURA)
// Calcula el costo total segun el tipo de servicio y las horas
// No modifica datos externos
function calcularCosto(tipo, horas) {

  // Se define un objeto con las tarifas por hora de cada servicio
  const tarifas = {
    mantenimiento: 40000,
    instalacion: 60000,
    soporte: 30000
  };

  // Se retorna el costo total
  return tarifas[tipo] * horas;
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
export async function procesarOrdenesEj9(ordenes) {

  // Arreglo para almacenar ordenes procesadas correctamente
  const procesadas = [];

  // Arreglo para almacenar ordenes con errores
  const errores = [];

  try {

    // Se valida que la entrada sea un arreglo
    if (!Array.isArray(ordenes)) {
      throw new Error("Las ordenes deben ser un arreglo");
    }

    // Se recorre el arreglo usando un ciclo for clasico
    for (let i = 0; i < ordenes.length; i++) {

      // Se obtiene la orden actual
      const orden = ordenes[i];

      try {

        // VALIDACION DEL ID
        // Se valida que el ID sea un numero entero positivo
        if (!Number.isInteger(orden.id) || orden.id <= 0) {
          throw new Error("ID invalido");
        }

        // VALIDACION CON CALLBACK
        // Se envuelve la funcion callback dentro de una promesa
        const clienteValido = await new Promise((resolve, reject) => {

          // Se llama a la validacion del cliente
          validarClienteCallback(orden, (error, data) => {

            // Si hay error se rechaza la promesa
            if (error) {
              reject(error);
            } else {
              // Si no hay error se resuelve
              resolve(data);
            }
          });
        });

        // VALIDACION CON PROMESA
        // Se valida el servicio usando promesas
        const ordenValida = await validarServicioPromesa(clienteValido);

        // CALCULO DEL COSTO
        // Se calcula el costo total de la orden
        const costo = calcularCosto(ordenValida.tipoServicio, ordenValida.horas);

        // Se agrega la orden procesada al arreglo
        procesadas.push({
          id: ordenValida.id,
          cliente: ordenValida.cliente,
          servicio: ordenValida.tipoServicio,
          horas: ordenValida.horas,
          pagado: ordenValida.pagado,
          costoTotal: costo
        });

      } catch (errorInterno) {

        // Si falla una orden, se almacena el error
        errores.push({
          id: orden.id,
          mensaje: errorInterno.message
        });
      }
    }

    // Se retorna un objeto con todos los resultados
    return {
      procesadas: procesadas,
      errores: errores,
      estado: "PROCESO COMPLETADO"
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna error controlado
    return {
      estado: "ERROR",
      mensaje: errorGeneral.message
    };
  }
}