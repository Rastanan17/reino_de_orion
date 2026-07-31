// =======================================
// REINO DE ORIÓN
// Sistema de almacenamiento
// =======================================
const jugadorBase = {
    nombre: "Orión",
    nivel: 1,
    xp: 0,
    xpNecesaria: 100,
    oquos: 0,
    rango: "Explorador",
    avatar: "explorer.jpg",
    misionesCompletadas: [],
    logros: [],
    racha: 0,
    zonasRestauradas: [],
    ultimoReinicio: ""
};

// ---------------------------------------
// Cargar jugador
// ---------------------------------------
function cargarJugador() {
    const datos = localStorage.getItem("orionJugador");
    if (datos) {
        return JSON.parse(datos);
    }
    guardarJugador(jugadorBase);
    return { ...jugadorBase };
}

// ---------------------------------------
// Guardar jugador
// ---------------------------------------
function guardarJugador(datos) {
    localStorage.setItem(
        "orionJugador",
        JSON.stringify(datos)
    );
}

// ---------------------------------------
// Obtener rango
// ---------------------------------------
function obtenerRango(nivel) {
    if (nivel >= 10) return "Guardián Legendario";
    if (nivel >= 9) return "Héroe del Reino";
    if (nivel >= 8) return "Protector Supremo";
    if (nivel >= 7) return "Caballero de Orión";
    if (nivel >= 6) return "Sabio del Reino";
    if (nivel >= 5) return "Maestro Constructor";
    if (nivel >= 4) return "Guardián";
    if (nivel >= 3) return "Constructor";
    if (nivel >= 2) return "Explorador Mayor";
    return "Explorador";
}

// ---------------------------------------
// Dar recompensa
// ---------------------------------------
function sumarRecompensa(xp, oquos) {

    console.log("RECIBIDO -> XP:", xp, "Oquos:", oquos);

    const jugador = cargarJugador();

    jugador.xp += xp;
    jugador.oquos += oquos;

    while (jugador.xp >= jugador.xpNecesaria) {
        jugador.xp -= jugador.xpNecesaria;
        jugador.nivel++;
        jugador.xpNecesaria += 50;
    }
    jugador.rango = obtenerRango(jugador.nivel);
    guardarJugador(jugador);
    console.log(cargarJugador());
}

// ---------------------------------------
// Restaurar una zona del Reino
// ---------------------------------------
function desbloquearZona(zona) {
    const jugador = cargarJugador();
    if (!jugador.zonasRestauradas.includes(zona)) {
        jugador.zonasRestauradas.push(zona);
        guardarJugador(jugador);
    }
}

// ---------------------------------------
// Reiniciar partida
// ---------------------------------------
function reiniciarJugador() {
    localStorage.removeItem("orionJugador");
    localStorage.removeItem("orion_misiones");
    location.reload();
}

// ---------------------------------------
// Obtener fecha de hoy
// ---------------------------------------
function obtenerFechaHoy() {
    return new Date().toISOString().split("T")[0];
}

// ---------------------------------------
// Verificar cambio de día
// ---------------------------------------
function verificarNuevoDia() {
    const jugador = cargarJugador();
    const hoy = obtenerFechaHoy();
    if (jugador.ultimoReinicio !== hoy) {
        reiniciarMisionesDiarias();
        jugador.ultimoReinicio = hoy;
        guardarJugador(jugador);
    }
}

// =======================================
// MAPA DEL REINO
// =======================================
function cargarMapaGuardado() {
    return JSON.parse(
        localStorage.getItem("orionMapa") || "null"
    );
}

function guardarMapa(zonas) {
    localStorage.setItem(
        "orionMapa",
        JSON.stringify(zonas)
    );
}