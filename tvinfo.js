var selection = 1;

function select(a) {
	if (a==1) {
		document.getElementById("movie").classList.remove('disabled');
		document.getElementById("tv").classList.add('disabled');
		document.getElementById("season").classList.add('hidden');	
		document.getElementById("search").classList.add('col-6');
		document.getElementById("search").classList.add('col-12-sm');			
		document.getElementById("search").classList.remove('col-4');
		document.getElementById("search").classList.remove('col-9-sm');											
		selection = 1;    
	}
	else {
		document.getElementById("tv").classList.remove('disabled');
		document.getElementById("movie").classList.add('disabled');
		document.getElementById("season").classList.remove('hidden');	
		document.getElementById("search").classList.remove('col-6');
		document.getElementById("search").classList.remove('col-12-sm');			
		document.getElementById("search").classList.add('col-4');
		document.getElementById("search").classList.add('col-9-sm');											
		selection = 0;
	}
}

function test() {
	if (selection == 0) {
		var userInput = document.getElementById("userInput").value;
		var userInput2 = userInput;
		if (document.getElementById("userInput2").value < 10) userInput2 += " S0"+document.getElementById("userInput2").value;
		else userInput2 += " S"+document.getElementById("userInput2").value;
		var newstr=userInput.replace(/ /g,"+");
		var newstr2=userInput2.replace(/ /g,"+");		
		console.log(newstr);

		// Info related to TV Series
		var tv = new XMLHttpRequest();
		var info, imgsrc;
		tv.open('GET', 'https://api.tvmaze.com/singlesearch/shows?q='+newstr);
		tv.onload = function () {
			if (tv.status === 200) {
				info = JSON.parse(tv.responseText);
				console.log(tv.responseText);
				document.getElementById("name").innerHTML = info.name;
				document.getElementById("cover").setAttribute("src", info.image.medium);
				document.getElementById("summary").innerHTML = info.summary;
				document.getElementById("rating").innerHTML = "<strong>Rating: </strong>"+Math.round(info.rating.average)+""+"/10";
			} else {
				alert('There was an error. Status: ' + tv.status);
			}
		};
		tv.send();

		// Download Link Getter
		var v = new XMLHttpRequest();
		v.open('GET', 'https://www.googleapis.com/customsearch/v1?q='+newstr2+'&cx=007294272904903091646:wpksgp8bkg8&num=10&key=AIzaSyBJS1V16sSnl7dw3J1UlB3A4oaAd_TDyjE');
		var link = '', link720 = '', link480 = '';
		v.onload = function () {
			if (v.status === 200) {
				info = JSON.parse(v.responseText);
				info.items.forEach(function (item) {
					link += '<a href="'+item.link+'">'+item.displayLink+'</a></br>';
					console.log(link);
				});
				document.getElementById("id").innerHTML = link;
			} else {
				alert('There was an error. Status: ' + v.status);
			}
		};
		v.send();
		var show = document.getElementById("data");
		show.classList.remove('hidden');
	}
}
