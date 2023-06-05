function loadCurrentCards() {
    $('#movie-cards').html('')
    $.get("https://funky-liberating-firewall.glitch.me/movies").done(function (data) {
        renderCard(data)
    })
}

loadCurrentCards()


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
