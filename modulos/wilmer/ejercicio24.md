# Ejercicio 24 - Sistema de Gestión y Validación de Solicitudes de Acceso

## 1. Datos de entrada

El sistema recibe un arreglo inmutable de objetos, donde cada objeto representa una solicitud de acceso.

Cada solicitud incluye los siguientes campos:

id (number entero positivo) → Identificador único de la solicitud
nombre (string) → Nombre del solicitante
edad (number mayor o igual a 18) → Edad del solicitante
rol (string) → Rol solicitado dentro del sistema
permisos (array de strings) → Lista de permisos solicitados
estado (string) → Estado actual de la solicitud
aceptaCondiciones (boolean) → Indica si aceptó las condiciones del sistema

--

## 2. Procesos principales

Validación de datos básicos

Se verifica que cada solicitud cumpla las reglas mínimas antes de ser procesada:

El id debe ser un número entero positivo.
El nombre debe ser un texto no vacío.
La edad debe ser un número válido mayor o igual a 18.
El rol debe ser un texto no vacío.
Los permisos deben ser un arreglo.
El estado debe ser un texto no vacío.
El campo aceptaCondiciones debe ser de tipo booleano.

Si alguna validación falla, se lanza un Error con un mensaje claro y controlado.
La solicitud se clasifica como inválida sin detener el sistema.

--

## 3. Validación de permisos (Función pura)

Se valida que la lista de permisos sea correcta:

El arreglo debe tener al menos un elemento.
Todos los elementos deben ser strings no vacíos.
Esta función no modifica el arreglo original.
Retorna true si es válido, false si no lo es.

--

## 4. Validación de reglas básicas con callback

Se utiliza una función con callback para validar reglas básicas:

Se verifica que el solicitante haya aceptado las condiciones.
Se valida que la lista de permisos sea correcta.
El proceso se ejecuta de forma asíncrona usando setTimeout.
El resultado se devuelve mediante el callback.
Tiempo de espera: 400 ms.

--

## 5. Validación externa con promesa

Cada solicitud válida pasa por una validación externa que retorna una Promesa:

Simula una validación con un servicio externo.
Tiene 80% de probabilidad de éxito (simulado con Math.random).
Utiliza setTimeout para representar tiempo de espera.
Si falla, la solicitud queda en estado "EN REVISION".
Tiempo de espera: 600 ms.

--

## 6. Coordinación del flujo con async/await

El flujo completo se coordina mediante una función principal async:

Permite un flujo secuencial claro.
Facilita el manejo de errores.
Garantiza que cada solicitud se procese completamente antes de continuar.
Incluye un proceso adicional con async/await de 300 ms.

--

## 7. Manejo de errores

Todo el sistema está protegido mediante bloques try/catch:

Errores de validación se capturan y reportan de forma controlada.
Errores en procesos asíncronos no bloquean la ejecución.
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
  - aprobadas (cantidad de solicitudes aprobadas)
  - rechazadas (cantidad de solicitudes rechazadas)
  - enRevision (cantidad de solicitudes en revisión)

solicitudesInvalidas → Arreglo de solicitudes con error con:
  - id (identificador)
  - error (descripción del error)

solicitudesRechazadas → Arreglo de solicitudes rechazadas con:
  - id (identificador)
  - motivo (razón del rechazo)

solicitudesEnRevision → Arreglo de solicitudes en revisión con:
  - id (identificador)
  - nombre (nombre del solicitante)
  - motivo (razón de la revisión)

solicitudesAprobadas → Arreglo de solicitudes procesadas con:
  - id (identificador)
  - nombre (nombre del solicitante)
  - edad (edad del solicitante)
  - rol (rol solicitado)
  - permisos (lista de permisos)
  - estadoFinal (APROBADA)
  - detalles (arreglo con resultados de cada proceso asíncrono)

--

## 9. Casos de prueba

### Caso 1: Solicitud válida aprobada

Datos de entrada:
{
  id: 1,
  nombre: "Carlos Perez",
  edad: 25,
  rol: "desarrollador",
  permisos: ["lectura", "escritura"],
  estado: "pendiente",
  aceptaCondiciones: true
}

Resultado esperado:
id: 1
nombre: "Carlos Perez"
edad: 25
rol: "desarrollador"
permisos: ["lectura", "escritura"]
estadoFinal: "APROBADA"

--

### Caso 2: Solicitud válida aprobada con múltiples permisos

