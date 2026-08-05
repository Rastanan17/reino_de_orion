// =======================================
// PORTAL DE MÍRRAFEN
// =======================================
// Avatar seleccionado por defecto
let avatarSeleccionado = "explorer.jpg";

// =======================================
// PORTAL
// =======================================
function mostrarPortal(){
    const intro = document.getElementById("introScreen");
    const reino = document.getElementById("reinoUI");
    const perfil = document.querySelector(".profile");

    if(intro){
        intro.style.display="none";
    }

    if(reino){
        reino.style.display="block";
    }

    if(perfil){
        perfil.style.display="none";
    }
    const content=document.getElementById("content");
    content.innerHTML=`
    <section class="portal">
        <h1>🌀 Portal de Mírrafen</h1>
        <p class="portalTexto">Todo héroe tiene una historia.<br>¿Quién cruzará el portal?</p>
        <div id="listaPerfiles"></div>
        <button class="btnNuevoPerfil" onclick="mostrarCrearPerfil()">✨ Nuevo Aventurero</button>
    </section>
    `;
    cargarTarjetasPerfiles();
}

// =======================================
// TARJETAS
// =======================================
function cargarTarjetasPerfiles(){
    const lista=document.getElementById("listaPerfiles");
    const perfiles=JSON.parse(
        localStorage.getItem("perfiles")
    ) || {};
    lista.innerHTML="";
    for(const id in perfiles){
        const jugador=perfiles[id];
        lista.innerHTML+=`
        <div class="cardPerfil">
            <img src="images/characters/${jugador.avatar}" class="avatarPerfil">
            <h2>${jugador.nombre}</h2>
            <p>Nivel ${jugador.nivel}</p>
            <p>${jugador.rango}</p>
            <button onclick="entrarPerfil('${id}')">⚔️ Entrar</button>
        </div>
        `;
    }
}

// =======================================
// NUEVO AVENTURERO
// =======================================
function mostrarCrearPerfil(){

    localStorage.removeItem("perfilActivo");

    const intro = document.getElementById("introScreen");
    const reino = document.getElementById("reinoUI");
    const perfil = document.querySelector(".profile");
    
    const content=document.getElementById("content");
    content.innerHTML=`
    <section class="portal">
        <h1>⚔️ Nuevo Aventurero</h1>
        <input id="nuevoNombre" placeholder="Nombre del aventurero">
        <br><br>
        <h3>Elige tu personaje</h3>
        <div class="selectorAvatares">
            <div class="avatarCard seleccionado" onclick="seleccionarAvatar('../../images/characters/explorer.jpg',this)">
                <img src="../../images/characters/explorer.jpg">
                <span>Explorador</span>
            </div>
            <div class="avatarCard" onclick="seleccionarAvatar('../../images/characters/alien.jpg',this)">
                <img src="../../images/characters/alien.jpg">
                <span>Alien</span>
            </div>
            <div class="avatarCard" onclick="seleccionarAvatar('../../images/characters/dwarf.jpg',this)">
                <img src="../../images/characters/dwarf.jpg">
                <span>Enano</span>
            </div>
            <div class="avatarCard" onclick="seleccionarAvatar('../../images/characters/elf.jpg',this)">
                <img src="../../images/characters/elf.jpg">
                <span>Elfo</span>
            </div>
            <div class="avatarCard" onclick="seleccionarAvatar('../../images/characters/witch.jpg',this)">
                <img src="../../images/characters/witch.jpg">
                <span>Bruja</span>
            </div>
            <div class="avatarCard" onclick="seleccionarAvatar('../../images/characters/wolf.jpg',this)">
                <img src="../../images/characters/wolf.jpg">
                <span>Lobo</span>
            </div>
            </div>
        </div>
        <br>
        <button onclick="crearNuevoPerfil()">⚔️ Comenzar aventura</button>
        <button onclick="mostrarPortal()">← Volver</button>
    </section>
    `;
}

// =======================================
// SELECCIONAR AVATAR
// =======================================
function seleccionarAvatar(avatar,card){
    avatarSeleccionado = avatar;
    document.querySelectorAll(".avatarCard").forEach(a=>{
        a.classList.remove("seleccionado");
    });
    card.classList.add("seleccionado");
}

// =======================================
// CREAR PERFIL
// =======================================
async function crearNuevoPerfil(){
    const nombre=document.getElementById("nuevoNombre").value.trim();
    if(nombre===""){
        mostrarMensaje(
            "⚠️ Falta un nombre",
            "Escribe el nombre del aventurero."
        );
        return;
    }
    const id=nombre.toLowerCase().replace(/\s+/g,"_");
    crearPerfil(
        id,
        nombre,
        avatarSeleccionado
    );
    localStorage.setItem(
        "perfilActivo",
        id
    );
    await entrarAlReino();
}

function cambiarPerfil(){

    localStorage.removeItem("perfilActivo");

    const perfil = document.querySelector(".profile");

    if(perfil){
        perfil.style.display = "none";
    }

    document.getElementById("content").innerHTML = "";

    mostrarPortal();

}