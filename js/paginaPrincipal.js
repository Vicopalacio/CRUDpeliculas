let listaPeliculas = JSON.parse(localStorage.getItem("listaPeliculasKey")) || [];
let columnas = document.getElementById("columnasPeliculas");

function cargarInicial(){
    if(listaPeliculas.length > 0){
        listaPeliculas.forEach((itemPelicula)=>{crearPelicula(itemPelicula)})
    }
}

function crearPelicula(itemPelicula){
    columnas.innerHTML += `
    <article class="col-12 col-md-6 col-lg-3 my-2">
     <div class="card mx-2">
       <img
        src="${itemPelicula.imagen}"
        class="card-img-top"
        alt="${itemPelicula.titulo}"
       />
       <div class="card-body">
        <h5 class="card-title">${itemPelicula.titulo}</h5>
        <a href="#" class="btn btn-primary">Ver detalles</a>
       </div>
     </div>
    </article>`
}

cargarInicial();