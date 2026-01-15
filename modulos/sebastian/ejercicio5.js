
// EJERCICIO 5 - SISTEMA DE ANÁLISIS Y VALIDACIÓN POR LOTES

/**
 * Procesa un arreglo de operaciones de forma asincrónica
 * @param {Array} operaciones
 * @returns {Array} reporte final
 */
export async function procesarTransaccionesEj5(operaciones) {

  // Arreglo donde se almacenan los resultados finales
  const reporte = [];

  // Ciclo for para permitir uso correcto de await
  for (let i = 0; i < operaciones.length; i++) {
    try {
      // Se clona la operación para garantizar inmutabilidad
      const operacionCopia = { ...operaciones[i] };

      // Procesamiento asincrónico
      const resultado = await validarOperacionAsync(operacionCopia);

      // Se almacena el resultado
      reporte.push(resultado);

    } catch (error) {
      // Manejo de error sin detener el flujo
      reporte.push({
        id: operaciones[i]?.id ?? "SIN ID",
        estado: "RECHAZADA",
        motivo: error.message
      });
    }
  }

  return reporte;
}

/**
 * Valida y procesa una operación simulando tiempo variable
 * @param {Object} operacion
 * @returns {Promise<Object>}
 */
function validarOperacionAsync(operacion) {
  return new Promise((resolve) => {

    // Tiempo de procesamiento variable
    const tiempo = Math.floor(Math.random() * 2000) + 500;

    setTimeout(() => {
      try {
        // Validación inicial
        validarDatos(operacion);

        // Cálculo intermedio
        const resultado = calcularOperacion(operacion);

        // Validación del resultado
        if (resultado <= 0) {
          throw new Error("Resultado inválido: debe ser mayor a cero");
        }

        // Operación aprobada
        resolve({
          id: operacion.id,
          estado: "APROBADA",
          motivo: `Operación válida. Resultado: ${resultado}`
        });

      } catch (error) {
        // Operación rechazada
        resolve({
          id: operacion.id,
          estado: "RECHAZADA",
          motivo: error.message
        });
      }
    }, tiempo);
  });
}

/**
 * Valida coherencia y tipos de datos
 * @param {Object} operacion
 */
function validarDatos(operacion) {

  if (operacion.id === undefined) {
    throw new Error("La operación no tiene identificador");
  }

  if (operacion.activo !== true) {
    throw new Error("La operación está desactivada");
  }

  if (!Array.isArray(operacion.valores) || operacion.valores.length === 0) {
    throw new Error("El arreglo de valores es inválido o está vacío");
  }

  for (let valor of operacion.valores) {
    if (typeof valor !== "number") {
      throw new Error("Existen valores no numéricos en la operación");
    }
  }

  const tiposValidos = ["suma", "promedio", "multiplicacion"];
  if (!tiposValidos.includes(operacion.tipo)) {
    throw new Error("Tipo de operación no reconocido");
  }
}

/**
 * Realiza el cálculo matemático
 * @param {Object} operacion
 * @returns {number}
 */
function calcularOperacion(operacion) {

  let resultado = 0;

  if (operacion.tipo === "suma") {
    for (let valor of operacion.valores) {
      resultado += valor;
    }
  }

  if (operacion.tipo === "promedio") {
    let suma = 0;
    for (let valor of operacion.valores) {
      suma += valor;
    }
    resultado = suma / operacion.valores.length;
  }

  if (operacion.tipo === "multiplicacion") {
    resultado = 1;
    for (let valor of operacion.valores) {
      resultado *= valor;
    }
  }

  return resultado;
}
