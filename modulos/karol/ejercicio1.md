# Ejercicio 1 - Sistema de Validación y Procesamiento de Solicitudes

## 1. Datos de entrada

El sistema recibe un objeto solicitud, el cual contiene la información necesaria para evaluar y procesar una solicitud.

Cada solicitud incluye los siguientes campos:

id (number) → Identificador numérico de la solicitud
nombre (string) → Nombre del solicitante
tipo (string) → Tipo de solicitud
prioridad (number entero entre 1 y 5)
estado (boolean) → Estado inicial de la solicitud
requisitos (array de boolean) → Lista de requisitos cumplidos o no

--

## 2. Procesos principales

Validación de datos básicos

Se verifica que los datos principales de la solicitud cumplan las reglas mínimas:

El id debe ser un número válido.
El nombre debe ser un texto no vacío.
El tipo debe ser un texto no vacío.
La prioridad debe ser un número entero entre 1 y 5.

Si alguna validación falla, se lanza un Error con un mensaje claro y controlado.

--

## 3. Validación del estado inicial (Callback)

Se utiliza una función con callback para simular una validación externa.
Se valida que el estado inicial sea de tipo booleano.
El proceso se ejecuta de forma asincrónica usando setTimeout.
Si el estado no es válido, se retorna un error mediante el callback.

--

## 4. Validación de requisitos (Promesa)

Se usa una función que retorna una Promesa.
Se valida que los requisitos sean un arreglo.
Se verifica que cada requisito sea de tipo booleano.
Se evalúa si todos los requisitos están cumplidos usando el método every.
El resultado de esta validación es true o false.

--

## 5. Análisis lógico de la solicitud

Luego de las validaciones técnicas, se aplican reglas de negocio:

Si los requisitos no están completos, la solicitud es rechazada.
Si la prioridad es menor a 3, la solicitud es rechazada.
Si todas las condiciones se cumplen, la solicitud es aprobada y procesada.

--

## 6. Manejo de errores

Todo el flujo está protegido con un bloque try/catch.
Cualquier error es capturado y devuelto de forma controlada.
El sistema nunca se detiene por errores inesperados.

--

## 7. Datos de salida

El sistema retorna un objeto de resultado con la información del procesamiento:

id → ID de la solicitud procesada
estado → "APROBADA", "RECHAZADA" o "ERROR"
mensaje / motivo → Detalle del resultado

Ejemplos de salida:

Solicitud aprobada y procesada correctamente.
Solicitud rechazada por requisitos incompletos.
Solicitud rechazada por prioridad insuficiente.
Error controlado por datos inválidos.

--

## 8. Casos de prueba

### Caso 1: Solicitud aprobada - todos los criterios cumplidos

Datos de entrada:
id: 1
nombre: "Carlos Méndez"
tipo: "Solicitud de beca"
prioridad: 5
estado: true
requisitos: [true, true, true]

Resultado esperado:
id: 1
estado: "APROBADA"
mensaje: "Solicitud procesada correctamente"

--

### Caso 2: Solicitud rechazada - requisitos incompletos

Datos de entrada:
id: 2
nombre: "Ana López"
tipo: "Permiso especial"
prioridad: 4
estado: true
requisitos: [true, false, true]

Resultado esperado:
id: 2
estado: "RECHAZADA"
motivo: "Requisitos incompletos"

--

### Caso 3: Solicitud rechazada - prioridad insuficiente

Datos de entrada:
id: 3
nombre: "Luis García"
tipo: "Consulta académica"
prioridad: 2
estado: true
requisitos: [true, true, true, true]

Resultado esperado:
id: 3
estado: "RECHAZADA"
motivo: "Prioridad insuficiente"

--

### Caso 4: Error - ID inválido

Datos de entrada:
id: "ABC"
nombre: "María Torres"
tipo: "Trámite"
prioridad: 4
estado: true
requisitos: [true, true]

Resultado esperado:
id: null
estado: "ERROR"
mensaje: "ID inválido"

--

### Caso 5: Error - Nombre vacío

Datos de entrada:
id: 5
nombre: ""
tipo: "Certificado"
prioridad: 4
estado: true
requisitos: [true, true]

Resultado esperado:
id: 5
estado: "ERROR"
mensaje: "Nombre inválido"

--

### Caso 6: Error - Prioridad fuera de rango

Datos de entrada:
id: 6
nombre: "Roberto Castro"
tipo: "Inscripción"
prioridad: 8
estado: true
requisitos: [true, true, true]

Resultado esperado:
id: 6
estado: "ERROR"
mensaje: "Prioridad fuera de rango (1 a 5)"

--

### Caso 7: Error - Estado no booleano (validación con callback)

Datos de entrada:
id: 7
nombre: "Patricia Morales"
tipo: "Trámite urgente"
prioridad: 4
estado: "activo"
requisitos: [true, true]

Resultado esperado:
id: 7
estado: "ERROR"
mensaje: "El estado inicial debe ser booleano"

--

### Caso 8: Error - Requisitos no es arreglo (validación con promesa)

Datos de entrada:
id: 8
nombre: "Carmen Vargas"
tipo: "Permiso"
prioridad: 3
estado: true
requisitos: "completos"

Resultado esperado:
id: 8
estado: "ERROR"
mensaje: "Los requisitos deben ser un arreglo"

--

## 9. Justificación técnica

Uso de callback → permite simular validaciones externas.
Uso de Promesas → manejo claro de procesos asincrónicos.
Uso de async/await → código más legible y estructurado.
Uso de try/catch → evita que el programa se bloquee.
Separación de funciones → facilita mantenimiento y pruebas.
Validaciones claras → garantizan la integridad de los datos.