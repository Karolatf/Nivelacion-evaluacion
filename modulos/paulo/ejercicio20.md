# Ejercicio 21 - Sistema de Solicitud de Ingresos

## 1. Datos de entrada

El sistema recibe un arreglo de objetos que NO debe modificarse directamente.

Cada solicitud incluye los siguientes campos:

id (number) → Identificador numérico de la solicitud
valor (number) → Valor numérico asociado a la solicitud
estado (string) → Estado inicial representado como texto
aprobado (boolean) → Indicador lógico que influye en la decisión final

--

## 2. Procesos principales

Validación de datos

Se verifica que cada solicitud cumpla con los tipos esperados:

El identificador debe ser un número.
El valor debe ser un número.
El estado debe ser un string no vacío.
El aprobado debe ser un booleano.

Los tipos de datos NO se asumen como correctos.
El sistema valida que los valores numéricos realmente lo sean.
Estados desconocidos o valores inconsistentes generan errores controlados.

--

## 3. Validación externa con promesa

Se ejecuta una promesa que simula una validación externa por cada solicitud:

Valida que el valor sea mayor a cero.
Simula tiempo de procesamiento asíncrono.
Si la validación falla, se rechaza la promesa.

--

## 4. Decisión final

Según el resultado de la promesa y las condiciones internas se decide:

APROBADA → si aprobado = true y valor > 100
RECHAZADA → si aprobado = false
REVISION (estado intermedio) → si aprobado = true pero valor <= 100

--

## 5. Procesamiento inmutable

NO se modifican los datos originales.
Se crean nuevos objetos usando spread operator.
Cada solicitud procesada contiene el estado final y motivo.

--

## 6. Gestión de fallos

Un error en una solicitud NO interrumpe el procesamiento de las demás.
Los errores se capturan con try/catch.
Cada error se almacena con su identificador y mensaje.

--

## 7. Datos de salida

El sistema retorna un objeto con:

originales → El arreglo original sin modificaciones
aprobadas → Solicitudes aprobadas o en revisión con:
  - id
  - valor
  - estado original
  - aprobado
  - estadoFinal
  - motivo
rechazadas → Solicitudes rechazadas con misma estructura
errores → Solicitudes que fallaron con:
  - id
  - error (mensaje descriptivo)
resumen → Objeto con:
  - totalAprobadas
  - totalRechazadas
  - totalErrores

También muestra resumen individual por solicitud indicando:
- Identificador
- Estado final
- Motivo de la decisión

--

## 8. Casos de prueba

### Caso 1: Solicitud aprobada - valor alto

Datos de entrada:
id: 1
valor: 500
estado: "pendiente"
aprobado: true

Resultado esperado:
id: 1
valor: 500
estadoFinal: "APROBADA"
motivo: "Solicitud cumple criterios de aprobacion"

--

### Caso 2: Solicitud en revision - valor bajo

Datos de entrada:
id: 2
valor: 50
estado: "pendiente"
aprobado: true

Resultado esperado:
id: 2
valor: 50
estadoFinal: "REVISION"
motivo: "Requiere validacion adicional por monto bajo"

--

### Caso 3: Solicitud rechazada - no autorizada

Datos de entrada:
id: 3
valor: 300
estado: "pendiente"
aprobado: false

Resultado esperado:
id: 3
valor: 300
estadoFinal: "RECHAZADA"
motivo: "Solicitud no autorizada"

--

### Caso 4: Solicitud aprobada - valor medio

Datos de entrada:
id: 4
valor: 150
estado: "revision"
aprobado: true

Resultado esperado:
id: 4
valor: 150
estadoFinal: "APROBADA"
motivo: "Solicitud cumple criterios de aprobacion"

--

### Caso 5: Error - valor cero

Datos de entrada:
id: 5
valor: 0
estado: "pendiente"
aprobado: true

Resultado esperado:
id: 5
error: "Valor debe ser mayor a cero"

--

### Caso 6: Error - valor negativo

Datos de entrada:
id: 6
valor: -100
estado: "pendiente"
aprobado: true

Resultado esperado:
id: 6
error: "Valor debe ser mayor a cero"

--

### Caso 7: Error - aprobado no booleano

Datos de entrada:
id: 7
valor: 200
estado: "pendiente"
aprobado: "si"

Resultado esperado:
id: 7
error: "Indicador de aprobacion invalido"

--

### Caso 8: Error - identificador invalido

Datos de entrada:
id: "ABC"
valor: 100
estado: "pendiente"
aprobado: true

Resultado esperado:
id: null
error: "Identificador invalido"

--

## 9. Justificación técnica

Validaciones estrictas → garantizan tipos correctos de datos.
Promesa para validacion externa → simula consultas asincronas.
Funciones puras para decision → resultado predecible sin efectos secundarios.
Inmutabilidad con spread operator → preserva datos originales.
Try/catch → captura errores sin bloquear el sistema.
Ciclo for → procesamiento secuencial controlado.
Condicionales compuestos → evaluan multiples condiciones de negocio.
Estado intermedio REVISION → cubre casos que no son ni aprobados ni rechazados.
Resumen individual y general → facilita seguimiento del proceso.
Mensajes claros → indican que ocurrio y por que.