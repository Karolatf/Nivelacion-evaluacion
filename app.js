// Archivo PRINCIPAL - app.js
// Donde se hace captura de datos (interfaz/menú)(captura los datos del usuario)

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
  procesarSolicitudesEj12,
  procesarSolicitudesEj13,
  procesarTransaccionesEj14,
  procesarSolicitudesEj15,
  procesarSolicitudesEj16,
  procesarTransaccionesEj17,
  procesarSolicitudesEj18,
  procesarSolicitudesEj19,
  procesarSolicitudesEj20,
  procesarSolicitudesEj21,
  procesarSolicitudesEj22,
  procesarSolicitudesEj23,
  procesarSolicitudesEj24
     
} from "./modulos/barril.js";

// CONFIGURACIÓN DE MENÚS
const ejerciciosPorCarpeta = {
  karol: [1, 2, 3],
  sebastian: [4, 5, 6],
  andres: [7, 8, 9],
  isabella: [10, 11, 12],
  jhon: [13, 14, 15],
  manuel: [16, 17, 18], 
  paulo: [19, 20, 21],
  wilmer: [22, 23, 24]    
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
  12: ejecutarEjercicio12,
  13: ejecutarEjercicio13,
  14: ejecutarEjercicio14,
  15: ejecutarEjercicio15,
  16: ejecutarEjercicio16,
  17: ejecutarEjercicio17,
  18: ejecutarEjercicio18,
  19: ejecutarEjercicio19,
  20: ejecutarEjercicio20,
  21: ejecutarEjercicio21,
  22: ejecutarEjercicio22,
  23: ejecutarEjercicio23,
  24: ejecutarEjercicio24     
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


// EJERCICIOS                                                                                        //EJERCICIO 1
async function ejecutarEjercicio1() {
  let solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const nombre = prompt("Nombre: ");
    const tipo = prompt("Tipo: ");
    const prioridad = parseInt(prompt("Prioridad (1-5): "));
    
    // Se captura el estado como texto
    const estadoTexto = prompt("Estado (true/false): ");
    
    // Se convierte a booleano solo si es true o false
    let estado;
    if (estadoTexto === "true") {
      estado = true;
    } else if (estadoTexto === "false") {
      estado = false;
    } else {
      estado = estadoTexto;
    }
    
    // Se capturan los requisitos
    const cantidadRequisitos = parseInt(prompt("Cuantos requisitos: "));
    const requisitos = [];
    
    // Se recorre para pedir cada requisito
    for (let j = 0; j < cantidadRequisitos; j++) {
      const requisito = prompt("Requisito " + (j + 1) + " (true/false): ") === "true";
      requisitos.push(requisito);
    }
    
    // Se agrega la solicitud completa
    solicitudes.push({
      id: id,
      nombre: nombre,
      tipo: tipo,
      prioridad: prioridad,
      estado: estado,
      requisitos: requisitos
    });
  }

  for (const solicitud of solicitudes) {
    console.log(await procesarSolicitud(solicitud));
  }
}

async function ejecutarEjercicio2() {                                                   //EJERCICIO 2
  const solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  // Captura múltiples solicitudes
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const tipo = prompt("Tipo: ");
    const valor = parseFloat(prompt("Valor: "));
    
    // Se captura el estado como texto
    const estadoTexto = prompt("Estado (true/false): ");
    
    // Se convierte a booleano solo si es true o false
    let estado;
    if (estadoTexto === "true") {
      estado = true;
    } else if (estadoTexto === "false") {
      estado = false;
    } else {
      estado = estadoTexto;
    }
    
    const prioridad = parseInt(prompt("Prioridad (1-5): "));
    
    // Se agrega la solicitud completa
    solicitudes.push({
      id: id,
      tipo: tipo,
      valor: valor,
      estado: estado,
      prioridad: prioridad
    });
  }

  // Se envía el ARRAY completo a la función
  const respuesta = await procesarSolicitudEj2(solicitudes);
  
  // Se muestran los resultados individuales
  console.log("\n--- RESULTADOS ---\n");
  respuesta.resultados.forEach(resultado => {
    console.log(resultado);
  });
  
  // Se muestra el resumen final (REQUERIDO POR LA GUÍA)
  console.log("\n--- RESUMEN FINAL ---");
  console.log("Total procesadas: " + respuesta.resumen.total);
  console.log("Aprobadas: " + respuesta.resumen.aprobadas);
  console.log("Rechazadas: " + respuesta.resumen.rechazadas);
  console.log("Inválidas: " + respuesta.resumen.invalidas);
  console.log("Errores: " + respuesta.resumen.errores);
  console.log("");
}

