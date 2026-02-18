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
      console.log(`${index + 1}. ${carpeta.toUpperCase()}`);    //devuelve el valor convertido en mayúsculas de la cadena que realiza la llamada
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
// Se define una función asíncrona para permitir el uso de 'await' al procesar los datos
async function ejecutarEjercicio1() {
  
  // Se declara la variable y se inicializa como un arreglo vacío para almacenar las solicitudes ingresadas
  let solicitudes = []; 
  
  // Se solicita al usuario la cantidad de registros y se convierte el texto ingresado a un número entero
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  // Ciclo principal para repetir el proceso de captura según la cantidad definida por el usuario
  for (let i = 0; i < cantidad; i++) {
    
    // Captura de datos básicos convirtiendo a entero donde es necesario (ID y Prioridad)
    const id = parseInt(prompt("ID: "));
    const nombre = prompt("Nombre: ");
    const tipo = prompt("Tipo: ");
    const prioridad = parseInt(prompt("Prioridad (1-5): "));
    
    // Se captura el estado como una cadena de texto para su posterior validación
    const estadoTexto = prompt("Estado (true/false): ");
    
    // Estructura condicional para transformar el texto ingresado en un valor booleano real (true/false)
    let estado;
    if (estadoTexto === "true") {
      estado = true;
    } else if (estadoTexto === "false") {
      estado = false;
    } else {
      // Si el usuario escribe algo distinto, se guarda el texto original
      estado = estadoTexto;
    }
    
    // Se inicializa un arreglo interno para manejar los requisitos de cada solicitud
    const cantidadRequisitos = parseInt(prompt("Cuantos requisitos: "));
    const requisitos = [];
    
    // Ciclo secundario para capturar cada requisito de forma individual
    for (let j = 0; j < cantidadRequisitos; j++) {
      // Se evalúa la respuesta y se guarda directamente como booleano en el arreglo
      const requisito = prompt("Requisito " + (j + 1) + " (true/false): ") === "true";
      requisitos.push(requisito);
    }
    
    // Se crea un objeto con toda la información recolectada y se añade al arreglo de solicitudes
    solicitudes.push({
      id: id,
      nombre: nombre,
      tipo: tipo,
      prioridad: prioridad,
      estado: estado,
      requisitos: requisitos
    });
  }

  // Ciclo para recorrer cada solicitud guardada y procesarla una por una
  for (const solicitud of solicitudes) {
    // Se espera a que la función procesarSolicitud termine y se muestra el resultado en consola
    console.log(await procesarSolicitud(solicitud));
  }
}

// EJERCICIO 2

// Definimos la función principal como asíncrona para gestionar el flujo de datos y esperar la respuesta del procesamiento.
async function ejecutarEjercicio2() {                                                   
  
  // Declaramos e inicializamos un arreglo vacío para recolectar los objetos de solicitud que el usuario ingresará.
  const solicitudes = [];
  
  // Solicitamos la cantidad de registros, asegurando la conversión a entero para definir el límite del ciclo de captura.
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  // Iniciamos un ciclo 'for' para capturar de forma secuencial cada una de las solicitudes operativas.
  for (let i = 0; i < cantidad; i++) {
    
    // Capturamos el identificador único y lo convertimos a entero para cumplir con la validación de tipo 'number'.
    const id = parseInt(prompt("ID: "));
    
    // Capturamos el tipo de operación como una cadena de texto (string).
    const tipo = prompt("Tipo: ");
    
    // Utilizamos 'parseFloat' para permitir que el valor de la operación acepte números decimales, aumentando la precisión financiera.
    const valor = parseFloat(prompt("Valor: "));
    
    // Capturamos el estado inicial como texto para validar manualmente su conversión a un tipo lógico.
    const estadoTexto = prompt("Estado (true/false): ");
    
    // Estructura condicional para transformar el texto ingresado en un valor booleano real o mantenerlo como texto si es inválido.
    let estado;
    if (estadoTexto === "true") {
      estado = true;
    } else if (estadoTexto === "false") {
      estado = false;
    } else {
      // Si la entrada no coincide con "true" o "false", se guarda el valor original para probar la gestión de errores.
      estado = estadoTexto;
    }
    
    // Capturamos el nivel de prioridad como un entero dentro del rango esperado por la lógica de negocio.
    const prioridad = parseInt(prompt("Prioridad (1-5): "));
    
    // Construimos un objeto con los datos recolectados y lo añadimos al arreglo mediante el método '.push()'.
    solicitudes.push({
      id: id,
      tipo: tipo,
      valor: valor,
      estado: estado,
      prioridad: prioridad
    });
  }

  // Enviamos el arreglo completo a 'procesarSolicitudEj2' y usamos 'await' para esperar el objeto que contiene resultados y resumen.
  const respuesta = await procesarSolicitudEj2(solicitudes);
  
  // Imprimimos un encabezado visual para organizar la salida de datos en la terminal.
  console.log("\n--- RESULTADOS ---\n");
  
  // Utilizamos el método de arreglo '.forEach' para iterar sobre los resultados individuales y mostrarlos al usuario.
  respuesta.resultados.forEach(resultado => {
    console.log(resultado);
  });
  
  // Sección de Resumen Final: Cumplimos con el requisito de la guía de presentar indicadores de gestión.
  console.log("\n--- RESUMEN FINAL ---");
  
  // Accedemos a las propiedades del objeto 'resumen' devuelto por la lógica del ejercicio para mostrar las estadísticas.
  console.log("Total procesadas: " + respuesta.resumen.total);
  console.log("Aprobadas: " + respuesta.resumen.aprobadas);
  console.log("Rechazadas: " + respuesta.resumen.rechazadas);
  console.log("Inválidas: " + respuesta.resumen.invalidas);
  console.log("Errores: " + respuesta.resumen.errores);
  
  // Imprimimos un espacio en blanco para mejorar la legibilidad visual de la consola.
  console.log("");
}

// EJERCICIO 3

