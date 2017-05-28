var tv = new XMLHttpRequest();
var info, imgsrc;
tv.open('GET', 'https://api.tvmaze.com/singlesearch/shows?q=how+i+met');
tv.onload = function () {
    if (tv.status === 200) {
        info = JSON.parse(tv.responseText);
        console.log(tv.responseText);
        document.getElementById("name").innerHTML = info.name;
        document.getElementById("cover").setAttribute("src",info.image.medium); 
        document.getElementById("summary").innerHTML = info.summary; 
        document.getElementById("rating").innerHTML += info.rating.average; 
    } else {
        alert('There was an error. Status: ' + tv.status);
    }
};
tv.send();
