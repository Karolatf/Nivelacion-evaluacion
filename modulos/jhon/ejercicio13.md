## Ejercicio 13 – Sistema de Gestión y Validación de Solicitudes de Soporte Técnico

# 1. Datos de entrada

El sistema recibe un arreglo inmutable de objetos, donde cada objeto representa una solicitud de soporte técnico.

Cada solicitud contiene los siguientes campos:

id (number) → Identificador numérico único de la solicitud.

usuario (string) → Nombre del usuario que reporta el incidente.

tipo (string) → Tipo de solicitud (hardware, software o red).

prioridad (number) → Nivel de prioridad (entero entre 1 y 5).

descripcion (string) → Descripción del problema (mínimo 10 caracteres).

activo (boolean) → Indica si la solicitud está activa.

El arreglo original no se modifica directamente, garantizando la inmutabilidad de los datos de entrada.

# 2. Procesos principales
Validación de datos básicos

Se verifica que cada solicitud cumpla las reglas mínimas antes de ser procesada:

El id debe ser un número entero positivo.

El usuario debe ser un texto no vacío.

El tipo debe corresponder a uno de los valores permitidos.

La prioridad debe ser un número entero entre 1 y 5.

La descripcion debe tener al menos 10 caracteres.

El activo debe ser de tipo booleano.

Si alguna validación falla, se lanza un Error con un mensaje claro y controlado, y la solicitud se clasifica como inválida sin detener el sistema.

# 3. Clasificación de solicitudes (Función pura)

Las solicitudes válidas se clasifican según su nivel de prioridad:

Alta → Prioridad 4 o 5.

Media → Prioridad 2 o 3.

Baja → Prioridad 1.

Esta clasificación se realiza mediante una función pura, la cual no modifica los datos originales y solo retorna el resultado de la evaluación.

# 4. Procesamiento asincrónico (Callback)

Se utiliza una función con callback para simular un procesamiento inicial del sistema, como una notificación o registro interno.

El proceso se ejecuta de forma asincrónica usando setTimeout.

El resultado se devuelve mediante el callback.

Permite simular sistemas legacy o integraciones externas.

# 5. Procesamiento asincrónico (Promesa)

Posteriormente, cada solicitud válida pasa por un proceso que retorna una Promesa:

Simula una operación externa más compleja.

Utiliza setTimeout para representar tiempo de espera.

Retorna un mensaje de finalización del proceso.

# 6. Coordinación del flujo (Async / Await)

El flujo completo de validación, clasificación y procesamiento se coordina mediante una función principal async.

Permite un flujo secuencial claro.

Facilita el manejo de errores.

Garantiza que cada solicitud se procese completamente antes de continuar.

# 7. Manejo de errores

Todo el sistema está protegido mediante bloques try/catch:

Errores de validación se capturan y se reportan de forma controlada.

Errores en procesos asincrónicos no bloquean la ejecución.

El sistema continúa procesando las demás solicitudes.

En ningún escenario el programa se detiene abruptamente.

# 8. Datos de salida

El sistema retorna un objeto con la siguiente información:

Resumen general

Total de solicitudes recibidas.

Total de solicitudes válidas.

Total de solicitudes inválidas.

Detalle de resultados

Para cada solicitud procesada se informa:

id → Identificador de la solicitud.

tipo → Tipo de soporte.

prioridad → Nivel de prioridad.

clasificación → Alta, Media o Baja.

estadoFinal → Estado del procesamiento.

detalles → Resultado de cada proceso asincrónico.

Ejemplos de salida

Solicitud procesada correctamente.

Solicitud marcada como inválida por error de validación.

Error controlado durante el procesamiento.

# 9. Casos de prueba
Caso 1: Solicitud válida con prioridad alta

Datos de entrada:

id: 1

usuario: "Carlos Pérez"

tipo: "hardware"

prioridad: 5

descripcion: "El computador no enciende correctamente"

activo: true

Resultado esperado:

Clasificación: ALTA

Estado final: PROCESADA

Caso 2: Solicitud inválida – usuario vacío

Datos de entrada:

id: 2

usuario: ""

tipo: "software"

prioridad: 3

descripcion: "Error al iniciar el programa"

activo: true

Resultado esperado:

Estado: INVÁLIDA

Error: "Usuario inválido"

Caso 3: Solicitud inválida – prioridad fuera de rango

Datos de entrada:

id: 3

usuario: "Ana Torres"

tipo: "red"

prioridad: 9

descripcion: "Problemas de conexión intermitente"

activo: true

Resultado esperado:

Estado: INVÁLIDA

Error: "Prioridad fuera de rango (1 a 5)"

Caso 4: Solicitud inválida – descripción corta

Datos de entrada:

id: 4

usuario: "Luis Gómez"

tipo: "hardware"

prioridad: 2

descripcion: "No sirve"

activo: true

Resultado esperado:

Estado: INVÁLIDA

Error: "Descripción demasiado corta"

Caso 5: Error – estado no booleano

Datos de entrada:

id: 5

usuario: "María López"

tipo: "software"

prioridad: 4

descripcion: "El sistema se bloquea al guardar datos"

activo: "sí"

Resultado esperado:

Estado: INVÁLIDA

Error: "Estado activo inválido"

# 10. Justificación técnica

Uso de funciones puras → garantiza inmutabilidad y facilidad de pruebas.

Uso de callbacks → simula integraciones externas.

Uso de Promesas → manejo moderno de asincronía.

Uso de async/await → mejora la legibilidad del código.

Uso de try/catch → evita bloqueos del sistema.

Separación de responsabilidades → facilita mantenimiento.

Validaciones estrictas → garantizan integridad y seguridad de los datos.