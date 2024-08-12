let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let tosscontainer = document.querySelector(".toss-container");
const tossBtn = document.getElementById("toss-btn");
const tossResult = document.getElementById("toss-result");
let count = 0; 
tosscontainer.classList.remove("hide");

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  tosscontainer.classList.remove("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    
    if (currentPlayer=="O") {
      tosscontainer.classList.add("hide"); 
      box.innerText = "O";
      currentPlayer = "X";
    } else if(currentPlayer=="X") {
      tosscontainer.classList.add("hide"); 
      box.innerText = "X";
      currentPlayer = "O";
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});
newGameBtn.addEventListener("click", ()=>{
  location.reload();
});
resetBtn.addEventListener("click", ()=>{
  location.reload();
});
tossBtn.addEventListener("click", handleToss);
const gameDraw = () => {
  msg.innerText = "Game was a Draw.";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText =` Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

function handleToss() {
  currentPlayer=null;
  currentPlayer = Math.random() < 0.5 ? "X" : "O";
  tossResult.textContent = `Player ${currentPlayer} starts`;
  tossBtn.disabled = true;
  resetBtn.disabled = false;
  gameActive = true;
  enableBoxes();

}

