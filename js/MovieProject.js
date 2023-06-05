//handles loading screen
document.documentElement.addEventListener("load", function () {
    document.getElementById("loading").style.display = "block";
});

window.addEventListener("load", function () {
    document.getElementById("loading").style.display = "none";
});



//handles Spotlight effect
const spotlightEl = document.querySelector("#spotlight");

function handleMouseMove(event) {
    const { clientX, clientY } = event;

    spotlightEl.style.background = `radial-gradient(circle at ${clientX}px ${clientY}px, #00000000 20em, #000000ee 350px)`;
}

document.addEventListener("mousemove", handleMouseMove)
