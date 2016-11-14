document.addEventListener('DOMContentLoaded', function() {

	var new_gif_button = document.getElementById("new-gif-button");
	
  	var num_gifs = 0;
  	
  	var remove_gif_container = function() {
		var self = this;
		self.parentNode.removeChild(this);
		num_gifs -= 1;
	};
	
	var show_cross = function() {
		var self = this;
		var cross = self.getElementsByClassName("cross")[0];
		cross.classList.remove("hidden");
	};
	
	var hide_cross = function() {
		var self = this;
		var cross = self.getElementsByClassName("cross")[0];
		cross.classList.add("hidden");
	};
  	
	var get_gif = function () {
		
		if (num_gifs >= 9) {
			// this doesn't work right now
			new_gif_button.classList.add("red");
			setTimeout(function(){new_gif_button.classList.remove("red"), 2000});
			return
		}
		var search_term = document.getElementById("tag-input").value || "colours";
		var request = new XMLHttpRequest;
		request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + search_term, true);
		request.onload = function() {
			if (request.status == 200){
				var data = JSON.parse(request.responseText).data;
				var url = data.image_url;
				
				var width = data.image_width;
				var height = data.image_height;
				
				var dimension_class;
				if (width > height) {dimension_class = "wider";}
				else {dimension_class = "higher";}
				
				var cross = '<div class="hidden cross">X</div>'
								
				document.getElementById("gif-tv").innerHTML += '<div class="gif-container">' + cross + '<img class="gif ' + dimension_class +'" src="'+ url +'"  title=' + search_term + ' GIF via giphy"></div>';
			} else {
				console.log('error!');
			}
			
			num_gifs += 1;
			
			var gif_containers = document.getElementsByClassName("gif-container");
			for (var i=0; i<gif_containers.length; i++) {
				gif_containers[i].removeEventListener("click", remove_gif_container);
				gif_containers[i].removeEventListener("mouseover", show_cross);
				gif_containers[i].removeEventListener("mouseout", hide_cross);
				
				gif_containers[i].addEventListener("click", remove_gif_container);
				gif_containers[i].addEventListener("mouseover", show_cross);
				gif_containers[i].addEventListener("mouseout", hide_cross);
			}
		};
		request.onerror = function() {
			console.log('connection error');
		};
		request.send();		
	};

	// add button click event
	new_gif_button.addEventListener("click", get_gif);
	
});