async function ejecutarEjercicio3() {                                                     //EJERCICIO 3
  
  // Se crea un arreglo vacío para almacenar todas las solicitudes
  const solicitudes = [];
  
  // Se pregunta cuántas solicitudes se van a ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  // Se usa un ciclo for para capturar múltiples solicitudes
  // El ciclo se ejecuta tantas veces como solicitudes se pidieron
  for (let i = 0; i < cantidad; i++) {
    
    // CAPTURA DE DATOS BÁSICOS
    // Se captura el ID como número entero
    const id = parseInt(prompt("ID: "));
    
    // Se captura el nombre como texto
    const nombre = prompt("Nombre: ");
    
    // Se captura la edad y se convierte a número
    // parseInt convierte el texto del prompt a número
    const edad = parseInt(prompt("Edad: "));
    
    // Se captura el rol como texto
    const rol = prompt("Rol: ");
    
    // CAPTURA Y PROCESAMIENTO DE PERMISOS
    // Los permisos se ingresan como texto separado por comas
    const permisosTexto = prompt("Permisos (separados por coma): ");
    
    // Se declara la variable permisos
    let permisos;
    
    // Si el usuario no ingresó nada o solo espacios
    if (permisosTexto.trim() === "") {
      
      // Se asigna un arreglo vacío
      // Esto permitirá validar el caso de "permisos no solicitados"
      permisos = [];
      
    } else {
      
      // Si hay contenido, se separa el texto por comas
      // split(",") divide el texto en un arreglo
      // map(p => p.trim()) elimina espacios de cada permiso
      permisos = permisosTexto.split(",").map(p => p.trim());
    }
    
    // Se captura el estado como texto
    const estado = prompt("Estado: ");
    
    // CONVERSIÓN DE ACEPTACONDICIONES A BOOLEANO
    // Se captura como texto primero
    const aceptaTexto = prompt("Acepta condiciones (true/false): ");
    
    // Se declara la variable para el booleano
    let aceptaCondiciones;
    
    // Se valida si el usuario escribió exactamente "true"
    if (aceptaTexto === "true") {
      
      // Se asigna el booleano true
      aceptaCondiciones = true;
      
    } else if (aceptaTexto === "false") {
      
      // Se asigna el booleano false
      aceptaCondiciones = false;
      
    } else {
      
      // Si escribió otra cosa, se guarda tal cual
      // Esto permite validar datos mal ingresados
      aceptaCondiciones = aceptaTexto;
    }
    
    // Se agrega el objeto solicitud completo al arreglo
    // Cada propiedad corresponde a los datos capturados
    solicitudes.push({
      id: id,
      nombre: nombre,
      edad: edad,
      rol: rol,
      permisos: permisos,
      estado: estado,
      aceptaCondiciones: aceptaCondiciones
    });
  }

  // Se envía el ARRAY completo de solicitudes a la función procesadora
  // await espera a que termine todo el procesamiento asincrónico
  const resultados = await procesarSolicitudEj3(solicitudes);
  
  // MOSTRAR RESULTADOS EN CONSOLA
  console.log("\n--- RESULTADOS ---\n");
  
  // Se recorre el arreglo de resultados y se imprime cada uno
  // forEach ejecuta una función por cada elemento del arreglo
  resultados.forEach(resultado => {
    
    // Se imprime el objeto resultado completo
    console.log(resultado);
  });
  
  // Se imprime una línea en blanco al final
  console.log("");
}

