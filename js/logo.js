// =======================================
// ARCA PIXELES STUDIO
// Pantalla inicial del estudio
// =======================================


function iniciarLogo(){

    const logoScreen = document.getElementById("logoScreen");

    if(!logoScreen){
        continuarHistoria();
        return;
    }


    const video = document.getElementById("logoVideo");


    if(video){

        video.play();

        video.onended = ()=>{

            continuarHistoria();

        };


    }else{

        setTimeout(()=>{

            continuarHistoria();

        },8000);

    }

}


// ---------------------------------------
// Ir a la historia
// ---------------------------------------

function continuarHistoria(){

    document
        .getElementById("logoScreen")
        .style.display="none";


    document
        .getElementById("introScreen")
        .style.display="block";


    cargarHistoria();

}