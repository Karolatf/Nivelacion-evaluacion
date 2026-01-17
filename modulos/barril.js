// BARRIL DE MÓDULOS
// Este archivo actúa como un barril que centraliza las exportaciones de varios módulos
// Así se importan y exportan funciones desde diferentes archivos para facilitar su uso en otros archivos.

// -------- KAROL --------
import { procesarSolicitud } from "./karol/ejercicio1.js";
import { procesarSolicitudEj2 } from "./karol/ejercicio2.js";
import { procesarSolicitudEj3 } from "./karol/ejercicio3.js";

// -------- SEBASTIAN --------
import { procesarTransaccionesEj4 } from "./sebastian/ejercicio4.js";
import { procesarTransaccionesEj5 } from "./sebastian/ejercicio5.js";
import { procesarSolicitudesServicio } from "./sebastian/ejercicio6.js";

// -------- ANDRES --------
import { procesarTransaccionesEj7 } from "./andres/ejercicio7.js";
import { procesarInventarioEj8 } from "./andres/ejercicio8.js";
import { procesarOrdenesEj9 } from "./andres/ejercicio9.js";

// -------- ISABELLA --------
import { procesarSolicitudesEj10 } from "./isabella/ejercicio10.js";
import { procesarSolicitudesEj11 } from "./isabella/ejercicio11.js";
import { procesarSolicitudesEj12 } from "./isabella/ejercicio12.js";

// -------- JHON --------
import { procesarSolicitudesEj13 } from "./jhon/ejercicio13.js";
import { procesarTransaccionesEj14 } from "./jhon/ejercicio14.js";
import { procesarSolicitudesEj15 } from "./jhon/ejercicio15.js";

// -------- MANUEL --------
import { procesarSolicitudesEj16 } from "./manuel/ejercicio16.js";
import { procesarTransaccionesEj17 } from "./manuel/ejercicio17.js";
import { procesarSolicitudesEj18 } from "./manuel/ejercicio18.js";

// -------- PAULO --------
import { procesarSolicitudesEj19 } from "./paulo/ejercicio19.js";

// EXPORTACIONES
export {
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
  procesarSolicitudesEj12,
  procesarSolicitudesEj13,
  procesarTransaccionesEj14,
  procesarSolicitudesEj15,
  procesarSolicitudesEj16,
  procesarTransaccionesEj17,
  procesarSolicitudesEj18,
  procesarSolicitudesEj19
};
