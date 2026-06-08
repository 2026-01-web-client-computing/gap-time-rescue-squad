const recommendForm = document.querySelector("#recommendForm");
const resultBox = document.querySelector("#resultBox");
const recommendLayout = document.querySelector(".recommend-layout");

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

document.addEventListener("i18n:change", () => {
  if (!resultBox.classList.contains("empty")) {
    submitRecommendation();
  }
});

function submitRecommendation() {
  const time = document.querySelector("#time").value;
  const activity = document.querySelector("#activity").value;
  const location = document.querySelector("#location").value;
  const language = normalizeLanguage(document.querySelector("#lang-selector")?.value || "ko");

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
      reason: place.isSameBuilding ? getI18nDict(language).reason_same_building : getI18nDict(language).reason_other_building
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
    reason: getI18nDict(language).reason_walk
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
      reason: getI18nDict(language).reason_walk
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
  return normalizeI18nLanguage(language);
}

function renderError(language) {
  recommendLayout?.classList.remove("is-result-empty");
  resultBox.removeAttribute("data-i18n");
  resultBox.classList.remove("empty");
  resultBox.innerHTML = `<div class="no-result"><p>${getI18nDict(language).facility_data_error}</p></div>`;
}

function renderResult(resultList, language) {
  const text = getI18nDict(language);
  recommendLayout?.classList.remove("is-result-empty");
  resultBox.removeAttribute("data-i18n");
  resultBox.classList.remove("empty");

  if (resultList.length === 0) {
    resultBox.innerHTML = `
      <div class="no-result">
        <h3>${text.no_result_title}</h3>
        <p>${text.no_result_desc}</p>
      </div>
    `;
    return;
  }

  resultBox.innerHTML = resultList.map((place) => {
    const i18n = place.multilingual[language] || place.multilingual.ko;

    return `
      <article class="card place-card">
        <span class="place-badge">${text.result_badge}</span>
        <h3>${i18n.name}</h3>
        <p><strong>${text.result_location_label}</strong> ${i18n.loc}</p>
        <p><strong>${text.result_hours_label}</strong> ${i18n.hours}</p>
        <p><strong>${text.result_detail_label}</strong> ${i18n.details}</p>
        <div class="place-tip">
          <strong>${text.result_reason_label}</strong> ${place.reason}
        </div>
      </article>
    `;
  }).join("");
}
