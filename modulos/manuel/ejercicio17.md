# Ejercicio 17 - Sistema de Análisis y Validación de Transacciones Bancarias

## 1. Datos de entrada

El sistema recibe un arreglo inmutable de objetos, donde cada objeto representa una transacción bancaria.

Cada transacción incluye los siguientes campos:

id (number) → Identificador de la transacción
cliente (string) → Nombre del cliente
tipo (string) → Tipo de operación ("deposito", "retiro" o "transferencia")
monto (number) → Cantidad de la transacción (debe ser mayor a cero)
autorizado (boolean) → Estado de autorización de la transacción

--

## 2. Procesos principales

Carga asíncrona de transacciones

Se simula la obtención de datos desde una fuente externa:

Se implementa una promesa que retorna los datos.
Se consume la promesa usando async/await.
Se valida que los datos sean un arreglo.
Se respeta la inmutabilidad usando spread operator.

Si la carga falla, se captura el error con try/catch.

--

## 3. Validación de datos básicos

Se verifica que cada transacción cumpla las reglas mínimas:

El id debe ser un número.
El cliente debe ser un string no vacío.
El tipo debe ser "deposito", "retiro" o "transferencia".
El monto debe ser un número mayor a cero.
El autorizado debe ser de tipo booleano.

Si alguna validación falla, se lanza un Error.
La transacción se clasifica como rechazada.

--

## 4. Validación de autorización (Callback)

Se usa una función con callback para validar la autorización:

El proceso se ejecuta de forma asíncrona usando setTimeout.
Se verifica que la transacción esté autorizada (true).
Si no está autorizada, se retorna un error mediante callback.
Si está autorizada, se retorna la transacción.

El callback se envuelve en una promesa para usar con await.

--

## 5. Clasificación y acumulación

Las transacciones válidas se clasifican por tipo:

Depósitos: se acumula el total de depósitos.
Retiros: se acumula el total de retiros.
Transferencias: se registran pero no afectan los totales.

Los cálculos se realizan sin modificar los datos originales.

--

## 6. Recorrido y procesamiento

Se recorre el arreglo usando un ciclo for clásico.
Cada transacción se valida y procesa de forma independiente.
Las transacciones válidas se agregan al arreglo de válidas.
Las transacciones rechazadas se agregan al arreglo de errores.
El sistema continúa procesando incluso cuando hay errores.

--

## 7. Manejo de errores

Todo el flujo está protegido con bloques try/catch:

Errores de validación se capturan y reportan de forma controlada.
Errores críticos no bloquean la ejecución.
El sistema continúa procesando las demás transacciones.
Cada error se almacena con su ID y mensaje descriptivo.

--

## 8. Datos de salida

El sistema retorna un objeto con los siguientes datos:

totalProcesadas → Total de transacciones recibidas
validas → Cantidad de transacciones válidas
rechazadas → Cantidad de transacciones rechazadas
totalDepositos → Suma total de depósitos
totalRetiros → Suma total de retiros
errores → Arreglo de transacciones rechazadas con:
  - id (identificador)
  - motivo (descripción del error)

--

## 9. Casos de prueba

### Caso 1: Transacción válida - depósito

Datos de entrada:
{
  id: 1,
  cliente: "Carlos Perez",
  tipo: "deposito",
  monto: 500000,
  autorizado: true
}

Resultado esperado:
Transacción procesada correctamente
Total depósitos: $500000

--

### Caso 2: Transacción válida - retiro

Datos de entrada:
{
  id: 2,
  cliente: "Ana Torres",
  tipo: "retiro",
  monto: 200000,
  autorizado: true
}

Resultado esperado:
Transacción procesada correctamente
Total retiros: $200000

--

### Caso 3: Transacción válida - transferencia

Datos de entrada:
{
  id: 3,
  cliente: "Luis Gomez",
  tipo: "transferencia",
  monto: 300000,
  autorizado: true
}

Resultado esperado:
Transacción procesada correctamente
No afecta totales de depósitos ni retiros

--

### Caso 4: Error - ID inválido

Datos de entrada:
{
  id: "ABC",
  cliente: "Maria Lopez",
  tipo: "deposito",
  monto: 100000,
  autorizado: true
}

Resultado esperado:
id: null
motivo: "ID invalido"
Transacción rechazada

--

### Caso 5: Error - Cliente vacío

Datos de entrada:
{
  id: 5,
  cliente: "",
  tipo: "retiro",
  monto: 150000,
  autorizado: true
}

Resultado esperado:
id: 5
motivo: "Cliente invalido"
Transacción rechazada

--

### Caso 6: Error - Tipo inválido

Datos de entrada:
{
  id: 6,
  cliente: "Pedro Ruiz",
  tipo: "pago",
  monto: 250000,
  autorizado: true
}

Resultado esperado:
id: 6
motivo: "Tipo de transaccion invalido"
Transacción rechazada

--

### Caso 7: Error - Monto inválido

Datos de entrada:
{
  id: 7,
  cliente: "Sandra Diaz",
  tipo: "deposito",
  monto: 0,
  autorizado: true
}

Resultado esperado:
id: 7
motivo: "Monto invalido"
Transacción rechazada

--

### Caso 8: Error - No autorizada

Datos de entrada:
{
  id: 8,
  cliente: "Roberto Castro",
  tipo: "retiro",
  monto: 300000,
  autorizado: false
}

Resultado esperado:
id: 8
motivo: "Transaccion no autorizada"
Transacción rechazada

--

## 10. Justificación técnica

Uso de promesas → carga asíncrona de datos desde fuente externa.
Uso de async/await → coordinación del flujo completo.
Uso de callbacks → validación de autorización simulada.
Uso de try/catch → manejo de errores sin bloquear el sistema.
Uso de ciclo for → procesamiento secuencial de transacciones.
Validaciones estrictas → garantizan integridad de los datos.
Inmutabilidad con spread operator → previene efectos secundarios.
Operador nullish coalescing (??) → manejo seguro de IDs faltantes.
Separación de responsabilidades → facilita mantenimiento y escalabilidad.
Includes → validación de valores permitidos.