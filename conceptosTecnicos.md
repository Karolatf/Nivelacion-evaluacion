# Guía de Conceptos Técnicos - Referencia para Exposición

##  ÍNDICE DE CONCEPTOS

1. Arreglos vs Contadores
2. Const vs Let vs Var
3. Callback vs Promesas vs Async/Await
4. Try/Catch - Manejo de errores
5. Inmutabilidad (spread operator)
6. Ciclos: for vs forEach vs map
7. Operadores lógicos
8. Validación de tipos de datos
9. Funciones puras
10. Return vs Console.log

--

## 1. ARREGLOS VS CONTADORES

### ¿Cuándo usar ARREGLOS?

**Uso un arreglo cuando necesito:**
- Guardar TODA la información de cada elemento
- Retornar CUÁLES fueron los elementos procesados
- Consultar los datos completos después

**Ejemplo:**
```javascript
const validas = [];  // Guarda objetos completos

validas.push(transaccion);  // Guarda {id: 1, usuario: "Ana", monto: 100...}

// Puedo ver cuáles fueron:
console.log(validas);  // [{id: 1...}, {id: 2...}, {id: 3...}]

// Puedo contar cuántas:
console.log(validas.length);  // 3
```

**Ventajas:**
- No pierdo información
- Puedo mostrar detalles al usuario
- Puedo hacer operaciones con los datos después

**Desventajas:**
- Usa más memoria
- Más complejo si solo necesito el número

--

### ¿Cuándo usar CONTADORES?

**Uso un contador cuando necesito:**
- Solo saber CUÁNTOS elementos hay
- No me importa CUÁLES fueron
- Solo necesito un número final

**Ejemplo:**
```javascript
let totalIngresos = 0;  // Contador simple

totalIngresos += monto;  // Solo suma números
totalIngresos += 500;    // totalIngresos = 500
totalIngresos += 300;    // totalIngresos = 800

// Solo sé el total:
console.log(totalIngresos);  // 800

// NO sé cuáles fueron los montos individuales
```

**Ventajas:**
- Más simple
- Usa menos memoria
- Más eficiente para operaciones matemáticas

**Desventajas:**
- Pierdo la información individual
- Solo tengo el resultado final

--

### ¿Cuándo usar AMBOS?

**Uso ARREGLOS + CONTADORES cuando:**
- Necesito los detalles (arreglo)
- Y también necesito un resumen numérico (contador)

**Ejemplo del Ejercicio 4:**
```javascript
const validas = [];        // Para guardar las transacciones completas
let totalIngresos = 0;     // Para sumar solo los montos

// Proceso una transacción válida:
validas.push(transaccion);           // Guardo la transacción completa
totalIngresos += transaccion.monto;  // Sumo solo el monto

// Al final tengo:
// - La lista completa de transacciones válidas (validas)
// - El total de dinero en ingresos (totalIngresos)
```

**¿Por qué no uso validas.length para contar?**
Porque `validas.length` me da CUÁNTAS transacciones hay, pero NO me da la SUMA de los montos.

--

### Justificación en exposición:

**Si me preguntan: "¿Por qué usaste un arreglo?"**

*"Usé un arreglo porque necesito retornar no solo la cantidad, sino también CUÁLES fueron las transacciones válidas/inválidas/sospechosas. Si usara solo un contador, tendría el número pero perdería toda la información de cada transacción."*

**Si me preguntan: "¿Por qué usaste contadores si tienes arreglos?"**

*"Usé contadores para los totales de ingresos y egresos porque ahí solo necesito sumar los montos, no guardar cada transacción individual. Es más eficiente sumar directamente que guardar todo y después recorrer el arreglo para sumar."*

--

## 2. CONST VS LET VS VAR

### const (constante)

**Cuándo usar:**
- Cuando el valor NO va a cambiar
- Para arreglos y objetos que solo voy a modificar por dentro
- Para funciones

