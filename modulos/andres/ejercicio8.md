# Ejercicio 8 - Sistema de Análisis y Control de Inventario por Lotes

## 1. Datos de entrada

El sistema recibe un arreglo de objetos, donde cada objeto representa un movimiento de inventario.

Cada movimiento incluye los siguientes campos:

idProducto (number) → Identificador del producto
nombreProducto (string) → Nombre del producto
tipoMovimiento (string) → Tipo de movimiento ("entrada" o "salida")
cantidad (number) → Cantidad del movimiento (debe ser mayor a cero)
lote (string) → Identificador del lote
activo (boolean) → Indica si el producto está activo

--

## 2. Procesos principales

Validación de lote con callback

Se verifica que los datos de cada movimiento cumplan las reglas mínimas:

El lote debe ser un string no vacío.
El estado activo debe ser de tipo booleano.
El producto debe estar activo para ser procesado.

Si alguna validación falla, se retorna un error mediante callback.
El proceso se ejecuta de forma asincrónica usando setTimeout.

--

## 3. Validación de cantidad (Promesa)

Se usa una función que retorna una Promesa.
Se valida que la cantidad sea un número mayor a cero.
El proceso se ejecuta de forma asincrónica.
Si la cantidad no es válida, se rechaza la promesa.
Si la cantidad es correcta, se resuelve la promesa.

--

## 4. Procesamiento y cálculo de inventario

Se recorre el arreglo usando un ciclo for.
Se calcula el inventario final por producto usando operadores matemáticos.
Para cada producto se inicializa un objeto con nombre y cantidad.
Las entradas suman al inventario, las salidas restan del inventario.
Se garantiza inmutabilidad creando una copia del arreglo original.

--

## 5. Clasificación de movimientos

Solo se procesan productos activos.
Los productos inactivos se rechazan con motivo específico.
Los movimientos con tipo inválido se rechazan.

Luego del procesamiento se detectan productos con inventario negativo.
Se genera un arreglo específico con productos en estado crítico.

--

## 6. Flujo principal con async/await

La función principal coordina todo el proceso:

Valida que la entrada sea un arreglo.
Crea una copia para garantizar inmutabilidad.
Procesa cada movimiento de forma asincrónica.
Calcula inventario final por producto.
Detecta productos con inventario negativo.
Clasifica movimientos en válidos y rechazados.
Maneja errores de forma controlada.

--

## 7. Manejo de errores

Todo el flujo está protegido con bloques try/catch.
Los errores individuales no detienen el procesamiento completo.
Cada movimiento rechazado se almacena con su motivo de error.
El sistema nunca se bloquea por errores inesperados.
Los mensajes de error son claros y específicos.

--

## 8. Datos de salida

El sistema retorna un objeto con los siguientes datos:

validos → Arreglo de movimientos válidos procesados
rechazados → Arreglo de movimientos rechazados con sus motivos
inventarioFinal → Objeto con inventario final por producto
inventarioNegativo → Arreglo de productos con inventario negativo

En caso de error crítico, retorna un objeto con estado ERROR y mensaje.

--

## 9. Casos de prueba

### Caso 1: Movimiento válido tipo entrada

Datos de entrada:
idProducto: 1
nombreProducto: "Laptop HP"
tipoMovimiento: "entrada"
cantidad: 10
lote: "LT-2025-001"
activo: true

Resultado esperado:
Clasificado como valido
Inventario producto 1: 10 unidades

--

### Caso 2: Movimiento válido tipo salida

Datos de entrada:
idProducto: 2
nombreProducto: "Laptop HP"
tipoMovimiento: "salida"
cantidad: 3
lote: "LT-2025-001"
activo: true

Resultado esperado:
Clasificado como valido
Inventario producto 2: -3 unidades
                     

--

### Caso 3: Producto con inventario negativo

Datos de entrada:
Producto 3 con movimientos:
- idProducto: 3, tipo: "entrada", cantidad: 5
- idProducto: 3, tipo: "salida", cantidad: 12

Resultado esperado:
Inventario producto 3: -7 unidades
Producto 3 incluido en inventarioNegativo
Alerta de inventario critico

--

### Caso 4: Movimiento rechazado - producto inactivo

Datos de entrada:
idProducto: 4
nombreProducto: "Mouse Logitech"
tipoMovimiento: "entrada"
cantidad: 20
lote: "LT-2025-002"
activo: false

Resultado esperado:
Clasificado como rechazado
Motivo: "Producto inactivo"
No procesado en el inventario

--

### Caso 5: Error - lote vacío

Datos de entrada:
idProducto: 5
nombreProducto: "Teclado Mecanico"
tipoMovimiento: "entrada"
cantidad: 15
lote: [presionar enter sin escribir]
activo: true

Resultado esperado:
Clasificado como rechazado
Motivo: "Lote invalido"
No procesado en el inventario

--

### Caso 6: Error - estado activo no booleano

Datos de entrada:
idProducto: 6
nombreProducto: "Monitor Samsung"
tipoMovimiento: "salida"
cantidad: 5
lote: "LT-2025-003"
activo: "si"

Resultado esperado:
Clasificado como rechazado
Motivo: "Producto inactivo o dato de estado incorrecto"
No procesado en el inventario

--

### Caso 7: Error - cantidad cero

Datos de entrada:
idProducto: 7
nombreProducto: "Impresora HP"
tipoMovimiento: "entrada"
cantidad: 0
lote: "LT-2025-004"
activo: true

Resultado esperado:
Clasificado como rechazado
Motivo: "Cantidad invalida"
No procesado en el inventario

--

## 10. Justificación técnica

Uso de callback → validacion externa de lote simulada.
Uso de Promesas → validacion asincronica de cantidad.
Uso de async/await → coordinacion del flujo completo.
Uso de try/catch → manejo de errores sin bloquear el sistema.
Uso de ciclo for → procesamiento secuencial de movimientos.
Uso de spread operator → garantia de inmutabilidad.
Operadores matematicos → calculo de inventario por producto.
Uso de objetos para inventario → organizacion eficiente por idProducto.
Deteccion de inventario negativo → identificacion de productos criticos.
Inicializacion condicional → prevencion de errores por productos nuevos.