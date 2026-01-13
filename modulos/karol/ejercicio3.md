# Guía Técnica – Ejercicio 3

## Sistema de Gestión y Validación de Solicitudes de Acceso

---

## 1. Descripción general

El Ejercicio 3 implementa un **sistema de validación y decisión de solicitudes de acceso** a un sistema interno.
El proceso combina validaciones sincrónicas, validaciones mediante callback y validaciones asincrónicas usando promesas, simulando un entorno real de control de accesos.

---

## 2. Datos de entrada

El sistema recibe un **objeto solicitud**, el cual contiene la siguiente información:

* `id` (number) → Identificador único de la solicitud.
* `nombre` (string) → Nombre del solicitante.
* `edad` (number) → Edad del solicitante (debe ser mayor o igual a 18).
* `rol` (string) → Rol solicitado (`admin` o `usuario`).
* `permisos` (array de string) → Lista de permisos solicitados.
* `estado` (string) → Estado actual de la solicitud.
* `aceptaCondiciones` (boolean) → Indica si el solicitante aceptó las condiciones del sistema.

---

## 3. Procesos principales

### 3.1 Ingreso de datos

* Los datos son capturados desde el menú general.
* La información se estructura en un objeto `solicitud`.
* El objeto se envía a la función principal para su procesamiento.

---

### 3.2 Validación básica (Callback)

* Se valida que:

  * La edad sea numérica y mayor o igual a 18.
  * El solicitante haya aceptado las condiciones.
  * Existan permisos solicitados.
* La validación se realiza mediante **callback**, retornando:

  * `true` y un mensaje de éxito, o
  * `false` y el motivo del rechazo.

---

### 3.3 Validación rol – permisos

* Se valida la coherencia entre el rol y los permisos solicitados.
* Regla principal:

  * Un usuario con rol `usuario` **no puede solicitar el permiso `eliminar`**.
* Esta validación se implementa como **función pura**, sin efectos secundarios.

---

### 3.4 Validación externa (Promesa / async-await)

* Se simula una validación externa (por ejemplo, antecedentes o seguridad).
* Se introduce un retardo de **1000 ms**.
* El resultado es aleatorio:

  * Aprobación → la solicitud continúa.
  * Rechazo → la solicitud queda en estado de revisión.

---

### 3.5 Flujo principal (async / await)

* Coordina todo el proceso:

  1. Recibe la solicitud.
  2. Ejecuta la validación básica con callback.
  3. Valida rol y permisos.
  4. Ejecuta la validación externa asincrónica.
  5. Determina el estado final de la solicitud.

---

## 4. Manejo de errores

* El sistema utiliza bloques `try/catch` para capturar errores inesperados.
* Los errores se manejan de forma controlada y con mensajes claros.
* Se diferencian tres estados finales:

  * **RECHAZADA** → error en validaciones básicas o rol/permisos.
  * **EN REVISIÓN** → falla en validación externa.
  * **APROBADA** → todas las validaciones superadas.

---

## 5. Datos de salida

El sistema genera mensajes en consola indicando:

* Solicitud aprobada.
* Solicitud rechazada y motivo.
* Solicitud en revisión por validación externa.

Además, el flujo retorna objetos estructurados al menú general cuando corresponde.

---

## 6. Pruebas realizadas

* Edad menor de 18 → solicitud rechazada.
* Condiciones no aceptadas → solicitud rechazada.
* Permisos vacíos → solicitud rechazada.
* Usuario con permiso `eliminar` → solicitud rechazada.
* Fallo en validación externa → solicitud en revisión.
* Solicitud válida completa → acceso concedido.

---

## 7. Justificación técnica

* Uso de **callbacks** → simulación de validaciones heredadas.
* Uso de **promesas y async/await** → manejo moderno de asincronía.
* Separación en funciones pequeñas → mejora mantenimiento y pruebas.
* Funciones puras → mayor claridad y confiabilidad lógica.
* Flujo controlado con manejo de errores → el sistema nunca se bloquea.

---

## 8. Conclusión

El Ejercicio 3 representa un sistema robusto de validación de accesos, integrando distintos paradigmas de programación asincrónica en JavaScript y siguiendo buenas prácticas de diseño, claridad y control de errores.
