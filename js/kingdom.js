/*// =======================================
// REINO DE ORIÓN
// MAPA DEL REINO
// =======================================
const zonasReino = 

function mostrarMapa(){
    const content = document.getElementById("content");
    content.innerHTML = `
        <h2>🗺️ Reino de Orión</h2>
        <div id="kingdomMap"></div>
    `;
    const mapa = document.getElementById("kingdomMap");
    zonasReino.forEach(zona=>{
        const div = document.createElement("div");
        div.className="zone";
        div.style.left = zona.x + "%";
        div.style.top = zona.y + "%";
        div.innerHTML=`
            <div class="zoneIcon">${zona.icono}</div>
            <div class="zoneName">${zona.nombre}</div>
        `;
        div.onclick=()=>{
            abrirZona(zona.nombre);
        };
        mapa.appendChild(div);
    });
}

function abrirZona(nombre){
    const modal = document.getElementById("zoneModal");
    const fondo = document.getElementById("zoneBackground");
    const info = document.getElementById("zoneInfo");
    const listaZona = misiones.filter(m=>m.zona===nombre);
    const completadas = listaZona.filter(
                            m=>m.estado==="completada"
                        );
    const pendientes = listaZona.filter(
                            m=>m.estado!=="completada"
                        );
    const porcentaje = listaZona.length ? Math.floor(
                            completadas.length*100/
                            listaZona.length
                        ) :0;
    const restaurada = porcentaje===100;
    const imagen = restaurada ? `images/kingdom/${nombre.toLowerCase()}_restored.jpg` : `images/kingdom/${nombre.toLowerCase()}_ruins.jpg`;
    fondo.style.backgroundImage = `url("${imagen}")`;
    info.innerHTML=`
        <h2>${nombre}</h2>
        <h3>Progreso</h3>
        <div class="progress">
            <div class="progressFill" style="width:${porcentaje}%"></div>
        </div>
        <p>${porcentaje}% restaurado</p>
        <hr>
            <h3>✅ Completadas</h3>
            <ul>${completadas.length ? completadas.map(m=>`<li>${m.icono} ${m.titulo}</li>`).join("") : "<li>Ninguna</li>"}</ul>
        <hr>
        <h3>⭕ Pendientes</h3>
        <ul>${pendientes.length ? pendientes.map(m=>`<li>${m.icono} ${m.titulo}</li>`).join("") : "<li>Ninguna</li>"}</ul>
    `;
    modal.style.display="flex";
}

document.getElementById("closeZone").onclick=()=>{
    document.getElementById("zoneModal").style.display="none";
};*/