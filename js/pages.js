function mostrarCastillo(){
    const content = document.getElementById("content");
    content.innerHTML = `
        <button onclick="mostrarMapaReino()">
            ⬅️ Volver al Reino
        </button>
        <h2>🏰 Castillo de Mírrafen</h2>
        <div class="castleMenu">
            <button onclick="mostrarMisiones()">
                📜 Misiones
            </button>
            <button disabled>
                🏆 Logros
            </button>
            <button disabled>
                📖 Biblioteca
            </button>
            <button disabled>
                👑 Salón del Trono
            </button>
        </div>
    `;
}