function test() {
    var userInput = document.getElementById("userInput").value;
    var newstr=userInput.replace(/ /g,"+");
    console.log(newstr);

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
            document.getElementById("rating").innerHTML += info.rating.average;
        } else {
            alert('There was an error. Status: ' + tv.status);
        }
    };
    tv.send();




    var v = new XMLHttpRequest();
    v.open('GET', 'https://www.googleapis.com/customsearch/v1?q='+newstr+'&cx=007294272904903091646:wpksgp8bkg8&num=10&key=AIzaSyBJS1V16sSnl7dw3J1UlB3A4oaAd_TDyjE');
    var link;
    v.onload = function () {
        if (v.status === 200) {
            info = JSON.parse(v.responseText);
            info.items.forEach(function (item) {
                console.log(item.link);
                 link += '<a href="'+item.link+'">'+item.link+'</a></br>';
                 console.log(link);
            //     '<a href="'+ ''+object.link+'">'+object.link+'</a><br>'
            });
            document.getElementById("id").innerHTML = link;
        } else {
            alert('There was an error. Status: ' + v.status);
        }
    };
    v.send();
}
