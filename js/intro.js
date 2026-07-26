// =======================================
// REINO DE ORIÓN
// Introducción
// =======================================
async function iniciar() {
    // Cargar historia
    const respuesta = await fetch("data/history.json");
    const historia = await respuesta.json();
    // Mostrar texto
    const crawl = document.getElementById("crawl");
    crawl.innerHTML = historia.paragraphs.join("<br><br>");
    // Música
    const musica = document.getElementById("introMusic");
        musica.volume = 0.5; // Ajusta el volumen según tus preferencias
        musica.play()
        .then(() => {
            console.log("🎵 Música iniciada correctamente");
        })
        .catch((error) => {
            console.error("❌ Error al reproducir:", error);
        });
    // Mostrar botón al terminar la historia
    setTimeout(() => {
        document.getElementById("startButton").style.display = "block";
    }, 5000);
}

// =======================================
// Entrar al Reino
// =======================================
document.getElementById("startButton").addEventListener("click", () => {
    // Detener música
    document.getElementById("introMusic").pause();
    // Ocultar introducción
    document.getElementById("introScreen").style.display = "none";
    // Mostrar el Reino
    document.getElementById("gameScreen").style.display = "block";
    // Actualizar datos
    actualizarPerfil();
    cargarMisiones().then(() => {
        mostrarMisionesPagina();
    });
});
// Iniciar la introducción
iniciar();