**Ejemplo:**
```javascript
const validas = [];  // El arreglo no cambia, pero su contenido sí

validas.push(item);  // Correcto - modifico el contenido
validas = [];        // Error - no puedo reasignar

const PI = 3.14159;
PI = 3.14;          // Error - no puedo cambiar el valor
```

**Por qué es bueno:**
- Evita errores accidentales
- Código más seguro
- Más claro para otros programadores

--

### let (variable)

**Cuándo usar:**
- Cuando el valor SÍ va a cambiar
- Para contadores
- Para acumuladores

**Ejemplo:**
```javascript
let contador = 0;
contador++;         // Correcto - puedo cambiar el valor
contador = 10;      // Correcto

let total = 0;
total += 100;       // Correcto
```

--

### var (NO USAR)

**Por qué NO usarlo:**
- Es la forma antigua de JavaScript
- Puede causar errores difíciles de detectar
- No respeta el alcance de bloque

**En lugar de var, siempre usar const o let.**

--

### Justificación en exposición:

**Si me preguntan: "¿Por qué usaste const para el arreglo si lo estás modificando?"**

*"Usé const porque el arreglo en sí no cambia de referencia. Lo que modifico es su CONTENIDO con .push(), pero la variable 'validas' siempre apunta al mismo arreglo. Esto evita que accidentalmente reasigne la variable."*

--

## 3. CALLBACK VS PROMESAS VS ASYNC/AWAIT

### Callback

**Qué es:**
Una función que se pasa como parámetro a otra función.

**Cuándo usar:**
- Para validaciones rápidas
- Para simular procesos externos
- Cuando la guía lo pide explícitamente

**Ejemplo:**
```javascript
function validar(dato, callback) {
  setTimeout(() => {
    if (dato === null) {
      callback(new Error("Dato inválido"), null);
    } else {
      callback(null, dato);
    }
  }, 500);
}

// Uso:
validar(miDato, (error, resultado) => {
  if (error) {
    console.log("Error:", error.message);
  } else {
    console.log("Éxito:", resultado);
  }
});
```

--

### Promesas

**Qué es:**
Un objeto que representa un valor que estará disponible en el futuro.

**Cuándo usar:**
- Para operaciones asincrónicas
- Cuando necesito encadenar operaciones
- Para validaciones que toman tiempo

**Ejemplo:**
```javascript
function validar(dato) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (dato === null) {
        reject(new Error("Dato inválido"));
      } else {
        resolve(dato);
      }
    }, 500);
  });
}

// Uso:
validar(miDato)
  .then(resultado => console.log("Éxito:", resultado))
  .catch(error => console.log("Error:", error.message));
```

--

### Async/Await

**Qué es:**
Una forma más limpia de trabajar con promesas.

**Cuándo usar:**
- En la función principal
- Cuando tengo muchas operaciones asincrónicas
- Para hacer el código más legible

**Ejemplo:**
```javascript
async function procesarDatos() {
  try {
    const resultado = await validar(miDato);
    console.log("Éxito:", resultado);
  } catch (error) {
    console.log("Error:", error.message);
  }
}
```

--

### ¿Por qué usar los 3 en un mismo ejercicio?

**Justificación:**
*"La guía pide demostrar dominio de las tres formas de asincronía:*
- *Callback para validaciones rápidas (línea X)*
- *Promesas para procesos que retornan valores (línea Y)*  
- *Async/await para coordinar todo el flujo (línea Z)*

*Cada una tiene su propósito y demuestro que sé cuándo usar cada una."*

--

## 4. TRY/CATCH - MANEJO DE ERRORES

### ¿Qué hace?

**Try:** Intenta ejecutar el código
**Catch:** Captura errores si algo falla

**Ejemplo:**
```javascript
try {
  // Código que podría fallar
  const resultado = dividir(10, 0);
} catch (error) {
  // Qué hacer si falla
  console.log("Error:", error.message);
}
```

--

### ¿Por qué es importante?

**Sin try/catch:**
```javascript
const resultado = dividir(10, 0);  // El programa se detiene aquí
console.log("Esto nunca se ejecuta");
```

