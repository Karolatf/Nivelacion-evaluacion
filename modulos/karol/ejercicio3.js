// EJERCICIO 3: SISTEMA DE GESTIÓN Y VALIDACIÓN DE SOLICITUDES DE ACCESO
// Este módulo centraliza la lógica de integridad, coherencia y validación externa asincrónica.

// FUNCIÓN CALLBACK (Validación de Reglas Básicas)
// JUSTIFICACIÓN: Creada para verificar la integridad inicial del solicitante. 
// RECIBE: Objeto 'solicitud' y función 'callback'. RETORNA: Ejecución del callback con booleano y mensaje.
function validarBasico(solicitud, callback) {

  // Validamos la consistencia matemática de la edad: debe ser un número real y cumplir la mayoría de edad (18+).
  if (typeof solicitud.edad !== "number" || isNaN(solicitud.edad) || solicitud.edad < 18) {
    callback(false, "Edad inválida o menor de edad");
    return;
  }

  // Verificación de cumplimiento legal: validamos que el indicador booleano de condiciones sea estrictamente 'true'.
  if (solicitud.aceptaCondiciones !== true) {
    callback(false, "No aceptó las condiciones del sistema");
    return;
  }

  // Validación de estructura: comprobamos que los permisos sean un arreglo y que contengan al menos un elemento.
  if (!Array.isArray(solicitud.permisos) || solicitud.permisos.length === 0) {
    callback(false, "No se solicitaron permisos");
    return;
  }

  // Si se superan todos los filtros, el callback retorna éxito para continuar con el flujo asincrónico.
  callback(true, "Validación básica exitosa");
}


// FUNCIÓN PURA (Análisis de Coherencia Rol-Permiso)
// JUSTIFICACIÓN: Creada para validar reglas de seguridad que dependen de la relación entre dos datos.
// RECIBE: String 'rol' y Array 'permisos'. RETORNA: Booleano (Consistencia).
function validarRolPermisos(rol, permisos) {

  // Aplicamos una regla de negocio de seguridad: los usuarios de rol básico tienen prohibido el permiso 'eliminar'.
  // Esto demuestra la relación entre varios campos de la solicitud según pide la guía.
  if (rol === "usuario" && permisos.includes("eliminar")) {
    return false; // Inconsistencia detectada
  }

  return true; // Coherencia confirmada
}


// PROMESA ASINCRÓNICA (Simulación de Validación Externa)
// JUSTIFICACIÓN: Creada para emular una consulta de antecedentes o servicios externos que pueden fallar.
// RECIBE: Nada. RETORNA: Una Promesa (resolve/reject).
function validacionExterna() {

  return new Promise((resolve, reject) => {
    // Simulamos un tiempo de latencia de 1000ms para representar una operación de E/S externa.
    setTimeout(() => {
      // Implementamos una lógica de éxito aleatoria para demostrar el manejo de rechazos de promesas.
      const exito = Math.random() > 0.3;

      if (exito) {
        resolve("Validación externa aprobada");
      } else {
        // El rechazo de la promesa disparará el estado de 'REVISIÓN' en la función principal.
        reject("Error en validación externa");
      }
    }, 1000);
  });
}


// FUNCIÓN PRINCIPAL ASYNC / AWAIT
// JUSTIFICACIÓN: Función exportada que coordina el flujo secuencial, garantizando la inmutabilidad de los datos.
// RECIBE: Array 'solicitudes'. RETORNA: Array 'resultados'.
export async function procesarSolicitudEj3(solicitudes) {

  // Mantenemos la inmutabilidad creando un nuevo arreglo para los resultados en lugar de modificar las solicitudes.
  const resultados = [];

  // Procesamos el lote de solicitudes de forma secuencial mediante un ciclo 'for' con control asincrónico.
  for (let i = 0; i < solicitudes.length; i++) {
    
    const solicitud = solicitudes[i];

    try {
      
      // PASO 1: PROMIFICACIÓN DE CALLBACK
      // Convertimos el callback en una promesa para integrarlo al flujo moderno de 'async/await'.
      await new Promise((resolve, reject) => {
        validarBasico(solicitud, (esValida, mensaje) => {
          if (!esValida) reject(new Error(mensaje));
          else resolve(true);
        });
      });

      // PASO 2: VALIDACIÓN DE COHERENCIA Y CONSISTENCIA
      // Verificamos si la relación entre el rol y los permisos es válida.
      if (!validarRolPermisos(solicitud.rol, solicitud.permisos)) {
        resultados.push({
          id: solicitud.id,
          estado: "RECHAZADA",
          motivo: "Rol no compatible con permisos"
        });
        continue; // Saltamos a la siguiente solicitud sin bloquear el programa.
      }

      // PASO 3: GESTIÓN DE VALIDACIÓN EXTERNA CON TRY/CATCH ANIDADO
      try {
        // Esperamos la resolución de la promesa externa.
        await validacionExterna();

        // Si la validación externa y interna son correctas, la solicitud es APROBADA.
        resultados.push({
          id: solicitud.id,
          estado: "APROBADA",
          mensaje: "Acceso concedido"
        });

      } catch (error) {
        // De acuerdo a la guía, si el proceso externo falla pero los datos son correctos, queda EN REVISIÓN.
        resultados.push({
          id: solicitud.id,
          estado: "EN REVISIÓN",
          motivo: error
        });
      }

    } catch (error) {
      // GESTIÓN DE ERRORES POR DATOS INVÁLIDOS O MAL TIPADOS
      // Capturamos cualquier excepción lanzada por la validación básica o el callback.
      resultados.push({
        id: solicitud?.id ?? null,
        estado: "ERROR",
        mensaje: error.message
      });
    }
  }

  // Retornamos el conjunto final de veredictos manteniendo la transparencia de la decisión.
  return resultados;
}