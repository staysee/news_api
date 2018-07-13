const NEWS_URL = 'https://newsapi.org/v2/everything';
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
  return `
    <div class="search-item">
      <img class="article-pic" src="${result.urlToImage}">
      <div class="title">TITLE:${result.title}</div>
      <div class="description">DESCRIPTION: ${result.description}</div>
      <a class="article-link" href="${result.url}">CLICK FOR ARTICLE</a>
    </div>
  `
}

function displayNewsSearchData(data){
  console.log(data);
  const results = data.articles.map((article, index) => renderResults(article));

  $('.results').html(results)

}

function watchSubmit(){
  $('.js-search-form').submit(function(event){
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();

    console.log(`submit query: ${query}`);

    //clear out input
    queryTarget.val("");
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
