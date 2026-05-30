// --- 국민대학교 교내복지시설 공식 데이터 ---
const campusData = [
    { name: "복사실 (북악관)", location: "북악관 1층", desc: "북악관 1층에 위치하며 교재 인쇄, 제본, 복사 서비스를 제공합니다.", enName: "Copy Room (Bugak Hall)", enLocation: "Bugak Hall 1st Floor", enDesc: "Located on the 1st floor of Bugak Hall, providing printing, binding, and copying services." },
    { name: "우리은행", location: "종합복지관 2층", desc: "종합복지관 2층에 있는 교내 주거래 은행으로 다양한 금융 업무를 처리합니다.", enName: "Woori Bank", enLocation: "Welfare Complex 2nd Floor", enDesc: "The main campus bank located on the 2nd floor of the Welfare Complex, handling financial tasks." },
    { name: "우편취급국", location: "종합복지관 2층", desc: "종합복지관 2층에 위치하여 우편물 및 택배 발송이 가능합니다.", enName: "Post Office", enLocation: "Welfare Complex 2nd Floor", enDesc: "Located on the 2nd floor of the Welfare Complex, handling mail and package delivery." },
    { name: "서점", location: "종합복지관 1층", desc: "종합복지관 1층에 있으며 전공 서적과 교재를 구입할 수 있습니다.", enName: "Bookstore", enLocation: "Welfare Complex 1st Floor", enDesc: "Located on the 1st floor of the Welfare Complex, where textbooks can be purchased." },
    { name: "기념품점", location: "북악관 1층", desc: "북악관 1층에 있으며 국민대만의 다양한 굿즈와 기념품을 판매합니다.", enName: "Souvenir Shop", enLocation: "Bugak Hall 1st Floor", enDesc: "Located on the 1st floor of Bugak Hall, selling various Kookmin Univ. merchandise." },
    { name: "휴대전화 판매점", location: "종합복지관 1층 (서점 내부)", desc: "종합복지관 1층 구내서점 내부에 입점해 있는 통신 기기 매장입니다.", enName: "Mobile Phone Shop", enLocation: "Welfare Complex 1st Floor (Inside Bookstore)", enDesc: "A mobile device retail shop located inside the bookstore on the 1st floor of the Welfare Complex." },
    { name: "문구잡화점", location: "종합복지관 지하 1층", desc: "종합복지관 지하 1층에 있으며 각종 문구류와 사무용품을 판매합니다.", enName: "Stationery & Variety Shop", enLocation: "Welfare Complex B1", enDesc: "Located on the B1 floor of the Welfare Complex, selling office and school supplies." },
    { name: "화훼점", location: "종합복지관 지하 1층", desc: "종합복지관 지하 1층에 있는 꽃집으로 화분이나 꽃다발을 구매할 수 있습니다.", enName: "Flower Shop", enLocation: "Welfare Complex B1", enDesc: "A florist on the B1 floor of the Welfare Complex, where plants and bouquets can be bought." },
    { name: "생활잡화점", location: "종합복지관 지하 1층", desc: "종합복지관 지하 1층에서 일상생활에 필요한 다양한 잡화를 판매합니다.", enName: "Daily Necessities Shop", enLocation: "Welfare Complex B1", enDesc: "Selling various general store goods on the B1 floor of the Welfare Complex." },
    { name: "컴퓨터매장", location: "종합복지관 지하 1층", desc: "종합복지관 지하 1층에 위치하며 PC 주변기기 및 전자기기를 다룹니다.", enName: "Computer Shop", enLocation: "Welfare Complex B1", enDesc: "Located on the B1 floor of the Welfare Complex, handling PC components and devices." },
    { name: "화방", location: "조형관 1층", desc: "조형관 1층에 위치하여 미술 용품과 전문 설계 및 디자인 재료를 판매합니다.", enName: "Art Supply Shop", enLocation: "Chodyung Hall 1st Floor", enDesc: "Located on the 1st floor of Chodyung Hall, offering professional fine art and design tools." },
    { name: "손세차장", location: "미래관 주차장", desc: "미래관 주차장에 위치하고 있으며 사전 예약제로 운영되는 세차 시설입니다.", enName: "Hand Car Wash", enLocation: "Mirae Hall Parking Lot", enDesc: "Located in the parking area of Mirae Hall, operated by a reservation system." },
    { name: "여행사", location: "종합복지관 지하 1층 (서점 내부)", desc: "종합복지관 지하 1층 서점 내부에 입점해 있는 여행 상담 매장입니다.", enName: "Travel Agency", enLocation: "Welfare Complex B1 (Inside Bookstore)", enDesc: "A travel consulting office inside the B1 bookstore of the Welfare Complex." },
    { name: "무인 세탁실", location: "생활관", desc: "생활관(기숙사) 내부에 위치하며 24시간 무인 코인 세탁기로 운영됩니다.", enName: "Laundromat", enLocation: "Dormitory", enDesc: "A self-service coin-operated laundry facility located inside the student dormitory." }
];

