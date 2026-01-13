// ------- IMPORTACIONES -------
import PromptSync from "prompt-sync";
const prompt = PromptSync();

import {
  procesarSolicitud,
  procesarSolicitudEj2,
  procesarSolicitudEj3
} from "./modulos/barril.js";

// ----- MENÚ GENERAL ------
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
      case 1:
        await menuCarpeta("karol");
        break;
      case 2:
        await menuCarpeta("sebastian");
        break;
      case 3:
        await menuCarpeta("andres");
        break;
      case 4:
        await menuCarpeta("isabella");
        break;
      case 5:
        await menuCarpeta("jhon");
        break;
      case 6:
        await menuCarpeta("manuel");
        break;  
      case 7:
        await menuCarpeta("wilmer");
        break;
      case 8:
        await menuCarpeta("paulo");
        break;
      case 9:
        console.log("\nSaliendo del sistema...");
        break;
      default:
        console.log("\nOpción inválida");
    }
  } while (opcion !== 4);
}

// --- SUBMENÚ DE CARPETA ---
async function menuCarpeta(nombreCarpeta) {
  let opcion;
  do {
    console.log(`\n--- ${nombreCarpeta} - Seleccione Ejercicio ---`);
    console.log("1. Ejercicio 1 - Validación de Solicitudes (por lotes)");
    console.log("2. Ejercicio 2 - Gestión y Validación de Operaciones");
    console.log("3. Ejercicio 3 - Gestión de Accesos al Sistema");
    console.log("4. Regresar al Menú Principal\n");

    opcion = parseInt(prompt("Seleccione una opción: "));

    switch (opcion) {
      case 1:
        await ejecutarEjercicio1();
        break;
      case 2:
        console.log("\nEjecutando Ejercicio 2...\n");
        await ejecutarSistemaEj2(); // Lógica delegada
        break;
      case 3:
        await ejecutarEjercicio3();
        break;
      case 4:
        console.log("\nRegresando al menú principal...");
        break;
      default:
        console.log("\nOpción inválida");
    }
  } while (opcion !== 4);
}

// ---- FUNCIONES DE EJERCICIOS ----
async function ejecutarEjercicio1() {
  let solicitudes = [];
  let cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\n--- Solicitud ${i + 1} ---`);
    let id = parseInt(prompt("ID numérico: "));
    let nombre = prompt("Nombre del solicitante: ");
    let tipo = prompt("Tipo de solicitud: ");
    let prioridad = parseInt(prompt("Prioridad (1 a 5): "));

    let estadoTexto = prompt("Estado inicial (true o false): ");
    let estado = estadoTexto === "true";

    let cantidadReq = parseInt(prompt("Cantidad de requisitos: "));
    let requisitos = [];
    for (let j = 0; j < cantidadReq; j++) {
      let valor = prompt(`Requisito ${j + 1} cumplido (true o false): `);
      requisitos.push(valor === "true");
    }

    solicitudes.push({ id, nombre, tipo, prioridad, estado, requisitos });
  }

  console.log("\nRESULTADOS DEL PROCESAMIENTO\n");
  for (const solicitud of solicitudes) {
    const resultado = await procesarSolicitud(solicitud);
    console.log(resultado);
  }
}

async function ejecutarEjercicio3() {
  console.log("\n--- Nueva Solicitud de Acceso ---");

  const solicitud = {
    id: parseInt(prompt("ID de la solicitud: ")),
    nombre: prompt("Nombre del solicitante: "),
    edad: parseInt(prompt("Edad: ")),
    rol: prompt("Rol solicitado (admin / usuario): "),
    permisos: prompt(
      "Permisos (separados por coma, ej: crear,editar): "
    ).split(",").map(p => p.trim()),
    estado: prompt("Estado de la solicitud: "),
    aceptaCondiciones: prompt("¿Acepta condiciones? (true ofalse): ") === "true"
  };

  const resultado = await procesarSolicitudEj3(solicitud);

  console.log("\nRESULTADO DEL PROCESAMIENTO");
  console.log(resultado);
}

// --- EJECUCIÓN ---
menuGeneral();
