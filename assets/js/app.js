const CAMPUS_BUILDING_COORDS = {
    // WEST
    'W1': { top: '32.5%', left: '37.8%', name: '공학관 (W1)' },
    'W2': { top: '17.0%', left: '35.0%', name: '성곡도서관 (W2)' },
    'W3': { top: '21.0%', left: '35.2%', name: '글로벌센터 (W3)' },
    'W4': { top: '25.8%', left: '34.5%', name: '산학협력관 (W4)' },

    // NORTH
    'N1': { top: '41.5%', left: '75.5%', name: '본부관 (N1)' },
    'N2': { top: '23.0%', left: '69.0%', name: '북악관 (N2)' },
    'N3': { top: '29.2%', left: '76.7%', name: '조형관 (N3)' },
    'N4': { top: '47.0%', left: '80.0%', name: '법학관 (N4)' },
    'N5': { top: '47.0%', left: '84.5%', name: '형설관 (N5)' },
    'N6': { top: '47.8%', left: '94.0%', name: '과학관 (N6)' },
    'N7': { top: '35.0%', left: '62.0%', name: '경상관 (N7)' },
    'N9': { top: '49.0%', left: '69.2%', name: '국제관 (N9)' },
    'N10': { top: '53.5%', left: '73.0%', name: '경영관 (N10)' },
    'N11': { top: '55.8%', left: '83.8%', name: '체육관 (N11)' },

    // SOUTH
    'S1': { top: '57.8%', left: '54.0%', name: '평생교육 교학팀 (S1)' },
    'S2': { top: '64.0%', left: '67.8%', name: '종합복지관 / 미래관 주변 (S2)' },
    'S3': { top: '61.8%', left: '72.8%', name: '예술관 (S3)' },
    'S4': { top: '56.2%', left: '58.2%', name: '대주차장 (S4)' },
    'S5': { top: '82.5%', left: '74.5%', name: '평생교육실기교육관 (S5)' },

    // EAST
    'E1': { top: '73.8%', left: '84.2%', name: '생활관 A동 (E1)' },
    'E2': { top: '67.0%', left: '80.3%', name: '생활관 B동 (E2)' },
    'E3': { top: '72.0%', left: '81.5%', name: '생활관 C동 (E3)' },
    'E4': { top: '60.2%', left: '88.2%', name: '생활관 D동 (E4)' },
    'E5': { top: '66.0%', left: '84.6%', name: '명원민속관 (E5)' },
    'E6': { top: '63.2%', left: '96.0%', name: '명원박물관 (E6)' }
};

function helperExtractBuildingCode(locationText) {
    if (!locationText) return null;

    // WEST
    if (locationText.includes('공학관')) return 'W1';
    if (locationText.includes('성곡도서관') || locationText.includes('도서관')) return 'W2';

    // NORTH
    if (locationText.includes('본부관')) return 'N1';
    if (locationText.includes('북악관')) return 'N2';
    if (locationText.includes('조형관')) return 'N3';
    if (locationText.includes('법학관')) return 'N4';
    if (locationText.includes('형설관')) return 'N5';
    if (locationText.includes('과학관')) return 'N6';
    if (locationText.includes('경상관')) return 'N7';
    if (locationText.includes('국제관')) return 'N9';
    if (locationText.includes('경영관') || locationText.includes('콘서트홀')) return 'N10';
    if (locationText.includes('체육관')) return 'N11';

    // SOUTH
    if (locationText.includes('종합복지관') || locationText.includes('복지관')) return 'S2';
    if (locationText.includes('미래관')) return 'S2';
    if (locationText.includes('예술관')) return 'S3';
    if (locationText.includes('대운동장') || locationText.includes('운동장') || locationText.includes('주차장')) return 'S4';

    // EAST - 생활관은 A/B/C/D동을 먼저 구분
    if (locationText.includes('생활관(A동)') || locationText.includes('생활관 A')) return 'E1';
    if (locationText.includes('생활관(B동)') || locationText.includes('생활관 B')) return 'E2';
    if (locationText.includes('생활관(C동)') || locationText.includes('생활관 C')) return 'E3';
    if (locationText.includes('생활관(D동)') || locationText.includes('생활관 D')) return 'E4';
    if (locationText.includes('생활관')) return 'E2';

    if (locationText.includes('명원민속관')) return 'E5';
    if (locationText.includes('명원박물관')) return 'E6';

    return null;
}

/**
 * [GRASP Pattern: Controller]
 * 오타나 데이터 누락에도 절대 멈추지 않는 방어적 렌더링을 적용한 컨트롤러입니다.
 */
class KookminCodeController {

