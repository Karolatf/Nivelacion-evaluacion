# Ejercicio 6 - Sistema de Gestión y Validación de Solicitudes de Servicio

## 1. Datos de entrada

El sistema recibe un arreglo de objetos, donde cada objeto representa una solicitud de servicio.

Cada solicitud incluye los siguientes campos:

id (number) → Identificador numérico de la solicitud
cliente (string) → Nombre del cliente que solicita el servicio
tipoServicio (string) → Tipo de servicio solicitado
prioridad (number entero entre 1 y 5) → Nivel de prioridad
activo (boolean) → Indica si la solicitud está activa
fechaSolicitud (string o Date) → Fecha de la solicitud

--

## 2. Procesos principales

Validación inicial con callback

Se verifica que los datos de cada solicitud cumplan las reglas mínimas:

El id debe ser un número válido.
El cliente debe ser un texto no vacío.
El tipo de servicio debe ser un string.
La prioridad debe ser un número entero entre 1 y 5.
La solicitud debe estar activa.

Si alguna validación falla, se retorna un error mediante callback.
El proceso se ejecuta de forma asincrónica usando setTimeout.

--

## 3. Evaluación externa (Promesa)

Se usa una función que retorna una Promesa.
Simula la evaluación de un servicio externo.
Cada solicitud se procesa con un tiempo variable aleatorio.
El tiempo de procesamiento varía entre 500 y 2500 ms.
Se aplican reglas de negocio para aprobar o rechazar.

--

## 4. Reglas de negocio

Se evalúa la solicitud aplicando reglas específicas:

Si la prioridad es menor a 3, la solicitud es rechazada.
Si cumple todos los criterios, la solicitud es aprobada.

--

## 5. Flujo principal con async/await

La función principal coordina todo el proceso:

Recorre el arreglo usando un ciclo for.
Clona cada solicitud para garantizar inmutabilidad.
Ejecuta la validación inicial con callback.
Ejecuta la evaluación externa con promesa.
Clasifica las solicitudes en aprobadas o rechazadas.
Maneja errores de forma controlada.

--

## 6. Contadores y resumen

El sistema mantiene contadores para:

Total de solicitudes aprobadas.
Total de solicitudes rechazadas.
Total de solicitudes procesadas.

Estos contadores se actualizan durante el procesamiento.

--

## 7. Manejo de errores

Cada solicitud se procesa dentro de un bloque try/catch.
Los errores no detienen el procesamiento de las demás solicitudes.
Cada error genera un resultado con estado RECHAZADA y motivo.
El sistema continúa procesando incluso cuando fallan solicitudes.
Los mensajes de error son claros y específicos.

--

## 8. Datos de salida

El sistema retorna un objeto con los siguientes datos:

totalProcesadas → Cantidad total de solicitudes procesadas
totalAprobadas → Cantidad de solicitudes aprobadas
totalRechazadas → Cantidad de solicitudes rechazadas
detalle → Arreglo con el resultado de cada solicitud

Cada resultado en el detalle contiene:
id → Identificador de la solicitud
estado → "APROBADA" o "RECHAZADA"
motivo → Mensaje descriptivo del resultado

--

## 9. Casos de prueba

### Caso 1: Solicitud aprobada - prioridad alta

Datos de entrada:
id: 1
cliente: "Maria Gonzalez"
tipoServicio: "Mantenimiento"
prioridad: 5
activo: true
fechaSolicitud: "2025-01-14"

Resultado esperado:
id: 1
estado: "APROBADA"
motivo: "Solicitud validada y aceptada correctamente"

--

### Caso 2: Solicitud aprobada - prioridad límite

Datos de entrada:
id: 2
cliente: "Carlos Mendez"
tipoServicio: "Instalacion"
prioridad: 3
activo: true
fechaSolicitud: "2025-01-14"

Resultado esperado:
id: 2
estado: "APROBADA"
motivo: "Solicitud validada y aceptada correctamente"

--

### Caso 3: Solicitud rechazada - prioridad insuficiente

Datos de entrada:
id: 3
cliente: "Ana Lopez"
tipoServicio: "Consulta"
prioridad: 2
activo: true
fechaSolicitud: "2025-01-14"

Resultado esperado:
id: 3
estado: "RECHAZADA"
motivo: "Prioridad insuficiente para el servicio"

--

### Caso 4: Error - Cliente vacío

Datos de entrada:
id: 4
cliente: [presionar enter sin escribir]
tipoServicio: "Soporte"
prioridad: 4
activo: true
fechaSolicitud: "2025-01-14"

Resultado esperado:
id: 4
estado: "RECHAZADA"
motivo: "Nombre de cliente invalido"

--

### Caso 5: Error - Prioridad fuera de rango

Datos de entrada:
id: 5
cliente: "Pedro Ruiz"
tipoServicio: "Revision"
prioridad: 8
activo: true
fechaSolicitud: "2025-01-14"

Resultado esperado:
id: 5
estado: "RECHAZADA"
motivo: "Prioridad fuera de rango (1 a 5)"

--

### Caso 6: Error - Solicitud desactivada

Datos de entrada:
id: 6
cliente: "Sandra Diaz"
tipoServicio: "Actualizacion"
prioridad: 4
activo: false
fechaSolicitud: "2025-01-14"

Resultado esperado:
id: 6
estado: "RECHAZADA"
motivo: "La solicitud esta desactivada"

--

### Caso 7: Error - Prioridad cero

Datos de entrada:
id: 7
cliente: "Roberto Castro"
tipoServicio: "Instalacion"
prioridad: 0
activo: true
fechaSolicitud: "2025-01-14"

Resultado esperado:
id: 7
estado: "RECHAZADA"
motivo: "Prioridad fuera de rango (1 a 5)"

--

## 10. Justificación técnica

Uso de callback → validación inicial rápida y crítica.
Uso de Promesas → evaluación externa con tiempo variable.
Uso de async/await → coordinación del flujo completo.
Uso de try/catch → manejo de errores sin bloquear el sistema.
Uso de ciclo for → procesamiento secuencial de solicitudes.
Uso de spread operator → garantía de inmutabilidad.
Validación en dos etapas → separación de responsabilidades.
Tiempo aleatorio → simulación de evaluación externa real.
Contadores → seguimiento de resultados procesados.
Resumen estructurado → presentación clara de resultados.