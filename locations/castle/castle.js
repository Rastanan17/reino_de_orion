// =======================================
// CASTILLO DE MÍRRAFEN
// =======================================
function mostrarCastillo(){
    const content = document.getElementById("content");
    content.innerHTML = `
    <section class="castillo">
        <!-- ===========================
            NPCs
        ============================ -->
        <div class="npc reina" onclick="hablarReina()">
            <h2 class="name">Reina Eleanor</h2>
            <div class="npc-sprite sprite-idle"></div>
         </div>
        <div class="npc guardia" onclick="hablarGuardia()">
            <h2 class="name">Guardian Roderick</h2>
            <div class="npc-sprite sprite-idle"></div>
         </div>
        <!-- ===========================
            OBJETOS
        ============================ -->
        <div class="objeto trono" onclick="mostrarPerfilJugador()">
            <h2 class="name">Trono</h2>
            <img src="locations/castle/images/throne.png" alt="Trono">
        </div>
        <div class="objeto tablon" onclick="mostrarTablonMisiones()">
            <h2 class="name">Misiones</h2>
            <img src="locations/castle/images/missions.png" alt="Tablón">
        </div>
        <div class="objeto armeria" onclick="mostrarArmeria()">
            <h2 class="name">Editar</h2>
            <img src="locations/castle/images/armery.png" alt="Armería">
        </div>
        <div class="objeto salir" onclick="mostrarMapaReino()">
            <h2 class="name">Salir</h2>
            <img src="locations/castle/images/exit.png" alt="Salir">
        </div>
    </section>
    `;
    // iniciar estados de NPC al entrar al castillo
    iniciarNPCs();
}

// =======================================
// REINA
// =======================================
function hablarReina(){
    cambiarEstadoNPC("reina", "presentando");
    mostrarMensaje("👑 Reina Eleanor",
        "Bienvenido nuevamente a Mírrafen, héroe. Cada misión que completas devuelve un poco de vida a nuestro reino."
    );
}

// =======================================
// RODERICK
// =======================================
function hablarGuardia(){
    cambiarEstadoNPC("guardia", "presentando");
    mostrarMensaje("🛡️ Guardian Roderick",
        "El tablón contiene las tareas disponibles. Cuando estés preparado, acércate y acepta una misión."
    );
}

// =======================================
// PERFIL DEL JUGADOR
// =======================================
function mostrarPerfilJugador(){
    document.getElementById("panelJugador").style.display = "flex";
}

function cerrarPanelJugador(){
    document.getElementById("panelJugador").style.display = "none";
}

// =======================================
// ARMERÍA
// =======================================
function mostrarArmeria(){
    mostrarMensaje("🛡️ Armería",
        "Aquí podrás cambiar tu apariencia, equipar objetos y mejorar a tu aventurero."
    );
}

// =======================================
// ESTADOS NPC
// =======================================
function iniciarNPCs(){
    cambiarEstadoNPC("reina", "idle");
    cambiarEstadoNPC("guardia", "idle");
}

// =======================================
// CAMBIAR ESTADO
// =======================================
function cambiarEstadoNPC(npc, estado){
    const personaje = document.querySelector(
        "." + npc + " .npc-sprite"
    );
    if(!personaje) return;
    personaje.className = "npc-sprite estado-" + estado;
}
