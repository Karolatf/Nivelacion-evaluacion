# Ejercicio 3 - Sistema de Gestión y Validación de Solicitudes de Acceso

## 1. Datos de entrada

El sistema recibe un objeto solicitud, el cual contiene la información necesaria para evaluar y decidir si se otorga acceso a un sistema interno.

Cada solicitud incluye los siguientes campos:

id (number) → Identificador numérico de la solicitud
nombre (string) → Nombre del solicitante
edad (number) → Edad del solicitante (debe ser mayor o igual a 18)
rol (string) → Rol solicitado dentro del sistema
permisos (array de string) → Lista de permisos solicitados
estado (string) → Estado actual de la solicitud
aceptaCondiciones (boolean) → Indica si aceptó las condiciones del sistema

--

## 2. Procesos principales

Validación básica mediante callback

Se verifica que los datos principales de la solicitud cumplan las reglas mínimas:

La edad debe ser un número válido y mayor o igual a 18.
El solicitante debe haber aceptado las condiciones del sistema.
Los permisos deben ser un arreglo no vacío.

El proceso se ejecuta de forma asincrónica usando callback.
Si alguna validación falla, se retorna un error mediante el callback.

--

## 3. Validación de rol y permisos (Función pura)

Se utiliza una función pura para validar coherencia lógica.
Se verifica que el rol solicitado sea compatible con los permisos.

Regla principal:

Un usuario con rol "usuario" no puede solicitar el permiso "eliminar".

Esta función no modifica el objeto recibido.
Retorna true si la validación es correcta, false en caso contrario.

--

## 4. Validación externa asincrónica (Promesa)

Se usa una función que retorna una Promesa.
Simula una validación externa como verificación de antecedentes.
El proceso tiene un retardo de 1000 ms.
El resultado es aleatorio para simular aprobaciones y rechazos.
Si la validación externa falla, la solicitud queda en estado "EN REVISIÓN".

--

## 5. Flujo principal con async/await

La función principal coordina todo el proceso:

Ejecuta la validación básica con callback.
Valida coherencia entre rol y permisos.
Ejecuta la validación externa asincrónica.
Determina el estado final de la solicitud.
Maneja errores de forma controlada.

--

## 6. Análisis lógico de la solicitud

Luego de las validaciones técnicas, se aplican reglas de negocio:

Si la validación básica falla, la solicitud es rechazada con ERROR.
Si el rol no es compatible con los permisos, la solicitud es RECHAZADA.
Si la validación externa falla, la solicitud queda en EN REVISIÓN.
Si todas las condiciones se cumplen, la solicitud es APROBADA.

--

## 7. Manejo de errores

Todo el flujo está protegido con un bloque try/catch.
Cualquier error es capturado y devuelto de forma controlada.
El sistema nunca se detiene por errores inesperados.
Los mensajes de error son claros y específicos.

--

## 8. Datos de salida

El sistema retorna un objeto de resultado con la información del procesamiento:

id → ID de la solicitud procesada
estado → "APROBADA", "RECHAZADA", "EN REVISIÓN" o "ERROR"
mensaje → Detalle del resultado (solo en aprobación)
motivo → Razón del rechazo o revisión

Ejemplos de salida:

Solicitud aprobada - acceso concedido.
Solicitud rechazada por edad inválida.
Solicitud rechazada por no aceptar condiciones.
Solicitud rechazada por rol incompatible con permisos.
Solicitud en revisión por falla en validación externa.
Error controlado por datos inválidos.

--

## 9. Casos de prueba

### Caso 1: Solicitud aprobada - todos los criterios válidos

Datos de entrada:
id: 1
nombre: "María González"
edad: 25
rol: "admin"
permisos: ["leer", "escribir", "eliminar"]
estado: "pendiente"
aceptaCondiciones: true

Resultado esperado:
id: 1
estado: "APROBADA"
mensaje: "Acceso concedido"

