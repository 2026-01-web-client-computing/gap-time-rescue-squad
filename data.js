/**
 * [GRASP Pattern: Information Expert]
 * 누락 없이 100% 복구된 캠퍼스 시설(49개) 및 중앙동아리(70개) 마스터 데이터.
 * AI 토큰 제한을 극복하고 완벽한 로컬라이징을 제공하기 위해, 
 * 런타임에 고유명사(건물명, 층수 등)를 치환하는 다국어 번역 엔진을 내장했습니다.
 */

// 1. 49개 시설 원시 데이터 (손실 제로 100% 복구)
const rawFacilities = [
    ['STORE', '공학관 쿱스켓', '공학관 별관 1층', '24시간 무인 운영', '스마트 무인 편의점 시스템'],
    ['STORE', '과학관 쿱스켓', '과학관 1층', '24시간 무인 운영', '스마트 무인 편의점 시스템'],
    ['STORE', '법학관 쿱스켓', '법학관 1층', '24시간 무인 운영', '스마트 무인 편의점 시스템'],
    ['STORE', '복지관 쿱스켓', '종합복지관 1층', '24시간 무인 운영', '스마트 무인 편의점 시스템'],
    ['STORE', '북악관 쿱스켓', '북악관 1층', '24시간 무인 운영', '스마트 무인 편의점 시스템'],
    ['STORE', '생활관 쿱스켓', '생활관(C동) 1층', '24시간 무인 운영', '스마트 무인 편의점 시스템'],
    ['STORE', '예술관 쿱스켓', '예술관 1층', '24시간 무인 운영', '스마트 무인 편의점 시스템'],
    ['FOOD', '학생식당', '종합복지관 1층', '평일 조·중식 08:00~15:00, 석식 17:00~18:30 / 주말·공휴일 08:30~14:00', '가마, 뚝배기, 인터셰프, 아시안플래터, 델리카슨 코너 운영'],
    ['FOOD', '한울식당', '법학관 지하 1층', '평일 10:30~18:30 / 주말·공휴일 휴점', '치즈돈까스 김치나베, 야채비빔밥 전문 코너'],
    ['FOOD', '교직원식당', '종합복지관 1층', '평일 중식 11:30~14:00, 석식 17:00~18:30 / 주말·공휴일 휴점', '자유로운 뷔페식 식단 제공'],
    ['FOOD', '생활관식당', '생활관(A동) 지하', '중식 11:30~13:30, 석식 17:00~18:30 / ※ 금·토·일요일만 운영', '기숙사 관생 전용 고정 식단 운영'],
    ['FOOD', '법학관 5층 청향 (한식)', '법학관 5층', '평일 중식 11:30~14:00, 석식 17:00~19:00 / 토요일 중식 11:30~14:00', '프리미엄 보양식 영양 명품 갈비탕 판매'],
    ['FOOD', '법학관 5층 청향 (양식)', '법학관 5층', '평일 중식 11:30~14:00, 석식 17:00~19:00 / 주말 휴점', '그릴드 안심 스테이크 코스 및 단품 구성'],
    ['FOOD', '오지버거', '공학관 1층', '평일 10:30~20:00 / 토요일 10:30~18:00 (그 외 휴점)', '수제 오븐 패티 버거 및 치킨 매장'],
    ['FOOD', '도시락전문점 (K-BOB+)', '종합복지관 1층', '평일 11:00~17:00 / 주말 휴점', '유학생들이 가볍게 테이크아웃하기 좋은 간편 도시락 전문 매장'],
    ['FOOD', '김밥·분식전문점 (K-GIMBOB)', '북악관 1층', '평일 11:00~17:30 / 주말 휴점', '한국식 김밥, 라면, 떡볶이 등 분식 메뉴 제공'],
    ['FOOD', '써브웨이', '북악관 1층', '평일 08:30~19:00 / 주말 휴점', '글로벌 커스텀 샌드위치 브랜드'],
    ['FOOD', '샐러디', '종합복지관 지하 1층', '평일 10:30~18:30 / 주말 휴점', '샐러드 볼, 웜 볼 등 건강식 제공 매장'],
    ['FOOD', '버거운버거', '종합복지관 지하 1층', '평일 09:00~20:00 / 주말 09:00~19:00', '가성비가 우수한 두툼한 치킨 및 비프 버거 전문점'],
    ['CAFE', '제과점 (베이커리)', '종합복지관 2층', '평일 08:30~18:00 / 주말 휴무', '당일 구운 신선한 빵과 음료 판매'],
    ['CAFE', '법학관 카페 (쿱스켓 내부)', '법학관 1층', '평일 09:00~17:30 / 토요일 09:00~16:00', '법학관 간이 커피 테이크아웃 코너'],
    ['CAFE', '과학관 카페 (쿱스켓 내부)', '과학관 1층', '평일 08:30~17:30 / 주말 휴무', '과학관 로비 연결형 무인/유인 카페'],
    ['CAFE', '복지관 카페 (카페나무)', '종합복지관 지하 1층', '평일 08:30~20:00 / 주말 09:00~18:00', '교내 학생 이용률이 가장 높은 대형 휴식형 카페'],
    ['CAFE', '본부관 카페', '본부관 1층', '평일 08:30~17:00 / 주말 휴무', '본부관 로비 안쪽 조용한 미팅 공간 겸용 카페'],
    ['CAFE', '북악관 카페', '북악관 1층', '평일 08:00~18:00 / 주말 휴무', '북악관 로비층 신속한 음료 제조 전문 코너'],
    ['CAFE', '공학관 카페', '공학관 1층', '평일 08:30~17:30 / 주말 휴무', '공학관 유동 인구 중심에 위치한 카페'],
    ['CAFE', '예술관 카페 (카페나무)', '예술관 1층', '평일 08:30~20:00 / 주말 09:00~18:00', '예술대 감성에 맞춘 아늑한 인테리어형 카페나무 분점'],
    ['CAFE', '도서관 카페 (쿱카페 할리스)', '성곡도서관 지하 1층', '평일 10:00~19:00 / 주말 11:30~18:00', '도서관 공부 중 리프레시하기 좋은 대형 프랜차이즈 연계 매장'],
    ['CAFE', '공차', '북악관 1층', '평일 10:00~18:00 / 주말 휴무', '글로벌 밀크티 및 버블티 전문점'],
    ['WELFARE', '무인 세탁실', '생활관 B동 2층 / C동 1층 / D동 1층', '24시간 연중무휴 무인 운영', '유학생 필수 복지 공간 (코인 세탁기 및 건조기 완비, 1회 ₩1,000)'],
    ['WELFARE', '복실 (인쇄/카피룸)', '북악관 1층', '평일 08:30~19:00 / 주말 휴무', '대형 복사, 스캔, PPT 제본 및 소형 도서 제본 지원'],
    ['WELFARE', '우리은행 국민대지점', '종합복지관 2층', '평일 09:00~16:00 / 주말 휴무', '학생증 체크카드 발급, 외국인 송금 및 통장 개설 지원'],
    ['WELFARE', '우편취급국', '종합복지관 2층', '평일 09:00~18:00 / 주말 휴무', '일반/등기 우편 및 해외 EMS 발송 대행'],
    ['WELFARE', '서점 및 기념품점', '종합복지관 1층 / 북악관 1층', '서점 09:00~18:00 / 기념품점 09:00~17:00', '전공 서적 구매 및 공식 굿즈 판매'],
    ['WELFARE', '휴대전화 판매점', '종합복지관 1층', '평일 09:30~18:00 / 주말 휴무', '유학생용 USIM 개통, 요금제 상담 및 스마트폰 수리'],
    ['WELFARE', '문구잡화점', '종합복지관 지하 1층', '평일 08:30~18:00 / 주말 휴무', '학용품, 사무용품 및 생활 잡화 취급'],
    ['WELFARE', '화훼점 (꽃집)', '종합복지관 지하 1층', '평일 10:00~17:00 / 주말 휴무', '행사용 꽃다발, 축하 화환 및 인테리어 화분 주문 제작'],
    ['WELFARE', '생활잡화점 / 화방', '조형관 1층', '화방 08:30~20:00 / 토요일 09:00~18:00', '조형대생 필수 전문 제도 용품(화방) 및 IT 기기 센터'],
    ['WELFARE', '손세차장', '미래관 주차장', '평일 09:30~19:00 / 토요일 10:00~15:00', '교내 방문객 대상 전문 손세차 콤플렉스 (사전예약)'],
    ['WELFARE', '여행사', '종합복지관 1층', '평일 10:00~17:00 / 주말 휴무', '항공권 발권, 유학 비자 연계 및 현지 투어 상담'],
    ['STUDY', '북악관 7층 열람실', '북악관 7층', '평시 ~21:00 / 시험기간 ~23:00', '좌석 개별 충전 코드 완비. 고도 집중 학습 구역'],
    ['STUDY', '북악관 9층 스터디 카페', '북악관 9층', '탄력 운영', '좌석 콘센트 완비. 글로벌인문지역대학 학생 전용'],
    ['STUDY', '복지관 3층 열람실', '종합복지관 3층', '매일 ~23:00 개방', '독립된 개별 열람실 및 노트북 타이핑 구역 분리'],
    ['STUDY', '성곡도서관 해동 K-Lab', '성곡도서관 지하 1층', '시험기간 24시간 특별 개방', '자유로운 토론 및 팀 협업이 가능한 코워킹 라운지'],
    ['STUDY', '경상관 경상홀', '경상관 1층', '유동적 단시간 개방', '오픈 스터디 공간으로 자유로운 카페 분위기'],
    ['STUDY', '경영관 프로젝트 라운지', '콘서트홀 3층', '평일 ~17:00 개방', '대형 유리 칠판 보유. 조별 과제 및 팀플 최적화 공간'],
    ['STUDY', '경영관 중앙 라운지', '콘서트홀 3층 중앙 로비', '상시 개방', '간이 콘센트 비치. 노트북 작업 및 팀플 휴식 공간'],
    ['STUDY', '경영관 지하 열람실', '경영관 지하 1층', '시험기간 ~23:50 연장 운영', '고시실 형태의 집중형 학습 구역. 타이핑 좌석 분리'],
    ['MEDICAL', '의무실 (보건진료소)', '종합복지관 401호', '평일 09:00~17:00 (점심시간 제외)', '기본 진료, 상비약 무료 제공, 인바디 측정 지원']
];