    constructor() {
        this.currentSection = 'menu';
        this.selectedCategory = 'STORE';
        this.selectedClubCategory = 'ALL';
        this.openFacilityIndex = -1;
        this.aiPayloads = [];
        this.render();
    }

    changeLanguage(lang) {
        const safeLang = normalizeI18nLanguage(lang);
        MOCK_DATA.currentLang = safeLang;
        applyI18n(safeLang);
        this.render();
    }

    viewSection(section) {
        this.currentSection = section;
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        
        const targetBtn = document.getElementById(`btn-${section}`);
        if(targetBtn) targetBtn.classList.add('active');

        const filterBar = document.getElementById('meal-filter-bar');
        if(filterBar) {
            filterBar.style.display = (section === 'menu') ? 'flex' : 'none';
        }
        this.render();
    }

    changeMealTime(time) {
        MOCK_DATA.currentMealTime = time;
        document.querySelectorAll('.meal-btn').forEach(b => b.classList.remove('active'));
        const timeBtn = document.getElementById(`btn-${time === 'LUNCH' ? 'lunch' : 'dinner'}`);
        if(timeBtn) timeBtn.classList.add('active');
        this.render();
    }

    changeCategory(catId) {
        this.selectedCategory = catId;
        this.openFacilityIndex = -1;
        this.render();
    }

    toggleFacilityDetails(index) {
        this.openFacilityIndex = (this.openFacilityIndex === index) ? -1 : index;
        this.render();
    }

    changeClubCategory(clubCatId) {
        this.selectedClubCategory = clubCatId;
        this.render();
    }

    requestAI(menuName, ingredients) {
        const modal = document.getElementById('ai-modal');
        const result = document.getElementById('ai-result');
        const lang = MOCK_DATA.currentLang || 'ko';
        
        const t = getI18nDict(lang);

        document.getElementById('ai-modal-header').innerText = t.ai_modal_title || 'AI Analysis';
        modal.style.display = 'flex';

        result.innerHTML = `
            <div style="text-align:center; padding: 25px;">
                <span style="font-size:30px; display:inline-block; animation:pulse 1s infinite;">⏳</span>
                <br><br>Analyzing context language...
            </div>`;

        setTimeout(() => {
            const safeIngredients = ingredients || ''; 
            const hasPork = safeIngredients.includes('돼지') || safeIngredients.includes('Pork') || safeIngredients.includes('Schwein');
            
            const responses = {
                ko: `[${menuName}] 성분 검사 완료.<br>주재료: ${safeIngredients}<br>${hasPork ? '⚠️ 돼지고기 감지: 할랄 제한 주의.' : '✅ 식이 제한 성분 없음.'}`,
                en: `[${menuName}] Analysis Complete.<br>Ingredients: ${safeIngredients}<br>${hasPork ? '⚠️ Alert: Pork detected. Not Halal.' : '✅ Clear of dietary flags.'}`,
                zh: `[${menuName}] 分析完成。<br>主要成分: ${safeIngredients}<br>${hasPork ? '⚠️ 提示: 检测到猪肉，清真不适用。' : '✅ 未见宗教特殊饮食成分。'}`,
                ja: `[${menuName}] 分析結果。<br>材料: ${safeIngredients}<br>${hasPork ? '⚠️ 警告: 豚肉が検出されました。' : '✅ 食事 제한 성분 없음.'}`,
                de: `[${menuName}] KI-Bericht fertig.<br>Zutaten: ${safeIngredients}<br>${hasPork ? '⚠️ Warnung: Schweinefleisch gefunden. Nicht Halal.' : '✅ Keine Diäteinschränkungen.'}`,
                fr: `[${menuName}] Rapport IA terminé.<br>Ingrédients: ${safeIngredients}<br>${hasPork ? '⚠️ Alerte: Porc détecté. Non adapté au régime Halal.' : '✅ Aucun ingrédient restrictif.'}`,
                ru: `[${menuName}] Анализ завершен.<br>Ингредиенты: ${safeIngredients}<br>${hasPork ? '⚠️ Внимание: Обнаружена свинина. Не Халяль.' : '✅ Ограничений не обнаружено.'}`
            };

            result.innerHTML = responses[lang] || responses['en'];
        }, 1200);
    }

    closeAI() { document.getElementById('ai-modal').style.display = 'none'; }

