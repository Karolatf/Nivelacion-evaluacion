# Ejercicio 22 - Sistema de Validación y Procesamiento de Solicitudes Académicas

## 1. Datos de entrada

El sistema recibe un arreglo inmutable de objetos, donde cada objeto representa una solicitud académica.

Cada solicitud incluye los siguientes campos:

id (number entero positivo) → Identificador único de la solicitud
nombre (string) → Nombre del solicitante
tipo (string) → Tipo de solicitud
prioridad (number entero entre 1 y 5) → Nivel de prioridad de la solicitud
estado (boolean) → Indica si la solicitud está activa
requisitos (array de booleanos) → Lista de requisitos cumplidos

--

## 2. Procesos principales

Validación de datos básicos

Se verifica que cada solicitud cumpla las reglas mínimas antes de ser procesada:

El id debe ser un número entero positivo.
El nombre debe ser un texto no vacío.
El tipo debe ser un texto no vacío.
La prioridad debe ser un número entero entre 1 y 5.
El estado debe ser de tipo booleano.
Los requisitos deben ser un arreglo con al menos un elemento.
Todos los elementos del arreglo requisitos deben ser booleanos.

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

## 4. Evaluación de requisitos (Función pura)

Se evalúan los requisitos de cada solicitud válida:

Se recorre el arreglo de requisitos usando un ciclo for clásico.
Si encuentra algún requisito en false, retorna false.
Si todos los requisitos son true, retorna true.
Esta función no modifica el arreglo original.

--

## 5. Procesamiento asíncrono con callback

Se utiliza una función con callback para simular un procesamiento inicial del sistema.

El proceso se ejecuta de forma asíncrona usando setTimeout.
El resultado se devuelve mediante el callback.
Simula sistemas legacy o integraciones externas.
Tiempo de espera: 400 ms.

--

## 6. Procesamiento asíncrono con promesa

Cada solicitud válida pasa por un proceso que retorna una Promesa:

Simula una operación externa más compleja.
Utiliza setTimeout para representar tiempo de espera.
Retorna un mensaje de finalización del proceso.
Tiempo de espera: 600 ms.

--

## 7. Coordinación del flujo con async/await

El flujo completo se coordina mediante una función principal async:

Permite un flujo secuencial claro.
Facilita el manejo de errores.
Garantiza que cada solicitud se procese completamente antes de continuar.
Incluye un proceso adicional con async/await de 300 ms.

--

## 8. Manejo de errores

Todo el sistema está protegido mediante bloques try/catch:

Errores de validación se capturan y reportan de forma controlada.
Errores en procesos asíncronos no bloquean la ejecución.
El sistema continúa procesando las demás solicitudes.
En ningún escenario el programa se detiene abruptamente.
Cada error se almacena con su ID y mensaje descriptivo.

--

## 9. Datos de salida

El sistema retorna un objeto con los siguientes datos:

resumen → Objeto con estadísticas generales:
  - totalRecibidas (total de solicitudes)
  - validas (cantidad de solicitudes válidas)
  - invalidas (cantidad de solicitudes inválidas)
  - aprobadas (cantidad de solicitudes aprobadas)
  - rechazadas (cantidad de solicitudes rechazadas)

solicitudesInvalidas → Arreglo de solicitudes con error con:
  - id (identificador)
  - error (descripción del error)

solicitudesRechazadas → Arreglo de solicitudes rechazadas con:
  - id (identificador)
  - motivo (razón del rechazo)

solicitudesAprobadas → Arreglo de solicitudes procesadas con:
  - id (identificador)
  - nombre (nombre del solicitante)
  - tipo (tipo de solicitud)
  - prioridad (nivel numérico)
  - clasificacion (ALTA, MEDIA o BAJA)
  - estadoFinal (APROBADA)
  - detalles (arreglo con resultados de cada proceso asíncrono)

--

## 10. Casos de prueba

### Caso 1: Solicitud válida con prioridad alta y todos los requisitos cumplidos

