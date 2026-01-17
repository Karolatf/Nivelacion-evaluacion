# Ejercicio 23 - Sistema de Procesos y Validación de Operaciones

## 1. Datos de entrada

El sistema recibe un arreglo inmutable de objetos, donde cada objeto representa una operación.

Cada operación incluye los siguientes campos:

id (number entero positivo) → Identificador único de la operación
tipoOperacion (string) → Tipo de operación a realizar
valor (number mayor a cero) → Valor asociado a la operación
estado (boolean) → Indica si la operación está activa
prioridad (number entero entre 1 y 5) → Nivel de prioridad de la operación

--

## 2. Procesos principales

Validación de datos básicos

Se verifica que cada operación cumpla las reglas mínimas antes de ser procesada:

El id debe ser un número entero positivo.
El tipoOperacion debe ser un texto no vacío.
El valor debe ser un número mayor a cero.
El estado debe ser de tipo booleano.
La prioridad debe ser un número entero entre 1 y 5.

Si alguna validación falla, se lanza un Error con un mensaje claro y controlado.
La operación se clasifica como inválida sin detener el sistema.

--

## 3. Clasificación de operaciones (Función pura)

Las operaciones válidas se clasifican según su nivel de prioridad:

Alta → Prioridad 4 o 5.
Media → Prioridad 2 o 3.
Baja → Prioridad 1.

Esta clasificación se realiza mediante una función pura.
La función no modifica los datos originales.
Solo retorna el resultado de la evaluación.
Se utiliza destructuring para extraer los campos necesarios.

--

## 4. Procesamiento asíncrono con callback

Se utiliza una función con callback para simular un procesamiento inicial del sistema.

El proceso se ejecuta de forma asíncrona usando setTimeout.
El resultado se devuelve mediante el callback.
Simula sistemas legacy o integraciones externas.
Tiempo de espera: 400 ms.

--

## 5. Procesamiento asíncrono con promesa

Cada operación válida pasa por un proceso que retorna una Promesa:

Simula una operación externa más compleja.
Utiliza setTimeout para representar tiempo de espera.
Retorna un mensaje de finalización del proceso.
Tiempo de espera: 600 ms.

--

## 6. Coordinación del flujo con async/await

El flujo completo se coordina mediante una función principal async:

Permite un flujo secuencial claro.
Facilita el manejo de errores.
Garantiza que cada operación se procese completamente antes de continuar.
Incluye un proceso adicional con async/await de 300 ms.

--

## 7. Manejo de errores

Todo el sistema está protegido mediante bloques try/catch:

Errores de validación se capturan y reportan de forma controlada.
Errores en procesos asíncronos no bloquean la ejecución.
El sistema continúa procesando las demás operaciones.
En ningún escenario el programa se detiene abruptamente.
Cada error se almacena con su ID y mensaje descriptivo.

--

## 8. Datos de salida

El sistema retorna un objeto con los siguientes datos:

resumen → Objeto con estadísticas generales:
  - totalProcesadas (total de operaciones)
  - validas (cantidad de operaciones válidas)
  - invalidas (cantidad de operaciones inválidas)
  - aprobadas (cantidad de operaciones aprobadas)
  - rechazadas (cantidad de operaciones rechazadas)

operacionesInvalidas → Arreglo de operaciones con error con:
  - id (identificador)
  - error (descripción del error)

operacionesRechazadas → Arreglo de operaciones rechazadas con:
  - id (identificador)
  - motivo (razón del rechazo)

operacionesAprobadas → Arreglo de operaciones procesadas con:
  - id (identificador)
  - tipoOperacion (tipo de operación)
  - valor (valor asociado)
  - prioridad (nivel numérico)
  - clasificacion (ALTA, MEDIA o BAJA)
  - estadoFinal (APROBADA)
  - detalles (arreglo con resultados de cada proceso asíncrono)

--

## 9. Casos de prueba

### Caso 1: Operación válida con prioridad alta

