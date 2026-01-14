// =========================================
// APLICACIÓN PRINCIPAL - app.js
// =========================================

// ------- IMPORTACIONES -------
import PromptSync from "prompt-sync";
const prompt = PromptSync();

import {
  procesarSolicitud,
  procesarSolicitudEj2,
  procesarSolicitudEj3,
  procesarTransaccionesEj4,
  procesarTransaccionesEj5,
  procesarSolicitudesServicio
} from "./modulos/barril.js";


// =========================================
// CONFIGURACIÓN DE MENÚS
// =========================================

// Qué ejercicios tiene cada carpeta
const ejerciciosPorCarpeta = {
  karol: [1, 2, 3],
  sebastian: [4, 5, 6],
  andres: [1, 2, 3],
  isabella: [1, 2, 3],
  jhon: [1, 2, 3],
  manuel: [1, 2, 3],
  wilmer: [1, 2, 3],
  paulo: [1, 2, 3]
};


// =========================================
// MENÚ GENERAL
// =========================================
async function menuGeneral() {
  let opcion;

  do {
    console.log("\n--- MENÚ GENERAL ---");
    console.log("1. karol");
    console.log("2. sebastian");
    console.log("3. andres");
    console.log("4. isabella");
    console.log("5. jhon");
    console.log("6. manuel");
    console.log("7. wilmer");
    console.log("8. paulo");
    console.log("9. Salir\n");

    opcion = parseInt(prompt("Seleccione una opción: "));

    switch (opcion) {
      case 1: await menuCarpeta("karol"); break;
      case 2: await menuCarpeta("sebastian"); break;
      case 3: await menuCarpeta("andres"); break;
      case 4: await menuCarpeta("isabella"); break;
      case 5: await menuCarpeta("jhon"); break;
      case 6: await menuCarpeta("manuel"); break;
      case 7: await menuCarpeta("wilmer"); break;
      case 8: await menuCarpeta("paulo"); break;
      case 9: console.log("\nSaliendo del sistema..."); break;
      default: console.log("Opción inválida");
    }

  } while (opcion !== 9);
}


// =========================================
// SUBMENÚ POR CARPETA
// =========================================
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

      switch (ejercicio) {
        case 1: await ejecutarEjercicio1(); break;
        case 2: await ejecutarEjercicio2(); break;
        case 3: await ejecutarEjercicio3(); break;
        case 4: await ejecutarEjercicio4(); break;
        case 5: await ejecutarEjercicio5(); break;
        case 6: await ejecutarEjercicio6(); break;
        default: console.log("Ejercicio no implementado");
      }
    }

  } while (opcion !== ejercicios.length + 1);
}


// =========================================
// EJERCICIO 1
// =========================================
async function ejecutarEjercicio1() {
  let solicitudes = [];
  let cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\n--- Solicitud ${i + 1} ---`);

    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      nombre: prompt("Nombre: "),
      tipo: prompt("Tipo: "),
      prioridad: parseInt(prompt("Prioridad (1-5): ")),
      estado: prompt("Estado (true/false): ") === "true",
      requisitos: []
    });
  }

  console.log("\nRESULTADOS\n");
  for (const solicitud of solicitudes) {
    const resultado = await procesarSolicitud(solicitud);
    console.log(resultado);
  }
}


// =========================================
// EJERCICIO 2
// =========================================
async function ejecutarEjercicio2() {
  const operacion = {
    id: parseInt(prompt("ID: ")),
    tipo: prompt("Tipo: "),
    monto: parseFloat(prompt("Monto: ")),
    autorizada: prompt("Autorizada (true/false): ") === "true",
    categoria: prompt("Categoría: ")
  };

  const resultado = await procesarSolicitudEj2(operacion);
  console.log(resultado);
}


// =========================================
// EJERCICIO 3
// =========================================
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

  const resultado = await procesarSolicitudEj3(solicitud);
  console.log(resultado);
}


// =========================================
// EJERCICIO 4
// =========================================
async function ejecutarEjercicio4() {
  let transacciones = [];
  let cantidad = parseInt(prompt("¿Cuántas transacciones? "));

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

  const resultado = await procesarTransaccionesEj4(transacciones);
  console.log(resultado);
}


// =========================================
// EJERCICIO 5
// =========================================
async function ejecutarEjercicio5() {
  let operaciones = [];
  let cantidad = parseInt(prompt("¿Cuántas operaciones? "));

  for (let i = 0; i < cantidad; i++) {
    operaciones.push({
      id: prompt("ID: "),
      valores: prompt("Valores (coma): ").split(",").map(Number),
      tipo: prompt("Tipo: "),
      activo: prompt("Activo (true/false): ") === "true"
    });
  }

  const resultado = await procesarTransaccionesEj5(operaciones);
  resultado.forEach(r => console.log(r));
}


// =========================================
// EJERCICIO 6
// =========================================
async function ejecutarEjercicio6() {
  let solicitudes = [];
  let cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

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

  const resultado = await procesarSolicitudesServicio(solicitudes);
  console.log(resultado);
}


// =========================================
// EJECUCIÓN
// =========================================
menuGeneral();
