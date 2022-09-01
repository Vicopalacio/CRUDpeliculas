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
        <button class="btn btn-primary" onclick="verPaginaDetalle('${itemPelicula.codigo}')">Ver detalles</button>
       </div>
     </div>
    </article>`
}

cargarInicial();

function verPaginaDetalle(codigo){
    console.log(codigo);
    //construimos la ruta para navegar a la web de detalle de detalle con un parametro
    console.log(window.location.origin + '/pages/detalle.html?codigo='+codigo);
    window.location.href = window.location.origin + '/pages/detalle.html?codigo='+codigo;
}