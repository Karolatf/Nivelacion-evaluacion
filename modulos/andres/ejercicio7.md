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
{
  idUsuario: 1,
  tipo: "ingreso",
  monto: 50000,
  categoria: "Salario",
  fecha: "2025-01-15"
}

Resultado esperado:
Clasificada como válida
Sumada al saldo del usuario 1
Saldo usuario 1: 50000

--

### Caso 2: Transacción válida tipo egreso

Datos de entrada:
{
  idUsuario: 1,
  tipo: "egreso",
  monto: 20000,
  categoria: "Compras",
  fecha: "2025-01-15"
}

Resultado esperado:
Clasificada como válida
Restada del saldo del usuario 1
Saldo usuario 1: 30000 (si tenía 50000)

--

### Caso 3: Usuario con saldo negativo

Datos de entrada:
Usuario 2 con transacciones:
- Ingreso: 10000
- Egreso: 30000

Resultado esperado:
Saldo usuario 2: -20000
Usuario 2 marcado en saldoNegativo
Alerta de saldo negativo generada

--

### Caso 4: Patrón de riesgo - múltiples egresos consecutivos

Datos de entrada:
Usuario 3 con transacciones consecutivas:
- Egreso: 5000
- Egreso: 8000

Resultado esperado:
Usuario 3 marcado en patronesRiesgo
Alerta de patrón de riesgo generada

--

### Caso 5: Error - idUsuario inválido (validación con callback)

Datos de entrada:
{
  idUsuario: "ABC",
  tipo: "ingreso",
  monto: 15000,
  categoria: "Venta",
  fecha: "2025-01-15"
}

Resultado esperado:
Clasificada como inválida
Motivo: "ID de usuario inválido"
No procesada en los cálculos

--

### Caso 6: Error - tipo de transacción inválido

Datos de entrada:
{
  idUsuario: 2,
  tipo: "transferencia",
  monto: 25000,
  categoria: "Pago",
  fecha: "2025-01-15"
}

Resultado esperado:
Clasificada como inválida
Motivo: "Tipo de transacción inválido"
No procesada en los cálculos

--

### Caso 7: Error - monto cero o negativo (validación con promesa)

Datos de entrada:
{
  idUsuario: 3,
  tipo: "ingreso",
  monto: 0,
  categoria: "Bono",
  fecha: "2025-01-15"
}

Resultado esperado:
Clasificada como inválida
Motivo: "Monto inválido"
No procesada en los cálculos

--

### Caso 8: Error - categoría vacía

Datos de entrada:
{
  idUsuario: 4,
  tipo: "egreso",
  monto: 12000,
  categoria: "",
  fecha: "2025-01-15"
}

Resultado esperado:
Clasificada como inválida
Motivo: "Categoría inválida"
No procesada en los cálculos

--

## 10. Justificación técnica

Uso de callback → validación estructural externa simulada.
Uso de Promesas → validación asincrónica del monto.
Uso de async/await → coordinación del flujo completo.
Uso de try/catch → manejo de errores sin bloquear el sistema.
Uso de ciclo for → procesamiento secuencial de transacciones.
Uso de spread operator → garantía de inmutabilidad.
Operadores matemáticos → cálculo de saldos por usuario.
Uso de objetos para saldos → organización eficiente por idUsuario.
Contadores auxiliares → detección de patrones de riesgo.
Operador nullish coalescing (??) → inicialización segura de valores.