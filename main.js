const correct = "APPLE";
let answer = "";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const nextLine = () => {
    index = 0;
    attempts++;
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameOver();
    clearInterval(timer);
  };

  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; background-color: white; position:absolute; top: 40vh; left:45vw; width: 200px; height:100px;";
    document.body.appendChild(div);
  };

  const handleEnter = () => {
    for (let i = 0; i < 5; i++) {
      let testBlock = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      if (correct[i] === testBlock.innerText) {
        testBlock.style.backgroundColor = "#67b363";
        testBlock.style.color = "white";
      } else if (correct.includes(testBlock.innerText)) {
        testBlock.style.backgroundColor = "#D4C060";
        testBlock.style.color = "white";
      } else {
        testBlock.style.backgroundColor = "#777E7F";
        testBlock.style.color = "white";
      }
      answer += testBlock.innerText;
    }
    if (answer === correct) {
      alert("정답입니다!!");
      gameOver();
      return;
    } else if (attempts > 4) {
      alert("게임오버!!");
      gameOver();
      return;
    }
    answer = "";
  };

  const handleBackspace = () => {
    document.querySelector(
      `.board-block[data-index='${attempts}${--index}']`
    ).innerText = "";
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (index === 5 && key === "Enter") {
      handleEnter();
      nextLine();
      return;
    } else if (index > 0 && key === "Backspace") {
      handleBackspace();
    } else if (index === 5) {
      return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key.toUpperCase();
      index++;
    }
  };

  const startTimer = () => {
    const timeElement = document.querySelector(".timer");
    const startTime = new Date();

    function setTime() {
      const currentTime = new Date();
      const timer = new Date(currentTime - startTime);
      const minute = timer.getMinutes().toString().padStart(2, "0");
      const seconds = timer.getSeconds().toString().padStart(2, "0");
      timeElement.innerText = `timer: ${minute}:${seconds}`;
    }
    // 주기성
    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
