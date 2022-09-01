//tengo que tomar el parametro de url
// console.log(window.location.search);
const urlParametros = new URLSearchParams(window.location.search);
// console.log(urlParametros.get("codigo"));

//buscar en el localStorage las peliculas y buscar la pelicula que quiero mostrar
let listaPeliculas = JSON.parse(localStorage.getItem("listaPeliculasKey")) || [];
let peliBuscada = listaPeliculas.find((pelicula)=> pelicula.codigo === urlParametros.get("codigo"));
// console.log(peliBuscada);

//dibujar los datos
let seccionDetalle = document.getElementById("seccionDetalle");
seccionDetalle.innerHTML = `<div class="card mb-3">
<div class="row g-0">
  <div class="col-md-4">
    <img src="${peliBuscada.imagen}" class="img-fluid rounded-start" alt="${peliBuscada.titulo}">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${peliBuscada.titulo}</h5>
      <p class="card-text">${peliBuscada.descripcion}</p>
      <p><span class="badge rounded-pill text-bg-primary">${peliBuscada.genero}</span></p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>
</div>`