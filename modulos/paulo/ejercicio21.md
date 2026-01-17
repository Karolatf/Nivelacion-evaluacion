# Ejercicio 20 - Sistema de Gestión de Solicitudes de Soporte

## 1. Datos de entrada

El sistema recibe un arreglo de objetos que NO debe modificarse directamente.

Cada solicitud incluye los siguientes campos:

id (number) → Identificador único
usuario (string) → Nombre del usuario
tipo (string) → Tipo de solicitud ("hardware", "software" o "red")
prioridad (number entre 1 y 5) → Nivel de prioridad
estado (string) → Estado inicial ("pendiente")

--

## 2. Procesos principales

Validación de datos

Se verifica que cada solicitud cumpla con los tipos y rangos esperados:

El id debe ser un número.
El usuario debe ser un string.
El tipo debe ser uno de los valores permitidos.
La prioridad debe estar entre 1 y 5.
El estado debe ser "pendiente".

Si algún dato no cumple, se considera un fallo controlado.
El proceso continúa con las demás solicitudes.

--

## 3. Procesamiento inmutable

NO se modifican los datos originales.
Se crean nuevos arreglos y objetos usando spread operator.

Clasificación según prioridad:
- Prioridad alta: 4 o 5
- Prioridad media: 2 o 3
- Prioridad baja: 1

--

## 4. Asignación de nuevos estados

Según la clasificación se asigna un nuevo estado:

Alta prioridad → "escalado"
Media prioridad → "en_proceso"
Baja prioridad → "en_proceso"

--

## 5. Proceso asíncrono

Se simula el envío de solicitudes a un sistema externo:

Implementación con callback → simula envío externo
Implementación con promesa → simula proceso asíncrono
Implementación con async/await → coordinación del flujo

Cada implementación tiene un tiempo de espera diferente.

--

## 6. Gestión de fallos

El sistema continúa ejecutándose aun cuando una solicitud falle.
Los errores se capturan con try/catch.
Cada error se registra con su motivo específico.
Se muestran mensajes claros para el usuario.

--

## 7. Datos de salida

El sistema retorna un objeto con:

originales → El arreglo original sin modificaciones
procesadas → Nuevo arreglo con:
  - Clasificación por prioridad
  - Nuevos estados asignados
rechazadas → Solicitudes que fallaron con:
  - id
  - estadoFinal ("rechazada")
  - motivo

También muestra mensajes indicando:
- Solicitudes procesadas correctamente
- Solicitudes rechazadas y motivo del fallo
- Confirmación del proceso asíncrono completado

--

## 8. Casos de prueba

### Caso 1: Solicitud con prioridad alta

Datos de entrada:
id: 1
usuario: "Carlos Perez"
tipo: "hardware"
prioridad: 5
¿Probar estado invalido? (si/no): no

Resultado esperado:
id: 1
usuario: "Carlos Perez"
tipo: "hardware"
prioridad: 5
estado: "pendiente" (asignado automaticamente)
clasificacion: "ALTA"
estadoFinal: "escalado"

--

### Caso 2: Solicitud con prioridad media

Datos de entrada:
id: 2
usuario: "Ana Torres"
tipo: "software"
prioridad: 3
¿Probar estado invalido? (si/no): no

Resultado esperado:
id: 2
usuario: "Ana Torres"
tipo: "software"
prioridad: 3
estado: "pendiente" (asignado automaticamente)
clasificacion: "MEDIA"
estadoFinal: "en_proceso"

--

### Caso 3: Solicitud con prioridad baja

Datos de entrada:
id: 3
usuario: "Luis Gomez"
tipo: "red"
prioridad: 1
¿Probar estado invalido? (si/no): no

Resultado esperado:
id: 3
usuario: "Luis Gomez"
tipo: "red"
prioridad: 1
estado: "pendiente" (asignado automaticamente)
clasificacion: "BAJA"
estadoFinal: "en_proceso"

--


### Caso 4: Error - Tipo no permitido

Datos de entrada:
id: 4
usuario: "Pedro Ruiz"
tipo: "telefonia"
prioridad: 3
¿Probar estado invalido? (si/no): no

Resultado esperado:
id: 4
estadoFinal: "rechazada"
motivo: "Tipo de solicitud no permitido"

--

### Caso 5: Error - Prioridad fuera de rango

Datos de entrada:
id: 5
usuario: "Sandra Diaz"
tipo: "software"
prioridad: 8
¿Probar estado invalido? (si/no): no

Resultado esperado:
id: 5
estadoFinal: "rechazada"
motivo: "Prioridad fuera de rango (1 a 5)"

--

### Caso 6: Error - Estado no pendiente

Datos de entrada:
id: 5
usuario: "Roberto Castro"
tipo: "red"
prioridad: 2
¿Probar estado invalido? (si/no): si
Estado: "cerrado"

Resultado esperado:
id: 5
estadoFinal: "rechazada"
motivo: "Estado inicial invalido"

--

### Caso 7: Error - ID invalido

Datos de entrada:
id: "ABC"
usuario: "Maria Lopez"
tipo: "hardware"
prioridad: 4
¿Probar estado invalido? (si/no): no

Resultado esperado:
id: "desconocido"
estadoFinal: "rechazada"
motivo: "ID invalido"

--

## 9. Justificación técnica

Validaciones estrictas → garantizan integridad de datos.
Inmutabilidad con spread operator → preserva datos originales.
Clasificacion por prioridad → organiza solicitudes segun urgencia.
Estados nuevos → reflejan el flujo de procesamiento.
Callbacks → simulan validaciones externas.
Promesas → manejo moderno de asincronía.
Async/await → coordinacion clara del flujo.
Try/catch → captura errores sin bloquear el sistema.
Ciclo for → procesamiento secuencial controlado.
Mensajes claros → facilitan seguimiento del proceso.