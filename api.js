
	// Données utilisateur ==================================

let inputYearsUser = document.getElementById("years"); // Demander l'année à l'utilisateur
let inputCountryUser = document.getElementById("countrysearchbar"); // Demander le pays à l'utilisateur
let inputGenreUser = document.getElementById("genresfilter") // Demander le genre à l'utilisateur
let inputDirectorUser = document.getElementById("directorsearchbar"); // Demander le réalisateur à l'utilisateur
let buttonSearch = document.getElementById("validationSearch") // Lancer la recherche




// Déclencher l'évènement CLICK
buttonSearch.addEventListener('click', e => {

groupDataFromNetflix (createNetflixUrlForDecade(urlNetflix), optionsNetflix);

})




// Créer un tableau d'URL pour une décennie =============

let urlNetflix = 'https://netflix-api3.p.rapidapi.com/year/2021' // Url de base de l'api Netflix.
let decadeUrlNetflixArr = []; // Créer le tableau d'urls pour la décennie

// La fonction createNetflixUrlForDecade créer un tableau de 10 url correspondant à la décennie choisie par l'utilisateur. Elle commence par vider ce tableau s'il était plein auparavant.
function createNetflixUrlForDecade (url){ 
    decadeUrlNetflixArr.splice(0,decadeUrlNetflixArr.length);

    let cutUrl = url.split("/"); 
    let endfOfUrl = "";

    for (i = parseInt(inputYearsUser.value); i < parseInt(inputYearsUser.value) + 10; i++){
        
        cutUrl[4] = i;
        endfOfUrl = cutUrl[4].toString();
        decadeUrlNetflixArr.push(endfOfUrl);
    }
    return decadeUrlNetflixArr;
    
}

// ========================= OPTIONS POUR APIS
const optionsNetflix = {

    method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c3825cd5dmsh566a0d01b2db89fp1c843cjsn018abed16448',
		'X-RapidAPI-Host': 'netflix-api3.p.rapidapi.com'
	}

}


// const optionsMovieDataBase = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '6c3825cd5dmsh566a0d01b2db89fp1c843cjsn018abed16448',
// 		'X-RapidAPI-Host': 'outking.p.rapidapi.com'
// 	}
// };

// Cette fonction groupDataFromNetflix envoie une requête fetch pour chaque url d'un tableau d'url et récolte leurs données.

let finalArrayOfNetflixObjects = [];
let resultFromFilterObjects = [];

// ============================================ Netflix api
function groupDataFromNetflix (arrays, options){

    (async () => {
        try {
            const names = await Promise.all(
                arrays.map(async(array) => {
                    const response = await fetch(`https://netflix-api3.p.rapidapi.com/year/${array}`, options);
                    
                    const name = await response.json();
                    return name;
                })
            )
            finalArrayOfNetflixObjects = groupDataObjectsInOneArray(names);

        } catch(e) {
            console.log(e.messages);
        }
        
        filterObjectsFromInputUser(finalArrayOfNetflixObjects);
        
    })()

}

// Cette fonction groupDataObjectsInOneArray regroupe le data récolté par groupDataFromNetflix en un seul tableau de résultat
function groupDataObjectsInOneArray(array){
    const arrayResult = array.flat();
    return arrayResult;
}

// Cette fonction filtre les objets de l'API Netflix en fonction des inputs rentrés par les utilisateurs. 
// let titleNetflixToUrlMovieDataBase = [];
function filterObjectsFromInputUser (array){

let arrayofResultsObjectsFromFilter = [];

    for (i=0; i < array.length; i++){
        

        if (
            array[i].country.includes(inputCountryUser.value) == true &&
            array[i].listedIn.includes(inputGenreUser.value) == true &&
            array[i].director.includes(inputDirectorUser.value) == true
        ){
            
            arrayofResultsObjectsFromFilter.push(array[i]);
            // titleNetflixToUrlMovieDataBase.push(array[i].title);
    
        }
    }
    createObjectFilm(arrayofResultsObjectsFromFilter);

    // let UrlForMovieDataBase = createUrlMovieDataBaseFromArrayOfTitle(titleNetflixToUrlMovieDataBase);
    // getResultFromMovieDataBase(UrlForMovieDataBase, optionsMovieDataBase);
}

// Cette fonction créé un URL pour l'API de Movie DataBase à partir du titre du résultat de la recherche Netflix
// let urlMovieDataBaseOrigin = "https://api.themoviedb.org/3/search/movie?api_key=37be5d290801265a56611ad3b8802f85&query="
// let arrayOfTitleForUrlMovieDataBase = [];

// function createUrlMovieDataBaseFromArrayOfTitle (array){

//     for (i = 0; i < array.length; i++){

//         arrayOfTitleForUrlMovieDataBase.push(array[i].replace(/ /g, "+"));
//     }
//     return arrayOfTitleForUrlMovieDataBase;
// }

// Cette fonction ira chercher le poster de Movie Data Base 
// function getResultFromMovieDataBase (arrays, options){
//     // console.log(arrays[1])
//     fetch("https://api.themoviedb.org/3/search/movie?api_key=37be5d290801265a56611ad3b8802f85&query=The+Nutty+Professor+II:+The+Klumps", options)
// 		.then(response => {
			
// 			return response.json()// trensformer type donnée en json

// 		})
// 		.then(data => {
// 			console.log(data)
			
// 		})
// 		.catch(err => console.error(err)); // retourner erreur si ne pas fonction data
    