// --- 게임 텍스트 다국어 번역 사전 ---
const translations = {
    ko: {
        "logo": "공강구조대", "nav-main": "메인", "nav-team": "팀 소개", "nav-game": "게임", "nav-form": "추천 폼",
        "intro-title": "캠퍼스 시설 학습 게임", "intro-desc": "게임을 통해 학교 시설 정보를 재미있게 익혀보세요!",
        "menu-place-title": "장소 맞히기", "menu-place-desc": "사진을 보고 교내 장소를 맞춰보세요.",
        "menu-ox-title": "OX 퀴즈", "menu-ox-desc": "학교 시설에 대한 OX 문제를 풀어보세요.",
        "dash-my-score": "내 최근 점수", "btn-next": "다음 문제", "live-score": "현재 점수",
        "result-title": "게임 종료!", "result-score-label": "최종 점수:", "btn-retry": "처음으로 돌아가기",
        "timer-label": "제한시간", "sec": "초", "q-text-place": "이 사진 속 시설의 정확한 이름은 무엇일까요?",
        "q-hint": "힌트 위치", "correct-msg": "정답입니다! 🎉", "wrong-msg": "틀렸습니다! ✕", "timeout-msg": "시간 초과! ⏰",
        "ox-true-mid": "은(는)", "ox-true-end": "에 위치해 있다.", "ox-ans-o": "맞습니다!", "ox-ans-x": "틀렸습니다!",
        "ox-explain-o": "의 정확한 위치는", "ox-explain-x": "의 실제 위치는", "ox-explain-end": "입니다.", "img-alt-text": "시설 사진 준비중"
    },
    en: {
        "logo": "ClassRescue", "nav-main": "Main", "nav-team": "Team", "nav-game": "Game", "nav-form": "Form",
        "intro-title": "Campus Facility Game", "intro-desc": "Learn about campus facilities easily through quizzes!",
        "menu-place-title": "Guess the Place", "menu-place-desc": "Look at the picture and guess the facility.",
        "menu-ox-title": "OX Quiz", "menu-ox-desc": "Solve true/false questions about facilities.",
        "dash-my-score": "My Recent Score", "btn-next": "Next Question", "live-score": "Current Score",
        "result-title": "Game Over!", "result-score-label": "Final Score:", "btn-retry": "Back to Start",
        "timer-label": "Time Limit", "sec": "s", "q-text-place": "What is the exact name of the facility in this picture?",
        "q-hint": "Hint Location", "correct-msg": "Correct! 🎉", "wrong-msg": "Wrong! ✕", "timeout-msg": "Time Out! ⏰",
        "ox-true-mid": "is located at", "ox-true-end": ".", "ox-ans-o": "Correct!", "ox-ans-x": "Wrong!",
        "ox-explain-o": "The exact location of", "ox-explain-x": "The actual location of", "ox-explain-end": ".", "img-alt-text": "Image preparing"
    }
};

// --- 게임 글로벌 제어 상태 변수 ---
let currentLang = "ko";
let currentGameType = ""; 
let currentQuizData = []; 
let currentQuizIndex = 0;
let userScore = 0;
let timerInterval;
let timeLeft = 10;

