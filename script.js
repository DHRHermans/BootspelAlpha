document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("raceCanvas");
    const ctx = canvas.getContext("2d");

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
    let raceFinished = false;

    // Functie om het speelveld te tekenen
    function drawField() {
        ctx.fillStyle = "#add8e6";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.fillStyle = "#000";
        ctx.fillRect(50, 0, 5, canvasHeight);
        ctx.fillRect(canvasWidth - 55, 0, 5, canvasHeight);

        drawBoats();
    }

    // Functie om boten te tekenen
    function drawBoats() {
        boats.forEach((boat, index) => {
            ctx.fillStyle = boat.color;
            ctx.fillRect(boat.x, boat.y, boat.width, boat.height);

            const centerX = boat.x + boat.width / 2;
            const centerY = boat.y + boat.height / 2;
            ctx.fillStyle = "#000";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(boat.number, centerX, centerY);

            // Voeg het aantal resterende stappen naast de boot toe
            const stepsElement = document.getElementById(`steps-${boat.number}`);
            if (stepsElement) {
                stepsElement.textContent = `Stappen over: ${clicksRemaining[index]}`;
            }
        });
    }

    // Functie om een boot te bewegen
    function moveBoat(boatIndex) {
        if (clicksRemaining[boatIndex] > 0 && !raceFinished) {
            boats[boatIndex].x += (canvasWidth - 100) / numClicks;
            clicksRemaining[boatIndex]--;
            updateStepCount(boatIndex);
            drawField();
            checkForWinner();
        }
    }

    // Functie om het aantal resterende stappen bij te werken
    function updateStepCount(boatIndex) {
        const stepsElement = document.getElementById(`steps-${boatIndex}`);
        stepsElement.textContent = `Stappen over: ${clicksRemaining[boatIndex]}`;
    }

    // Functie om de winnaar te controleren
    function checkForWinner() {
        for (let i = 0; i < boats.length; i++) {
            if (boats[i].x >= canvasWidth - 55 && !raceFinished) {
                raceFinished = true;
                winnerText.textContent = `Boot ${boats[i].number} heeft gewonnen!`;
                winnerMessage.style.display = "block";
            }
        }
    }

    // Start het spel met de instellingen
    function startGame() {
        numBoats = parseInt(document.getElementById("numBoats").value);
        numClicks = parseInt(document.getElementById("numClicks").value);

        if (isNaN(numBoats) || isNaN(numClicks) || numBoats < 1 || numBoats > 25 || numClicks < 1 || numClicks > 25) {
            alert("Vul geldige waarden in voor het aantal boten en klikken.");
            return;
        }

        // Verander de canvas grootte om het volledige scherm te gebruiken
        canvasHeight = window.innerHeight * 0.8;
        canvasWidth = window.innerWidth * 0.95;
        canvas.height = canvasHeight;
        canvas.width = canvasWidth;

        startScreen.style.display = "none";
        gameScreen.style.display = "block";

        boats = [];
        clicksRemaining = [];
        controlsDiv.innerHTML = "";
        raceFinished = false;

        for (let i = 0; i < numBoats; i++) {
            const boat = {
                x: 50,
                y: 50 + (i * 50),
                width: 40,
                height: 20,
                color: getRandomColor(),
                number: i + 1
            };
            boats.push(boat);
            clicksRemaining.push(numClicks);

            const btn = document.createElement("button");
            btn.textContent = boat.number;
            btn.addEventListener("click", () => moveBoat(i));

            // Voeg het aantal stappen toe naast de boot
            const stepsElement = document.createElement("div");
            stepsElement.id = `steps-${boat.number}`;
            stepsElement.classList.add("boat-info");
            stepsElement.textContent = `Stappen over: ${clicksRemaining[i]}`;

            const btnContainer = document.createElement("div");
            btnContainer.appendChild(btn);
            controlsDiv.appendChild(stepsElement);
            controlsDiv.appendChild(btnContainer);
        }

        drawField();
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

    document.getElementById("startGame").addEventListener("click", startGame);

    resetGameButton.addEventListener("click", function() {
        startScreen.style.display = "block";
        gameScreen.style.display = "none";
        winnerMessage.style.display = "none";
    });
});
