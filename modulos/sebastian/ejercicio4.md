# Ejercicio 4 - Sistema de Transacciones y Control de Riesgo

## 1. Datos de entrada

El sistema recibe un arreglo de objetos, donde cada objeto representa una transacción financiera.

Cada transacción incluye los siguientes campos:

id (number entero positivo) → Identificador de la transacción
usuario (string) → Nombre del usuario que realizó la transacción
monto (number) → Valor de la transacción
tipo (string) → Tipo de transacción ("ingreso" o "egreso")
autorizada (boolean) → Estado de autorización de la transacción
fecha (string) → Fecha de la transacción

--

## 2. Procesos principales

Validación estructural con callback

Se verifica que los datos de cada transacción cumplan las reglas mínimas:

La transacción debe ser un objeto válido.
El id debe ser un número entero positivo.
El usuario debe ser un texto no vacío.
El monto debe ser de tipo numérico.
El tipo debe ser "ingreso" o "egreso".
El estado de autorización debe ser booleano.

Si alguna validación falla, se retorna un error controlado mediante callback.
El proceso se ejecuta de forma asincrónica usando setTimeout.

--

## 3. Validación de monto (Promesa)

Se usa una función que retorna una Promesa.
Se valida que el monto sea un número válido usando isNaN.
El proceso se ejecuta de forma asincrónica.
Si el monto no es válido, se rechaza la promesa.
Si el monto es correcto, se resuelve la promesa.

--

## 4. Clasificación de transacciones

Luego de las validaciones, se clasifican las transacciones en tres categorías:

Transacciones válidas → datos correctos y autorizadas.
Transacciones sospechosas → datos correctos pero no autorizadas.
Transacciones inválidas → errores de estructura o validación.

--

## 5. Procesamiento lógico y cálculos

Se recorre el arreglo usando un ciclo for.
Se calculan los totales usando operadores matemáticos:

Total de ingresos válidos.
Total de egresos válidos.
Balance final (suma de ingresos y egresos).

Se garantiza inmutabilidad creando una copia del arreglo original.

--

## 6. Flujo principal con async/await

La función principal coordina todo el proceso:

Valida que la entrada sea un arreglo.
Crea una copia para garantizar inmutabilidad.
Procesa cada transacción de forma asincrónica.
Clasifica las transacciones según sus resultados.
Calcula los totales financieros.
Maneja errores de forma controlada.

--

## 7. Manejo de errores

Todo el flujo está protegido con bloques try/catch.
Los errores individuales no detienen el procesamiento completo.
Cada transacción inválida se almacena con su motivo de error.
El sistema nunca se bloquea por errores inesperados.
Los mensajes de error son claros y específicos.

--

## 8. Datos de salida

El sistema retorna un objeto con los siguientes datos:

totalProcesadas → Cantidad total de transacciones procesadas
validas → Arreglo de transacciones válidas
sospechosas → Arreglo de transacciones sospechosas
invalidas → Arreglo de transacciones inválidas con sus motivos
totalIngresos → Suma de todos los ingresos válidos
totalEgresos → Suma de todos los egresos válidos
balanceFinal → Balance final (ingresos + egresos)

En caso de error crítico, retorna un objeto con estado ERROR y mensaje.

--

## 9. Casos de prueba

### Caso 1: Transacción válida tipo ingreso

Datos de entrada:
id: 1
usuario: "Carlos Mendez"
monto: 1500
tipo: "ingreso"
autorizada: true
fecha: "2025-01-14"

Resultado esperado:
Clasificada como válida
Sumada al total de ingresos
Balance final incrementado

--

### Caso 2: Transacción válida tipo egreso

Datos de entrada:
id: 2
usuario: "Ana Lopez"
monto: 800
tipo: "egreso"
autorizada: true
fecha: "2025-01-14"

Resultado esperado:
Clasificada como válida
Sumada al total de egresos
Balance final incrementado

--

### Caso 3: Transacción sospechosa - no autorizada

Datos de entrada:
id: 3
usuario: "Luis Garcia"
monto: 2000
tipo: "ingreso"
autorizada: false
fecha: "2025-01-14"

Resultado esperado:
Clasificada como sospechosa
No sumada a los totales
Incluida en arreglo de sospechosas

--

### Caso 4: Error - ID inválido (número negativo)

Datos de entrada:
id: -4
usuario: "Pedro Ruiz"
monto: 300
tipo: "egreso"
autorizada: true
fecha: "2025-01-14"

Resultado esperado:
Clasificada como inválida
Motivo: "ID inválido"
No procesada en los cálculos

--

### Caso 5: Error - Usuario vacío

Datos de entrada:
id: 5
usuario: ""
monto: 1000
tipo: "ingreso"
autorizada: true
fecha: "2025-01-14"

Resultado esperado:
Clasificada como inválida
Motivo: "Usuario inválido"
No procesada en los cálculos

--

### Caso 6: Error - Tipo de transacción inválido

Datos de entrada:
id: 6
usuario: "Sandra Diaz"
monto: 450
tipo: "transferencia"
autorizada: true
fecha: "2025-01-14"

Resultado esperado:
Clasificada como inválida
Motivo: "Tipo de transacción inválido"
No procesada en los cálculos

--

### Caso 7: Error - Estado de autorización no booleano

Datos de entrada:
id: 7
usuario: "Roberto Castro"
monto: 600
tipo: "egreso"
autorizada: "si"
fecha: "2025-01-14"

Resultado esperado:
Clasificada como inválida
Motivo: "Estado de autorización inválido"
No procesada en los cálculos

--

### Caso 8: Error - ID cero

Datos de entrada:
id: 0
usuario: "Maria Torres"
monto: 500
tipo: "ingreso"
autorizada: true
fecha: "2025-01-14"

Resultado esperado:
Clasificada como inválida
Motivo: "ID inválido"
No procesada en los cálculos

--

## 10. Justificación técnica

Uso de callback → validación estructural externa simulada.
Uso de Promesas → validación asincrónica del monto.
Uso de async/await → coordinación del flujo completo.
Uso de try/catch → manejo de errores sin bloquear el sistema.
Uso de ciclo for → procesamiento secuencial de transacciones.
Uso de spread operator → garantía de inmutabilidad.
Operadores matemáticos → cálculo de totales financieros.
Clasificación condicional → separación de transacciones por estado.
Acumuladores → seguimiento de totales de ingresos y egresos.