**Con try/catch:**
```javascript
try {
  const resultado = dividir(10, 0);
} catch (error) {
  console.log("Error:", error.message);
}
console.log("Esto SÍ se ejecuta");  // El programa continúa
```

--

### Justificación en exposición:

**Si me preguntan: "¿Por qué usaste try/catch?"**

*"Usé try/catch para garantizar que el programa nunca se detenga abruptamente. Si una transacción tiene datos inválidos, capturo el error, lo registro como transacción inválida, y continúo procesando las demás. Sin try/catch, el programa se bloquearía en el primer error."*

--

## 5. INMUTABILIDAD (SPREAD OPERATOR)

### ¿Qué es inmutabilidad?

**NO modificar los datos originales.**

**Ejemplo SIN inmutabilidad (MAL):**
```javascript
function procesarDatos(datos) {
  datos.push("nuevo");  // Modifica el arreglo original
  return datos;
}

const original = [1, 2, 3];
const procesado = procesarDatos(original);

console.log(original);  // [1, 2, 3, "nuevo"] ← Se modificó!
```

**Ejemplo CON inmutabilidad (BIEN):**
```javascript
function procesarDatos(datos) {
  const copia = [...datos];  // Crea una copia
  copia.push("nuevo");
  return copia;
}

const original = [1, 2, 3];
const procesado = procesarDatos(original);

console.log(original);   // [1, 2, 3] ← NO se modificó
console.log(procesado);  // [1, 2, 3, "nuevo"]
```

--

### Spread operator (...)

**Para arreglos:**
```javascript
const original = [1, 2, 3];
const copia = [...original];  // Crea una copia nueva
```

**Para objetos:**
```javascript
const original = {id: 1, nombre: "Ana"};
const copia = {...original};  // Crea una copia nueva
```

--

### Justificación en exposición:

**Si me preguntan: "¿Por qué usaste spread operator?"**

*"Usé el spread operator para crear una copia del arreglo original y garantizar inmutabilidad. Esto significa que el arreglo que me pasan como parámetro nunca se modifica. Si modificara el original directamente, podría causar errores en otras partes del programa que estén usando los mismos datos."*

--

## 6. CICLOS: FOR VS FOREACH VS MAP

### Ciclo for clásico

**Cuándo usar:**
- Cuando necesito usar await dentro del ciclo
- Cuando necesito control total sobre el índice
- Cuando necesito detener el ciclo con break

**Ejemplo:**
```javascript
for (let i = 0; i < array.length; i++) {
  const resultado = await procesarAsync(array[i]);
}
```

--

### forEach

**Cuándo usar:**
- Para operaciones simples sin await
- Cuando no necesito retornar nada

**Ejemplo:**
```javascript
array.forEach(item => {
  console.log(item);
});
```

**⚠️ NO funciona bien con await:**
```javascript
// MAL - no espera correctamente
array.forEach(async item => {
  await procesar(item);
});
```

--

### map

**Cuándo usar:**
- Cuando necesito transformar un arreglo
- Cuando necesito crear un nuevo arreglo

**Ejemplo:**
```javascript
const numeros = [1, 2, 3];
const dobles = numeros.map(n => n * 2);
// dobles = [2, 4, 6]
```

--

### Justificación en exposición:

**Si me preguntan: "¿Por qué usaste for en lugar de forEach?"**

*"Usé un ciclo for clásico porque dentro necesito usar await para procesar cada elemento de forma asincrónica. El forEach no maneja bien el await, podría procesar todos al mismo tiempo en lugar de uno por uno. Con el for, garantizo que cada elemento se procesa completamente antes de pasar al siguiente."*

--

## 7. OPERADORES LÓGICOS

### AND (&&)

**Significado:** "Y" - Ambas condiciones deben ser verdaderas

**Ejemplo:**
```javascript
if (edad >= 18 && aceptoCondiciones === true) {
  // Solo entra si AMBAS son verdaderas
}
```

