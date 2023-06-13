


const movieKey = "b7428a0ca820178ea8b6bf43512976b2"


//let the_url = "https://api.themoviedb.org/3/movie/now_playing?api_key=b7428a0ca820178ea8b6bf43512976b2&language=en-US&page=1"

//let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${movieKey}&language=en-US&page=${currentPages}`
let currentPages = 0

// the async/await way of making an API call.

// api fetch
// access the results 
//store the results
//show the results
//create div tag 
// create title, vote, poster
// append all this info in div

const movieDisplayed = document.querySelector("#movie-displayed")

const createMov = (moviObj) => {
    const movieRating = moviObj.vote_average
    const movieTitle = moviObj.title
    const moviePoster = moviObj.poster_path
    let movDisVar = document.createElement('div')
    movDisVar.setAttribute("class", "movie-card")
    let movTitle = document.createElement('h2')
    movTitle.setAttribute('class', "movie-title")
    let movVotes = document.createElement('h2')
    movVotes.setAttribute("class", "movie-votes")
    let movImg= document.createElement('img')
    movImg.setAttribute("class", "movie-poster")
    movTitle.innerHTML = movieTitle
    movVotes.innerHTML = movieRating
    movImg.setAttribute("src", `https://image.tmdb.org/t/p/w500/${moviePoster}`)

    movDisVar.appendChild(movImg)
    movDisVar.appendChild(movTitle)
    movDisVar.appendChild(movVotes)
    movieDisplayed.appendChild(movDisVar)


    //console.log(movDisVar)



}

async function apiCall() {
    currentPages += 1
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${movieKey}&language=en-US&page=${currentPages}`
    const res = await fetch(url)
    const data = await res.json()
    
   


    data.results.forEach( (movieObject) => {
        createMov(movieObject)
    })
    
   

  //return data.results
}

//let apiResults = apiCall()
apiCall()


const loadMore = document.querySelector("#load-more-movies-btn")

loadMore.addEventListener("click", apiCall)

const searchForm = document.getElementById("search-form")
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-button")
const clearBtn = document.getElementById("clear-button")


async function apiSearch(query) {
    let url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${movieKey}&language=en-US`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    movieDisplayed.innerHTML = ""


    data.results.forEach( (movieObject) => {
        createMov(movieObject)
    })

}
    let searchText = ""
    searchInput.addEventListener("input", (event) => {searchText = event.target.value})

    searchBtn.addEventListener("click", async (event) => {
        event.preventDefault()
        await apiSearch(searchText)
       
    
    })

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault()
    
    })



    async function homePage() {
        let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${movieKey}&language=en-US&page=1`
        const res = await fetch(url)
        const data = await res.json()
       
    
    
        data.results.forEach( (movieObject) => {
            createMov(movieObject)
        })
    }












    clearBtn.addEventListener("click",() => {
        searchInput.value = ""
        movieDisplayed.innerHTML = ""
        homePage()


    })

    





 





