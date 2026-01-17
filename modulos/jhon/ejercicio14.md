##  Ejercicio 14 – Sistema de Análisis y Validación de Transacciones Bancarias

# 1. Datos de entrada

El sistema recibe un arreglo inmutable de objetos, donde cada objeto representa una transacción bancaria registrada durante el día.

Cada transacción contiene la siguiente estructura:

id (number) → Identificador numérico de la transacción

cliente (string) → Nombre del cliente que realiza la operación

tipo (string) → Tipo de transacción (deposito, retiro o transferencia)

monto (number) → Valor monetario de la transacción

autorizado (boolean) → Indica si la transacción está autorizada

Validaciones realizadas

El arreglo puede estar vacío.

El id debe ser un número válido.

El cliente debe ser un texto no vacío.

El tipo debe corresponder a uno de los valores permitidos.

El monto debe ser un número mayor a cero.

El campo autorizado debe ser booleano.

Riesgos si el dato es incorrecto

Montos inválidos pueden alterar los cálculos financieros.

Tipos incorrectos impiden la clasificación correcta.

Transacciones no autorizadas no deben afectar los totales.

Errores no controlados pueden bloquear la ejecución.

Captura desde terminal

Los datos se capturan desde consola usando prompt-sync, solicitando cada campo al usuario de forma secuencial.

# 2. Procesos principales

Carga asíncrona de transacciones

Se implementa una función que retorna una Promesa para simular la carga de datos desde una fuente externa.

Esta promesa se consume mediante async / await.

Se simula un retraso con setTimeout.

Todo el proceso está protegido con try/catch.

# 3. Validación de datos

Durante el recorrido del arreglo:

Se valida el tipo de dato de cada propiedad.

Se verifica que el monto sea mayor a cero.

Se confirma que el tipo de transacción sea válido.

Se controla si la transacción está autorizada.

Las transacciones se separan en:

Válidas

Rechazadas (con motivo)

Este proceso se realiza sin mutar el arreglo original, respetando la inmutabilidad.

# 4. Control de flujo y análisis lógico

Se utilizan:

Condicionales compuestos (if, else if)

Operadores lógicos (&&, ||, !)

Reglas aplicadas:

Si el monto es inválido → transacción rechazada.

Si el tipo no es válido → transacción rechazada.

Si no está autorizada → transacción rechazada.

Solo las transacciones válidas afectan los totales.

5. Recorrido y cálculos

Se utiliza un ciclo for para recorrer las transacciones.

Durante el análisis se calculan:

Total de depósitos

Total de retiros

Cantidad de transacciones procesadas

Cantidad de transacciones válidas

Cantidad de transacciones rechazadas

Cada cálculo se realiza únicamente con transacciones válidas.

# 6. Uso de funciones

Función principal asíncrona → Maneja la carga, validación y análisis general.

Funciones auxiliares → Validan y clasifican transacciones.

Uso de callback → Se aplica en procesos de validación o filtrado específico.

Promesas + async/await → Garantizan un flujo no bloqueante y legible.

Justificación

Promesas simulan fuentes externas.

async/await mejora la claridad del código.

Callbacks permiten validar procesos puntuales.

Separación de funciones facilita mantenimiento y pruebas.

# 7. Manejo de errores

Todo el flujo está protegido con try/catch.

Escenarios controlados:

Arreglo vacío.

Datos mal tipados.

Montos inválidos.

Tipos incorrectos.

Transacciones no autorizadas.

Cada error:

Es capturado.

Genera un mensaje claro.

No bloquea la ejecución del programa.

# 8. Datos de salida

El sistema muestra en la terminal:

Resumen general

Total de transacciones procesadas.

Total de transacciones válidas.

Total de transacciones rechazadas.

Total en depósitos.

Total en retiros.

Detalle de errores

ID de la transacción rechazada.

Motivo del rechazo.

Ejemplo de salida:

Análisis finalizado correctamente
Transacciones procesadas: 15
Transacciones válidas: 11
Transacciones rechazadas: 4
Total en depósitos: $3.500.000
Total en retiros: $1.200.000

# 9. Casos de prueba

Caso 1: Transacción válida – depósito autorizado

Entrada

id: 1

cliente: "Juan Pérez"

tipo: "deposito"

monto: 500000

autorizado: true

Resultado esperado

Transacción válida

Se suma al total de depósitos

Caso 2: Transacción rechazada – monto negativo

Entrada

id: 2

cliente: "Ana López"

tipo: "retiro"

monto: -200000

autorizado: true

Resultado esperado

Rechazada

Motivo: "Monto inválido"

Caso 3: Transacción rechazada – tipo inválido

Entrada

id: 3

cliente: "Carlos Ruiz"

tipo: "pago"

monto: 300000

autorizado: true

Resultado esperado

Rechazada

Motivo: "Tipo de transacción inválido"

Caso 4: Transacción rechazada – no autorizada

Entrada

id: 4

cliente: "Laura Gómez"

tipo: "transferencia"

monto: 100000

autorizado: false

Resultado esperado

Rechazada

Motivo: "Transacción no autorizada"

Caso 5: Error controlado – arreglo vacío

Entrada

[]

Resultado esperado

Resumen con totales en cero

Mensaje claro

El sistema no se bloquea

# 10. Justificación técnica final

Uso de inmutabilidad para proteger los datos originales.

Flujo no bloqueante mediante async/await.

Manejo de errores con try/catch.

Validaciones claras y mensajes personalizados.

Separación lógica del proceso.

Código estable, seguro y fácilmente testeable.