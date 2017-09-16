var characterArray = ['Vegeta','Goku','Gohan','Piccolo','Android 17','Android 18','Krillin','Frieza','Master Roshi']

var characterImage = $('<img>');

var gifStatic = true;

var gifImage;

var results;

var currentGif;

var state;

//==============================================================================

function renderButtons(){
	$('#characterButtons').empty();
	for (var i = 0; i < characterArray.length; i++){
			$('#characterButtons').append("<button class='characterButton' value='" + characterArray[i] + "'>" + characterArray[i] + "</button>")
		}
	$(".characterButton").on('click', function(){

		var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + $(this).val() + '&api_key=dc6zaTOxFJmzC&limit=10';

		$.ajax({url: queryURL, method: 'GET'})

			.done(function(response){
				$('#characterGifs').empty();
				results = response.data;

				for (var i = 0; i < results.length; i++){
					currentGif = results[i]
					gifImage = $('<img>');
					gifImage.attr('src', currentGif.images.fixed_height_still.url);
					gifImage.attr('data-animate', currentGif.images.fixed_height.url);
					gifImage.attr('data-still', currentGif.images.fixed_height_still.url);
					gifImage.attr('data-state', "still")
					gifImage.addClass('giphy');
					$('#characterGifs').append("<br><br>Rating: " + currentGif.rating.toUpperCase() + "<br>");
					$('#characterGifs').append(gifImage);
				}
			});	
	});
}

function toUpperCase(str)//isert REGEX - this is to add your new button from search... Auto adjusts your type to Capitalize first letter.
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

$(document).ready(function(){
	renderButtons();

	$('#addCharacter').on('click', function(){
		var searchedCharacter = $("#character-input").val().trim();
		var upperCaseCharacter = toUpperCase(searchedCharacter);
		characterArray.push(upperCaseCharacter);
		renderButtons();
		return false; //this is essential because we are using a form; if you don't return false it will refresh page
	});

	$("#characterGifs").on('click', '.giphy', function(){
			var state = $(this).attr('data-state');
			
			if (state == 'still'){
	            $(this).attr('src', $(this).data('animate'));
	            $(this).attr('data-state', 'animate');
	        }else{
	            $(this).attr('src', $(this).data('still'));
	            $(this).attr('data-state', 'still');
	        }
		})
});

