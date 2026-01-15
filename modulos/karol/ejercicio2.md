# Ejercicio 2 - Sistema de Validación y Decisión de Solicitudes

## 1. Datos de entrada

El sistema recibe un objeto solicitud, el cual contiene la información necesaria para evaluar y decidir el resultado de una operación.

Cada solicitud incluye los siguientes campos:

id (number) → Identificador numérico de la solicitud
tipo (string) → Tipo de operación solicitada
valor (number) → Valor asociado a la operación
estado (boolean) → Estado actual de la solicitud
prioridad (number entero entre 1 y 5)

--

## 2. Procesos principales

Validación de datos básicos

Se verifica que los datos principales de la solicitud cumplan las reglas mínimas:

El id debe ser un número válido.
El tipo debe ser un texto no vacío.
El valor debe ser un número válido.
El estado debe ser de tipo booleano.
La prioridad debe estar entre 1 y 5.

Si alguna validación falla, se lanza un Error con un mensaje claro y controlado.

--

## 3. Proceso asincrónico (Promesa)

Se utiliza una función que retorna una Promesa para simular un proceso externo.
El proceso se ejecuta de forma asincrónica con un retardo de 800 ms.
Simula validaciones o procesos que podrían ocurrir en un sistema real.
La promesa se resuelve con un mensaje de confirmación.

--

## 4. Decisión del resultado (Función pura)

Se evalúa la solicitud aplicando reglas de negocio:

Si el valor es menor o igual a cero, la solicitud es INVÁLIDA.
Si el estado es false y la prioridad es menor a 3, la solicitud es RECHAZADA.
En cualquier otro caso, la solicitud es APROBADA.

Esta función no modifica el objeto original.
Retorna únicamente el resultado de la evaluación.

--

## 5. Notificación mediante callback

Se utiliza una función callback para simular el envío de notificaciones.
Genera un mensaje indicando que se ha notificado el resultado.
El callback se ejecuta después de determinar el resultado final.

--

## 6. Flujo principal con async/await

La función principal coordina todo el proceso:

Valida los datos de entrada.
Ejecuta el proceso asincrónico.
Determina el resultado mediante la función pura.
Notifica el resultado usando el callback.
Maneja cualquier error de forma controlada.

--

## 7. Manejo de errores

Todo el flujo está protegido con un bloque try/catch.
Cualquier error es capturado y devuelto de forma controlada.
El sistema nunca se detiene por errores inesperados.
Los mensajes de error son claros y orientados al usuario.

--

## 8. Datos de salida

El sistema retorna un objeto de resultado con la información del procesamiento:

id → ID de la solicitud procesada
resultado → "APROBADA", "RECHAZADA", "INVÁLIDA" o "ERROR"
notificacion → Mensaje de notificación generado
mensaje → Detalle del error (solo en caso de ERROR)

Ejemplos de salida:

Solicitud aprobada correctamente.
Solicitud rechazada por estado inactivo y baja prioridad.
Solicitud inválida por valor no permitido.
Error controlado por datos mal tipados.

--

## 9. Casos de prueba

### Caso 1: Solicitud aprobada - todos los criterios cumplidos

Datos de entrada:
id: 1
tipo: "Permiso especial"
valor: 100
estado: true
prioridad: 4

Resultado esperado:
id: 1
resultado: "APROBADA"
notificacion: "Notificación enviada: APROBADA"

--

### Caso 2: Solicitud rechazada - estado false y prioridad baja

Datos de entrada:
id: 2
tipo: "Solicitud de acceso"
valor: 50
estado: false
prioridad: 2

Resultado esperado:
id: 2
resultado: "RECHAZADA"
notificacion: "Notificación enviada: RECHAZADA"

--

### Caso 3: Solicitud inválida - valor cero

Datos de entrada:
id: 3
tipo: "Operación financiera"
valor: 0
estado: true
prioridad: 5

Resultado esperado:
id: 3
resultado: "INVÁLIDA"
notificacion: "Notificación enviada: INVÁLIDA"

--

### Caso 4: Solicitud inválida - valor negativo

Datos de entrada:
id: 4
tipo: "Devolución"
valor: -20
estado: true
prioridad: 3

Resultado esperado:
id: 4
resultado: "INVÁLIDA"
notificacion: "Notificación enviada: INVÁLIDA"

--

### Caso 5: Error - ID inválido

Datos de entrada:
id: "ABC"
tipo: "Solicitud"
valor: 10
estado: true
prioridad: 3

Resultado esperado:
id: null
resultado: "ERROR"
mensaje: "ID inválido"

--

### Caso 6: Error - Tipo vacío

Datos de entrada:
id: 6
tipo: ""
valor: 25
estado: true
prioridad: 4

Resultado esperado:
id: 6
resultado: "ERROR"
mensaje: "Tipo de operación inválido"

--

### Caso 7: Error - Estado no booleano

Datos de entrada:
id: 7
tipo: "Consulta"
valor: 75
estado: "activo"
prioridad: 2

Resultado esperado:
id: 7
resultado: "ERROR"
mensaje: "Estado inválido"

--

### Caso 8: Error - Prioridad fuera de rango

Datos de entrada:
id: 8
tipo: "Trámite urgente"
valor: 150
estado: true
prioridad: 10

Resultado esperado:
id: 8
resultado: "ERROR"
mensaje: "Prioridad fuera de rango"

--

## 10. Justificación técnica

Uso de validaciones estrictas → garantiza integridad de datos.
Uso de Promesas → manejo claro de procesos asincrónicos.
Uso de async/await → código más legible y estructurado.
Uso de función pura → decisión sin efectos secundarios.
Uso de callback → simulación de notificaciones externas.
Uso de try/catch → evita que el programa se bloquee.
Separación de funciones → facilita mantenimiento y pruebas.
Validaciones por tipo de dato → previene errores en tiempo de ejecución.