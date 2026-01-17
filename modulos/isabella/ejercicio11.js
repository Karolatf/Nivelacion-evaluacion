// SISTEMA DE VALIDACION Y PROCESAMIENTO DE SOLICITUDES DE ACCESO
// Este archivo contiene la logica completa del Ejercicio 11 (ejercicio 2 de Isabella)


// FUNCION CALLBACK (NO SE EXPORTA)
// Valida los datos basicos del registro
function validarRegistroCallback(registro, callback) {

  // setTimeout simula un proceso asincronico
  setTimeout(() => {

    // Se valida que el ID sea un numero positivo
    if (typeof registro.id !== "number" || isNaN(registro.id) || registro.id <= 0) {
      callback(new Error("Datos basicos invalidos"), null);
      return;
    }

    // Se valida que el nombre sea un string no vacio
    if (typeof registro.nombre !== "string" || registro.nombre.trim() === "") {
      callback(new Error("Datos basicos invalidos"), null);
      return;
    }

    // Se valida que el rol sea un string
    if (typeof registro.rol !== "string") {
      callback(new Error("Datos basicos invalidos"), null);
      return;
    }

    // Se valida que activo sea booleano
    if (typeof registro.activo !== "boolean") {
      callback(new Error("Datos basicos invalidos"), null);
      return;
    }

    // Se valida que intentosPrevios sea un numero mayor o igual a 0
    if (typeof registro.intentosPrevios !== "number" || registro.intentosPrevios < 0) {
      callback(new Error("Datos basicos invalidos"), null);
      return;
    }

    // Se valida que nivelAccesoSolicitado sea numerico
    if (typeof registro.nivelAccesoSolicitado !== "number") {
      callback(new Error("Datos basicos invalidos"), null);
      return;
    }

    // Si todas las validaciones son correctas, se retorna el registro
    callback(null, registro);

  }, 300);
}


// PROMESA ASINCRONICA (NO SE EXPORTA)
// Valida que el nivel de acceso este en rango
function validarNivelAccesoPromesa(registro) {

  // Se retorna una promesa
  return new Promise((resolve, reject) => {

    // Se valida que el nivel de acceso este entre 1 y 5
    if (registro.nivelAccesoSolicitado < 1 || registro.nivelAccesoSolicitado > 5) {

      // Si esta fuera de rango, se rechaza la promesa
      reject(new Error("Nivel de acceso fuera de rango (1 a 5)"));

    } else {

      // Si esta en rango, se resuelve la promesa
      resolve(registro);
    }
  });
}


// FUNCION DE DECISION (FUNCION PURA)
// Determina el estado final del registro segun reglas de negocio
// No modifica el objeto recibido
function determinarEstado(registro) {

  // Se deniega si el usuario esta inactivo
  if (!registro.activo) {
    return { estado: "DENEGADO", motivo: "Usuario inactivo" };
  }

  // Se bloquea si hay 3 o mas intentos previos fallidos
  if (registro.intentosPrevios >= 3) {
    return { estado: "BLOQUEADO", motivo: "Demasiados intentos fallidos" };
  }

  // Se aprueba si es admin y solicita nivel 4 o 5
  if (registro.rol === "admin" && registro.nivelAccesoSolicitado >= 4) {
    return { estado: "APROBADO", motivo: "Acceso administrativo concedido" };
  }

  // Se aprueba si es tecnico y solicita nivel 3 o mas
  if (registro.rol === "tecnico" && registro.nivelAccesoSolicitado >= 3) {
    return { estado: "APROBADO", motivo: "Acceso tecnico concedido" };
  }

  // Se aprueba si es usuario y solicita nivel 1 o 2
  if (registro.rol === "usuario" && registro.nivelAccesoSolicitado <= 2) {
    return { estado: "APROBADO", motivo: "Acceso basico concedido" };
  }

  // En cualquier otro caso, se deniega
  return { estado: "DENEGADO", motivo: "Nivel de acceso insuficiente" };
}


// FUNCION PRINCIPAL ASYNC / AWAIT
// ESTA FUNCION SI SE EXPORTA
// Es la unica funcion visible para el menu general
export async function procesarSolicitudesEj11(registros) {

  // Arreglo para almacenar registros procesados correctamente
  const resultados = [];

  // Arreglo para almacenar registros con errores
  const errores = [];

  // Contadores para resumen final
  let totalAprobadas = 0;
  let totalRechazadas = 0;
  let totalBloqueadas = 0;

  try {

    // Se valida que la entrada sea un arreglo
    if (!Array.isArray(registros)) {
      throw new Error("Los registros deben ser un arreglo");
    }

    // Se recorre el arreglo usando un ciclo for clasico
    for (let i = 0; i < registros.length; i++) {

      // Se obtiene el registro actual
      const registro = registros[i];

      try {

        // VALIDACION CON CALLBACK
        // Se envuelve la funcion callback dentro de una promesa
        const validado = await new Promise((resolve, reject) => {

          // Se llama a la validacion basica
          validarRegistroCallback(registro, (error, data) => {

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
        // Se valida el nivel de acceso usando promesas
        const accesoValido = await validarNivelAccesoPromesa(validado);

        // Se determina el estado final del registro
        const decision = determinarEstado(accesoValido);

        // Se crea un nuevo objeto con el estado y motivo determinados
        // Se garantiza inmutabilidad usando spread operator
        const resultado = {
          ...accesoValido,
          estado: decision.estado,
          motivo: decision.motivo
        };

        // Se agrega al arreglo de resultados
        resultados.push(resultado);

        // Se incrementa el contador correspondiente
        if (decision.estado === "APROBADO") {
          totalAprobadas = totalAprobadas + 1;
        } else if (decision.estado === "DENEGADO") {
          totalRechazadas = totalRechazadas + 1;
        } else if (decision.estado === "BLOQUEADO") {
          totalBloqueadas = totalBloqueadas + 1;
        }

      } catch (errorInterno) {

        // Si falla un registro, se almacena el error
        errores.push({
          id: registro.id ?? "SIN ID",
          mensaje: errorInterno.message
        });
      }
    }

    // Se retorna un objeto con todos los resultados y el resumen
    return {
      resultados: resultados,
      errores: errores,
      totalProcesadas: registros.length,
      totalAprobadas: totalAprobadas,
      totalRechazadas: totalRechazadas,
      totalBloqueadas: totalBloqueadas,
      totalErrores: errores.length
    };

  } catch (errorGeneral) {

    // Si ocurre un error critico, se retorna error controlado
    return {
      estado: "ERROR",
      mensaje: errorGeneral.message
    };
  }
}