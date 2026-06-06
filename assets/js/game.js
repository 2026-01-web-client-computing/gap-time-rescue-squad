// --- 국민대학교 교내복지시설 공식 데이터 ---
const campusData = [
    { name: "도시락전문점(K-BOB+)", location: "종합복지관 1층", desc: "다양한 도시락과 간편 식사를 제공하는 식당입니다.", enName: "K-BOB+", enLocation: "Welfare Complex 1F", enDesc: "Restaurant offering lunch boxes and quick meals.", src: "kbob_welfare_complex_1f.jpg" },
    { name: "교직원식당", location: "종합복지관 1층", desc: "교직원과 학생 모두 이용 가능한 식당입니다.", enName: "Faculty Cafeteria", enLocation: "Welfare Complex 1F", enDesc: "Cafeteria open to students and faculty members.", src: "faculty_cafeteria_welfare_complex_1f.jpg" },
    { name: "김밥ㆍ분식전문점(K-GIMBOB)", location: "북악관 1층", desc: "김밥과 분식 메뉴를 판매하는 식당입니다.", enName: "K-GIMBOB+", enLocation: "Bugak Hall 1F", enDesc: "Restaurant specializing in gimbap and snacks.", src: "k_gimbob_bugak_hall_1f.jpg" },
    { name: "기념품점", location: "북악관 1층", desc: "교내 캐릭터 및 기념품 판매 매장입니다.", enName: "Souvenir Shop", enLocation: "Bugak Hall 1F", enDesc: "Store selling university souvenirs and merchandise.", src: "souvenir_shop_bugak_hall_1f.jpg" },
    { name: "꽃집", location: "종합복지관 지하 1층", desc: "꽃과 화분을 판매하는 매장입니다.", enName: "Flower Shop", enLocation: "Welfare Complex B1", enDesc: "Shop selling flowers and plants.", src: "flower_shop_welfare_complex_b1.jpg" },
    { name: "문구점", location: "종합복지관 지하 1층", desc: "학업 및 사무용품을 판매하는 매장입니다.", enName: "Stationery Shop", enLocation: "Welfare Complex B1", enDesc: "Shop for stationery and office supplies.", src: "stationery_shop_welfare_complex_b1.jpg" },
    { name: "버거운버거", location: "종합복지관 지하 1층", desc: "다양한 버거 메뉴를 판매하는 매장입니다.", enName: "Beogeoun Burger", enLocation: "Welfare Complex B1", enDesc: "Burger shop offering various menu items.", src: "beogeoun_burger_welfare_complex_b1.jpg" },
    { name: "샐러디", location: "종합복지관 지하 1층", desc: "샐러드와 랩(Wrap) 메뉴를 판매하는 매장입니다.", enName: "Salady", enLocation: "Welfare Complex B1", enDesc: "Store selling salads and wraps.", src: "salady_welfare_complex_b1.jpg" },
    { name: "성곡도서관", location: "성곡도서관", desc: "학술 자료 열람 및 학습 공간입니다.", enName: "Seonggok Library", enLocation: "Seonggok Library", enDesc: "Central university library for study and research.", src: "seonggok_library_library.jpg" },
    { name: "써브웨이", location: "북악관 1층", desc: "샌드위치와 샐러드를 주문 제작하는 매장입니다.", enName: "Subway", enLocation: "Bugak Hall 1F", enDesc: "Sandwich and salad store.", src: "subway_bugak_hall_1f.jpg" },
    { name: "열람실(복지관 3층)", location: "종합복지관 3층", desc: "종합복지관 내 자유 학습 공간입니다.", enName: "Reading Room", enLocation: "Welfare Complex 3F", enDesc: "Free study space in Welfare Complex.", src: "reading_room_welfare_complex_3f.jpg" },
    { name: "오지버거", location: "공학관 1층", desc: "버거 메뉴를 판매하는 매장입니다.", enName: "Aussie Burger", enLocation: "Engineering Hall 1F", enDesc: "Burger shop located in Engineering Hall.", src: "aussie_burger_eng_hall_1f.jpg" },
    { name: "웰니스센터", location: "미래관 지하 1층", desc: "체력 단련 및 측정을 위한 복합 공간입니다.", enName: "Wellness Center", enLocation: "Mirae Hall B1", enDesc: "Facility for fitness and health assessment.", src: "wellness_center_welfare_complex.jpg" },
    { name: "의무실(건강센터)", location: "종합복지관 4층", desc: "건강 상담 및 응급 처치를 지원하는 공간입니다.", enName: "Infirmary", enLocation: "Welfare Complex 4F", enDesc: "Facility for health counseling and first aid.", src: "infirmary_health_center.jpg" },
    { name: "제과점(플레이스앤)", location: "종합복지관 2층", desc: "다양한 빵과 음료를 판매하는 매장입니다.", enName: "Place N Bakery", enLocation: "Welfare Complex 2F", enDesc: "Bakery offering bread and drinks.", src: "place_n_bakery_welfare_complex_2f.jpg" },
    { name: "청향", location: "법학관 5층", desc: "교내 구성원 모두 이용 가능한 한식 및 양식 전문 식당입니다.", enName: "Cheonghyang", enLocation: "Law Hall 5F", enDesc: "Campus restaurant open to all, serving Korean and Western cuisine.", src: "cheonghyang_law_hall_5f.jpg" },
    { name: "카페(공차)_북악관1층", location: "북악관 1층", desc: "교내에 위치한 차 음료 전문 매장입니다.", enName: "Gong Cha", enLocation: "Bugak Hall 1F", enDesc: "Tea specialty store located on campus.", src: "gongcha_bugak_hall_1f.jpg" },
    { name: "카페_공학관1층", location: "공학관 1층", desc: "공학관 내 위치한 커피 및 음료 매장입니다.", enName: "Cafe (Engineering)", enLocation: "Engineering Hall 1F", enDesc: "Cafe located in Engineering Hall.", src: "cafe_eng_eng_hall_1f.jpg" },
    { name: "카페_과학관1층", location: "과학관 1층", desc: "과학관 내 위치한 커피 및 음료 매장입니다.", enName: "Cafe (Science)", enLocation: "Science Hall 1F", enDesc: "Cafe located in Science Hall.", src: "cafe_sci_sci_hall_1f.jpg" },
    { name: "카페_법대1층", location: "법학관 1층", desc: "법학관 내 위치한 커피 및 음료 매장입니다.", enName: "Cafe (Law)", enLocation: "Law Hall 1F", enDesc: "Cafe located in Law Hall.", src: "cafe_law_law_hall_1f.jpg" },
    { name: "카페_복지관지하1층", location: "종합복지관 지하 1층", desc: "종합복지관 내 위치한 커피 및 음료 매장입니다.", enName: "Cafe (Welfare)", enLocation: "Welfare Complex B1", enDesc: "Cafe located in Welfare Complex.", src: "cafe_welfare_welfare_complex_b1.jpg" },
    { name: "카페_본부관1층", location: "본부관 1층", desc: "본부관 내 위치한 커피 및 음료 매장입니다.", enName: "Cafe (Headquarters)", enLocation: "Headquarters 1F", enDesc: "Cafe located in Headquarters.", src: "cafe_hq_hq_1f.jpg" },
    { name: "카페_북악관1층", location: "북악관 1층", desc: "북악관 내 위치한 커피 및 음료 매장입니다.", enName: "Cafe (Bugak)", enLocation: "Bugak Hall 1F", enDesc: "Cafe located in Bugak Hall.", src: "cafe_bugak_bugak_hall_1f.jpg" },
    { name: "카페_예대1층", location: "예술관 1층", desc: "예술관 내 위치한 커피 및 음료 매장입니다.", enName: "Cafe (Arts)", enLocation: "Arts Hall 1F", enDesc: "Cafe located in Arts Hall.", src: "cafe_arts_arts_hall_1f.jpg" },
    { name: "학생식당", location: "종합복지관 1층", desc: "학생과 교직원 모두 이용 가능한 교내 대형 식당으로, 다양한 메뉴를 제공합니다.", enName: "Student Cafeteria", enLocation: "Welfare Complex 1F", enDesc: "Large campus cafeteria open to students and faculty, offering a variety of menus.", src: "student_cafeteria_welfare_complex_1f.jpg" },
    { name: "한울식당", location: "법학관 지하 1층", desc: "법학관 내 위치한 교내 식당입니다.", enName: "Hanul Cafeteria", enLocation: "Law Hall B1", enDesc: "Cafeteria located in Law Hall.", src: "hanul_cafeteria_law_hall_b1.jpg" },
    { name: "해동할리스", location: "성곡도서관 지하 1층", desc: "성곡도서관 내 위치한 휴식 및 학습 겸용 카페입니다.", enName: "Haedong Holly's", enLocation: "Seonggok Library B1", enDesc: "Cafe in Seonggok Library for resting and studying.", src: "haedong_hollys_library_b1.jpg" }
];

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
    currentLang = applyI18n(lang);

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
    const dict = getI18nDict(currentLang);
    
    const label = dict["timer-label"];
    const sec = dict.sec;
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
    const dict = getI18nDict(currentLang);

    if (currentGameType === 'place') {
        imageArea.classList.remove("hidden");
        const altBase = dict["img-alt-text"];
        const nameStr = isKo ? quiz.originData.name : quiz.originData.enName;
        document.getElementById("place-img").setAttribute("alt", `[${altBase}] ${nameStr}`);
        document.getElementById("place-img").src = `assets/images/game/${quiz.originData.src}`;; 

        // 문제 텍스트 조립
        const mainQ = dict["q-text-place"];
        const hintLbl = dict["q-hint"];
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
            btn.classList.add("btn", "option-btn");
            btn.textContent = isKo ? opt.name : opt.enName;
            btn.addEventListener("click", () => selectAnswer(opt.name)); // 비교는 고유 key역할인 한국어 이름으로 수행
            optionsArea.appendChild(btn);
        });

    } else {
        // OX 퀴즈 렌더링 레이아웃 구성
        imageArea.classList.add("hidden");
        optionsArea.classList.add("ox-layout");

        const nameStr = isKo ? quiz.originData.name : quiz.originData.enName;
        const midStr = dict["ox-true-mid"];
        const endStr = dict["ox-true-end"];
        
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
            btn.classList.add("btn", "option-btn");
            btn.textContent = opt;
            btn.addEventListener("click", () => selectAnswer(opt));
            optionsArea.appendChild(btn);
        });
    }
}