    render() {
        const content = document.getElementById('content');
        if (!content) return;

        const lang = MOCK_DATA.currentLang || 'ko';
        const time = MOCK_DATA.currentMealTime || 'LUNCH';
        
        const t = getI18nDict(lang);
        let html = '';
        this.aiPayloads = [];

        // 1. 식단 탭 렌더링 구역
        if (this.currentSection === 'menu') {
            const filtered = MOCK_DATA.menu.filter(m => m.time === time);
            filtered.forEach(item => {
                const data = item.multilingual[lang] || item.multilingual['en'];
                const payloadIndex = this.aiPayloads.push({
                    menuName: item.menuName,
                    ingredients: data.ing || ''
                }) - 1;
                
                html += `
                    <div class="card">
                        <span class="tag" style="background:#E8F7F1; color:#08A470;"><span aria-hidden="true">🏫</span> ${item.restaurant}</span>
                        <h3>${item.menuName}</h3>
                        <p class="intro">${data.intro || ''}</p>
                        <p class="ingredients"><span aria-hidden="true">🧺</span> <strong>Ingredients:</strong> ${data.ing || '정보 없음'}</p>
                        <button type="button" class="btn ai-btn" data-action="request-ai" data-ai-index="${payloadIndex}"><span aria-hidden="true">✨</span> ${t.ai_guide_btn}</button>
                    </div>`;
            });

        // 2. 교내 시설 가이드 구역 (지도 매핑 추가)
        } else if (this.currentSection === 'facility') {
            
            // 지도 렌더링
            html += `
            <div id="campus-map-wrapper" style="background-color: var(--color-bg); padding: 10px 0; margin-bottom: 15px; border-bottom: 1px solid var(--color-border);">
                <div style="position: relative; max-width: 100%; border-radius: 12px; overflow: hidden; border: 2px solid var(--color-primary); box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                    <img src="assets/images/main/mapOfKookmin.jpg" alt="국민대학교 지도" style="width: 100%; display: block; height: auto;">`;
            
            const facilitiesInCat = MOCK_DATA.facilities.filter(f => f.category === this.selectedCategory);
            if (this.openFacilityIndex !== -1 && facilitiesInCat[this.openFacilityIndex]) {
                const currentOpenItem = facilitiesInCat[this.openFacilityIndex];
                const bldgCode = helperExtractBuildingCode(currentOpenItem.originalLoc);
                
                if (bldgCode && CAMPUS_BUILDING_COORDS[bldgCode]) {
                    const pos = CAMPUS_BUILDING_COORDS[bldgCode];
                    html += `
                    <div class="animated-map-marker" style="position: absolute; top: ${pos.top}; left: ${pos.left}; transform: translate(-50%, -100%); background: #E74C3C; color: #FFF; padding: 5px 11px; border-radius: 20px; font-weight: bold; font-size: 0.75rem; white-space: nowrap; box-shadow: 0 4px 8px rgba(0,0,0,0.35); border: 1px solid #FFF; z-index: 110; animation: bounceMarker 0.5s ease-out infinite alternate;">
                        📍 ${pos.name}
                    </div>`;
                }
            }
            
            html += `
                </div>
            </div>`;

            html += `<div class="emoji-container" style="display:flex; justify-content:space-between; margin: 10px 0 20px 0; background:#FFFFFF; padding:12px; border-radius:14px; gap:6px; border:1px solid #DADADA; overflow-x:auto; -webkit-overflow-scrolling:touch;">`;
            MOCK_DATA.categories.forEach(cat => {
                const isSelected = (this.selectedCategory === cat.id);
                const btnStyle = isSelected ? 'background:#ffffff; border:2px solid #08A470; transform:scale(1.05);' : 'background:#F8F5EA; border:2px solid transparent; opacity:0.7;';
                const catName = cat.name[lang] || cat.name['en'] || cat.name['ko'];
                
                html += `
                    <button type="button" class="btn category-filter-btn" data-action="change-category" data-category="${cat.id}" style="${btnStyle} border-radius:10px; padding:10px 4px; font-size:14px; cursor:pointer; flex:1; transition:all 0.2s ease; outline:none;">
                        <span style="font-size:24px; display:block; margin-bottom:4px;">${cat.icon}</span>
                        <span style="font-size:14px; font-weight:700; color:#0D0D0C; white-space:nowrap;">${catName}</span>
                    </button>`;
            });
            html += `</div>`;

            const matched = MOCK_DATA.facilities.filter(f => f.category === this.selectedCategory);
            if (matched.length === 0) {
                html += `<div style="text-align:center; padding:30px; color:#575656;">${t.empty_facility}</div>`;
            } else {
                matched.forEach((facility, index) => {
                    const isOpen = (this.openFacilityIndex === index);
                    const fData = facility.multilingual[lang] || facility.multilingual['en'];
                    html += `
                        <div class="card facility-card" style="border-color:${isOpen ? '#08A470' : '#DADADA'};">
                            <button type="button" class="facility-toggle" data-action="toggle-facility" data-index="${index}" style="width:100%; border:0; padding:16px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; background:${isOpen ? '#E8F7F1' : '#ffffff'}; text-align:left;">
                                <div style="flex:1;">
                                    <h4 style="margin:0 0 6px 0; color:#0D0D0C; font-size:14px;">${fData.name || '알 수 없음'}</h4>
                                    <span style="font-size:14px; color:#575656;"><span aria-hidden="true" style="margin-right:4px;">📍</span>${fData.loc || facility.originalLoc}</span>
                                </div>
                                <div style="color:${isOpen ? '#08A470' : '#575656'};">${isOpen ? '▲' : '▼'}</div>
                            </button>
                            <div style="display:${isOpen ? 'block' : 'none'}; padding:16px; background:#FFFFFF; border-top:1px dashed #DADADA; font-size:14px;">
                                <div style="margin-bottom:8px;"><strong>${t.label_hours}:</strong> ${fData.hours || ''}</div>
                                <div><strong>${t.label_details}:</strong> ${fData.details || ''}</div>
                            </div>
                        </div>`;
                });
            }

        // 3. 중앙동아리 안내 구역
        } else if (this.currentSection === 'club') {
            html += `
                <div class="club-hero">
                    <h2>${t.club_title}</h2>
                    <p>${t.club_desc}</p>
                    <div class="club-summary-grid">
                        <div class="club-summary-box"><span class="num">70${t.club_count_unit}</span><span class="label">${t.club_total}</span></div>
                        <div class="club-summary-box"><span class="num">8${t.club_count_unit}</span><span class="label">${t.club_divisions}</span></div>
                    </div>
                </div>`;

            html += `<div class="club-filter-scroll">`;
            MOCK_DATA.clubCategories.forEach(cCat => {
                const isActive = (this.selectedClubCategory === cCat.id);
                html += `<button type="button" class="btn club-filter-btn ${isActive ? 'active' : ''}" data-action="change-club-category" data-club-category="${cCat.id}">${t[cCat.i18n]}</button>`;
            });
            html += `</div>`;

            const filteredClubs = (this.selectedClubCategory === 'ALL') ? MOCK_DATA.clubs : MOCK_DATA.clubs.filter(c => c.category === this.selectedClubCategory);
            if (filteredClubs.length === 0) {
                html += `<div style="text-align:center; padding:30px; color:#575656;">${t.empty_club}</div>`;
            } else {
                filteredClubs.forEach(club => {
                    const cData = club.multilingual[lang] || club.multilingual['en'];
                    const hasInsta = club.instagram !== 'none';
                    html += `
                        <div class="card club-card">
                            <h4>
                                <span><span aria-hidden="true" style="margin-right:6px;">🧩</span>${cData.name || ''}</span>
                                <span style="font-size:11px; background:#E8F7F1; color:#08A470; padding:2px 8px; border-radius:4px;">No.${club.no}</span>
                            </h4>
                            <div class="club-info-row"><strong>${t.label_loc}:</strong> ${cData.loc || club.originalLoc}</div>
                            <div class="club-info-row"><strong>${t.label_purpose}:</strong> ${cData.purpose || ''}</div>
                            <div style="margin-top:10px; border-top:1px dashed #F8F5EA; padding-top:8px;">
                                <a href="https://instagram.com/${club.instagram}" target="_blank" class="club-instagram-tag ${hasInsta?'':'none'}">
                                    <span aria-hidden="true">📷</span> ${hasInsta?`@${club.instagram}`:'SNS 미확인'}
                                </a>
                            </div>
                        </div>`;
                });
            }
        }
        content.innerHTML = html;
    }
}

const controller = new KookminCodeController();

document.querySelectorAll('[data-section]').forEach((button) => {
    button.addEventListener('click', () => controller.viewSection(button.dataset.section));
});

document.querySelectorAll('[data-meal-time]').forEach((button) => {
    button.addEventListener('click', () => controller.changeMealTime(button.dataset.mealTime));
});

document.getElementById('ai-modal-close')?.addEventListener('click', () => controller.closeAI());

document.getElementById('content')?.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    if (target.dataset.action === 'request-ai') {
        const payload = controller.aiPayloads[Number(target.dataset.aiIndex)];
        if (payload) controller.requestAI(payload.menuName, payload.ingredients);
    }

    if (target.dataset.action === 'change-category') {
        controller.changeCategory(target.dataset.category);
    }

    if (target.dataset.action === 'toggle-facility') {
        controller.toggleFacilityDetails(Number(target.dataset.index));
    }

    if (target.dataset.action === 'change-club-category') {
        controller.changeClubCategory(target.dataset.clubCategory);
    }
});

document.addEventListener('i18n:change', (event) => {
    controller.changeLanguage(event.detail.lang);
});

controller.changeLanguage(localStorage.getItem("preferredLanguage") || document.getElementById('lang-selector')?.value || 'ko');
