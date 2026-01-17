# Ejercicio 16 - Sistema de Gestión y Validación de Solicitudes de Soporte Técnico

## 1. Datos de entrada

El sistema recibe un arreglo inmutable de objetos, donde cada objeto representa una solicitud de soporte técnico.

Cada solicitud incluye los siguientes campos:

id (number entero positivo) → Identificador único de la solicitud
usuario (string) → Nombre del usuario que reporta el incidente
tipo (string) → Tipo de solicitud (hardware, software o red)
prioridad (number entero entre 1 y 5) → Nivel de prioridad de la solicitud
descripcion (string) → Descripción del problema (mínimo 10 caracteres)
activo (boolean) → Indica si la solicitud está activa

--

## 2. Procesos principales

Validación de datos básicos

Se verifica que cada solicitud cumpla las reglas mínimas antes de ser procesada:

El id debe ser un número entero positivo.
El usuario debe ser un texto no vacío.
El tipo debe corresponder a uno de los valores permitidos (hardware, software, red).
La prioridad debe ser un número entero entre 1 y 5.
La descripcion debe tener al menos 10 caracteres.
El activo debe ser de tipo booleano.

Si alguna validación falla, se lanza un Error con un mensaje claro y controlado.
La solicitud se clasifica como inválida sin detener el sistema.

--

## 3. Clasificación de solicitudes (Función pura)

Las solicitudes válidas se clasifican según su nivel de prioridad:

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
Tiempo de espera: 600 ms.

--

## 5. Procesamiento asíncrono con promesa

Cada solicitud válida pasa por un proceso que retorna una Promesa:

Simula una operación externa más compleja.
Utiliza setTimeout para representar tiempo de espera.
Retorna un mensaje de finalización del proceso.
Tiempo de espera: 800 ms.

--

## 6. Coordinación del flujo con async/await

El flujo completo se coordina mediante una función principal async:

Permite un flujo secuencial claro.
Facilita el manejo de errores.
Garantiza que cada solicitud se procese completamente antes de continuar.
Incluye un proceso adicional con async/await de 500 ms.

--

## 7. Manejo de errores

Todo el sistema está protegido mediante bloques try/catch:

Errores de validación se capturan y reportan de forma controlada.
Errores en procesos asíncrónicos no bloquean la ejecución.
El sistema continúa procesando las demás solicitudes.
En ningún escenario el programa se detiene abruptamente.
Cada error se almacena con su ID y mensaje descriptivo.

--

## 8. Datos de salida

El sistema retorna un objeto con los siguientes datos:

resumen → Objeto con estadísticas generales:
  - totalRecibidas (total de solicitudes)
  - validas (cantidad de solicitudes válidas)
  - invalidas (cantidad de solicitudes inválidas)

solicitudesInvalidas → Arreglo de solicitudes con error con:
  - id (identificador)
  - error (descripción del error)

solicitudesProcesadas → Arreglo de solicitudes procesadas con:
  - id (identificador)
  - tipo (tipo de soporte)
  - prioridad (nivel numérico)
  - clasificacion (ALTA, MEDIA o BAJA)
  - estadoFinal (PROCESADA o ERROR)
  - detalles (arreglo con resultados de cada proceso asíncrono)

--

## 9. Casos de prueba

### Caso 1: Solicitud válida con prioridad alta

Datos de entrada:
{
  id: 1,
  usuario: "Carlos Perez",
  tipo: "hardware",
  prioridad: 5,
  descripcion: "El computador no enciende correctamente",
  activo: true
}

Resultado esperado:
id: 1
tipo: "hardware"
prioridad: 5
clasificacion: "ALTA"
estadoFinal: "PROCESADA"

--

### Caso 2: Solicitud válida con prioridad media

Datos de entrada:
{
  id: 2,
  usuario: "Ana Torres",
  tipo: "software",
  prioridad: 3,
  descripcion: "Error al iniciar el programa principal",
  activo: true
}

Resultado esperado:
id: 2
tipo: "software"
prioridad: 3
clasificacion: "MEDIA"
estadoFinal: "PROCESADA"

--

### Caso 3: Solicitud válida con prioridad baja

Datos de entrada:
{
  id: 3,
  usuario: "Luis Gomez",
  tipo: "red",
  prioridad: 1,
  descripcion: "Solicitud de cambio de contraseña de red",
  activo: true
}

Resultado esperado:
id: 3
tipo: "red"
prioridad: 1
clasificacion: "BAJA"
estadoFinal: "PROCESADA"

--

### Caso 4: Error - usuario vacío (validación básica)

Datos de entrada:
{
  id: 4,
  usuario: "",
  tipo: "software",
  prioridad: 3,
  descripcion: "Error al iniciar el programa",
  activo: true
}

Resultado esperado:
id: 4
error: "Usuario invalido"
Solicitud no procesada

--

### Caso 5: Error - prioridad fuera de rango

Datos de entrada:
{
  id: 5,
  usuario: "Maria Lopez",
  tipo: "red",
  prioridad: 9,
  descripcion: "Problemas de conexion intermitente en la red",
  activo: true
}

Resultado esperado:
id: 5
error: "Prioridad fuera de rango (1 a 5)"
Solicitud no procesada

--

### Caso 6: Error - descripción demasiado corta

Datos de entrada:
{
  id: 6,
  usuario: "Pedro Ruiz",
  tipo: "hardware",
  prioridad: 2,
  descripcion: "No sirve",
  activo: true
}

Resultado esperado:
id: 6
error: "Descripcion demasiado corta"
Solicitud no procesada

--

### Caso 7: Error - tipo no permitido

Datos de entrada:
{
  id: 7,
  usuario: "Sandra Diaz",
  tipo: "telefonia",
  prioridad: 4,
  descripcion: "El telefono no tiene tono de llamada",
  activo: true
}

Resultado esperado:
id: 7
error: "Tipo de solicitud no permitido"
Solicitud no procesada

--

### Caso 8: Error - estado activo inválido

Datos de entrada:
{
  id: 8,
  usuario: "Roberto Castro",
  tipo: "software",
  prioridad: 4,
  descripcion: "El sistema se bloquea al guardar los datos",
  activo: "si"
}

Resultado esperado:
id: 8
error: "Estado activo invalido"
Solicitud no procesada

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