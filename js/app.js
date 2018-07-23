const NEWS_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = config.MY_KEY

function getDataFromApi(searchTerm, callback){
  const query = {
    q: `${searchTerm}`,
    sortBy: 'relevancy',
    pageSize: 100,
    country: 'us',
    apiKey: API_KEY
  }

  $.getJSON(NEWS_URL, query, callback);
}

function renderResults(result){
  let articleImage = result.urlToImage
  let articleDescription = result.description;

  if (result.urlToImage == null || result.urlToImage == "" || result.urlToImage == undefined){
    articleImage = "./images/newspaper_icon.png";;
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
  let articlesToGenerate = 3;

  if (data.articles.length < 3){
    articlesToGenerate = data.articles.length;
  }
  console.log(`articles ${articlesToGenerate}`)

  const results = [];
  let articleNumbers = generateRandomArticleIndex(data)
  console.log(`articlenumbers: ${articleNumbers}`)
  console.log(articleNumbers)

  for (let i=0; i < articleNumbers.length; i++){
    results.push(renderResults(data.articles[articleNumbers[i]]));
  }

  $('.results').html(results)
}

function generateRandomArticleIndex(data){
  let randomIndexes = [];
  let numResults = data.articles.length;
    console.log(`total results: ${data.totalResults}`)

  while (randomIndexes.length < 3){
    let randomNumber = Math.floor(Math.random() * data.totalResults);
    if (randomIndexes.indexOf(randomNumber) > -1 || randomNumber > 100){
      continue;
    }
    randomIndexes[randomIndexes.length] = randomNumber;
  }

  return randomIndexes
}

// TAB HANDLERS
function openSearch(evt, searchType){
  let i, tabcontent, tablinks;

  //get all elements with class="tabcontent" and hide them
  tabcontent = $('.tabcontent');
  for (i=0; i<tabcontent.length; i++){
    tabcontent[i].style.display = "none";
  }

  //get all elements with class="tablinks" and remove the class "active"
  tablinks = $('.tablinks');
  for (i=0; i<tablinks.length; i++){
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  //show current tab, and add an "Active" class to the link that opened the tab
  document.getElementById(searchType).style.display = "block";
  evt.currentTarget.className += " active";
}


// EVENT HANDLERS
function watchSubmit(){
  $('.js-search-form').submit(function(event){
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();

    console.log(`submit query: ${query}`);

    //clear out input
    queryTarget.val("");
    $('.results').html("");
    getDataFromApi(query, displayNewsSearchData);
  })
}

function watchCheckboxSelection(){
  $('input[type=checkbox]').on('change', function() {
    if ($(this).is(':checked')){
      console.log($(this).val());
    }
});
}

$(watchSubmit);
$(watchCheckboxSelection);
