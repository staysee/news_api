const NEWS_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = config.MY_KEY

function getDataFromApi(searchTerm, callback){
  const query = {
    q: `${searchTerm}`,
    sortBy: 'relevancy',
    pageSize: 10,
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
  let articlesToGenerate = 3;

  const results = [];

  for (let i=0; i<articlesToGenerate; i++){
    let articleIndex = generateRandomArticleIndex(data);
    results.push(renderResults(data.articles[articleIndex]));
  }

  //const results = data.articles.map((article, index) => renderResults(article));

  $('.results').html(results)

}

function generateRandomArticleIndex(data){
  let numResults = data.articles.length;
  let randomArticleIndex = Math.floor(Math.random() * numResults);

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
