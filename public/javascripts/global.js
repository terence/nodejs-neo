

// Show Food Info
function showFoodInfo(event) {

  event.preventDefault();

  var foodInfoData = [];
  var foodName = $(this).attr('rel');

  $.getJSON('/foods/foodinfo/' + foodName, function(data) {
    var foodInfo = data[0];
    // Populate Info Box
    $('#foodInfoName').text(foodInfo.content.name);
    $('#foodInfoPrice').text(foodInfo.content.price);
    $('#foodInfoPop').text(foodInfo.content.popularity);
  });
};
