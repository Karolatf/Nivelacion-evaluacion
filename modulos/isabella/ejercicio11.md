# Ejercicio 11 - Sistema de Validación y Procesamiento de Solicitudes de Acceso

## 1. Datos de entrada

El sistema recibe un arreglo de objetos, donde cada objeto representa una solicitud de acceso a sistemas internos.

Cada solicitud incluye los siguientes campos:

id (number entero positivo) → Identificador de la solicitud
nombre (string) → Nombre del solicitante
rol (string) → Rol del usuario (admin, tecnico, usuario)
nivelAccesoSolicitado (number) → Nivel de acceso requerido (1 a 5)
activo (boolean) → Indica si el usuario está activo
intentosPrevios (number mayor o igual a 0) → Cantidad de intentos previos fallidos

--

## 2. Procesos principales

Validación básica con callback

Se verifica que los datos de cada solicitud cumplan las reglas mínimas:

El id debe ser un número entero positivo.
El nombre debe ser un texto no vacío.
El rol debe ser un string.
El nivel de acceso debe ser numérico.
El estado activo debe ser booleano.
Los intentos previos deben ser número mayor o igual a cero.

Si alguna validación falla, se retorna un error mediante callback.
El proceso se ejecuta de forma asincrónica usando setTimeout.

--

## 3. Validación de nivel de acceso (Promesa)

Se usa una función que retorna una Promesa.
Se valida que el nivel de acceso esté entre 1 y 5.
El proceso se ejecuta de forma asincrónica.
Si el nivel está fuera de rango, se rechaza la promesa.
Si el nivel es válido, se resuelve la promesa.

--

## 4. Lógica de decisión (Función pura)

Se evalúa el estado final aplicando reglas de negocio:

DENEGADO → si el usuario está inactivo.
BLOQUEADO → si hay 3 o más intentos previos fallidos.
APROBADO → si el rol y nivel de acceso son compatibles:
  - Admin con nivel 4 o 5 → acceso administrativo
  - Técnico con nivel 3 o más → acceso técnico
  - Usuario con nivel 1 o 2 → acceso básico
DENEGADO → si no cumple con los criterios anteriores.

La función retorna un objeto con estado y motivo.
No modifica el objeto original.

--

## 5. Procesamiento de solicitudes

Se recorre el arreglo usando un ciclo for...of.
Cada solicitud se valida y procesa de forma independiente.
Las solicitudes válidas se agregan al arreglo de resultados.
Las solicitudes con errores se agregan al arreglo de errores.
El sistema continúa procesando incluso cuando hay errores.

--

## 6. Flujo principal con async/await

La función principal coordina todo el proceso:

Ejecuta validación básica con callback.
Ejecuta validación de nivel de acceso con promesa.
Determina el estado usando la función de decisión.
Crea un nuevo objeto con spread operator (inmutabilidad).
Almacena resultados con estado y motivo.
Captura errores y los registra.
Genera resumen final del sistema.

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

resultados → Arreglo de solicitudes procesadas con:
  - Todos los datos originales
  - estado (APROBADO, DENEGADO o BLOQUEADO)
  - motivo (razón de la decisión)

errores → Arreglo de solicitudes con error con:
  - id (identificador)
  - mensaje (descripción del error)

estadoSistema → Mensaje indicando si el proceso fue correcto o con errores

--

## 9. Casos de prueba

### Caso 1: Acceso aprobado - admin con nivel alto

Datos de entrada:
{
  id: 1,
  nombre: "Carlos Mendez",
  rol: "admin",
  nivelAccesoSolicitado: 5,
  activo: true,
  intentosPrevios: 0
}

Resultado esperado:
estado: "APROBADO"
motivo: "Acceso administrativo concedido"

--

### Caso 2: Acceso aprobado - técnico con nivel adecuado

Datos de entrada:
{
  id: 2,
  nombre: "Felipe Lopez",
  rol: "tecnico",
  nivelAccesoSolicitado: 3,
  activo: true,
  intentosPrevios: 1
}

Resultado esperado:
estado: "APROBADO"
motivo: "Acceso técnico concedido"

--

### Caso 3: Acceso aprobado - usuario básico

Datos de entrada:
{
  id: 3,
  nombre: "Luis Garcia",
  rol: "usuario",
  nivelAccesoSolicitado: 2,
  activo: true,
  intentosPrevios: 0
}

Resultado esperado:
estado: "APROBADO"
motivo: "Acceso básico concedido"

--

### Caso 4: Acceso denegado - usuario inactivo

Datos de entrada:
{
  id: 4,
  nombre: "Maria Torres",
  rol: "admin",
  nivelAccesoSolicitado: 5,
  activo: false,
  intentosPrevios: 0
}

Resultado esperado:
estado: "DENEGADO"
motivo: "Usuario inactivo"

--

### Caso 5: Acceso bloqueado - múltiples intentos fallidos

Datos de entrada:
{
  id: 5,
  nombre: "Pedro Ruiz",
  rol: "tecnico",
  nivelAccesoSolicitado: 3,
  activo: true,
  intentosPrevios: 3
}

Resultado esperado:
estado: "BLOQUEADO"
motivo: "Demasiados intentos fallidos"

--

### Caso 6: Acceso denegado - nivel insuficiente para rol

Datos de entrada:
{
  id: 6,
  nombre: "Sandra Diaz",
  rol: "usuario",
  nivelAccesoSolicitado: 4,
  activo: true,
  intentosPrevios: 0
}

Resultado esperado:
estado: "DENEGADO"
motivo: "Nivel de acceso insuficiente"

--

### Caso 7: Error - nivel de acceso fuera de rango (validación con promesa)

Datos de entrada:
{
  id: 7,
  nombre: "Roberto Castro",
  rol: "admin",
  nivelAccesoSolicitado: 8,
  activo: true,
  intentosPrevios: 0
}

Resultado esperado:
id: 7
mensaje: "Nivel de acceso fuera de rango (1 a 5)"
Solicitud no procesada

--

### Caso 8: Error - nombre vacío (validación con callback)

Datos de entrada:
{
  id: 8,
  nombre: "",
  rol: "tecnico",
  nivelAccesoSolicitado: 3,
  activo: true,
  intentosPrevios: 0
}

Resultado esperado:
id: 8
mensaje: "Datos básicos inválidos"
Solicitud no procesada

--

## 10. Justificación técnica

Uso de callback → validación básica externa simulada.
Uso de Promesas → validación de nivel de acceso asincrónica.
Uso de async/await → coordinación del flujo completo.
Uso de try/catch → manejo de errores sin bloquear el sistema.
Uso de ciclo for...of → procesamiento secuencial de solicitudes.
Uso de spread operator → garantía de inmutabilidad.
Función pura para decisión → resultado predecible con múltiples condiciones.
Operadores lógicos compuestos → evaluación de reglas complejas de negocio.
Operador nullish coalescing (??) → manejo seguro de valores indefinidos.
Retorno de objeto con estado y motivo → información detallada para el usuario.