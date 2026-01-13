# Ejercicio 2 – Sistema de Validación y Decisión de Solicitudes

## 1. Descripción general

Este ejercicio implementa un sistema que procesa solicitudes registradas por terminal, validando la integridad de los datos, ejecutando un proceso asincrónico simulado y determinando un resultado final según reglas de negocio previamente definidas.

El diseño está orientado a la modularidad, el control de errores y el uso de programación asincrónica con `async/await`.

---

## 2. Objetivo del sistema

Garantizar que cada solicitud:

* Sea validada correctamente antes de ser procesada.
* Pase por un proceso externo simulado.
* Obtenga un resultado coherente (APROBADA, RECHAZADA o INVÁLIDA).
* Notifique el resultado del procesamiento.

---

## 3. Estructura de la solicitud

La solicitud debe cumplir con la siguiente estructura:

```js
{
  id: Number,
  tipo: String,
  valor: Number,
  estado: Boolean,
  prioridad: Number // rango de 1 a 5
}
```

---

## 4. Funciones del sistema

### 4.1 `validarSolicitud(solicitud)`

**Tipo:** Función de validación

**Descripción:**
Verifica que los datos básicos de la solicitud sean válidos antes de continuar con el procesamiento.

**Validaciones realizadas:**

* `id` debe ser numérico.
* `tipo` debe ser texto no vacío.
* `valor` debe ser numérico.
* `estado` debe ser booleano.
* `prioridad` debe estar entre 1 y 5.

**Salida:**

* Retorna `true` si la validación es exitosa.
* Lanza un error si alguna validación falla.

---

### 4.2 `decidirResultado(solicitud)`

**Tipo:** Función pura

**Descripción:**
Determina el resultado de la solicitud sin modificar el objeto recibido.

**Reglas de decisión:**

* Si `valor <= 0` → `INVÁLIDA`
* Si `estado` es `false` y `prioridad < 3` → `RECHAZADA`
* En cualquier otro caso → `APROBADA`

---

### 4.3 `notificarResultado(resultado)`

**Tipo:** Callback

**Descripción:**
Simula el envío de una notificación posterior al procesamiento de la solicitud.

**Salida:**

* Retorna un mensaje de notificación en texto.

---

### 4.4 `procesoAsincronico()`

**Tipo:** Promesa

**Descripción:**
Simula un proceso externo asincrónico con un retardo de 800 ms.

**Salida:**

* Resuelve la promesa con un mensaje de confirmación.

---

### 4.5 `procesarSolicitudEj2(solicitud)`

**Tipo:** Función principal (`async/await`)

**Descripción:**
Controla el flujo completo del sistema:

1. Valida los datos.
2. Ejecuta el proceso asincrónico.
3. Determina el resultado.
4. Notifica el resultado.
5. Maneja errores controlados.

**Exportación:**

```js
export async function procesarSolicitudEj2(solicitud)
```

**Salida exitosa:**

```js
{
  id: Number,
  resultado: String,
  notificacion: String
}
```

**Salida con error:**

```js
{
  id: Number | null,
  resultado: "ERROR",
  mensaje: String
}
```

---

## 5. Manejo de errores

El sistema utiliza un bloque `try/catch` para capturar errores de validación y retornarlos de forma controlada, evitando fallos inesperados en la ejecución.

---

## 6. Principios aplicados

* Programación modular
* Funciones puras
* Encapsulación
* Programación asincrónica
* Manejo controlado de errores

---

## 7. Conclusión

El Ejercicio 2 demuestra el uso correcto de validaciones, asincronía, callbacks y control de flujo en JavaScript, manteniendo una estructura clara, escalable y fácil de integrar con otros módulos del sistema.
