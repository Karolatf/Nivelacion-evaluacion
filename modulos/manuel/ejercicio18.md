# Ejercicio 18 - Sistema de Gestión y Validación de Solicitudes de Soporte Técnico

## 1. Datos de entrada

El sistema recibe un arreglo inmutable de objetos, donde cada objeto representa una solicitud de soporte técnico.

Cada solicitud incluye los siguientes campos:

id (number) → Identificador único de la solicitud
usuario (string) → Nombre del solicitante
tipo (string) → Tipo de problema ("hardware", "software" o "red")
nivel (number entero entre 1 y 5) → Nivel de urgencia
activo (boolean) → Indica si la solicitud sigue vigente

--

## 2. Procesos principales

Validación de datos con callback

Se verifica que cada solicitud cumpla las reglas mínimas:

El id debe ser un número.
El usuario debe ser un string no vacío.
El tipo debe ser "hardware", "software" o "red".
El nivel debe ser un número entero entre 1 y 5.
El activo debe ser de tipo booleano.
La solicitud debe estar activa (true).

Si alguna validación falla, se retorna un error mediante callback.
El proceso se ejecuta de forma asíncrona usando setTimeout.

--

## 3. Clasificación por nivel de urgencia (Promesa)

Se usa una función que retorna una Promesa.
Se clasifica la solicitud según su nivel de urgencia:

Alta: nivel 4 o 5
Media: nivel 2 o 3
Baja: nivel 1

La función no modifica los datos originales.
Retorna la solicitud con la clasificación de prioridad.

--

## 4. Procesamiento individual (Async/await)

Cada solicitud válida se procesa usando async/await:

Se espera la clasificación por nivel.
Se construye el resultado final con toda la información.
Se retorna la solicitud procesada.

Simula operaciones asíncronas relacionadas con la atención.

--

## 5. Coordinación del flujo principal

La función principal coordina todo el proceso:

Valida que la entrada sea un arreglo.
Recorre las solicitudes usando ciclo for.
Ejecuta validación con callback.
Procesa cada solicitud con async/await.
Separa solicitudes válidas e inválidas.
Maneja errores de forma controlada.

--

## 6. Manejo de errores

Todo el flujo está protegido con bloques try/catch:

Errores de validación se capturan y reportan.
El sistema continúa procesando las demás solicitudes.
Cada error se almacena con su ID y mensaje descriptivo.
El programa no se detiene abruptamente.

--

## 7. Datos de salida

El sistema retorna un objeto con los siguientes datos:

resumen → Objeto con estadísticas generales:
  - totalRecibidas (total de solicitudes)
  - validas (cantidad de solicitudes válidas)
  - invalidas (cantidad de solicitudes inválidas)

solicitudesInvalidas → Arreglo de solicitudes con error con:
  - id (identificador)
  - motivo (descripción del error)

solicitudesValidas → Arreglo de solicitudes procesadas con:
  - id (identificador)
  - usuario (nombre del solicitante)
  - tipo (tipo de problema)
  - nivel (nivel de urgencia)
  - prioridad (ALTA, MEDIA o BAJA)
  - estadoFinal (PROCESADA o ERROR)

--

## 8. Casos de prueba

### Caso 1: Solicitud válida con nivel alto

Datos de entrada:
{
  id: 1,
  usuario: "Carlos Perez",
  tipo: "hardware",
  nivel: 5,
  activo: true
}

Resultado esperado:
id: 1
usuario: "Carlos Perez"
tipo: "hardware"
nivel: 5
prioridad: "ALTA"
estadoFinal: "PROCESADA"

--

### Caso 2: Solicitud válida con nivel medio

Datos de entrada:
{
  id: 2,
  usuario: "Ana Torres",
  tipo: "software",
  nivel: 3,
  activo: true
}

Resultado esperado:
id: 2
usuario: "Ana Torres"
tipo: "software"
nivel: 3
prioridad: "MEDIA"
estadoFinal: "PROCESADA"

--

### Caso 3: Solicitud válida con nivel bajo

Datos de entrada:
{
  id: 3,
  usuario: "Luis Gomez",
  tipo: "red",
  nivel: 1,
  activo: true
}

Resultado esperado:
id: 3
usuario: "Luis Gomez"
tipo: "red"
nivel: 1
prioridad: "BAJA"
estadoFinal: "PROCESADA"

--

### Caso 4: Error - ID inválido

Datos de entrada:
{
  id: "ABC",
  usuario: "Maria Lopez",
  tipo: "hardware",
  nivel: 4,
  activo: true
}

Resultado esperado:
id: null
motivo: "ID invalido"
Solicitud no procesada

--

### Caso 5: Error - Usuario vacío

Datos de entrada:
{
  id: 5,
  usuario: "",
  tipo: "software",
  nivel: 3,
  activo: true
}

Resultado esperado:
id: 5
motivo: "Usuario invalido"
Solicitud no procesada

--

### Caso 6: Error - Tipo inválido

Datos de entrada:
{
  id: 6,
  usuario: "Pedro Ruiz",
  tipo: "telefonia",
  nivel: 4,
  activo: true
}

Resultado esperado:
id: 6
motivo: "Tipo de solicitud invalido"
Solicitud no procesada

--

### Caso 7: Error - Nivel fuera de rango

Datos de entrada:
{
  id: 7,
  usuario: "Sandra Diaz",
  tipo: "hardware",
  nivel: 9,
  activo: true
}

Resultado esperado:
id: 7
motivo: "Nivel fuera de rango (1 a 5)"
Solicitud no procesada

--

### Caso 8: Error - Solicitud inactiva

Datos de entrada:
{
  id: 8,
  usuario: "Roberto Castro",
  tipo: "red",
  nivel: 4,
  activo: false
}

Resultado esperado:
id: 8
motivo: "La solicitud esta inactiva"
Solicitud no procesada

--

## 9. Justificación técnica

Uso de callbacks → validación externa simulada de solicitudes.
Uso de Promesas → clasificación asíncrona por nivel de urgencia.
Uso de async/await → coordinación del flujo completo de procesamiento.
Uso de try/catch → manejo de errores sin bloquear el sistema.
Uso de ciclo for → procesamiento secuencial de solicitudes.
Validaciones estrictas → garantizan integridad de los datos.
Inmutabilidad con spread operator → previene efectos secundarios.
Operador nullish coalescing (??) → manejo seguro de IDs faltantes.
Number.isInteger → validación precisa de números enteros.
Includes → validación de valores permitidos.
Separación de responsabilidades → facilita mantenimiento y escalabilidad.