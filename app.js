// Archivo PRINCIPAL - app.js

// ------- IMPORTACIONES -------
import PromptSync from "prompt-sync";
const prompt = PromptSync();             //La importación de prompt-sync/libreria para entradas por consola


// Importación desde el barril de módulos de las funciones necesarias
import {
  procesarSolicitud,
  procesarSolicitudEj2,
  procesarSolicitudEj3,
  procesarTransaccionesEj4,
  procesarTransaccionesEj5,
  procesarSolicitudesServicio,
  procesarTransaccionesEj7,
  procesarInventarioEj8,
  procesarOrdenesEj9,
  procesarSolicitudesEj10,
  procesarSolicitudesEj11,
  procesarSolicitudesEj12   
} from "./modulos/barril.js";

// CONFIGURACIÓN DE MENÚS
const ejerciciosPorCarpeta = {
  karol: [1, 2, 3],
  sebastian: [4, 5, 6],
  andres: [7, 8, 9],
  isabella: [10, 11, 12]
};

// MAPEO DE FUNCIONES POR EJERCICIO
const funcionesEjercicio = {
  1: ejecutarEjercicio1,
  2: ejecutarEjercicio2,
  3: ejecutarEjercicio3,
  4: ejecutarEjercicio4,
  5: ejecutarEjercicio5,
  6: ejecutarEjercicio6,
  7: ejecutarEjercicio7,
  8: ejecutarEjercicio8,
  9: ejecutarEjercicio9,
  10: ejecutarEjercicio10,
  11: ejecutarEjercicio11,
  12: ejecutarEjercicio12  
};



// MENÚ GENERAL
async function menuGeneral() {
  let opcion;
  const carpetas = Object.keys(ejerciciosPorCarpeta);

  do {
    console.log("\n--- MENÚ GENERAL ---");
    carpetas.forEach((carpeta, index) => {
      console.log(`${index + 1}. ${carpeta.toUpperCase()}`);
    });
    console.log(`${carpetas.length + 1}. Salir\n`);

    opcion = parseInt(prompt("Seleccione una opción: "));

    if (opcion >= 1 && opcion <= carpetas.length) {
      await menuCarpeta(carpetas[opcion - 1]);
    } else if (opcion === carpetas.length + 1) {
      console.log("\nSaliendo del sistema...");
    } else {
      console.log("Opción inválida");
    }

  } while (opcion !== carpetas.length + 1);
}

// SUBMENÚ POR CARPETA
async function menuCarpeta(nombreCarpeta) {
  const ejercicios = ejerciciosPorCarpeta[nombreCarpeta];
  let opcion;

  do {
    console.log(`\n--- ${nombreCarpeta.toUpperCase()} ---`);
    ejercicios.forEach((ej, index) => {
      console.log(`${index + 1}. Ejercicio ${ej}`);
    });
    console.log(`${ejercicios.length + 1}. Regresar\n`);

    opcion = parseInt(prompt("Seleccione una opción: "));

    if (opcion >= 1 && opcion <= ejercicios.length) {
      const ejercicio = ejercicios[opcion - 1];
      const funcion = funcionesEjercicio[ejercicio];
      if (funcion) await funcion();
      else console.log(`Ejercicio ${ejercicio} no implementado`);
    } else if (opcion !== ejercicios.length + 1) {
      console.log("Opción inválida");
    }

  } while (opcion !== ejercicios.length + 1);
}


// EJERCICIOS
async function ejecutarEjercicio1() {
  let solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      nombre: prompt("Nombre: "),
      tipo: prompt("Tipo: "),
      prioridad: parseInt(prompt("Prioridad (1-5): ")),
      estado: prompt("Estado (true/false): ") === "true",
      requisitos: []
    });
  }

  for (const solicitud of solicitudes) {
    console.log(await procesarSolicitud(solicitud));
  }
}

async function ejecutarEjercicio2() {
  const operacion = {
    id: parseInt(prompt("ID: ")),
    tipo: prompt("Tipo: "),
    monto: parseFloat(prompt("Monto: ")),
    autorizada: prompt("Autorizada (true/false): ") === "true",
    categoria: prompt("Categoría: ")
  };

  console.log(await procesarSolicitudEj2(operacion));
}

