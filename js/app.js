const NEWS_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = config.MY_KEY

function getDataFromApi(searchTerm, callback){
  const query = {
    q: `${searchTerm}`,
    sortBy: 'relevancy',
    pageSize: 100,
    apiKey: API_KEY
  }

  $.getJSON(NEWS_URL, query, callback);
}

function renderResults(result){
  let articleImage = result.urlToImage

  if (result.urlToImage == null || result.urlToImage == "" || result.urlToImage == undefined){
    articleImage = "../images/newspaper_icon.png";;
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
  // for (let i=0; i<articlesToGenerate; i++){
  //   let articleIndex = generateRandomArticleIndex(data);
  //   console.log(articleIndex);
  //   results.push(renderResults(data.articles[articleIndex]));
  // }

  //const results = data.articles.map((article, index) => renderResults(article));
  $('.results').html(results)
}

function generateRandomArticleIndex(data){
  let randomIndexes = [];
  let numResults = data.articles.length;
    console.log(`total results: ${data.totalResults}`)

  while (randomIndexes.length < 3){
    let randomNumber = Math.floor(Math.random() * data.totalResults);
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
