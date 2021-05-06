const urlAPI = "https://www.omdbapi.com/?apikey=430cd2b8";
var numPagina;
var cantPaginas;

function buscar(newSearch) {
    if (newSearch) {
        numPagina = 1;
    }
    var title = document.getElementById("inputTitle").value.trim();
    var type = document.getElementById("inputType").value;
    var year = document.getElementById("inputYear").value;

    if (title === "") {
        alert("Debes introducir un titulo a buscar");
    }
    else {
        var prevPage = document.getElementById("prevPage");
        var nextPage = document.getElementById("nextPage");
        var currentPage = document.getElementById("currentPage");

        var lista = document.getElementById("lista");

        fetch(`${urlAPI}&s=${title}&type=${type}&y=${year}&page=${numPagina}`)
            .then(res => res.json())
            .then(data => {
                lista.innerHTML = "";
                currentPage.innerHTML = numPagina;
                cantPaginas = Math.ceil(data.totalResults / 10);
                if (data.Search) {
                    data.Search.forEach(el => {
                        lista.innerHTML += `
                        <div class="pelicula">
                            <img src=${el.Poster} alt="${el.Title}"/>
                            <div>
                                <h4>${el.Title}</h4>
                                <p>Year: ${el.Year}</p>
                                <p>Type: ${el.Type}</p>
                                <button class="btn" onclick="buscarDetalles(\'${el.imdbID}\')" data-bs-toggle="modal" data-bs-target="#myModal">Ver Mas</button>
                            </div>
                        </div>
                        `;
                    });
                }
                else {
                    lista.innerHTML = "<p style=\"text-align: center\">No se han encontrado resultados</p>";
                }
            })
            .catch(err => console.log(err));
    }

}

function buscarDetalles(id) {
    let modalTitle = document.getElementById("exampleModalLabel");
    let modalBody = document.getElementById("modal-info");

    fetch(`${urlAPI}&i=${id}&plot=full`)
        .then(res => res.json())
        .then(data => {
            modalTitle.innerHTML = `<h5>${data.Title}</h5>`;
            modalBody.innerHTML = `
                    <img src=${data.Poster} alt="${data.Title}"/>
                    <div>
                        <p>${data.Plot}</p>
                        <p>Director: ${data.Director}</p>
                        <p>Actors: ${data.Actors}</p>
                        <p>Year: ${data.Year}</p>
                        <p>Runtime: ${data.Runtime}</p>
                        <p>Genre: ${data.Genre}</p>
                        <p>Country: ${data.Country}</p>
                        <p>IMDB rating: ${data.imdbRating}</p>
                        <a href="https://www.imdb.com/title/${data.imdbID}/?ref_=nv_sr_srsg_0">Link a IMDB</a>
                    </div>
                `;
        })
        .catch(err => console.log(err));
}


function pasarPagina(num) {
    if (num === -1 && numPagina > 1) {
        numPagina += num;
        buscar(false);
        window.scrollTo(0, 0);
    }
    if (num === 1 && numPagina < cantPaginas) {
        numPagina += num;
        buscar(false);
        window.scrollTo(0, 0);
    }
}