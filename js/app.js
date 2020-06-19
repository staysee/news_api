const BASE_URL = 'http://newsapi.org/v2/';
const API_KEY = 'a9bef3e51f1f4273b2ba47ed41b5449d'

// ----------
//  API CALL
// ----------

function getDataFromApi(url, query, callback){
  $.getJSON(url, query, callback);
}

// ----------------
// DISPLAY RESULTS
// ----------------
function generateRandomArticleIndex(data, articlesToGenerate){
  let randomIndexes = [];
  let numResults = data.articles.length;

  if (data.totalResults === 0){
    $('.message').html(`There are ${data.totalResults} result(s) for your search.`);
  }

  while (randomIndexes.length < articlesToGenerate){
    let randomNumber = Math.floor(Math.random() * data.totalResults);
    if (randomIndexes.indexOf(randomNumber) > -1 || randomNumber > 99){
      continue
    }
    randomIndexes[randomIndexes.length] = randomNumber;
  }
  return randomIndexes
}

function renderResults(result){
  let articleImage = result.urlToImage;
  let articleDescription = result.description;

  if (result.urlToImage == null || result.urlToImage == "" || result.urlToImage == undefined || result.urlToImage.match(/abcnews\.com\/images/)){
    articleImage = "./images/folded_newspaper.jpg";
  }

  if (result.description == null || result.description == "" || result.description == undefined){
    articleDescription = "No article description provided. Continue to article.";
  }

  return `
    <div class="search-item">
    <div class="inside-content">
      <a class="article-link" href="${result.url}" target="_blank" role="button" aria-label="open article">
      <img class="article-pic" src="${articleImage}" alt="image for ${result.title}" role="presentation">
      <div class="title">${result.title}</div>
      <div class="description">${articleDescription}</div>
      </a>
    </div>
    </div>
  `
}

function displayNewsSearchData(data){
  const results = [];
  let articlesToGenerate = 6;
  let articleNumbers;

  if (data.articles.length < articlesToGenerate){
    articlesToGenerate = data.articles.length;
    articleNumbers = generateRandomArticleIndex(data, articlesToGenerate)
  } else {
    articleNumbers = generateRandomArticleIndex(data, articlesToGenerate)
  }

  for (let i=0; i < articleNumbers.length; i++){
    results.push(renderResults(data.articles[articleNumbers[i]]));
  }

  $('.results').html(results)
}

// -------------
//  APP FUNCTION
// -------------
function openSearch(evt, searchType){
  let i, tabcontent, tablinks;

  $('.tabcontent').css("display", "none");
  $('.tablinks').removeClass("active");
  $(`#${searchType}`).css("display", "block");

  evt.currentTarget.className += " active";
}
