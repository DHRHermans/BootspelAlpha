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
    ctx.fillStyle = "#000";
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
        ctx.fillStyle = boat.color;
        ctx.fillRect(boat.x, boat.y, boat.width, boat.height);

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

// Functie om een boot te bewegen
function moveBoat(boatIndex) {
    boats[boatIndex].x += 10; // Beweeg de boot 10 pixels vooruit
    drawField(); // Teken het speelveld opnieuw om de beweging te laten zien
}

// Eventlisteners voor de knoppen
document.getElementById("moveBoat1").addEventListener("click", () => moveBoat(0));
document.getElementById("moveBoat2").addEventListener("click", () => moveBoat(1));
document.getElementById("moveBoat3").addEventListener("click", () => moveBoat(2));
document.getElementById("moveBoat4").addEventListener("click", () => moveBoat(3));

// Teken het speelveld bij het laden
drawField();
