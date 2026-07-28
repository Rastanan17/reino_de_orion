// ===================================
// NAVEGACIÓN DEL REINO
// ===================================
const content = document.getElementById("content");
document
.getElementById("btnMisiones")
.addEventListener("click", mostrarMisionesPagina);
document
.getElementById("btnMapa")
.addEventListener("click", mostrarMapa);
document
.getElementById("btnMercado")
.addEventListener("click", mostrarMercado);
document
.getElementById("btnLogros")
.addEventListener("click", mostrarLogros);

// ----------------------------
function mostrarMisionesPagina(){
    mostrarMisiones();
}

// ----------------------------
function mostrarMapa(){
    content.innerHTML = `
        <h2>🗺️ Reino de Orión</h2>
        <p>El mapa estará disponible muy pronto...</p>
    `;
}

// ----------------------------
function mostrarMercado(){
    content.innerHTML = `
        <h2>🛒 Mercado</h2>
        <p>Aquí podrás gastar tus Oquos.</p>
    `;
}

// ----------------------------
function mostrarLogros(){
    content.innerHTML = `
        <h2>🏆 Logros</h2>
        <p>Aquí aparecerán las medallas del explorador.</p>
    `;
}