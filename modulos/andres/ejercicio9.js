// SISTEMA DE GESTIÓN Y VALIDACIÓN DE ÓRDENES DE SERVICIO
// Este archivo contiene la lógica completa del Ejercicio 9 (ejercicio 3 de Andrés)


// FUNCIÓN CALLBACK (NO SE EXPORTA)
// Definimos esta función para simular una validación externa del cliente, recibiendo el objeto
// 'orden' y una función 'callback' que gestiona la asincronía bajo el patrón Error-First Callback.
function validarClienteCallback(orden, callback) {

  // Utilizamos setTimeout para simular una operación asincrónica con latencia controlada,
  // representando una consulta externa como la verificación de un cliente en un CRM real.
  setTimeout(() => {

    // Aplicamos 'typeof' para verificar que el cliente sea una cadena de texto y usamos
    // '.trim()' para descartar entradas vacías o compuestas solo por espacios en blanco.
    if (typeof orden.cliente !== "string" || orden.cliente.trim() === "") {

      // Si la validación falla, ejecutamos el callback con un nuevo objeto Error como primer
      // argumento y 'null' como dato, siguiendo el estándar Error-First Callback.
      callback(new Error("El cliente no es valido"), null);

    } else {

      // Si el cliente cumple los criterios, ejecutamos el callback con 'null' en el error
      // y la orden completa como segundo argumento, indicando que la validación fue exitosa.
      callback(null, orden);
    }

  }, 200); // Definimos un retardo de 200 ms para simular la latencia de una consulta externa.
}


// PROMESA ASINCRÓNICA (NO SE EXPORTA)
// Definimos esta función para encapsular la validación de servicio, horas y pago en una Promesa,
// permitiendo consumirla con 'await' en la función principal de manera legible y estructurada.
function validarServicioPromesa(orden) {

  // Retornamos una instancia de Promise que expone los métodos resolve (éxito) y reject (fallo),
  // proporcionando una interfaz moderna para gestionar el resultado de la validación.
  return new Promise((resolve, reject) => {

    // Definimos un arreglo literal con los únicos valores permitidos para 'tipoServicio',
    // aplicando el principio de lista blanca (whitelist) para controlar los tipos de operación válidos.
    const servicios = ["mantenimiento", "instalacion", "soporte"];

    // Empleamos el método '.includes()' para verificar si el tipo de servicio ingresado
    // existe dentro de la lista de valores permitidos, rechazando cualquier valor fuera de ella.
    if (!servicios.includes(orden.tipoServicio)) {
      reject(new Error("Tipo de servicio no permitido"));
      return;
    }

    // Verificamos que las horas sean de tipo 'number' y mayores a cero, ya que valores
    // negativos o nulos no representan una duración válida para una orden de servicio real.
    if (typeof orden.horas !== "number" || orden.horas <= 0) {
      reject(new Error("Horas invalidas"));
      return;
    }

    // Aplicamos la verificación estricta de tipo booleano para el campo 'pagado',
    // descartando valores como el string "si" o el número 1, que no representan un booleano real.
    if (typeof orden.pagado !== "boolean") {
      reject(new Error("El campo pagado debe ser booleano"));
      return;
    }

    // Si todas las reglas de validación son superadas, resolvemos la promesa devolviendo
    // la orden completa para continuar con la fase de cálculo en la función principal.
    resolve(orden);
  });
}


