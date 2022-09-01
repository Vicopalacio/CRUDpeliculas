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
//variable para controlar si creo o actualizo una pelicula
let peliculaNueva = true; //si es true significa crear pelicula nueva.

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
  <td><button type="button" class="btn btn-danger" onclick="borrarPelicula('${pelicula.codigo}')"><i class="bi bi-file-x-fill colorIncono fs-5"></i></button>
      <button type="button" class="btn btn-warning mt-2" onclick="editarPelicula('${pelicula.codigo}')"><i class="bi bi-pencil-square fs-5"></i></button></td>
</tr>`
}

function mostrarFormulario() {
  peliculaNueva = true;
  limpiarFormulario();
  modalPelicula.show();
  //mostrar el identificador unico cargado en el input correspondiente
  codigo.value = uuidv4();
  // console.log(uuidv4());//este metodo genera identificadores unicos alfanumericos.
}

function guardarPelicula(e) {
  e.preventDefault();
  
  if(peliculaNueva === true){
    //crear pelicula nueva
    crearPeliculaNueva();
  }else{
    //aqui quiero modificar la pelicula
    actualizarPelicula();
  }
}

function crearPeliculaNueva(){
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
  //quiero dibujar la fila nueva en la tabla
  crearFila(nuevaPelicula);
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

window.borrarPelicula = function (codigo){
  console.log(codigo);
  Swal.fire({
    title: 'Eliminar Pelicula',
    text: "Estas seguro que quieres eliminar esta pelicula? No se puede revertir este paso.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: "Borrar",
    CancelButtonText: "Cancelar"
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      //buscar la pelicula con el codigo indicado en el arreglo y borrarlo
      let copiaListaPeliculas = listaPeliculas.filter((pelicula)=>{return pelicula.codigo != codigo})
      console.log(copiaListaPeliculas);
      listaPeliculas = copiaListaPeliculas;
      //actualizar el localstorage
      guardarPeliculasEnLocalStorge();
      //actualizar la tabla
      borrarTabla();
      cargaInicial();

      Swal.fire(
        'Pelicula Borrada!',
        'La pelicula ha sido eliminada con éxito!',
        'success'
      )
    }
  })
}

function borrarTabla(){
  let tablaPeliculas = document.getElementById("tablaPeliculas");
  tablaPeliculas.innerHTML = "";
}

window.editarPelicula = function (codigoBuscado){
  peliculaNueva = false;
  limpiarFormulario();
  //buscar del arreglo de peliculas, la pelicula seleccionada
  let peliculaBuscada = listaPeliculas.find((pelicula)=>{return pelicula.codigo === codigoBuscado});
  //let peliculaBuscada = listaPeliculas.find((pelicula)=>pelicula.codigo === codigo) podemos obviar el return cuando solo tenemos la condicion logica.

  //cargar los datos de la pelicula seleccionada en el formulario
  codigo.value = peliculaBuscada.codigo;
  titulo.value = peliculaBuscada.titulo;
  descripcion.value = peliculaBuscada.descripcion;
  imagen.value = peliculaBuscada.imagen;
  genero.value = peliculaBuscada.genero;
  //abrir ventana modal
  modalPelicula.show();
}

function actualizarPelicula(){
  console.log("actualizando pelicula...");
  //buscar la posicion de la pelicula que estoy editando en el arreglo;
  let posicionPeliBuscada = listaPeliculas.findIndex((pelicula)=> pelicula.codigo === codigo.value);
  //actualizar los datos de la pelicula que estoy editando
  listaPeliculas[posicionPeliBuscada].titulo = titulo.value;
  listaPeliculas[posicionPeliBuscada].descripcion = descripcion.value;
  listaPeliculas[posicionPeliBuscada].imagen = imagen.value;
  listaPeliculas[posicionPeliBuscada].genero = genero.value;

  //actualizar el localStorage
  guardarPeliculasEnLocalStorge();

  //actualizar la tabla
  borrarTabla();
  cargaInicial();

  //quiero que se cierre la ventana modal
  modalPelicula.hide();//para ocultar la ventana modal

  //limpiar formulario
  limpiarFormulario();

  //indicarle lo que sucedio al usuario
  Swal.fire(
    'Pelicula Modificada!',
    'La pelicula ha sido modificada con éxito!',
    'success')
}