Datos de entrada:
{
  id: 1,
  nombre: "Carlos Perez",
  tipo: "Prestamo de equipo",
  prioridad: 5,
  estado: true,
  requisitos: [true, true, true]
}

Resultado esperado:
id: 1
nombre: "Carlos Perez"
tipo: "Prestamo de equipo"
prioridad: 5
clasificacion: "ALTA"
estadoFinal: "APROBADA"

--

### Caso 2: Solicitud válida con prioridad media y todos los requisitos cumplidos

Datos de entrada:
{
  id: 2,
  nombre: "Ana Torres",
  tipo: "Solicitud de certificado",
  prioridad: 3,
  estado: true,
  requisitos: [true, true]
}

Resultado esperado:
id: 2
nombre: "Ana Torres"
tipo: "Solicitud de certificado"
prioridad: 3
clasificacion: "MEDIA"
estadoFinal: "APROBADA"

--

### Caso 3: Solicitud válida con prioridad baja y todos los requisitos cumplidos

Datos de entrada:
{
  id: 3,
  nombre: "Luis Gomez",
  tipo: "Consulta administrativa",
  prioridad: 1,
  estado: true,
  requisitos: [true]
}

Resultado esperado:
id: 3
nombre: "Luis Gomez"
tipo: "Consulta administrativa"
prioridad: 1
clasificacion: "BAJA"
estadoFinal: "APROBADA"

--

### Caso 4: Error - nombre vacío (validación básica)

Datos de entrada:
{
  id: 4,
  nombre: "",
  tipo: "Solicitud de carnet",
  prioridad: 3,
  estado: true,
  requisitos: [true, true]
}

Resultado esperado:
id: 4
error: "Nombre invalido"
Solicitud no procesada

--

### Caso 5: Error - prioridad fuera de rango

Datos de entrada:
{
  id: 5,
  nombre: "Maria Lopez",
  tipo: "Solicitud de beca",
  prioridad: 8,
  estado: true,
  requisitos: [true, true, true]
}

Resultado esperado:
id: 5
error: "Prioridad fuera de rango (1 a 5)"
Solicitud no procesada

--

### Caso 6: Error - estado inválido

Datos de entrada:
{
  id: 6,
  nombre: "Pedro Ruiz",
  tipo: "Solicitud de permiso",
  prioridad: 2,
  estado: "activo",
  requisitos: [true, true]
}

Resultado esperado:
id: 6
error: "Estado invalido"
Solicitud no procesada

--

### Caso 7: Error - requisitos no es un arreglo

Datos de entrada:
{
  id: 7,
  nombre: "Sandra Diaz",
  tipo: "Solicitud de traslado",
  prioridad: 4,
  estado: true,
  requisitos: "cumplidos"
}

Resultado esperado:
id: 7
error: "Debe tener al menos un requisito"
Solicitud no procesada

--

### Caso 8: Rechazo - estado inactivo

Datos de entrada:
{
  id: 8,
  nombre: "Roberto Castro",
  tipo: "Solicitud de reintegro",
  prioridad: 4,
  estado: false,
  requisitos: [true, true, true]
}

Resultado esperado:
id: 8
motivo: "Solicitud inactiva"
Solicitud rechazada

--

### Caso 9: Rechazo - no cumple todos los requisitos

Datos de entrada:
{
  id: 9,
  nombre: "Laura Mendez",
  tipo: "Solicitud de homologacion",
  prioridad: 5,
  estado: true,
  requisitos: [true, false, true]
}

Resultado esperado:
id: 9
motivo: "No cumple todos los requisitos"
Solicitud rechazada

--

### Caso 10: Error - requisitos vacíos

Datos de entrada:
{
  id: 10,
  nombre: "Jorge Martinez",
  tipo: "Solicitud de inscripcion",
  prioridad: 3,
  estado: true,
  requisitos: []
}

Resultado esperado:
id: 10
error: "Debe tener al menos un requisito"
Solicitud no procesada

--

## 11. Justificación técnica

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