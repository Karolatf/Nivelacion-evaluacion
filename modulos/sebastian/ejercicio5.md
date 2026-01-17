# Ejercicio 5 - Sistema de Análisis y Validación de Operaciones por Lotes

## 1. Datos de entrada

El sistema recibe un arreglo de objetos, donde cada objeto representa una operación matemática.

Cada operación incluye los siguientes campos:

id (string o number) → Identificador único de la operación
valores (array de numbers) → Arreglo de valores numéricos
tipo (string) → Tipo de operación ("suma", "promedio" o "multiplicacion")
activo (boolean) → Indica si la operación está habilitada

--

## 2. Procesos principales

Validación de datos con callback

Se verifica que los datos de cada operación cumplan las reglas mínimas:

La operación debe tener un identificador.
El estado activo debe ser true.
Los valores deben ser un arreglo no vacío.
Cada valor debe ser de tipo numérico.
El tipo de operación debe ser reconocido.

El proceso se ejecuta de forma asincrónica usando callback.
Si alguna validación falla, se genera un error controlado mediante callback.

--

## 3. Procesamiento asincrónico (Promesa)

Se usa una función que retorna una Promesa.
Cada operación se procesa con un tiempo variable aleatorio.
Se simula el procesamiento de operaciones en lotes.
El tiempo de procesamiento varía entre 500 y 2500 ms.
Si la operación es válida, se resuelve la promesa con el resultado.

--

## 4. Cálculo matemático (Función pura)

Se evalúa el tipo de operación y se ejecuta el cálculo correspondiente:

Suma → se suman todos los valores del arreglo.
Promedio → se calcula la media aritmética.
Multiplicación → se multiplican todos los valores.

La función no modifica el objeto original.
Retorna el resultado numérico del cálculo.

--

## 5. Validación del resultado

Se verifica que el resultado del cálculo sea válido:

El resultado debe ser mayor a cero.
Si el resultado es cero o negativo, la operación es rechazada.

--

## 6. Flujo principal con async/await

La función principal coordina todo el proceso:

Recorre el arreglo usando un ciclo for.
Clona cada operación para garantizar inmutabilidad.
Valida cada operación con callback.
Procesa cada operación de forma asincrónica con promesa.
Almacena los resultados en un arreglo de reporte.
Maneja errores de forma controlada sin detener el flujo.

--

## 7. Manejo de errores

Cada operación se procesa dentro de un bloque try/catch.
Los errores no detienen el procesamiento de las demás operaciones.
Cada error genera un reporte con estado RECHAZADA y motivo.
El sistema continúa procesando incluso cuando fallan operaciones.
Los mensajes de error son claros y específicos.

--

## 8. Datos de salida

El sistema retorna un arreglo de reportes con los siguientes datos:

Para operaciones aprobadas:
id → Identificador de la operación
estado → "APROBADA"
motivo → Mensaje con el resultado del cálculo

Para operaciones rechazadas:
id → Identificador de la operación
estado → "RECHAZADA"
motivo → Mensaje con la razón del rechazo

--

## 9. Casos de prueba

### Caso 1: Operación válida - suma

Datos de entrada:
id: 1
valores: [10, 20, 30]
tipo: "suma"
activo: true

Resultado esperado:
id: 1
estado: "APROBADA"
motivo: "Operacion valida. Resultado: 60"

--

### Caso 2: Operación válida - promedio

Datos de entrada:
id: 2
valores: [15, 25, 35]
tipo: "promedio"
activo: true

Resultado esperado:
id: 2
estado: "APROBADA"
motivo: "Operacion valida. Resultado: 25"

--

### Caso 3: Operación válida - multiplicación

Datos de entrada:
id: 3
valores: [2, 3, 4]
tipo: "multiplicacion"
activo: true

Resultado esperado:
id: 3
estado: "APROBADA"
motivo: "Operacion valida. Resultado: 24"

--

### Caso 4: Operación rechazada - resultado cero

Datos de entrada:
id: 4
valores: [0, 5, 10]
tipo: "multiplicacion"
activo: true

Resultado esperado:
id: 4
estado: "RECHAZADA"
motivo: "Resultado invalido: debe ser mayor a cero"

--

### Caso 5: Error - operación desactivada

Datos de entrada:
id: 5
valores: [8, 12, 16]
tipo: "suma"
activo: false

Resultado esperado:
id: 5
estado: "RECHAZADA"
motivo: "La operacion esta desactivada"

--

### Caso 6: Error - arreglo de valores vacío

Datos de entrada:
id: 6
valores: [dejar vacío o presionar enter]
tipo: "promedio"
activo: true

Resultado esperado:
id: 6
estado: "RECHAZADA"
motivo: "El arreglo de valores es invalido o esta vacio"

--


## 10. Justificación técnica

Uso de callback → validación inicial de datos con callback.
Uso de Promesas → procesamiento asincrónico con tiempo variable.
Uso de async/await → coordinación del flujo completo.
Uso de try/catch → manejo de errores sin bloquear el sistema.
Uso de ciclo for → procesamiento secuencial de operaciones.
Uso de spread operator → garantía de inmutabilidad.
Operadores matemáticos → cálculo de suma, promedio y multiplicación.
Validaciones previas al cálculo → prevención de errores.
Tiempo aleatorio → simulación de procesamiento por lotes real.
Función pura para cálculos → resultados predecibles sin efectos secundarios.