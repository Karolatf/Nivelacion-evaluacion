# Ejercicio 7 - Sistema de Gestión y Validación de Transacciones Financieras

## 1. Datos de entrada

El sistema recibe un arreglo de objetos, donde cada objeto representa una transacción financiera.

Cada transacción incluye los siguientes campos:

idUsuario (number) → Identificador del usuario que realiza la transacción
tipo (string) → Tipo de transacción ("ingreso" o "egreso")
monto (number) → Valor de la transacción (debe ser mayor a cero)
categoria (string) → Categoría de la transacción
fecha (string) → Fecha de la transacción

--

## 2. Procesos principales

Validación de estructura con callback

Se verifica que los datos de cada transacción cumplan las reglas mínimas:

La transacción debe ser un objeto válido.
El idUsuario debe ser un número mayor a cero.
El tipo debe ser "ingreso" o "egreso".
El monto debe ser un número positivo.
La categoría debe ser un texto no vacío.
La fecha debe ser un texto no vacío.

Si alguna validación falla, se retorna un error controlado mediante callback.
El proceso se ejecuta de forma asincrónica usando setTimeout.

--

## 3. Validación de monto (Promesa)

Se usa una función que retorna una Promesa.
Se valida que el monto sea un número válido y positivo.
El proceso se ejecuta de forma asincrónica.
Si el monto no es válido, se rechaza la promesa.
Si el monto es correcto, se resuelve la promesa.

--

## 4. Procesamiento y cálculo de saldos

Se recorre el arreglo usando un ciclo for.
Se calcula el saldo por usuario usando operadores matemáticos.
Para cada usuario se inicializa un saldo en cero.
Los ingresos suman al saldo, los egresos restan del saldo.
Se garantiza inmutabilidad creando una copia del arreglo original.

--

## 5. Análisis de riesgo y alertas

El sistema identifica patrones de riesgo:

Usuarios con saldo negativo → se marca en objeto saldoNegativo.
Usuarios con múltiples egresos consecutivos → se marca en objeto patronesRiesgo.
Se considera patrón de riesgo cuando hay 2 o más egresos seguidos.

Se utiliza un contador auxiliar para detectar egresos consecutivos.
El contador se reinicia cuando ocurre un ingreso.

--

## 6. Flujo principal con async/await

La función principal coordina todo el proceso:

Valida que la entrada sea un arreglo.
Crea una copia para garantizar inmutabilidad.
Procesa cada transacción de forma asincrónica.
Calcula saldos y detecta patrones de riesgo.
Clasifica transacciones en válidas e inválidas.
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
invalidas → Arreglo de transacciones inválidas con sus motivos
saldos → Objeto con saldo final por cada usuario
saldoNegativo → Objeto con usuarios que tienen saldo negativo
patronesRiesgo → Objeto con usuarios que presentan múltiples egresos consecutivos

En caso de error crítico, retorna un objeto con estado ERROR y mensaje.

--

## 9. Casos de prueba

### Caso 1: Transacción válida tipo ingreso

Datos de entrada:
idUsuario: 1
tipo: "ingreso"
monto: 50000
categoria: "Salario"
fecha: "2025-01-15"

Resultado esperado:
Clasificada como valida
Sumada al saldo del usuario 1
Saldo usuario 1: 50000

--

### Caso 2: Transacción válida tipo egreso

Datos de entrada:
idUsuario: 2
tipo: "egreso"
monto: 20000
categoria: "Compras"
fecha: "2025-01-15"

Resultado esperado:
Clasificada como valida
Restada del saldo del usuario 2
Saldo usuario 2: 30000 (si tenia 50000)

--

### Caso 3: Usuario con saldo negativo

Datos de entrada:
Usuario 3 con transacciones:
- idUsuario: 3, tipo: "ingreso", monto: 10000
- idUsuario: 3, tipo: "egreso", monto: 30000

Resultado esperado:
Saldo usuario 3: -20000
Usuario 3 marcado en saldoNegativo
Alerta de saldo negativo generada

--

### Caso 4: Patron de riesgo - multiples egresos consecutivos

Datos de entrada:
Usuario 4 con transacciones consecutivas:
- idUsuario: 4, tipo: "egreso", monto: 5000
- idUsuario: 4, tipo: "egreso", monto: 8000

Resultado esperado:
Usuario 3 marcado en patronesRiesgo
Alerta de patron de riesgo generada

--

### Caso 5: Error - tipo de transaccion invalido

Datos de entrada:
idUsuario: 5
tipo: "transferencia"
monto: 25000
categoria: "Pago"
fecha: "2025-01-15"

Resultado esperado:
Clasificada como invalida
Motivo: "Tipo de transaccion invalido"
No procesada en los calculos

--

### Caso 6: Error - monto cero

Datos de entrada:
idUsuario: 6
tipo: "ingreso"
monto: 0
categoria: "Bono"
fecha: "2025-01-15"

Resultado esperado:
Clasificada como invalida
Motivo: "Monto invalido"
No procesada en los calculos

--

### Caso 7: Error - categoria vacia

Datos de entrada:
idUsuario: 7
tipo: "egreso"
monto: 12000
categoria: [presionar enter sin escribir]
fecha: "2025-01-15"

Resultado esperado:
Clasificada como invalida
Motivo: "Categoria invalida"
No procesada en los calculos

--

## 10. Justificación técnica

Uso de callback → validacion estructural externa simulada.
Uso de Promesas → validacion asincronica del monto.
Uso de async/await → coordinacion del flujo completo.
Uso de try/catch → manejo de errores sin bloquear el sistema.
Uso de ciclo for → procesamiento secuencial de transacciones.
Uso de spread operator → garantia de inmutabilidad.
Operadores matematicos → calculo de saldos por usuario.
Uso de objetos para saldos → organizacion eficiente por idUsuario.
Contadores auxiliares → deteccion de patrones de riesgo.
Destructuring → extraccion limpia de datos de transacciones.