// =======================================
// MAPA DEL REINO
// =======================================

let zonas = [];

async function cargarMapa() {

    const guardado = cargarMapaGuardado();

    if (guardado) {

        zonas = guardado;

        return;

    }

    const respuesta = await fetch("data/map.json");

    zonas = await respuesta.json();

    guardarMapa(zonas);

}

function mostrarMapaReino() {

    const content = document.getElementById("content");

    content.innerHTML = "<h2>🗺️ Reino de Orión</h2>";

    zonas.forEach(zona => {

        const porcentaje = Math.floor(
            zona.progreso / zona.objetivo * 100
        );

        const imagen =
            zona.progreso >= zona.objetivo
                ? zona.imagenRestaurada
                : zona.imagenRuinas;

        content.innerHTML += `

            <div class="zone-card">

                <img src="${imagen}">

                <h3>${zona.icono} ${zona.nombre}</h3>

                <div class="zoneBar">

                    <div
                        class="zoneFill"
                        style="width:${porcentaje}%">
                    </div>

                </div>

                <p>${porcentaje}% restaurado</p>

            </div>

        `;

    });

}

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

function restaurarZona(nombreZona, puntos){

    const zona = zonas.find(z => z.nombre === nombreZona);

    if(!zona) return;

    zona.progreso += puntos;

    if(zona.progreso > zona.objetivo){
        zona.progreso = zona.objetivo;
    }

    guardarMapa();
}