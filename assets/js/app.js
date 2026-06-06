/**
 * [GRASP Pattern: Controller]
 * 오타나 데이터 누락에도 절대 멈추지 않는 방어적 렌더링을 적용한 컨트롤러입니다.
 *
 * main.html의 로고, 상단 공통 네비게이션까지 언어 변경이 적용되도록
 * PAGE_TRANSLATIONS를 추가했습니다.
 */

/* main.html 고정 텍스트 번역 */
const PAGE_TRANSLATIONS = {
  ko: {
    page_title: "공강구조대 | 메인",
    site_logo: "공강구조대",
    site_home: "홈",
    site_team: "팀원 소개",
    site_game: "게임",
    site_form: "공강 추천",
    app_logo: "공강구조대",
    ai_analyzing: "분석 중..."
  },

  en: {
    page_title: "Gap Time Rescue Squad | Main",
    site_logo: "Gap Time Rescue Squad",
    site_home: "Home",
    site_team: "Team",
    site_game: "Game",
    site_form: "Gap Recommendation",
    app_logo: "Gap Time Rescue Squad",
    ai_analyzing: "Analyzing..."
  },

  zh: {
    page_title: "空课救援队 | 首页",
    site_logo: "空课救援队",
    site_home: "首页",
    site_team: "团队介绍",
    site_game: "游戏",
    site_form: "空课推荐",
    app_logo: "空课救援队",
    ai_analyzing: "分析中..."
  },

  ja: {
    page_title: "空きコマ救助隊 | メイン",
    site_logo: "空きコマ救助隊",
    site_home: "ホーム",
    site_team: "チーム紹介",
    site_game: "ゲーム",
    site_form: "空きコマ推薦",
    app_logo: "空きコマ救助隊",
    ai_analyzing: "分析中..."
  },

  de: {
    page_title: "Freistunden-Rettungsteam | Hauptseite",
    site_logo: "Freistunden-Rettungsteam",
    site_home: "Startseite",
    site_team: "Team",
    site_game: "Spiel",
    site_form: "Freistunden-Tipp",
    app_logo: "Freistunden-Rettungsteam",
    ai_analyzing: "Analyse läuft..."
  },

  fr: {
    page_title: "Secours temps libre | Accueil",
    site_logo: "Secours temps libre",
    site_home: "Accueil",
    site_team: "Équipe",
    site_game: "Jeu",
    site_form: "Recommandation",
    app_logo: "Secours temps libre",
    ai_analyzing: "Analyse en cours..."
  },

  ru: {
    page_title: "Отряд свободного времени | Главная",
    site_logo: "Отряд свободного времени",
    site_home: "Главная",
    site_team: "Команда",
    site_game: "Игра",
    site_form: "Рекомендации",
    app_logo: "Отряд свободного времени",
    ai_analyzing: "Анализ..."
  }
};

class KookminCodeController {
  constructor() {
    this.currentSection = "menu";
    this.selectedCategory = "STORE";
    this.selectedClubCategory = "ALL";
    this.openFacilityIndex = -1;
    this.render();
  }

  getTranslations() {
    const lang = MOCK_DATA.currentLang || "ko";

    const dataTranslations =
      MOCK_DATA.translations[lang] ||
      MOCK_DATA.translations.en ||
      {};

    const pageTranslations =
      PAGE_TRANSLATIONS[lang] ||
      PAGE_TRANSLATIONS.en ||
      {};

    return {
      ...dataTranslations,
      ...pageTranslations
    };
  }