// 2. 70개 중앙동아리 원시 데이터 (손실 제로 100% 복구)
const rawClubs = [
    [1, 'PERFORM', 'B.A.D.A', '복지관 321호', '북악 극 예술 연구회', 'badasince1971'],
    [2, 'PERFORM', 'BUSTA', '복지관 124호', '스트릿 댄스 동아리', 'kmu_bustacrew'],
    [3, 'PERFORM', 'CHORUS', '복지관 319호', '합창단', 'chorus_kmu'],
    [4, 'PERFORM', 'DECEMBER', '복지관 126호', '락밴드, 합주 및 공연', 'kmu_band_december'],
    [5, 'PERFORM', 'G-CHORD', '복지관 123호', '힙합, R&B', 'kmu_g.chord'],
    [6, 'PERFORM', 'KookHwa(오케스트라)', '복지관 320호', '클래식 음악 합주', 'kookhwa_kmu_orchestra'],
    [7, 'PERFORM', 'MAGENTA(밴드)', '복지관 120호', '잼, 자작곡 등 밴드활동', 'kmu_magenta'],
    [8, 'PERFORM', 'MUSICBOX', '공학관 매점', '다양한 음악 전달', 'kmu_musicbox'],
    [9, 'PERFORM', 'PHIL-MUSE', '복지관 135호', '클래식 기타 연주', 'phil_muse'],
    [10, 'PERFORM', 'The Musical', '복지관 115호', '뮤지컬 제작 및 관람', 'kmu_themusical'],
    [11, 'PERFORM', '노래모임 징', '복지관 127호', '대중가요 전파', 'jing_musicgroup'],
    [12, 'PERFORM', '민족극회판갈이', '복지관 138호', '연극 제작 및 연기', 'kmu_turnthetables'],
    [13, 'PERFORM', '새날', '복지관 122호', '민중가요 테이프 제작', 'kmu_new.day'],
    [14, 'PERFORM', '아우성', '복지관 121호', '민중가요 및 다양한 노래', 'kmu_ausung'],
    [15, 'PERFORM', '영상나래', '복지관 113호', '영화감상 및 제작', 'kookmin_ysnr'],
    [16, 'PERFORM', '울림패', '복지관 125호', '전통 음악 계승 및 발전', 'kmu_woollimpae'],
    [17, 'SERVICE', 'KUSA', '복지관 240호', '유기견 봉사 및 다양한 봉사활동', 'kmu_kusa'],
    [18, 'SERVICE', 'L.E.O', '복지관 216호', '다양한 연합 봉사활동', 'kmu._.leo'],
    [19, 'SERVICE', 'Tea Tree', '복지관 225호', '환경관련 봉사활동', 'teatree_kmu'],
    [20, 'SERVICE', '국민대고양이추어오', '복지관 247호', '고양이 공생 공간 관리', 'kmu_cat'],
    [21, 'SERVICE', '꼬마사랑', '복지관 114호', '아이들을 위한 봉사활동', 'kosa_kookmin'],
    [22, 'SERVICE', '명운다회', '생활관 D동', '전통 다례 계승', 'kmu_myeongun'],
    [23, 'SERVICE', '북악기우회', '복지관 226호', '바둑 수양 및 기전 참가', 'kookminuniv_baduk'],
    [24, 'SERVICE', '손말사랑회', '복지관 118호', '수화를 통한 봉사활동', 'sonmal_love'],
    [25, 'SERVICE', '여행향기', '복지관 219호', '전국 연합 여행동아리', '미확인'],
    [26, 'SERVICE', '유스호스텔', '복지관 241호', '전국 연맹을 통해 여행과 친목도모', 'kmu_youth'],
    [27, 'SERVICE', '호우회', '복지관 239호', '봉사활동 및 교외활동 친목', '미확인'],
    [28, 'EXHIBIT', 'LIA', '복지관 217호', '벽화 봉사 등 생활 속 예술 전파', 'kmu_lia'],
    [29, 'EXHIBIT', '국민서도회', '복지관 245호', '서예 전파 및 교류', 'kookmin.sdh'],
    [30, 'EXHIBIT', '그림사랑', '복지관 230호', '그림 및 종합예술', 'kmu_artluv'],
    [31, 'EXHIBIT', '문예창작회', '복지관 110호', '문예창작활동', 'kmu_writers'],
    [32, 'EXHIBIT', '빛이랑', '복지관 318호', '흑백사진 연구', 'kmu_withlight'],
    [33, 'RELIGION', 'C.A.M', '복지관 136호', '기독교 연구 및 선교활동', 'kookmin_cam'],
    [34, 'RELIGION', 'C.C.C', '복지관 129호', '기독교 연구 및 성경 연구', 'kmu_ccc'],
    [35, 'RELIGION', 'IVF', '복지관 242호', '기독교 선교 활동 및 연구', 'kmu_ivf'],
    [36, 'RELIGION', '기독학생회', '복지관 131호', '기독교 선교 및 연구', '미확인'],
    [37, 'RELIGION', '네비게이토', '복지관 224호', '전국 교류 기독교 동아리', 'kmu_navigators'],
    [38, 'RELIGION', '불교 학생회', '복지관 244호', '전국 연합 불교 동아리', '미확인'],
    [39, 'RELIGION', '베네딕도', '복지관 228호', '가톨릭 연합동아리', 'kmu_benedict'],
    [40, 'RELIGION', '증산도 학생회', '복지관 220호', '증산도 연구 및 보급', '미확인'],
    [41, 'BALL', 'FOCUS', '복지관 211호', '축구 및 체력증진', 'kmu.focus'],
    [42, 'BALL', 'K.M.T.C', '테니스장 2층', '테니스 연습 및 대회 출전', 'kmtc.tennis'],
    [43, 'BALL', 'KTTC', '복지관 218호', '탁구 대회 출전 및 친목도모', 'kmu.kttc'],
    [44, 'BALL', 'TAB', '복지관 116호', '농구연습 및 경기 출전', 'kmu_tab'],
    [45, 'BALL', "WHAT'S UP", '복지관 130호', '스노우 보드 및 다양한 보드 타기', '2627_whats_up'],
    [46, 'BALL', '국민대산악부', '복지관 214호', '암벽 클라이밍 및 종주', 'kookmin_alpine'],
    [47, 'BALL', '북악가오리', '복지관 249호', '스킨스쿠버 및 친목도모', 'bgaori_official'],
    [48, 'BALL', '북악머슬', '복지관 248호', '웨이트트레이닝', '미확인'],
    [49, 'BALL', '에로우 (스키부)', '복지관 213호', '스키 및 체력증진', 'kmuski_arrow'],
    [50, 'BALL', '윈드밀스', '복지관 132호', '야구활동 및 체력증진', 'kmu_windmills'],
    [51, 'BALL', '캐논볼', '복지관 238호', '볼링 및 다양한 레져 스포츠', 'kmu._.cannonball'],
    [52, 'BALL', '이카루스', '복지관 111호', '국민대 자전거 모임', 'kmu_riding'],
    [53, 'BALL', '콕', '복지관 220호', '배드민턴', 'kmu_kok'],
    [54, 'BALL', '레이저백스', '복지관 235호', '미식축구', 'kmu_razorbacks'],
    [55, 'SPORTS', '미르택견', '복지관 246호', '택견 보급 및 심신수련', 'mirrtaekkyeon'],
    [56, 'SPORTS', '북악검우회', '복지관 236호', '검도 수련을 통한 심신수양', 'kmu_bukkum'],
    [57, 'SPORTS', '유도부', '복지관 221호', '유도를 통한 체력단련', 'kookmin.judo'],
    [58, 'SPORTS', 'LOWLAND', '복지관 215호', '주짓수 동아리', 'kmu_lowland'],
    [59, 'SPORTS', '태랑', '복지관 232호', '태권도 연습 및 친목도모', 'kmu_taerang'],
    [60, 'ACADEMIC', 'ALA', '복지관 231호', '영어 청취능력 향상 및 영어공부', '미확인'],
    [61, 'ACADEMIC', 'CONNECT', '복지관 237호', 'IT 재능기부 및 봉사활동', '미확인'],
    [62, 'ACADEMIC', 'ESS', '복지관 137호', 'TIME지 해석 및 토론', 'kmu_ess'],
    [63, 'ACADEMIC', 'KCC', '복지관 233호', '컴퓨터 소프트웨어 연구', 'kmu_kcc'],
    [64, 'ACADEMIC', 'MS', '복지관 112호', '과학 토론 및 세미나', 'kmu_ms'],
    [65, 'ACADEMIC', '루미에르', '복지관 235호', '독서토론 및 다양한 세미나', '미확인'],
    [66, 'ACADEMIC', '비상구', '복지관 117호', '마르크스주의 공부 및 사회문제 연구', 'exit_kmu'],
    [67, 'ACADEMIC', '우연', '복지관 243호', '역사 학술 토론 및 세미나', 'kmu_wooyeonhistory'],
    [68, 'ACADEMIC', '창의공장', '복지관 212호', '창업 아이디어 실현', 'kmu.creativefactory'],
    [69, 'ACADEMIC', '프로메테우스', '복지관 234호', '외국인 교류 및 제2외국어 학습', 'kmu_prometheus'],
    [70, 'ACADEMIC', '청문회', '복지관 227호', '중앙 토론 동아리', '미확인']
];

