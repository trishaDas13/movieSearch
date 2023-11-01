let input = document.querySelector('input');
let movieContainer = document.querySelector('.movieContainer');
let apiKey = '24b041e4';

//todo: -------- Fetch API ----------
async function fetchAPI(){
    let data = await fetch(`https://www.omdbapi.com/?&apikey=${apiKey}&s=${input.value}&page=1`);
    let res = await data.json();
    //* error handelling
    if(res.Error == "Too many results."){
        movieContainer.innerHTML  = "Too many results. Please provide a more specific search term.";
    }
    else if(res.Error == "Movie not found!"){
        movieContainer.innerHTML  = "Error: Movie not found!";
    }
    if(input.value == ""){
        movieContainer.innerHTML = "Please Enter a search term";
    }
    createObject(res);
}
//todo: -------- Debounce ----------
function debounce(fetchAPI, delay){
    let timeOutId; 
    return () => {
        if(timeOutId){
            clearTimeout(timeOutId);
        }
        timeOutId = setTimeout(() =>{
            fetchAPI(input.value);
        }, delay);
    }
}
let searchResults = debounce(fetchAPI, 500);

//todo: -------- Create Object --------
function createObject(res){
    let newMovieArray = res.Search.map((item) =>{
        return {
            name : item.Title,
            year : item.Year,
            poster : item.Poster,
        }
    });
    appendMovie(newMovieArray);
}
//todo: -------- Append Movies ---------
function appendMovie(newMovieArray){
    movieContainer.innerHTML = "";
    newMovieArray.forEach(item => {
        
        let movie = document.createElement('div');
        movie.classList.add('movie');
        
        movie.innerHTML = `
            <img src="${item.poster}" alt="error">
            <p class="title">Title : <span>${item.name}</span></p>
            <p class="year">Released Year : <span>${item.year}</span></p>
        `
        movieContainer.appendChild(movie);
    });
}
//todo: -------- Pagination ---------

input.addEventListener('input', searchResults);