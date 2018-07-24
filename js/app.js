const BASE_URL = 'https://newsapi.org/v2/';
const API_KEY = config.MY_KEY

// API SEARCH
function getDataFromApi(url, query, callback){
  $.getJSON(url, query, callback);
}

function categorySources(selection){
  let entertainmentSources = 'entertainment-weekly, mtv-news';
  let sportsSources = 'espn, fox-sports, talksport, bbc-sport, the-sport-bible, bleacher-report, nfl-news';
  let technologySources = 'techcrunch, recode, techradar, the-verge, engadget';
  let financeSources = 'financial-times, financial-post';
  let healthSciencesSources = 'new-scientist, medical-news-today';
  let travelSources = 'national-geographic';

  if(selection === "entertainment"){
    return entertainmentSources
  }
  if(selection === "sports"){
    return sportsSources
  }
  if(selection === "technology"){
    return technologySources
  }
  if(selection === "finance"){
    return financeSources
  }
  if(selection === "health-sciences"){
    return healthSciencesSources
  }
  if(selection === "travel"){
    return travelSources
  }
}

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

function searchEverything(){
  const ENDPOINT_URL = BASE_URL + 'everything';
  let selectedCategory = $('input:checked').val();
  console.log(`selected category: ${selectedCategory}`)

  const queryE = {
    sources: `${categorySources(selectedCategory)}`,
    language: 'en',
    sortBy: 'relevancy',
    pageSize: 100,
    apiKey: API_KEY
  }

  getDataFromApi(ENDPOINT_URL, queryE, displayNewsSearchData)
}

function generateRandomArticleIndex(data){
  let randomIndexes = [];
  let numResults = data.articles.length;
  console.log(`No. total results: ${data.totalResults}`)

  while (randomIndexes.length < 3){
    let randomNumber = Math.floor(Math.random() * data.totalResults);
    if (randomIndexes.indexOf(randomNumber) > -1 || randomNumber > 100){
      continue
    }
    randomIndexes[randomIndexes.length] = randomNumber;
  }
  return randomIndexes
}


// DISPLAY RESULTS
function renderResults(result){
  let articleImage = result.urlToImage;
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
  const results = [];
  let articlesToGenerate = 3;
  let articleNumbers = generateRandomArticleIndex(data)

  if (data.articles.length < 3){
    articlesToGenerate = data.articles.length;
  }

  console.log(`No. articles to generate: ${articlesToGenerate}; arrray of articleNumbers: ${articleNumbers}`)

  for (let i=0; i < articleNumbers.length; i++){
    results.push(renderResults(data.articles[articleNumbers[i]]));
  }

  $('.results').html(results)
}







// EVENT HANDLERS
// function handleTabs(){
//   let clickedBtnID = $(this).attr('id');
//   $('.tablinks').on('click', function(){
//     openSearch(event, clickedBtnID)
//   })
// }
function openSearch(evt, searchType){
  let i, tabcontent, tablinks;

  // get all elements with class="tabcontent" and hide them
  tabcontent = $('.tabcontent');
  for (i=0; i<tabcontent.length; i++){
    tabcontent[i].style.display = "none";
  }
  // $('.tabcontent').addClass("hide");

  //get all elements with class="tablinks" and remove the class "active"
  tablinks = $('.tablinks');
  for (i=0; i<tablinks.length; i++){
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  //show current tab, and add an "Active" class to the link that opened the tab
  document.getElementById(searchType).style.display = "block";
  evt.currentTarget.className += " active";
}

function watchKeywordSubmit(){
  $('.js-keyword-form').submit(function(event){
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    console.log(`submit query: ${query}`);

    searchTopHeadlines(query)
    //clear out input
    queryTarget.val("");
    $('.results').html("");
  })
}

function watchCategorySubmit(){
  $('.js-category-form').submit(function(event){
    event.preventDefault();
    searchEverything();

  })
}

// function watchCheckboxSelection(){
//   $('input[type=checkbox]').on('change', function() {
//     if ($(this).is(':checked')){
//       console.log($(this).val());
//     }
// });
// }

$(watchKeywordSubmit);
$(watchCategorySubmit);
// $(watchCheckboxSelection);
// $(handleTabs);