async function ejecutarEjercicio4() {                                                    //EJERCICIO 4
  
  // Se crea el arreglo para guardar transacciones
  const transacciones = [];
  
  // Se pregunta cuantas transacciones va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas transacciones? "));

  // Se recorre para capturar cada transaccion
  for (let i = 0; i < cantidad; i++) {
    
    // Se captura el ID como texto
    const idTexto = prompt("ID: ");
    
    // Se declara la variable id
    let id;
    
    // Valida si esta vacio o no es numero
    if (idTexto === "" || isNaN(idTexto)) {
      id = idTexto;
    } else {
      id = parseInt(idTexto);
    }
    
    // Se capturan los demas campos
    const usuario = prompt("Usuario: ");
    const monto = parseFloat(prompt("Monto: "));
    const tipo = prompt("Tipo: ");
    
    // Se captura autorizada como texto
    const autorizadaTexto = prompt("Autorizada (true/false): ");
    
    // Se convierte a booleano
    let autorizada;
    if (autorizadaTexto === "true") {
      autorizada = true;
    } else if (autorizadaTexto === "false") {
      autorizada = false;
    } else {
      autorizada = autorizadaTexto;
    }
    
    const fecha = prompt("Fecha: ");
    
    // Se agrega al arreglo
    transacciones.push({
      id: id,
      usuario: usuario,
      monto: monto,
      tipo: tipo,
      autorizada: autorizada,
      fecha: fecha
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarTransaccionesEj4(transacciones);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestran las transacciones validas
  console.log("TRANSACCIONES VALIDAS");
  console.log("\n");
  
  if (resultado.validas && resultado.validas.length > 0) {
    
    // Se recorre cada transaccion valida
    for (let i = 0; i < resultado.validas.length; i++) {
      const t = resultado.validas[i];
      console.log("ID: " + t.id + " | Usuario: " + t.usuario + " | Monto: $" + t.monto + " | Tipo: " + t.tipo);
    }
    
  } else {
    console.log("No hay transacciones validas");
  }
  
  console.log("\n");

  // Se muestran las transacciones sospechosas
  console.log("TRANSACCIONES SOSPECHOSAS");
  console.log("\n");
  
  if (resultado.sospechosas && resultado.sospechosas.length > 0) {
    
    // Se recorre cada transaccion sospechosa
    for (let i = 0; i < resultado.sospechosas.length; i++) {
      const t = resultado.sospechosas[i];
      console.log("ID: " + t.id + " | Usuario: " + t.usuario + " | Monto: $" + t.monto + " | Tipo: " + t.tipo);
    }
    
  } else {
    console.log("No hay transacciones sospechosas");
  }
  
  console.log("\n");

  // Se muestran las transacciones invalidas
  console.log("TRANSACCIONES INVALIDAS");
  console.log("\n");
  
  if (resultado.invalidas && resultado.invalidas.length > 0) {
    
    // Se recorre cada transaccion invalida
    for (let i = 0; i < resultado.invalidas.length; i++) {
      const item = resultado.invalidas[i];
      
      // Se obtiene el id de la transaccion
      let idInvalido;
      if (item.transaccion && item.transaccion.id) {
        idInvalido = item.transaccion.id;
      } else {
        idInvalido = "N/A";
      }
      
      console.log("ID: " + idInvalido + " | Motivo: " + item.motivo);
    }
    
  } else {
    console.log("No hay transacciones invalidas");
  }
  
  console.log("\n");

  // Se muestra el resumen financiero
  console.log("RESUMEN FINANCIERO");
  console.log("\n");
  console.log("Total procesadas:  " + resultado.totalProcesadas);
  console.log("Total de ingresos: $" + resultado.totalIngresos);
  console.log("Total de egresos:  $" + resultado.totalEgresos);
  console.log("Balance final:     $" + resultado.balanceFinal);
  console.log("\n");
}

async function ejecutarEjercicio5() {                                                   //EJERCICIO 5
  
  // Se crea el arreglo vacio para guardar operaciones
  const operaciones = [];
  
  // Se pregunta cuantas operaciones va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas operaciones? "));

  // Se recorre para capturar cada operacion
  for (let i = 0; i < cantidad; i++) {
    
    // Se captura el ID
    const id = prompt("ID: ");
    
    // Se capturan los valores separados por coma
    const valoresTexto = prompt("Valores (separados por coma): ");
    
    // Se procesan los valores
    let valores;
    
    // Si esta vacio, se asigna array vacio
    if (valoresTexto.trim() === "") {
      valores = [];
    } else {
      // Se separa por comas y se convierte a numeros
      valores = valoresTexto.split(",").map(v => parseFloat(v.trim()));
    }
    
    // Se captura el tipo de operacion
    const tipo = prompt("Tipo: ");
    
    // Se captura activo como texto
    const activoTexto = prompt("Activo (true/false): ");
    
    // Se convierte a booleano
    let activo;
    if (activoTexto === "true") {
      activo = true;
    } else if (activoTexto === "false") {
      activo = false;
    } else {
      activo = activoTexto;
    }
    
    // Se agrega al arreglo
    operaciones.push({
      id: id,
      valores: valores,
      tipo: tipo,
      activo: activo
    });
  }

  // Se procesa el arreglo completo
  const resultados = await procesarTransaccionesEj5(operaciones);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestran los resultados
  if (resultados && resultados.length > 0) {
    
    // Se recorre cada resultado
    for (let i = 0; i < resultados.length; i++) {
      const r = resultados[i];
      console.log("ID: " + r.id + " | Estado: " + r.estado + " | Motivo: " + r.motivo);
    }
    
  } else {
    console.log("No hay resultados");
  }
  
  console.log("\n");
}

async function ejecutarEjercicio6() {                                                    //EJERCICIO 6
  
  // Se crea el arreglo para guardar solicitudes
  const solicitudes = [];
  
  // Se pregunta cuantas solicitudes va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

  // Se recorre para capturar cada solicitud
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const cliente = prompt("Cliente: ");
    const tipoServicio = prompt("Tipo de servicio: ");
    const prioridad = parseInt(prompt("Prioridad (1-5): "));
    
    // Se captura activo como texto
    const activoTexto = prompt("Activa (true/false): ");
    
    // Se convierte a booleano
    let activo;
    if (activoTexto === "true") {
      activo = true;
    } else if (activoTexto === "false") {
      activo = false;
    } else {
      activo = activoTexto;
    }
    
    const fechaSolicitud = prompt("Fecha: ");
    
    // Se agrega al arreglo
    solicitudes.push({
      id: id,
      cliente: cliente,
      tipoServicio: tipoServicio,
      prioridad: prioridad,
      activo: activo,
      fechaSolicitud: fechaSolicitud
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarSolicitudesServicio(solicitudes);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestra el detalle de cada solicitud
  if (resultado.detalle && resultado.detalle.length > 0) {
    
    // Se recorre cada resultado
    for (let i = 0; i < resultado.detalle.length; i++) {
      const r = resultado.detalle[i];
      console.log("ID: " + r.id + " | Estado: " + r.estado + " | Motivo: " + r.motivo);
    }
    
  } else {
    console.log("No hay resultados");
  }
  
  console.log("\n");

  // Se muestra el resumen final
  console.log("RESUMEN FINAL");
  console.log("\n");
  console.log("Total procesadas: " + resultado.totalProcesadas);
  console.log("Total aprobadas:  " + resultado.totalAprobadas);
  console.log("Total rechazadas: " + resultado.totalRechazadas);
  console.log("\n");
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

async function ejecutarEjercicio13() {
  console.log("\n--- EJERCICIO 13 ---");

  const solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\nSolicitud ${i + 1}`);

    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      usuario: prompt("Usuario: "),
      tipo: prompt("Tipo (hardware/software/red): "),
      prioridad: parseInt(prompt("Prioridad (1-5): ")),
      descripcion: prompt("Descripción (mínimo 10 caracteres): "),
      activo: prompt("Activo (true/false): ") === "true"
    });
  }

  console.log("\nPROCESANDO SOLICITUDES...\n");

  try {
    const resultado = await procesarSolicitudesEj13(solicitudes);

    console.log("\n--- RESUMEN ---");
    console.log(resultado.resumen);

    if (resultado.solicitudesInvalidas.length > 0) {
      console.log("\nSOLICITUDES INVÁLIDAS\n");
      resultado.solicitudesInvalidas.forEach(s => {
        console.log(`ID ${s.id}: ${s.error}`);
      });
    }

    if (resultado.solicitudesProcesadas.length > 0) {
      console.log("\nSOLICITUDES PROCESADAS\n");
      resultado.solicitudesProcesadas.forEach(s => {
        console.log(`Solicitud ${s.id}`);
        console.log(`Tipo: ${s.tipo}`);
        console.log(`Prioridad: ${s.prioridad}`);
        console.log(`Clasificación: ${s.clasificacion}`);
        console.log(`Estado: ${s.estadoFinal}`);
        console.log("-----------------------------");
      });
    }

    console.log("\n✔ Ejercicio 13 ejecutado correctamente");

  } catch (error) {
    console.log("Error crítico controlado:", error.message);
  }
}

async function ejecutarEjercicio14() {
  console.log("\n--- EJERCICIO 14 ---");

  const transacciones = [];
  const cantidad = parseInt(prompt("¿Cuántas transacciones desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\nTransacción ${i + 1}`);

    transacciones.push({
      id: parseInt(prompt("ID: ")),
      cliente: prompt("Cliente: "),
      tipo: prompt("Tipo (deposito/retiro/transferencia): "),
      monto: parseFloat(prompt("Monto: ")),
      autorizado: prompt("Autorizado (true/false): ") === "true"
    });
  }

  console.log("\nCARGANDO Y ANALIZANDO TRANSACCIONES...\n");

  try {
    const resultado = await procesarTransaccionesEj14(transacciones);

    console.log("\n--- RESUMEN GENERAL ---");
    console.log(`Transacciones procesadas: ${resultado.totalProcesadas}`);
    console.log(`Transacciones válidas: ${resultado.validas}`);
    console.log(`Transacciones rechazadas: ${resultado.rechazadas}`);
    console.log(`Total en depósitos: $${resultado.totalDepositos}`);
    console.log(`Total en retiros: $${resultado.totalRetiros}`);

    if (resultado.errores.length > 0) {
      console.log("\n--- TRANSACCIONES RECHAZADAS ---");
      resultado.errores.forEach(e => {
        console.log(`ID ${e.id}: ${e.motivo}`);
      });
    }

    console.log("\n✔ Ejercicio 14 ejecutado correctamente");

  } catch (error) {
    console.log("Error crítico controlado:", error.message);
  }
}

async function ejecutarEjercicio15() {
  console.log("\n--- EJERCICIO 15 ---");

  const solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\nSolicitud ${i + 1}`);

    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      usuario: prompt("Usuario: "),
      rol: prompt("Rol (admin/tecnico/usuario): "),
      nivelAcceso: parseInt(prompt("Nivel de acceso (1-5): ")),
      activo: prompt("Activo (true/false): ") === "true"
    });
  }

  console.log("\nPROCESANDO SOLICITUDES...\n");

  try {
    const resultado = await procesarSolicitudesEj15(solicitudes);

    console.log("\n--- RESUMEN ---");
    console.log(resultado.resumen);

    if (resultado.solicitudesInvalidas.length > 0) {
      console.log("\nSOLICITUDES INVÁLIDAS\n");
      resultado.solicitudesInvalidas.forEach(s => {
        console.log(`ID ${s.id}: ${s.error}`);
      });
    }

    if (resultado.solicitudesProcesadas.length > 0) {
      console.log("\nSOLICITUDES PROCESADAS\n");
      resultado.solicitudesProcesadas.forEach(s => {
        console.log(`Solicitud ${s.id}`);
        console.log(`Usuario: ${s.usuario}`);
        console.log(`Rol: ${s.rol}`);
        console.log(`Nivel de acceso: ${s.nivelAcceso}`);
        console.log(`Estado final: ${s.estadoFinal}`);
        console.log(`Motivo: ${s.motivo}`);
        console.log("-----------------------------");
      });
    }

    console.log("\n✔ Ejercicio 15 ejecutado correctamente");

  } catch (error) {
    console.log("Error crítico controlado:", error.message);
  }
}

async function ejecutarEjercicio16() {
  console.log("\n--- EJERCICIO 16 ---");

  const solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\nSolicitud ${i + 1}`);

    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      usuario: prompt("Usuario: "),
      tipo: prompt("Tipo (hardware/software/red): "),
      prioridad: parseInt(prompt("Prioridad (1-5): ")),
      descripcion: prompt("Descripción (mínimo 10 caracteres): "),
      activo: prompt("Activo (true/false): ") === "true"
    });
  }

  console.log("\nPROCESANDO SOLICITUDES...\n");

  try {
    const resultado = await procesarSolicitudesEj16(solicitudes);

    console.log("\n--- RESUMEN GENERAL ---");
    console.log(`Total recibidas: ${resultado.total}`);
    console.log(`Solicitudes válidas: ${resultado.validas}`);
    console.log(`Solicitudes inválidas: ${resultado.invalidas}`);

    if (resultado.invalidasDetalle.length > 0) {
      console.log("\n--- SOLICITUDES INVÁLIDAS ---");
      resultado.invalidasDetalle.forEach(s => {
        console.log(`ID ${s.id}: ${s.motivo}`);
      });
    }

    if (resultado.procesadas.length > 0) {
      console.log("\n--- SOLICITUDES PROCESADAS ---");
      resultado.procesadas.forEach(s => {
        console.log(`Solicitud ${s.id}`);
        console.log(`Tipo: ${s.tipo}`);
        console.log(`Prioridad: ${s.prioridad}`);
        console.log(`Clasificación: ${s.clasificacion}`);
        console.log(`Estado final: ${s.estado}`);
        console.log("-----------------------------");
      });
    }

    console.log("\n✔ Ejercicio 16 ejecutado correctamente");

  } catch (error) {
    console.log("Error crítico controlado:", error.message);
  }
}
async function ejecutarEjercicio17() {
  console.log("\n--- EJERCICIO 17 ---");

  const transacciones = [];
  const cantidad = parseInt(prompt("¿Cuántas transacciones desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\nTransacción ${i + 1}`);

    transacciones.push({
      id: parseInt(prompt("ID: ")),
      cliente: prompt("Cliente: "),
      tipo: prompt("Tipo (deposito/retiro/transferencia): "),
      monto: parseFloat(prompt("Monto: ")),
      autorizado: prompt("Autorizado (true/false): ") === "true"
    });
  }

  console.log("\nCARGANDO Y ANALIZANDO TRANSACCIONES...\n");

  try {
    const resultado = await procesarTransaccionesEj17(transacciones);

    console.log("\n--- RESUMEN FINAL ---");
    console.log(`Transacciones procesadas: ${resultado.totalProcesadas}`);
    console.log(`Transacciones válidas: ${resultado.validas}`);
    console.log(`Transacciones rechazadas: ${resultado.rechazadas}`);
    console.log(`Total depósitos: $${resultado.totalDepositos}`);
    console.log(`Total retiros: $${resultado.totalRetiros}`);

    if (resultado.errores.length > 0) {
      console.log("\n--- TRANSACCIONES RECHAZADAS ---");
      resultado.errores.forEach(e => {
        console.log(`ID ${e.id}: ${e.motivo}`);
      });
    }

    console.log("\n✔ Ejercicio 17 ejecutado correctamente");

  } catch (error) {
    console.log("Error crítico controlado:", error.message);
  }
}

async function ejecutarEjercicio18() {
  console.log("\n--- EJERCICIO 18 ---");

  const solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\nSolicitud ${i + 1}`);

    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      usuario: prompt("Usuario: "),
      tipo: prompt("Tipo (hardware/software/red): "),
      nivel: parseInt(prompt("Nivel de urgencia (1-5): ")),
      activo: prompt("Activo (true/false): ") === "true"
    });
  }

  console.log("\nPROCESANDO SOLICITUDES...\n");

  try {
    const resultado = await procesarSolicitudesEj18(solicitudes);

    if (resultado.validas.length > 0) {
      console.log("\n--- SOLICITUDES VÁLIDAS ---");
      resultado.validas.forEach(s => {
        console.log(`Solicitud ${s.id}`);
        console.log(`Usuario: ${s.usuario}`);
        console.log(`Tipo: ${s.tipo}`);
        console.log(`Prioridad: ${s.prioridad}`);
        console.log("-----------------------------");
      });
    }

    if (resultado.invalidas.length > 0) {
      console.log("\n--- SOLICITUDES RECHAZADAS ---");
      resultado.invalidas.forEach(s => {
        console.log(`ID ${s.id}: ${s.motivo}`);
      });
    }

    console.log("\n✔ Ejercicio 18 ejecutado correctamente");

  } catch (error) {
    console.log("Error crítico controlado:", error.message);
  }
}

async function ejecutarEjercicio19() {
  console.log("\n--- EJERCICIO 19 ---");
  console.log("Sistema de Simulación de procesamiento de solicitudes de soporte técnico\n");

  const solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\nSolicitud ${i + 1}`);

    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      usuario: prompt("Usuario: "),
      area: prompt("Área: "),
      tipoProblema: prompt("Tipo de problema: "),
      prioridad: parseInt(prompt("Prioridad (1-5): ")),
      estado: "pendiente"
    });
  }

  console.log("\nPROCESANDO SOLICITUDES...\n");

  try {
    const resultado = await procesarSolicitudesEj19(solicitudes);

    if (resultado.atendidas.length > 0) {
      console.log("\n--- SOLICITUDES ATENDIDAS ---");
      resultado.atendidas.forEach(s => {
        console.log(`Solicitud ${s.id}`);
        console.log(`Usuario: ${s.usuario}`);
        console.log(`Área: ${s.area}`);
        console.log(`Prioridad final: ${s.prioridad}`);
        console.log(`Estado: ${s.estado}`);
        console.log("-----------------------------");
      });
    }

    if (resultado.rechazadas.length > 0) {
      console.log("\n--- SOLICITUDES RECHAZADAS ---");
      resultado.rechazadas.forEach(s => {
        console.log(`ID ${s.id}: ${s.motivo}`);
      });
    }

    console.log("\n--- RESUMEN FINAL ---");
    console.log(`Total procesadas: ${resultado.total}`);
    console.log(`Atendidas: ${resultado.atendidas.length}`);
    console.log(`Rechazadas: ${resultado.rechazadas.length}`);

    console.log("\n✔ Ejercicio 19 ejecutado correctamente");

  } catch (error) {
    console.log("Error crítico controlado:", error.message);
  }
}