// FUNCIÓN PURA DE CÁLCULO (NO SE EXPORTA)
// Definimos esta función como pura porque recibe parámetros, opera sobre ellos y retorna un
// resultado sin modificar ninguna variable externa ni producir efectos secundarios observables.
function calcularCosto(tipo, horas) {

  // Definimos un objeto literal como tabla de tarifas, centralizando la configuración
  // de precios por hora para cada tipo de servicio en un único punto de mantenimiento.
  const tarifas = {
    mantenimiento: 40000,
    instalacion: 60000,
    soporte: 30000
  };

  // Retornamos el producto de la tarifa por hora y la cantidad de horas trabajadas,
  // aplicando el operador de multiplicación para obtener el costo total de la orden.
  return tarifas[tipo] * horas;
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT (SE EXPORTA)
// Declaramos esta función con 'export' y 'async' para hacerla accesible desde el menú general
// y para coordinar el flujo asincrónico de validación, cálculo y clasificación de órdenes.
export async function procesarOrdenesEj9(ordenes) {

  // Inicializamos un arreglo mutable para almacenar las órdenes que superaron todas
  // las validaciones y cuyo costo fue calculado correctamente por la función pura.
  const procesadas = [];

  // Inicializamos un arreglo paralelo para registrar las órdenes que fallaron en alguna
  // fase del proceso, conservando su ID y el mensaje de error específico generado.
  const errores = [];

  try {

    // Usamos 'Array.isArray()' para verificar que la entrada sea efectivamente un arreglo;
    // si no lo es, lanzamos un error general que interrumpe el inicio del procesamiento.
    if (!Array.isArray(ordenes)) {
      throw new Error("Las ordenes deben ser un arreglo");
    }

    // Implementamos un ciclo 'for' clásico para recorrer el arreglo de forma secuencial,
    // procesando cada orden de manera individual con su propio bloque try/catch interno.
    for (let i = 0; i < ordenes.length; i++) {

      // Extraemos la orden actual mediante su índice para trabajar sobre ella
      // sin afectar la estructura del arreglo mientras se itera sobre él.
      const orden = ordenes[i];

      try {

        // FASE 1: VALIDACIÓN DEL ID
        // Empleamos 'Number.isInteger()' para verificar que el ID sea un entero puro,
        // descartando valores como 4.5, NaN o strings que no representan un identificador válido.
        if (!Number.isInteger(orden.id) || orden.id <= 0) {
          throw new Error("ID invalido");
        }

        // FASE 2: VALIDACIÓN CON CALLBACK (Promisificación)
        // Envolvemos la función de callback en una Promesa de forma manual, técnica conocida
        // como "promisificación", para integrarla al flujo moderno de async/await.
        const clienteValido = await new Promise((resolve, reject) => {

          // Invocamos la función de validación del cliente; si el callback retorna un error,
          // llamamos a 'reject' para propagar el fallo y ser capturado por el 'catch' interno.
          validarClienteCallback(orden, (error, data) => {

            // Evaluamos el primer argumento del callback siguiendo el patrón Error-First:
            // si existe error se rechaza la promesa; de lo contrario se resuelve con los datos.
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          });
        });

        // FASE 3: VALIDACIÓN CON PROMESA
        // Consumimos directamente la promesa de validación de servicio mediante 'await',
        // pausando la ejecución y obteniendo la orden validada o propagando el rechazo al catch.
        const ordenValida = await validarServicioPromesa(clienteValido);

        // FASE 4: CÁLCULO DEL COSTO MEDIANTE FUNCIÓN PURA
        // Invocamos la función de cálculo pasando el tipo de servicio y las horas como argumentos;
        // al ser una función pura, el resultado es siempre predecible y sin efectos secundarios.
        const costo = calcularCosto(ordenValida.tipoServicio, ordenValida.horas);

        // Construimos un nuevo objeto de resultado con los datos relevantes de la orden procesada
        // y lo añadimos al arreglo de procesadas, respetando la inmutabilidad del objeto original.
        procesadas.push({
          id: ordenValida.id,
          cliente: ordenValida.cliente,
          servicio: ordenValida.tipoServicio,
          horas: ordenValida.horas,
          pagado: ordenValida.pagado,
          costoTotal: costo
        });

      } catch (errorInterno) {

        // Capturamos los errores individuales de cada orden para registrarlos en el arreglo
        // de errores, garantizando que el fallo de una orden no detenga el procesamiento completo.
        errores.push({
          id: orden.id,
          mensaje: errorInterno.message
        });
      }
    }

    // Retornamos un objeto compuesto con los resultados clasificados y el estado del proceso,
    // permitiendo al menú mostrar tanto las órdenes exitosas como los errores de forma organizada.
    return {
      procesadas: procesadas,
      errores: errores,
      estado: "PROCESO COMPLETADO"
    };

  } catch (errorGeneral) {

    // Capturamos errores críticos que impidan el inicio del procesamiento global
    // y retornamos un objeto de error controlado sin interrumpir la ejecución del sistema.
    return {
      estado: "ERROR",
      mensaje: errorGeneral.message
    };
  }
}