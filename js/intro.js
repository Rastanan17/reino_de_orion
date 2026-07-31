// =======================================
// REINO DE ORIÓN - Introducción
// =======================================
const MODO_DESARROLLO = false;

// ---------------------------------------
// Cargar historia
// ---------------------------------------
async function cargarHistoria() {
    try {
        const respuesta = await fetch("data/history.json");
        const historia = await respuesta.json();
        document.getElementById("crawl").innerHTML =
            historia.paragraphs.join("<br><br>");
    } catch (error) {
        console.error(error);
    }
}

// ---------------------------------------
// Iniciar intro
// ---------------------------------------
function iniciarIntro() {
    document.getElementById("btnComenzar").style.display = "none";
    const musica = document.getElementById("introMusic");
    musica.volume = 0.3;
    musica.play();
    document.getElementById("crawl").classList.add("start-crawl");
}

// ---------------------------------------
// Entrar al Reino
// ---------------------------------------
async function entrarAlReino() {
    const musica = document.getElementById("introMusic");
    musica.pause();
    document.getElementById("introScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    actualizarPerfil();
    await cargarMisiones();
    await cargarMapa();
    await cargarRecompensas();
    await cargarSistemaPergaminos();
    mostrarMisionesPagina();
}

// ---------------------------------------
// Inicio
// ---------------------------------------
document.addEventListener("DOMContentLoaded", async ()=>{
    if(MODO_DESARROLLO){
        document.getElementById("introScreen").style.display="none";
        document.getElementById("gameScreen").style.display="block";
        actualizarPerfil();
        await cargarMisiones();
        await cargarMapa();
        await cargarRecompensas();
        await cargarSistemaPergaminos();
        mostrarMisionesPagina();
        return;
    }
    await cargarHistoria();
    document.getElementById("btnComenzar").addEventListener("click", iniciarIntro);
    document.getElementById("crawl").addEventListener("animationend", ()=>{
            document.getElementById("startButton").style.display="inline-block";
        });
    document.getElementById("startButton").addEventListener("click", entrarAlReino);
});