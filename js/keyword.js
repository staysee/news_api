//SEARCH BY KEYWORD FOR TOP HEADLINES

function searchTopHeadlines(query){
  const ENDPOINT_URL = BASE_URL + 'top-headlines';
  const queryK = {
    q: `${query}`,
    sortBy: 'relevancy',
    pageSize: 100,
    country: 'us',
    apiKey: API_KEY
  }
  getDataFromApi(ENDPOINT_URL, queryK, displayNewsSearchData);
}

//EVENT HANDLER
function watchKeywordSubmit(){
  $('.js-keyword-form').submit(function(event){
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-keyword-query');
    const query = queryTarget.val();

    searchTopHeadlines(query)

    queryTarget.val("");
    $('.message').html("");
    $('.results').html("");
  })
}

$(watchKeywordSubmit);
