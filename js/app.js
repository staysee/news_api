const NEWS_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = config.MY_KEY

function getDataFromApi(searchTerm, callback){
  const query = {
    q: `${searchTerm}`,
    sortBy: 'relevancy',
    pageSize: 20,
    apiKey: API_KEY
  }

  $.getJSON(NEWS_URL, query, callback);
}

function renderResults(result){
  let articleImage = "../images/newspaper_icon.png";

  if (result.urlToImage !== null || result.urlToImage !== "" || result.urlToimage !== undefined){
    articleImage = result.urlToImage;
  }

  return `
    <div class="search-item">
      <img class="article-pic" src="${articleImage}">
      <div class="title">TITLE:${result.title}</div>
      <div class="description">DESCRIPTION: ${result.description}</div>
      <a class="article-link" href="${result.url}" target="_blank">CLICK FOR ARTICLE</a>
    </div>
  `
}

function displayNewsSearchData(data){
  console.log(data);
  console.log(data.totalResults)
  let articlesToGenerate = 3;

  if (data.articles.length < 3){
    articlesToGenerate = data.articles.length;
  }
  console.log(`articles ${articlesToGenerate}`)

  const results = [];

  for (let i=0; i<articlesToGenerate; i++){
    let articleIndex = generateRandomArticleIndex(data);
    console.log(articleIndex);
    results.push(renderResults(data.articles[articleIndex]));
  }

  //const results = data.articles.map((article, index) => renderResults(article));
  $('.results').html(results)
}

function generateRandomArticleIndex(data){
  let randomIndexes = [];
  let numResults = data.articles.length;

  // let randomArticleIndex = Math.floor(Math.random() * numResults);

  // return randomArticleIndex;

  while (randomIndexes.length < 3){
    let randomNumber = Math.floor(Math.random() * numResults);
    if (randomIndexes.indexOf(randomNumber) > -1){
      continue;
    }
    randomIndexes[randomIndexes.length] = randomNumber;
  }

  return randomIndexes
}

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
