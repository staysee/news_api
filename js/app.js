const BASE_URL = 'https://gnews.io/api/v4/';
const API_KEY = 'cbb78bca907814ac4fd92b5c424d2778'

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

  if (data.totalArticles === 0){
    $('.message').html(`There are ${data.totalArticles} result(s) for your search.`);
  }

  while (randomIndexes.length < articlesToGenerate){
    let randomNumber = Math.floor(Math.random() * 10);
    if (randomIndexes.indexOf(randomNumber) > -1 || randomNumber > 10){
      continue
    }
    randomIndexes[randomIndexes.length] = randomNumber;
  }
  return randomIndexes
}

function renderResults(result){
  console.log(`result`, result)
  let articleImage;
  let articleDescription;

  if (result.image == null || result.image == "" || result.image == undefined){
    articleImage = "./images/folded_newspaper.jpg";
  } else {
    articleImage = result.image;
  }

  if (result.description == null || result.description == "" || result.description == undefined){
    articleDescription = "No article description provided. Continue to article.";
  } else {
    articleDescription = result.description;
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

  console.log(`data`, data);
  if (data.articles.length < articlesToGenerate){
    articlesToGenerate = data.articles.length;
    articleNumbers = generateRandomArticleIndex(data, articlesToGenerate)
  } else {
    articleNumbers = generateRandomArticleIndex(data, articlesToGenerate)
  }


  console.log(`article numbers`, articleNumbers);

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
