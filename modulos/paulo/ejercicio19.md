# Ejercicio 19 - Sistema de Simulación de Procesamiento de Solicitudes de Soporte Técnico

## 1. Datos de entrada

El sistema recibe un arreglo inmutable de objetos, donde cada objeto representa una solicitud de soporte técnico.

Cada solicitud incluye los siguientes campos:

id (number) → Identificador único de la solicitud
usuario (string) → Nombre del solicitante
area (string) → Área desde la cual se reporta el problema
tipoProblema (string) → Descripción corta del problema
prioridad (number entre 1 y 5) → Valor numérico de prioridad
estado (string) → Estado inicial de la solicitud ("pendiente")

--

## 2. Procesos principales

Validación de datos con callback

Se verifica que cada solicitud cumpla las reglas mínimas:

El id debe ser un número.
El usuario debe ser un string no vacío.
El área debe ser un string no vacío.
El tipoProblema debe ser un string no vacío.
La prioridad debe ser un número entre 1 y 5.
El estado debe ser exactamente "pendiente".

Si alguna validación falla, se retorna un error mediante callback.
El proceso se ejecuta de forma asíncrona usando setTimeout.

--

## 3. Recálculo de prioridad (Función pura)

Las solicitudes válidas pueden tener su prioridad recalculada según reglas de negocio:

Si el área es "infraestructura", se incrementa la prioridad en 1.
La prioridad máxima es 5 (se usa Math.min para no exceder).

Esta función no modifica los datos originales.
Retorna un nuevo objeto con la prioridad ajustada.
Se garantiza inmutabilidad usando spread operator.

--

## 4. Simulación de atención (Promesa)

Cada solicitud válida se atiende usando una Promesa:

Simula tiempo de procesamiento con setTimeout (1000 ms).
Muestra mensaje de inicio de atención.
Retorna la solicitud con estado "atendida".

El proceso se ejecuta de forma asíncrona.

--

## 5. Coordinación del flujo con async/await

El flujo completo se coordina mediante una función principal async:

Permite un flujo secuencial claro.
Facilita el manejo de errores.
Garantiza que cada solicitud se procese completamente.
Incluye mensajes informativos durante el procesamiento.

--

## 6. Manejo de errores

Todo el sistema está protegido mediante bloques try/catch:

Errores de validación se capturan y reportan de forma controlada.
Errores en procesos asíncronos no bloquean la ejecución.
El sistema continúa procesando las demás solicitudes.
En ningún escenario el programa se detiene abruptamente.
Cada error se almacena con su ID y mensaje descriptivo.

--

## 7. Datos de salida

El sistema retorna un objeto con los siguientes datos:

resumen → Objeto con estadísticas generales:
  - totalProcesadas (total de solicitudes)
  - exitosas (cantidad de solicitudes atendidas)
  - fallidas (cantidad de solicitudes rechazadas)

solicitudesAtendidas → Arreglo de solicitudes procesadas con:
  - id (identificador)
  - usuario (nombre del solicitante)
  - area (área que reporta)
  - tipoProblema (descripción del problema)
  - prioridad (prioridad final ajustada)
  - estado ("atendida")

solicitudesRechazadas → Arreglo de solicitudes con error con:
  - id (identificador)
  - motivo (descripción del error)
  - estado ("rechazada")

--

## 8. Casos de prueba

### Caso 1: Solicitud válida con prioridad alta

Datos de entrada:
id: 1
usuario: "Carlos Perez"
area: "desarrollo"
tipoProblema: "Error en produccion"
prioridad: 5


Resultado esperado:
id: 1
usuario: "Carlos Perez"
area: "desarrollo"
prioridad: 5 (sin cambio)
estado: "atendida"

--

### Caso 2: Solicitud válida con prioridad media

Datos de entrada:
id: 2
usuario: "Ana Torres"
area: "ventas"
tipoProblema: "Sistema lento"
prioridad: 3


Resultado esperado:
id: 2
usuario: "Ana Torres"
area: "ventas"
prioridad: 3 (sin cambio)
estado: "atendida"

--

### Caso 3: Solicitud válida con prioridad baja

Datos de entrada:
id: 3
usuario: "Luis Gomez"
area: "administracion"
tipoProblema: "Cambio de contraseña"
prioridad: 1


Resultado esperado:
id: 3
usuario: "Luis Gomez"
area: "administracion"
prioridad: 1 (sin cambio)
estado: "atendida"

--

### Caso 4: Solicitud válida con área crítica - recalculo de prioridad

Datos de entrada:
id: 4
usuario: "Maria Lopez"
area: "infraestructura"
tipoProblema: "Servidor caido"
prioridad: 3


Resultado esperado:
id: 4
usuario: "Maria Lopez"
area: "infraestructura"
prioridad: 4 (incrementada de 3 a 4)
estado: "atendida"

--

### Caso 5: Error - Usuario vacío

Datos de entrada:
id: 5
usuario: [presionar enter sin escribir]
area: "desarrollo"
tipoProblema: "Bug en aplicacion"
prioridad: 3


Resultado esperado:
id: 5
motivo: "Usuario invalido"
estado: "rechazada"

--

### Caso 6: Error - Prioridad fuera de rango

Datos de entrada:
id: 6
usuario: "Pedro Ruiz"
area: "ventas"
tipoProblema: "Error al guardar"
prioridad: 9


Resultado esperado:
id: 6
motivo: "Prioridad fuera de rango (1 a 5)"
estado: "rechazada"

--


### Caso 7: Error - Área vacía

Datos de entrada:
id: 7
usuario: "Roberto Castro"
area: [presionar enter sin escribir]
tipoProblema: "Problema de red"
prioridad: 4


Resultado esperado:
id: 7
motivo: "Area invalida"
estado: "rechazada"

--

## 9. Justificación técnica

Uso de callbacks → validacion externa simulada de solicitudes.
Uso de Promesas → simulacion asincronica del tiempo de atencion.
Uso de async/await → coordinacion del flujo completo de procesamiento.
Uso de try/catch → manejo de errores sin bloquear el sistema.
Uso de ciclo for clasico → procesamiento secuencial controlado.
Funcion pura para recalculo → resultado predecible sin efectos secundarios.
Validaciones estrictas → garantizan integridad de los datos.
Inmutabilidad con spread operator → previene efectos secundarios no deseados.
Math.min → garantiza que la prioridad no exceda el maximo permitido.
Mensajes informativos → facilitan el seguimiento del flujo asincronico.
Separacion de responsabilidades → facilita mantenimiento y escalabilidad.