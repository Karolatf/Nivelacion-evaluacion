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
  procesarSolicitudesEj19
} from "./modulos/barril.js";

// CONFIGURACIÓN DE MENÚS
const ejerciciosPorCarpeta = {
  karol: [1, 2, 3],
  sebastian: [4, 5, 6],
  andres: [7, 8, 9],
  isabella: [10, 11, 12],
  jhon: [13, 14, 15],
  manuel: [16, 17, 18], 
  paulo: [19, 20, 21]    
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
  19: procesarSolicitudesEj19
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

async function ejecutarEjercicio7() {                                                     //EJERCICIO 7
  
  // Se crea el arreglo para guardar transacciones
  const transacciones = [];
  
  // Se pregunta cuantas transacciones va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas transacciones? "));

  // Se recorre para capturar cada transaccion
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const idUsuario = parseInt(prompt("ID Usuario: "));
    const tipo = prompt("Tipo (ingreso/egreso): ");
    const monto = parseFloat(prompt("Monto: "));
    const categoria = prompt("Categoría: ");
    const fecha = prompt("Fecha: ");
    
    // Se agrega al arreglo
    transacciones.push({
      idUsuario: idUsuario,
      tipo: tipo,
      monto: monto,
      categoria: categoria,
      fecha: fecha
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarTransaccionesEj7(transacciones);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestran las transacciones validas
  console.log("TRANSACCIONES VALIDAS: " + resultado.validas.length);
  console.log("\n");

  // Se muestran saldos por usuario
  console.log("SALDOS POR USUARIO");
  console.log("\n");
  
  // Se recorren los usuarios con saldo
  const usuarios = Object.keys(resultado.saldos);
  for (let i = 0; i < usuarios.length; i++) {
    const userId = usuarios[i];
    const saldo = resultado.saldos[userId];
    console.log("Usuario " + userId + ": $" + saldo);
    
    // Se verifica si tiene saldo negativo
    if (resultado.saldoNegativo[userId]) {
      console.log("  ALERTA: Saldo negativo");
    }
    
    // Se verifica si tiene patron de riesgo
    if (resultado.patronesRiesgo[userId]) {
      console.log("  ALERTA: Multiples egresos consecutivos detectados");
    }
  }
  
  console.log("\n");

  // Se muestran las transacciones invalidas
  if (resultado.invalidas && resultado.invalidas.length > 0) {
    console.log("TRANSACCIONES INVALIDAS");
    console.log("\n");
    
    // Se recorre cada transaccion invalida
    for (let i = 0; i < resultado.invalidas.length; i++) {
      const item = resultado.invalidas[i];
      console.log("Motivo: " + item.motivo);
    }
    console.log("\n");
  }

  // Se muestra resumen
  console.log("RESUMEN");
  console.log("\n");
  console.log("Total procesadas: " + resultado.totalProcesadas);
  console.log("Validas: " + resultado.validas.length);
  console.log("Invalidas: " + resultado.invalidas.length);
  console.log("\n");
}

async function ejecutarEjercicio8() {                                                      //EJERCICIO 8
  
  // Se crea el arreglo para guardar movimientos
  const movimientos = [];
  
  // Se pregunta cuantos movimientos va a ingresar
  const cantidad = parseInt(prompt("¿Cuántos movimientos? "));

  // Se recorre para capturar cada movimiento
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const idProducto = parseInt(prompt("ID Producto: "));
    const nombreProducto = prompt("Nombre Producto: ");
    const tipoMovimiento = prompt("Tipo Movimiento (entrada/salida): ");
    const cantidadMov = parseFloat(prompt("Cantidad: "));
    const lote = prompt("Lote: ");
    
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
    movimientos.push({
      idProducto: idProducto,
      nombreProducto: nombreProducto,
      tipoMovimiento: tipoMovimiento,
      cantidad: cantidadMov,
      lote: lote,
      activo: activo
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarInventarioEj8(movimientos);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestra el inventario final
  console.log("INVENTARIO FINAL POR PRODUCTO");
  console.log("\n");
  
  // Se recorren los productos del inventario
  const productosIds = Object.keys(resultado.inventarioFinal);
  for (let i = 0; i < productosIds.length; i++) {
    const id = productosIds[i];
    const info = resultado.inventarioFinal[id];
    console.log("Producto " + id + " (" + info.nombreProducto + "): " + info.cantidad + " unidades");
  }
  
  console.log("\n");

  // Se muestran alertas de inventario negativo
  if (resultado.inventarioNegativo && resultado.inventarioNegativo.length > 0) {
    console.log("ALERTAS - INVENTARIO NEGATIVO");
    console.log("\n");
    
    // Se recorre cada producto con inventario negativo
    for (let i = 0; i < resultado.inventarioNegativo.length; i++) {
      const prod = resultado.inventarioNegativo[i];
      console.log("ALERTA: Producto " + prod.idProducto + " (" + prod.nombreProducto + ") tiene inventario negativo: " + prod.cantidad + " unidades");
    }
    console.log("\n");
  }

  // Se muestran los movimientos rechazados
  if (resultado.rechazados && resultado.rechazados.length > 0) {
    console.log("MOVIMIENTOS RECHAZADOS");
    console.log("\n");
    
    // Se recorre cada movimiento rechazado
    for (let i = 0; i < resultado.rechazados.length; i++) {
      const item = resultado.rechazados[i];
      console.log("Motivo: " + item.motivo);
    }
    console.log("\n");
  }

  // Se muestra resumen
  console.log("RESUMEN");
  console.log("\n");
  console.log("Movimientos validos: " + resultado.validos.length);
  console.log("Movimientos rechazados: " + resultado.rechazados.length);
  console.log("\n");
}

async function ejecutarEjercicio9() {                                                         //EJERCICIO 9
  
  // Se crea el arreglo para guardar ordenes
  const ordenes = [];
  
  // Se pregunta cuantas ordenes va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas órdenes? "));

  // Se recorre para capturar cada orden
  for (let i = 0; i < cantidad; i++) {
    
    // Se captura el ID como numero 
    const id = parseFloat(prompt("ID: "));
    
    const cliente = prompt("Cliente: ");
    const tipoServicio = prompt("Tipo de servicio (mantenimiento/instalacion/soporte): ");
    const horas = parseFloat(prompt("Horas: "));
    
    // Se captura pagado como texto
    const pagadoTexto = prompt("Pagado (true/false): ");
    
    // Se convierte a booleano
    let pagado;
    if (pagadoTexto === "true") {
      pagado = true;
    } else if (pagadoTexto === "false") {
      pagado = false;
    } else {
      pagado = pagadoTexto;
    }
    
    // Se agrega al arreglo
    ordenes.push({
      id: id,
      cliente: cliente,
      tipoServicio: tipoServicio,
      horas: horas,
      pagado: pagado
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarOrdenesEj9(ordenes);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestran las ordenes procesadas
  if (resultado.procesadas && resultado.procesadas.length > 0) {
    console.log("ORDENES PROCESADAS CORRECTAMENTE");
    console.log("\n");
    
    // Se recorre cada orden procesada
    for (let i = 0; i < resultado.procesadas.length; i++) {
      const orden = resultado.procesadas[i];
      console.log("Orden " + orden.id);
      console.log("  Cliente: " + orden.cliente);
      console.log("  Servicio: " + orden.servicio);
      console.log("  Horas: " + orden.horas);
      console.log("  Pagado: " + orden.pagado);
      console.log("  Costo total: $" + orden.costoTotal);
      console.log("");
    }
  }

  // Se muestran los errores
  if (resultado.errores && resultado.errores.length > 0) {
    console.log("ORDENES CON ERRORES");
    console.log("\n");
    
    // Se recorre cada error
    for (let i = 0; i < resultado.errores.length; i++) {
      const error = resultado.errores[i];
      console.log("Error en orden " + error.id);
      console.log("  Mensaje: " + error.mensaje);
      console.log("");
    }
  }

  // Se muestra estado final
  console.log("Estado: " + resultado.estado);
  console.log("\n");
}

async function ejecutarEjercicio10() {                                                          //EJERCICIO 10
  
  // Se crea el arreglo para guardar solicitudes
  const solicitudes = [];
  
  // Se pregunta cuantas solicitudes va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

  // Se recorre para capturar cada solicitud
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const area = prompt("Área (infraestructura/desarrollo/administración): ");
    const nivelUrgencia = parseInt(prompt("Nivel de urgencia (1-5): "));
    const descripcion = prompt("Descripción: ");
    
    // Se captura reportadoPorSistema como texto
    const reportadoTexto = prompt("Reportado por sistema (true/false): ");
    
    // Se convierte a booleano
    let reportadoPorSistema;
    if (reportadoTexto === "true") {
      reportadoPorSistema = true;
    } else if (reportadoTexto === "false") {
      reportadoPorSistema = false;
    } else {
      reportadoPorSistema = reportadoTexto;
    }
    
    const intentosPrevios = parseInt(prompt("Intentos previos: "));
    
    // Se agrega al arreglo
    solicitudes.push({
      id: id,
      area: area,
      nivelUrgencia: nivelUrgencia,
      descripcion: descripcion,
      reportadoPorSistema: reportadoPorSistema,
      intentosPrevios: intentosPrevios
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarSolicitudesEj10(solicitudes);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestran las solicitudes procesadas
  if (resultado.resultados && resultado.resultados.length > 0) {
    console.log("SOLICITUDES PROCESADAS");
    console.log("\n");
    
    // Se recorre cada solicitud procesada
    for (let i = 0; i < resultado.resultados.length; i++) {
      const sol = resultado.resultados[i];
      console.log("Solicitud " + sol.id + ": " + sol.estado);
    }
    console.log("\n");
  }

  // Se muestran los errores
  if (resultado.errores && resultado.errores.length > 0) {
    console.log("SOLICITUDES CON ERRORES");
    console.log("\n");
    
    // Se recorre cada error
    for (let i = 0; i < resultado.errores.length; i++) {
      const error = resultado.errores[i];
      console.log("Error en solicitud " + error.id);
      console.log("  Mensaje: " + error.mensaje);
      console.log("");
    }
  }

  console.log("\n");
}

async function ejecutarEjercicio11() {                                                            //EJERCICIO 11
  
  // Se crea el arreglo para guardar registros
  const registros = [];
  
  // Se pregunta cuantos registros va a ingresar
  const cantidad = parseInt(prompt("¿Cuántos registros? "));

  // Se recorre para capturar cada registro
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const nombre = prompt("Nombre: ");
    const rol = prompt("Rol (admin/tecnico/usuario): ");
    const nivelAccesoSolicitado = parseInt(prompt("Nivel de acceso solicitado (1-5): "));
    
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
    
    const intentosPrevios = parseInt(prompt("Intentos previos: "));
    
    // Se agrega al arreglo
    registros.push({
      id: id,
      nombre: nombre,
      rol: rol,
      nivelAccesoSolicitado: nivelAccesoSolicitado,
      activo: activo,
      intentosPrevios: intentosPrevios
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarSolicitudesEj11(registros);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestran las solicitudes procesadas
  if (resultado.resultados && resultado.resultados.length > 0) {
    console.log("SOLICITUDES PROCESADAS");
    console.log("\n");
    
    // Se recorre cada solicitud procesada
    for (let i = 0; i < resultado.resultados.length; i++) {
      const reg = resultado.resultados[i];
      console.log("Registro " + reg.id + ": " + reg.estado);
      console.log("  Motivo: " + reg.motivo);
      console.log("");
    }
  }

  // Se muestran los errores
  if (resultado.errores && resultado.errores.length > 0) {
    console.log("SOLICITUDES CON ERRORES");
    console.log("\n");
    
    // Se recorre cada error
    for (let i = 0; i < resultado.errores.length; i++) {
      const error = resultado.errores[i];
      console.log("Error en registro " + error.id);
      console.log("  Mensaje: " + error.mensaje);
      console.log("");
    }
  }

  // Se muestra resumen final
  console.log("RESUMEN FINAL");
  console.log("\n");
  console.log("Total procesadas: " + resultado.totalProcesadas);
  console.log("Total aprobadas:  " + resultado.totalAprobadas);
  console.log("Total rechazadas: " + resultado.totalRechazadas);
  console.log("Total bloqueadas: " + resultado.totalBloqueadas);
  console.log("Total con error:  " + resultado.totalErrores);
  console.log("\n");
}

async function ejecutarEjercicio12() {                                                            //EJERCICIO 12
  
  // Se crea el arreglo para guardar solicitudes
  const solicitudes = [];
  
  // Se pregunta cuantas solicitudes va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

  // Se recorre para capturar cada solicitud
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const usuario = prompt("Usuario: ");
    const tipo = prompt("Tipo (software/hardware): ");
    const prioridad = parseInt(prompt("Prioridad (1-5): "));
    const descripcion = prompt("Descripción: ");
    const estado = prompt("Estado: ");
    
    // Se agrega al arreglo
    solicitudes.push({
      id: id,
      usuario: usuario,
      tipo: tipo,
      prioridad: prioridad,
      descripcion: descripcion,
      estado: estado
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarSolicitudesEj12(solicitudes);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestran las solicitudes procesadas
  if (resultado.resultados && resultado.resultados.length > 0) {
    console.log("SOLICITUDES PROCESADAS");
    console.log("\n");
    
    // Se recorre cada solicitud procesada
    for (let i = 0; i < resultado.resultados.length; i++) {
      const sol = resultado.resultados[i];
      console.log("Solicitud " + sol.id + " procesada correctamente");
      console.log("  Usuario: " + sol.usuario);
      console.log("  Tipo: " + sol.tipo);
      console.log("  Clasificacion: " + sol.clasificacion);
      console.log("  Estado final: " + sol.estado);
      console.log("");
    }
  }

  // Se muestran los errores
  if (resultado.errores && resultado.errores.length > 0) {
    console.log("ERRORES DETECTADOS");
    console.log("\n");
    
    // Se recorre cada error
    for (let i = 0; i < resultado.errores.length; i++) {
      const error = resultado.errores[i];
      console.log("Solicitud " + error.id + ": " + error.mensaje);
      console.log("");
    }
  }

  // Se muestra estado final del sistema
  console.log("ESTADO FINAL");
  console.log(resultado.estadoSistema);
  console.log("\n");
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

// EJECUCIÓN
menuGeneral();

