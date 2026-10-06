function generarAleatorio(min,max){
    let random=Math.random(); //0-1
    // Ejemplo max es 600, minimo es 5
    let numero=random*max; //0-max  0-595
    let numeroEntero  = parseInt(numero);
    // Ejemplo:0

    numeroEntero  = numeroEntero+min; //5-600
    return numeroEntero
    


}

function mostrarEnSpan(idSpan,valor){
        let componente=document.getElementById(idSpan);
        componente.textContent=valor;
    }