Nota: Este resultado depende de la validación externa aleatoria.
Si falla, el estado será "EN REVISIÓN".

--

### Caso 2: Solicitud aprobada - usuario con permisos válidos

Datos de entrada:
id: 2
nombre: "Diego Fernández"
edad: 21
rol: "usuario"
permisos: ["leer", "escribir"]
estado: "pendiente"
aceptaCondiciones: true

Resultado esperado:
id: 2
estado: "APROBADA"
mensaje: "Acceso concedido"

Nota: Este resultado depende de la validación externa aleatoria.
Si falla, el estado será "EN REVISIÓN".

--

### Caso 3: Solicitud rechazada - rol incompatible con permisos

Datos de entrada:
id: 3
nombre: "Laura Martínez"
edad: 28
rol: "usuario"
permisos: ["leer", "eliminar"]
estado: "pendiente"
aceptaCondiciones: true

Resultado esperado:
id: 3
estado: "RECHAZADA"
motivo: "Rol no compatible con permisos"

--

### Caso 4: Error - edad menor de 18 (validación con callback)

Datos de entrada:
id: 4
nombre: "Juan Pérez"
edad: 16
rol: "usuario"
permisos: ["leer"]
estado: "pendiente"
aceptaCondiciones: true

Resultado esperado:
id: 4
estado: "ERROR"
mensaje: "Edad inválida o menor de edad"

--

### Caso 5: Error - no aceptó condiciones (validación con callback)

Datos de entrada:
id: 5
nombre: "Ana Torres"
edad: 30
rol: "usuario"
permisos: ["leer", "escribir"]
estado: "pendiente"
aceptaCondiciones: false

Resultado esperado:
id: 5
estado: "ERROR"
mensaje: "No aceptó las condiciones del sistema"

--

### Caso 6: Error - permisos vacíos (validación con callback)

Datos de entrada:
id: 6
nombre: "Carlos Ruiz"
edad: 22
rol: "admin"
permisos: []
estado: "pendiente"
aceptaCondiciones: true

Resultado esperado:
id: 6
estado: "ERROR"
mensaje: "No se solicitaron permisos"

--

### Caso 7: Error - edad no numérica

Datos de entrada:
id: 7
nombre: "Pedro Sánchez"
edad: "veinticinco"
rol: "admin"
permisos: ["leer", "escribir"]
estado: "pendiente"
aceptaCondiciones: true

Resultado esperado:
id: 7
estado: "ERROR"
mensaje: "Edad inválida o menor de edad"

--

### Caso 8: Solicitud en revisión - falla validación externa

Datos de entrada:
id: 8
nombre: "Roberto Silva"
edad: 26
rol: "admin"
permisos: ["leer", "escribir"]
estado: "pendiente"
aceptaCondiciones: true

Resultado esperado:
id: 8
estado: "EN REVISIÓN"
motivo: "Error en validación externa"


 **Nota técnica:** 
 Este caso depende de la función asincrónica `validacionExterna()`, la cual utiliza `Math.random()` para simular la disponibilidad de un servicio externo. 
 *   Posee un **30% de probabilidad** de fallar (Estado: EN REVISIÓN).
 *   Posee un **70% de probabilidad** de éxito (Estado: APROBADA).
 Si al ejecutar la prueba el resultado es "APROBADA", se debe reintentar la ejecución para evidenciar el manejo de excepciones en procesos asincrónicos externos.

--

## 10. Justificación técnica

Uso de callback → permite simular validaciones heredadas o externas.
Uso de Promesas → manejo claro de procesos asincrónicos.
Uso de async/await → código más legible y estructurado.
Uso de función pura → validación sin efectos secundarios.
Uso de try/catch → evita que el programa se bloquee.
Separación de funciones → facilita mantenimiento y pruebas.
Validaciones claras → garantizan la integridad de los datos.
Proceso aleatorio → simula comportamiento real de validaciones externas.
Manejo de múltiples estados → refleja escenarios reales de aprobación.