Datos de entrada:
{
  id: 2,
  nombre: "Ana Torres",
  edad: 30,
  rol: "administrador",
  permisos: ["lectura", "escritura", "eliminacion", "configuracion"],
  estado: "pendiente",
  aceptaCondiciones: true
}

Resultado esperado:
id: 2
nombre: "Ana Torres"
edad: 30
rol: "administrador"
permisos: ["lectura", "escritura", "eliminacion", "configuracion"]
estadoFinal: "APROBADA"

--

### Caso 3: Error - nombre vacío

Datos de entrada:
{
  id: 3,
  nombre: "",
  edad: 22,
  rol: "usuario",
  permisos: ["lectura"],
  estado: "pendiente",
  aceptaCondiciones: true
}

Resultado esperado:
id: 3
error: "Nombre invalido"
Solicitud no procesada

--

### Caso 4: Error - edad menor a 18

Datos de entrada:
{
  id: 4,
  nombre: "Luis Gomez",
  edad: 16,
  rol: "usuario",
  permisos: ["lectura"],
  estado: "pendiente",
  aceptaCondiciones: true
}

Resultado esperado:
id: 4
error: "Edad minima requerida: 18 anos"
Solicitud no procesada

--

### Caso 5: Error - edad inválida

Datos de entrada:
{
  id: 5,
  nombre: "Maria Lopez",
  edad: "veinte",
  rol: "usuario",
  permisos: ["lectura"],
  estado: "pendiente",
  aceptaCondiciones: true
}

Resultado esperado:
id: 5
error: "Edad invalida: debe ser un numero"
Solicitud no procesada

--

### Caso 6: Error - permisos no es arreglo

Datos de entrada:
{
  id: 6,
  nombre: "Pedro Ruiz",
  edad: 28,
  rol: "tecnico",
  permisos: "lectura",
  estado: "pendiente",
  aceptaCondiciones: true
}

Resultado esperado:
id: 6
error: "Permisos debe ser un arreglo"
Solicitud no procesada

--

### Caso 7: Rechazo - no aceptó condiciones

Datos de entrada:
{
  id: 7,
  nombre: "Sandra Diaz",
  edad: 27,
  rol: "analista",
  permisos: ["lectura", "escritura"],
  estado: "pendiente",
  aceptaCondiciones: false
}

Resultado esperado:
id: 7
motivo: "No acepto las condiciones del sistema"
Solicitud rechazada

--

### Caso 8: Rechazo - permisos vacíos

Datos de entrada:
{
  id: 8,
  nombre: "Roberto Castro",
  edad: 32,
  rol: "supervisor",
  permisos: [],
  estado: "pendiente",
  aceptaCondiciones: true
}

Resultado esperado:
id: 8
motivo: "Lista de permisos vacia o invalida"
Solicitud rechazada

--

### Caso 9: Rechazo - estado no permitido

Datos de entrada:
{
  id: 9,
  nombre: "Laura Mendez",
  edad: 29,
  rol: "coordinador",
  permisos: ["lectura", "escritura"],
  estado: "procesado",
  aceptaCondiciones: true
}

Resultado esperado:
id: 9
motivo: "Estado de solicitud no permitido"
Solicitud rechazada

--

### Caso 10: Error - aceptaCondiciones inválido

Datos de entrada:
{
  id: 10,
  nombre: "Jorge Martinez",
  edad: 26,
  rol: "operador",
  permisos: ["lectura"],
  estado: "pendiente",
  aceptaCondiciones: "si"
}

Resultado esperado:
id: 10
error: "Debe indicar si acepta condiciones"
Solicitud no procesada

--

## 10. Justificación técnica

Uso de funciones puras → garantiza inmutabilidad y facilidad de pruebas.
Uso de callbacks → simula validaciones de reglas básicas con sistemas legacy.
Uso de Promesas → manejo moderno de asincronía para validaciones externas.
Uso de async/await → mejora la legibilidad del código y control de flujo.
Uso de try/catch → evita bloqueos del sistema por errores.
Separación de responsabilidades → facilita mantenimiento y escalabilidad.
Validaciones estrictas → garantizan integridad y seguridad de los datos.
Inmutabilidad con spread operator → previene efectos secundarios no deseados.
Uso de destructuring → extrae propiedades de forma clara y eficiente.
Uso de ciclo for clásico → procesamiento secuencial controlado.
Operador nullish coalescing (??) → manejo seguro de valores indefinidos.
Validación de edad mínima → cumple con requisitos de acceso al sistema.
Manejo de estados múltiples → aprobada, rechazada, en revisión según el flujo.