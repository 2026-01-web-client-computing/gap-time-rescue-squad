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

// --- 게임 텍스트 다국어 번역 사전 ---
const translations = {
    ko: {
        "site_logo": "공강구조대", "nav_home": "홈", "nav_team": "팀원 소개", "nav_game": "게임", "nav_form": "공강 추천",
        "intro-title": "캠퍼스 시설 학습 게임", "intro-desc": "게임을 통해 학교 시설 정보를 재미있게 익혀보세요!",
        "menu-place-title": "장소 맞히기", "menu-place-desc": "사진을 보고 교내 장소를 맞춰보세요.",
        "menu-ox-title": "OX 퀴즈", "menu-ox-desc": "학교 시설에 대한 OX 문제를 풀어보세요.",
        "dash-my-score": "내 최근 점수", "btn-next": "다음 문제", "live-score": "현재 점수",
        "result-title": "게임 종료!", "result-score-label": "최종 점수:", "btn-retry": "처음으로 돌아가기",
        "timer-label": "제한시간", "sec": "초", "q-text-place": "이 사진 속 시설의 정확한 이름은 무엇일까요?",
        "q-hint": "힌트 위치", "correct-msg": "정답입니다! 🎉", "wrong-msg": "틀렸습니다! ✕", "timeout-msg": "시간 초과! ⏰",
        "ox-true-mid": "은(는)", "ox-true-end": "에 위치해 있다.", "ox-ans-o": "맞습니다!", "ox-ans-x": "틀렸습니다!",
        "ox-explain-o": "의 정확한 위치는", "ox-explain-x": "의 실제 위치는", "ox-explain-end": "입니다.", "img-alt-text": "시설 사진 준비중",
        "ox-explain-correct": "맞습니다! \"{name}\"의 정확한 위치는 {location}입니다.",
        "ox-explain-wrong": "틀렸습니다. \"{name}\"의 실제 위치는 {location}입니다."
    },
    en: {
        "site_logo": "Gap Time Rescue Squad", "nav_home": "Home", "nav_team": "Team", "nav_game": "Game", "nav_form": "Free-period Recommendation",
        "intro-title": "Campus Facility Game", "intro-desc": "Learn about campus facilities easily through quizzes!",
        "menu-place-title": "Guess the Place", "menu-place-desc": "Look at the picture and guess the facility.",
        "menu-ox-title": "OX Quiz", "menu-ox-desc": "Solve true/false questions about facilities.",
        "dash-my-score": "My Recent Score", "btn-next": "Next Question", "live-score": "Current Score",
        "result-title": "Game Over!", "result-score-label": "Final Score:", "btn-retry": "Back to Start",
        "timer-label": "Time Limit", "sec": "s", "q-text-place": "What is the exact name of the facility in this picture?",
        "q-hint": "Hint Location", "correct-msg": "Correct! 🎉", "wrong-msg": "Wrong! ✕", "timeout-msg": "Time Out! ⏰",
        "ox-true-mid": "is located at", "ox-true-end": ".", "ox-ans-o": "Correct!", "ox-ans-x": "Wrong!",
        "ox-explain-o": "The exact location of", "ox-explain-x": "The actual location of", "ox-explain-end": ".", "img-alt-text": "Image preparing",
        "ox-explain-correct": "Correct! The exact location of \"{name}\" is {location}.",
        "ox-explain-wrong": "Wrong. The actual location of \"{name}\" is {location}."
    },
    zh: {
        "site_logo": "空堂救援队", "nav_home": "首页", "nav_team": "团队介绍", "nav_game": "游戏", "nav_form": "空堂推荐",
        "intro-title": "校园设施学习游戏", "intro-desc": "通过游戏轻松掌握学校设施信息！",
        "menu-place-title": "猜猜地点", "menu-place-desc": "看图猜出校内设施名称。",
        "menu-ox-title": "判断题", "menu-ox-desc": "回答关于学校设施的判断题。",
        "dash-my-score": "我的最近得分", "btn-next": "下一题", "live-score": "当前得分",
        "result-title": "游戏结束！", "result-score-label": "最终得分：", "btn-retry": "返回开始",
        "timer-label": "限时", "sec": "秒", "q-text-place": "图中设施的正确名称是什么？",
        "q-hint": "提示位置", "correct-msg": "回答正确！🎉", "wrong-msg": "回答错误！✕", "timeout-msg": "时间到！⏰",
        "ox-true-mid": "位于", "ox-true-end": "。", "ox-ans-o": "正确！", "ox-ans-x": "错误！",
        "ox-explain-o": "的正确位置是", "ox-explain-x": "的实际位置是", "ox-explain-end": "。", "img-alt-text": "设施图片准备中",
        "ox-explain-correct": "正确！\"{name}\"的准确位置是{location}。",
        "ox-explain-wrong": "错误。\"{name}\"的实际位置是{location}。"
    },
    ja: {
        "site_logo": "空きコマ救助隊", "nav_home": "ホーム", "nav_team": "チーム紹介", "nav_game": "ゲーム", "nav_form": "空きコマ推薦",
        "intro-title": "キャンパス施設学習ゲーム", "intro-desc": "ゲームを通じて学校施設の情報を楽しく覚えましょう！",
        "menu-place-title": "場所当て", "menu-place-desc": "写真を見て施設名を当ててください。",
        "menu-ox-title": "○×クイズ", "menu-ox-desc": "学校施設に関する○×問題を解いてみましょう。",
        "dash-my-score": "直近のスコア", "btn-next": "次の問題", "live-score": "現在のスコア",
        "result-title": "ゲーム終了！", "result-score-label": "最終スコア：", "btn-retry": "最初に戻る",
        "timer-label": "制限時間", "sec": "秒", "q-text-place": "この写真の施設の正確な名前は何ですか？",
        "q-hint": "ヒント・場所", "correct-msg": "正解！🎉", "wrong-msg": "不正解！✕", "timeout-msg": "時間切れ！⏰",
        "ox-true-mid": "は", "ox-true-end": "にある。", "ox-ans-o": "正しい！", "ox-ans-x": "間違い！",
        "ox-explain-o": "の正確な場所は", "ox-explain-x": "の実際の場所は", "ox-explain-end": "です。", "img-alt-text": "施設写真準備中",
        "ox-explain-correct": "正解！\"{name}\"の正確な場所は{location}です。",
        "ox-explain-wrong": "不正解。\"{name}\"の実際の場所は{location}です。"
    },
    de: {
        "site_logo": "Freistunden-Rettungsteam", "nav_home": "Start", "nav_team": "Team", "nav_game": "Spiel", "nav_form": "Freistunden-Tipp",
        "intro-title": "Campus-Einrichtungen Lernspiel", "intro-desc": "Lerne Campuseinrichtungen spielerisch kennen!",
        "menu-place-title": "Ort erraten", "menu-place-desc": "Schau dir das Bild an und rate die Einrichtung.",
        "menu-ox-title": "Wahr/Falsch-Quiz", "menu-ox-desc": "Beantworte Wahr/Falsch-Fragen zu Campuseinrichtungen.",
        "dash-my-score": "Mein letzter Punktestand", "btn-next": "Nächste Frage", "live-score": "Aktueller Punktestand",
        "result-title": "Spiel beendet!", "result-score-label": "Endergebnis:", "btn-retry": "Zurück zum Start",
        "timer-label": "Zeitlimit", "sec": "s", "q-text-place": "Wie heißt die Einrichtung auf diesem Bild genau?",
        "q-hint": "Hinweis Ort", "correct-msg": "Richtig! 🎉", "wrong-msg": "Falsch! ✕", "timeout-msg": "Zeit abgelaufen! ⏰",
        "ox-true-mid": "befindet sich in", "ox-true-end": ".", "ox-ans-o": "Stimmt!", "ox-ans-x": "Falsch!",
        "ox-explain-o": "Der genaue Standort von", "ox-explain-x": "Der tatsächliche Standort von", "ox-explain-end": ".", "img-alt-text": "Bild wird vorbereitet",
        "ox-explain-correct": "Richtig! Der genaue Standort von \"{name}\" ist {location}.",
        "ox-explain-wrong": "Falsch. Der tatsächliche Standort von \"{name}\" ist {location}."
    },
    fr: {
        "site_logo": "Équipe Secours Temps Libre", "nav_home": "Accueil", "nav_team": "Équipe", "nav_game": "Jeu", "nav_form": "Recommandation",
        "intro-title": "Jeu d'apprentissage des installations", "intro-desc": "Apprenez les installations du campus en jouant !",
        "menu-place-title": "Devinez le lieu", "menu-place-desc": "Regardez la photo et devinez l'installation.",
        "menu-ox-title": "Quiz Vrai/Faux", "menu-ox-desc": "Répondez aux questions vrai/faux sur les installations.",
        "dash-my-score": "Mon dernier score", "btn-next": "Question suivante", "live-score": "Score actuel",
        "result-title": "Jeu terminé !", "result-score-label": "Score final :", "btn-retry": "Retour au début",
        "timer-label": "Temps limite", "sec": "s", "q-text-place": "Quel est le nom exact de l'installation sur cette photo ?",
        "q-hint": "Indice lieu", "correct-msg": "Correct ! 🎉", "wrong-msg": "Incorrect ! ✕", "timeout-msg": "Temps écoulé ! ⏰",
        "ox-true-mid": "est situé à", "ox-true-end": ".", "ox-ans-o": "Correct !", "ox-ans-x": "Incorrect !",
        "ox-explain-o": "L'emplacement exact de", "ox-explain-x": "L'emplacement réel de", "ox-explain-end": ".", "img-alt-text": "Image en préparation",
        "ox-explain-correct": "Correct ! L'emplacement exact de \"{name}\" est {location}.",
        "ox-explain-wrong": "Incorrect. L'emplacement réel de \"{name}\" est {location}."
    },
    ru: {
        "site_logo": "Спасатели окон", "nav_home": "Главная", "nav_team": "Команда", "nav_game": "Игра", "nav_form": "Рекомендации",
        "intro-title": "Игра по изучению кампуса", "intro-desc": "Узнайте об объектах кампуса в игровой форме!",
        "menu-place-title": "Угадай место", "menu-place-desc": "Посмотрите на фото и угадайте объект.",
        "menu-ox-title": "Викторина Да/Нет", "menu-ox-desc": "Ответьте на вопросы об объектах кампуса.",
        "dash-my-score": "Мой последний результат", "btn-next": "Следующий вопрос", "live-score": "Текущий счёт",
        "result-title": "Игра окончена!", "result-score-label": "Итоговый счёт:", "btn-retry": "Вернуться к началу",
        "timer-label": "Лимит времени", "sec": "с", "q-text-place": "Как точно называется объект на этом фото?",
        "q-hint": "Подсказка место", "correct-msg": "Правильно! 🎉", "wrong-msg": "Неправильно! ✕", "timeout-msg": "Время вышло! ⏰",
        "ox-true-mid": "находится в", "ox-true-end": ".", "ox-ans-o": "Верно!", "ox-ans-x": "Неверно!",
        "ox-explain-o": "Точное местонахождение", "ox-explain-x": "Фактическое местонахождение", "ox-explain-end": ".", "img-alt-text": "Изображение готовится",
        "ox-explain-correct": "Правильно! Точное местонахождение \"{name}\" — {location}.",
        "ox-explain-wrong": "Неправильно. Фактическое местонахождение \"{name}\" — {location}."
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
    currentLang = translations[lang] ? lang : "ko";
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });

    const selector = document.getElementById("lang-selector");
    if (selector) {
        selector.value = currentLang;
    }

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
        document.getElementById("place-img").src = `assets/images/game/${quiz.originData.src}`;; 

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
    clearInterval(timerInterval); // 1. 타이머 정지
    let quiz = currentQuizData[currentQuizIndex];
    const isKo = (currentLang === "ko");

    // 버튼 비활성화
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);

    const feedbackArea = document.getElementById("feedback-area");
    const feedbackResult = document.getElementById("feedback-result");
    const feedbackDesc = document.getElementById("feedback-desc");

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
        feedbackResult.textContent = translations[currentLang]["correct-msg"];
        feedbackResult.className = "correct";
    } else if (selectedOpt === null) {
        feedbackResult.textContent = translations[currentLang]["timeout-msg"];
        feedbackResult.className = "wrong";
    } else {
        feedbackResult.textContent = translations[currentLang]["wrong-msg"];
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
        const template = translations[currentLang][templateKey];
        
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

document.addEventListener("DOMContentLoaded", () => {
    const selector = document.getElementById("lang-selector");
    if (selector) {
        selector.addEventListener("change", (event) => {
            changeLanguage(event.target.value);
        });
    }

    changeLanguage(selector?.value || "ko");
});
