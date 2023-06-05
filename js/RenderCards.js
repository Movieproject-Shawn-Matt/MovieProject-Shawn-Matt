function loadCurrentCards() {
    $('#movie-cards').html('')
    $.get("https://funky-liberating-firewall.glitch.me/movies").done(function (data) {
        renderCard(data)
    })
}




function renderCard(data) {
    let index = 0;
    $("").html("");
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
    renderDeleteButton()
    renderEditButton()
    modalFunctionality()
}






function renderDeleteButton(){
    const deleteButton = $(".delete-btn");

    deleteButton.click(function () {
        const id = $(this).attr('data-id');

        $.ajax({
            url: `https://funky-liberating-firewall.glitch.me/movies/${id}`,
            type: "DELETE",
            success: function (data) {
                console.log(data);
                loadCurrentCards()
            },
            error: function (error) {
                console.error("There was a problem with the delete operation:", error);
            }
        });
    });
}

function renderEditButton(){
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
}

function modalFunctionality(){
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
                loadCurrentCards()
                console.log(data);

            },
            error: function (error) {
                console.error("There was a problem with the update:", error);
            }
        });
    });
}

loadCurrentCards()