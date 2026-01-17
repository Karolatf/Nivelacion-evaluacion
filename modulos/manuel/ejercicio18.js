async function ejecutarEjercicio18() {
  console.log("\n--- EJERCICIO 18 ---");

  const solicitudes = [];
  const cantidad = parseInt(prompt("¿Cuántas solicitudes desea ingresar? "));

  for (let i = 0; i < cantidad; i++) {
    console.log(`\nSolicitud ${i + 1}`);

    solicitudes.push({
      id: parseInt(prompt("ID: ")),
      usuario: prompt("Usuario: "),
      tipo: prompt("Tipo (hardware/software/red): "),
      nivel: parseInt(prompt("Nivel de urgencia (1-5): ")),
      activo: prompt("Activo (true/false): ") === "true"
    });
  }

  console.log("\nANALIZANDO SOLICITUDES...\n");

  try {
    const resultado = await procesarSolicitudesEj18(solicitudes);

    console.log("\n--- RESUMEN GENERAL ---");
    console.log(`Total recibidas: ${resultado.total}`);
    console.log(`Solicitudes válidas: ${resultado.validas}`);
    console.log(`Solicitudes rechazadas: ${resultado.invalidas}`);

    if (resultado.rechazadas.length > 0) {
      console.log("\n--- SOLICITUDES RECHAZADAS ---");
      resultado.rechazadas.forEach(s => {
        console.log(`ID ${s.id}: ${s.motivo}`);
      });
    }

    if (resultado.prioridadAlta.length > 0) {
      console.log("\n--- PRIORIDAD ALTA ---");
      resultado.prioridadAlta.forEach(s => {
        console.log(`Solicitud ${s.id} | Usuario: ${s.usuario} | Nivel: ${s.nivel}`);
      });
    }

    if (resultado.prioridadMedia.length > 0) {
      console.log("\n--- PRIORIDAD MEDIA ---");
      resultado.prioridadMedia.forEach(s => {
        console.log(`Solicitud ${s.id} | Usuario: ${s.usuario} | Nivel: ${s.nivel}`);
      });
    }

    if (resultado.prioridadBaja.length > 0) {
      console.log("\n--- PRIORIDAD BAJA ---");
      resultado.prioridadBaja.forEach(s => {
        console.log(`Solicitud ${s.id} | Usuario: ${s.usuario} | Nivel: ${s.nivel}`);
      });
    }

    console.log("\n✔ Proceso finalizado sin bloqueos");

  } catch (error) {
    console.log("Error crítico controlado:", error.message);
  }
}