// Definimos la función principal asíncrona para coordinar la captura y el procesamiento de accesos al sistema.
async function ejecutarEjercicio3() {                                                     
  
  // Inicializamos una estructura de datos tipo arreglo (mutable) para consolidar todas las solicitudes antes de su evaluación.
  const solicitudes = [];
  
  // Capturamos la dimensión del lote de trabajo mediante un entero que definirá las iteraciones del ciclo.
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  // Implementamos un ciclo 'for' para recolectar de forma secuencial la información de cada solicitante.
  for (let i = 0; i < cantidad; i++) {
    
    // Captura del Identificador Único: Se convierte a entero para asegurar la consistencia numérica requerida.
    const id = parseInt(prompt("ID: "));
    
    // Captura de datos de identidad: Almacenamos el nombre como una cadena de texto (string).
    const nombre = prompt("Nombre: ");
    
    // Captura de Edad: Dato crítico que será utilizado en la lógica de decisión matemática posterior.
    const edad = parseInt(prompt("Edad: "));
    
    // Captura del Rol: Identificamos la función que el usuario desea desempeñar en el sistema interno.
    const rol = prompt("Rol: ");
    
    // PROCESAMIENTO DINÁMICO DE PERMISOS
    // Recibimos una cadena de texto separada por delimitadores (comas).
    const permisosTexto = prompt("Permisos (separados por coma): ");
    
    let permisos;
    
    // Verificamos si la entrada está vacía utilizando .trim() para limpiar espacios en blanco.
    if (permisosTexto.trim() === "") {
      
      // Asignamos un arreglo vacío, permitiendo que la lógica de negocio detecte posteriormente la falta de permisos.
      permisos = [];
      
    } else {
      
      // Transformamos la cadena en un arreglo mediante .split() y normalizamos cada elemento con .map() y .trim().
      // Esto garantiza que cada permiso sea una cadena independiente y limpia.
      permisos = permisosTexto.split(",").map(p => p.trim());
    }
    
    // Captura del estado administrativo actual de la solicitud.
    const estado = prompt("Estado: ");
    
    // VALIDACIÓN LÓGICA DE CONDICIONES
    // Proceso de conversión manual para asegurar que el dato de aceptación sea un booleano estricto.
    const aceptaTexto = prompt("Acepta condiciones (true/false): ");
    
    let aceptaCondiciones;
    
    // Evaluamos la entrada literal para asignar el tipo lógico correspondiente (true/false).
    if (aceptaTexto === "true") {
      aceptaCondiciones = true;
    } else if (aceptaTexto === "false") {
      aceptaCondiciones = false;
    } else {
      // Mantenemos el valor original si no es booleano para poner a prueba el sistema de gestión de errores.
      aceptaCondiciones = aceptaTexto;
    }
    
    // Empaquetamos la información en un objeto y lo insertamos en el arreglo de gestión de lotes.
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

  // Despachamos el arreglo completo a la lógica de procesamiento externo mediante una llamada asíncrona.
  // El uso de 'await' garantiza que los resultados solo se muestren una vez finalizada la validación externa.
  const resultados = await procesarSolicitudEj3(solicitudes);
  
  // SALIDA ESTRUCTURADA DE DATOS
  console.log("\n--- RESULTADOS ---\n");
  
  // Iteramos sobre la respuesta para presentar el veredicto final de cada solicitud de acceso en la terminal.
  resultados.forEach(resultado => {
    console.log(resultado);
  });
  
  console.log("");
}

// EJERCICIO 4

// Definimos la función principal asíncrona para gestionar el sistema de control de riesgo financiero.
async function ejecutarEjercicio4() {                                                    
  
  // Inicializamos una estructura de datos tipo arreglo para consolidar el lote de transacciones a procesar.
  const transacciones = [];
  
  // Capturamos la cantidad de operaciones, dato que servirá de límite para nuestro ciclo de recolección.
  const cantidad = parseInt(prompt("¿Cuántas transacciones? "));

  // Implementamos un ciclo 'for' para la captura manual de datos, permitiendo la entrada de valores inconsistentes para probar la robustez del sistema.
  for (let i = 0; i < cantidad; i++) {
    
    // Captura de Identificador: Implementamos una validación preliminar para identificar si la entrada es numérica o un string inválido.
    const idTexto = prompt("ID: ");
    
    let id;
    
    // Verificamos si el campo está vacío o si el contenido no es un número (NaN).
    if (idTexto === "" || isNaN(idTexto)) {
      // Mantenemos el valor original para que el validador de riesgo detecte la inconsistencia de tipo.
      id = idTexto;
    } else {
      // Normalizamos el ID a un valor entero para operaciones válidas.
      id = parseInt(idTexto);
    }
    
    // Captura de datos operativos: Almacenamos el usuario y el monto (usando parseFloat para admitir decimales monetarios).
    const usuario = prompt("Usuario: ");
    const monto = parseFloat(prompt("Monto: "));
    const tipo = prompt("Tipo: ");
    
    // Captura de Autorización: Dato booleano crítico para la clasificación entre transacciones 'válidas' o 'sospechosas'.
    const autorizadaTexto = prompt("Autorizada (true/false): ");
    
    let autorizada;
    if (autorizadaTexto === "true") {
      autorizada = true;
    } else if (autorizadaTexto === "false") {
      autorizada = false;
    } else {
      // Si la entrada es ambigua, se guarda como texto para forzar un error controlado en la fase de validación.
      autorizada = autorizadaTexto;
    }
    
    const fecha = prompt("Fecha: ");
    
    // Agregamos el objeto de transacción al arreglo principal manteniendo la integridad de la entrada del usuario.
    transacciones.push({
      id: id,
      usuario: usuario,
      monto: monto,
      tipo: tipo,
      autorizada: autorizada,
      fecha: fecha
    });
  }

  // Invocamos la función lógica de procesamiento enviando el lote completo y esperando la respuesta mediante 'await'.
  const resultado = await procesarTransaccionesEj4(transacciones);

  // FASE DE SALIDA: Presentación organizada y jerárquica de los resultados del análisis.
  console.log("\nRESULTADOS DEL PROCESAMIENTO\n");

  // SECCIÓN 1: Visualización de Transacciones Válidas (Datos correctos y autorización confirmada).
  console.log("TRANSACCIONES VALIDAS\n");
  
  // Verificamos la existencia de elementos en el listado para evitar errores de lectura.
  if (resultado.validas && resultado.validas.length > 0) {
    // Iteramos mediante un ciclo tradicional para mostrar el detalle de cada operación aprobada.
    for (let i = 0; i < resultado.validas.length; i++) {
      const t = resultado.validas[i];
      console.log("ID: " + t.id + " | Usuario: " + t.usuario + " | Monto: $" + t.monto + " | Tipo: " + t.tipo);
    }
  } else {
    console.log("No hay transacciones validas");
  }
  
  console.log("\n");

  // SECCIÓN 2: Identificación de Transacciones Sospechosas (Datos íntegros pero carecen de autorización).
  console.log("TRANSACCIONES SOSPECHOSAS\n");
  
  if (resultado.sospechosas && resultado.sospechosas.length > 0) {
    for (let i = 0; i < resultado.sospechosas.length; i++) {
      const t = resultado.sospechosas[i];
      console.log("ID: " + t.id + " | Usuario: " + t.usuario + " | Monto: $" + t.monto + " | Tipo: " + t.tipo);
    }
  } else {
    console.log("No hay transacciones sospechosas");
  }
  
  console.log("\n");

  // SECCIÓN 3: Reporte de Transacciones Inválidas con indicación de causa técnica.
  console.log("TRANSACCIONES INVALIDAS\n");
  
  if (resultado.invalidas && resultado.invalidas.length > 0) {
    for (let i = 0; i < resultado.invalidas.length; i++) {
      const item = resultado.invalidas[i];
      
      // Aplicamos control de nulidad para mostrar el ID de la transacción fallida o "N/A" si el ID es el campo erróneo.
      let idInvalido = (item.transaccion && item.transaccion.id) ? item.transaccion.id : "N/A";
      
      console.log("ID: " + idInvalido + " | Motivo: " + item.motivo);
    }
  } else {
    console.log("No hay transacciones invalidas");
  }
  
  console.log("\n");

  // SECCIÓN 4: Balance Financiero Final (Consolidación de ingresos, egresos y flujo de caja neto).
  console.log("RESUMEN FINANCIERO\n");
  console.log("Total procesadas:  " + resultado.totalProcesadas);
  console.log("Total de ingresos: $" + resultado.totalIngresos);
  console.log("Total de egresos:  $" + resultado.totalEgresos);
  console.log("Balance final:     $" + resultado.balanceFinal);
  console.log("\n");
}

// EJERCICIO 5

// Definimos la función asíncrona principal para gestionar el procesamiento por lotes de operaciones organizacionales.
async function ejecutarEjercicio5() {                                                   
  
  // Inicializamos un arreglo (estructura inmutable en su consumo posterior) para almacenar los objetos de operación.
  const operaciones = [];
  
  // Solicitamos la dimensión del lote para establecer el control del ciclo de captura de datos.
  const cantidad = parseInt(prompt("¿Cuántas operaciones? "));

  // Implementamos un ciclo 'for' para recolectar la información, permitiendo la entrada de datos inconsistentes para validar la robustez del sistema.
  for (let i = 0; i < cantidad; i++) {
    
    // Captura del ID: Aceptamos cualquier entrada (string o number) cumpliendo con el requisito de flexibilidad del identificador único.
    const id = prompt("ID: ");
    
    // CAPTURA DE DATOS NUMÉRICOS MÚLTIPLES
    // Recibimos una cadena de caracteres que representa un conjunto de valores para cálculos intermedios.
    const valoresTexto = prompt("Valores (separados por coma): ");
    
    let valores;
    
    // Verificamos si la entrada es una cadena vacía para gestionar el escenario de 'Arreglos vacíos' mencionado en la guía.
    if (valoresTexto.trim() === "") {
      valores = [];
    } else {
      // Aplicamos .split() para segmentar la cadena y .map() con parseFloat para transformar cada elemento en un dato de tipo Number operable.
      valores = valoresTexto.split(",").map(v => parseFloat(v.trim()));
    }
    
    // Captura del tipo de operación para su posterior validación contra las reglas de negocio.
    const tipo = prompt("Tipo: ");
    
    // CAPTURA DEL INDICADOR LÓGICO
    // Proceso de normalización manual para asegurar que el estado de la operación sea un booleano estricto (Active/Inactive).
    const activoTexto = prompt("Activo (true/false): ");
    
    let activo;
    if (activoTexto === "true") {
      activo = true;
    } else if (activoTexto === "false") {
      activo = false;
    } else {
      // Si el dato no es binario, se mantiene como texto para forzar una excepción controlada en la lógica de validación.
      activo = activoTexto;
    }
    
    // Consolidamos la operación en un objeto y lo agregamos al arreglo de procesamiento.
    operaciones.push({
      id: id,
      valores: valores,
      tipo: tipo,
      activo: activo
    });
  }

  // Despachamos el lote completo de operaciones a la lógica de procesamiento asíncrona y esperamos la resolución del informe final.
  const resultados = await procesarTransaccionesEj5(operaciones);

  console.log("\nRESULTADOS DEL PROCESAMIENTO\n");

  // FASE DE SALIDA: Presentación jerárquica de los resultados para cada operación analizada.
  if (resultados && resultados.length > 0) {
    
    // Utilizamos un ciclo 'for' tradicional para garantizar que la impresión en consola mantenga el orden secuencial del procesamiento.
    for (let i = 0; i < resultados.length; i++) {
      const r = resultados[i];
      // Mostramos el ID, el veredicto (Aprobada/Rechazada) y la justificación técnica del resultado.
      console.log("ID: " + r.id + " | Estado: " + r.estado + " | Motivo: " + r.motivo);
    }
    
  } else {
    console.log("No hay resultados");
  }
  
  console.log("\n");
}

// EJERCICIO 6

// Definimos la función principal asíncrona para la gestión de solicitudes de servicio técnico bajo demanda.
async function ejecutarEjercicio6() {                                                    
  
  // Inicializamos un arreglo para recolectar el lote de solicitudes antes de iniciar la orquestación asíncrona.
  const solicitudes = [];
  
  // Capturamos el volumen de trabajo para controlar el flujo del ciclo de entrada de datos.
  const cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

  // Implementamos un ciclo 'for' para la captura de información, permitiendo la entrada de datos con errores intencionales (Requisito del PDF).
  for (let i = 0; i < cantidad; i++) {
    
    // Captura del ID: Se normaliza a número entero para asegurar la identificación unívoca en el sistema.
    const id = parseInt(prompt("ID: "));
    
    // Captura de datos de identidad del cliente y categoría del servicio técnico solicitado.
    const cliente = prompt("Cliente: ");
    const tipoServicio = prompt("Tipo de servicio: ");
    
    // CAPTURA DE PRIORIDAD: Se define un rango (1-5) para establecer la jerarquía de atención del servicio.
    const prioridad = parseInt(prompt("Prioridad (1-5): "));
    
    // CAPTURA DEL INDICADOR DE ACTIVIDAD
    // Proceso de conversión manual para garantizar que el estado de la solicitud sea un booleano controlado.
    const activoTexto = prompt("Activa (true/false): ");
    
    let activo;
    if (activoTexto === "true") {
      activo = true;
    } else if (activoTexto === "false") {
      activo = false;
    } else {
      // Se mantiene el valor original para validar la capacidad del sistema de detectar tipos de datos incorrectos.
      activo = activoTexto;
    }
    
    // Captura de la fecha como cadena de texto, según la flexibilidad permitida en la guía.
    const fechaSolicitud = prompt("Fecha: ");
    
    // Consolidamos la información en un objeto y lo insertamos en el arreglo principal.
    solicitudes.push({
      id: id,
      cliente: cliente,
      tipoServicio: tipoServicio,
      prioridad: prioridad,
      activo: activo,
      fechaSolicitud: fechaSolicitud
    });
  }

  // ORQUESTACIÓN DEL FLUJO: Despachamos el lote completo y esperamos la respuesta del procesamiento secuencial.
  const resultado = await procesarSolicitudesServicio(solicitudes);

  // FASE DE SALIDA: Presentación organizada de los veredictos individuales y estadísticos.
  console.log("\nRESULTADOS DEL PROCESAMIENTO\n");

  // Sección de detalle individual: Muestra el estado final (Aprobada/Rechazada) y su respectiva justificación técnica.
  if (resultado.detalle && resultado.detalle.length > 0) {
    
    for (let i = 0; i < resultado.detalle.length; i++) {
      const r = resultado.detalle[i];
      console.log("ID: " + r.id + " | Estado: " + r.estado + " | Motivo: " + r.motivo);
    }
    
  } else {
    console.log("No hay resultados");
  }
  
  console.log("\n");

  // RESUMEN FINAL: Cumplimiento de los indicadores estadísticos obligatorios definidos en el PDF.
  console.log("RESUMEN FINAL\n");
  console.log("Total procesadas: " + resultado.totalProcesadas);
  console.log("Total aprobadas:  " + resultado.totalAprobadas);
  console.log("Total rechazadas: " + resultado.totalRechazadas);
  console.log("\n");
}

// EJERCICIO 7

// Definimos la función principal asíncrona para la gestión de auditoría financiera y análisis de riesgos.
async function ejecutarEjercicio7() {                                                     
  
  // Inicializamos un arreglo para recolectar el historial de transacciones antes de su análisis masivo.
  const transacciones = [];
  
  // Solicitamos la cantidad de registros para establecer el límite del ciclo de captura de datos en la terminal.
  const cantidad = parseInt(prompt("¿Cuántas transacciones? "));

  // Implementamos un ciclo 'for' para la recolección secuencial de transacciones financieras.
  for (let i = 0; i < cantidad; i++) {
    
    // Captura del ID de Usuario: Dato fundamental para el posterior agrupamiento de saldos.
    const idUsuario = parseInt(prompt("ID Usuario: "));
    
    // Captura de Tipo: Se recibe como texto para validar posteriormente si coincide con "ingreso" o "egreso".
    const tipo = prompt("Tipo (ingreso/egreso): ");
    
    // Captura de Monto: Se utiliza parseFloat para permitir operaciones con precisión decimal.
    const monto = parseFloat(prompt("Monto: "));
    
    // Captura de metadatos: Categoría y fecha de la operación para trazabilidad.
    const categoria = prompt("Categoría: ");
    const fecha = prompt("Fecha: ");
    
    // Consolidamos la información en un objeto y lo agregamos al lote de procesamiento.
    transacciones.push({
      idUsuario: idUsuario,
      tipo: tipo,
      monto: monto,
      categoria: categoria,
      fecha: fecha
    });
  }

  // DESPACHO ASINCRÓNICO: Enviamos el lote completo a la lógica de negocio y esperamos la resolución del informe financiero.
  const resultado = await procesarTransaccionesEj7(transacciones);

  console.log("\nRESULTADOS DEL PROCESAMIENTO\n");

  // SECCIÓN 1: Reporte de integridad de datos (conteo de registros que superaron las validaciones).
  console.log("TRANSACCIONES VALIDAS: " + resultado.validas.length + "\n");

  // SECCIÓN 2: Análisis de Saldos Consolidados por Usuario (Punto 3 del PDF).
  console.log("SALDOS POR USUARIO\n");
  
  // Obtenemos las claves del objeto de saldos para iterar sobre cada usuario procesado.
  const usuarios = Object.keys(resultado.saldos);
  for (let i = 0; i < usuarios.length; i++) {
    const userId = usuarios[i];
    const saldo = resultado.saldos[userId];
    
    // Mostramos el saldo final calculado (Ingresos - Egresos).
    console.log("Usuario " + userId + ": $" + saldo);
    
    // ALERTA DE SALDO NEGATIVO: Identificamos usuarios que presentan deudas según la lógica aplicada.
    if (resultado.saldoNegativo[userId]) {
      console.log("  ALERTA: Saldo negativo detectado.");
    }
    
    // DETECCIÓN DE PATRONES DE RIESGO: Mostramos alertas si se identificaron egresos consecutivos (Punto 3 del PDF).
    if (resultado.patronesRiesgo[userId]) {
      console.log("  ALERTA: Multiples egresos consecutivos detectados.");
    }
  }
  
  console.log("\n");

  // SECCIÓN 3: Gestión de Errores Controlados. Listado de transacciones que no cumplieron la estructura técnica.
  // Se muestran las transacciones invalidas con su identificador
  if (resultado.invalidas && resultado.invalidas.length > 0) {
    console.log("TRANSACCIONES INVALIDAS");
    
    for (let i = 0; i < resultado.invalidas.length; i++) {
      const item = resultado.invalidas[i];
      // Usamos el operador de encadenamiento opcional para mostrar el ID si está disponible
      const idMostrable = item.transaccion?.idUsuario || "N/A";
      console.log(`ID Usuario: ${idMostrable} | Motivo: ${item.motivo}`);
    }
  }

  // SECCIÓN 4: Resumen Estadístico Final del procesamiento por lotes.
  console.log("RESUMEN\n");
  console.log("Total procesadas: " + resultado.totalProcesadas);
  console.log("Validas: " + resultado.validas.length);
  console.log("Invalidas: " + resultado.invalidas.length);
  console.log("\n");
}

// EJERCICIO 8

// Definimos la función principal como asíncrona para permitir el uso de 'await'
// en la coordinación del flujo de captura y procesamiento de movimientos de inventario.
async function ejecutarEjercicio8() {                                                       

  // Inicializamos una estructura de datos tipo arreglo (mutable con 'const') para consolidar
  // el lote de movimientos que el usuario ingresará por consola antes de procesarlos.
  const movimientos = [];

  // Capturamos la cantidad de movimientos a registrar y aplicamos parseInt para
  // asegurar que el dato ingresado se interprete como un número entero válido.
  const cantidad = parseInt(prompt("¿Cuántos movimientos? "));

  // Implementamos un ciclo 'for' para recorrer e iterar sobre cada posición del lote,
  // permitiendo la captura secuencial y controlada de cada movimiento de inventario.
  for (let i = 0; i < cantidad; i++) {

    // Capturamos el identificador del producto con parseInt, garantizando que sea
    // de tipo 'number' para cumplir con la validación de tipo requerida en la lógica.
    const idProducto = parseInt(prompt("ID Producto: "));

    // Capturamos el nombre del producto como cadena de texto (string), ya que
    // es un dato descriptivo que no requiere transformación numérica.
    const nombreProducto = prompt("Nombre Producto: ");

    // Capturamos el tipo de movimiento como string; su validación ("entrada" o "salida")
    // será responsabilidad de la lógica de negocio en el módulo de procesamiento.
    const tipoMovimiento = prompt("Tipo Movimiento (entrada/salida): ");

    // Usamos parseFloat para capturar la cantidad, admitiendo valores decimales
    // que representan unidades fraccionarias en operaciones de inventario.
    const cantidadMov = parseFloat(prompt("Cantidad: "));

    // Capturamos el identificador del lote como cadena de texto;
    // su validación de no vacío se realizará en la función callback del módulo de lógica.
    const lote = prompt("Lote: ");

    // Capturamos el estado 'activo' como texto plano, ya que el prompt devuelve
    // siempre un string y se requiere una conversión explícita al tipo booleano.
    const activoTexto = prompt("Activo (true/false): ");

    // Aplicamos una estructura condicional para transformar la cadena ingresada
    // en un valor booleano estricto (true/false), evitando errores de tipo en la validación posterior.
    let activo;
    if (activoTexto === "true") {
      activo = true;
    } else if (activoTexto === "false") {
      activo = false;
    } else {
      // Si el usuario ingresa un valor distinto, se conserva el texto original
      // para que la validación con callback detecte el error de tipo y lo rechace de forma controlada.
      activo = activoTexto;
    }

    // Empaquetamos todos los datos recolectados en un objeto literal y lo insertamos
    // en el arreglo mediante el método '.push()', construyendo el lote de forma dinámica.
    movimientos.push({
      idProducto: idProducto,
      nombreProducto: nombreProducto,
      tipoMovimiento: tipoMovimiento,
      cantidad: cantidadMov,
      lote: lote,
      activo: activo
    });
  }

  // Despachamos el arreglo completo a la función de procesamiento asíncrono y usamos
  // 'await' para suspender la ejecución hasta obtener el objeto de resultados consolidado.
  const resultado = await procesarInventarioEj8(movimientos);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // SECCIÓN 1: Presentación del estado final del inventario por producto.
  // Mostramos el resumen calculado agrupado por idProducto para facilitar la lectura del operador.
  console.log("INVENTARIO FINAL POR PRODUCTO");
  console.log("\n");

  // Extraemos las claves del objeto 'inventarioFinal' mediante Object.keys() para poder
  // iterar sobre cada producto registrado y mostrar su estado de existencias.
  const productosIds = Object.keys(resultado.inventarioFinal);
  for (let i = 0; i < productosIds.length; i++) {
    const id = productosIds[i];
    const info = resultado.inventarioFinal[id];
    console.log("Producto " + id + " (" + info.nombreProducto + "): " + info.cantidad + " unidades");
  }

  console.log("\n");

  // SECCIÓN 2: Alertas de inventario negativo.
  // Verificamos la existencia del arreglo y que tenga elementos antes de iterar,
  // previniendo errores de acceso a propiedades de un arreglo vacío o indefinido.
  if (resultado.inventarioNegativo && resultado.inventarioNegativo.length > 0) {
    console.log("ALERTAS - INVENTARIO NEGATIVO");
    console.log("\n");

    // Recorremos mediante un ciclo 'for' clásico para mostrar cada alerta de forma
    // individual, indicando el producto crítico y la cantidad negativa detectada.
    for (let i = 0; i < resultado.inventarioNegativo.length; i++) {
      const prod = resultado.inventarioNegativo[i];
      console.log("ALERTA: Producto " + prod.idProducto + " (" + prod.nombreProducto + ") tiene inventario negativo: " + prod.cantidad + " unidades");
    }
    console.log("\n");
  }

  // SECCIÓN 3: Movimientos rechazados con su motivo específico.
  // El operador '&&' garantiza que no intentemos acceder a '.length' si el arreglo fuera undefined.
  if (resultado.rechazados && resultado.rechazados.length > 0) {
    console.log("MOVIMIENTOS RECHAZADOS");
    console.log("\n");

    // Iteramos sobre el arreglo de rechazados para exponer el motivo de descarte
    // de cada movimiento, facilitando la trazabilidad y auditoría del proceso.
    for (let i = 0; i < resultado.rechazados.length; i++) {
      const item = resultado.rechazados[i];
      console.log("Motivo: " + item.motivo);
    }
    console.log("\n");
  }

  // SECCIÓN 4: Resumen estadístico final del lote procesado.
  // Accedemos a '.length' de cada arreglo para presentar indicadores de gestión claros.
  console.log("RESUMEN");
  console.log("\n");
  console.log("Movimientos validos: " + resultado.validos.length);
  console.log("Movimientos rechazados: " + resultado.rechazados.length);
  console.log("\n");
}

// EJERCICIO 9

// Definimos la función principal como asíncrona para coordinar el flujo de captura
// y procesamiento de órdenes de servicio, haciendo uso de 'await' de forma controlada.
async function ejecutarEjercicio9() {                                                         

  // Inicializamos una estructura de datos tipo arreglo para consolidar el lote de órdenes
  // antes de enviarlo al módulo de procesamiento; se define con 'const' por ser la referencia inmutable.
  const ordenes = [];

  // Capturamos la cantidad total de órdenes a ingresar y aplicamos parseInt para
  // convertir la cadena del prompt a un número entero que delimita el ciclo de captura.
  const cantidad = parseInt(prompt("¿Cuántas órdenes? "));

  // Implementamos un ciclo 'for' clásico para iterar de forma secuencial sobre
  // cada orden, garantizando la recolección ordenada y controlada del lote completo.
  for (let i = 0; i < cantidad; i++) {

    // Usamos parseFloat para capturar el ID, lo que permite que valores decimales
    // como 4.5 ingresen al sistema y sean detectados por la validación de Number.isInteger() en la lógica.
    const id = parseFloat(prompt("ID: "));

    // Capturamos el nombre del cliente como cadena de texto (string); su validación
    // de no vacío se delega a la función con callback en el módulo de procesamiento.
    const cliente = prompt("Cliente: ");

    // Capturamos el tipo de servicio como string; los valores permitidos
    // ("mantenimiento", "instalacion", "soporte") son verificados por la promesa de validación.
    const tipoServicio = prompt("Tipo de servicio (mantenimiento/instalacion/soporte): ");

    // Aplicamos parseFloat para las horas, admitiendo valores decimales que representan
    // fracciones de hora en servicios técnicos de duración variable.
    const horas = parseFloat(prompt("Horas: "));

    // Capturamos el estado de pago como texto plano, dado que el prompt devuelve
    // siempre un string y se requiere una conversión manual al tipo booleano estricto.
    const pagadoTexto = prompt("Pagado (true/false): ");

    // Aplicamos una estructura condicional para transformar la cadena de texto en un
    // valor booleano real, cumpliendo con la validación estricta de tipo requerida por la lógica de negocio.
    let pagado;
    if (pagadoTexto === "true") {
      pagado = true;
    } else if (pagadoTexto === "false") {
      pagado = false;
    } else {
      // Si la entrada no coincide con "true" o "false", conservamos el texto original
      // para que la validación con promesa detecte el error de tipo y lo gestione de forma controlada.
      pagado = pagadoTexto;
    }

    // Construimos el objeto de orden con los datos recolectados y lo añadimos al arreglo
    // mediante '.push()', manteniendo la integridad del lote sin modificar datos anteriores.
    ordenes.push({
      id: id,
      cliente: cliente,
      tipoServicio: tipoServicio,
      horas: horas,
      pagado: pagado
    });
  }

  // Enviamos el arreglo completo al módulo de procesamiento asíncrono y empleamos 'await'
  // para pausar la ejecución hasta recibir el objeto de resultados con órdenes y errores.
  const resultado = await procesarOrdenesEj9(ordenes);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // SECCIÓN 1: Presentación de órdenes procesadas correctamente.
  // Verificamos la existencia y contenido del arreglo antes de iterar para evitar
  // accesos a propiedades de estructuras vacías o indefinidas.
  if (resultado.procesadas && resultado.procesadas.length > 0) {
    console.log("ORDENES PROCESADAS CORRECTAMENTE");
    console.log("\n");

    // Recorremos el arreglo con un ciclo 'for' clásico para mostrar el detalle
    // completo de cada orden aprobada, incluyendo el costo total calculado por la función pura.
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

  // SECCIÓN 2: Presentación de órdenes con errores de validación o proceso.
  // El operador '&&' previene errores de ejecución si el arreglo no existe en el objeto de respuesta.
  if (resultado.errores && resultado.errores.length > 0) {
    console.log("ORDENES CON ERRORES");
    console.log("\n");

    // Iteramos sobre el arreglo de errores para mostrar el ID afectado y el mensaje
    // descriptivo generado por el bloque try/catch en la fase de validación o cálculo.
    for (let i = 0; i < resultado.errores.length; i++) {
      const error = resultado.errores[i];
      console.log("Error en orden " + error.id);
      console.log("  Mensaje: " + error.mensaje);
      console.log("");
    }
  }

  // Presentamos el estado general del proceso, confirmando si el ciclo de procesamiento
  // se completó exitosamente o si fue interrumpido por un error crítico inesperado.
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

async function ejecutarEjercicio13() {                                                            //EJERCICIO 13
  
  // Se crea el arreglo para guardar solicitudes
  const solicitudes = [];
  
  // Se pregunta cuantas solicitudes va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

  // Se recorre para capturar cada solicitud
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const usuario = prompt("Usuario: ");
    const tipo = prompt("Tipo (hardware/software/red): ");
    const prioridad = parseInt(prompt("Prioridad (1-5): "));
    const descripcion = prompt("Descripción (mínimo 10 caracteres): ");
    
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
    solicitudes.push({
      id: id,
      usuario: usuario,
      tipo: tipo,
      prioridad: prioridad,
      descripcion: descripcion,
      activo: activo
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarSolicitudesEj13(solicitudes);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestra el resumen general
  console.log("RESUMEN");
  console.log("\n");
  console.log("Total recibidas: " + resultado.resumen.totalRecibidas);
  console.log("Validas: " + resultado.resumen.validas);
  console.log("Invalidas: " + resultado.resumen.invalidas);
  console.log("\n");

  // Se muestran las solicitudes invalidas
  if (resultado.solicitudesInvalidas && resultado.solicitudesInvalidas.length > 0) {
    console.log("SOLICITUDES INVALIDAS");
    console.log("\n");
    
    // Se recorre cada solicitud invalida
    for (let i = 0; i < resultado.solicitudesInvalidas.length; i++) {
      const sol = resultado.solicitudesInvalidas[i];
      console.log("ID " + sol.id + ": " + sol.error);
      console.log("");
    }
  }

  // Se muestran las solicitudes procesadas
  if (resultado.solicitudesProcesadas && resultado.solicitudesProcesadas.length > 0) {
    console.log("SOLICITUDES PROCESADAS");
    console.log("\n");
    
    // Se recorre cada solicitud procesada
    for (let i = 0; i < resultado.solicitudesProcesadas.length; i++) {
      const sol = resultado.solicitudesProcesadas[i];
      console.log("Solicitud " + sol.id);
      console.log("  Tipo: " + sol.tipo);
      console.log("  Prioridad: " + sol.prioridad);
      console.log("  Clasificacion: " + sol.clasificacion);
      console.log("  Estado: " + sol.estadoFinal);
      console.log("");
    }
  }

  console.log("\n");
}

async function ejecutarEjercicio14() {                                                            //EJERCICIO 14
  
  // Se crea el arreglo para guardar transacciones
  const transacciones = [];
  
  // Se pregunta cuantas transacciones va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas transacciones? "));

  // Se recorre para capturar cada transaccion
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const cliente = prompt("Cliente: ");
    const tipo = prompt("Tipo (deposito/retiro/transferencia): ");
    const monto = parseFloat(prompt("Monto: "));
    
    // Se captura autorizado como texto
    const autorizadoTexto = prompt("Autorizado (true/false): ");
    
    // Se convierte a booleano
    let autorizado;
    if (autorizadoTexto === "true") {
      autorizado = true;
    } else if (autorizadoTexto === "false") {
      autorizado = false;
    } else {
      autorizado = autorizadoTexto;
    }
    
    // Se agrega al arreglo
    transacciones.push({
      id: id,
      cliente: cliente,
      tipo: tipo,
      monto: monto,
      autorizado: autorizado
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarTransaccionesEj14(transacciones);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestra el resumen general
  console.log("RESUMEN GENERAL");
  console.log("\n");
  console.log("Transacciones procesadas: " + resultado.totalProcesadas);
  console.log("Transacciones validas: " + resultado.validas);
  console.log("Transacciones rechazadas: " + resultado.rechazadas);
  console.log("Total en depositos: $" + resultado.totalDepositos);
  console.log("Total en retiros: $" + resultado.totalRetiros);
  console.log("\n");

  // Se muestran las transacciones rechazadas
  if (resultado.errores && resultado.errores.length > 0) {
    console.log("TRANSACCIONES RECHAZADAS");
    console.log("\n");
    
    // Se recorre cada transaccion rechazada
    for (let i = 0; i < resultado.errores.length; i++) {
      const err = resultado.errores[i];
      console.log("ID " + err.id + ": " + err.motivo);
      console.log("");
    }
  }

  console.log("\n");
}

async function ejecutarEjercicio15() {                                                            //EJERCICIO 15
  
  // Se crea el arreglo para guardar solicitudes
  const solicitudes = [];
  
  // Se pregunta cuantas solicitudes va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

  // Se recorre para capturar cada solicitud
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const usuario = prompt("Usuario: ");
    const tipo = prompt("Tipo (hardware/software/red): ");
    const nivel = parseInt(prompt("Nivel de urgencia (1-5): "));
    
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
    solicitudes.push({
      id: id,
      usuario: usuario,
      tipo: tipo,
      nivel: nivel,
      activo: activo
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarSolicitudesEj15(solicitudes);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestra el resumen general
  console.log("RESUMEN");
  console.log("\n");
  console.log("Total recibidas: " + resultado.resumen.totalRecibidas);
  console.log("Validas: " + resultado.resumen.validas);
  console.log("Invalidas: " + resultado.resumen.invalidas);
  console.log("\n");

  // Se muestran las solicitudes invalidas
  if (resultado.solicitudesInvalidas && resultado.solicitudesInvalidas.length > 0) {
    console.log("SOLICITUDES INVALIDAS");
    console.log("\n");
    
    // Se recorre cada solicitud invalida
    for (let i = 0; i < resultado.solicitudesInvalidas.length; i++) {
      const sol = resultado.solicitudesInvalidas[i];
      console.log("ID " + sol.id + ": " + sol.error);
      console.log("");
    }
  }

  // Se muestran las solicitudes procesadas
  if (resultado.solicitudesProcesadas && resultado.solicitudesProcesadas.length > 0) {
    console.log("SOLICITUDES PROCESADAS");
    console.log("\n");
    
    // Se recorre cada solicitud procesada
    for (let i = 0; i < resultado.solicitudesProcesadas.length; i++) {
      const sol = resultado.solicitudesProcesadas[i];
      console.log("Solicitud " + sol.id);
      console.log("  Usuario: " + sol.usuario);
      console.log("  Tipo: " + sol.tipo);
      console.log("  Nivel: " + sol.nivel);
      console.log("  Clasificacion: " + sol.clasificacion);
      console.log("  Estado: " + sol.estadoFinal);
      console.log("");
    }
  }

  console.log("\n");
}

async function ejecutarEjercicio16() {                                                            //EJERCICIO 16
  
  // Se crea el arreglo para guardar solicitudes
  const solicitudes = [];
  
  // Se pregunta cuantas solicitudes va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

  // Se recorre para capturar cada solicitud
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const usuario = prompt("Usuario: ");
    const tipo = prompt("Tipo (hardware/software/red): ");
    const prioridad = parseInt(prompt("Prioridad (1-5): "));
    const descripcion = prompt("Descripción (mínimo 10 caracteres): ");
    
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
    solicitudes.push({
      id: id,
      usuario: usuario,
      tipo: tipo,
      prioridad: prioridad,
      descripcion: descripcion,
      activo: activo
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarSolicitudesEj16(solicitudes);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestra el resumen general
  console.log("RESUMEN");
  console.log("\n");
  console.log("Total recibidas: " + resultado.resumen.totalRecibidas);
  console.log("Validas: " + resultado.resumen.validas);
  console.log("Invalidas: " + resultado.resumen.invalidas);
  console.log("\n");

  // Se muestran las solicitudes invalidas
  if (resultado.solicitudesInvalidas && resultado.solicitudesInvalidas.length > 0) {
    console.log("SOLICITUDES INVALIDAS");
    console.log("\n");
    
    // Se recorre cada solicitud invalida
    for (let i = 0; i < resultado.solicitudesInvalidas.length; i++) {
      const sol = resultado.solicitudesInvalidas[i];
      console.log("ID " + sol.id + ": " + sol.error);
      console.log("");
    }
  }

  // Se muestran las solicitudes procesadas
  if (resultado.solicitudesProcesadas && resultado.solicitudesProcesadas.length > 0) {
    console.log("SOLICITUDES PROCESADAS");
    console.log("\n");
    
    // Se recorre cada solicitud procesada
    for (let i = 0; i < resultado.solicitudesProcesadas.length; i++) {
      const sol = resultado.solicitudesProcesadas[i];
      console.log("Solicitud " + sol.id);
      console.log("  Tipo: " + sol.tipo);
      console.log("  Prioridad: " + sol.prioridad);
      console.log("  Clasificacion: " + sol.clasificacion);
      console.log("  Estado: " + sol.estadoFinal);
      console.log("");
    }
  }

  console.log("\n");
}

async function ejecutarEjercicio17() {                                                            //EJERCICIO 17
  
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
      id = parseFloat(idTexto);
    }
    
    // Se capturan los demas campos
    const cliente = prompt("Cliente: ");
    const tipo = prompt("Tipo (deposito/retiro/transferencia): ");
    const monto = parseFloat(prompt("Monto: "));
    
    // Se captura autorizado como texto
    const autorizadoTexto = prompt("Autorizado (true/false): ");
    
    // Se convierte a booleano
    let autorizado;
    if (autorizadoTexto === "true") {
      autorizado = true;
    } else if (autorizadoTexto === "false") {
      autorizado = false;
    } else {
      autorizado = autorizadoTexto;
    }
    
    // Se agrega al arreglo
    transacciones.push({
      id: id,
      cliente: cliente,
      tipo: tipo,
      monto: monto,
      autorizado: autorizado
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarTransaccionesEj17(transacciones);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestra el resumen
  console.log("RESUMEN");
  console.log("\n");
  console.log("Transacciones procesadas: " + resultado.totalProcesadas);
  console.log("Transacciones validas: " + resultado.validas);
  console.log("Transacciones rechazadas: " + resultado.rechazadas);
  console.log("Total depositos: $" + resultado.totalDepositos);
  console.log("Total retiros: $" + resultado.totalRetiros);
  console.log("\n");

  // Se muestran las transacciones rechazadas
  if (resultado.errores && resultado.errores.length > 0) {
    console.log("TRANSACCIONES RECHAZADAS");
    console.log("\n");
    
    // Se recorre cada transaccion rechazada
    for (let i = 0; i < resultado.errores.length; i++) {
      const error = resultado.errores[i];
      console.log("ID " + error.id + ": " + error.motivo);
      console.log("");
    }
  }

  console.log("\n");
}

async function ejecutarEjercicio18() {                                                            //EJERCICIO 18
  
  // Se crea el arreglo para guardar solicitudes
  const solicitudes = [];
  
  // Se pregunta cuantas solicitudes va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

  // Se recorre para capturar cada solicitud
  for (let i = 0; i < cantidad; i++) {
    
    // Se captura el ID como texto
    const idTexto = prompt("ID: ");
    
    // Se declara la variable id
    let id;
    
    // Valida si esta vacio o no es numero
    if (idTexto === "" || isNaN(idTexto)) {
      id = idTexto;
    } else {
      id = parseFloat(idTexto);
    }
    
    // Se capturan los demas campos
    const usuario = prompt("Usuario: ");
    const tipo = prompt("Tipo (hardware/software/red): ");
    const nivel = parseInt(prompt("Nivel de urgencia (1-5): "));
    
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
    solicitudes.push({
      id: id,
      usuario: usuario,
      tipo: tipo,
      nivel: nivel,
      activo: activo
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarSolicitudesEj18(solicitudes);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestra el resumen general
  console.log("RESUMEN");
  console.log("\n");
  console.log("Total recibidas: " + resultado.resumen.totalRecibidas);
  console.log("Validas: " + resultado.resumen.validas);
  console.log("Invalidas: " + resultado.resumen.invalidas);
  console.log("\n");

  // Se muestran las solicitudes invalidas
  if (resultado.solicitudesInvalidas && resultado.solicitudesInvalidas.length > 0) {
    console.log("SOLICITUDES INVALIDAS");
    console.log("\n");
    
    // Se recorre cada solicitud invalida
    for (let i = 0; i < resultado.solicitudesInvalidas.length; i++) {
      const sol = resultado.solicitudesInvalidas[i];
      console.log("ID " + sol.id + ": " + sol.motivo);
      console.log("");
    }
  }

  // Se muestran las solicitudes procesadas
  if (resultado.solicitudesValidas && resultado.solicitudesValidas.length > 0) {
    console.log("SOLICITUDES PROCESADAS");
    console.log("\n");
    
    // Se recorre cada solicitud procesada
    for (let i = 0; i < resultado.solicitudesValidas.length; i++) {
      const sol = resultado.solicitudesValidas[i];
      console.log("Solicitud " + sol.id);
      console.log("  Usuario: " + sol.usuario);
      console.log("  Tipo: " + sol.tipo);
      console.log("  Nivel: " + sol.nivel);
      console.log("  Prioridad: " + sol.prioridad);
      console.log("  Estado: " + sol.estadoFinal);
      console.log("");
    }
  }

  console.log("\n");
}

async function ejecutarEjercicio19() {                                                              //EJERCICIO 19
  
  // Se crea el arreglo para guardar solicitudes
  const solicitudes = [];
  
  // Se pregunta cuantas solicitudes va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

  // Se recorre para capturar cada solicitud
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const usuario = prompt("Usuario: ");
    const area = prompt("Área: ");
    const tipoProblema = prompt("Tipo de problema: ");
    const prioridad = parseInt(prompt("Prioridad (1-5): "));
    
    // El estado siempre es pendiente inicialmente
    const estado = "pendiente";
    
    // Se agrega al arreglo
    solicitudes.push({
      id: id,
      usuario: usuario,
      area: area,
      tipoProblema: tipoProblema,
      prioridad: prioridad,
      estado: estado
    });
  }

  console.log("\n");
  console.log("PROCESANDO SOLICITUDES...");
  console.log("\n");

  // Se procesa el arreglo completo
  const resultado = await procesarSolicitudesEj19(solicitudes);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestran las solicitudes atendidas
  if (resultado.solicitudesAtendidas && resultado.solicitudesAtendidas.length > 0) {
    console.log("SOLICITUDES ATENDIDAS");
    console.log("\n");
    
    // Se recorre cada solicitud atendida
    for (let i = 0; i < resultado.solicitudesAtendidas.length; i++) {
      const sol = resultado.solicitudesAtendidas[i];
      console.log("Solicitud " + sol.id);
      console.log("  Usuario: " + sol.usuario);
      console.log("  Area: " + sol.area);
      console.log("  Prioridad final: " + sol.prioridad);
      console.log("  Estado: " + sol.estado);
      console.log("");
    }
  }

  // Se muestran las solicitudes rechazadas
  if (resultado.solicitudesRechazadas && resultado.solicitudesRechazadas.length > 0) {
    console.log("SOLICITUDES RECHAZADAS");
    console.log("\n");
    
    // Se recorre cada solicitud rechazada
    for (let i = 0; i < resultado.solicitudesRechazadas.length; i++) {
      const sol = resultado.solicitudesRechazadas[i];
      console.log("Solicitud " + sol.id);
      console.log("  Motivo: " + sol.motivo);
      console.log("  Estado: " + sol.estado);
      console.log("");
    }
  }

  // Se muestra resumen final
  console.log("RESUMEN FINAL");
  console.log("\n");
  console.log("Total procesadas: " + resultado.resumen.totalProcesadas);
  console.log("Total exitosas:   " + resultado.resumen.exitosas);
  console.log("Total fallidas:   " + resultado.resumen.fallidas);
  console.log("\n");
}

async function ejecutarEjercicio20() {                                                               //EJERCICIO 20
  
  // Se crea el arreglo para guardar solicitudes
  const solicitudes = [];
  
  // Se pregunta cuantas solicitudes va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

  // Se recorre para capturar cada solicitud
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const valor = parseFloat(prompt("Valor: "));
    const estado = prompt("Estado: ");
    
    // Se captura aprobado como texto
    const aprobadoTexto = prompt("Aprobado (true/false): ");
    
    // Se convierte a booleano
    let aprobado;
    if (aprobadoTexto === "true") {
      aprobado = true;
    } else if (aprobadoTexto === "false") {
      aprobado = false;
    } else {
      aprobado = aprobadoTexto;
    }
    
    // Se agrega al arreglo
    solicitudes.push({
      id: id,
      valor: valor,
      estado: estado,
      aprobado: aprobado
    });
  }

  console.log("\n");
  console.log("ARREGLO ORIGINAL (sin modificaciones)");
  console.log("\n");
  
  // Se muestra el arreglo original
  for (let i = 0; i < solicitudes.length; i++) {
    const sol = solicitudes[i];
    console.log("Solicitud " + sol.id + ": Valor " + sol.valor + " - Estado: " + sol.estado + " - Aprobado: " + sol.aprobado);
  }

  console.log("\n");
  console.log("PROCESANDO SOLICITUDES...");
  console.log("\n");

  // Se procesa el arreglo completo
  const resultado = await procesarSolicitudesEj20(solicitudes);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestran las solicitudes aprobadas
  if (resultado.aprobadas && resultado.aprobadas.length > 0) {
    console.log("SOLICITUDES APROBADAS O EN REVISION");
    console.log("\n");
    
    // Se recorre cada solicitud aprobada
    for (let i = 0; i < resultado.aprobadas.length; i++) {
      const sol = resultado.aprobadas[i];
      console.log("Solicitud " + sol.id);
      console.log("  Valor: " + sol.valor);
      console.log("  Estado final: " + sol.estadoFinal);
      console.log("  Motivo: " + sol.motivo);
      console.log("");
    }
  }

  // Se muestran las solicitudes rechazadas
  if (resultado.rechazadas && resultado.rechazadas.length > 0) {
    console.log("SOLICITUDES RECHAZADAS");
    console.log("\n");
    
    // Se recorre cada solicitud rechazada
    for (let i = 0; i < resultado.rechazadas.length; i++) {
      const sol = resultado.rechazadas[i];
      console.log("Solicitud " + sol.id);
      console.log("  Motivo: " + sol.motivo);
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
      console.log("Solicitud " + (error.id || "desconocido"));
      console.log("  Error: " + error.error);
      console.log("");
    }
  }

  // Se muestra resumen general
  console.log("RESUMEN GENERAL");
  console.log("\n");
  console.log("Total aprobadas:  " + resultado.resumen.totalAprobadas);
  console.log("Total rechazadas: " + resultado.resumen.totalRechazadas);
  console.log("Total con error:  " + resultado.resumen.totalErrores);
  console.log("\n");
}

async function ejecutarEjercicio21() {                                                                //EJERCICIO 21
  
  // Se crea el arreglo para guardar solicitudes
  const solicitudes = [];
  
  // Se pregunta cuantas solicitudes va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

  // Se recorre para capturar cada solicitud
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const usuario = prompt("Usuario: ");
    const tipo = prompt("Tipo (hardware/software/red): ");
    const prioridad = parseInt(prompt("Prioridad (1-5): "));
    
    // El estado normalmente es pendiente
    // Solo se pregunta si se quiere probar un estado invalido (Caso 7)
    let estado = "pendiente";
    const cambiarEstado = prompt("¿Probar estado invalido? (si/no): ");
    if (cambiarEstado === "si") {
      estado = prompt("Estado: ");
    }
    
    // Se agrega al arreglo
    solicitudes.push({
      id: id,
      usuario: usuario,
      tipo: tipo,
      prioridad: prioridad,
      estado: estado
    });
  }

  console.log("\n");
  console.log("ARREGLO ORIGINAL (sin modificaciones)");
  console.log("\n");
  
  // Se muestra el arreglo original
  for (let i = 0; i < solicitudes.length; i++) {
    const sol = solicitudes[i];
    console.log("Solicitud " + sol.id + ": " + sol.usuario + " - " + sol.tipo + " - Prioridad: " + sol.prioridad);
  }

  console.log("\n");
  console.log("PROCESANDO SOLICITUDES...");
  console.log("\n");

  // Se procesa el arreglo completo
  const resultado = await procesarSolicitudesEj21(solicitudes);

  console.log("\n");
  console.log("NUEVO ARREGLO PROCESADO");
  console.log("\n");

  // Se muestran las solicitudes procesadas con clasificacion y nuevo estado
  if (resultado.procesadas && resultado.procesadas.length > 0) {
    console.log("SOLICITUDES PROCESADAS");
    console.log("\n");
    
    // Se recorre cada solicitud procesada
    for (let i = 0; i < resultado.procesadas.length; i++) {
      const sol = resultado.procesadas[i];
      console.log("Solicitud " + sol.id);
      console.log("  Usuario: " + sol.usuario);
      console.log("  Tipo: " + sol.tipo);
      console.log("  Clasificacion: " + sol.clasificacion);
      console.log("  Estado final: " + sol.estadoFinal);
      console.log("");
    }
  }

  // Se muestran las solicitudes rechazadas
  if (resultado.rechazadas && resultado.rechazadas.length > 0) {
    console.log("SOLICITUDES RECHAZADAS");
    console.log("\n");
    
    // Se recorre cada solicitud rechazada
    for (let i = 0; i < resultado.rechazadas.length; i++) {
      const sol = resultado.rechazadas[i];
      console.log("Solicitud " + sol.id);
      console.log("  Motivo: " + sol.motivo);
      console.log("");
    }
  }

  console.log("\n");
}

async function ejecutarEjercicio22() {                                                            //EJERCICIO 22
  
  // Se crea el arreglo para guardar solicitudes
  const solicitudes = [];
  
  // Se pregunta cuantas solicitudes va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

  // Se recorre para capturar cada solicitud
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const nombre = prompt("Nombre del solicitante: ");
    const tipo = prompt("Tipo de solicitud: ");
    const prioridad = parseInt(prompt("Prioridad (1-5): "));
    
    // Se captura estado como texto
    const estadoTexto = prompt("Estado (true/false): ");
    
    // Se convierte a booleano
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

  // Se procesa el arreglo completo
  const resultado = await procesarSolicitudesEj22(solicitudes);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestra el resumen general
  console.log("RESUMEN");
  console.log("\n");
  console.log("Total recibidas: " + resultado.resumen.totalRecibidas);
  console.log("Validas: " + resultado.resumen.validas);
  console.log("Invalidas: " + resultado.resumen.invalidas);
  console.log("Aprobadas: " + resultado.resumen.aprobadas);
  console.log("Rechazadas: " + resultado.resumen.rechazadas);
  console.log("\n");

  // Se muestran las solicitudes invalidas
  if (resultado.solicitudesInvalidas && resultado.solicitudesInvalidas.length > 0) {
    console.log("SOLICITUDES INVALIDAS");
    console.log("\n");
    
    // Se recorre cada solicitud invalida
    for (let i = 0; i < resultado.solicitudesInvalidas.length; i++) {
      const sol = resultado.solicitudesInvalidas[i];
      console.log("ID " + sol.id + ": " + sol.error);
      console.log("");
    }
  }

  // Se muestran las solicitudes rechazadas
  if (resultado.solicitudesRechazadas && resultado.solicitudesRechazadas.length > 0) {
    console.log("SOLICITUDES RECHAZADAS");
    console.log("\n");
    
    // Se recorre cada solicitud rechazada
    for (let i = 0; i < resultado.solicitudesRechazadas.length; i++) {
      const sol = resultado.solicitudesRechazadas[i];
      console.log("ID " + sol.id + ": " + sol.motivo);
      console.log("");
    }
  }

  // Se muestran las solicitudes aprobadas
  if (resultado.solicitudesAprobadas && resultado.solicitudesAprobadas.length > 0) {
    console.log("SOLICITUDES APROBADAS");
    console.log("\n");
    
    // Se recorre cada solicitud aprobada
    for (let i = 0; i < resultado.solicitudesAprobadas.length; i++) {
      const sol = resultado.solicitudesAprobadas[i];
      console.log("Solicitud " + sol.id);
      console.log("  Nombre: " + sol.nombre);
      console.log("  Tipo: " + sol.tipo);
      console.log("  Prioridad: " + sol.prioridad);
      console.log("  Clasificacion: " + sol.clasificacion);
      console.log("  Estado: " + sol.estadoFinal);
      console.log("");
    }
  }

  console.log("\n");
}

async function ejecutarEjercicio23() {                                                            //EJERCICIO 23
  
  // Se crea el arreglo para guardar operaciones
  const operaciones = [];
  
  // Se pregunta cuantas operaciones va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas operaciones? "));

  // Se recorre para capturar cada operacion
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const tipoOperacion = prompt("Tipo de operación: ");
    const valor = parseFloat(prompt("Valor: "));
    
    // Se captura estado como texto
    const estadoTexto = prompt("Estado (true/false): ");
    
    // Se convierte a booleano
    let estado;
    if (estadoTexto === "true") {
      estado = true;
    } else if (estadoTexto === "false") {
      estado = false;
    } else {
      estado = estadoTexto;
    }
    
    const prioridad = parseInt(prompt("Prioridad (1-5): "));
    
    // Se agrega la operacion completa
    operaciones.push({
      id: id,
      tipoOperacion: tipoOperacion,
      valor: valor,
      estado: estado,
      prioridad: prioridad
    });
  }

  // Se procesa el arreglo completo
  const resultado = await procesarSolicitudesEj23(operaciones);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestra el resumen general
  console.log("RESUMEN");
  console.log("\n");
  console.log("Total procesadas: " + resultado.resumen.totalProcesadas);
  console.log("Validas: " + resultado.resumen.validas);
  console.log("Invalidas: " + resultado.resumen.invalidas);
  console.log("Aprobadas: " + resultado.resumen.aprobadas);
  console.log("Rechazadas: " + resultado.resumen.rechazadas);
  console.log("\n");

  // Se muestran las operaciones invalidas
  if (resultado.operacionesInvalidas && resultado.operacionesInvalidas.length > 0) {
    console.log("OPERACIONES INVALIDAS");
    console.log("\n");
    
    // Se recorre cada operacion invalida
    for (let i = 0; i < resultado.operacionesInvalidas.length; i++) {
      const op = resultado.operacionesInvalidas[i];
      console.log("ID " + op.id + ": " + op.error);
      console.log("");
    }
  }

  // Se muestran las operaciones rechazadas
  if (resultado.operacionesRechazadas && resultado.operacionesRechazadas.length > 0) {
    console.log("OPERACIONES RECHAZADAS");
    console.log("\n");
    
    // Se recorre cada operacion rechazada
    for (let i = 0; i < resultado.operacionesRechazadas.length; i++) {
      const op = resultado.operacionesRechazadas[i];
      console.log("ID " + op.id + ": " + op.motivo);
      console.log("");
    }
  }

  // Se muestran las operaciones aprobadas
  if (resultado.operacionesAprobadas && resultado.operacionesAprobadas.length > 0) {
    console.log("OPERACIONES APROBADAS");
    console.log("\n");
    
    // Se recorre cada operacion aprobada
    for (let i = 0; i < resultado.operacionesAprobadas.length; i++) {
      const op = resultado.operacionesAprobadas[i];
      console.log("Operacion " + op.id);
      console.log("  Tipo: " + op.tipoOperacion);
      console.log("  Valor: " + op.valor);
      console.log("  Prioridad: " + op.prioridad);
      console.log("  Clasificacion: " + op.clasificacion);
      console.log("  Estado: " + op.estadoFinal);
      console.log("");
    }
  }

  console.log("\n");
}

async function ejecutarEjercicio24() {                                                            //EJERCICIO 24
  
  // Se crea el arreglo para guardar solicitudes
  const solicitudes = [];
  
  // Se pregunta cuantas solicitudes va a ingresar
  const cantidad = parseInt(prompt("¿Cuántas solicitudes? "));

  // Se recorre para capturar cada solicitud
  for (let i = 0; i < cantidad; i++) {
    
    // Se capturan los datos basicos
    const id = parseInt(prompt("ID: "));
    const nombre = prompt("Nombre del solicitante: ");
    const edad = parseInt(prompt("Edad: "));
    const rol = prompt("Rol solicitado: ");
    
    // Se capturan los permisos
    const permisosTexto = prompt("Permisos (separados por coma): ");
    
    // Se procesan los permisos
    let permisos;
    
    // Si esta vacio, se asigna array vacio
    if (permisosTexto.trim() === "") {
      permisos = [];
    } else {
      // Se separa por comas y se elimina espacios
      permisos = permisosTexto.split(",").map(p => p.trim());
    }
    
    const estado = prompt("Estado: ");
    
    // Se captura aceptaCondiciones como texto
    const aceptaTexto = prompt("Acepta condiciones (true/false): ");
    
    // Se convierte a booleano
    let aceptaCondiciones;
    if (aceptaTexto === "true") {
      aceptaCondiciones = true;
    } else if (aceptaTexto === "false") {
      aceptaCondiciones = false;
    } else {
      aceptaCondiciones = aceptaTexto;
    }
    
    // Se agrega la solicitud completa
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

  // Se procesa el arreglo completo
  const resultado = await procesarSolicitudesEj24(solicitudes);

  console.log("\n");
  console.log("RESULTADOS DEL PROCESAMIENTO");
  console.log("\n");

  // Se muestra el resumen general
  console.log("RESUMEN");
  console.log("\n");
  console.log("Total recibidas: " + resultado.resumen.totalRecibidas);
  console.log("Validas: " + resultado.resumen.validas);
  console.log("Invalidas: " + resultado.resumen.invalidas);
  console.log("Aprobadas: " + resultado.resumen.aprobadas);
  console.log("Rechazadas: " + resultado.resumen.rechazadas);
  console.log("En revision: " + resultado.resumen.enRevision);
  console.log("\n");

  // Se muestran las solicitudes invalidas
  if (resultado.solicitudesInvalidas && resultado.solicitudesInvalidas.length > 0) {
    console.log("SOLICITUDES INVALIDAS");
    console.log("\n");
    
    // Se recorre cada solicitud invalida
    for (let i = 0; i < resultado.solicitudesInvalidas.length; i++) {
      const sol = resultado.solicitudesInvalidas[i];
      console.log("ID " + sol.id + ": " + sol.error);
      console.log("");
    }
  }

  // Se muestran las solicitudes rechazadas
  if (resultado.solicitudesRechazadas && resultado.solicitudesRechazadas.length > 0) {
    console.log("SOLICITUDES RECHAZADAS");
    console.log("\n");
    
    // Se recorre cada solicitud rechazada
    for (let i = 0; i < resultado.solicitudesRechazadas.length; i++) {
      const sol = resultado.solicitudesRechazadas[i];
      console.log("ID " + sol.id + ": " + sol.motivo);
      console.log("");
    }
  }

  // Se muestran las solicitudes en revision
  if (resultado.solicitudesEnRevision && resultado.solicitudesEnRevision.length > 0) {
    console.log("SOLICITUDES EN REVISION");
    console.log("\n");
    
    // Se recorre cada solicitud en revision
    for (let i = 0; i < resultado.solicitudesEnRevision.length; i++) {
      const sol = resultado.solicitudesEnRevision[i];
      console.log("ID " + sol.id);
      console.log("  Nombre: " + sol.nombre);
      console.log("  Motivo: " + sol.motivo);
      console.log("");
    }
  }

  // Se muestran las solicitudes aprobadas
  if (resultado.solicitudesAprobadas && resultado.solicitudesAprobadas.length > 0) {
    console.log("SOLICITUDES APROBADAS");
    console.log("\n");
    
    // Se recorre cada solicitud aprobada
    for (let i = 0; i < resultado.solicitudesAprobadas.length; i++) {
      const sol = resultado.solicitudesAprobadas[i];
      console.log("Solicitud " + sol.id);
      console.log("  Nombre: " + sol.nombre);
      console.log("  Edad: " + sol.edad);
      console.log("  Rol: " + sol.rol);
      console.log("  Permisos: " + sol.permisos.join(", "));
      console.log("  Estado: " + sol.estadoFinal);
      console.log("");
    }
  }

  console.log("\n");
}

// EJECUCIÓN
menuGeneral();