async function ejecutarEjercicio20() {
  console.log("\n--- EJERCICIO 20 ---");
  console.log("Sistema de gestión inmutable de solicitudes\n");

  // Arreglo para almacenar las solicitudes ingresadas
  const solicitudes = [];

  // Se pregunta cuántas solicitudes se desean ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  // Ciclo para capturar cada solicitud
  for (let i = 0; i < cantidad; i++) {
    console.log(`\nSolicitud ${i + 1}`);

    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      usuario: prompt("Usuario: "),
      tipo: prompt("Tipo (hardware/software/red): "),
      prioridad: parseInt(prompt("Prioridad (1-5): ")),
      estado: "pendiente"
    });
  }

  console.log("\nPROCESANDO SOLICITUDES...\n");

  try {
    // Se envía el arreglo completo al módulo
    const resultado = await procesarSolicitudesEj20(solicitudes);

    // Mostrar arreglo original (sin modificaciones)
    console.log("--- SOLICITUDES ORIGINALES ---");
    console.log(resultado.originales);

    // Mostrar solicitudes procesadas
    console.log("\n--- SOLICITUDES PROCESADAS ---");
    resultado.procesadas.forEach(s => {
      console.log(`Solicitud ${s.id}`);
      console.log(`Usuario: ${s.usuario}`);
      console.log(`Tipo: ${s.tipo}`);
      console.log(`Clasificación: ${s.clasificacion}`);
      console.log(`Estado final: ${s.estado}`);
      console.log("-----------------------------");
    });

    // Mostrar solicitudes rechazadas
    if (resultado.rechazadas.length > 0) {
      console.log("\n--- SOLICITUDES RECHAZADAS ---");
      resultado.rechazadas.forEach(r => {
        console.log(`ID ${r.id}: ${r.motivo}`);
      });
    }

    console.log("\n✔ Ejercicio 20 ejecutado correctamente");

  } catch (error) {
    console.log("Error crítico controlado:", error.message);
  }
}