async function ejecutarEjercicio3() {
  const solicitud = {
    id: parseInt(prompt("ID: ")),
    nombre: prompt("Nombre: "),
    edad: parseInt(prompt("Edad: ")),
    rol: prompt("Rol: "),
    permisos: prompt("Permisos (coma): ").split(","),
    estado: prompt("Estado: "),
    aceptaCondiciones: prompt("Acepta condiciones (true/false): ") === "true"
  };

  console.log(await procesarSolicitudEj3(solicitud));
}

async function ejecutarEjercicio4() {
  const transacciones = [];
  const cantidad = parseInt(prompt("¿Cuántas transacciones? "));

  for (let i = 0; i < cantidad; i++) {
    transacciones.push({
      id: parseInt(prompt("ID: ")),
      usuario: prompt("Usuario: "),
      monto: parseFloat(prompt("Monto: ")),
      tipo: prompt("Tipo: "),
      autorizada: prompt("Autorizada (true/false): ") === "true",
      fecha: prompt("Fecha: ")
    });
  }

  console.log(await procesarTransaccionesEj4(transacciones));
}

async function ejecutarEjercicio5() {
  const operaciones = [];
  const cantidad = parseInt(prompt("¿Cuántas operaciones? "));

  for (let i = 0; i < cantidad; i++) {
    operaciones.push({
      id: prompt("ID: "),
      valores: prompt("Valores (coma): ").split(",").map(Number),
      tipo: prompt("Tipo: "),
      activo: prompt("Activo (true/false): ") === "true"
    });
  }

  (await procesarTransaccionesEj5(operaciones)).forEach(r => console.log(r));
}

async function ejecutarEjercicio6() {
  const solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

  for (let i = 0; i < cantidad; i++) {
    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      cliente: prompt("Cliente: "),
      tipoServicio: prompt("Tipo de servicio: "),
      prioridad: parseInt(prompt("Prioridad (1-5): ")),
      activo: prompt("Activa (true/false): ") === "true",
      fechaSolicitud: prompt("Fecha: ")
    });
  }

  console.log(await procesarSolicitudesServicio(solicitudes));
}

async function ejecutarEjercicio7() {
  const transacciones = [];
  const cantidad = parseInt(prompt("¿Cuántas transacciones? "));

  for (let i = 0; i < cantidad; i++) {
    transacciones.push({
      idUsuario: parseInt(prompt("ID Usuario: ")),
      tipo: prompt("Tipo (ingreso/egreso): "),
      monto: parseFloat(prompt("Monto: ")),
      categoria: prompt("Categoría: "),
      fecha: prompt("Fecha: ")
    });
  }

  console.log(await procesarTransaccionesEj7(transacciones));
}

async function ejecutarEjercicio8() {
  const movimientos = [];
  const cantidad = parseInt(prompt("¿Cuántos movimientos? "));

  for (let i = 0; i < cantidad; i++) {
    movimientos.push({
      idProducto: parseInt(prompt("ID Producto: ")),
      nombreProducto: prompt("Nombre Producto: "),
      tipoMovimiento: prompt("Tipo Movimiento: "),
      cantidad: parseFloat(prompt("Cantidad: ")),
      lote: prompt("Lote: "),
      activo: prompt("Activo (true/false): ") === "true"
    });
  }

  console.log(await procesarInventarioEj8(movimientos));
}

async function ejecutarEjercicio9() {
  const ordenes = [];
  const cantidad = parseInt(prompt("¿Cuántas órdenes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    ordenes.push({
      id: parseInt(prompt("ID: ")),
      cliente: prompt("Cliente: "),
      tipoServicio: prompt("Tipo de servicio: "),
      horas: parseFloat(prompt("Horas: ")),
      pagado: prompt("Pagado (true/false): ") === "true"
    });
  }

  const resultado = await procesarOrdenesEj9(ordenes);

  console.log("\nÓRDENES PROCESADAS\n");

  resultado.procesadas.forEach(o => {
    console.log(`Orden ${o.id}`);
    console.log(`Cliente: ${o.cliente}`);
    console.log(`Servicio: ${o.servicio}`);
    console.log(`Costo: $${o.costoTotal}`);
    console.log("------------------");
  });

  if (resultado.errores.length > 0) {
    console.log("\nÓRDENES CON ERROR\n");
    resultado.errores.forEach(e => {
      console.log(`Orden ${e.id}: ${e.mensaje}`);
    });
  }
}

