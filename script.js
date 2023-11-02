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
        paginationStore.style.opacity = '0';
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
let searchResults = debounce(fetchAPI, 400);

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
    lastPage(Math.ceil(res.totalResults/10));
}
//todo: -------- Append Movies ---------
function appendMovie(newMovieArray){
    movieContainer.innerHTML = "";
    newMovieArray.forEach(item => {
        
        let movie = document.createElement('div');
        movie.classList.add('movie');
        
        movie.innerHTML = `
            <img src="${item.poster}" alt="error" onclick = "showDialog('${item.poster}', '${item.name}')">
            <p class="title">Title : <span>${item.name}</span></p>
            <p class="year">Released Year : <span>${item.year}</span></p>
        `
        movieContainer.appendChild(movie);
    });
}
//todo: -------- Show Dialog Box ---------
function showDialog(link, name){
    mydialog.show();
    modal[0].innerHTML = `
    <div class="modalImg">
    <div class="image">
        <img src='${link}' alt="Error">
        <p class = "title">${name}</p> 
    </div>
    <div class="text">
        <p class="review">Review: <span> </span> </p>
        <textarea class="textarea" cols="30" rows="10">Write your review here... </textarea>
        <button> Save </button>
    </div>
    <button class="close" onclick="closeDialog()"> ❌ </button>
</div>
    `;

    let saveBtn = modal[0].querySelector('button');
    let text = modal[0].querySelector('textarea');
    let reviewContent = modal[0].querySelector('.review span');

    text.addEventListener('keyup', (e) =>{
        saveText(e.target.value, name);
    });
    saveBtn.addEventListener('click', () => {
        updateReview(text, reviewContent, name);
    });
    if(localStorage.getItem(`reviews/${name}`)){
        reviewContent.innerHTML = localStorage.getItem(`reviews/${name}`);
        text.style.display = 'none';
    }
}
//todo: --------- Close Dialog Box ---------
function closeDialog() {
    mydialog.close();
}
//todo: --------- Save in local storage ---------
function saveText(text, name){
    localStorage.setItem(`reviews/${name}`, text);
}
//todo: --------- update review ---------
function updateReview(text, reviewContent){
    reviewContent.innerHTML = text.value;
    text.style.display = 'none';
}
//todo: -------- Pagination ---------
function pagination(){
    let pageStore = document.createElement('div');
    pageStore.classList.add('pageStore')
    pageStore.innerHTML = `
        <button onclick="navigatePrev()">
            <svg width="35" height="35" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill="#000000" d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z"/>
            </svg>
        </button>
        <p class="paginationPara">
            Page <span>${pageCount}</span> of <span class="totalCount"></span>
        </p>
        <button onclick="navigateNext()">
            <svg width="35" height="35" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill="#000000" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"/>
            </svg>
        </button>
    `
    paginationStore.appendChild(pageStore);
}
pagination();
function handler(){
    document.querySelector('.paginationPara span').textContent= pageCount;
}
function lastPage(lastPageIndex){
    document.querySelector('.paginationPara .totalCount').textContent= lastPageIndex;
}
//todo: -------- activate prev button ---------
function navigatePrev(){
    if(pageCount > 1){
        pageCount--;
        searchResults();
        handler();
    }
}
//todo: -------- activate next button ---------
function navigateNext(){
    pageCount++;
    searchResults();
    handler();
}
input.addEventListener('input', () =>{
    pageCount = 1;
    searchResults();
    paginationStore.style.opacity = '1';
});