Datos de entrada:
{
  id: 1,
  tipoOperacion: "Transferencia",
  valor: 5000,
  estado: true,
  prioridad: 5
}

Resultado esperado:
id: 1
tipoOperacion: "Transferencia"
valor: 5000
prioridad: 5
clasificacion: "ALTA"
estadoFinal: "APROBADA"

--

### Caso 2: Operación válida con prioridad media

Datos de entrada:
{
  id: 2,
  tipoOperacion: "Consulta",
  valor: 1500,
  estado: true,
  prioridad: 3
}

Resultado esperado:
id: 2
tipoOperacion: "Consulta"
valor: 1500
prioridad: 3
clasificacion: "MEDIA"
estadoFinal: "APROBADA"

--

### Caso 3: Operación válida con prioridad baja

Datos de entrada:
{
  id: 3,
  tipoOperacion: "Verificacion",
  valor: 100,
  estado: true,
  prioridad: 1
}

Resultado esperado:
id: 3
tipoOperacion: "Verificacion"
valor: 100
prioridad: 1
clasificacion: "BAJA"
estadoFinal: "APROBADA"

--

### Caso 4: Error - tipo de operación vacío

Datos de entrada:
{
  id: 4,
  tipoOperacion: "",
  valor: 2000,
  estado: true,
  prioridad: 3
}

Resultado esperado:
id: 4
error: "Tipo de operacion invalido"
Operación no procesada

--

### Caso 5: Error - valor menor o igual a cero

Datos de entrada:
{
  id: 5,
  tipoOperacion: "Retiro",
  valor: 0,
  estado: true,
  prioridad: 4
}

Resultado esperado:
id: 5
error: "Valor debe ser mayor a cero"
Operación no procesada

--

### Caso 6: Error - valor negativo

Datos de entrada:
{
  id: 6,
  tipoOperacion: "Deposito",
  valor: -500,
  estado: true,
  prioridad: 2
}

Resultado esperado:
id: 6
error: "Valor debe ser mayor a cero"
Operación no procesada

--

### Caso 7: Error - estado inválido

Datos de entrada:
{
  id: 7,
  tipoOperacion: "Pago",
  valor: 3000,
  estado: "activo",
  prioridad: 4
}

Resultado esperado:
id: 7
error: "Estado invalido: debe ser booleano"
Operación no procesada

--

### Caso 8: Error - prioridad fuera de rango

Datos de entrada:
{
  id: 8,
  tipoOperacion: "Ajuste",
  valor: 1200,
  estado: true,
  prioridad: 7
}

Resultado esperado:
id: 8
error: "Prioridad fuera de rango (1 a 5)"
Operación no procesada

--

### Caso 9: Rechazo - operación inactiva

Datos de entrada:
{
  id: 9,
  tipoOperacion: "Cancelacion",
  valor: 800,
  estado: false,
  prioridad: 3
}

Resultado esperado:
id: 9
motivo: "Operacion inactiva"
Operación rechazada

--

### Caso 10: Error - valor no es número

Datos de entrada:
{
  id: 10,
  tipoOperacion: "Compra",
  valor: "mil",
  estado: true,
  prioridad: 2
}

Resultado esperado:
id: 10
error: "Valor invalido: debe ser un numero"
Operación no procesada

--

## 10. Justificación técnica

Uso de funciones puras → garantiza inmutabilidad y facilidad de pruebas.
Uso de callbacks → simula integraciones externas o sistemas legacy.
Uso de Promesas → manejo moderno de asincronía.
Uso de async/await → mejora la legibilidad del código y control de flujo.
Uso de try/catch → evita bloqueos del sistema por errores.
Separación de responsabilidades → facilita mantenimiento y escalabilidad.
Validaciones estrictas → garantizan integridad y seguridad de los datos.
Inmutabilidad con spread operator → previene efectos secundarios no deseados.
Uso de destructuring → extrae propiedades de forma clara y eficiente.
Uso de ciclo for clásico → procesamiento secuencial controlado.
Operador nullish coalescing (??) → manejo seguro de valores indefinidos.