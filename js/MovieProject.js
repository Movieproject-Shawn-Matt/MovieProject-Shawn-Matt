//Display the movies in their cards
function addNewCards() {
    $('#movie-cards').html('')
    $.get("https://funky-liberating-firewall.glitch.me/movies").done(function (data) {
        console.log(data);
        let index = 0;
        $(".weekly-forecast").html("");
        for (let i = 0; i < data.length; i++) {
            $("#movie-cards").append(
                '<div class="movie-cards">' +
                '<button type="button" data-id="' + data[i].id + '" class="delete-btn hidden btn btn-outline-danger rounded-circle ">' + 'X' + '</button>' +
                '<button type="button" data-id="' + data[i].id + '" class="edit-btn hidden btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">' + 'Edit Movie Post' + '</button>' +
                '<h5 id="title" class="card-title">' + JSON.stringify(data[i].title) + '</h5>' +
                '<div id="rating" class="card-body">' + 'Rating out of 5: ' + JSON.stringify(data[i].rating) + '</div>' +
                '<div id="rating" class="card-body">' + 'Genre: ' + JSON.stringify(data[i].genre) + '</div>' +
                '<div id="rating" class="card-body">' + 'Summary: ' + JSON.stringify(data[i].summary) + '</div>' +

                '</div>'
            )
            index += 8
        }
        $(".movie-cards").hover(
            function () {
                $(this).removeClass("hidden");
                $(this).children().first().show();
                $(this).children().first().next().show();
            },
            function () {
                $(this).children().first().hide();
                $(this).children().first().next().hide();
            }
        );
        const deleteButton = $(".delete-btn");

        deleteButton.click(function () {
            const id = $(this).attr('data-id');

            $.ajax({
                url: `https://funky-liberating-firewall.glitch.me/movies/${id}`,
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
                url: `https://funky-liberating-firewall.glitch.me/movies/${id}`,
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
                url: `https://funky-liberating-firewall.glitch.me/movies/${id}`,
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
        url: "https://funky-liberating-firewall.glitch.me/movies",
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


// Get a reference to the .mask element.
const mask = document.querySelector('.mask');

// Add an event to catch mouse movements.
document.addEventListener('pointermove', (pos) => {

    // Calculate mouse position in percentages.
    let x = parseInt(pos.clientX / window.innerWidth * 100);
    let y = parseInt(pos.clientY / window.innerHeight * 100);

    // Update the custom property values on the body.
    // mask.style.setProperty('--mouse-x', x + '%');
    // mask.style.setProperty('--mouse-y', y + '%');

});



$("#search-movie-box").keydown(function () {
    let searchValue = $("#search-movie-box").val().toLowerCase();
    $(".movie-cards").each(function () {
        let cardTitle = $(this).find(".card-title").text().toLowerCase();;
        if (cardTitle.indexOf(searchValue) !== -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});
const spotlightEl = document.querySelector("#spotlight");

function handleMouseMove(event) {
    const { clientX, clientY } = event;

    spotlightEl.style.background = `radial-gradient(circle at ${clientX}px ${clientY}px, #00000000 20em, #000000ee 350px)`;
}

document.addEventListener("mousemove", handleMouseMove)