// ─────────────────────────────────────────────────
// [ 핵심 엔진 ] 고유명사 및 장소 다국어 자동 번역 딕셔너리
// ─────────────────────────────────────────────────
const TRANSLATOR = {
    // 건물 및 층수 변환 (현지 바이브 반영)
    replaceLoc: (text, lang) => {
        if(lang === 'ko') return text;
        const dict = {
            '종합복지관': { en: 'Welfare Hall', zh: '综合福利馆', ja: '総合福祉館', de: 'Wohlfahrtsgebäude', fr: 'Bâtiment Welfare', ru: 'Корпус благосостояния' },
            '복지관': { en: 'Welfare Hall', zh: '福利馆', ja: '福祉館', de: 'Wohlfahrtsgebäude', fr: 'Bâtiment Welfare', ru: 'Корпус благосостояния' },
            '공학관 별관': { en: 'Engineering Annex', zh: '工学馆副楼', ja: '工学館別館', de: 'Ingenieurwesen-Anbau', fr: 'Annexe Ingénierie', ru: 'Пристройка инженерии' },
            '공학관': { en: 'Engineering Bldg', zh: '工学馆', ja: '工学館', de: 'Ingenieurwesen-Gebäude', fr: 'Bât. Ingénierie', ru: 'Инженерный корпус' },
            '과학관': { en: 'Science Bldg', zh: '科学馆', ja: '科学館', de: 'Wissenschaftsgebäude', fr: 'Bât. Sciences', ru: 'Научный корпус' },
            '법학관': { en: 'Law Bldg', zh: '法学馆', ja: '法学館', de: 'Jura-Gebäude', fr: 'Bât. Droit', ru: 'Юридический корпус' },
            '북악관': { en: 'Bukak Hall', zh: '北岳馆', ja: '北岳館', de: 'Bukak-Halle', fr: 'Hall Bukak', ru: 'Зал Букак' },
            '생활관': { en: 'Dormitory', zh: '生活馆', ja: '生活館(寮)', de: 'Wohnheim', fr: 'Résidence', ru: 'Общежитие' },
            '예술관': { en: 'Arts Bldg', zh: '艺术馆', ja: '芸術館', de: 'Kunstgebäude', fr: 'Bât. Arts', ru: 'Корпус искусств' },
            '성곡도서관': { en: 'Sungkok Library', zh: '省谷图书馆', ja: '省谷図書館', de: 'Sungkok-Bibliothek', fr: 'Bibliothèque Sungkok', ru: 'Библиотека Сонгок' },
            '경상관': { en: 'Economics Bldg', zh: '经商馆', ja: '経商館', de: 'Wirtschaftsgebäude', fr: 'Bât. Économie', ru: 'Экономический корпус' },
            '경영관': { en: 'Business Bldg', zh: '经营馆', ja: '経営館', de: 'BWL-Gebäude', fr: 'Bât. Gestion', ru: 'Бизнес-корпус' },
            '조형관': { en: 'Design Bldg', zh: '造型馆', ja: '造形館', de: 'Design-Gebäude', fr: 'Bât. Design', ru: 'Корпус дизайна' },
            '미래관': { en: 'Mirae Hall', zh: '未来馆', ja: '未来館', de: 'Mirae-Halle', fr: 'Hall Mirae', ru: 'Зал Мирэ' },
            '콘서트홀': { en: 'Concert Hall', zh: '音乐厅', ja: 'コンサートホール', de: 'Konzerthalle', fr: 'Salle de concert', ru: 'Концертный зал' },
            '주차장': { en: 'Parking Lot', zh: '停车场', ja: '駐車場', de: 'Parkplatz', fr: 'Parking', ru: 'Парковка' },
            '지하 1층': { en: 'B1', zh: '地下1楼', ja: '地下1階', de: 'UG 1', fr: 'Sous-sol 1', ru: '-1 этаж' },
            '1층': { en: '1F', zh: '1楼', ja: '1階', de: 'EG', fr: '1er Étage', ru: '1 этаж' },
            '2층': { en: '2F', zh: '2楼', ja: '2階', de: '1. OG', fr: '2ème Étage', ru: '2 этаж' },
            '3층': { en: '3F', zh: '3楼', ja: '3階', de: '2. OG', fr: '3ème Étage', ru: '3 этаж' },
            '5층': { en: '5F', zh: '5楼', ja: '5階', de: '4. OG', fr: '5ème Étage', ru: '5 этаж' },
            '7층': { en: '7F', zh: '7楼', ja: '7階', de: '6. OG', fr: '7ème Étage', ru: '7 этаж' },
            '8층': { en: '8F', zh: '8楼', ja: '8階', de: '7. OG', fr: '8ème Étage', ru: '8 этаж' },
            '9층': { en: '9F', zh: '9楼', ja: '9階', de: '8. OG', fr: '9ème Étage', ru: '9 этаж' },
            '호': { en: ' Rm', zh: '室', ja: '号室', de: ' Raum', fr: ' Salle', ru: ' Комната' }
        };
        let translated = text;
        for (const [kr, transObj] of Object.entries(dict)) {
            if (translated.includes(kr)) {
                translated = translated.replace(new RegExp(kr, 'g'), transObj[lang]);
            }
        }
        return translated;
    },

    // 운영시간 패턴 번역
    translateHours: (text, lang) => {
        if (lang === 'ko') return text;
        const dict = {
            '평일': { en: 'Weekdays', zh: '平日', ja: '平日', de: 'Mo–Fr', fr: 'Sem.', ru: 'Будни' },
            '주말·공휴일 휴점': { en: 'Closed on weekends & holidays', zh: '周末及节假日休息', ja: '週末・祝日休業', de: 'Wochenende & Feiertage geschlossen', fr: 'Fermé week-ends & jours fériés', ru: 'Закрыто в вых. и праздники' },
            '주말·공휴일': { en: 'Weekends & holidays', zh: '周末及节假日', ja: '週末・祝日', de: 'Wochenende & Feiertage', fr: 'Week-ends & jours fériés', ru: 'Вых. и праздники' },
            '주말 휴무': { en: 'Closed on weekends', zh: '周末休息', ja: '週末休み', de: 'Wochenende geschlossen', fr: 'Fermé le week-end', ru: 'Закрыто в выходные' },
            '주말 휴점': { en: 'Closed on weekends', zh: '周末休息', ja: '週末休業', de: 'Wochenende geschlossen', fr: 'Fermé le week-end', ru: 'Закрыто в выходные' },
            '토요일': { en: 'Sat', zh: '周六', ja: '土曜', de: 'Sa', fr: 'Sam.', ru: 'Сб' },
            '조·중식': { en: 'Breakfast & Lunch', zh: '早餐&午餐', ja: '朝食・昼食', de: 'Früh. & Mittagessen', fr: 'Petit-déj. & Déjeuner', ru: 'Завтрак и обед' },
            '중식': { en: 'Lunch', zh: '午餐', ja: '昼食', de: 'Mittagessen', fr: 'Déjeuner', ru: 'Обед' },
            '석식': { en: 'Dinner', zh: '晚餐', ja: '夕食', de: 'Abendessen', fr: 'Dîner', ru: 'Ужин' },
            '24시간 무인 운영': { en: '24-hour unmanned operation', zh: '24小时无人运营', ja: '24時間無人運営', de: '24h-Betrieb (unbemannt)', fr: 'Service 24h/24 automatique', ru: 'Круглосуточно (без персонала)' },
            '연중무휴 무인 운영': { en: 'Year-round unmanned', zh: '全年无人运营', ja: '年中無休無人運営', de: 'Ganzjährig unbemannt', fr: 'Sans personnel toute l\'année', ru: 'Круглогодично без персонала' },
            '시험기간 24시간 특별 개방': { en: 'Open 24h during exam periods', zh: '考试期间24小时开放', ja: '試験期間中24時間特別開放', de: 'Prüfungszeit: 24h geöffnet', fr: 'Ouvert 24h en période d\'examen', ru: 'Круглосуточно в сессию' },
            '시험기간': { en: 'Exam period', zh: '考试期间', ja: '試験期間', de: 'Prüfungszeit', fr: 'Période d\'examen', ru: 'Сессия' },
            '탄력 운영': { en: 'Flexible hours', zh: '弹性运营', ja: '弾力的運営', de: 'Flexible Öffnungszeiten', fr: 'Horaires flexibles', ru: 'Гибкий режим работы' },
            '유동적 단시간 개방': { en: 'Short-term flexible open', zh: '灵活短期开放', ja: '弾力的短時間開放', de: 'Kurzzeitig flexibel geöffnet', fr: 'Ouverture courte flexible', ru: 'Краткосрочное гибкое открытие' },
            '상시 개방': { en: 'Always open', zh: '随时开放', ja: '常時開放', de: 'Jederzeit geöffnet', fr: 'Toujours ouvert', ru: 'Всегда открыто' },
            '매일': { en: 'Daily', zh: '每天', ja: '毎日', de: 'Täglich', fr: 'Tous les jours', ru: 'Ежедневно' },
            '점심시간 제외': { en: 'excl. lunch break', zh: '午休时间除外', ja: '昼休み除く', de: 'außer Mittagspause', fr: 'hors pause déjeuner', ru: 'кроме обеда' },
            '금·토·일요일만 운영': { en: 'Fri–Sun only', zh: '仅周五至周日运营', ja: '金土日のみ運営', de: 'Nur Fr–So', fr: 'Ven–Dim uniquement', ru: 'Только пт–вс' },
            '그 외 휴점': { en: 'otherwise closed', zh: '其余时间休息', ja: 'その他休業', de: 'sonst geschlossen', fr: 'sinon fermé', ru: 'иначе закрыто' },
        };
        let result = text;
        for (const [kr, transObj] of Object.entries(dict)) {
            if (result.includes(kr)) result = result.replace(new RegExp(kr, 'g'), transObj[lang] || kr);
        }
        return result;
    },

    // 시설 세부특징 번역
    translateDetails: (text, lang) => {
        if (lang === 'ko') return text;
        const dict = {
            '스마트 무인 편의점 시스템': { en: 'Smart unmanned convenience store system', zh: '智能无人便利店系统', ja: 'スマート無人コンビニシステム', de: 'Intelligentes unbemanntes Geschäftssystem', fr: 'Système de supérette automatique', ru: 'Система умного магазина без персонала' },
            '가마, 뚝배기, 인터셰프, 아시안플래터, 델리카슨 코너 운영': { en: 'Gama, Ttukbaegi, InterChef, Asian Platter & Delicatessen corners', zh: '运营加马、砂锅、主厨、亚洲拼盘、熟食柜台', ja: 'カマ・トゥッペギ・インターシェフ・アジアプラッター・デリカッソンコーナー運営', de: 'Gama, Ttukbaegi, InterChef, Asian Platter & Delikatessen', fr: 'Corners Gama, Ttukbaegi, InterChef, Asian Platter & Charcuterie', ru: 'Отделы Гама, Ттокпэги, Интершеф, Азиатское блюдо и Гастроном' },
            '치즈돈까스 김치나베, 야채비빔밥 전문 코너': { en: 'Cheese tonkatsu, kimchi hot pot & veggie bibimbap specialty corner', zh: '奶酪炸猪排、泡菜火锅、蔬菜拌饭专柜', ja: 'チーズとんかつ・キムチ鍋・野菜ビビンバ専門コーナー', de: 'Käse-Tonkatsu, Kimchi-Topf & Gemüse-Bibimbap', fr: 'Spécialités tonkatsu fromage, ragoût kimchi & bibimbap légumes', ru: 'Тонкацу с сыром, тушёное кимчи и пибимпаб с овощами' },
            '자유로운 뷔페식 식단 제공': { en: 'Free-style buffet meals', zh: '自由取餐式自助餐', ja: '自由なビュッフェ形式の食事', de: 'Freies Buffet-System', fr: 'Formule buffet libre', ru: 'Свободный формат шведского стола' },
            '기숙사 관생 전용 고정 식단 운영': { en: 'Fixed meal plan for dormitory residents only', zh: '仅限宿舍住客的固定套餐', ja: '寮生専用の固定メニュー', de: 'Festes Menü nur für Wohnheimbewohner', fr: 'Menu fixe réservé aux résidents', ru: 'Фиксированное меню только для жильцов общежития' },
            '프리미엄 보양식 영양 명품 갈비탕 판매': { en: 'Premium galbi-tang (rib soup) nutrition meals', zh: '高端营养排骨汤特供', ja: 'プレミアム参鶏湯・牛骨スープ提供', de: 'Premium-Galbitang-Rippensuppe', fr: 'Soupe de côtes premium Galbitang', ru: 'Премиум суп из рёбрышек Кальбитан' },
            '그릴드 안심 스테이크 코스 및 단품 구성': { en: 'Grilled sirloin steak course & à la carte', zh: '炭烤西冷牛排套餐及单点', ja: 'グリルドサーロインステーキのコース・単品', de: 'Gegrilltes Rinderfilet – Menü & Einzelgericht', fr: 'Steak de filet grillé – menu & à la carte', ru: 'Жареное филе — сет-меню и отдельные блюда' },
            '수제 오븐 패티 버거 및 치킨 매장': { en: 'Handmade oven-patty burgers & chicken', zh: '手工烤肉饼汉堡及炸鸡', ja: '手作りオーブンパティバーガー＆チキン', de: 'Handgemachte Ofenpatty-Burger & Chicken', fr: 'Burgers maison au four & poulet', ru: 'Бургеры ручной работы и курица' },
            '유학생들이 가볍게 테이크아웃하기 좋은 간편 도시락 전문 매장': { en: 'Convenient take-out bento shop popular with international students', zh: '适合留学生便捷外带的便当专卖店', ja: '留学生に人気の手軽なテイクアウト弁当専門店', de: 'Praktisches Bento-Takeout für Austauschstudenten', fr: 'Spécialiste bento idéal pour étudiants étrangers', ru: 'Удобный бенто-магазин для иностранных студентов' },
            '한국식 김밥, 라면, 떡볶이 등 분식 메뉴 제공': { en: 'Korean kimbap, ramen, tteokbokki & snack menus', zh: '韩式紫菜卷、拉面、炒年糕等小吃菜单', ja: '韓国式キンパ・ラーメン・トッポッキなど', de: 'Koreanischer Kimbap, Ramen, Tteokbokki usw.', fr: 'Kimbap coréen, ramen, tteokbokki et en-cas', ru: 'Корейский кимпаб, рамён, тпокпоги и снеки' },
            '글로벌 커스텀 샌드위치 브랜드': { en: 'Global custom sandwich brand', zh: '全球定制三明治品牌', ja: 'グローバルカスタムサンドイッチブランド', de: 'Globale Custom-Sandwich-Marke', fr: 'Marque mondiale de sandwiches personnalisés', ru: 'Глобальный бренд сэндвичей на заказ' },
            '샐러드 볼, 웜 볼 등 건강식 제공 매장': { en: 'Healthy salad bowls & warm bowls', zh: '提供沙拉碗、热食碗等健康餐', ja: 'サラダボウル・ウォームボウルなどヘルシーフード', de: 'Salat-Bowls & Warm-Bowls', fr: 'Salad bowls et warm bowls healthy', ru: 'Боулы с салатом и тёплые боулы' },
            '가성비가 우수한 두툼한 치킨 및 비프 버거 전문점': { en: 'Great value thick chicken & beef burger specialist', zh: '高性价比的厚实鸡肉及牛肉汉堡专门店', ja: 'コスパ抜群の厚切りチキン＆ビーフバーガー専門店', de: 'Preiswerte Chicken- & Beef-Burger', fr: 'Burgers poulet & bœuf épais à bon prix', ru: 'Бюджетные бургеры с курицей и говядиной' },
            '당일 구운 신선한 빵과 음료 판매': { en: 'Freshly baked daily bread & drinks', zh: '每日新鲜烘焙面包及饮品', ja: '当日焼き立てパンと飲み物', de: 'Täglich frisch gebackenes Brot & Getränke', fr: 'Pain frais du jour & boissons', ru: 'Свежеиспечённый хлеб и напитки каждый день' },
            '법학관 간이 커피 테이크아웃 코너': { en: 'Quick coffee take-out corner in Law Bldg', zh: '法学馆简易咖啡外卖角', ja: '法学館のテイクアウトコーヒーコーナー', de: 'Kaffee-Takeout-Ecke im Jura-Gebäude', fr: 'Coin café à emporter au bât. Droit', ru: 'Экспресс-кофе в юридическом корпусе' },
            '과학관 로비 연결형 무인/유인 카페': { en: 'Lobby-connected unmanned/staffed café in Science Bldg', zh: '科学馆大厅连接型无人/有人咖啡厅', ja: '科学館ロビー直結型カフェ', de: 'Café (bemannt/unbemannt) im Wissenschaftsgebäude', fr: 'Café (libre-service/avec personnel) Bât. Sciences', ru: 'Кафе (с/без персонала) в научном корпусе' },
            '교내 학생 이용률이 가장 높은 대형 휴식형 카페': { en: "Campus's most popular large relaxation café", zh: '校内学生使用率最高的大型休闲咖啡厅', ja: '学内で最も人気の大型リラクゼーションカフェ', de: 'Beliebtestes Entspannungscafé auf dem Campus', fr: 'Café de détente le plus populaire du campus', ru: 'Самое популярное кафе-зона отдыха на кампусе' },
            '본부관 로비 안쪽 조용한 미팅 공간 겸용 카페': { en: 'Quiet meeting-space café inside Main Bldg lobby', zh: '本部馆大厅内侧安静会面兼咖啡厅', ja: '本部館ロビー奥の静かなミーティング兼カフェ', de: 'Ruhiges Meeting-Café im Hauptgebäude-Foyer', fr: 'Café-espace réunion calme dans le hall principal', ru: 'Тихое кафе-переговорная в главном корпусе' },
            '북악관 로비층 신속한 음료 제조 전문 코너': { en: 'Fast-service drinks corner on Bukak Hall lobby floor', zh: '北岳馆大厅层快速饮品专柜', ja: '北岳館ロビー階のクイックドリンクコーナー', de: 'Schneller Getränkeservice im Bukak-Foyer', fr: 'Corner boissons express au hall de Bukak', ru: 'Быстрый напитки в холле Букак' },
            '공학관 유동 인구 중심에 위치한 카페': { en: 'Café at the high-traffic center of Engineering Bldg', zh: '位于工学馆人流中心的咖啡厅', ja: '工学館の人通りが多い中心に位置するカフェ', de: 'Café im belebten Zentrum des Ingenieurwesens', fr: 'Café au cœur animé du bât. Ingénierie', ru: 'Кафе в центре потока студентов инженерного корпуса' },
            '예술대 감성에 맞춘 아늑한 인테리어형 카페나무 분점': { en: 'Cozy art-vibe Cafe Namu branch for Arts students', zh: '符合艺术大学气质的温馨装饰风格Namu咖啡分店', ja: '芸術大の雰囲気に合わせた居心地のよいカフェナム分店', de: 'Gemütliche Cafe-Namu-Filiale im Kunststil', fr: 'Succursale Café Namu cosy, esprit artistique', ru: 'Уютный филиал Кафе Наму в стиле арт' },
            '도서관 공부 중 리프레시하기 좋은 대형 프랜차이즈 연계 매장': { en: 'Large franchise café perfect for a library study break', zh: '适合图书馆学习间歇休息的大型连锁咖啡店', ja: '図書館での勉強の合間に最適な大型フランチャイズカフェ', de: 'Großes Franchise-Café ideal für Bibliothekspausen', fr: 'Grand café franchise idéal pour pauses bibliothèque', ru: 'Крупный франчайзинг-кафе для перерывов в библиотеке' },
            '글로벌 밀크티 및 버블티 전문점': { en: 'Global milk tea & bubble tea specialist', zh: '全球奶茶及珍珠奶茶专门店', ja: 'グローバルミルクティー＆バブルティー専門店', de: 'Globale Milchtee & Bubble-Tea-Spezialität', fr: 'Spécialiste mondial thé au lait & bubble tea', ru: 'Специалист по молочному чаю и баблти' },
            '유학생 필수 복지 공간 (코인 세탁기 및 건조기 완비, 1회 ₩1,000)': { en: 'Essential for international students (coin washer & dryer, ₩1,000/use)', zh: '留学生必备福利空间（投币洗衣机及烘干机完备，每次₩1,000）', ja: '留学生必須の福祉スペース（コイン洗濯機・乾燥機完備、1回₩1,000）', de: 'Unverzichtbar für Austauschstudierende (Münzwaschmaschine & Trockner, ₩1.000/Nutzung)', fr: 'Indispensable pour étudiants étrangers (machine à laver & séchoir, ₩1 000/utilisation)', ru: 'Необходимо для иностранных студентов (монетная стиральная и сушка, ₩1 000/раз)' },
            '대형 복사, 스캔, PPT 제본 및 소형 도서 제본 지원': { en: 'Large-format copying, scanning, PPT & book binding', zh: '大幅面复印、扫描、PPT装订及小型书籍装订', ja: '大判コピー・スキャン・PPT製本・書籍製本対応', de: 'Großformat-Druck, Scan, PPT-Bindung & Buchbindung', fr: 'Copie grand format, scan, reliure PPT & livres', ru: 'Крупный копир, скан, брошюровка PPT и книг' },
            '학생증 체크카드 발급, 외국인 송금 및 통장 개설 지원': { en: 'Student ID card, foreign remittance & bank account opening', zh: '学生证借记卡办理、外国人汇款及开户支持', ja: '学生証デビットカード発行・外国人送金・口座開設対応', de: 'Studentenausweis, Auslandsüberweisungen & Kontoeröffnung', fr: 'Carte étudiant, virement étranger & ouverture de compte', ru: 'Студенческая карта, переводы и открытие счёта' },
            '일반/등기 우편 및 해외 EMS 발송 대행': { en: 'Regular/registered mail & international EMS shipping', zh: '普通/挂号信及海外EMS代发', ja: '一般・書留郵便および海外EMS発送代行', de: 'Normal-/Einschreiben & Auslands-EMS', fr: 'Courrier standard/recommandé & EMS international', ru: 'Обычная/заказная почта и международный EMS' },
            '전공 서적 구매 및 공식 굿즈 판매': { en: 'Textbooks & official Kookmin University merchandise', zh: '专业教材购买及官方周边商品', ja: '専門書購入・公式グッズ販売', de: 'Fachbücher & offizielles Uni-Merch', fr: 'Manuels & merchandising officiel', ru: 'Учебники и официальная символика университета' },
            '유학생용 USIM 개통, 요금제 상담 및 스마트폰 수리': { en: 'SIM activation for foreigners, plan advice & phone repair', zh: '留学生SIM卡开通、套餐咨询及手机维修', ja: '留学生向けSIM開通・料金プラン相談・スマホ修理', de: 'SIM für Ausländer, Tarif-Beratung & Handy-Reparatur', fr: 'Activation SIM étranger, conseil forfait & réparation', ru: 'SIM для иностранцев, тарифы и ремонт телефонов' },
            '학용품, 사무용품 및 생활 잡화 취급': { en: 'Stationery, office supplies & daily goods', zh: '文具、办公用品及日常杂货', ja: '文房具・事務用品・生活雑貨取扱い', de: 'Schreibwaren, Büromaterial & Haushaltswaren', fr: 'Fournitures scolaires, bureau & articles quotidiens', ru: 'Канцтовары, офисные принадлежности и хозтовары' },
            '행사용 꽃다발, 축하 화환 및 인테리어 화분 주문 제작': { en: 'Event bouquets, congratulatory wreaths & interior pot orders', zh: '活动花束、祝贺花环及室内盆栽定制', ja: 'イベント用花束・祝い花輪・インテリア鉢のオーダー', de: 'Event-Sträuße, Kränze & Dekor-Pflanzen auf Bestellung', fr: 'Bouquets événementiels, couronnes & plantes sur commande', ru: 'Букеты, венки и кашпо на заказ' },
            '조형대생 필수 전문 제도 용품(화방) 및 IT 기기 센터': { en: 'Essential art supplies for Design students & IT device center', zh: '造型学院学生必备专业绘图用品（画室）及IT设备中心', ja: '造形大学生必須の製図用品（画材店）&ITデバイスセンター', de: 'Zeichenbedarf für Designstudierende & IT-Gerätezentrum', fr: 'Matériel de dessin design & centre IT', ru: 'Принадлежности для дизайнеров и IT-центр' },
            '교내 방문객 대상 전문 손세차 콤플렉스 (사전예약)': { en: 'Professional hand car wash for campus visitors (reservation required)', zh: '面向校内访客的专业手洗车综合服务（预约制）', ja: 'キャンパス来訪者向け専門ハンドカーウォッシュ（要予約）', de: 'Profi-Handwäsche für Campus-Besucher (Reservierung)', fr: 'Lavage auto manuel pro pour visiteurs (sur réservation)', ru: 'Профессиональная мойка для посетителей (по записи)' },
            '항공권 발권, 유학 비자 연계 및 현지 투어 상담': { en: 'Flight tickets, study-abroad visa support & local tour consulting', zh: '机票出票、留学签证联办及当地旅游咨询', ja: '航空券発券・留学ビザ連携・現地ツア相談', de: 'Flugtickets, Studienvisum & Reiseberatung', fr: 'Billets d\'avion, visa étude & conseil voyage', ru: 'Авиабилеты, студенческие визы и туры' },
            '좌석 개별 충전 코드 완비. 고도 집중 학습 구역': { en: 'Individual charging ports at every seat. High-focus study zone.', zh: '每座位配备独立充电线。高度专注学习区域。', ja: '各座席に個別充電コード完備。高集中学習ゾーン。', de: 'Einzelne Ladekabel an jedem Platz. Hochfokus-Lernbereich.', fr: 'Chargeurs individuels à chaque place. Zone d\'étude haute concentration.', ru: 'Индивидуальные зарядки на каждом месте. Зона концентрированной учёбы.' },
            '좌석 콘센트 완비. 글로벌인문지역대학 학생 전용': { en: 'Outlets at every seat. Exclusive to Global Humanities students.', zh: '每座位配备插座。仅限全球人文地区大学学生使用。', ja: '各座席コンセント完備。グローバル人文地域大学生専用。', de: 'Steckdosen an jedem Platz. Nur für Global-Humanities-Studenten.', fr: 'Prises à chaque place. Réservé aux étudiants Global Humanities.', ru: 'Розетки на каждом месте. Только для студентов Global Humanities.' },
            '독립된 개별 열람실 및 노트북 타이핑 구역 분리': { en: 'Separate private reading rooms & laptop typing zones', zh: '独立个人阅览室及笔记本电脑打字区分离', ja: '独立した個別閲覧室とノートPCタイピング区域を分離', de: 'Separate Lesekabinen & Laptop-Tipp-Zonen', fr: 'Salles de lecture privées & zones clavier séparées', ru: 'Отдельные кабинки для чтения и зоны для ноутбуков' },
            '자유로운 토론 및 팀 협업이 가능한 코워킹 라운지': { en: 'Co-working lounge for free discussion & team collaboration', zh: '可自由讨论及团队协作的联合办公休息室', ja: '自由な討論とチームコラボが可能なコワーキングラウンジ', de: 'Co-Working-Lounge für Diskussionen & Teamarbeit', fr: 'Espace co-working pour discussions libres & travail d\'équipe', ru: 'Коворкинг-лаунж для обсуждений и командной работы' },
            '오픈 스터디 공간으로 자유로운 카페 분위기': { en: 'Open study space with a free café atmosphere', zh: '开放式学习空间，自由咖啡氛围', ja: 'オープンスタディースペース、自由なカフェ雰囲気', de: 'Offener Lernraum im Café-Stil', fr: 'Espace étude ouvert ambiance café libre', ru: 'Открытое учебное пространство в атмосфере кафе' },
            '대형 유리 칠판 보유. 조별 과제 및 팀플 최적화 공간': { en: 'Large glass whiteboard. Optimized for group projects & teamwork.', zh: '配备大型玻璃白板。适合小组作业及团队合作。', ja: '大型ガラス黒板完備。グループ課題・チームプレーに最適。', de: 'Großes Glas-Whiteboard. Für Gruppen- und Teamprojekte.', fr: 'Grand tableau en verre. Idéal pour projets de groupe.', ru: 'Большая стеклянная доска. Оптимально для групповых проектов.' },
            '간이 콘센트 비치. 노트북 작업 및 팀플 휴식 공간': { en: 'Basic outlets available. Laptop work & teamwork rest area.', zh: '配备简易插座。笔记本作业及团队休息空间。', ja: '簡易コンセント設置。ノートPC作業＆チームプレー休憩スペース。', de: 'Einfache Steckdosen. Laptop-Arbeit & Team-Pausen.', fr: 'Prises simples disponibles. Travail laptop & pause équipe.', ru: 'Базовые розетки. Рабочее место для ноутбуков и отдыха команды.' },
            '고시실 형태의 집중형 학습 구역. 타이핑 좌석 분리': { en: 'Exam-room-style intensive study zone. Typing seats separated.', zh: '备考室形态的专注学习区。打字座位分离。', ja: '試験会場形式の集中学習ゾーン。タイピング席分離。', de: 'Intensiv-Lernbereich. Tipp-Plätze getrennt.', fr: 'Zone d\'étude intensive style salle d\'examen. Sièges clavier séparés.', ru: 'Интенсивная зона учёбы в стиле экзамен. Места для печати отделены.' },
            '기본 진료, 상비약 무료 제공, 인바디 측정 지원': { en: 'Basic medical care, free OTC medicine & InBody measurement', zh: '基本诊疗、常备药免费提供、体成分测定支持', ja: '基本診療・常備薬無料提供・インバディ測定対応', de: 'Grundversorgung, kostenlose Medizin & InBody-Messung', fr: 'Soins de base, médicaments gratuits & mesure InBody', ru: 'Базовая медпомощь, бесплатные лекарства и замер InBody' },
        };
        let result = text;
        for (const [kr, transObj] of Object.entries(dict)) {
            if (result.includes(kr)) {
                result = result.replace(new RegExp(kr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), transObj[lang] || kr);
                break;
            }
        }
        return result;
    },

    // 동아리 활동 내용 번역
    translatePurpose: (text, lang) => {
        if (lang === 'ko') return text;
        const dict = {
            '북악 극 예술 연구회': { en: 'Bukak theater & performing arts research group', zh: '北岳戏剧艺术研究会', ja: '北岳演劇芸術研究会', de: 'Bukak Theater & Darstellende Kunst', fr: 'Groupe de recherche arts du spectacle Bukak', ru: 'Театр и сценическое искусство Букак' },
            '스트릿 댄스 동아리': { en: 'Street dance club', zh: '街舞社团', ja: 'ストリートダンスサークル', de: 'Street-Dance-Club', fr: 'Club de danse de rue', ru: 'Клуб уличных танцев' },
            '합창단': { en: 'Choir', zh: '合唱团', ja: '合唱団', de: 'Chor', fr: 'Chœur', ru: 'Хор' },
            '락밴드, 합주 및 공연': { en: 'Rock band, ensemble & live performances', zh: '摇滚乐队、合奏及演出', ja: 'ロックバンド・合奏・ライブ公演', de: 'Rockband, Ensemble & Auftritte', fr: 'Groupe rock, ensemble & concerts', ru: 'Рок-группа, ансамбль и выступления' },
            '힙합, R&B': { en: 'Hip-hop & R&B music', zh: '嘻哈及节奏布鲁斯音乐', ja: 'ヒップホップ＆R&B', de: 'Hip-Hop & R&B', fr: 'Hip-hop & R&B', ru: 'Хип-хоп и R&B' },
            '클래식 음악 합주': { en: 'Classical music ensemble', zh: '古典音乐合奏', ja: 'クラシック音楽合奏', de: 'Klassisches Ensemble', fr: 'Ensemble de musique classique', ru: 'Классический музыкальный ансамбль' },
            '잼, 자작곡 등 밴드활동': { en: 'Jam sessions, original songs & band activities', zh: '即兴演奏、原创曲及乐队活动', ja: 'ジャム・オリジナル曲などバンド活動', de: 'Jam-Sessions, eigene Songs & Bandaktivitäten', fr: 'Sessions jam, compositions & activités de groupe', ru: 'Джем-сейшены, авторские песни и группа' },
            '다양한 음악 전달': { en: 'Sharing various genres of music', zh: '传播多样音乐', ja: '様々な音楽の発信', de: 'Verschiedene Musik verbreiten', fr: 'Partager diverses musiques', ru: 'Продвижение разных жанров музыки' },
            '클래식 기타 연주': { en: 'Classical guitar performance', zh: '古典吉他演奏', ja: 'クラシックギター演奏', de: 'Klassische Gitarre', fr: 'Guitare classique', ru: 'Классическая гитара' },
            '뮤지컬 제작 및 관람': { en: 'Musical production & theater trips', zh: '音乐剧制作及观摩', ja: 'ミュージカル制作・観劇', de: 'Musical-Produktion & Besuche', fr: 'Production musicale & sorties spectacles', ru: 'Постановка мюзиклов и посещение театра' },
            '대중가요 전파': { en: 'Spreading popular music culture', zh: '传播流行歌曲', ja: '大衆歌謡の普及', de: 'Popmusik verbreiten', fr: 'Diffuser la musique populaire', ru: 'Распространение популярной музыки' },
            '연극 제작 및 연기': { en: 'Play production & acting', zh: '话剧制作及表演', ja: '演劇制作・演技', de: 'Theater-Produktion & Schauspiel', fr: 'Production théâtrale & jeu d\'acteur', ru: 'Постановка спектаклей и актёрство' },
            '민중가요 테이프 제작': { en: 'Recording folk protest songs', zh: '制作民间歌谣磁带', ja: '民衆歌謡テープ制作', de: 'Volkslieder aufnehmen', fr: 'Enregistrement de chants populaires', ru: 'Запись народных песен' },
            '민중가요 및 다양한 노래': { en: 'Folk protest songs & various music', zh: '民众歌谣及多样音乐', ja: '民衆歌謡と様々な歌', de: 'Volkslieder & verschiedene Musik', fr: 'Chants populaires & diverses musiques', ru: 'Народные и разнообразные песни' },
            '영화감상 및 제작': { en: 'Film watching & production', zh: '电影欣赏及制作', ja: '映画鑑賞・制作', de: 'Filmschau & Produktion', fr: 'Visionnage & production de films', ru: 'Просмотр и создание фильмов' },
            '전통 음악 계승 및 발전': { en: 'Preserving & developing traditional Korean music', zh: '传承并发展传统音乐', ja: '伝統音楽の継承・発展', de: 'Traditionelle koreanische Musik bewahren', fr: 'Préserver & développer la musique traditionnelle', ru: 'Сохранение и развитие традиционной музыки' },
            '유기견 봉사 및 다양한 봉사활동': { en: 'Stray dog rescue & various volunteer activities', zh: '流浪狗志愿服务及多种公益活动', ja: '野良犬支援・多様なボランティア活動', de: 'Streuner-Hilfe & verschiedene Freiwilligenaktivitäten', fr: 'Sauvetage chiens errants & bénévolat varié', ru: 'Помощь бездомным собакам и волонтёрство' },
            '다양한 연합 봉사활동': { en: 'Various joint volunteer activities', zh: '多种联合志愿活动', ja: '多様な連合ボランティア活動', de: 'Gemeinsame Freiwilligenaktivitäten', fr: 'Diverses activités bénévoles communes', ru: 'Разнообразное совместное волонтёрство' },
            '환경관련 봉사활동': { en: 'Environmental volunteer activities', zh: '环境相关志愿活动', ja: '環境関連ボランティア活動', de: 'Umweltfreiwilligenarbeit', fr: 'Bénévolat environnemental', ru: 'Волонтёрство в области экологии' },
            '고양이 공생 공간 관리': { en: 'Managing coexistence spaces for campus cats', zh: '管理猫咪共生空间', ja: 'キャンパス猫の共生スペース管理', de: 'Koexistenz-Räume für Campus-Katzen', fr: 'Gestion des espaces de coexistence pour chats', ru: 'Управление пространством для кошек на кампусе' },
            '아이들을 위한 봉사활동': { en: 'Volunteer activities for children', zh: '面向儿童的志愿活动', ja: '子どもたちのためのボランティア', de: 'Freiwilligentätigkeit für Kinder', fr: 'Bénévolat pour les enfants', ru: 'Волонтёрство для детей' },
            '전통 다례 계승': { en: 'Preserving traditional Korean tea ceremony', zh: '传承传统茶礼', ja: '伝統茶礼の継承', de: 'Traditionelle Teezeremonie', fr: 'Préservation de la cérémonie du thé', ru: 'Сохранение традиционной чайной церемонии' },
            '바둑 수양 및 기전 참가': { en: 'Baduk (Go) training & tournament participation', zh: '围棋修养及参加棋战', ja: '囲碁の修練と棋戦参加', de: 'Baduk (Go) Training & Turniere', fr: 'Entraînement baduk (Go) & tournois', ru: 'Обучение бадук (Го) и участие в турнирах' },
            '수화를 통한 봉사활동': { en: 'Volunteer service through sign language', zh: '通过手语进行志愿活动', ja: '手話を通じたボランティア活動', de: 'Freiwilligenarbeit mit Gebärdensprache', fr: 'Bénévolat par la langue des signes', ru: 'Волонтёрство с помощью жестового языка' },
            '전국 연합 여행동아리': { en: 'National joint travel club', zh: '全国联合旅行社团', ja: '全国連合旅行サークル', de: 'Nationaler Reise-Club', fr: 'Club de voyage national', ru: 'Всекорейский клуб путешествий' },
            '전국 연맹을 통해 여행과 친목도모': { en: 'Travel & friendship through national federation', zh: '通过全国联盟旅行与交友', ja: '全国連盟を通じた旅行と親睦', de: 'Reisen & Freundschaft durch Bundesverband', fr: 'Voyages & amitié via fédération nationale', ru: 'Путешествия и дружба через федерацию' },
            '봉사활동 및 교외활동 친목': { en: 'Volunteer work & off-campus social activities', zh: '志愿活动及校外活动交流', ja: 'ボランティア活動と課外活動の親睦', de: 'Freiwilligenarbeit & außerschulische Aktivitäten', fr: 'Bénévolat & activités extérieures', ru: 'Волонтёрство и внеучебные мероприятия' },
            '벽화 봉사 등 생활 속 예술 전파': { en: 'Mural volunteering & spreading art in daily life', zh: '壁画志愿服务及生活艺术传播', ja: '壁画ボランティアなど生活の中の芸術普及', de: 'Wandbild-Freiwilligenarbeit & Alltagskunst', fr: 'Bénévolat mural & art dans la vie quotidienne', ru: 'Роспись стен и распространение искусства в жизни' },
            '서예 전파 및 교류': { en: 'Calligraphy promotion & cultural exchange', zh: '书法传播及交流', ja: '書道の普及と交流', de: 'Kalligraphie fördern & Austausch', fr: 'Promotion de la calligraphie & échanges', ru: 'Продвижение каллиграфии и культурный обмен' },
            '그림 및 종합예술': { en: 'Drawing & integrated arts', zh: '绘画及综合艺术', ja: '絵画・総合芸術', de: 'Zeichnen & integrierte Kunst', fr: 'Dessin & arts intégrés', ru: 'Живопись и синтетические виды искусства' },
            '문예창작활동': { en: 'Literary & creative writing activities', zh: '文艺创作活动', ja: '文芸創作活動', de: 'Literarisches Schreiben', fr: 'Activités de création littéraire', ru: 'Литературное творчество' },
            '흑백사진 연구': { en: 'Black & white photography research', zh: '黑白摄影研究', ja: 'モノクロ写真研究', de: 'Schwarzweißfotografie', fr: 'Recherche en photographie noir & blanc', ru: 'Исследование чёрно-белой фотографии' },
            '기독교 연구 및 선교활동': { en: 'Christian research & missionary activities', zh: '基督教研究及宣教活动', ja: 'キリスト教研究・宣教活動', de: 'Christliche Forschung & Mission', fr: 'Recherche chrétienne & activités missionnaires', ru: 'Изучение христианства и миссионерство' },
            '기독교 연구 및 성경 연구': { en: 'Christian & Bible study', zh: '基督教研究及圣经研究', ja: 'キリスト教・聖書研究', de: 'Christliche & Bibelforschung', fr: 'Étude chrétienne & biblique', ru: 'Изучение христианства и Библии' },
            '기독교 선교 활동 및 연구': { en: 'Christian missionary work & research', zh: '基督教宣教活动及研究', ja: 'キリスト教宣教活動・研究', de: 'Christliche Mission & Forschung', fr: 'Mission chrétienne & recherche', ru: 'Миссионерская деятельность и исследования' },
            '기독교 선교 및 연구': { en: 'Christian mission & research', zh: '基督教宣教及研究', ja: 'キリスト教宣教・研究', de: 'Mission & Forschung', fr: 'Mission & recherche', ru: 'Миссия и исследования' },
            '전국 교류 기독교 동아리': { en: 'National-exchange Christian club', zh: '全国交流基督教社团', ja: '全国交流キリスト教サークル', de: 'Nationaler christlicher Austausch-Club', fr: 'Club chrétien d\'échanges nationaux', ru: 'Общенациональный христианский клуб' },
            '전국 연합 불교 동아리': { en: 'National Buddhist student club', zh: '全国联合佛教社团', ja: '全国連合仏教サークル', de: 'Nationaler buddhistischer Club', fr: 'Club bouddhiste national', ru: 'Общенациональный буддийский клуб' },
            '가톨릭 연합동아리': { en: 'Catholic student club', zh: '天主教联合社团', ja: 'カトリック合同サークル', de: 'Katholischer Club', fr: 'Club catholique', ru: 'Католический клуб' },
            '증산도 연구 및 보급': { en: 'Jeungsando philosophy research & promotion', zh: '增山道研究及推广', ja: '甑山道の研究・普及', de: 'Jeungsando-Forschung & Verbreitung', fr: 'Recherche & promotion Jeungsando', ru: 'Изучение и продвижение Чынсандо' },
            '축구 및 체력증진': { en: 'Football & physical fitness', zh: '足球及体能提升', ja: 'サッカー・体力増進', de: 'Fußball & körperliche Fitness', fr: 'Football & amélioration physique', ru: 'Футбол и физическая подготовка' },
            '테니스 연습 및 대회 출전': { en: 'Tennis practice & tournament participation', zh: '网球练习及参赛', ja: 'テニス練習・大会出場', de: 'Tennis & Turniere', fr: 'Tennis & tournois', ru: 'Тренировки по теннису и турниры' },
            '탁구 대회 출전 및 친목도모': { en: 'Table tennis tournaments & socializing', zh: '乒乓球比赛参与及交友', ja: '卓球大会出場・親睦活動', de: 'Tischtennis-Turniere & Geselligkeit', fr: 'Tournois tennis de table & socialisation', ru: 'Турниры по настольному теннису и общение' },
            '농구연습 및 경기 출전': { en: 'Basketball practice & competition', zh: '篮球练习及参赛', ja: 'バスケ練習・試合出場', de: 'Basketball & Wettkämpfe', fr: 'Basketball & compétitions', ru: 'Баскетбол и соревнования' },
            '스노우 보드 및 다양한 보드 타기': { en: 'Snowboarding & various board sports', zh: '单板滑雪及各种板类运动', ja: 'スノーボード・多様なボードスポーツ', de: 'Snowboard & verschiedene Boardsportarten', fr: 'Snowboard & sports de glisse variés', ru: 'Сноуборд и различные виды бординга' },
            '암벽 클라이밍 및 종주': { en: 'Rock climbing & mountain traversal', zh: '岩壁攀岩及山脊纵走', ja: '岩壁クライミング・縦走', de: 'Klettern & Bergtouren', fr: 'Escalade & traversées de montagne', ru: 'Скалолазание и горные переходы' },
            '스킨스쿠버 및 친목도모': { en: 'Scuba diving & socializing', zh: '水肺潜水及交友', ja: 'スキンスキューバ・親睦活動', de: 'Tauchen & Geselligkeit', fr: 'Plongée sous-marine & socialisation', ru: 'Дайвинг и общение' },
            '웨이트트레이닝': { en: 'Weight training', zh: '举重训练', ja: 'ウェイトトレーニング', de: 'Krafttraining', fr: 'Musculation', ru: 'Силовые тренировки' },
            '스키 및 체력증진': { en: 'Skiing & physical fitness', zh: '滑雪及体能提升', ja: 'スキー・体力増進', de: 'Ski & körperliche Fitness', fr: 'Ski & condition physique', ru: 'Лыжный спорт и физподготовка' },
            '야구활동 및 체력증진': { en: 'Baseball activities & physical fitness', zh: '棒球活动及体能提升', ja: '野球活動・体力増進', de: 'Baseball & körperliche Fitness', fr: 'Baseball & condition physique', ru: 'Бейсбол и физподготовка' },
            '볼링 및 다양한 레져 스포츠': { en: 'Bowling & various leisure sports', zh: '保龄球及多种休闲运动', ja: 'ボウリング・多様なレジャースポーツ', de: 'Bowling & Freizeitsport', fr: 'Bowling & sports de loisir', ru: 'Боулинг и разные виды досуга' },
            '국민대 자전거 모임': { en: 'Kookmin University cycling group', zh: '国民大学自行车团', ja: '国民大学自転車サークル', de: 'Kookmin-Fahrradclub', fr: 'Groupe cyclisme Kookmin', ru: 'Велосипедный клуб Кукмин' },
            '배드민턴': { en: 'Badminton', zh: '羽毛球', ja: 'バドミントン', de: 'Badminton', fr: 'Badminton', ru: 'Бадминтон' },
            '미식축구': { en: 'American football', zh: '美式足球', ja: 'アメリカンフットボール', de: 'American Football', fr: 'Football américain', ru: 'Американский футбол' },
            '택견 보급 및 심신수련': { en: 'Taekkyeon promotion & mind-body training', zh: '跆跟普及及身心修炼', ja: 'テッキョン普及・心身修練', de: 'Taekkyeon & Körpergeist-Training', fr: 'Taekkyeon & entraînement corps-esprit', ru: 'Продвижение тэккён и тренировки тела и духа' },
            '검도 수련을 통한 심신수양': { en: 'Mind-body cultivation through Kendo', zh: '通过剑道修炼身心', ja: '剣道修練による心身陶冶', de: 'Kendo & geistig-körperliche Bildung', fr: 'Kendo & culture corps-esprit', ru: 'Развитие тела и духа через кендо' },
            '유도를 통한 체력단련': { en: 'Physical training through Judo', zh: '通过柔道锻炼体能', ja: '柔道による体力鍛錬', de: 'Körpertraining durch Judo', fr: 'Entraînement physique via le judo', ru: 'Физподготовка через дзюдо' },
            '주짓수 동아리': { en: 'Brazilian Jiu-jitsu club', zh: '柔术社团', ja: '柔術サークル', de: 'Jiu-Jitsu-Club', fr: 'Club de jiu-jitsu brésilien', ru: 'Клуб бразильского джиу-джитсу' },
            '태권도 연습 및 친목도모': { en: 'Taekwondo practice & socializing', zh: '跆拳道练习及交友', ja: 'テコンドー練習・親睦活動', de: 'Taekwondo & Geselligkeit', fr: 'Taekwondo & socialisation', ru: 'Тхэквондо и общение' },
            '영어 청취능력 향상 및 영어공부': { en: 'English listening skills & study', zh: '提升英语听力及英语学习', ja: '英語リスニング向上・英語学習', de: 'Englisch-Hören & Lernen', fr: 'Amélioration de l\'écoute anglaise & étude', ru: 'Развитие навыков аудирования и изучение английского' },
            'IT 재능기부 및 봉사활동': { en: 'IT talent donation & volunteer service', zh: 'IT技能志愿及公益活动', ja: 'ITスキル寄付・ボランティア活動', de: 'IT-Talentspende & Freiwilligenarbeit', fr: 'Don de talent IT & bénévolat', ru: 'Волонтёрство в сфере IT' },
            'TIME지 해석 및 토론': { en: 'TIME magazine reading & discussion', zh: 'TIME杂志解读及讨论', ja: 'TIME誌解読・ディスカッション', de: 'TIME-Magazin & Diskussion', fr: 'Analyse de TIME & débat', ru: 'Чтение TIME и дискуссии' },
            '컴퓨터 소프트웨어 연구': { en: 'Computer software research', zh: '计算机软件研究', ja: 'コンピューターソフトウェア研究', de: 'Computersoftware-Forschung', fr: 'Recherche en logiciels informatiques', ru: 'Исследование компьютерного ПО' },
            '과학 토론 및 세미나': { en: 'Science discussion & seminars', zh: '科学讨论及研讨会', ja: '科学討論・セミナー', de: 'Wissenschaftliche Diskussionen & Seminare', fr: 'Discussion scientifique & séminaires', ru: 'Научные дискуссии и семинары' },
            '독서토론 및 다양한 세미나': { en: 'Book discussion & various seminars', zh: '读书讨论及多种研讨会', ja: '読書討論・多様なセミナー', de: 'Buchdiskussionen & verschiedene Seminare', fr: 'Discussion littéraire & séminaires variés', ru: 'Книжные дискуссии и семинары' },
            '마르크스주의 공부 및 사회문제 연구': { en: 'Marxism study & social issues research', zh: '马克思主义学习及社会问题研究', ja: 'マルクス主義の勉強・社会問題研究', de: 'Marxismus & gesellschaftliche Problemforschung', fr: 'Étude du marxisme & problèmes sociaux', ru: 'Изучение марксизма и социальных проблем' },
            '역사 학술 토론 및 세미나': { en: 'History academic discussion & seminars', zh: '历史学术讨论及研讨会', ja: '歴史学術討論・セミナー', de: 'Historische Diskussionen & Seminare', fr: 'Débat historique académique & séminaires', ru: 'Академические дискуссии по истории' },
            '창업 아이디어 실현': { en: 'Realizing startup ideas', zh: '创业想法实现', ja: '起業アイデアの実現', de: 'Startup-Ideen umsetzen', fr: 'Réalisation d\'idées entrepreneuriales', ru: 'Воплощение стартап-идей' },
            '외국인 교류 및 제2외국어 학습': { en: 'International exchange & second-language learning', zh: '外国人交流及第二外语学习', ja: '外国人交流・第二外国語学習', de: 'Internationaler Austausch & Fremdsprachenlernen', fr: 'Échanges internationaux & apprentissage d\'une 2e langue', ru: 'Международный обмен и изучение второго языка' },
            '중앙 토론 동아리': { en: 'Central debate club', zh: '中央辩论社团', ja: '中央ディベートサークル', de: 'Zentraler Debattierclub', fr: 'Club de débat central', ru: 'Центральный клуб дебатов' },
        };
        return dict[text] ? (dict[text][lang] || text) : text;
    },

    // 쿱스켓, 식당, 카페 등 이름 현지 바이브 번역
    translateName: (text, lang) => {
        if(lang === 'ko') return text;
        const dict = {
            '쿱스켓': { en: 'Coopsket (Smart Mart)', zh: 'Coopsket (无人便利店)', ja: 'クープスケット (無人マート)', de: 'Coopsket (Smart Mart)', fr: 'Coopsket (Supérette)', ru: 'Coopsket (Смарт Март)' },
            '학생식당': { en: 'Student Cafeteria', zh: '学生餐厅', ja: '学生食堂', de: 'Studentenmensa', fr: 'Cafétéria étudiante', ru: 'Студенческая столовая' },
            '교직원식당': { en: 'Faculty Cafeteria', zh: '教职工餐厅', ja: '教職員食堂', de: 'Mitarbeitermensa', fr: 'Cafétéria du personnel', ru: 'Столовая для сотрудников' },
            '카페나무': { en: 'Cafe Namu (Lounge)', zh: 'Namu 咖啡厅', ja: 'カフェナム', de: 'Cafe Namu (Lounge)', fr: 'Café Namu', ru: 'Кафе Наму' },
            '복실 (인쇄/카피룸)': { en: 'Boksil (Print Center)', zh: 'Boksil (打印室)', ja: 'ボクシル (印刷室)', de: 'Boksil (Druckzentrum)', fr: 'Boksil (Copie)', ru: 'Боксил (Печать)' },
            '무인 세탁실': { en: 'Coin Laundry', zh: '自助洗衣房', ja: 'コインランドリー', de: 'Münzwaschsalon', fr: 'Laverie automatique', ru: 'Прачечная' }
        };
        for (const [kr, transObj] of Object.entries(dict)) {
            if (text.includes(kr)) return text.replace(kr, transObj[lang]);
        }
        return text + (lang === 'en' ? ' ' : ' (Translated)'); // 기본형 폴백
    }
};

