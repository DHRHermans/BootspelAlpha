// Variabelen om het aantal boten en kliks in te stellen
let numBoats = 2;
let numClicks = 10;
let boats = [];
let canvas, ctx;
let boatWidth = 50; // Breedte van de boten
let boatHeight = 30; // Hoogte van de boten

// Start en finishlijnen
let startLine = 0;
let finishLine = 0;

// Initialiseer de canvas en de knoppen
function init() {
    canvas = document.getElementById('raceCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Zorg ervoor dat de knoppen weergeven worden
    let controls = document.getElementById('controls');
    controls.innerHTML = '';
    boats.forEach((boat, index) => {
        // Maak de knoppen voor het vooruitbewegen van de boten
        let button = document.createElement('button');
        button.textContent = (index + 1).toString();
        button.addEventListener('click', () => moveBoat(index));
        controls.appendChild(button);
    });

    // Start en finish lijnen van onder naar boven
    startLine = canvas.height - 50; // Startlijn is 50px van de onderkant
    finishLine = 50; // Finishlijn is 50px van de bovenkant
}

// Update de posities van de boten en teken alles
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Maak het canvas leeg

    // Teken de start- en finishlijn
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, startLine);
    ctx.lineTo(canvas.width, startLine);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, finishLine);
    ctx.lineTo(canvas.width, finishLine);
    ctx.stroke();

    // Teken elke boot
    boats.forEach(boat => {
        ctx.drawImage(boat.image, boat.x, boat.y, boatWidth, boatHeight);
    });

    // Controleer of er een winnaar is
    let winner = boats.find(boat => boat.y <= finishLine);
    if (winner) {
        showWinner(winner);
    }
}

// Beweeg de boot vooruit
function moveBoat(index) {
    if (boats[index].y > finishLine) {
        boats[index].y -= boats[index].steps[index]; // Boot beweegt naar boven
        updateGame(); // Update het canvas
    }
}

// Toon de winnaar
function showWinner(winner) {
    const winnerMessage = document.getElementById('winnerMessage');
    const winnerText = document.getElementById('winnerText');
    winnerText.textContent = `Boot ${boats.indexOf(winner) + 1} heeft gewonnen!`;
    winnerMessage.style.display = 'flex';
}

// Reset het spel
document.getElementById('resetGame').addEventListener('click', () => {
    winnerMessage.style.display = 'none'; // Verberg het winnaars scherm
    startScreen.style.display = 'block'; // Toon het startscherm
    gameScreen.style.display = 'none'; // Verberg het spel scherm
});

// Start het spel
document.getElementById('startGame').addEventListener('click', () => {
    numBoats = parseInt(document.getElementById('numBoats').value);
    numClicks = parseInt(document.getElementById('numClicks').value);
    boats = [];
    for (let i = 0; i < numBoats; i++) {
        boats.push({
            x: (canvas.width / (numBoats + 1)) * (i + 1), // Verspreid de boten horizontaal
            y: canvas.height - 100, // Alle boten beginnen onderaan (dicht bij de onderkant van het scherm)
            steps: Array(numClicks).fill(1), // Aantal stappen per boot
            image: new Image()
        });
        boats[i].image.src = `boat${i + 1}.png`; // Vervang dit met de werkelijke bootafbeeldingen
    }
    startScreen.style.display = 'none'; // Verberg het startscherm
    gameScreen.style.display = 'block'; // Toon het spel scherm
    updateGame(); // Start de updatecyclus
});
