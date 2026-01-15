// EJERCICIO 11
// SISTEMA DE CONTROL DE ACCESOS

// CALLBACK → Validación básica
function validarRegistroCallback(registro, callback) {
  setTimeout(() => {
    if (
      typeof registro.id !== "number" || registro.id <= 0 ||
      typeof registro.nombre !== "string" || registro.nombre.trim() === "" ||
      typeof registro.rol !== "string" ||
      typeof registro.activo !== "boolean" ||
      typeof registro.intentosPrevios !== "number" || registro.intentosPrevios < 0 ||
      typeof registro.nivelAccesoSolicitado !== "number"
    ) {
      callback(new Error("Datos básicos inválidos"), null);
    } else {
      callback(null, registro);
    }
  }, 300);
}

// PROMESA → Validación de nivel de acceso
function validarNivelAccesoPromesa(registro) {
  return new Promise((resolve, reject) => {
    if (registro.nivelAccesoSolicitado < 1 || registro.nivelAccesoSolicitado > 5) {
      reject(new Error("Nivel de acceso fuera de rango (1 a 5)"));
    } else {
      resolve(registro);
    }
  });
}

// LÓGICA DE DECISIÓN
function determinarEstado(registro) {
  if (!registro.activo) {
    return { estado: "DENEGADO", motivo: "Usuario inactivo" };
  }

  if (registro.intentosPrevios >= 3) {
    return { estado: "BLOQUEADO", motivo: "Demasiados intentos fallidos" };
  }

  if (registro.rol === "admin" && registro.nivelAccesoSolicitado >= 4) {
    return { estado: "APROBADO", motivo: "Acceso administrativo concedido" };
  }

  if (registro.rol === "tecnico" && registro.nivelAccesoSolicitado >= 3) {
    return { estado: "APROBADO", motivo: "Acceso técnico concedido" };
  }

  if (registro.rol === "usuario" && registro.nivelAccesoSolicitado <= 2) {
    return { estado: "APROBADO", motivo: "Acceso básico concedido" };
  }

  return { estado: "DENEGADO", motivo: "Nivel de acceso insuficiente" };
}

// FUNCIÓN PRINCIPAL ASYNC
export async function procesarSolicitudesEj11(registros) {
  const resultados = [];
  const errores = [];

  for (const registro of registros) {
    try {
      const validado = await new Promise((resolve, reject) => {
        validarRegistroCallback(registro, (error, data) => {
          error ? reject(error) : resolve(data);
        });
      });

      const accesoValido = await validarNivelAccesoPromesa(validado);

      const decision = determinarEstado(accesoValido);

      resultados.push({
        ...accesoValido,
        estado: decision.estado,
        motivo: decision.motivo
      });

    } catch (error) {
      errores.push({
        id: registro.id ?? "SIN ID",
        mensaje: error.message
      });
    }
  }

  return {
    resultados,
    errores,
    estadoSistema:
      errores.length === 0
        ? "Sistema procesado correctamente"
        : "Sistema procesado con errores"
  };
}
