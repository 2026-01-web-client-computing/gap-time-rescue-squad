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
        this.render();
    }

    changeLanguage(lang) {
        MOCK_DATA.currentLang = lang;
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
        
        // 예외 방어: 만약 언어 사전이 비어있다면 영어를 기본으로 사용
        const t = MOCK_DATA.translations[lang] || MOCK_DATA.translations['en'];

        document.getElementById('ai-modal-header').innerText = t.ai_modal_title || 'AI Analysis';
        modal.style.display = 'flex';

        result.innerHTML = `
            <div style="text-align:center; padding: 25px;">
                <span style="font-size:30px; display:inline-block; animation:pulse 1s infinite;">⏳</span>
                <br><br>Analyzing context language...
            </div>`;

        setTimeout(() => {
            const safeIngredients = ingredients || ''; // undefined 방어
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
        
        // 어떤 상황에서도 에러가 나지 않도록 번역 사전 기본값 적용
        const t = MOCK_DATA.translations[lang] || MOCK_DATA.translations['en'];
        let html = '';

        // i18n 고정 태그 동기화
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(t[key]) {
                el.innerText = t[key];
            }
        });

        // 1. 식단 탭 렌더링 구역
        if (this.currentSection === 'menu') {
            const filtered = MOCK_DATA.menu.filter(m => m.time === time);
            filtered.forEach(item => {
                const data = item.multilingual[lang] || item.multilingual['en'];
                // 핵심 에러 수정 구역: data.ing가 없더라도 절대 멈추지 않음!
                const safeIng = (data.ing || '').replace(/'/g, '&apos;'); 
                
                html += `
                    <div class="card">
                        <span class="tag" style="background:#E8F7F1; color:#08A470;"><span aria-hidden="true">🏫</span> ${item.restaurant}</span>
                        <h3>${item.menuName}</h3>
                        <p class="intro">${data.intro || ''}</p>
                        <p class="ingredients"><span aria-hidden="true">🧺</span> <strong>Ingredients:</strong> ${data.ing || '정보 없음'}</p>
                        <button class="ai-btn" onclick="controller.requestAI('${item.menuName}', '${safeIng}')"><span aria-hidden="true">✨</span> ${t.ai_guide_btn}</button>
                    </div>`;
            });

        // 2. 교내 시설 가이드 구역 (이모티콘 서브탭)
        } else if (this.currentSection === 'facility') {
            html += `<div class="emoji-container" style="display:flex; justify-content:space-between; margin: 10px 0 20px 0; background:#FFFFFF; padding:12px; border-radius:14px; gap:6px; border:1px solid #DADADA; overflow-x:auto; -webkit-overflow-scrolling:touch;">`;
            MOCK_DATA.categories.forEach(cat => {
                const isSelected = (this.selectedCategory === cat.id);
                const btnStyle = isSelected ? 'background:#ffffff; border:2px solid #08A470; transform:scale(1.05);' : 'background:#F8F5EA; border:2px solid transparent; opacity:0.7;';
                const catName = cat.name[lang] || cat.name['en'] || cat.name['ko'];
                
                html += `
                    <button onclick="controller.changeCategory('${cat.id}')" style="${btnStyle} border-radius:10px; padding:10px 4px; font-size:14px; cursor:pointer; flex:1; transition:all 0.2s ease; outline:none;">
                        <span style="font-size:24px; display:block; margin-bottom:4px;">${cat.icon}</span>
                        <span style="font-size:11px; font-weight:700; color:#0D0D0C; white-space:nowrap;">${catName}</span>
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
                        <div class="facility-card" style="border-color:${isOpen ? '#08A470' : '#DADADA'};">
                            <div onclick="controller.toggleFacilityDetails(${index})" style="padding:16px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; background:${isOpen ? '#E8F7F1' : '#ffffff'};">
                                <div style="flex:1;">
                                    <h4 style="margin:0 0 6px 0; color:#0D0D0C; font-size:16px;">${fData.name || '알 수 없음'}</h4>
                                    <span style="font-size:12px; color:#575656;"><span aria-hidden="true" style="margin-right:4px;">📍</span>${fData.loc || facility.originalLoc}</span>
                                </div>
                                <div style="color:${isOpen ? '#08A470' : '#575656'};">${isOpen ? '▲' : '▼'}</div>
                            </div>
                            <div style="display:${isOpen ? 'block' : 'none'}; padding:16px; background:#FFFFFF; border-top:1px dashed #DADADA; font-size:13px;">
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
                html += `<button onclick="controller.changeClubCategory('${cCat.id}')" class="club-filter-btn ${isActive ? 'active' : ''}">${t[cCat.i18n]}</button>`;
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
                        <div class="club-card">
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

// 글로벌 컨트롤러 기동
const controller = new KookminCodeController();