async function ejecutarEjercicio21() {
  console.log("\n--- EJERCICIO 21 ---");
  console.log("Sistema de Gestión de Solicitudes de Soporte Técnico\n");

  // Arreglo para almacenar las solicitudes
  const solicitudes = [];

  // Cantidad de solicitudes a ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  // Captura de datos por consola
  for (let i = 0; i < cantidad; i++) {
    console.log(`\nSolicitud ${i + 1}`);

    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      usuario: prompt("Usuario: "),
      tipo: prompt("Tipo (hardware/software/red): "),
      prioridad: parseInt(prompt("Prioridad (1-5): ")),
      estado: "pendiente"
    });
  }

  console.log("\nINICIANDO PROCESAMIENTO...\n");

  try {
    // Envío del arreglo completo al módulo
    const resultado = await procesarSolicitudesEj21(solicitudes);

    // Mostrar arreglo original sin modificaciones
    console.log("--- SOLICITUDES ORIGINALES ---");
    console.log(resultado.originales);

    // Mostrar solicitudes procesadas correctamente
    if (resultado.procesadas.length > 0) {
      console.log("\n--- SOLICITUDES PROCESADAS ---");
      resultado.procesadas.forEach(s => {
        console.log(`Solicitud ${s.id}`);
        console.log(`Usuario: ${s.usuario}`);
        console.log(`Tipo: ${s.tipo}`);
        console.log(`Clasificación: ${s.clasificacion}`);
        console.log(`Estado final: ${s.estado}`);
        console.log("-----------------------------");
      });
    }

    // Mostrar solicitudes rechazadas con motivo
    if (resultado.rechazadas.length > 0) {
      console.log("\n--- SOLICITUDES RECHAZADAS ---");
      resultado.rechazadas.forEach(r => {
        console.log(`ID ${r.id}: ${r.motivo}`);
      });
    }

    // Confirmación del proceso asíncrono
    console.log("\n Proceso asíncrono completado correctamente");
    console.log(" Ejercicio 21 ejecutado sin bloquear el sistema");

  } catch (error) {
    console.log("Error crítico controlado:", error.message);
  }
}

