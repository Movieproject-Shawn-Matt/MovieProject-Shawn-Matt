//Display the movies in their cards
function addNewCards() {
    $('#movie-cards').html('')
    $.get("https://light-quilted-boar.glitch.me/movies").done(function (data) {
        console.log(data);
        let index = 0;
        $(".weekly-forecast").html("");
        for (let i = 0; i < data.length; i++) {
            $("#movie-cards").append(
                '<div class="movie-cards">' +
                '<button type="button" data-id="' + data[i].id + '" class=" edit-btn btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">' + 'Edit Movie Post' + '</button>' +
                '<button type="button" data-id="' + data[i].id + '" class="delete-btn btn btn-outline-danger rounded-circle ">' + 'X' + '</button>' +
                '<h5 id="title" class="card-title">' + JSON.stringify(data[i].title) + '</h5>' +
                '<div id="rating" class="card-body">' + 'Rating out of 5: ' + JSON.stringify(data[i].rating) + '</div>' +
                '<div id="rating" class="card-body">' + 'Genre: ' + JSON.stringify(data[i].genre) + '</div>' +
                '<div id="rating" class="card-body">' + 'Summary: ' + JSON.stringify(data[i].summary) + '</div>' +

                '</div>'
            )
            index += 8
        }
        const deleteButton = $(".delete-btn");

        deleteButton.click(function () {
            const id = $(this).attr('data-id');

            $.ajax({
                url: `https://light-quilted-boar.glitch.me/movies/${id}`,
                type: "DELETE",
                success: function (data) {
                    console.log(data);
                    addNewCards()
                },
                error: function (error) {
                    console.error("There was a problem with the delete operation:", error);
                }
            });
        });

        $('.edit-btn').click(function () {
            const id = $(this).attr('data-id');
            $('.save-btn').attr('data-id', id)

            $.ajax({
                url: `https://light-quilted-boar.glitch.me/movies/${id}`,
                type: "GET",
                success: function (data) {
                    $("#edit-title-box").val(data.title);
                    $("#edit-rating-box").val(data.rating);
                    $("#edit-genre-box").val(data.genre);
                    $('#edit-summary-box').val(data.summary);
                },
                error: function (error) {
                    console.error("There was a problem with the request:", error);
                }
            });
        });


        $('.save-btn').click(function () {
            const id = $(this).attr('data-id');


            $.ajax({
                url: `https://light-quilted-boar.glitch.me/movies/${id}`,
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify({
                    title: $("#edit-title-box").val(),
                    rating: $("#edit-rating-box").val(),
                    genre: $("#edit-genre-box").val(),
                    summary: $("#edit-summary-box").val()
                }),
                success: function (data) {
                    addNewCards()
                    console.log(data);

                },
                error: function (error) {
                    console.error("There was a problem with the update:", error);
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

button.click(function () {
    const titleValue = titleTextBox.val();
    const ratingValue = ratingTextBox.val();
    const genreValue = genreTextBox.val();
    const summaryValue = summaryTextBox.val();


    $.ajax({
        url: "https://light-quilted-boar.glitch.me/movies",
        type: "POST",
        data: JSON.stringify({title: titleValue, rating: ratingValue, genre: genreValue, summary: summaryValue}),
        contentType: "application/json",

        success: function (data) {
            addNewCards()
            console.log(data);
            movieData = data;
        },
        error: function (error) {
            console.error(error);
        }
    });
});


document.documentElement.addEventListener("load", function () {
    document.getElementById("loading").style.display = "block";
});

window.addEventListener("load", function () {
    document.getElementById("loading").style.display = "none";
});

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})


//
// // Function to retrieve data for an object by id and display it in text boxes
// const getData = id => {
//     $.ajax({
//         url: `https://light-quilted-boar.glitch.me/movies/${id}`,
//         type: "GET",
//         success: function(data) {
//             // Display the data in the text boxes
//             $("#edit-title-box").val(data[1].title);
//             $("#edit-rating-box").val(data[1].rating);
//             $("#edit-genre-box").val(data[1].genre);
//         },
//         error: function(error) {
//             console.error("There was a problem with the request:", error);
//         }
//     });
// };
//
// // Function to update the data for an object in the API
// const updateData = id => {
//     const updatedTitle = $("#edit-title-box").val();
//     const updatedRating = $("#edit-rating-box").val();
//     const updatedGenre = $("#edit-genre-box").val();
//     const updatedSummary = $("#edit-summary-box").val();
//
//     $.ajax({
//         url: `https://light-quilted-boar.glitch.me/movies/${id}`,
//         type: "PUT",
//         contentType: "application/json",
//         data: JSON.stringify({
//             attribute1: updatedAttribute1,
//             attribute2: updatedAttribute2,
//             attribute3: updatedAttribute3
//         }),
//         success: function(data) {
//             console.log(data);
//             // Notify the user that the update was successful
//         },
//         error: function(error) {
//             console.error("There was a problem with the update:", error);
//         }
//     });
// };
//
// // Event listener for the save button
// $("#save-button").click(function() {
//     const id = $("#object-id").val();
//     updateData(id);
// });
//
// // Event listener for the load button
// $("#load-button").click(function() {
//     const id = $("#object-id").val();
//     getData(id);
// });
//
//
//
//
