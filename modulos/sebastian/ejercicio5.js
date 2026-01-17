// SISTEMA DE ANALISIS Y VALIDACION POR LOTES
// Este archivo contiene la logica completa del Ejercicio 5 


// FUNCION DE VALIDACION CON CALLBACK (NO SE EXPORTA)
// Valida los datos basicos de la operacion
function validarDatosCallback(operacion, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    try {

      // Se valida que la operacion tenga identificador
      if (operacion.id === undefined || operacion.id === null) {
        throw new Error("La operacion no tiene identificador");
      }

      // Se valida que la operacion este activa
      if (operacion.activo !== true) {
        throw new Error("La operacion esta desactivada");
      }

      // Se valida que los valores sean un arreglo no vacio
      if (!Array.isArray(operacion.valores) || operacion.valores.length === 0) {
        throw new Error("El arreglo de valores es invalido o esta vacio");
      }

      // Se recorre el arreglo de valores
      for (let i = 0; i < operacion.valores.length; i++) {
        const valor = operacion.valores[i];

        // Se valida que cada valor sea numerico
        if (typeof valor !== "number") {
          throw new Error("Existen valores no numericos en la operacion");
        }
      }

      // Se define un arreglo con los tipos de operacion validos
      const tiposValidos = ["suma", "promedio", "multiplicacion"];

      // Se valida que el tipo de operacion sea uno de los permitidos
      if (!tiposValidos.includes(operacion.tipo)) {
        throw new Error("Tipo de operacion no reconocido");
      }

      // Si todas las validaciones son correctas, se retorna sin error
      callback(null, operacion);

    } catch (error) {

      // Si ocurre cualquier error, se retorna por callback
      callback(error, null);
    }

  }, 200);
}


// FUNCION DE CALCULO (FUNCION PURA)
// Realiza el calculo matematico segun el tipo de operacion
// No modifica el objeto recibido
function calcularOperacion(operacion) {

  // Variable para almacenar el resultado
  let resultado = 0;

  // Si es suma, se suman todos los valores
  if (operacion.tipo === "suma") {
    for (let i = 0; i < operacion.valores.length; i++) {
      resultado = resultado + operacion.valores[i];
    }
  }

  // Si es promedio, se calcula la media aritmetica
  if (operacion.tipo === "promedio") {
    let suma = 0;
    for (let i = 0; i < operacion.valores.length; i++) {
      suma = suma + operacion.valores[i];
    }
    resultado = suma / operacion.valores.length;
  }

  // Si es multiplicacion, se multiplican todos los valores
  if (operacion.tipo === "multiplicacion") {
    resultado = 1;
    for (let i = 0; i < operacion.valores.length; i++) {
      resultado = resultado * operacion.valores[i];
    }
  }

  // Se retorna el resultado del calculo
  return resultado;
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Procesa la operacion validada y retorna el resultado
function procesarOperacionAsync(operacion) {

  // Se retorna una promesa
  return new Promise((resolve) => {

    // Se calcula un tiempo de procesamiento variable entre 500ms y 2500ms
    const tiempo = Math.floor(Math.random() * 2000) + 500;

    // setTimeout simula un proceso asincronico
    setTimeout(() => {

      try {

        // Se calcula el resultado de la operacion
        const resultado = calcularOperacion(operacion);

        // Se valida que el resultado sea mayor a cero
        if (resultado <= 0) {
          throw new Error("Resultado invalido: debe ser mayor a cero");
        }

        // Si todo es correcto, se resuelve la promesa con operacion aprobada
        resolve({
          id: operacion.id,
          estado: "APROBADA",
          motivo: "Operacion valida. Resultado: " + resultado
        });

      } catch (error) {

        // Si ocurre un error, se resuelve la promesa con operacion rechazada
        resolve({
          id: operacion.id,
          estado: "RECHAZADA",
          motivo: error.message
        });
      }

    }, tiempo);
  });
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
export async function procesarTransaccionesEj5(operaciones) {

  // Arreglo donde se almacenan los resultados finales
  const reporte = [];

  try {

    // Se valida que la entrada sea un arreglo
    if (!Array.isArray(operaciones)) {
      throw new Error("Las operaciones deben ser un arreglo");
    }

    // Se recorre el arreglo usando un ciclo for clasico
    for (let i = 0; i < operaciones.length; i++) {

      try {

        // Se clona la operacion para garantizar inmutabilidad
        const operacionCopia = { ...operaciones[i] };

        // VALIDACION CON CALLBACK
        // Se envuelve la funcion callback dentro de una promesa
        const operacionValidada = await new Promise((resolve, reject) => {

          // Se llama a la validacion con callback
          validarDatosCallback(operacionCopia, (error, data) => {

            // Si hay error se rechaza la promesa
            if (error) {
              reject(error);
            } else {
              // Si no hay error se continua
              resolve(data);
            }
          });
        });

        // PROCESAMIENTO CON PROMESA
        // Se procesa la operacion validada
        const resultado = await procesarOperacionAsync(operacionValidada);

        // Se almacena el resultado
        reporte.push(resultado);

      } catch (error) {

        // Si falla una operacion, se registra pero el sistema continua
        reporte.push({
          id: operaciones[i]?.id ?? "SIN ID",
          estado: "RECHAZADA",
          motivo: error.message
        });
      }
    }

    // Se retorna el arreglo completo con todos los resultados
    return reporte;

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna error controlado
    return [{
      id: "SISTEMA",
      estado: "ERROR",
      motivo: errorGeneral.message
    }];
  }
}