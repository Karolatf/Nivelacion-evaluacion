// EJERCICIO 3
// Sistema de Gestión y Validación de Solicitudes de Acceso
// Este archivo contiene toda la lógica del ejercicio 3

// VALIDACIÓN BÁSICA (CALLBACK)
// Esta función valida las reglas mínimas de la solicitud
// Recibe la solicitud y un callback para retornar el resultado
function validarBasico(solicitud, callback) {

  // Valida que la edad sea un número válido y mayor de edad
  // Se verifica el tipo, que no sea NaN, y que sea >= 18
  if (typeof solicitud.edad !== "number" || isNaN(solicitud.edad) || solicitud.edad < 18) {
    
    // Si falla, se ejecuta el callback con false y el mensaje de error
    callback(false, "Edad inválida o menor de edad");
    return;
  }

  // Valida que haya aceptado las condiciones del sistema
  // Debe ser exactamente true, no cualquier valor truthy
  if (solicitud.aceptaCondiciones !== true) {
    
    // Si no aceptó, se retorna error mediante el callback
    callback(false, "No aceptó las condiciones del sistema");
    return;
  }

  // Valida que los permisos sean un arreglo no vacío
  // Primero verifica que sea array, luego que tenga elementos
  if (!Array.isArray(solicitud.permisos) || solicitud.permisos.length === 0) {
    
    // Si no hay permisos, se retorna error
    callback(false, "No se solicitaron permisos");
    return;
  }

  // Si todas las validaciones pasaron correctamente
  // Se ejecuta el callback con true indicando éxito
  callback(true, "Validación básica exitosa");
}


// FUNCIÓN PURA
// Valida la coherencia entre el rol y los permisos solicitados
// Esta función NO modifica los datos que recibe
// Solo analiza y retorna true o false
function validarRolPermisos(rol, permisos) {

  // Regla de negocio: un usuario normal no puede tener permiso de eliminar
  // Se verifica si el rol es "usuario" Y si incluye el permiso "eliminar"
  if (rol === "usuario" && permisos.includes("eliminar")) {
    
    // Si se viola la regla, retorna false
    return false;
  }

  // Si no se viola ninguna regla, retorna true
  // La solicitud es coherente con las políticas del sistema
  return true;
}


// PROMESA ASINCRÓNICA
// Simula una validación externa como verificación de antecedentes
// En un sistema real, esto podría ser una consulta a una API externa
function validacionExterna() {

  // Se retorna una promesa para manejar la operación asincrónica
  return new Promise((resolve, reject) => {

    // setTimeout simula el retardo de una consulta externa
    // En producción sería una petición HTTP real
    setTimeout(() => {

      // Se genera un resultado aleatorio para simular aprobaciones y rechazos
      // Math.random() > 0.3 da 70% de probabilidad de éxito
      const exito = Math.random() > 0.3;

      // Si la validación externa es exitosa
      if (exito) {
        
        // Se resuelve la promesa con un mensaje de éxito
        resolve("Validación externa aprobada");
        
      } else {
        
        // Si falla, se rechaza la promesa con un mensaje de error
        reject("Error en validación externa");
      }

    }, 1000);
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// Esta función coordina todo el flujo de validación
// Recibe un ARRAY de solicitudes y retorna un ARRAY de resultados
// ESTA ES LA ÚNICA FUNCIÓN QUE SE EXPORTA
export async function procesarSolicitudEj3(solicitudes) {

  // Se crea un arreglo vacío para guardar los resultados
  // Aquí se irán agregando los resultados de cada solicitud
  const resultados = [];

  // Se recorre el arreglo de solicitudes usando un ciclo for tradicional
  // Esto permite usar await dentro del ciclo
  for (let i = 0; i < solicitudes.length; i++) {
    
    // Se obtiene la solicitud actual del arreglo
    const solicitud = solicitudes[i];

    // BLOQUE TRY - Aquí se ejecutan las validaciones que pueden fallar
    try {
      
      // PASO 1: VALIDACIÓN BÁSICA CON CALLBACK
      // Se envuelve la función callback en una promesa para poder usar await
      // Esto convierte el patrón callback al patrón moderno de promesas
      const resultadoBasico = await new Promise((resolve, reject) => {

        // Se ejecuta la validación con callback pasando la solicitud
        validarBasico(solicitud, (esValida, mensaje) => {

          // Si la validación falla (esValida es false)
          if (!esValida) {
            
            // Se rechaza la promesa con el mensaje de error
            reject(new Error(mensaje));
            
          } else {
            
            // Si la validación es exitosa, se resuelve la promesa
            resolve(true);
          }
        });
      });

      // PASO 2: VALIDACIÓN DE ROL Y PERMISOS
      // Se llama a la función pura para verificar coherencia
      // Si retorna false, el rol no es compatible con los permisos
      if (!validarRolPermisos(solicitud.rol, solicitud.permisos)) {
        
        // Se agrega el resultado de rechazo al arreglo
        resultados.push({
          id: solicitud.id,
          estado: "RECHAZADA",
          motivo: "Rol no compatible con permisos"
        });
        
        // continue salta a la siguiente iteración del ciclo
        // No se procesan más validaciones para esta solicitud
        continue;
      }

      // PASO 3: VALIDACIÓN EXTERNA ASINCRÓNICA
      // Se ejecuta en un try-catch interno para manejar su posible fallo
      try {
        
        // Se espera el resultado de la validación externa
        // Si la promesa se resuelve, la validación fue exitosa
        await validacionExterna();

        // Si llegamos aquí, todas las validaciones pasaron
        // La solicitud es APROBADA
        resultados.push({
          id: solicitud.id,
          estado: "APROBADA",
          mensaje: "Acceso concedido"
        });

      } catch (error) {
        
        // Si la validación externa falla (promesa rechazada)
        // La solicitud queda EN REVISIÓN para análisis manual
        resultados.push({
          id: solicitud.id,
          estado: "EN REVISIÓN",
          motivo: error
        });
      }

    } catch (error) {

      // MANEJO DE ERRORES GENERALES
      // Este catch atrapa errores de validación básica
      // o cualquier error inesperado en el proceso
      
      // Se agrega un resultado de ERROR al arreglo
      // Se usa optional chaining (?.) para evitar errores si solicitud es null
      resultados.push({
        id: solicitud?.id ?? null,
        estado: "ERROR",
        mensaje: error.message
      });
    }
  }

  // Se retorna el arreglo completo de resultados
  // Cada elemento contiene el id y el estado final de su solicitud
  // NO se retorna resumen porque la guía no lo requiere
  return resultados;
}