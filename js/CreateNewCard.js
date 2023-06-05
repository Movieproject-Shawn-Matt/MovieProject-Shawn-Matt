function createNewCard(){
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
                loadCurrentCards()
                console.log(data);
                movieData = data;
            },
            error: function (error) {
                console.error(error);
            }
        });
    });
}

createNewCard()