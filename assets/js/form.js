const recommendForm = document.querySelector("#recommendForm");
const resultBox = document.querySelector("#resultBox");

const SUPPORTED_LANGS = ["ko", "en", "zh", "ja", "de", "fr", "ru"];

const UI_TEXT = {
  ko: {
    resultBadge: "추천 장소",
    locationLabel: "위치",
    hoursLabel: "운영시간",
    detailLabel: "특징",
    reasonLabel: "추천 이유",
    sameBuilding: "현재 위치와 같은 건물이라 짧은 공강에 이동 부담이 적습니다.",
    otherBuilding: "공강 시간이 충분해서 다른 건물까지 추천 범위를 넓혔습니다.",
    walkReason: "가볍게 움직이며 환기하기 좋은 산책 코스입니다.",
    noTitle: "추천 결과가 없습니다.",
    noDesc: "다른 조건을 선택해 다시 추천 받아보세요.",
    dataError: "시설 데이터를 불러오지 못했습니다. form.html에서 data.js가 script.js보다 먼저 연결되어 있는지 확인하세요."
  },
  en: {
    resultBadge: "Recommended Place",
    locationLabel: "Location",
    hoursLabel: "Hours",
    detailLabel: "Details",
    reasonLabel: "Why recommended",
    sameBuilding: "It is in your current building, so it is suitable for a short break.",
    otherBuilding: "Your break is long enough, so places in other buildings are included.",
    walkReason: "A light walking route for fresh air during your break.",
    noTitle: "No recommendation found.",
    noDesc: "Try again with different conditions.",
    dataError: "Facility data could not be loaded. Check that data.js is linked before script.js in form.html."
  },
  zh: {
    resultBadge: "推荐地点",
    locationLabel: "位置",
    hoursLabel: "营业时间",
    detailLabel: "特点",
    reasonLabel: "推荐理由",
    sameBuilding: "该地点与当前位置在同一栋楼，适合短暂空堂时间。",
    otherBuilding: "空堂时间较充足，因此也推荐其他楼栋。",
    walkReason: "适合在空堂时间轻松散步、转换心情的路线。",
    noTitle: "没有找到推荐结果。",
    noDesc: "请更换条件后重新尝试。",
    dataError: "无法加载设施数据。请确认 form.html 中 data.js 位于 script.js 之前。"
  },
  ja: {
    resultBadge: "おすすめ場所",
    locationLabel: "位置",
    hoursLabel: "営業時間",
    detailLabel: "特徴",
    reasonLabel: "おすすめ理由",
    sameBuilding: "現在地と同じ建物にあるため、短い空き時間に適しています。",
    otherBuilding: "空き時間に余裕があるため、他の建物も含めておすすめします。",
    walkReason: "空き時間に気分転換しやすい軽い散歩コースです。",
    noTitle: "おすすめ結果がありません。",
    noDesc: "別の条件で再度試してください。",
    dataError: "施設データを読み込めません。form.htmlでdata.jsがscript.jsより先に読み込まれているか確認してください。"
  },
  de: {
    resultBadge: "Empfohlener Ort",
    locationLabel: "Ort",
    hoursLabel: "Öffnungszeiten",
    detailLabel: "Details",
    reasonLabel: "Empfehlungsgrund",
    sameBuilding: "Der Ort liegt im selben Gebäude und passt daher gut zu einer kurzen Pause.",
    otherBuilding: "Die Pause ist lang genug, daher werden auch andere Gebäude empfohlen.",
    walkReason: "Eine leichte Route, um während der Pause frische Luft zu bekommen.",
    noTitle: "Keine Empfehlung gefunden.",
    noDesc: "Versuche es mit anderen Bedingungen erneut.",
    dataError: "Die Einrichtungsdaten konnten nicht geladen werden. Prüfe, ob data.js vor script.js eingebunden ist."
  },
  fr: {
    resultBadge: "Lieu recommandé",
    locationLabel: "Emplacement",
    hoursLabel: "Horaires",
    detailLabel: "Détails",
    reasonLabel: "Raison",
    sameBuilding: "Ce lieu est dans le même bâtiment, donc adapté à une courte pause.",
    otherBuilding: "La pause est assez longue, donc d'autres bâtiments sont aussi proposés.",
    walkReason: "Un petit itinéraire agréable pour prendre l'air pendant la pause.",
    noTitle: "Aucune recommandation trouvée.",
    noDesc: "Essayez avec d'autres conditions.",
    dataError: "Impossible de charger les données. Vérifiez que data.js est chargé avant script.js."
  },
  ru: {
    resultBadge: "Рекомендованное место",
    locationLabel: "Место",
    hoursLabel: "Часы работы",
    detailLabel: "Детали",
    reasonLabel: "Причина",
    sameBuilding: "Это место находится в том же здании, поэтому подходит для короткого перерыва.",
    otherBuilding: "Перерыв достаточно длинный, поэтому включены и другие здания.",
    walkReason: "Лёгкий маршрут для прогулки и смены обстановки.",
    noTitle: "Рекомендации не найдены.",
    noDesc: "Попробуйте выбрать другие условия.",
    dataError: "Не удалось загрузить данные. Проверьте, что data.js подключён перед script.js."
  }
};

