// ==================== Avoir api
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c3825cd5dmsh566a0d01b2db89fp1c843cjsn018abed16448',
		'X-RapidAPI-Host': 'netflix-api3.p.rapidapi.com'
	}
};
let url
let decadeArr = [];
// ======================================== Rouh
// ====================== avoir input search et button serach par année
let years = document.getElementById("years")//bar du recherche
let inputCountryUser = document.getElementById("countrysearchbar");
let inputGenreUser = document.getElementById("genresfilter");
let inputDirectorUser = document.getElementById("directorsearchbar");
let buttonYears = document.getElementById("validationYears");//bouton

// == Collback event: à chaque click sur button envoie ce qui est dans bar du recherch
buttonYears.addEventListener('click', e => {
	decadeArr.splice(0,decadeArr.length);
	url = 'https://netflix-api3.p.rapidapi.com/year/2021'
	let urlTab = url.split("/")

	// ajouter une condition qui prendre juste des chiffre et 4 chiffre, sinon affiche "votre demande ne pas trouvée"
	// ==================== index 4 = aaaa qui prendre la valeur donnée par utilisateur
	for (i = parseInt(years.value); i < parseInt(years.value) + 10; i++){
		urlTab[4] = i;
		urlTab[4].toString();
		let urlFinal = urlTab.join("/") 
		decadeArr.push(urlFinal);
	}
	// ==================== transférer tableau en url
	
	//console.log('----------------------->',urlFinal)
	// chaeck nouveu url
	
	for (i = 0; i < decadeArr.length; i++){
		getAPIinfo(decadeArr[i], options) // utiliser pour fetch
	}
	//createUrl2();
	//callAPI2(url2Bank, options2);
})
// ======================= Avoir récuperé api avec fetch
function getAPIinfo(url, options){
	//console.log(url);
	fetch(url, options)
		.then(response => {
			
			return response.json()// trensformer type donnée en json

		})
		.then(data => {
			searchDataBase(data);
			createUrl2();
			callAPI2(url3Bank, options2);
		})
		.catch(err => console.error(err)); // retourner erreur si ne pas fonction data
}
let titleToPoster = [];
function getTitleByCountryandTitle (country, title, listedIn, director, releaseYear){
	let titleResult = [];
    for (i = 0; i < title.length; i++){
        if (
			country[i].includes(inputCountryUser.value) == true && 
			listedIn[i].includes(inputGenreUser.value) == true &&
			director[i].includes(inputDirectorUser.value) ==true){
            titleResult.push(parseInt(releaseYear[i]) + " " + title[i] +  " -- Director: " + director[i]);
			titleToPoster.push(title[i]);
		}
    }
	let tableMovieResult = document.getElementById("filmresults");
	let movieresult = document.createElement("li");
		movieresult.innerHTML = titleResult.join("<br>");
		tableMovieResult.appendChild(movieresult);
		//console.log(titleResult);
		return titleToPoster;
	}
function searchDataBase (jsonData){
    let countryList = [];
    let titleList = [];
	let listedInlist = [];
	let directorList = [];
	let yearList = [];
    for (i = 0; i < jsonData.length; i++){
        countryList.push(jsonData[i].country)
        titleList.push(jsonData[i].title)
		listedInlist.push(jsonData[i].listedIn)
		directorList.push(jsonData [i].director)
		yearList.push(jsonData[i].releaseYear)
    }
    getTitleByCountryandTitle (countryList, titleList, listedInlist, directorList, yearList);
}
//====================================================================================================

console.log(titleToPoster)
let url2
let url2Bank = [];
let url3Bank = [];
function createUrl2(){
	url2 = "https://api.themoviedb.org/3/search/movie?api_key=37be5d290801265a56611ad3b8802f85&query="
	for (i = 0 ; i < titleToPoster.length; i++){
		url2Bank.push(url2 + titleToPoster[i].replace(/ /g, "+"));
	}
	url3Bank = [... new Set(url2Bank)];
	console.log(url3Bank)
}


const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c3825cd5dmsh566a0d01b2db89fp1c843cjsn018abed16448',
		'X-RapidAPI-Host': 'outking.p.rapidapi.com'
	}
};

let jpgFormat = [];
function callAPI2 (url2BankCall, options2){
	for (i = 0; i < url2BankCall.length; i++){
		fetch(url2BankCall[i], options2)
		.then(response => response.json())
		.then(data => 
			jpgFormat.push(data.results[0].poster_path))
			console.log(jpgFormat)
		.catch(err => console.error(err));
	}
}




