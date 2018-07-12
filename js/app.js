const NEWS_URL = 'https://newsapi.org/v2/top-headlines';
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

$(watchSubmit);