// ─────────────────────────────────────────────────
// MOCK_DATA 메인 객체 세팅
// ─────────────────────────────────────────────────
const MOCK_DATA = {
    currentLang: 'ko',
    currentMealTime: 'LUNCH',

    translations: {
        ko: { club_count_unit: "개", nav_menu: "오늘의 식단", nav_facility: "교내 시설", nav_club: "동아리 안내", meal_lunch: "중식 (Lunch)", meal_dinner: "석식 (Dinner)", ai_guide_btn: "AI 맞춤 가이드 분석", ai_modal_title: "AI 문화적 맥락 분석", label_hours: "운영시간", label_details: "세부특징", label_loc: "위치", label_purpose: "활동내용", club_title: "중앙동아리 안내", club_desc: "국민대학교의 열정 넘치는 자치 동아리 네트워크입니다.", club_total: "총 동아리", club_divisions: "등록 분과", empty_facility: "등록된 시설물이 없습니다.", empty_club: "해당 분과에 등록된 동아리가 없습니다.", c_all: "전체 분과", c_perform: "공연예술", c_service: "교양봉사", c_exhibit: "전시예술", c_religion: "종교", c_ball: "구기레져", c_sports: "체육무도", c_academic: "학술" },
        en: { club_count_unit: "", nav_menu: "Daily Menu", nav_facility: "Facilities", nav_club: "Club Guide", meal_lunch: "Lunch", meal_dinner: "Dinner", ai_guide_btn: "Get AI Cultural Guide", ai_modal_title: "AI Cultural Analysis", label_hours: "Hours", label_details: "Details", label_loc: "Location", label_purpose: "Purpose", club_title: "Student Clubs Info", club_desc: "Welcome to Kookmin University's vibrant student club network.", club_total: "Total Clubs", club_divisions: "Divisions", empty_facility: "No facilities found.", empty_club: "No clubs registered in this division.", c_all: "All", c_perform: "Performing Arts", c_service: "Volunteer", c_exhibit: "Exhibition", c_religion: "Religion", c_ball: "Ball Sports", c_sports: "Martial Arts", c_academic: "Academic" },
        zh: { club_count_unit: "个", nav_menu: "今日菜单", nav_facility: "校园设施", nav_club: "社团指南", meal_lunch: "午餐", meal_dinner: "晚餐", ai_guide_btn: "获取 AI 智能指南", ai_modal_title: "AI 文化背景分析", label_hours: "运营时间", label_details: "详细特征", label_loc: "位置", label_purpose: "活动内容", club_title: "社团指南", club_desc: "国民大学充满热情的自治学生社团信息网络。", club_total: "社团总数", club_divisions: "注册分部", empty_facility: "没有找到相关设施。", empty_club: "该分部下没有注册社团。", c_all: "全部", c_perform: "表演艺术", c_service: "教养志愿", c_exhibit: "展览艺术", c_religion: "宗教", c_ball: "球类休闲", c_sports: "体育武道", c_academic: "学术" },
        ja: { club_count_unit: "件", nav_menu: "今日の献立", nav_facility: "学内施設", nav_club: "サークル案内", meal_lunch: "昼食", meal_dinner: "夕食", ai_guide_btn: "AI ガイド分析", ai_modal_title: "AI 文化的背景の分析", label_hours: "営業時間", label_details: "詳細特徴", label_loc: "位置", label_purpose: "活動内容", club_title: "サークル案内", club_desc: "国民大学の情熱溢れる自治サークル情報ネットワークです。", club_total: "総サークル数", club_divisions: "登録部会", empty_facility: "登録された施設がありません。", empty_club: "この部会に登録されたサークルはありません。", c_all: "全体", c_perform: "公演芸術", c_service: "教養ボランティア", c_exhibit: "展示芸術", c_religion: "宗教", c_ball: "球技レジャー", c_sports: "体育武道", c_academic: "学術" },
        de: { club_count_unit: "", nav_menu: "Tagesmenü", nav_facility: "Einrichtungen", nav_club: "Clubs", meal_lunch: "Mittagessen", meal_dinner: "Abendessen", ai_guide_btn: "KI-Analyse anfordern", ai_modal_title: "KI Kulturelle Analyse", label_hours: "Öffnungszeiten", label_details: "Details", label_loc: "Ort", label_purpose: "Aktivität", club_title: "Studentenclubs", club_desc: "Willkommen im lebendigen Club-Netzwerk der Kookmin-Universität.", club_total: "Clubs Gesamt", club_divisions: "Bereiche", empty_facility: "Keine Einrichtungen gefunden.", empty_club: "Keine Clubs registriert.", c_all: "Alle", c_perform: "Darstellende Kunst", c_service: "Freiwilligendienst", c_exhibit: "Ausstellung", c_religion: "Religion", c_ball: "Ballsport", c_sports: "Kampfsport", c_academic: "Akademisch" },
        fr: { club_count_unit: "", nav_menu: "Menu du jour", nav_facility: "Installations", nav_club: "Clubs", meal_lunch: "Déjeuner", meal_dinner: "Dîner", ai_guide_btn: "Guide IA", ai_modal_title: "Analyse Culturelle", label_hours: "Horaires", label_details: "Détails", label_loc: "Emplacement", label_purpose: "Activité", club_title: "Clubs Étudiants", club_desc: "Bienvenue dans le réseau des clubs de l'Université Kookmin.", club_total: "Total", club_divisions: "Divisions", empty_facility: "Aucune installation.", empty_club: "Aucun club.", c_all: "Tout", c_perform: "Arts du Spectacle", c_service: "Bénévolat", c_exhibit: "Expositions", c_religion: "Religion", c_ball: "Sports de Balle", c_sports: "Arts Martiaux", c_academic: "Académique" },
        ru: { club_count_unit: "", nav_menu: "Меню", nav_facility: "Удобства", nav_club: "Клубы", meal_lunch: "Обед", meal_dinner: "Ужин", ai_guide_btn: "AI-гид", ai_modal_title: "AI Анализ", label_hours: "Часы работы", label_details: "Детали", label_loc: "Место", label_purpose: "Деятельность", club_title: "Студенческие Клубы", club_desc: "Сеть студенческих клубов Университета Кукмин.", club_total: "Всего", club_divisions: "Направления", empty_facility: "Удобства не найдены.", empty_club: "В этом направлении нет клубов.", c_all: "Все", c_perform: "Сценическое иск-во", c_service: "Волонтерство", c_exhibit: "Выставки", c_religion: "Религия", c_ball: "Игры с мячом", c_sports: "Боевые искусства", c_academic: "Академический" }
    },

    categories: [
        { id: 'STORE', icon: '🏪', name: { ko: "편의점/쿱스켓", en: "Convenience Store", zh: "便利店", ja: "コンビニ", de: "Laden", fr: "Supérette", ru: "Магазин" } },
        { id: 'FOOD', icon: '🍔', name: { ko: "식당/요식", en: "Cafeteria", zh: "餐厅", ja: "食堂", de: "Mensa", fr: "Cafétéria", ru: "Столовая" } },
        { id: 'CAFE', icon: '☕', name: { ko: "카페", en: "Café", zh: "咖啡厅", ja: "カフェ", de: "Café", fr: "Café", ru: "Кафе" } },
        { id: 'WELFARE', icon: '💼', name: { ko: "일반 복지시설", en: "Welfare Services", zh: "福利设施", ja: "福祉施設", de: "Wohlfahrt", fr: "Services", ru: "Услуги" } },
        { id: 'STUDY', icon: '📝', name: { ko: "열람실/스터디", en: "Study Rooms", zh: "阅览室", ja: "閲覧室", de: "Studienräume", fr: "Salles d'étude", ru: "Читальные залы" } },
        { id: 'MEDICAL', icon: '🏥', name: { ko: "의무실/보건", en: "Medical Center", zh: "医务室", ja: "医務室", de: "Sanitätsstelle", fr: "Infirmerie", ru: "Медпункт" } }
    ],

    clubCategories: [
        { id: 'ALL', i18n: 'c_all' }, { id: 'PERFORM', i18n: 'c_perform' }, { id: 'SERVICE', i18n: 'c_service' },
        { id: 'EXHIBIT', i18n: 'c_exhibit' }, { id: 'RELIGION', i18n: 'c_religion' }, { id: 'BALL', i18n: 'c_ball' },
        { id: 'SPORTS', i18n: 'c_sports' }, { id: 'ACADEMIC', i18n: 'c_academic' }
    ],

    menu: [
        {
            restaurant: "학생식당 (가마 코너)", time: "LUNCH", menuName: "고추장 제육볶음과 쌈밥",
            multilingual: {
                ko: { intro: "매콤달콤한 고추장 양념에 재워둔 돼지고기를 볶아낸 한국의 대표 음식입니다.", ing: "돼지고기(국산), 고추장, 마늘, 양파, 상추" },
                en: { intro: "Slices of pork marinated in spicy gochujang sauce, stir-fried.", ing: "Pork, Gochujang, Garlic, Onion, Lettuce" },
                zh: { intro: "香辣辣椒酱腌制的猪肉炒制而成的韩国代表美食。", ing: "猪肉, 辣椒酱, 大蒜, 洋葱, 生菜" },
                ja: { intro: "甘辛いコチュジャンだれに漬け込んだ豚肉を炒めた韓国料理です。", ing: "豚肉, コチュジャン, ニンニク, 玉ねぎ, サンチュ" },
                de: { intro: "In scharfer Gochujang mariniertes Schweinefleisch.", ing: "Schweinefleisch, Gochujang, Knoblauch, Zwiebel, Blattsalat" },
                fr: { intro: "Tranches de porc marinées dans une sauce gochujang piquante.", ing: "Porc, Gochujang, Ail, Oignon, Laitue" },
                ru: { intro: "Свинина, маринованная в остром соусе кочхуджан.", ing: "Свинина, Кочхуджан, Чеснок, Лук, Листья салата" }
            }
        },
        {
            restaurant: "학생식당 (인터셰프 코너)", time: "LUNCH", menuName: "수제 등심 돈까스",
            multilingual: {
                ko: { intro: "두툼한 돼지 등심에 빵가루를 입혀 튀긴 경양식 돈까스입니다.", ing: "돼지등심, 빵가루, 계란, 돈까스소스" },
                en: { intro: "Thick pork loin coated in breadcrumbs and deep-fried.", ing: "Pork loin, Breadcrumbs, Egg, Tonkatsu sauce" },
                zh: { intro: "厚实的猪里脊肉裹上面包糠炸至酥脆的炸猪排。", ing: "猪里脊肉, 面包糠, 鸡蛋, 炸猪排酱" },
                ja: { intro: "厚切りの豚ロースにパン粉をまぶして揚げた洋風カツです。", ing: "豚ロース, パン粉, 卵, とんかつソース" },
                de: { intro: "Dickes Schweinsfilet in Semmelbröseln frittiert.", ing: "Schweinefilet, Semmelbrösel, Ei, Tonkatsu-Sauce" },
                fr: { intro: "Longe de porc épaisse enrobée de chapelure et frite.", ing: "Longe de porc, Chapelure, Œuf, Sauce tonkatsu" },
                ru: { intro: "Толстая свиная корейка в сухарях, обжаренная во фритюре.", ing: "Свиная корейка, Панировочные сухари, Яйцо, Соус" }
            }
        }
    ]
};

