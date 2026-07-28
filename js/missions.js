// =======================================
// REINO DE ORIÓN
// Sistema de Misiones
// =======================================
let misiones = [];

// ---------------------------------------
// Cargar misiones
// ---------------------------------------
async function cargarMisiones() {
    //console.log("1. Entró a cargarMisiones");
    const guardadas = localStorage.getItem("orion_misiones");
    //console.log("2. LocalStorage:", guardadas);
    if (guardadas) {
        misiones = JSON.parse(guardadas);
    }
    //console.log("3. Misiones después del localStorage:", misiones);
    if (!misiones || misiones.length === 0) {
        //console.log("4. Leyendo missions.json...");
        const respuesta = await fetch("data/missions.json");
        misiones = await respuesta.json();
        //console.log("5. JSON cargado:", misiones);
        guardarMisiones();
    }
    //console.log("6. Total de misiones:", misiones.length);
}

// ---------------------------------------
// Guardar
// ---------------------------------------
function guardarMisiones() {
    localStorage.setItem(
        "orion_misiones",
        JSON.stringify(misiones)
    );
}

// ---------------------------------------
// Mostrar
// ---------------------------------------
function mostrarMisiones(){
    const content = document.getElementById("content");
    content.innerHTML = `
        <h2>📜 Misiones del Reino</h2>
        <div id="missions"></div>
    `;
    const contenedor = document.getElementById("missions");
    contenedor.innerHTML = "";
    misiones.forEach(mision => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "mission-card";
        let contenidoBoton = "";
        if (mision.estado === "disponible") {
            contenidoBoton = `
                <button onclick="iniciarMision(${mision.id})">⚔️ Comenzar misión</button>
            `;
        }
        else if (mision.estado === "enCurso") {
            contenidoBoton = `
                <div class="progress">
                    <div id="barra${mision.id}" class="progressFill"></div>
                </div>
                <p id="tiempo${mision.id}">⏳ Preparando...</p>
            `;
        }
        else if (mision.estado === "completada") {
            contenidoBoton = `
                <button disabled>🏆 Completada</button>
            `;
        }
        tarjeta.innerHTML = `
            <div class="categoria">${mision.categoria}</div>
            <div class="icono">${mision.icono}</div>
            <h3>${mision.titulo}</h3>
            <p>${mision.descripcion}</p>
            <div class="recompensas">
                ⭐ ${mision.xp} XP
                <br>
                🪙 ${mision.oquos} Oquos
                <br>
                ⏱️ ${Math.floor(mision.duracion/60)} min
                <br>           
            </div>
            ${contenidoBoton}
        `;
        contenedor.appendChild(tarjeta);
        if (mision.estado === "enCurso") {
            continuarTemporizador(mision);
        }
    });
}

// ---------------------------------------
// Iniciar misión
// ---------------------------------------
function iniciarMision(id) {
    const mision = misiones.find(m => m.id === id);
    if (!mision) return;
    mision.estado = "enCurso";
    mision.inicio = Date.now();
    guardarMisiones();
    mostrarMisiones();
}

// ---------------------------------------
// Continuar temporizador
// ---------------------------------------
function continuarTemporizador(mision) {
    const barra = document.getElementById("barra" + mision.id);
    const tiempo = document.getElementById("tiempo" + mision.id);
    const intervalo = setInterval(() => {
        const pasado = Math.floor(
            (Date.now() - mision.inicio) / 1000
        );
        const restante = mision.duracion - pasado;
        const porcentaje =
            (pasado / mision.duracion) * 100;
        barra.style.width =
            Math.min(porcentaje,100) + "%";
        if (restante <= 0) {
            clearInterval(intervalo);
            completarMision(mision);
            return;
        }
        const minutos = Math.floor(restante / 60);
        const segundos = restante % 60;
        tiempo.textContent =
            `⏳ ${minutos}:${segundos.toString().padStart(2,"0")}`;
    },1000);
}    

// ---------------------------------------
// Completar
// ---------------------------------------
function completarMision(mision) {
    mision.estado = "completada";
    guardarMisiones();
    sumarRecompensa(
        mision.xp,
        mision.oquos
    );
    restaurarZona(
        mision.zona,
        mision.restauracion
    );
    if(document.getElementById("missions") === null){
    mostrarMapa();
    }
    // desbloquearZona(
    //     mision.zona
    // );
    actualizarPerfil();
    mostrarMisiones();
    mostrarMensaje(
        "🏆 Misión completada",
        `${mision.titulo}
+${mision.xp} XP
+${mision.oquos} Oquos`
    );
}

// ---------------------------------------
// Reiniciar misiones diarias
// ---------------------------------------

function reiniciarMisionesDiarias() {
    misiones.forEach(mision => {
        mision.estado = "disponible";
        delete mision.inicio;
    });
    guardarMisiones();
}