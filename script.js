let input = document.querySelector('input');
let movieContainer = document.querySelector('.movieContainer');
let mydialog = document.querySelector('.mydialog');
let modal = document.getElementsByClassName('modal');
let paginationStore = document.querySelector('.paginationStore');
let apiKey = '24b041e4';
let pageCount = 1;
let total = 0;

//todo: -------- Fetch API ----------
async function fetchAPI(){
    let data = await fetch(`https://www.omdbapi.com/?&apikey=${apiKey}&s=${input.value}&page=${pageCount}`);
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
            <img src="${item.poster}" alt="error" onclick = "showDialog('${item.poster}')">
            <p class="title">Title : <span>${item.name}</span></p>
            <p class="year">Released Year : <span>${item.year}</span></p>
        `
        movieContainer.appendChild(movie);
    });
}
//todo: -------- Show Dialog Box ---------
function showDialog(link){
    let imageLink = link;
    mydialog.show();
    modal[0].innerHTML = `
        <div class="modalImg">
            <img src='${imageLink}' alt="">
            <button class="close" onclick="closeDialog()"> Close </button>
        </div>
    `;
}
//todo: --------- Close Dialog Box---------
function closeDialog() {
    mydialog.close();
}
//todo: -------- Pagination ---------
function pagination(){
    let totalPages = Math.ceil(total / 10);
    let pageStore = document.createElement('div');
    pageStore.classList.add('pageStore')
    pageStore.innerHTML = `
        <button ${pageCount === 1 ? 'disabled' : ''} onclick="navigate(${pageCount-1})">Prev.</button>
        <p class="paginationPara">
            Page <span>${pageCount}</span> of <span>${totalPages}</span>
        </p>
        <button ${pageCount === totalPages ? 'disabled' : ''} onclick="navigate(${pageCount+1})">Next</button>
    `
    paginationStore.appendChild(pageStore);
}
pagination();
//todo: -------- Pagination ---------
function navigate(page){
    if((page >= pageCount ) && page <= Math.ceil(total / 10)){
        pageCount = page;
    }
}


input.addEventListener('input', searchResults);