// --- 정답 판정 및 다국어 피드백 표기 ---
function selectAnswer(selectedOpt) {
    clearInterval(timerInterval); // 1. 타이머 정지
    let quiz = currentQuizData[currentQuizIndex];
    const isKo = (currentLang === "ko");

    // 버튼 비활성화
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);

    const feedbackArea = document.getElementById("feedback-area");
    const feedbackResult = document.getElementById("feedback-result");
    const feedbackDesc = document.getElementById("feedback-desc");
    const dict = getI18nDict(currentLang);

    feedbackArea.classList.remove("hidden");

    // 2. 정답 판정
    let isCorrect = false;
    if (currentGameType === 'place') {
        if (selectedOpt === quiz.originData.name) isCorrect = true;
    } else {
        const answerKey = quiz.isTrueType ? "O" : "X";
        if (selectedOpt === answerKey) isCorrect = true;
    }

    // 3. 점수 업데이트 및 결과 멘트 세팅
    if (isCorrect) {
        userScore++; // 점수 산출
        document.getElementById("live-score-val").textContent = userScore; // 실시간 업데이트
        feedbackResult.textContent = dict["correct-msg"];
        feedbackResult.className = "correct";
    } else if (selectedOpt === null) {
        feedbackResult.textContent = dict["timeout-msg"];
        feedbackResult.className = "wrong";
    } else {
        feedbackResult.textContent = dict["wrong-msg"];
        feedbackResult.className = "wrong";
    }

    // 4. 해설 문구 다국어 동적 조립 (템플릿 기반 자연스러운 문장)
    if (currentGameType === 'place') {
        const nameStr = isKo ? quiz.originData.name : quiz.originData.enName;
        const descStr = isKo ? quiz.originData.desc : quiz.originData.enDesc;
        feedbackDesc.textContent = `${nameStr} - ${descStr}`;
    } else {
        // OX 퀴즈는 템플릿을 사용하여 자연스러운 문장 생성
        const templateKey = isCorrect ? "ox-explain-correct" : "ox-explain-wrong";
        const template = dict[templateKey];
        
        const nameStr = isKo ? quiz.originData.name : quiz.originData.enName;
        const realLoc = isKo ? quiz.originData.location : quiz.originData.enLocation;

        // {name}과 {location}을 실제 값으로 교체
        feedbackDesc.textContent = template
            .replace("{name}", nameStr)
            .replace("{location}", realLoc);
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

document.addEventListener("i18n:change", (event) => {
    changeLanguage(event.detail.lang);
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-game-type]").forEach((button) => {
        button.addEventListener("click", () => startGame(button.dataset.gameType));
    });

    document.getElementById("next-btn")?.addEventListener("click", nextQuestion);
    document.getElementById("retry-btn")?.addEventListener("click", showIntro);

    changeLanguage(document.getElementById("lang-selector")?.value || "ko");
});
