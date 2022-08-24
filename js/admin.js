import { Pelicula } from "./classPelicula.js";

let listaPeliculas = JSON.parse(localStorage.getItem("listaPeliculasKey")) || [];

//codigo para instanciar una ventana modal
const modalPelicula = new bootstrap.Modal(
  document.getElementById("formularioPelicula")
);
const btnCrearPelicula = document.getElementById("botonModal");
let codigo = document.getElementById("codigo");
let titulo = document.getElementById("titulo");
let descripcion = document.getElementById("descripcion");
let imagen = document.getElementById("imagen");
let genero = document.getElementById("genero");
let formulario = document.getElementById("formPeliculas");

// modalPelicula.show(); para mostrar apenas carga la pagina

//aqui voy agregando los eventos
btnCrearPelicula.addEventListener("click", mostrarFormulario);
formulario.addEventListener("submit", guardarPelicula);

cargaInicial();
//muestre la tabla con datos
function cargaInicial(){
  if(listaPeliculas.length >0){
    //dibujar filas de la tabla
    listaPeliculas.forEach((itemPelicula)=>{crearFila(itemPelicula)})
  }
}

function crearFila(pelicula){
  let tablaPeliculas = document.getElementById("tablaPeliculas");
  tablaPeliculas.innerHTML += `<tr>
  <th scope="row">${pelicula.codigo}</th>
  <td>${pelicula.titulo}</td>
  <td class="parrafo">${pelicula.descripcion}</td>
  <td>${pelicula.imagen}</td>
  <td>${pelicula.genero}</td>
  <td><button type="button" class="btn btn-danger"><i class="bi bi-file-x-fill colorIncono fs-5"></i></button>
      <button type="button" class="btn btn-warning mt-2"><i class="bi bi-pencil-square fs-5"></i></button></td>
</tr>`
}

function mostrarFormulario() {
  modalPelicula.show();
  //mostrar el identificador unico cargado en el input correspondiente
  codigo.value = uuidv4();
  // console.log(uuidv4());//este metodo genera identificadores unicos alfanumericos.
}

function guardarPelicula(e) {
  e.preventDefault();
  //volver a validar(practica)

  //crear un objeto pelicula
  let nuevaPelicula = new Pelicula(
    codigo.value,
    titulo.value,
    descripcion.value,
    imagen.value,
    genero.value
  );
  //guardar la pelicula en el arreglo
  listaPeliculas.push(nuevaPelicula);
  console.log(listaPeliculas);
  guardarPeliculasEnLocalStorge();
  //limpiar formulario
  limpiarFormulario();
  //cerrar ventana modal
  modalPelicula.hide();
}
function limpiarFormulario() {
  formulario.reset(); //resetea el value de todo lo que esta en el form
  //resetear las clases
  titulo.className = "form-control";
  descripcion.className = "form-control";
  imagen.className = "form-control";
  genero.className = "form-control";
}

function guardarPeliculasEnLocalStorge(){
  localStorage.setItem("listaPeliculasKey", JSON.stringify(listaPeliculas))
};