// Zoek het canvas-element en de context op
const canvas = document.getElementById("raceCanvas");
const ctx = canvas.getContext("2d");

// Deel van de interface voor de start en het spel
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const controlsDiv = document.getElementById("controls");
const winnerMessage = document.getElementById("winnerMessage");
const winnerText = document.getElementById("winnerText");
const resetGameButton = document.getElementById("resetGame");

let boats = [];
let numClicks = 0;
let numBoats = 0;
let clicksRemaining = [];
let canvasHeight = 0;
let canvasWidth = 0;
let raceFinished = false;  // Vlag die bijhoudt of de race is afgelopen

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
    if (clicksRemaining[boatIndex] > 0 && !raceFinished) {
        boats[boatIndex].x += (canvasWidth - 100) / numClicks;
        clicksRemaining[boatIndex]--;
        updateStepCount(boatIndex); // Update het aantal stappen voor deze boot
        drawField(); // Teken het speelveld opnieuw om de beweging te laten zien
        checkForWinner(); // Controleer of er een winnaar is
    }
}

// Functie om het aantal resterende stappen bij te werken
function updateStepCount(boatIndex) {
    const stepsElement = document.getElementById(`steps-${boatIndex}`);
    stepsElement.textContent = `Stappen over: ${clicksRemaining[boatIndex]}`;
}

// Functie om de winnaar te controleren
function checkForWinner() {
    // Kijk of er een boot voorbij de finishlijn is
    for (let i = 0; i < boats.length; i++) {
        if (boats[i].x >= canvasWidth - 55 && !raceFinished) {
            raceFinished = true; // Markeer de race als beëindigd
            winnerText.textContent = `Boot ${boats[i].number} heeft gewonnen!`; // Toon de winnaar
            winnerMessage.style.display = "block"; // Toon de winnaar melding
        }
    }
}

// Start het spel met de instellingen
function startGame() {
    // Verkrijg de waarden van de invoervelden
    numBoats = parseInt(document.getElementById("numBoats").value);
    numClicks = parseInt(document.getElementById("numClicks").value);

    // Controleer of de waarden geldig zijn
    if (isNaN(numBoats) || isNaN(numClicks) || numBoats < 1 || numBoats > 25 || numClicks < 1 || numClicks > 25) {
        alert("Vul geldige waarden in voor het aantal boten en klikken.");
        return;
    }

    // Dynamisch de canvasgrootte instellen
    canvasHeight = numBoats * 50 + 50; // Zorg ervoor dat de boten niet overlappen
    canvasWidth = 800; // Breedte blijft gelijk
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;

    // Verberg het startscherm en toon het speelscherm
    startScreen.style.display = "none";
    gameScreen.style.display = "block";

    // Reset de boten en hun instellingen
    boats = [];
    clicksRemaining = [];
    controlsDiv.innerHTML = ""; // Maak de knoppen leeg
    raceFinished = false; // Reset de vlag voor het einde van de race

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
        const btnContainer = document.createElement("div");
        
        const btn = document.createElement("button");
        btn.textContent = `Beweeg Boot ${i + 1}`; // Nummer van de boot
        btn.addEventListener("click", () => moveBoat(i));
        
        const stepsDisplay = document.createElement("span");
        stepsDisplay.id = `steps-${i}`;
        stepsDisplay.textContent = `Stappen over: ${clicksRemaining[i]}`;

        btnContainer.appendChild(btn);
        btnContainer.appendChild(stepsDisplay);
        controlsDiv.appendChild(btnContainer);
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

// Eventlistener voor de resetknop
resetGameButton.addEventListener("click", function() {
    startScreen.style.display = "block";
    gameScreen.style.display = "none";
    winnerMessage.style.display = "none"; // Verberg de winnaar melding
});