--

### OR (||)

**Significado:** "O" - Al menos una debe ser verdadera

**Ejemplo:**
```javascript
if (tipo === "ingreso" || tipo === "egreso") {
  // Entra si es ingreso O si es egreso
}
```

--

### NOT (!)

**Significado:** "NO" - Invierte el valor

**Ejemplo:**
```javascript
if (!activo) {
  // Entra si activo es false
}
```

--

## 8. VALIDACIÓN DE TIPOS DE DATOS

### typeof

**Para validar tipos primitivos:**

```javascript
typeof "hola"     // "string"
typeof 123        // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" ← ¡Cuidado! Es un bug histórico de JS
```

**Ejemplos de validación:**
```javascript
if (typeof id !== "number") {
  throw new Error("ID debe ser un número");
}

if (typeof nombre !== "string") {
  throw new Error("Nombre debe ser texto");
}
```

--

### Array.isArray()

**Para validar arreglos:**

```javascript
Array.isArray([1, 2, 3])     // true
Array.isArray("hola")         // false
Array.isArray(null)           // false
```

**Ejemplo:**
```javascript
if (!Array.isArray(datos)) {
  throw new Error("Los datos deben ser un arreglo");
}
```

--

### Number.isInteger()

**Para validar números enteros:**

```javascript
Number.isInteger(5)       // true
Number.isInteger(5.5)     // false
Number.isInteger("5")     // false
```

**Ejemplo:**
```javascript
if (!Number.isInteger(prioridad)) {
  throw new Error("La prioridad debe ser un número entero");
}
```

--

## 9. FUNCIONES PURAS

### ¿Qué es una función pura?

**Características:**
1. Siempre retorna el mismo resultado con los mismos parámetros
2. No modifica nada fuera de la función
3. No tiene efectos secundarios

**Ejemplo de función PURA:**
```javascript
function sumar(a, b) {
  return a + b;  // Solo retorna, no modifica nada
}

sumar(2, 3);  // Siempre retorna 5
```

**Ejemplo de función NO PURA:**
```javascript
let total = 0;

function sumar(valor) {
  total += valor;  // Modifica una variable externa
  return total;
}
```

--

### Justificación en exposición:

**Si me preguntan: "¿Por qué esta función es pura?"**

*"Esta función es pura porque:*
1. *No modifica el objeto que recibe como parámetro*
2. *Solo analiza los datos y retorna un resultado*
3. *Siempre retorna el mismo resultado si recibe los mismos datos*
4. *No tiene efectos secundarios como modificar variables globales"*

--

## 10. RETURN VS CONSOLE.LOG

### return

**Qué hace:**
- Devuelve un valor a quien llamó la función
- Termina la ejecución de la función
- Permite usar el resultado en otras partes del código

**Ejemplo:**
```javascript
function sumar(a, b) {
  return a + b;  // Devuelve el resultado
}

const resultado = sumar(2, 3);  // resultado = 5
console.log(resultado * 2);      // Puedo usar el resultado
```

--

### console.log

**Qué hace:**
- Solo muestra algo en la consola
- NO devuelve ningún valor
- Solo sirve para ver información

**Ejemplo:**
```javascript
function sumar(a, b) {
  console.log(a + b);  // Solo muestra en consola
}

const resultado = sumar(2, 3);  // resultado = undefined
console.log(resultado * 2);      // Error: undefined * 2
```

--

### ¿Cuándo usar cada uno?

**return:** 
- En funciones que necesitan devolver un valor
- En la función principal exportada
- Cuando el resultado se va a usar después

**console.log:**
- Para debug (ver qué está pasando)
- Para mostrar mensajes al usuario en la terminal
- Para verificar que el código funciona

**Puedo usar ambos:**
```javascript
function procesar(dato) {
  console.log("Procesando:", dato);  // Para ver qué está pasando
  const resultado = dato * 2;
  return resultado;                   // Para devolver el valor
}
```

--
