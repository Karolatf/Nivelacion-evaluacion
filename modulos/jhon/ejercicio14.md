# Ejercicio 14 - Sistema de Análisis y Validación de Transacciones Bancarias

## 1. Datos de entrada

El sistema recibe un arreglo inmutable de objetos, donde cada objeto representa una transacción bancaria registrada durante el día.

Cada transacción incluye los siguientes campos:

id (number) → Identificador numérico de la transacción
cliente (string) → Nombre del cliente que realiza la operación
tipo (string) → Tipo de transacción (deposito, retiro o transferencia)
monto (number) → Valor monetario de la transacción
autorizado (boolean) → Indica si la transacción está autorizada

--

## 2. Procesos principales

Carga asíncrona de transacciones

Se implementa una función que retorna una Promesa para simular la carga de datos desde una fuente externa.

Esta promesa se consume mediante async / await.
Se simula un retraso con setTimeout de 600 ms.
Se valida que la entrada sea un arreglo.
Todo el proceso está protegido con try/catch.
Se retorna una copia inmutable del arreglo usando spread operator.

--

## 3. Validación de datos básicos

Se verifica que cada transacción cumpla las reglas mínimas antes de ser procesada:

El cliente debe ser un texto no vacío.
El tipo debe corresponder a uno de los valores permitidos (deposito, retiro, transferencia).
El monto debe ser un número mayor a cero.
El campo autorizado debe ser de tipo booleano.
La transacción debe estar autorizada (autorizado === true).

Si alguna validación falla, se lanza un Error con un mensaje claro y controlado.
La transacción se clasifica como rechazada sin detener el sistema.

--

## 4. Procesamiento asíncrono con callback

Se utiliza una función con callback para simular un procesamiento inicial del sistema.

El proceso se ejecuta de forma asíncrona usando setTimeout.
El resultado se devuelve mediante el callback.
Simula la carga inicial de la transacción.
Tiempo de espera: 400 ms.

--

## 5. Procesamiento asíncrono con promesa

La carga de transacciones se realiza mediante una Promesa:

Simula la obtención de datos desde una fuente externa.
Utiliza setTimeout para representar tiempo de espera.
Valida que la entrada sea un arreglo.
Retorna una copia inmutable de los datos.
Tiempo de espera: 600 ms.

--

## 6. Coordinación del flujo con async/await

El flujo completo se coordina mediante una función principal async:

Permite un flujo secuencial claro.
Facilita el manejo de errores.
Garantiza que cada transacción se procese completamente antes de continuar.
Incluye un proceso adicional con async/await de 300 ms.

--

## 7. Control de flujo y análisis lógico

Se utilizan condicionales compuestos y operadores lógicos para determinar:

Si el monto es inválido → transacción rechazada.
Si el tipo no es válido → transacción rechazada.
Si no está autorizada → transacción rechazada.
Solo las transacciones válidas afectan los totales calculados.

--

## 8. Recorrido y cálculos

Se utiliza un ciclo for clásico para recorrer las transacciones.

Durante el análisis se calculan:

Total de transacciones procesadas
Total de transacciones válidas
Total de transacciones rechazadas
Total de depósitos (suma de montos de tipo deposito)
Total de retiros (suma de montos de tipo retiro)

Cada cálculo se realiza únicamente con transacciones válidas.

--

## 9. Manejo de errores

Todo el sistema está protegido mediante bloques try/catch:

Errores de validación se capturan y reportan de forma controlada.
Errores en procesos asíncrónicos no bloquean la ejecución.
El sistema continúa procesando las demás transacciones.
En ningún escenario el programa se detiene abruptamente.
Cada error se almacena con su ID y mensaje descriptivo.

--

## 10. Datos de salida

El sistema retorna un objeto con los siguientes datos:

totalProcesadas → Total de transacciones recibidas
validas → Cantidad de transacciones válidas
rechazadas → Cantidad de transacciones rechazadas
totalDepositos → Suma total de depósitos válidos
totalRetiros → Suma total de retiros válidos
errores → Arreglo de transacciones rechazadas con:
  - id (identificador)
  - motivo (descripción del error)

--

## 11. Casos de prueba

### Caso 1: Transacción válida de depósito

Datos de entrada:
{
  id: 1,
  cliente: "Juan Perez",
  tipo: "deposito",
  monto: 500000,
  autorizado: true
}

Resultado esperado:
Transacción válida
Se suma al total de depósitos: $500000

--

### Caso 2: Transacción válida de retiro

Datos de entrada:
{
  id: 2,
  cliente: "Ana Lopez",
  tipo: "retiro",
  monto: 200000,
  autorizado: true
}

Resultado esperado:
Transacción válida
Se suma al total de retiros: $200000

--

### Caso 3: Error - monto inválido (cero)

Datos de entrada:
{
  id: 3,
  cliente: "Carlos Ruiz",
  tipo: "deposito",
  monto: 0,
  autorizado: true
}

Resultado esperado:
id: 3
motivo: "Monto invalido debe ser mayor a cero"
Transacción no procesada

--

### Caso 4: Error - monto negativo

Datos de entrada:
{
  id: 4,
  cliente: "Laura Gomez",
  tipo: "retiro",
  monto: -100000,
  autorizado: true
}

Resultado esperado:
id: 4
motivo: "Monto invalido debe ser mayor a cero"
Transacción no procesada

--

### Caso 5: Error - tipo inválido

Datos de entrada:
{
  id: 5,
  cliente: "Pedro Diaz",
  tipo: "pago",
  monto: 300000,
  autorizado: true
}

Resultado esperado:
id: 5
motivo: "Tipo de transaccion invalido"
Transacción no procesada

--

### Caso 6: Error - transacción no autorizada

Datos de entrada:
{
  id: 6,
  cliente: "Maria Torres",
  tipo: "transferencia",
  monto: 150000,
  autorizado: false
}

Resultado esperado:
id: 6
motivo: "Transaccion no autorizada"   error
Transacción no procesada

--

### Caso 7: Error - cliente vacío

Datos de entrada:
{
  id: 7,
  cliente: "",
  tipo: "deposito",
  monto: 250000,
  autorizado: true
}

Resultado esperado:
id: 7
motivo: "Cliente invalido"
Transacción no procesada

--

## 12. Justificación técnica

Uso de promesas → simulan carga de datos desde fuentes externas.
Uso de callbacks → simulan validaciones o procesos específicos.
Uso de async/await → mejora la legibilidad del código y control de flujo.
Uso de try/catch → evita bloqueos del sistema por errores.
Separación de responsabilidades → facilita mantenimiento y escalabilidad.
Validaciones estrictas → garantizan integridad de los datos.
Inmutabilidad con spread operator → previene efectos secundarios no deseados.
Uso de ciclo for clásico → procesamiento secuencial controlado.
Operador nullish coalescing (??) → manejo seguro de valores indefinidos.
Cálculos incrementales → optimización de operaciones matemáticas.