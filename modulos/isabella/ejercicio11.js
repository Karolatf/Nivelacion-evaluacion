// EJERCICIO 11 - SISTEMA DE CONTROL DE ACCESOS
// Este archivo contiene TODA la lógica del ejercicio


// FUNCIÓN CALLBACK (NO SE EXPORTA)
// Valida los datos básicos del registro
function validarRegistroCallback(registro, callback) {

  // setTimeout simula un proceso asincrónico
  setTimeout(() => {

    // Se valida que el ID sea un número positivo
    if (typeof registro.id !== "number" || registro.id <= 0) {
      callback(new Error("Datos básicos inválidos"), null);
      return;
    }

    // Se valida que el nombre sea un string no vacío
    if (typeof registro.nombre !== "string" || registro.nombre.trim() === "") {
      callback(new Error("Datos básicos inválidos"), null);
      return;
    }

    // Se valida que el rol sea un string
    if (typeof registro.rol !== "string") {
      callback(new Error("Datos básicos inválidos"), null);
      return;
    }

    // Se valida que activo sea booleano
    if (typeof registro.activo !== "boolean") {
      callback(new Error("Datos básicos inválidos"), null);
      return;
    }

    // Se valida que intentosPrevios sea un número mayor o igual a 0
    if (typeof registro.intentosPrevios !== "number" || registro.intentosPrevios < 0) {
      callback(new Error("Datos básicos inválidos"), null);
      return;
    }

    // Se valida que nivelAccesoSolicitado sea numérico
    if (typeof registro.nivelAccesoSolicitado !== "number") {
      callback(new Error("Datos básicos inválidos"), null);
      return;
    }

    // Si todas las validaciones son correctas
    // se retorna el registro sin modificar
    callback(null, registro);

  }, 300); // Retardo artificial para simular asincronía
}


// FUNCIÓN CON PROMESA (NO SE EXPORTA)
// Valida que el nivel de acceso esté en rango
function validarNivelAccesoPromesa(registro) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // Se valida que el nivel de acceso esté entre 1 y 5
    if (registro.nivelAccesoSolicitado < 1 || registro.nivelAccesoSolicitado > 5) {

      // Si está fuera de rango, se rechaza la promesa
      reject(new Error("Nivel de acceso fuera de rango (1 a 5)"));

    } else {

      // Si está en rango, se resuelve la promesa
      resolve(registro);
    }
  });
}


// FUNCIÓN DE DECISIÓN (NO SE EXPORTA)
// Determina el estado final del registro según reglas de negocio
function determinarEstado(registro) {

  // Se deniega si el usuario está inactivo
  if (!registro.activo) {
    return { estado: "DENEGADO", motivo: "Usuario inactivo" };
  }

  // Se bloquea si hay 3 o más intentos previos fallidos
  if (registro.intentosPrevios >= 3) {
    return { estado: "BLOQUEADO", motivo: "Demasiados intentos fallidos" };
  }

  // Se aprueba si es admin y solicita nivel 4 o 5
  if (registro.rol === "admin" && registro.nivelAccesoSolicitado >= 4) {
    return { estado: "APROBADO", motivo: "Acceso administrativo concedido" };
  }

  // Se aprueba si es técnico y solicita nivel 3 o más
  if (registro.rol === "tecnico" && registro.nivelAccesoSolicitado >= 3) {
    return { estado: "APROBADO", motivo: "Acceso técnico concedido" };
  }

  // Se aprueba si es usuario y solicita nivel 1 o 2
  if (registro.rol === "usuario" && registro.nivelAccesoSolicitado <= 2) {
    return { estado: "APROBADO", motivo: "Acceso básico concedido" };
  }

  // En cualquier otro caso, se deniega
  return { estado: "DENEGADO", motivo: "Nivel de acceso insuficiente" };
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// ESTA FUNCIÓN SÍ SE EXPORTA
// Es la única función visible para el menú general
export async function procesarSolicitudesEj11(registros) {

  // Arreglo para almacenar registros procesados correctamente
  const resultados = [];

  // Arreglo para almacenar registros con errores
  const errores = [];

  // Se recorre el arreglo usando un ciclo for...of
  for (const registro of registros) {

    try {

      // VALIDACIÓN CON CALLBACK
      // Se envuelve la función callback dentro de una promesa
      const validado = await new Promise((resolve, reject) => {

        // Se llama a la validación básica
        validarRegistroCallback(registro, (error, data) => {

          // Si hay error se rechaza la promesa, si no se resuelve
          error ? reject(error) : resolve(data);
        });
      });

      // VALIDACIÓN CON PROMESA
      // Se valida el nivel de acceso usando promesas
      const accesoValido = await validarNivelAccesoPromesa(validado);

      // Se determina el estado final del registro
      const decision = determinarEstado(accesoValido);

      // Se crea un nuevo objeto con el estado y motivo determinados
      // Se garantiza inmutabilidad usando spread operator
      resultados.push({
        ...accesoValido,
        estado: decision.estado,
        motivo: decision.motivo
      });

    } catch (error) {

      // Si falla un registro
      // se almacena el error sin detener el sistema
      errores.push({
        id: registro.id ?? "SIN ID",
        mensaje: error.message
      });
    }
  }

  // Se determina el estado general del sistema
  const estadoSistema = errores.length === 0
    ? "Sistema procesado correctamente"
    : "Sistema procesado con errores";

  // RESULTADO FINAL
  // Se retorna un objeto con todos los resultados
  return {
    resultados: resultados,
    errores: errores,
    estadoSistema: estadoSistema
  };
}