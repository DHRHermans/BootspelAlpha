
// Zoek het canvas-element en de context op
const canvas = document.getElementById("raceCanvas");
const ctx = canvas.getContext("2d");

// Canvasbreedte en -hoogte
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Functie om het speelveld te tekenen
function drawField() {
    // Lichtblauwe achtergrond
    ctx.fillStyle = "#add8e6";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Startlijn
    ctx.fillStyle = "#000"; // Zwarte kleur
    ctx.fillRect(50, 0, 5, canvasHeight);

    // Finishlijn
    ctx.fillRect(canvasWidth - 55, 0, 5, canvasHeight);
}

// Teken het speelveld bij het laden
drawField();
