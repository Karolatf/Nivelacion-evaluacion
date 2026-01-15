# Ejercicio 9 - Sistema de Gestión y Validación de Órdenes de Servicio

## 1. Datos de entrada

El sistema recibe un arreglo de objetos, donde cada objeto representa una orden de servicio.

Cada orden incluye los siguientes campos:

id (number entero positivo) → Identificador de la orden
cliente (string) → Nombre del cliente que solicita el servicio
tipoServicio (string) → Tipo de servicio ("mantenimiento", "instalacion" o "soporte")
horas (number) → Cantidad de horas del servicio (debe ser mayor a cero)
pagado (boolean) → Estado de pago de la orden

--

## 2. Procesos principales

Validación de cliente con callback

Se verifica que el cliente sea válido:

El cliente debe ser un string no vacío.
Se elimina espacios en blanco para validación.

Si la validación falla, se retorna un error mediante callback.
El proceso se ejecuta de forma asincrónica usando setTimeout.

--

## 3. Validación de servicio (Promesa)

Se usa una función que retorna una Promesa.
Se valida que el tipo de servicio esté en la lista permitida.
Se valida que las horas sean un número mayor a cero.
Se valida que el campo pagado sea de tipo booleano.
Si alguna validación falla, se rechaza la promesa.
Si todas las validaciones son correctas, se resuelve la promesa.

--

## 4. Cálculo de costo (Función pura)

Se define una tarifa por hora según el tipo de servicio:

Mantenimiento: 40000 por hora
Instalación: 60000 por hora
Soporte: 30000 por hora

Se calcula el costo total multiplicando tarifa por horas.
La función no modifica ningún dato externo.
Retorna únicamente el resultado del cálculo.

--

## 5. Procesamiento de órdenes

Se recorre el arreglo usando un ciclo for...of.
Cada orden se valida y procesa de forma independiente.
Las órdenes válidas se agregan al arreglo de procesadas.
Las órdenes con errores se agregan al arreglo de errores.
El sistema continúa procesando incluso cuando hay errores.

--

## 6. Flujo principal con async/await

La función principal coordina todo el proceso:

Valida el ID de cada orden.
Ejecuta validación de cliente con callback.
Ejecuta validación de servicio con promesa.
Calcula el costo usando la función pura.
Almacena órdenes procesadas con toda su información.
Captura errores y los registra con el ID correspondiente.
Maneja errores de forma controlada.

--

## 7. Manejo de errores

Todo el flujo está protegido con bloques try/catch.
Los errores individuales no detienen el procesamiento completo.
Cada orden con error se almacena con su ID y mensaje de error.
El sistema nunca se bloquea por errores inesperados.
Los mensajes de error son claros y específicos.

--

## 8. Datos de salida

El sistema retorna un objeto con los siguientes datos:

procesadas → Arreglo de órdenes procesadas correctamente con:
  - id (identificador)
  - cliente (nombre del cliente)
  - servicio (tipo de servicio)
  - horas (cantidad de horas)
  - pagado (estado de pago)
  - costoTotal (costo calculado)

errores → Arreglo de órdenes con error con:
  - id (identificador)
  - mensaje (descripción del error)

estado → Mensaje indicando que el proceso completó

--

## 9. Casos de prueba

### Caso 1: Orden válida - mantenimiento

Datos de entrada:
{
  id: 1,
  cliente: "Carlos Mendez",
  tipoServicio: "mantenimiento",
  horas: 3,
  pagado: true
}

Resultado esperado:
id: 1
cliente: "Carlos Mendez"
servicio: "mantenimiento"
horas: 3
pagado: true
costoTotal: 120000 (40000 x 3)

--

### Caso 2: Orden válida - instalacion

Datos de entrada:
{
  id: 2,
  cliente: "Ana Lopez",
  tipoServicio: "instalacion",
  horas: 2,
  pagado: false
}

Resultado esperado:
id: 2
cliente: "Ana Lopez"
servicio: "instalacion"
horas: 2
pagado: false
costoTotal: 120000 (60000 x 2)

--

### Caso 3: Orden válida - soporte

Datos de entrada:
{
  id: 3,
  cliente: "Luis Garcia",
  tipoServicio: "soporte",
  horas: 4,
  pagado: true
}

Resultado esperado:
id: 3
cliente: "Luis Garcia"
servicio: "soporte"
horas: 4
pagado: true
costoTotal: 120000 (30000 x 4)

--

### Caso 4: Error - ID inválido (no entero)

Datos de entrada:
{
  id: 4.5,
  cliente: "Maria Torres",
  tipoServicio: "mantenimiento",
  horas: 2,
  pagado: true
}

Resultado esperado:
id: 4.5
mensaje: "ID inválido"
Orden no procesada

--

### Caso 5: Error - Cliente vacío (validación con callback)

Datos de entrada:
{
  id: 5,
  cliente: "",
  tipoServicio: "soporte",
  horas: 3,
  pagado: false
}

Resultado esperado:
id: 5
mensaje: "El cliente no es válido"
Orden no procesada

--

### Caso 6: Error - Tipo de servicio no permitido (validación con promesa)

Datos de entrada:
{
  id: 6,
  cliente: "Pedro Ruiz",
  tipoServicio: "reparacion",
  horas: 5,
  pagado: true
}

Resultado esperado:
id: 6
mensaje: "Tipo de servicio no permitido"
Orden no procesada

--

### Caso 7: Error - Horas inválidas (validación con promesa)

Datos de entrada:
{
  id: 7,
  cliente: "Sandra Diaz",
  tipoServicio: "instalacion",
  horas: 0,
  pagado: true
}

Resultado esperado:
id: 7
mensaje: "Horas inválidas"
Orden no procesada

--

### Caso 8: Error - Campo pagado no booleano (validación con promesa)

Datos de entrada:
{
  id: 8,
  cliente: "Roberto Castro",
  tipoServicio: "mantenimiento",
  horas: 2,
  pagado: "si"
}

Resultado esperado:
id: 8
mensaje: "El campo pagado debe ser booleano"
Orden no procesada

--

## 10. Justificación técnica

Uso de callback → validación de cliente externa simulada.
Uso de Promesas → validación completa del servicio.
Uso de async/await → coordinación del flujo completo.
Uso de try/catch → manejo de errores sin bloquear el sistema.
Uso de ciclo for...of → procesamiento secuencial de órdenes.
Función pura para cálculo → resultado predecible sin efectos secundarios.
Objeto de tarifas → configuración centralizada y mantenible.
Number.isInteger → validación precisa de números enteros.
Includes → validación de valores permitidos.
Separación de responsabilidades → funciones con propósitos específicos.