async function ejecutarEjercicio10() {
  const solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar?: "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\n--- Solicitud ${i + 1} ---`);

    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      area: prompt("Área (infraestructura/desarrollo/administración): "),
      nivelUrgencia: parseInt(prompt("Nivel de urgencia (1 a 5): ")),
      descripcion: prompt("Descripción: "),
      reportadoPorSistema: prompt("¿Reportado por sistema? (true/false): ") === "true",
      intentosPrevios: parseInt(prompt("Intentos previos: "))
    });
  }

  console.log("\n PROCESANDO SOLICITUDES...\n");

  try {
    const respuesta = await procesarSolicitudesEj10(solicitudes);

    respuesta.resultados.forEach(s => {
      console.log(`Solicitud ${s.id}`);
      console.log(`Área: ${s.area}`);
      console.log(`Urgencia: ${s.nivelUrgencia}`);
      console.log(`Estado final: ${s.estado}`);
      console.log("-----------------------------");
    });

    if (respuesta.errores.length > 0) {
      console.log("\n ERRORES DETECTADOS\n");
      respuesta.errores.forEach(e => {
        console.log(`Solicitud ${e.id}: ${e.mensaje}`);
      });
    }

  } catch (error) {
    console.log("Error crítico del sistema:", error.message);
  }
}
async function ejecutarEjercicio11() {
  console.log("\n--- EJERCICIO 11 ---");

  const registros = [];
  const cantidad = parseInt(prompt("¿Cuántos registros desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\nRegistro ${i + 1}`);

    registros.push({
      id: parseInt(prompt("ID: ")),
      nombre: prompt("Nombre: "),
      rol: prompt("Rol (admin/tecnico/usuario): "),
      activo: prompt("Activo (true/false): ") === "true",
      intentosPrevios: parseInt(prompt("Intentos previos: ")),
      nivelAccesoSolicitado: parseInt(prompt("Nivel de acceso solicitado: "))
    });
  }

  console.log("\nPROCESANDO SOLICITUDES...\n");

  const resultado = await procesarSolicitudesEj11(registros);

  if (resultado.resultados.length > 0) {
    console.log("\nSOLICITUDES PROCESADAS\n");
    resultado.resultados.forEach(r => {
      console.log(`ID: ${r.id}`);
      console.log(`Estado: ${r.estado}`);
      console.log(`Motivo: ${r.motivo}`);
      console.log("------------------");
    });
  }

  if (resultado.errores.length > 0) {
    console.log("\nERRORES DETECTADOS\n");
    resultado.errores.forEach(e => {
      console.log(`ID ${e.id}: ${e.mensaje}`);
    });
  }

  console.log(`\n${resultado.estadoSistema}`);
}

async function ejecutarEjercicio12() {
  console.log("\n--- EJERCICIO 12 ---");

  const solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\nSolicitud ${i + 1}`);

    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      usuario: prompt("Usuario: "),
      tipo: prompt("Tipo (software/hardware): "),
      prioridad: parseInt(prompt("Prioridad (1-5): ")),
      descripcion: prompt("Descripción: "),
      estado: "pendiente"
    });
  }

  console.log("\nPROCESANDO SOLICITUDES...\n");

  try {
    const resultado = await procesarSolicitudesEj12(solicitudes);

    if (resultado.resultados.length > 0) {
      resultado.resultados.forEach(r => {
        console.log(`✔ Solicitud ${r.id} procesada correctamente`);
        console.log(`Usuario: ${r.usuario}`);
        console.log(`Tipo: ${r.tipo}`);
        console.log(`Clasificación: ${r.clasificacion}`);
        console.log(`Estado final: ${r.estado}`);
        console.log("-----------------------------");
      });
    }

    if (resultado.errores.length > 0) {
      console.log("\nERRORES DETECTADOS\n");
      resultado.errores.forEach(e => {
        console.log(`✖ Solicitud ${e.id}: ${e.mensaje}`);
      });
    }

    console.log(`\n${resultado.estadoSistema}`);

  } catch (error) {
    console.log("Error crítico del sistema:", error.message);
  }
}

// EJECUCIÓN
menuGeneral();

