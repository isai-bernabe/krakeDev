let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=20;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;
const ANCHO_LIMON=20;
const ALTURA_LIMON=20;


let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=0;
let puntaje=0;
let vidas=3;
let velocidad=200;
let intervalo; 
let velocidadCaida = 200; 



function iniciar(){
    clearInterval(intervalo);
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
    intervalo = setInterval(bajarLimon, velocidadCaida);
}

function dibujarSuelo(){
    ctx.fillStyle="blue";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO ,canvas.width,ALTURA_SUELO);

}
function dibujarPersonaje(){
    ctx.fillStyle="yellow";
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

function moverIzquierda(){
    personajeX=personajeX-10;
    actualizarPantalla();
  

}

function moverDerecha(){
    personajeX = personajeX + 10; // Sumamos para ir a la derecha
    actualizarPantalla();
    
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

}

function dibujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTURA_LIMON);

}

function bajarLimon(){
    limonY = limonY + 10;
    actualizarPantalla();
    detectarAtrapado();   
    detectarPiso();
    
}

function detectarAtrapado(){
    if(limonX + ANCHO_LIMON >  personajeX &&   limonX < personajeX+ANCHO_PERSONAJE &&
        limonY + ALTURA_LIMON >  personajeY &&   limonY < personajeY+ALTURA_PERSONAJE){
        //alert("ATRAPADO!!");
        aparecerLimon();
        puntaje=puntaje+1;
        mostrarEnSpan("txtPuntaje",puntaje)
    }
    

    // PARTE 2.b: Validaciones de velocidad y ganador
    if (puntaje === 3) {
        velocidadCaida = 150;
        
        // OJO: Para que la nueva velocidad funcione, debemos detener el intervalo anterior 
        // y crear uno nuevo con la nueva velocidadCaida
        clearInterval(intervalo);
        intervalo = setInterval(bajarLimon, velocidadCaida);

    } else if (puntaje === 6) {
        velocidadCaida = 100;
        
        clearInterval(intervalo);
        intervalo = setInterval(bajarLimon, velocidadCaida);

    } else if (puntaje === 10) {
        // PARTE 2.b.iii: Mensaje de Ganador
        alert("¡TIENES LOS LIMONES, AHORA TE FALTA SAL Y TEQUILA!");
        
        // PARTE 3: Detener el juego al ganar
        clearInterval(intervalo); 
    }
}

function detectarPiso(){
    if(limonY+ALTURA_LIMON==canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarEnSpan("txtVidas",vidas)
    }
    

    // PARTE 1: Validar si llega a 0 vidas
    if (vidas === 0) {
        alert("GAME OVER"); // Mensaje de fin de juego
        clearInterval(intervalo); // PARTE 3: Detenemos la caída del limón
    }

}


function aparecerLimon(){
    limonX = generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();

}


function reiniciar() {
    // 1. Seteamos las variables en su valor inicial
    vidas = 3; 
    puntaje = 0;
    velocidadCaida = 200; // Restablecemos también la velocidad inicial
    
    // Detenemos cualquier intervalo que siga corriendo por seguridad
    clearInterval(intervalo);

    // 2. Pintamos en pantalla las variables inicializadas
    document.getElementById('txtVidas').innerText = vidas;
    document.getElementById('txtPuntaje').innerText = puntaje;
    
    // 3. Invocamos a iniciar
    iniciar(); 
}