const NEWS_URL = 'https://newsapi.org/v2/everything';
const API_KEY = config.MY_KEY

function getDataFromApi(searchTerm, callback){
  const query = {
    q: `${searchTerm}`,
    pageSize: 5,
    apiKey: API_KEY
  }

  $.getJSON(NEWS_URL, query, callback);
}

function displayNewsSearchData(data){
  console.log(data);
}

function watchSubmit(){
  $('.js-search-form').submit(event => {
    event.prevenDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();

    //clear out input
    queryTarget.val("");
    getDataFromApi(query, displayNewsSearchData);
  })
}

$(watchSubmit);
