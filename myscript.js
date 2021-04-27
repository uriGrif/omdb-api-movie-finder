const urlAPI = "http://www.omdbapi.com/?apikey=430cd2b8";
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
                        buscarDetalles(el.imdbID);
                    });
                }
                else {
                    lista.innerHTML = "<p style=\"text-align: center\">No se han encontrado resultados</p>";
                }
            })
            .catch(err => console.log(err));

        function buscarDetalles(id) {
            fetch(`${urlAPI}&i=${id}`)
                .then(res => res.json())
                .then(data => {
                    lista.innerHTML += `
                        <div class="pelicula">
                            <img src=${data.Poster} alt="${data.Title}"/>
                            <div>
                                <h4>${data.Title}</h4>
                                <p>${data.Plot}</p>
                                <p>Year: ${data.Year}</p>
                                <p>Runtime: ${data.Runtime}</p>
                                <p>Genre: ${data.Genre}</p>
                                <p>IMDB rating: ${data.imdbRating}</p>
                                <a href="https://www.imdb.com/title/${data.imdbID}/?ref_=nv_sr_srsg_0">Link a IMDB</a>
                            </div>
                        </div>
                        `;
                })
                .catch(err => console.log(err));
        }
    }

}

function pasarPagina(num) {
    if (num === -1 && numPagina > 1) {
        numPagina += num;
        buscar(false);
    }
    if (num === 1 && numPagina < cantPaginas) {
        numPagina += num;
        buscar(false);
    }
}