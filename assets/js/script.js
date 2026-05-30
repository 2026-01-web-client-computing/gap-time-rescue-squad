const recommendForm = document.querySelector("#recommendForm");
const resultBox = document.querySelector("#resultBox");

const places = [
  {
    name: "성곡도서관",
    type: "study",
    location: "library",
    time: ["middle", "long"],
    description: "조용하게 공부하거나 과제를 하기 좋은 공간입니다.",
    tip: "시험 기간에는 사람이 많을 수 있으니 조금 일찍 이동하는 것을 추천합니다.",
    enDescription: "A quiet place for studying or working on assignments.",
    enTip: "It can get crowded during exam periods, so arriving early is recommended."
  },
  {
    name: "학생회관",
    type: "meal",
    location: "student",
    time: ["short", "middle"],
    description: "공강 중 빠르게 식사하거나 친구를 만나기 좋은 장소입니다.",
    tip: "점심시간에는 붐빌 수 있으니 공강 시간이 짧다면 미리 메뉴를 정해두세요.",
    enDescription: "A good place to have a quick meal or meet friends.",
    enTip: "It can be crowded at lunchtime, so choose your menu in advance if your break is short."
  },
  {
    name: "교내 카페",
    type: "cafe",
    location: "student",
    time: ["short", "middle", "long"],
    description: "커피를 마시며 가볍게 쉬거나 노트북 작업을 하기 좋은 공간입니다.",
    tip: "콘센트가 있는 자리를 먼저 확인해보세요.",
    enDescription: "A nice place to relax with coffee or work on your laptop.",
    enTip: "Check for seats with power outlets first."
  },
  {
    name: "북악관 휴게 공간",
    type: "rest",
    location: "north",
    time: ["short", "middle"],
    description: "짧은 공강 시간에 잠깐 앉아서 쉬기 좋은 공간입니다.",
    tip: "다음 수업이 북악관 근처라면 이동 시간을 줄일 수 있습니다.",
    enDescription: "A convenient place to rest during a short break.",
    enTip: "If your next class is near Bugak Hall, you can save travel time."
  },
  {
    name: "캠퍼스 산책로",
    type: "walk",
    location: "mainGate",
    time: ["middle", "long"],
    description: "답답할 때 가볍게 걷기 좋은 공강 코스입니다.",
    tip: "날씨가 좋은 날에는 친구와 함께 걷기 좋습니다.",
    enDescription: "A good walking route when you need some fresh air.",
    enTip: "It is especially nice to walk with friends on sunny days."
  },
  {
    name: "공학관 주변 휴게 공간",
    type: "rest",
    location: "engineering",
    time: ["short", "middle"],
    description: "공학관 근처 수업 사이에 잠깐 쉬기 좋은 공간입니다.",
    tip: "짧은 공강이라면 멀리 이동하지 않는 것이 좋습니다.",
    enDescription: "A useful rest area between classes near the Engineering Building.",
    enTip: "For a short break, staying nearby is usually better."
  }
];

recommendForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const time = document.querySelector("#time").value;
  const activity = document.querySelector("#activity").value;
  const location = document.querySelector("#location").value;
  const language = document.querySelector("#language").value;

  const matchedPlaces = places.filter((place) => {
    return (
      place.type === activity &&
      place.time.includes(time)
    );
  });

  const nearbyPlaces = matchedPlaces.filter((place) => {
    return place.location === location;
  });

  const finalPlaces = nearbyPlaces.length > 0 ? nearbyPlaces : matchedPlaces;

  renderResult(finalPlaces, language);
});

function renderResult(resultList, language) {
  resultBox.classList.remove("empty");

  if (resultList.length === 0) {
    resultBox.innerHTML = `
      <div class="no-result">
        <h3>추천 결과가 없습니다.</h3>
        <p>다른 조건을 선택해 다시 추천 받아보세요.</p>
      </div>
    `;
    return;
  }

  resultBox.innerHTML = resultList.map((place) => {
    const description = language === "en" ? place.enDescription : place.description;
    const tip = language === "en" ? place.enTip : place.tip;

    return `
      <article class="place-card">
        <span class="place-badge">추천 장소</span>
        <h3>${place.name}</h3>
        <p>${description}</p>
        <div class="place-tip">
          꿀팁! ${tip}
        </div>
      </article>
    `;
  }).join("");
}