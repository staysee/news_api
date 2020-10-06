//SEARCH BY CATEGORIES TO EVERYTHING

function searchEverything(){
  const ENDPOINT_URL = BASE_URL + 'top-headlines';
  let selectedCategory = $('input:checked').val();

  const queryE = {
    topic: `${selectCategories()}`,
    language: 'en',
    country: 'us',
    token: API_KEY
  }
  console.log(queryE.topic)
  getDataFromApi(ENDPOINT_URL, queryE, displayNewsSearchData)
}

function selectCategories(){
  let pickedCategories = [];
  $.each($('input[name="category"]:checked'), function(){
    pickedCategories.push($(this).val());
  })

  return pickedCategories
}

//EVENT HANDLER
function watchCategorySubmit(){
  $('.js-category-form').submit(function(event){
    $('.message').html("");
    event.preventDefault();
    searchEverything();
    $('input[type=checkbox]').each(function(){
        this.checked = false;
      });
  })
}

$(watchCategorySubmit);
