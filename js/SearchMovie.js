function searchMovie(){
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
}

searchMovie()