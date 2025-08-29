const correctCode = generateRandomCode();
let attempts = [];
let steps = [];
let solved = false;

document.getElementById("submit").addEventListener("click", attemptHack);
document.getElementById("reset").addEventListener("click", resetGame);
document.getElementById("show-key").addEventListener("click", showKey);
document.getElementById("solve-ai").addEventListener("click", solveWithAI);

function generateRandomCode() {
    let code = "";
    for (let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10).toString();
    }
    return code;
}

function attemptHack() {
    const guess = document.getElementById("guess").value;
    if (guess.length !== 4 || isNaN(guess)) {
        alert("Por favor ingresa un número de 4 dígitos.");
        return;
    }

    const result = checkGuess(guess);
    attempts.push(`Intento: ${guess} → ${result}`);
    steps.push(result);
    
    updateUI();
    if (result === "!!!!") {
        solved = true;
        document.getElementById("status").textContent = "¡Clave descubierta!";
    }
}

function checkGuess(guess) {
    let correctPos = 0;
    let wrongPos = 0;

    for (let i = 0; i < 4; i++) {
        if (guess[i] === correctCode[i]) {
            correctPos++;
        } else if (correctCode.includes(guess[i])) {
            wrongPos++;
        }
    }

    let result = "";
    result += "!".repeat(correctPos);
    result += "*".repeat(wrongPos);

    return result || "*";
}

function updateUI() {
    document.getElementById("attempts").innerHTML = attempts.join("<br>");
    document.getElementById("steps").innerHTML = steps.join("<br>");
}

function resetGame() {
    attempts = [];
    steps = [];
    solved = false;
    document.getElementById("guess").value = "";
    document.getElementById("status").textContent = "";
}

function showKey() {
    if (solved) {
        alert(`La clave es: ${correctCode}`);
    } else {
        alert("La clave aún no ha sido descubierta.");
    }
}

function solveWithAI() {
    let aiCode = generateAI();
    document.getElementById("guess").value = aiCode;
    attemptHack();
}

function generateAI() {
    return generateRandomCode();
}