//     // (async () => {
//     //     try {
//     //         const names = await Promise.all(
//     //             arrays.map(async (array) => {
//     //                 const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=37be5d290801265a56611ad3b8802f85&query=${array}`, options);

//     //                 const name = await response.json();
                    
//     //                 return name;
//     //             })
//     //         );
//     //         getPosterPathFromMovieDataBase(names);

//     //     } catch (e) {
//     //         console.log(e.messages);
//     //     }
//     // })()

// }

// Cette fonction ira chercher le lien de l'image JPG correspondant au résultat de notre recherche et la stockera dans un tableau.
// let posterPathForMatches = []; 
// function getPosterPathFromMovieDataBase (array){
//     // console.log("--------------------------------------test---------",array)
//     for (i = 0; i < array.length; i++){

//         if (
//             array[i].results[0] == null ||
//             array[i].results[0].poster_path == null
//             ){
//                 posterPathForMatches.push(array[i].results[0].poster_path);
//             }
        
//     }
//     // console.log(posterPathForMatches);
//     return posterPathForMatches;
// }







// =========================== Cline html après chaque changement d'un api
const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

// =========================== Avoir affiché les films sur page html
function createObjectFilm(arrayofResultsObjectsFromFilter){
let DIVResultFilm= document.getElementById("resultatNumberFilm");
	let DivParentfilmresults = document.getElementById("resultFilm");
	removeChilds(DivParentfilmresults)

    let longeurTableau = arrayofResultsObjectsFromFilter.length;
	let numberResultFilm = document.createElement("h3")
	numberResultFilm.innerText= longeurTableau;
	DIVResultFilm.appendChild(numberResultFilm);
    let finalMovieObjectTvShowDiv;
    let finalMovieObjectMovieDiv;
    let tvShowUl;
    let movieUl;

    let liType;
    let liTitleAndYear;
    let director;
    let acteurs;
    let genre;
    let pays;
    let resumer;

    for (i = 0; i < longeurTableau; i++){

		if(arrayofResultsObjectsFromFilter[i].type == "TV Show"){// avoir les émission télé

            finalMovieObjectTvShowDiv = document.createElement("div")
            finalMovieObjectTvShowDiv.className = "classFordevResult"
            tvShowUl = document.createElement("ul")
            liType = document.createElement("li")
            liTitleAndYear = document.createElement("li")
            director = document.createElement("li")
            acteurs = document.createElement("li")
            genre = document.createElement("li")
            pays = document.createElement("li")
            resumer = document.createElement("li")

            liType.innerText = arrayofResultsObjectsFromFilter[i].type
            liTitleAndYear.innerText = "Title: " + arrayofResultsObjectsFromFilter[i].title + ", " + "Decade: " + arrayofResultsObjectsFromFilter[i].releaseYear
            director.innerText = "Director: " + arrayofResultsObjectsFromFilter[i].director
            acteurs.innerText = "Cast: " + arrayofResultsObjectsFromFilter[i].cast
            genre.innerText = "Genre: " + arrayofResultsObjectsFromFilter[i].listedIn
            pays.innerText = "Country: " + arrayofResultsObjectsFromFilter[i].country
            resumer.innerText = "Synopsis: " + arrayofResultsObjectsFromFilter[i].description


            tvShowUl.appendChild(liType)
            tvShowUl.appendChild(liTitleAndYear)
            tvShowUl.appendChild(director)
            tvShowUl.appendChild(acteurs)
            tvShowUl.appendChild(genre)
            tvShowUl.appendChild(pays)
            tvShowUl.appendChild(resumer)

            finalMovieObjectTvShowDiv.appendChild(tvShowUl)// ajouter ul dans div
            DivParentfilmresults.appendChild(finalMovieObjectTvShowDiv)//ajouter div enfant dand div parent

		}
    }

    for (i = 0; i < longeurTableau; i++){

		if(arrayofResultsObjectsFromFilter[i].type == "Movie"){// avoir les émission télé

            finalMovieObjectMovieDiv = document.createElement("div")
            finalMovieObjectMovieDiv.className = "classFordevResult"
            movieUl = document.createElement("ul")

            liType = document.createElement("li")
            liTitleAndYear = document.createElement("li")
            director = document.createElement("li")
            acteurs = document.createElement("li")
            genre = document.createElement("li")
            pays = document.createElement("li")
            resumer = document.createElement("li")

            liType.innerText = arrayofResultsObjectsFromFilter[i].type
            liTitleAndYear.innerText = "Titre: " + arrayofResultsObjectsFromFilter[i].title + " " + arrayofResultsObjectsFromFilter[i].releaseYear
            director.innerText = "Director: " + arrayofResultsObjectsFromFilter[i].director
            acteurs.innerText = "Acteurs: " + arrayofResultsObjectsFromFilter[i].cast
            genre.innerText = "Genre: " + arrayofResultsObjectsFromFilter[i].listedIn
            pays.innerText = "Pays: " + arrayofResultsObjectsFromFilter[i].country
            resumer.innerText = "Resumer: " + arrayofResultsObjectsFromFilter[i].description

            movieUl.appendChild(liType)
            movieUl.appendChild(liTitleAndYear)
            movieUl.appendChild(director)
            movieUl.appendChild(acteurs)
            movieUl.appendChild(genre)
            movieUl.appendChild(pays)
            movieUl.appendChild(resumer)

            finalMovieObjectMovieDiv.appendChild(movieUl)
            DivParentfilmresults.appendChild(finalMovieObjectMovieDiv)

		}
    }
	console.log(longeurTableau);
}


