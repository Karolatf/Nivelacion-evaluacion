# Ejercicio 12 - Sistema de Gestión Asíncrona de Solicitudes de Servicio

## 1. Datos de entrada

El sistema recibe un arreglo de objetos, donde cada objeto representa una solicitud de servicio técnico.

Cada solicitud incluye los siguientes campos:

id (number entero positivo) → Identificador de la solicitud
usuario (string) → Nombre del usuario que solicita el servicio
tipo (string) → Tipo de servicio ("software" o "hardware")
prioridad (number entero entre 1 y 5) → Nivel de prioridad de la solicitud
descripcion (string) → Descripción del servicio solicitado
estado (string) → Estado inicial de la solicitud ("pendiente")

--

## 2. Procesos principales

Validación básica con callback

Se verifica que los datos de cada solicitud cumplan las reglas mínimas:

El id debe ser un número entero positivo.
El usuario debe ser un texto no vacío.
El tipo debe ser "software" o "hardware".
La prioridad debe ser numérica.
La descripción debe ser un texto no vacío.
El estado debe ser "pendiente".

Si alguna validación falla, se retorna un error mediante callback.
El proceso se ejecuta de forma asincrónica usando setTimeout.

--

## 3. Validación de prioridad (Promesa)

Se usa una función que retorna una Promesa.
Se valida que la prioridad esté entre 1 y 5.
El proceso se ejecuta de forma asincrónica.
Si la prioridad está fuera de rango, se rechaza la promesa.
Si la prioridad es válida, se resuelve la promesa.

--

## 4. Clasificación de prioridad (Función pura)

Se clasifica la prioridad en categorías:

Alta prioridad → si prioridad es 4 o 5.
Prioridad media → si prioridad es 2 o 3.
Baja prioridad → si prioridad es 1.

La función no modifica datos.
Retorna únicamente la clasificación.

--

## 5. Atención de solicitud (Promesa con tiempo variable)

Se simula la atención de la solicitud con tiempo variable según prioridad:

Alta prioridad → 500 ms de atención.
Prioridad media → 800 ms de atención.
Baja prioridad → 1200 ms de atención.

Se usa una Promesa con setTimeout.
El estado de la solicitud cambia a "atendida".
Se garantiza inmutabilidad usando spread operator.

--

## 6. Flujo principal con async/await

La función principal coordina todo el proceso:

Valida que la entrada sea un arreglo no vacío.
Ejecuta validación básica con callback.
Ejecuta validación de prioridad con promesa.
Clasifica la prioridad.
Atiende la solicitud de forma asincrónica.
Almacena resultados y errores.
Genera resumen final del sistema.

--

## 7. Manejo de errores

Todo el flujo está protegido con bloques try/catch.
Los errores individuales no detienen el procesamiento completo.
Cada solicitud con error se almacena con su ID y mensaje.
El sistema valida si el arreglo está vacío antes de procesar.
Los mensajes de error son claros y específicos.

--

## 8. Datos de salida

El sistema retorna un objeto con los siguientes datos:

resultados → Arreglo de solicitudes procesadas con:
  - id (identificador)
  - usuario (nombre del usuario)
  - tipo (tipo de servicio)
  - prioridad (nivel numérico)
  - clasificacion (Alta, Media o Baja)
  - estado (atendida)

errores → Arreglo de solicitudes con error con:
  - id (identificador)
  - mensaje (descripción del error)

estadoSistema → Mensaje final indicando:
  - "TODAS LAS SOLICITUDES FUERON PROCESADAS" (sin errores)
  - "PROCESO COMPLETADO CON ERRORES" (con errores)
  - "PROCESO FINALIZADO CON ERRORES" (arreglo vacío o inválido)

--

## 9. Casos de prueba

### Caso 1: Solicitud válida - alta prioridad software

Datos de entrada:
{
  id: 1,
  usuario: "Carlos Mendez",
  tipo: "software",
  prioridad: 5,
  descripcion: "Instalación de aplicación crítica",
  estado: "pendiente"
}

Resultado esperado:
id: 1
usuario: "Carlos Mendez"
tipo: "software"
prioridad: 5
clasificacion: "Alta prioridad"
estado: "atendida"

--

### Caso 2: Solicitud válida - prioridad media hardware

Datos de entrada:
{
  id: 2,
  usuario: "Ana Lopez",
  tipo: "hardware",
  prioridad: 3,
  descripcion: "Reparación de equipo",
  estado: "pendiente"
}

Resultado esperado:
id: 2
usuario: "Ana Lopez"
tipo: "hardware"
prioridad: 3
clasificacion: "Prioridad media"
estado: "atendida"

--

### Caso 3: Solicitud válida - baja prioridad software

Datos de entrada:
{
  id: 3,
  usuario: "Luis Garcia",
  tipo: "software",
  prioridad: 1,
  descripcion: "Actualización de software",
  estado: "pendiente"
}

Resultado esperado:
id: 3
usuario: "Luis Garcia"
tipo: "software"
prioridad: 1
clasificacion: "Baja prioridad"
estado: "atendida"

--

### Caso 4: Error - tipo de servicio inválido (validación con callback)

Datos de entrada:
{
  id: 4,
  usuario: "Maria Torres",
  tipo: "redes",
  prioridad: 4,
  descripcion: "Configuración de red",
  estado: "pendiente"
}

Resultado esperado:
id: 4
mensaje: "Datos invalidos en la solicitud"
Solicitud no procesada

--

### Caso 5: Error - usuario vacío (validación con callback)

Datos de entrada:
{
  id: 5,
  usuario: "",
  tipo: "hardware",
  prioridad: 3,
  descripcion: "Cambio de componente",
  estado: "pendiente"
}

Resultado esperado:
id: 5
mensaje: "Datos invalidos en la solicitud"
Solicitud no procesada

--

### Caso 6: Error - prioridad fuera de rango (validación con promesa)

Datos de entrada:
{
  id: 6,
  usuario: "Pedro Ruiz",
  tipo: "software",
  prioridad: 8,
  descripcion: "Instalación urgente",
  estado: "pendiente"
}

Resultado esperado:
id: 6
mensaje: "Prioridad fuera del rango permitido (1 a 5)"
Solicitud no procesada

--

### Caso 7: Error - estado incorrecto (validación con callback)

Datos de entrada:
{
  id: 7,
  usuario: "Sandra Diaz",
  tipo: "hardware",
  prioridad: 4,
  descripcion: "Mantenimiento preventivo",
  estado: "procesando"
}

Resultado esperado:
id: 7
mensaje: "Datos invalidos en la solicitud"
Solicitud no procesada

--

### Caso 8: Error - arreglo vacío

Datos de entrada:
[]

Resultado esperado:
resultados: []
errores: mensaje: "Datos invalidos en la solicitud"
estadoSistema: "PROCESO FINALIZADO CON ERRORES"

--

## 10. Justificación técnica

Uso de callback → validación básica de datos simulada.
Uso de Promesas → validación de prioridad y atención asincrónica.
Uso de async/await → coordinación del flujo completo.
Uso de try/catch → manejo de errores sin bloquear el sistema.
Uso de ciclo for clásico → procesamiento secuencial de solicitudes.
Uso de spread operator → garantía de inmutabilidad.
Función pura para clasificación → resultado predecible sin efectos secundarios.
Tiempo variable según prioridad → simulación realista de atención.
Validación de arreglo vacío → prevención de errores antes de procesar.
Operador ternario → cálculo condicional de tiempo de atención.