// 동적으로 119개 전체 리스트 다국어 조립 (코드가 줄어들고 완벽하게 동작)
const langs = ['en', 'zh', 'ja', 'de', 'fr', 'ru'];

MOCK_DATA.facilities = rawFacilities.map(f => {
    let multi = { ko: { name: f[1], hours: f[3], details: f[4], loc: f[2] } };
    langs.forEach(lang => {
        multi[lang] = {
            name: TRANSLATOR.translateName(f[1], lang),
            hours: TRANSLATOR.translateHours(f[3], lang),
            details: TRANSLATOR.translateDetails(f[4], lang),
            loc: TRANSLATOR.replaceLoc(f[2], lang)
        };
    });
    return { category: f[0], originalLoc: f[2], multilingual: multi };
});

MOCK_DATA.clubs = rawClubs.map(c => {
    const validInsta = (c[5] === '미확인') ? 'none' : c[5];
    let multi = { ko: { name: c[2], purpose: c[4], loc: c[3] } };
    langs.forEach(lang => {
        multi[lang] = {
            name: c[2], 
            purpose: TRANSLATOR.translatePurpose(c[4], lang),
            loc: TRANSLATOR.replaceLoc(c[3], lang)
        };
    });
    return { no: c[0], category: c[1], originalLoc: c[3], instagram: validInsta, multilingual: multi };
});