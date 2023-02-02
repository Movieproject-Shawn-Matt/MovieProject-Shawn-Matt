//Display the movies in their cards
function addNewCards () {
    $('#movie-cards').html('')
    $.get("https://light-quilted-boar.glitch.me/movies").done(function (data) {
        console.log(data);
        let index = 0;
        $(".weekly-forecast").html("");
        for (let i = 0; i < data.length; i++) {
            $("#movie-cards").append(
                '<div class="movie-cards">' +
                '<button type="button" data-id="'+ data[i].id +'" class="delete-btn btn btn-outline-danger w-15 p-1">' + 'X' + '</button>' +
                '<h5 id="title" class="card-title">' + JSON.stringify(data[i].title) + '</h5>' +
                '<div id="rating" class="card-body">' + JSON.stringify(data[i].rating) + '</div>' +
                '<div id="rating" class="card-body">' + JSON.stringify(data[i].genre) + '</div>' +
                '<div id="rating" class="card-body">' + JSON.stringify(data[i].summary) + '</div>' +
                '<div id="id" class="card-body">' + JSON.stringify(data[i].id) + '</div>' +
                '</div>'
            )
            index += 8
        }
        const deleteButton = $(".delete-btn");

        deleteButton.click(function() {
            const id = $(this).attr('data-id');
            alert(id)

            $.ajax({
                url: `https://light-quilted-boar.glitch.me/movies/${id}`,
                type: "DELETE",
                success: function(data) {
                    console.log(data);
                    addNewCards()
                },
                error: function(error) {
                    console.error("There was a problem with the delete operation:", error);
                }
            });
        });

    })
}
addNewCards()




//add a movie to the API
const titleTextBox = $("#title-text-box");
const ratingTextBox = $('#rating-text-box')
const genreTextBox = $('#genre-text-box')
const summaryTextBox = $('#summary-text-box')
const button = $("#button");

button.click(function() {
    const titleValue = titleTextBox.val();
    const ratingValue = ratingTextBox.val();
    const genreValue = genreTextBox.val();
    const summaryValue = summaryTextBox.val();


    $.ajax({
        url: "https://light-quilted-boar.glitch.me/movies",
        type: "POST",
        data: JSON.stringify({ title: titleValue, rating: ratingValue, genre: genreValue, summary: summaryValue }),
        contentType: "application/json",

        success: function(data) {
            addNewCards()
            console.log(data);
            movieData = data;
        },
        error: function(error) {
            console.error(error);
        }
    });
});




