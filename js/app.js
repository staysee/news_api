const BASE_URL = 'https://newsapi.org/v2/';
const API_KEY = config.MY_KEY

// API SEARCH
function getDataFromApi(url, query, callback){
  $.getJSON(url, query, callback);
}


// DISPLAY RESULTS
function generateRandomArticleIndex(data, articlesToGenerate){
  let randomIndexes = [];
  let numResults = data.articles.length;
  console.log(`No. total results: ${data.totalResults}`)

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
    articleImage = "./images/news.jpg";
  }

  if (result.description == null || result.description == "" || result.description == undefined){
    articleDescription = "No article description provided. Continue to article.";
  }

  return `
    <div class="search-item">
      <a class="article-link" href="${result.url}" target="_blank">
      <img class="article-pic" src="${articleImage}">
      <div class="title">${result.title}</div>
      <div class="description">${articleDescription}</div>
      </a>
    </div>
  `
}

function displayNewsSearchData(data){
  console.log(data);
  const results = [];
  let articlesToGenerate = 6;
  let articleNumbers = generateRandomArticleIndex(data, articlesToGenerate)

  if (data.articles.length < articlesToGenerate){
    articlesToGenerate = data.articles.length;
  }

  console.log(`No. articles to generate: ${articlesToGenerate}; arrray of articleNumbers: ${articleNumbers}`)

  for (let i=0; i < articleNumbers.length; i++){
    results.push(renderResults(data.articles[articleNumbers[i]]));
  }

  $('.results').html(results)
}



// APP FUNCTION
function openSearch(evt, searchType){
  let i, tabcontent, tablinks;

  // get all elements with class="tabcontent" and hide them
  tabcontent = $('.tabcontent');
  for (i=0; i<tabcontent.length; i++){
    tabcontent[i].style.display = "none";
  }
  // $('.tabcontent').css("display", "none");

  //get all elements with class="tablinks" and remove the class "active"
  tablinks = $('.tablinks');
  for (i=0; i<tablinks.length; i++){
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  //show current tab, and add an "Active" class to the link that opened the tab
  document.getElementById(searchType).style.display = "block";
  evt.currentTarget.className += " active";
}