async function ejecutarEjercicio22() {
  console.log("\n--- EJERCICIO 22 ---");
  console.log("Sistema de validación básica de solicitudes\n");

  const solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\nSolicitud ${i + 1}`);

    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      tipo: prompt("Tipo de operación: "),
      valor: parseFloat(prompt("Valor asociado: ")),
      estado: prompt("Estado (true/false): "),
      prioridad: parseInt(prompt("Prioridad (1-5): "))
    });
  }

  try {
    const resultado = await procesarSolicitudesEj22(solicitudes);

    console.log("\n--- RESULTADOS ---");
    resultado.detalle.forEach(r => {
      console.log(`ID ${r.id} → Estado: ${r.estado} | Motivo: ${r.motivo}`);
    });

    console.log("\n--- RESUMEN FINAL ---");
    console.log(resultado.resumen);

  } catch (error) {
    console.log("Error controlado:", error.message);
  }
}

async function ejecutarEjercicio23() {
  console.log("\n--- EJERCICIO 23 ---");
  console.log("Sistema de Procesos y Validación de Operaciones\n");

  const solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\nSolicitud ${i + 1}`);

    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      tipoOperacion: prompt("Tipo de operación: "),
      valor: parseFloat(prompt("Valor: ")),
      estado: prompt("Estado (true/false): "),
      prioridad: parseInt(prompt("Prioridad (1-5): "))
    });
  }

  try {
    const resultado = await procesarSolicitudesEj23(solicitudes);

    console.log("\n--- RESULTADOS INDIVIDUALES ---");
    resultado.resultados.forEach(r => {
      console.log(`ID ${r.id} → ${r.resultado} | ${r.motivo}`);
    });

    console.log("\n--- RESUMEN FINAL ---");
    console.log(resultado.resumen);

  } catch (error) {
    console.log("Error capturado correctamente:", error.message);
  }
}

