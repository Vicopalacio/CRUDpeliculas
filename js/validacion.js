let codigo = document.getElementById("codigo");
let titulo = document.getElementById("titulo");
let descripcion = document.getElementById("descripcion");
let imagen = document.getElementById("imagen");
let genero = document.getElementById("genero");
let formulario = document.getElementById("formPeliculas")


formulario.addEventListener("submit", movie);
codigo.addEventListener("blur",()=>{validarCodigo(codigo)});
titulo.addEventListener("blur",()=>{validarTitulo(titulo)});
descripcion.addEventListener("blur",()=>{validarDescripcion(descripcion)});
imagen.addEventListener("blur",()=>{validarImagen(imagen)});



function validarCodigo(input){
    if(input.value.length === 3){
        input.className = "form-control is-valid";
    }else{
        input.className = "form-control is-invalid";
    }
}

function validarTitulo(input){
    if(input.value.length >= 3 && input.value.length <=30){
        input.className = "form-control is-valid";
    }else{
        input.className = "form-control is-invalid";
    }
}

function validarDescripcion(input){
    if(input.value.length <=300){
        input.className = "form-control is-valid";
    }else{
        input.className = "form-control is-invalid";
    }
}

function validarImagen(input){
    let imagen = /^(ftp|http|https):\/\/[^ "]+$/
    if(imagen.test(input.value)){
        input.className = "form-control is-valid";
    }else{
        input.className = "form-control is-invalid";
    }
}


function movie(e){
    e.preventDefault(); 
}

