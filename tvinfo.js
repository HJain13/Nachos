var selection = 1, count = 0;

function select(a) {
	if (a == 1) {
		document.getElementById("movie").classList.remove('disabled');
		document.getElementById("tv").classList.add('disabled');
		document.getElementById("season").classList.add('hidden');
		document.getElementById("search").className = "col-6 col-12-sm ";
		selection = 1;
	} else {
		document.getElementById("tv").classList.remove('disabled');
		document.getElementById("movie").classList.add('disabled');
		document.getElementById("season").classList.remove('hidden');
		document.getElementById("search").className = 'col-4 col-9-sm';
		selection = 0;
	}
}

function test() {
	if (selection == 0) {
		var userInput = document.getElementById("userInput").value;
		var userInput2 = userInput;
		if (document.getElementById("userInput2").value < 10) userInput2 += " S0" + document.getElementById("userInput2").value;
		else userInput2 += " S" + document.getElementById("userInput2").value;
		var newstr = userInput.replace(/ /g, "+");
		var newstr2 = userInput2.replace(/ /g, "+");
		console.log(newstr);

		// Info related to TV Series
		var tv = new XMLHttpRequest();
		var info, imgsrc;
		tv.open('GET', 'https://api.tvmaze.com/singlesearch/shows?q=' + newstr);
		tv.onload = function () {
			if (tv.status === 200) {
				info = JSON.parse(tv.responseText);
				document.getElementById("name").innerHTML = info.name;
				document.getElementById("cover").setAttribute("src", info.image.medium);
				document.getElementById("summary").innerHTML = info.summary;
				document.getElementById("rating").innerHTML = "<br><strong>Rating: </strong>" + Math.round(info.rating.average) + "" + "/10";
			} else {
				alert('There was an error. Status: ' + tv.status);
			}
		};
		tv.send();

		// Download Link Getter
		var v = new XMLHttpRequest();
		v.open('GET', 'https://www.googleapis.com/customsearch/v1?q=' + newstr2 + '&cx=007294272904903091646:wpksgp8bkg8&num=10&key=AIzaSyBJS1V16sSnl7dw3J1UlB3A4oaAd_TDyjE');
		var quality, format, link = '', linkList = [];
		count = 0;
		v.onload = function () {
			if (v.status === 200) {
				info = JSON.parse(v.responseText);
				info.items.forEach(function (item) {
					if (item.snippet.search(/1080p/i) != -1) quality = "1080p";
					else if (item.snippet.search(/720p/i) != -1) quality = "720p";
					else if (item.snippet.search(/480p/i) != -1) quality = "480p";
					else quality = "undefined";
					if (item.snippet.search(/x265/i) != -1) format = "x265";
					else format = "undefined";
					if (linkList.indexOf(item.displayLink+quality+format) == -1) {
						link += '<a href="' + item.link + '">' + item.displayLink + '</a> -- '+quality+' -- '+format+'</br>';
					}
					linkList[count++] = item.displayLink+quality+format;
				});
				document.getElementById("id").innerHTML = link;
				console.log(linkList);
			} else {
				alert('There was an error. Status: ' + v.status);
			}
		};
		v.send();
		var show = document.getElementById("data");
		show.classList.remove('hidden');
		var date = document.getElementById("release_date");
		date.classList.add('hidden');
	} else if (selection == 1) {
		var userInput = document.getElementById("userInput").value;
		var newstr = userInput.replace(/ /g, "+");
		console.log(newstr);

		var tv = new XMLHttpRequest();
		var info, imgsrc;
		tv.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=659717d1c9466f3d3b9d838355dba9a4&query=' + newstr);
		tv.onload = function () {
			if (tv.status === 200) {
				info = JSON.parse(tv.responseText);
				document.getElementById("name").innerHTML = info.results[0].title;
				var image = "https://image.tmdb.org/t/p/w500" + info.results[0].poster_path
				document.getElementById("cover").setAttribute("src", image);
				document.getElementById("summary").innerHTML = info.results[0].overview;
				document.getElementById("rating").innerHTML = "<strong>Rating: </strong>" + info.results[0].vote_average + "" + "/10";
				var b = info.results[0].release_date;
				a = b.substr(0, 4);
				document.getElementById("release_date").innerHTML = "<strong>Release Date: </strong>" + a;

			} else {
				alert('There was an error. Status: ' + tv.status);
			}
		};
		tv.send();
		var v = new XMLHttpRequest();
		v.open('GET', 'https://www.googleapis.com/customsearch/v1?q=' + newstr + '&cx=007294272904903091646:aqljjsm_byk&num=10&key=AIzaSyBJS1V16sSnl7dw3J1UlB3A4oaAd_TDyjE');
		var quality, format, link = '', linkList = [];
		v.onload = function () {
			if (v.status === 200) {
				info = JSON.parse(v.responseText);
				info.items.forEach(function (item) {
					if (item.snippet.search(/1080p/i) != -1) quality = "1080p";
					else if (item.snippet.search(/720p/i) != -1) quality = "720p";
					else if (item.snippet.search(/480p/i) != -1) quality = "480p";
					else quality = "undefined";
					if (item.snippet.search(/x265/i) != -1) format = "x265";
					else format = "undefined";
					if (linkList.indexOf(item.displayLink+quality+format) == -1) {
						link += '<a href="' + item.link + '">' + item.displayLink + '</a> -- '+quality+' -- '+format+'</br>';
					}
					linkList[count++] = item.displayLink+quality+format;
				});
				document.getElementById("id").innerHTML = link;
			} else {
				alert('There was an error. Status: ' + v.status);
			}
		};
		v.send();
		var show = document.getElementById("data");
		show.classList.remove('hidden');
		var date = document.getElementById("release_date");
		date.classList.remove('hidden');
	}
}

//Analytics

(function (i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r;
	i[r] = i[r] || function () {
		(i[r].q = i[r].q || []).push(arguments)
	}, i[r].l = 1 * new Date();
	a = s.createElement(o),
		m = s.getElementsByTagName(o)[0];
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-100240775-1', 'auto');
ga('send', 'pageview');