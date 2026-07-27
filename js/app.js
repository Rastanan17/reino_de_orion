// =======================================
// REINO DE ORIÓN
// Archivo principal
// =======================================

window.addEventListener("DOMContentLoaded", () => {
    // Ocultar el juego al iniciar
    document.getElementById("gameScreen").style.display = "none";
    // Actualizar perfil
    verificarNuevoDia();
    actualizarPerfil();
});