// --- 다국어 번역 시스템 ---
function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll("[data-lang]").forEach(element => {
        const key = element.getAttribute("data-lang");
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    // 게임 진행 도중 언어가 바뀔 때 실시간 유동 텍스트들 즉시 리렌더링
    if (!document.getElementById("game-screen").classList.contains("hidden")) {
        renderCurrentQuestionStrings();
    }
}

function showIntro() {
    document.getElementById("intro-screen").classList.remove("hidden");
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
    clearInterval(timerInterval);
}

// --- 게임 시작 핸들러 ---
function startGame(type) {
    currentGameType = type;
    currentQuizIndex = 0;
    userScore = 0;
    document.getElementById("live-score-val").textContent = userScore;
    
    // 중복 방지 check 기법을 사용하여 문제셋 생성
    currentQuizData = generateQuizSetWithCheck(type, 5);

    document.getElementById("intro-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");
    
    loadQuestion();
}

// --- [요구사항] check 배열 기법을 활용한 중복 방지 알고리즘 ---
function generateQuizSetWithCheck(type, count) {
    let quizSet = [];
    let check = new Array(campusData.length).fill(false); // 이미 뽑혔는지 체크하는 배열

    while (quizSet.length < count) {
        let randIdx = Math.floor(Math.random() * campusData.length);
        
        // 중복 방지 검증: 이미 체크된 인덱스라면 건너뜀
        if (check[randIdx]) continue; 
        
        check[randIdx] = true; // 해당 시설 체크 완료 표기
        let item = campusData[randIdx];

        if (type === 'place') {
            // 4지선다 보기 구성 (중복되지 않는 임의의 오답 3개 추가 추출)
            let wrongPool = campusData.filter((_, idx) => idx !== randIdx);
            let wrongOptions = wrongPool.sort(() => 0.5 - Math.random()).slice(0, 3);
            
            quizSet.push({
                originData: item,
                wrongItems: wrongOptions,
                shuffledOptions: [] // 로드할 때 언어별 매칭을 위해 비워둠
            });
        } else {
            // OX 문제용 (50% 확률 정답구조 형성)
            let isTrue = Math.random() > 0.5;
            let fakeItem = null;
            if (!isTrue) {
                // 현재 시설과 위치가 완벽히 다른 가짜 타겟 서칭
                let diffPool = campusData.filter(c => c.location !== item.location);
                fakeItem = diffPool[Math.floor(Math.random() * diffPool.length)];
            }
            quizSet.push({
                originData: item,
                isTrueType: isTrue,
                fakeData: fakeItem
            });
        }
    }
    return quizSet;
}

// --- 문제 로드 단계 ---
function loadQuestion() {
    clearInterval(timerInterval);
    timeLeft = 10;
    
    const label = translations[currentLang]["timer-label"];
    const sec = translations[currentLang]["sec"];
    document.getElementById("timer").textContent = `${label}: ${timeLeft}${sec}`;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `${label}: ${timeLeft}${sec}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            selectAnswer(null); 
        }
    }, 1000);

    document.getElementById("question-number").textContent = `Question ${currentQuizIndex + 1} / 5`;
    document.getElementById("feedback-area").classList.add("hidden");

    // UI 언어별 텍스트 출력기 실행
    renderCurrentQuestionStrings();
}

// --- [요구사항] 전체 게임 페이지 실시간 번역 렌더링 코어 로직 ---
function renderCurrentQuestionStrings() {
    let quiz = currentQuizData[currentQuizIndex];
    const imageArea = document.getElementById("image-area");
    const qTextElement = document.getElementById("question-text");
    const optionsArea = document.getElementById("options-area");

    const isKo = (currentLang === "ko");

    if (currentGameType === 'place') {
        imageArea.classList.remove("hidden");
        const altBase = translations[currentLang]["img-alt-text"];
        const nameStr = isKo ? quiz.originData.name : quiz.originData.enName;
        document.getElementById("place-img").setAttribute("alt", `[${altBase}] ${nameStr}`);
        document.getElementById("place-img").src = ""; 

        // 문제 텍스트 조립
        const mainQ = translations[currentLang]["q-text-place"];
        const hintLbl = translations[currentLang]["q-hint"];
        const locStr = isKo ? quiz.originData.location : quiz.originData.enLocation;
        qTextElement.textContent = `${mainQ} (${hintLbl}: ${locStr})`;

        // 보기 다국어 혼합 및 가로/세로 레이아웃 확립
        optionsArea.classList.remove("ox-layout");
        
        // 선지가 아직 빌드되지 않았다면 1회에 한해 셔플 구조 고정
        if (!quiz.shuffledOptions || quiz.shuffledOptions.length === 0) {
            let combined = [quiz.originData, ...quiz.wrongItems].sort(() => 0.5 - Math.random());
            quiz.shuffledOptions = combined;
        }

        optionsArea.innerHTML = "";
        quiz.shuffledOptions.forEach(opt => {
            const btn = document.createElement("button");
            btn.classList.add("option-btn");
            btn.textContent = isKo ? opt.name : opt.enName;
            btn.onclick = () => selectAnswer(opt.name); // 비교는 고유 key역할인 한국어 이름으로 수행
            optionsArea.appendChild(btn);
        });

    } else {
        // OX 퀴즈 렌더링 레이아웃 구성
        imageArea.classList.add("hidden");
        optionsArea.classList.add("ox-layout");

        const nameStr = isKo ? quiz.originData.name : quiz.originData.enName;
        const midStr = translations[currentLang]["ox-true-mid"];
        const endStr = translations[currentLang]["ox-true-end"];
        
        let targetLoc = "";
        if (quiz.isTrueType) {
            targetLoc = isKo ? quiz.originData.location : quiz.originData.enLocation;
        } else {
            targetLoc = isKo ? quiz.fakeData.location : quiz.fakeData.enLocation;
        }

        // 예: "우리은행"은(는) "종합복지관 2층"에 위치해 있다.
        qTextElement.textContent = `"${nameStr}" ${midStr} "${targetLoc}"${endStr}`;

        optionsArea.innerHTML = "";
        ["O", "X"].forEach(opt => {
            const btn = document.createElement("button");
            btn.classList.add("option-btn");
            btn.textContent = opt;
            btn.onclick = () => selectAnswer(opt);
            optionsArea.appendChild(btn);
        });
    }
}

// --- 정답 판정 및 다국어 피드백 표기 ---
function selectAnswer(selectedOpt) {
    clearInterval(timerInterval);
    let quiz = currentQuizData[currentQuizIndex];
    const isKo = (currentLang === "ko");

    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);

    const feedbackArea = document.getElementById("feedback-area");
    const feedbackResult = document.getElementById("feedback-result");
    const feedbackDesc = document.getElementById("feedback-desc");

    feedbackArea.classList.remove("hidden");

    let isCorrect = false;
    let answerKey = "";

    if (currentGameType === 'place') {
        answerKey = quiz.originData.name;
        if (selectedOpt === answerKey) isCorrect = true;
    } else {
        answerKey = quiz.isTrueType ? "O" : "X";
        if (selectedOpt === answerKey) isCorrect = true;
    }

    // 결과 멘트 세팅
    if (isCorrect) {
        userScore++;
        // [요구사항] 문제를 푸는 와중에 실시간으로 점수판 업데이트 반영
        document.getElementById("live-score-val").textContent = userScore; 
        feedbackResult.textContent = translations[currentLang]["correct-msg"];
        feedbackResult.className = "correct";
    } else if (selectedOpt === null) {
        feedbackResult.textContent = translations[currentLang]["timeout-msg"];
        feedbackResult.className = "wrong";
    } else {
        feedbackResult.textContent = translations[currentLang]["wrong-msg"];
        feedbackResult.className = "wrong";
    }

    // 해설 문구 다국어 동적 조립
    if (currentGameType === 'place') {
        const nameStr = isKo ? quiz.originData.name : quiz.originData.enName;
        const descStr = isKo ? quiz.originData.desc : quiz.originData.enDesc;
        feedbackDesc.textContent = `${nameStr} - ${descStr}`;
    } else {
        const headAns = quiz.isTrueType ? translations[currentLang]["ox-ans-o"] : translations[currentLang]["ox-ans-x"];
        const midLocExplain = quiz.isTrueType ? translations[currentLang]["ox-explain-o"] : translations[currentLang]["ox-explain-x"];
        const nameStr = isKo ? quiz.originData.name : quiz.originData.enName;
        const realLoc = isKo ? quiz.originData.location : quiz.originData.enLocation;
        const endStr = translations[currentLang]["ox-explain-end"];

        feedbackDesc.textContent = `${headAns} ${midLocExplain} "${nameStr}"은(는) ${realLoc}${endStr}`;
    }
}

function nextQuestion() {
    currentQuizIndex++;
    if (currentQuizIndex < 5) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");
    
    document.getElementById("final-score-val").textContent = userScore;
    document.getElementById("my-score").textContent = `${userScore} / 5`;
}

document.addEventListener("DOMContentLoaded", () => {
    changeLanguage('ko');
});