const ACTIVITY_CATEGORY_RULES = {
  rest: ["CAFE"],
  cafe: ["CAFE"],
  meal: ["FOOD", "STORE"],
  study: ["STUDY"],
  walk: ["WALK"]
};

const BUILDING_ALIASES = {
  "종합복지관": ["종합복지관", "복지관"],
  "복지관": ["종합복지관", "복지관"],
  "공학관": ["공학관"],
  "과학관": ["과학관"],
  "법학관": ["법학관"],
  "북악관": ["북악관"],
  "생활관": ["생활관"],
  "예술관": ["예술관"],
  "성곡도서관": ["성곡도서관", "도서관"],
  "경상관": ["경상관"],
  "경영관": ["경영관", "콘서트홀"],
  "조형관": ["조형관"],
  "미래관": ["미래관"],
  "콘서트홀": ["콘서트홀", "경영관"]
};

const WALK_PLACES = [
  {
    building: "북악관",
    multilingual: {
      ko: { name: "북악관 주변 산책 코스", loc: "북악관 주변", hours: "상시 가능", details: "건물 주변을 짧게 걷기 좋은 코스" },
      en: { name: "Bugak Hall Walking Route", loc: "Around Bugak Hall", hours: "Always available", details: "A short walking route near the building" },
      zh: { name: "北岳馆周边散步路线", loc: "北岳馆周边", hours: "随时可用", details: "适合短时间散步的路线" },
      ja: { name: "北岳館周辺散歩コース", loc: "北岳館周辺", hours: "常時利用可能", details: "短時間で歩きやすいコース" },
      de: { name: "Spazierroute um Bugak Hall", loc: "Rund um Bugak Hall", hours: "Jederzeit", details: "Kurze Route in Gebäudenähe" },
      fr: { name: "Parcours autour de Bugak Hall", loc: "Autour de Bugak Hall", hours: "Toujours accessible", details: "Petit itinéraire près du bâtiment" },
      ru: { name: "Маршрут у Bugak Hall", loc: "Вокруг Bugak Hall", hours: "Всегда доступно", details: "Короткий маршрут рядом со зданием" }
    }
  },
  {
    building: "성곡도서관",
    multilingual: {
      ko: { name: "성곡도서관 리프레시 산책", loc: "성곡도서관 주변", hours: "상시 가능", details: "공부 중 머리를 식히기 좋은 도서관 주변 산책" },
      en: { name: "Sunggok Library Refresh Walk", loc: "Around Sunggok Library", hours: "Always available", details: "Good for a quick reset between study sessions" },
      zh: { name: "成谷图书馆放松散步", loc: "成谷图书馆周边", hours: "随时可用", details: "适合学习间隙放松" },
      ja: { name: "成谷図書館リフレッシュ散歩", loc: "成谷図書館周辺", hours: "常時利用可能", details: "勉強の合間の気分転換に適した散歩" },
      de: { name: "Sunggok-Bibliothek Erfrischungsweg", loc: "Um die Sunggok-Bibliothek", hours: "Jederzeit", details: "Gut für eine kurze Lernpause" },
      fr: { name: "Balade détente autour de la bibliothèque", loc: "Autour de la bibliothèque Sunggok", hours: "Toujours accessible", details: "Idéal pour une pause entre deux sessions d'étude" },
      ru: { name: "Прогулка у библиотеки Sunggok", loc: "Вокруг библиотеки Sunggok", hours: "Всегда доступно", details: "Хорошо для перерыва между занятиями" }
    }
  },
  {
    building: "종합복지관",
    multilingual: {
      ko: { name: "복지관 주변 짧은 산책", loc: "종합복지관 주변", hours: "상시 가능", details: "식사나 카페 이용 전후에 가볍게 걷기 좋은 코스" },
      en: { name: "Welfare Center Short Walk", loc: "Around the Welfare Center", hours: "Always available", details: "A light walk before or after food or coffee" },
      zh: { name: "综合福利馆短途散步", loc: "综合福利馆周边", hours: "随时可用", details: "适合吃饭或喝咖啡前后轻松散步" },
      ja: { name: "福祉館周辺ショート散歩", loc: "総合福祉館周辺", hours: "常時利用可能", details: "食事やカフェの前後に軽く歩きやすいコース" },
      de: { name: "Kurzer Weg am Welfare Center", loc: "Um das Welfare Center", hours: "Jederzeit", details: "Leichter Spaziergang vor oder nach Essen/Kaffee" },
      fr: { name: "Petite balade au centre social", loc: "Autour du centre social", hours: "Toujours accessible", details: "Promenade légère avant/après repas ou café" },
      ru: { name: "Короткая прогулка у Welfare Center", loc: "Вокруг Welfare Center", hours: "Всегда доступно", details: "Лёгкая прогулка до или после еды/кофе" }
    }
  }
];

