// =======================================
// MAPA DEL REINO
// =======================================
let zonas = [];

async function cargarMapa(){
    const respuesta = await fetch("kingdom/map/map.json");
    zonas = await respuesta.json();
    guardarMapa(zonas);
}

// =======================================
// =======================================
function mostrarMapaReino() {
    const jugador = cargarJugador();
    if(!jugador){
        return;
    }
    const content = document.getElementById("content");
    content.innerHTML = `
        <button onclick="mostrarMapaReino()" class="btnVolver">
            🏰 Volver al Reino
        </button>
        <button class="btnPerfil" onclick="mostrarPortal()">
            🔄 Cambiar perfil
        </button>
        <h2>🗺️ Reino de ${jugador.nombre}</h2>
        <div id="kingdomLayout">
            <div id="kingdomMap">
                <img
                    id="mapImage"
                    src="kingdom/map/images/map.jpg"
                    alt="Mapa del Reino">
            </div>
            <aside id="zoneList"></aside>
        </div>
    `;
    if(!zonas || zonas.length===0){
        mostrarMensaje(
            "Mapa",
            "No se pudo cargar el mapa del Reino."
        );
        return;
    }
    const mapa = document.getElementById("kingdomMap");
    const lista = document.getElementById("zoneList");
    const iconos = {
        Castillo:"🏰",
        Aldea:"🏡",
        Bosque:"🌲",
        Granja:"🌾",
        Santuario:"⛪",
        Observatorio:"🔭",
        Mercado:"🛒"
    };
    zonas.forEach(zona=>{
        const desbloqueada =
            jugador.nivel >= zona.nivel;
        // ==========================
        // LISTA LATERAL
        // ==========================
        const item = document.createElement("div");
        item.className = "zoneItem";
        item.textContent = desbloqueada
            ? `${iconos[zona.nombre] || "📍"} ${zona.nombre}`
            : `🔒 Nivel ${zona.nivel}`;
        item.onclick = ()=>abrirZona(zona);
        lista.appendChild(item);
        // ==========================
        // EDIFICIO EN EL MAPA
        // ==========================
        const sprite = desbloqueada
            ? "kingdom/map/images/" + zona.sprite
            : "kingdom/map/images/unknown.jpg";
        const div = document.createElement("div");
        div.className = "zone";
        if(!desbloqueada){
            div.classList.add("bloqueada");
        }
        div.style.left = zona.x + "%";
        div.style.top = zona.y + "%";
        div.innerHTML = `
            <div class="zoneSprite">
                <img src="${sprite}">
            </div>
            <div class="zoneName">
                ${desbloqueada ? zona.nombre : "???"}
            </div>
            <div class="zoneLevel">
                ${desbloqueada ? "" : "🔒 Nivel " + zona.nivel}
            </div>
        `;
        div.onclick = ()=>abrirZona(zona);
        mapa.appendChild(div);
    });
}

// =======================================
function restaurarZona(nombreZona, cantidad = 10){
    const zona = zonas.find(
        z => z.nombre === nombreZona
    );
    if(!zona) return;
    zona.progreso += cantidad;
    if(zona.progreso > zona.objetivo){
        zona.progreso = zona.objetivo;
    }
    guardarMapa(zonas);
}

// =======================================
// Abrir zona
// =======================================
function abrirZona(zona){
    console.log("ZONA ABIERTA:", zona);
    const jugador = cargarJugador();
    if(!zona) return;
    // 🔒 Bloqueo por nivel
    if(jugador.nivel < zona.nivel){
        mostrarMensaje(
            "🧭 Región desconocida",
            `Necesitas llegar al Nivel ${zona.nivel}`
        );
        return;
    }
    // 📜 Zonas con misiones
    if(zona.nombre==="Castillo"){
        mostrarCastillo();
        return;
    }
    if(zona.tipo==="misiones"){
        filtroZona = zona.nombre;
        mostrarMisiones();
        return;
    }
    // 🛒 Mercado
    if(zona.tipo==="mercado"){
        console.log("Entrando al mercado");
        mostrarMercado();
        return;
    }
    // 🏆 Logros
    if(zona.tipo==="logros"){
        mostrarLogros();
        return;
    }
    // 🎮 Minijuegos
    if(zona.tipo==="minijuegos"){
        mostrarMinijuegos();
        return;
    }
    mostrarMensaje(
        "Zona",
        "Esta zona todavía está en construcción."
    );
}

// =======================================
function obtenerEstadoZona(zona){
    if(zona.progreso < 40){
        return "ruins";
    }
    if(zona.progreso < 80){
        return "construction";
    }
    return "restored";
}

// =======================================
// Guardar mapa
// =======================================
function guardarEstadoMapa(){
    guardarMapa(zonas);
}