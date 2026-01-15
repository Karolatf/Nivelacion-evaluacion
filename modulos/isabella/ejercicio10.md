# Ejercicio 10 - Sistema de Gestión Lógica de Solicitudes de Soporte Técnico

## 1. Datos de entrada

El sistema recibe un arreglo de objetos, donde cada objeto representa una solicitud de soporte técnico.

Cada solicitud incluye los siguientes campos:

id (number entero positivo) → Identificador de la solicitud
area (string) → Área que reporta (infraestructura, desarrollo, administración)
nivelUrgencia (number entero entre 1 y 5) → Nivel de urgencia de la solicitud
descripcion (string) → Descripción del problema reportado
reportadoPorSistema (boolean) → Indica si fue reportado por sistema automatizado
intentosPrevios (number mayor o igual a 0) → Cantidad de intentos previos de solución

--

## 2. Procesos principales

Validación básica con callback

Se verifica que los datos de cada solicitud cumplan las reglas mínimas:

El id debe ser un número entero positivo.
El área debe ser un texto no vacío.
La descripción debe ser un texto no vacío.
El campo reportadoPorSistema debe ser booleano.
Los intentos previos deben ser un número mayor o igual a cero.

Si alguna validación falla, se retorna un error mediante callback.
El proceso se ejecuta de forma asincrónica usando setTimeout.

--

## 3. Validación de urgencia (Promesa)

Se usa una función que retorna una Promesa.
Se valida que el nivel de urgencia esté entre 1 y 5.
Se valida que sea de tipo numérico.
El proceso se ejecuta de forma asincrónica.
Si la validación falla, se rechaza la promesa.
Si la validación es correcta, se resuelve la promesa.

--

## 4. Lógica de decisión (Función pura)

Se evalúa el estado final de la solicitud aplicando reglas de negocio:

ATENDIDA → si urgencia es 4 o 5 Y fue reportada por sistema.
RECHAZADA → si hay 3 o más intentos previos.
EN ESPERA → en cualquier otro caso.

La función no modifica el objeto original.
Retorna únicamente el estado determinado.

--

## 5. Procesamiento de solicitudes

Se recorre el arreglo usando un ciclo for...of.
Cada solicitud se procesa de forma independiente.
Las solicitudes válidas se agregan al arreglo de resultados.
Las solicitudes con errores se agregan al arreglo de errores.
El sistema continúa procesando incluso cuando hay errores.

--

## 6. Flujo principal con async/await

La función principal coordina todo el proceso:

Ejecuta validación básica con callback.
Ejecuta validación de urgencia con promesa.
Determina el estado usando la función de decisión.
Crea un nuevo objeto con spread operator (inmutabilidad).
Almacena resultados y errores en arreglos separados.
Maneja errores de forma controlada.

--

## 7. Manejo de errores

Todo el flujo está protegido con bloques try/catch.
Los errores individuales no detienen el procesamiento completo.
Cada solicitud con error se almacena con su ID y mensaje.
El sistema nunca se bloquea por errores inesperados.
Los mensajes de error son claros y específicos.

--

## 8. Datos de salida

El sistema retorna un objeto con los siguientes datos:

resultados → Arreglo de solicitudes procesadas correctamente con:
  - Todos los datos originales de la solicitud
  - estado (ATENDIDA, RECHAZADA o EN ESPERA)

errores → Arreglo de solicitudes con error con:
  - id (identificador)
  - mensaje (descripción del error)

--

## 9. Casos de prueba

### Caso 1: Solicitud atendida - urgencia alta y reportada por sistema

Datos de entrada:
{
  id: 1,
  area: "infraestructura",
  nivelUrgencia: 5,
  descripcion: "Servidor caído",
  reportadoPorSistema: true,
  intentosPrevios: 0
}

Resultado esperado:
estado: "ATENDIDA"
Solicitud procesada correctamente

--

### Caso 2: Solicitud en espera - urgencia media

Datos de entrada:
{
  id: 2,
  area: "desarrollo",
  nivelUrgencia: 3,
  descripcion: "Error en compilación",
  reportadoPorSistema: false,
  intentosPrevios: 1
}

Resultado esperado:
estado: "EN ESPERA"
Solicitud procesada correctamente

--

### Caso 3: Solicitud rechazada - múltiples intentos previos

Datos de entrada:
{
  id: 3,
  area: "administración",
  nivelUrgencia: 2,
  descripcion: "Problema de acceso",
  reportadoPorSistema: false,
  intentosPrevios: 3
}

Resultado esperado:
estado: "RECHAZADA"
Solicitud procesada correctamente

--

### Caso 4: Solicitud en espera - urgencia alta sin reporte de sistema

Datos de entrada:
{
  id: 4,
  area: "infraestructura",
  nivelUrgencia: 4,
  descripcion: "Red lenta",
  reportadoPorSistema: false,
  intentosPrevios: 0
}

Resultado esperado:
estado: "EN ESPERA"
Solicitud procesada correctamente

--

### Caso 5: Error - ID inválido (validación con callback)

Datos de entrada:
{
  id: "ABC",
  area: "desarrollo",
  nivelUrgencia: 3,
  descripcion: "Bug en aplicación",
  reportadoPorSistema: true,
  intentosPrevios: 0
}

Resultado esperado:
id: "SIN ID"
mensaje: "Datos básicos inválidos"
Solicitud no procesada

--

### Caso 6: Error - Área vacía (validación con callback)

Datos de entrada:
{
  id: 6,
  area: "",
  nivelUrgencia: 4,
  descripcion: "Error crítico",
  reportadoPorSistema: true,
  intentosPrevios: 0
}

Resultado esperado:
id: 6
mensaje: "Datos básicos inválidos"
Solicitud no procesada

--

### Caso 7: Error - Nivel de urgencia fuera de rango (validación con promesa)

Datos de entrada:
{
  id: 7,
  area: "infraestructura",
  nivelUrgencia: 8,
  descripcion: "Servidor sin respuesta",
  reportadoPorSistema: true,
  intentosPrevios: 0
}

Resultado esperado:
id: 7
mensaje: "Nivel de urgencia fuera de rango (1 a 5)"
Solicitud no procesada

--

### Caso 8: Error - Intentos previos negativos (validación con callback)

Datos de entrada:
{
  id: 8,
  area: "desarrollo",
  nivelUrgencia: 2,
  descripcion: "Error de sintaxis",
  reportadoPorSistema: false,
  intentosPrevios: -1
}

Resultado esperado:
id: 8
mensaje: "Datos básicos inválidos"
Solicitud no procesada

--

## 10. Justificación técnica

Uso de callback → validación básica externa simulada.
Uso de Promesas → validación de urgencia asincrónica.
Uso de async/await → coordinación del flujo completo.
Uso de try/catch → manejo de errores sin bloquear el sistema.
Uso de ciclo for...of → procesamiento secuencial de solicitudes.
Uso de spread operator → garantía de inmutabilidad.
Función pura para decisión → resultado predecible sin efectos secundarios.
Operadores lógicos compuestos → evaluación de múltiples condiciones.
Operador nullish coalescing (??) → manejo seguro de valores indefinidos.
Separación de responsabilidades → funciones con propósitos específicos.