// =======================================
// ALDEA DE MÍRRAFEN
// =======================================

function mostrarAldea(){

    const content = document.getElementById("content");

    content.innerHTML = `

        <section class="aldea">

            <!-- ===========================
                 SALIR
            ============================ -->

            <div
                class="objeto salir"
                onclick="mostrarMapaReino()"
            >

                <h2 class="name">Salir</h2>

                <img
                    src="location/village/images/exit.png"
                    alt="Salir"
                >

            </div>

        </section>

    `;

}