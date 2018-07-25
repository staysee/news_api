//SEARCH BY CATEGORIES TO EVERYTHING

function searchEverything(){
  const ENDPOINT_URL = BASE_URL + 'everything';
  let selectedCategory = $('input:checked').val();
  console.log(`selected category: ${selectedCategory}`)

  const queryE = {
    sources: `${getSources(selectCategories())}`,
    language: 'en',
    sortBy: 'relevancy',
    pageSize: 100,
    apiKey: API_KEY
  }
  getDataFromApi(ENDPOINT_URL, queryE, displayNewsSearchData)
}

function selectCategories(){
  let pickedCategories = [];
  $.each($('input[name="category"]:checked'), function(){
    pickedCategories.push($(this).val());
  })
  console.log(`selected categories: ${pickedCategories}`);

  return pickedCategories
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

function getSources(categories, selection){
  let sources = categories.map(category => categorySources(category));

  console.log(sources.join(", "));
  return sources.join(", ");
}


//EVENT HANDLER
function watchCategorySubmit(){
  $('.js-category-form').submit(function(event){
    event.preventDefault();
    searchEverything();
  })
}

$(watchCategorySubmit);

// function watchCheckboxSelection(){
//   $('input[type=checkbox]').on('change', function() {
//     if ($(this).is(':checked')){
//       console.log($(this).val());
//     }
// });
// }

// $(watchCheckboxSelection);