  syncFixedTexts() {
    const lang = MOCK_DATA.currentLang || "ko";
    const t = this.getTranslations();

    document.documentElement.lang = lang;
    document.title = t.page_title || "공강구조대 | 메인";

    const selector = document.getElementById("lang-selector");
    if (selector && selector.value !== lang) {
      selector.value = lang;
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");

      if (t[key]) {
        el.innerText = t[key];
      }
    });
  }

  escapeForAttribute(text) {
    return String(text || "")
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/"/g, "&quot;")
      .replace(/\n/g, " ");
  }

  changeLanguage(lang) {
    MOCK_DATA.currentLang = lang;
    this.render();
  }

  viewSection(section) {
    this.currentSection = section;

    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    const targetBtn = document.getElementById(`btn-${section}`);
    if (targetBtn) {
      targetBtn.classList.add("active");
    }

    const filterBar = document.getElementById("meal-filter-bar");
    if (filterBar) {
      filterBar.style.display = section === "menu" ? "flex" : "none";
    }

    this.render();
  }

  changeMealTime(time) {
    MOCK_DATA.currentMealTime = time;

    document.querySelectorAll(".meal-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    const timeBtn = document.getElementById(
      `btn-${time === "LUNCH" ? "lunch" : "dinner"}`
    );

    if (timeBtn) {
      timeBtn.classList.add("active");
    }

    this.render();
  }

  changeCategory(catId) {
    this.selectedCategory = catId;
    this.openFacilityIndex = -1;
    this.render();
  }

  toggleFacilityDetails(index) {
    this.openFacilityIndex = this.openFacilityIndex === index ? -1 : index;
    this.render();
  }

  changeClubCategory(clubCatId) {
    this.selectedClubCategory = clubCatId;
    this.render();
  }

  requestAI(menuName, ingredients) {
    const modal = document.getElementById("ai-modal");
    const result = document.getElementById("ai-result");
    const header = document.getElementById("ai-modal-header");

    const lang = MOCK_DATA.currentLang || "ko";
    const t = this.getTranslations();

    if (!modal || !result) {
      return;
    }

    if (header) {
      header.innerText = t.ai_modal_title || "AI Cultural Guide";
    }

    modal.style.display = "flex";

    result.innerHTML = `
      <div style="text-align:center; padding:25px;">
        <i class="fa-solid fa-spinner fa-spin fa-2x" style="color:#00C897;"></i>
        <br><br>
        ${t.ai_analyzing || "Analyzing..."}
      </div>
    `;

    setTimeout(() => {
      const safeIngredients = ingredients || "";

      const hasPork =
        safeIngredients.includes("돼지") ||
        safeIngredients.includes("Pork") ||
        safeIngredients.includes("Schwein") ||
        safeIngredients.includes("porc") ||
        safeIngredients.includes("свинина");

      const responses = {
        ko: `[${menuName}] 성분 검사 완료.<br>주재료: ${safeIngredients}<br>${
          hasPork
            ? "⚠️ 돼지고기 감지: 할랄 제한 주의."
            : "✅ 식이 제한 성분 없음."
        }`,

        en: `[${menuName}] Analysis Complete.<br>Ingredients: ${safeIngredients}<br>${
          hasPork
            ? "⚠️ Alert: Pork detected. Not Halal."
            : "✅ Clear of dietary flags."
        }`,

        zh: `[${menuName}] 分析完成。<br>主要成分: ${safeIngredients}<br>${
          hasPork
            ? "⚠️ 提示: 检测到猪肉，清真不适用。"
            : "✅ 未见宗教特殊饮食成分。"
        }`,

        ja: `[${menuName}] 分析結果。<br>材料: ${safeIngredients}<br>${
          hasPork
            ? "⚠️ 警告: 豚肉が検出されました。"
            : "✅ 食事制限成分は検出されませんでした。"
        }`,

        de: `[${menuName}] KI-Bericht fertig.<br>Zutaten: ${safeIngredients}<br>${
          hasPork
            ? "⚠️ Warnung: Schweinefleisch gefunden. Nicht Halal."
            : "✅ Keine Diäteinschränkungen."
        }`,

        fr: `[${menuName}] Rapport IA terminé.<br>Ingrédients: ${safeIngredients}<br>${
          hasPork
            ? "⚠️ Alerte: Porc détecté. Non adapté au régime Halal."
            : "✅ Aucun ingrédient restrictif."
        }`,

        ru: `[${menuName}] Анализ завершен.<br>Ингредиенты: ${safeIngredients}<br>${
          hasPork
            ? "⚠️ Внимание: Обнаружена свинина. Не Халяль."
            : "✅ Ограничений не обнаружено."
        }`
      };

      result.innerHTML = responses[lang] || responses.en;
    }, 1200);
  }

  closeAI() {
    const modal = document.getElementById("ai-modal");

    if (modal) {
      modal.style.display = "none";
    }
  }

  render() {
    const content = document.getElementById("content");

    if (!content) {
      return;
    }

    const lang = MOCK_DATA.currentLang || "ko";
    const time = MOCK_DATA.currentMealTime || "LUNCH";
    const t = this.getTranslations();

    let html = "";

    this.syncFixedTexts();

    /* 1. 식단 탭 렌더링 구역 */
    if (this.currentSection === "menu") {
      const filtered = MOCK_DATA.menu.filter((m) => m.time === time);

      filtered.forEach((item) => {
        const data =
          item.multilingual[lang] ||
          item.multilingual.en ||
          item.multilingual.ko ||
          {};

        const safeIng = this.escapeForAttribute(data.ing || "");
        const safeMenuName = this.escapeForAttribute(item.menuName || "");

        html += `
          <div class="card">
            <span class="tag" style="background:#e0f2fe; color:#0369a1;">
              <i class="fa-solid fa-shop"></i>
              ${item.restaurant || ""}
            </span>

            <h3>${item.menuName || ""}</h3>

            <p class="intro">${data.intro || ""}</p>

            <p class="ingredients">
              <i class="fa-solid fa-basket-shopping" style="color:var(--accent);"></i>
              <strong>Ingredients:</strong>
              ${data.ing || "정보 없음"}
            </p>

            <button class="ai-btn" onclick="controller.requestAI('${safeMenuName}', '${safeIng}')">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              ${t.ai_guide_btn || "Get AI Cultural Guide"}
            </button>
          </div>
        `;
      });
    }

    /* 2. 교내 시설 가이드 구역 */
    else if (this.currentSection === "facility") {
      html += `
        <div class="emoji-container" style="display:flex; justify-content:space-between; margin:10px 0 20px 0; background:#f8fafc; padding:12px; border-radius:14px; gap:6px; border:1px solid #e2e8f0; overflow-x:auto; -webkit-overflow-scrolling:touch;">
      `;

      MOCK_DATA.categories.forEach((cat) => {
        const isSelected = this.selectedCategory === cat.id;

        const btnStyle = isSelected
          ? "background:#ffffff; border:2px solid #00C897; transform:scale(1.05);"
          : "background:#f1f5f9; border:2px solid transparent; opacity:0.7;";

        const catName =
          cat.name[lang] ||
          cat.name.en ||
          cat.name.ko ||
          cat.id;

        html += `
          <button onclick="controller.changeCategory('${cat.id}')"
            style="${btnStyle} border-radius:10px; padding:10px 4px; font-size:14px; cursor:pointer; flex:1; transition:all 0.2s ease; outline:none;">
            <span style="font-size:24px; display:block; margin-bottom:4px;">${cat.icon || ""}</span>
            <span style="font-size:11px; font-weight:700; color:#1e293b; white-space:nowrap;">${catName}</span>
          </button>
        `;
      });

      html += `</div>`;

      const matched = MOCK_DATA.facilities.filter(
        (facility) => facility.category === this.selectedCategory
      );

      if (matched.length === 0) {
        html += `
          <div style="text-align:center; padding:30px; color:#94a3b8;">
            ${t.empty_facility || "표시할 시설이 없습니다."}
          </div>
        `;
      } else {
        matched.forEach((facility, index) => {
          const isOpen = this.openFacilityIndex === index;

          const fData =
            facility.multilingual[lang] ||
            facility.multilingual.en ||
            facility.multilingual.ko ||
            {};

          html += `
            <div class="facility-card" style="border-color:${isOpen ? "#00C897" : "#e2e8f0"};">
              <div onclick="controller.toggleFacilityDetails(${index})"
                style="padding:16px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; background:${isOpen ? "#f0fdf4" : "#ffffff"};">

                <div style="flex:1;">
                  <h4 style="margin:0 0 6px 0; color:#002D56; font-size:16px;">
                    ${fData.name || "알 수 없음"}
                  </h4>

                  <span style="font-size:12px; color:#64748b;">
                    <i class="fa-solid fa-location-dot" style="color:#00C897; margin-right:4px;"></i>
                    ${fData.loc || facility.originalLoc || ""}
                  </span>
                </div>

                <div style="color:${isOpen ? "#00C897" : "#94a3b8"};">
                  <i class="fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}"></i>
                </div>
              </div>

              <div style="display:${isOpen ? "block" : "none"}; padding:16px; background:#f8fafc; border-top:1px dashed #e2e8f0; font-size:13px;">
                <div style="margin-bottom:8px;">
                  <strong>${t.label_hours || "운영시간"}:</strong>
                  ${fData.hours || ""}
                </div>

                <div>
                  <strong>${t.label_details || "상세정보"}:</strong>
                  ${fData.details || ""}
                </div>
              </div>
            </div>
          `;
        });
      }
    }

    /* 3. 중앙동아리 안내 구역 */
    else if (this.currentSection === "club") {
      html += `
        <div class="club-hero">
          <h2>${t.club_title || "중앙동아리 안내"}</h2>
          <p>${t.club_desc || ""}</p>

          <div class="club-summary-grid">
            <div class="club-summary-box">
              <span class="num">70${t.club_count_unit || "개"}</span>
              <span class="label">${t.club_total || "중앙동아리"}</span>
            </div>

            <div class="club-summary-box">
              <span class="num">8${t.club_count_unit || "개"}</span>
              <span class="label">${t.club_divisions || "분과"}</span>
            </div>
          </div>
        </div>
      `;

      html += `<div class="club-filter-scroll">`;

      MOCK_DATA.clubCategories.forEach((cCat) => {
        const isActive = this.selectedClubCategory === cCat.id;
        const label = t[cCat.i18n] || cCat.id;

        html += `
          <button onclick="controller.changeClubCategory('${cCat.id}')"
            class="club-filter-btn ${isActive ? "active" : ""}">
            ${label}
          </button>
        `;
      });

      html += `</div>`;

      const filteredClubs =
        this.selectedClubCategory === "ALL"
          ? MOCK_DATA.clubs
          : MOCK_DATA.clubs.filter(
              (club) => club.category === this.selectedClubCategory
            );

      if (filteredClubs.length === 0) {
        html += `
          <div style="text-align:center; padding:30px; color:#94a3b8;">
            ${t.empty_club || "표시할 동아리가 없습니다."}
          </div>
        `;
      } else {
        filteredClubs.forEach((club) => {
          const cData =
            club.multilingual[lang] ||
            club.multilingual.en ||
            club.multilingual.ko ||
            {};

          const hasInsta = club.instagram && club.instagram !== "none";

          html += `
            <div class="club-card">
              <h4>
                <span>
                  <i class="fa-solid fa-puzzle-piece" style="color:#00C897; margin-right:6px;"></i>
                  ${cData.name || ""}
                </span>

                <span style="font-size:11px; background:#e0f2fe; color:#0369a1; padding:2px 8px; border-radius:4px;">
                  No.${club.no}
                </span>
              </h4>

              <div class="club-info-row">
                <strong>${t.label_loc || "위치"}:</strong>
                ${cData.loc || club.originalLoc || ""}
              </div>

              <div class="club-info-row">
                <strong>${t.label_purpose || "목적"}:</strong>
                ${cData.purpose || ""}
              </div>

              <div style="margin-top:10px; border-top:1px dashed #f1f5f9; padding-top:8px;">
                ${
                  hasInsta
                    ? `<a href="https://instagram.com/${club.instagram}" target="_blank" class="club-instagram-tag">
                        <i class="fa-brands fa-instagram"></i>
                        @${club.instagram}
                      </a>`
                    : `<span class="club-instagram-tag none">
                        <i class="fa-brands fa-instagram"></i>
                        SNS 미확인
                      </span>`
                }
              </div>
            </div>
          `;
        });
      }
    }

    content.innerHTML = html;
  }
}

/* 글로벌 컨트롤러 기동 */
const controller = new KookminCodeController();
