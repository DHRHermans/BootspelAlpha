// Zoek het canvas-element en de context op
const canvas = document.getElementById("raceCanvas");
const ctx = canvas.getContext("2d");

// Canvasbreedte en -hoogte
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Deel van de interface voor de start en het spel
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const controlsDiv = document.getElementById("controls");

let boats = [];
let numClicks = 0;
let numBoats = 0;
let clicksRemaining = [];

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
    boats.forEach((boat, index) => {
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
    if (clicksRemaining[boatIndex] > 0) {
        boats[boatIndex].x += (canvasWidth - 100) / numClicks;
        clicksRemaining[boatIndex]--;
        drawField(); // Teken het speelveld opnieuw om de beweging te laten zien
    }
}

// Start het spel met de instellingen
function startGame() {
    numBoats = parseInt(document.getElementById("numBoats").value);
    numClicks = parseInt(document.getElementById("numClicks").value);

    // Verberg het startscherm en toon het speelscherm
    startScreen.style.display = "none";
    gameScreen.style.display = "block";

    // Reset de boten en hun instellingen
    boats = [];
    clicksRemaining = [];
    controlsDiv.innerHTML = ""; // Maak de knoppen leeg

    // Maak de boten
    for (let i = 0; i < numBoats; i++) {
        const boat = {
            x: 50,
            y: 50 + (i * 50), // Zorg ervoor dat de boten niet overlappen
            width: 40,
            height: 20,
            color: getRandomColor(),
            number: i + 1
        };
        boats.push(boat);
        clicksRemaining.push(numClicks); // Zet het aantal klikken per boot

        // Maak knoppen voor elke boot
        const btn = document.createElement("button");
        btn.textContent = i + 1; // Nummer van de boot
        btn.addEventListener("click", () => moveBoat(i));
        controlsDiv.appendChild(btn);
    }

    drawField(); // Teken het speelveld bij het starten
}

// Genereer een willekeurige kleur voor elke boot
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Eventlistener voor de startknop
document.getElementById("startGame").addEventListener("click", startGame);