if (recommendForm) {
  recommendForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitRecommendation();
  });
}

const languageSelect = document.querySelector("#language");
if (languageSelect) {
  languageSelect.addEventListener("change", () => {
    if (!resultBox.classList.contains("empty")) {
      submitRecommendation();
    }
  });
}

function submitRecommendation() {
  const time = document.querySelector("#time").value;
  const activity = document.querySelector("#activity").value;
  const location = document.querySelector("#location").value;
  const language = normalizeLanguage(document.querySelector("#language").value);

  if (typeof MOCK_DATA === "undefined" || !Array.isArray(MOCK_DATA.facilities)) {
    renderError(language);
    return;
  }

  const recommendations = recommendPlaces({ time, activity, location, language });
  renderResult(recommendations, language);
}

function recommendPlaces({ time, activity, location, language }) {
  if (activity === "walk") {
    return recommendWalkPlaces(time, location, language);
  }

  const targetCategories = ACTIVITY_CATEGORY_RULES[activity] || [];
  const sameBuildingOnly = time === "short";

  const candidates = MOCK_DATA.facilities
    .filter((place) => targetCategories.includes(place.category))
    .map((place) => ({
      ...place,
      building: getBuildingFromLocation(place.originalLoc),
      isSameBuilding: isSameBuilding(place.originalLoc, location)
    }))
    .filter((place) => !sameBuildingOnly || place.isSameBuilding)
    .sort((a, b) => {
      if (a.isSameBuilding !== b.isSameBuilding) {
        return a.isSameBuilding ? -1 : 1;
      }
      return categoryPriority(a.category, targetCategories) - categoryPriority(b.category, targetCategories);
    })
    .slice(0, 5)
    .map((place) => ({
      ...place,
      reason: place.isSameBuilding ? UI_TEXT[language].sameBuilding : UI_TEXT[language].otherBuilding
    }));

  return candidates;
}

function recommendWalkPlaces(time, location, language) {
  const sameBuildingOnly = time === "short";

  let candidates = WALK_PLACES.map((place) => ({
    ...place,
    category: "WALK",
    originalLoc: place.multilingual.ko.loc,
    isSameBuilding: isSameBuilding(place.building, location),
    reason: UI_TEXT[language].walkReason
  }));

  if (sameBuildingOnly) {
    candidates = candidates.filter((place) => place.isSameBuilding);
  }

  if (candidates.length === 0 && sameBuildingOnly) {
    candidates = WALK_PLACES.slice(0, 1).map((place) => ({
      ...place,
      category: "WALK",
      originalLoc: place.multilingual.ko.loc,
      isSameBuilding: false,
      reason: UI_TEXT[language].walkReason
    }));
  }

  return candidates.sort((a, b) => Number(b.isSameBuilding) - Number(a.isSameBuilding)).slice(0, 3);
}

function getBuildingFromLocation(locationText) {
  return Object.keys(BUILDING_ALIASES).find((building) => {
    return BUILDING_ALIASES[building].some((alias) => locationText.includes(alias));
  }) || "기타";
}

function isSameBuilding(placeLocation, selectedBuilding) {
  const aliases = BUILDING_ALIASES[selectedBuilding] || [selectedBuilding];
  return aliases.some((alias) => placeLocation.includes(alias));
}

function categoryPriority(category, targetCategories) {
  const index = targetCategories.indexOf(category);
  return index === -1 ? 99 : index;
}

function normalizeLanguage(language) {
  return SUPPORTED_LANGS.includes(language) ? language : "ko";
}

function renderError(language) {
  resultBox.removeAttribute("data-i18n");
  resultBox.classList.remove("empty");
  resultBox.innerHTML = `<div class="no-result"><p>${UI_TEXT[language].dataError}</p></div>`;
}

function renderResult(resultList, language) {
  const text = UI_TEXT[language];
  resultBox.removeAttribute("data-i18n");
  resultBox.classList.remove("empty");

  if (resultList.length === 0) {
    resultBox.innerHTML = `
      <div class="no-result">
        <h3>${text.noTitle}</h3>
        <p>${text.noDesc}</p>
      </div>
    `;
    return;
  }

  resultBox.innerHTML = resultList.map((place) => {
    const i18n = place.multilingual[language] || place.multilingual.ko;

    return `
      <article class="place-card">
        <span class="place-badge">${text.resultBadge}</span>
        <h3>${i18n.name}</h3>
        <p><strong>${text.locationLabel}</strong> ${i18n.loc}</p>
        <p><strong>${text.hoursLabel}</strong> ${i18n.hours}</p>
        <p><strong>${text.detailLabel}</strong> ${i18n.details}</p>
        <div class="place-tip">
          <strong>${text.reasonLabel}</strong> ${place.reason}
        </div>
      </article>
    `;
  }).join("");
}
