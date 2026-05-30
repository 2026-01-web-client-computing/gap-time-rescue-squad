const mainScreen = document.getElementById("mainScreen");
const placeScreen = document.getElementById("placeScreen");
const oxScreen = document.getElementById("oxScreen");

// 메인 -> 게임 이동
document.getElementById("placeGame").onclick = () => {
    mainScreen.style.display = "none";
    placeScreen.style.display = "flex";
};

document.getElementById("oxGame").onclick = () => {
    mainScreen.style.display = "none";
    oxScreen.style.display = "flex";
};

// ======================
// 장소 맞히기
// ======================

const placeQuiz = [
    { image: "images/image1.jpg", answer: "답1" },
    { image: "images/image2.jpg", answer: "답2" },
    { image: "images/image3.jpg", answer: "답3" },
    { image: "images/image4.jpg", answer: "답4" },
    { image: "images/image5.jpg", answer: "답5" },
    { image: "images/image6.jpg", answer: "답6" },
    { image: "images/image7.jpg", answer: "답7" },
    { image: "images/image8.jpg", answer: "답8" },
    { image: "images/image9.jpg", answer: "답9" },
    { image: "images/image10.jpg", answer: "답10" }
];

let placeIndex = 0;
let placeScore = 0;

document.getElementById("submitAnswer").onclick = () => {

    const user = document.getElementById("placeAnswer").value.trim();

    if (user === placeQuiz[placeIndex].answer) {
        placeScore++;
        document.getElementById("placeResult").innerText = "정답!";
    } else {
        document.getElementById("placeResult").innerText =
            `오답! 정답 : ${placeQuiz[placeIndex].answer}`;
    }

    document.querySelector(".answer-box").style.display = "none";

    document.getElementById("nextPlace").style.display = "block";

    document.getElementById("submitAnswer").disabled = true;
};

document.getElementById("nextPlace").onclick = () => {

    placeIndex++;

    if (placeIndex >= placeQuiz.length) {

        placeScreen.innerHTML = `
            <h1>🎉 게임 종료 🎉</h1>
            <h2>${placeQuiz.length}문제 중 ${placeScore}문제 정답!</h2>
            <button class="return-btn" onclick="location.reload()">
                메인으로 돌아가기
            </button>
        `;


        return;
    }

    document.getElementById("placeImage").src =
        placeQuiz[placeIndex].image;

    document.getElementById("placeAnswer").value = "";

    document.getElementById("placeResult").innerText = "";

    document.querySelector(".answer-box").style.display = "flex";

    document.getElementById("nextPlace").style.display = "none";
    
    document.getElementById("submitAnswer").disabled = false;
};

// ======================
// OX 퀴즈
// ======================

const oxQuiz = [
    { question: "문제1", answer: "O" },
    { question: "문제2", answer: "X" },
    { question: "문제3", answer: "O" },
    { question: "문제4", answer: "X" },
    { question: "문제5", answer: "O" },
    { question: "문제6", answer: "X" },
    { question: "문제7", answer: "O" },
    { question: "문제8", answer: "X" },
    { question: "문제9", answer: "O" },
    { question: "문제10", answer: "X" }
];

let oxIndex = 0;
let oxScore = 0;

function checkOX(answer) {

    if (answer === oxQuiz[oxIndex].answer) {

        oxScore++;

        document.getElementById("oxResult").innerText =
            "정답!";

    } else {

        document.getElementById("oxResult").innerText =
            `오답! 정답 : ${oxQuiz[oxIndex].answer}`;
    }

    document.getElementById("oBtn").disabled = true;
    document.getElementById("xBtn").disabled = true;

    document.getElementById("nextOx").style.display =
        "block";
}

document.getElementById("oBtn").onclick =
    () => checkOX("O");

document.getElementById("xBtn").onclick =
    () => checkOX("X");

document.getElementById("nextOx").onclick = () => {

    oxIndex++;

    if (oxIndex >= oxQuiz.length) {

        oxScreen.innerHTML = `
            <h1>🎉 게임 종료 🎉</h1>
            <h2>${oxQuiz.length}문제 중 ${oxScore}문제 정답!</h2>
            <button class="return-btn" onclick="location.reload()">
                메인으로 돌아가기
            </button>
        `;

        return;
    }

    document.getElementById("questionBox").innerText =
        oxQuiz[oxIndex].question;

    document.getElementById("oxResult").innerText = "";

    document.getElementById("oBtn").disabled = false;
    document.getElementById("xBtn").disabled = false;

    document.getElementById("nextOx").style.display =
        "none";
};