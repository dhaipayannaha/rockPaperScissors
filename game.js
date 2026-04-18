let myScore = 0;
let computerScore = 0;
const maxScore = 10;

const choices = ['rock', 'paper', 'scissors'];

const resultImages = {
    rock: './images/rock.png',
    paper: './images/paper.png',
    scissors: './images/scissor.png',
    no: './images/no.png'
};

const playTurn = (userChoice) => {
    if (myScore >= maxScore || computerScore >= maxScore) return;

    // Generate computer choice
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    
    // Elements
    const myShow = document.getElementById("myShow");
    const computerShow = document.getElementById("computerShow");
    const myPress = document.getElementById("myPress");
    const computerPress = document.getElementById("computerPress");
    const outcomeMessage = document.getElementById("outcomeMessage");
    const youArea = document.querySelector("#you .icon-circle");
    const pcArea = document.querySelector("#pc .icon-circle");

    // Reset classes
    youArea.className = "icon-circle shake";
    pcArea.className = "icon-circle shake";
    outcomeMessage.className = "outcome-message hidden";
    
    // Set to 'no' temporarily for animation
    myShow.src = resultImages.no;
    computerShow.src = resultImages.no;
    myPress.innerText = "Ready...";
    computerPress.innerText = "Ready...";
    
    // Disable buttons temporarily
    document.querySelectorAll('.control-btn').forEach(btn => btn.style.pointerEvents = 'none');

    // Wait for shake animation
    setTimeout(() => {
        // Update images and text
        myShow.src = resultImages[userChoice];
        computerShow.src = resultImages[computerChoice];
        myPress.innerText = userChoice;
        computerPress.innerText = computerChoice;

        // Remove shake
        youArea.classList.remove("shake");
        pcArea.classList.remove("shake");

        // Determine outcome
        if (userChoice === computerChoice) {
            handleOutcome('tie', youArea, pcArea, outcomeMessage);
        } else if (
            (userChoice === "rock" && computerChoice === "scissors") ||
            (userChoice === "paper" && computerChoice === "rock") ||
            (userChoice === "scissors" && computerChoice === "paper")
        ) {
            myScore++;
            document.getElementById("myScore").innerText = myScore;
            handleOutcome('win', youArea, pcArea, outcomeMessage);
        } else {
            computerScore++;
            document.getElementById("computerScore").innerText = computerScore;
            handleOutcome('lose', youArea, pcArea, outcomeMessage);
        }

        // Re-enable buttons
        document.querySelectorAll('.control-btn').forEach(btn => btn.style.pointerEvents = 'auto');

        // Check for game over
        if (myScore >= maxScore || computerScore >= maxScore) {
            setTimeout(endGame, 800); 
        }
    }, 500);
}

const handleOutcome = (result, youArea, pcArea, outcomeMsg) => {
    outcomeMsg.classList.remove("hidden", "win", "lose", "tie");
    
    if (result === 'tie') {
        youArea.classList.add("tie");
        pcArea.classList.add("tie");
        outcomeMsg.innerText = "It's a Tie!";
        outcomeMsg.classList.add("tie");
    } else if (result === 'win') {
        youArea.classList.add("win");
        pcArea.classList.add("lose");
        outcomeMsg.innerText = "You Win!";
        outcomeMsg.classList.add("win");
    } else {
        youArea.classList.add("lose");
        pcArea.classList.add("win");
        outcomeMsg.innerText = "PC Wins!";
        outcomeMsg.classList.add("lose");
    }
}

const endGame = () => {
    document.getElementById("playField").classList.add("hidden");
    document.getElementById("scoreBoard").classList.remove("hidden");
    
    document.getElementById("lastScore").innerText = myScore;
    document.getElementById("lastComputerScore").innerText = computerScore;
    
    const resultImg = document.getElementById("resultImg");
    if (myScore > computerScore) {
        resultImg.src = "./images/win.png";
    } else {
        resultImg.src = "./images/loser.png";
    }
}

// Attach event listeners to reset buttons
document.querySelectorAll(".reset").forEach(button => {
    button.addEventListener("click", () => location.reload());
});