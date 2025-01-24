// Zoek het canvas-element en de context op
const canvas = document.getElementById("raceCanvas");
const ctx = canvas.getContext("2d");

// Canvasbreedte en -hoogte
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Bootgegevens
const boats = [
    { x: 20, y: 50, width: 40, height: 20, color: "#ff0000", number: 1 }, // Rode boot
    { x: 20, y: 120, width: 40, height: 20, color: "#00ff00", number: 2 }, // Groene boot
    { x: 20, y: 190, width: 40, height: 20, color: "#0000ff", number: 3 }, // Blauwe boot
    { x: 20, y: 260, width: 40, height: 20, color: "#ffff00", number: 4 }, // Gele boot
];

// Functie om het speelveld te tekenen
function drawField() {
    // Lichtblauwe achtergrond
    ctx.fillStyle = "#add8e6";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Startlijn
    ctx.fillStyle = "#000"; // Zwart
    ctx.fillRect(50, 0, 5, canvasHeight);

    // Finishlijn
    ctx.fillRect(canvasWidth - 55, 0, 5, canvasHeight);

    // Boten tekenen
    drawBoats();
}

// Functie om boten te tekenen
function drawBoats() {
    boats.forEach((boat) => {
        // Teken de boot
        ctx.fillStyle = boat.color; // Stel de kleur in
        ctx.fillRect(boat.x, boat.y, boat.width, boat.height); // Rechthoek voor de boot

        // Teken het nummer op de boot
        ctx.fillStyle = "#000"; // Zwart voor tekst
        ctx.font = "16px Arial"; // Tekengrootte en stijl
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const centerX = boat.x + boat.width / 2; // Horizontaal midden
        const centerY = boat.y + boat.height / 2; // Verticaal midden
        ctx.fillText(boat.number, centerX, centerY); // Teken het nummer
    });
}

// Teken het speelveld
drawField();