async function ejecutarEjercicio24() {
  console.log("\n--- EJERCICIO 24 ---");
  console.log("Sistema de Gestión y Validación de Solicitudes de Acceso\n");

  const solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\nSolicitud ${i + 1}`);

    const permisosTexto = prompt("Permisos (separados por coma): ");
    const permisos = permisosTexto.trim() === ""
      ? []
      : permisosTexto.split(",").map(p => p.trim());

    solicitudes.push({
      id: parseInt(prompt("ID solicitud: ")),
      nombre: prompt("Nombre del solicitante: "),
      edad: parseInt(prompt("Edad: ")),
      rol: prompt("Rol solicitado: "),
      permisos: permisos,
      estado: "pendiente",
      aceptaCondiciones: prompt("Acepta condiciones (true/false): ") === "true"
    });
  }

  try {
    const resultado = await procesarSolicitudesEj24(solicitudes);

    console.log("\n--- RESULTADOS ---");
    resultado.resultados.forEach(r => {
      console.log(`ID ${r.id}`);
      console.log(`Estado final: ${r.estado}`);
      console.log(`Motivo: ${r.motivo}`);
      console.log("-----------------------------");
    });

  } catch (error) {
    console.log("Error controlado:", error.message);
  }
}
// EJECUCIÓN
menuGeneral();

