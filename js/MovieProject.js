$.get("https://light-quilted-boar.glitch.me/movies").done(function (data) {
    console.log(data);
    let index = 0;
    $(".weekly-forecast").html("");
    for (let i = 0; i < 100; i++) {
        $("#movie-cards").append(
            '<div class="movie-cards">' +
            '<h5 id="title" class="card-title">' + JSON.stringify(data[i].title) + '</h5>' +
            '<div id="rating" class="card-body">' + JSON.stringify(data[i].rating) + '</div>' +
            '<div id="rating" class="card-body">' + JSON.stringify(data[i].genre) + '</div>' +
            '<div id="rating" class="card-body">' + JSON.stringify(data[i].summary) + '</div>'
        )
        index += 8
    }})













// $("#movie-cards").append(
//     '<div class="movie-cards">' +
//     '<h5 id="date" class="card-title">' + data.list[i].dt_txt.substring(5 ,8) + data.list[i].dt_txt.substring(8 ,10) + `-` + data.list[i].dt_txt.substring(0 ,4) + '</h5>' +
//     // '<img src="http://openweathermap.org/img/wn/' + data.list[index].weather[0].icon + '@2x.png" class="card-img-top">' +
//     // '<div class="card-body">' +
//     // '<p id="mainTemp" class="card-text">' + Math.round(data.list[index].main.temp) + '°F</p></div>' +
//     // '<ul class="weather-stats">' +
//     // '<p class="card-max-min">H: ' + Math.round(data.list[0].main.temp_max) + '°F &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp L:  ' + Math.round(data.list[0].main.temp_min) + '°F</p>' +
//     // '<li class="list-group-item">Humidity: ' + Math.round(data.list[index].main.humidity) + '</li>' +
//     // '<li class="list-group-item">Wind: ' + (data.list[index].wind.speed).toFixed(1) + '</li>' +
//     // '<li class="list-group-item">Pressure: ' + Math.round(data.list[index].main.pressure) + '</li>' +
//     '</ul></div>'
// );