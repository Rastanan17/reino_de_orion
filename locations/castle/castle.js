// =======================================
// CASTILLO DE MÍRRAFEN
// =======================================

function mostrarCastillo(){

    const content = document.getElementById("content");


    content.innerHTML = `
    <section class="castillo">

        <img
        class="fondo"
        src="locations/castle/images/castle_1.png">

    <div class="trono"></div>
        <!-- ===========================
            NPCs
        ============================ -->

        <div class="npc reina"
            onclick="hablarReina()">
            <div class="npc-sprite sprite-idle"></div>
            <p>Reina Eleanor</p>
        </div>

        <div class="npc guardia"
            onclick="hablarGuardia()">
            <div class="npc-sprite sprite-idle"></div>
            <p>Guardian Roderick</p>
        </div>

        <!-- ===========================
            OBJETOS
        ============================ -->
        <div class="objeto trono"
            onclick="mostrarPerfilJugador()">
            <img
            src="locations/castle/images/throne.png"
            alt="Trono">
            <p>Trono</p>
        </div>

        <div class="objeto tablon"
            onclick="mostrarMisiones()">
            <img
            src="locations/castle/images/missions.png"
            alt="Tablón">
            <p>Misiones</p>
        </div>

        <div class="objeto armeria"
            onclick="mostrarArmeria()">
            <img
            src="locations/castle/images/armery.png"
            alt="Armería">
            <p>Editar</p>
        </div>

        <div class="objeto salir"
            onclick="mostrarMapaReino()">
            <img
            src="locations/castle/images/exit.png"
            alt="Salir">
            <p>Salir</p>
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


    cambiarEstadoNPC(
        "reina",
        "presentando"
    );


    mostrarMensaje(

        "👑 Reina Eleanor",

        "Bienvenido nuevamente a Mírrafen, héroe. Cada misión que completas devuelve un poco de vida a nuestro reino."

    );

}



// =======================================
// RODERICK
// =======================================

function hablarGuardia(){


    cambiarEstadoNPC(
        "guardia",
        "presentando"
    );


    mostrarMensaje(

        "🛡️ Roderick",

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
    document
        .getElementById("panelJugador")
        .style.display = "none";
}



// =======================================
// ARMERÍA
// =======================================

function mostrarArmeria(){


    mostrarMensaje(

        "🛡️ Armería",

        "Aquí podrás cambiar tu apariencia, equipar objetos y mejorar a tu aventurero."

    );

}



// =======================================
// ESTADOS NPC
// =======================================

function iniciarNPCs(){


    cambiarEstadoNPC(
        "reina",
        "idle"
    );


    cambiarEstadoNPC(
        "guardia",
        "idle"
    );


}



// =======================================
// CAMBIAR ESTADO
// =======================================

function cambiarEstadoNPC(npc, estado){


    const personaje = document.querySelector(
        "." + npc + " .npc-sprite"
    );


    if(!personaje) return;



    personaje.className = 
        "npc-sprite estado-" + estado;


}