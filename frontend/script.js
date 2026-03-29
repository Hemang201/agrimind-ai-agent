const API_BASE_URL = window.API_BASE_URL ||
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? `${window.location.protocol}//${window.location.host}`
    : 'http://localhost:8000');

const translations = {
  en: {
    // Headings
    addPlantHeading: 'Add Plant',
    aiHeading: 'AI Assistant',
    diagnoseHeading: 'Diagnose Plant',
    recommendHeading: 'Recommended Crops',
    
    // Placeholders
    plantNamePlaceholder: 'e.g. Tomato',
    plantTypePlaceholder: 'e.g. Vegetable',
    plantCityPlaceholder: 'e.g. Noida',
    aiQuestionPlaceholder: 'Ask any plant care question',
    recommendCityPlaceholder: 'City',
    diagnosePlantNamePlaceholder: 'Plant Name',
    seasonLabel: 'Season',
    plantTypeLabel: 'Plant Type',
    
    // Buttons
    addButton: 'Add Plant',
    talkAIButton: 'Talk to AI',
    diagnoseButton: 'Upload & Diagnose',
    recommendButton: 'Get Recommendation',
    
    // Form labels
    plantNameLabel: 'Plant Name',
    plantTypeLabel: 'Plant Type',
    cityLabel: 'City',
    
    // Option selects
    autoSeason: 'Auto season',
    spring: 'Spring',
    summer: 'Summer',
    autumn: 'Autumn',
    winter: 'Winter',
    allTypes: 'All types',
    vegetables: 'Vegetables',
    flowers: 'Flowers',
    cashcrops: 'Cash crops',
    
    // Soil & Minerals
    soilTypeLabel: 'Soil Type',
    mineralsLabel: 'Mineral Content',
    nitrogenLabel: 'Nitrogen (N)',
    phosphorusLabel: 'Phosphorus (P)',
    potassiumLabel: 'Potassium (K)',
    moistureLabel: 'Moisture',
    usePresetBtn: '🪄 Use Preset Data',
    soilTypePlaceholder: 'e.g. Sandy',
    mineralsPlaceholder: 'e.g. High Nitrogen',
    
    // Success messages
    plantAddedSuccess: 'Plant added successfully!',
    
    // Error messages
    fillAllFields: 'Please fill all fields!',
    addPlantError: 'Add plant failed: ',
    aiRequestError: 'AI request failed: ',
    noQuestion: 'Please enter a question.',
    noCityRecommend: 'Please provide a city.',
    recommendationError: 'Error: ',
    plantImageMissing: 'Provide plant name and image.',
    diagnoseError: 'Error: ',
    
    // Empty states
    noPlants: 'No plants added yet.',
    
    // Chat messages
    thinking: 'Thinking...',
    userPrefix: '🧑 ',
    botPrefix: '🤖 ',
    noAnswer: 'No answer',
    chatError: 'Error: ',
    
    // Results
    recommendationsLabel: 'Recommendations:',
    resultLabel: 'Result:',
    diagnosisSuccessLabel: '✅ ',
    
    // Feature card descriptions
    addPlantsDesc: 'Register and track your crops easily.',
    diagnoseDesc: 'Detect plant diseases from images.',
    recommendDesc: 'Get best crops based on your region.',
    
    // Intro text
    introTag: 'AI Powered Agriculture',
    introTitle: 'Your Digital Assistant for Smarter Farming',
    introText: 'AgriMind Dashboard combines artificial intelligence with real-time insights to help farmers and plant enthusiasts monitor, diagnose, and optimize plant growth effortlessly.',
    
    // Chat intro
    chatIntro: 'Ask anything about crops, soil, or plant health.',
    
    // Feature cards descriptions
    card1Desc: 'Register and track your crops easily.',
    card2Desc: 'Detect plant diseases from images.',
    card3Desc: 'Get best crops based on your region.',
    
    // Modal titles and buttons
    addPlantFormTitle: '🌱 Add Your Plant',
    diagnoseFormTitle: '🔍 Diagnose Your Plant',
    recommendFormTitle: '🌾 Get Crop Recommendations',
    addPlantBtnModal: 'Add Plant',
    diagnoseBtnModal: 'Upload & Diagnose',
    recommendBtnModal: 'Get Recommendations',
    
    // Intro section
    introTag: 'AI Powered Agriculture',
    introHeading: 'Your Digital Assistant for Smarter Farming',
    introContent: 'AgriMind Dashboard combines artificial intelligence with real-time insights to help farmers and plant enthusiasts monitor, diagnose, and optimize plant growth effortlessly.'
  },
  hi: {
    // Headings
    addPlantHeading: 'पौधा जोड़ें',
    aiHeading: 'एआई सहायक',
    diagnoseHeading: 'पौधे का निदान',
    recommendHeading: 'अनुशंसित फसलें',
    
    // Placeholders
    plantNamePlaceholder: 'उदा. टमाटर',
    plantTypePlaceholder: 'उदा. सब्ज़ी',
    plantCityPlaceholder: 'उदा. नोएडा',
    aiQuestionPlaceholder: 'किसी भी पौधा देखभाल प्रश्न पूछें',
    recommendCityPlaceholder: 'शहर',
    diagnosePlantNamePlaceholder: 'पौधे का नाम',
    seasonLabel: 'मौसम',
    plantTypeLabel: 'पौधे का प्रकार',
    
    // Buttons
    addButton: 'पौधा जोड़ें',
    talkAIButton: 'एआई से बात करें',
    diagnoseButton: 'अपलोड करें और निदान',
    recommendButton: 'अनुशंसा पाएं',
    
    // Form labels
    plantNameLabel: 'पौधे का नाम',
    plantTypeLabel: 'पौधे का प्रकार',
    cityLabel: 'शहर',
    
    // Option selects
    autoSeason: 'स्वचालित मौसम',
    spring: 'वसंत',
    summer: 'गर्मी',
    autumn: 'शरद ऋतु',
    winter: 'सर्दी',
    allTypes: 'सभी प्रकार',
    vegetables: 'सब्जियाँ',
    flowers: 'फूल',
    cashcrops: 'नकदी फसलें',
    
    // Soil & Minerals
    soilTypeLabel: 'मिट्टी का प्रकार',
    mineralsLabel: 'खनिज सामग्री',
    nitrogenLabel: 'नाइट्रोजन (N)',
    phosphorusLabel: 'फास्फोरस (P)',
    potassiumLabel: 'पोटेशियम (K)',
    moistureLabel: 'नमी (Moisture)',
    usePresetBtn: '🪄 प्रीसेट डेटा का उपयोग करें',
    soilTypePlaceholder: 'उदा. रेतीला',
    mineralsPlaceholder: 'उदा. उच्च नाइट्रोजन',
    
    // Success messages
    plantAddedSuccess: 'पौधा सफलतापूर्वक जोड़ा गया!',
    
    // Error messages
    fillAllFields: 'कृपया सभी फ़ील्ड भरें!',
    addPlantError: 'पौधा जोड़ने में विफल: ',
    aiRequestError: 'एआई अनुरोध विफल: ',
    noQuestion: 'कृपया एक प्रश्न दर्ज करें।',
    noCityRecommend: 'कृपया एक शहर प्रदान करें।',
    recommendationError: 'त्रुटि: ',
    plantImageMissing: 'पौधे का नाम और छवि प्रदान करें।',
    diagnoseError: 'त्रुटि: ',
    
    // Empty states
    noPlants: 'अभी तक कोई पौधा नहीं जोड़ा गया।',
    
    // Chat messages
    thinking: 'सोच रहे हैं...',
    userPrefix: '🧑 ',
    botPrefix: '🤖 ',
    noAnswer: 'कोई उत्तर नहीं',
    chatError: 'त्रुटि: ',
    
    // Results
    recommendationsLabel: 'अनुशंसाएँ:',
    resultLabel: 'परिणाम:',
    diagnosisSuccessLabel: '✅ ',
    
    // Feature card descriptions
    card1Desc: 'अपनी फसलों को आसानी से पंजीकृत करें और ट्रैक करें।',
    card2Desc: 'छवियों से पौधे की बीमारियों का पता लगाएँ।',
    card3Desc: 'अपने क्षेत्र के अनुसार सर्वश्रेष्ठ फसलें प्राप्त करें।',
    
    // Modal titles and buttons
    addPlantFormTitle: '🌱 अपना पौधा जोड़ें',
    diagnoseFormTitle: '🔍 अपने पौधे का निदान करें',
    recommendFormTitle: '🌾 फसल की सिफारिशें प्राप्त करें',
    addPlantBtnModal: 'पौधा जोड़ें',
    diagnoseBtnModal: 'अपलोड करें और निदान',
    recommendBtnModal: 'सिफारिशें प्राप्त करें',
    
    // Intro section
    introTag: 'कृषि विज्ञान से संचालित',
    introHeading: 'स्मार्ट खेती के लिए आपका डिजिटल सहायक',
    introContent: 'एग्रीमाइंड डैशबोर्ड कृत्रिम बुद्धिमत्ता और वास्तविक समय अंतर्दृष्टि को जोड़ता है ताकि किसान और पौधे प्रेमी आसानी से पौधों की निगरानी, निदान और वृद्धि को अनुकूलित कर सकें।'
  }
};

function getTranslation(key) {
  const lang = document.documentElement.lang || 'en';
  return translations[lang]?.[key] || translations.en[key];
}

function applyLanguage(lang) {
  const payload = translations[lang] || translations.en;
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);

  const h1 = document.querySelector('.hero-text h1');
  const p = document.querySelector('.hero-text p');
  if (h1) h1.textContent = lang === 'hi' ? 'स्मार्ट एआई के लिए बुद्धिमान फसल देखभाल' : 'Smart AI for Intelligent Crop Care';
  if (p) p.textContent = lang === 'hi' ? 'अपने पौधों का प्रबंधन करें, रोग का निदान करें, और AI-पावर्ड अनुशंसाएँ प्राप्त करें।' : 'Manage your plants, diagnose diseases, and get AI-powered crop recommendations — all in one intelligent dashboard.';

  const links = document.querySelectorAll('.nav-links li a');
  const enNav = ['Home', 'Features', 'How it Works', 'Dashboard', 'Get Started'];
  const hiNav = ['होम', 'विशेषताएँ', 'कैसे काम करता है', 'डैशबोर्ड', 'शुरू करें'];
  links.forEach((link, index) => {
    link.textContent = lang === 'hi' ? hiNav[index] : enNav[index];
  });

  const cards = document.querySelectorAll('.feature-card h4');
  const enCards = ['Add Plants', 'Diagnose', 'Recommendations'];
  const hiCards = ['पौधे जोड़ें', 'निदान', 'अनुशंसाएँ'];
  cards.forEach((card, i) => {
    card.textContent = lang === 'hi' ? hiCards[i] : enCards[i];
  });

  const h3s = document.querySelectorAll('.content-section h3');
  if (h3s[0]) h3s[0].textContent = payload.addPlantHeading;
  if (h3s[1]) h3s[1].textContent = payload.aiHeading;
  if (h3s[2]) h3s[2].textContent = payload.diagnoseHeading;
  if (h3s[3]) h3s[3].textContent = payload.recommendHeading;

  // Update form labels
  const pnl = document.getElementById('plantNameLabel');
  if (pnl) pnl.textContent = payload.plantNameLabel;
  const ptl = document.getElementById('plantTypeLabel');
  if (ptl) ptl.textContent = payload.plantTypeLabel;
  const cl = document.getElementById('cityLabel');
  if (cl) cl.textContent = payload.cityLabel;
  const dpl = document.getElementById('diagnosePlantNameLabel');
  if (dpl) dpl.textContent = payload.diagnosePlantNamePlaceholder;
  const rcl = document.getElementById('recommendCityLabel');
  if (rcl) rcl.textContent = payload.cityLabel;
  const sl = document.getElementById('seasonLabel');
  if (sl) sl.textContent = payload.seasonLabel;
  const ptl2 = document.getElementById('plantTypeLabel');
  if (ptl2) ptl2.textContent = payload.plantTypeLabel;

  // Update soil labels
  const soilLabelIds = ['soilTypeLabel', 'soilTypeLabel2', 'soilTypeLabelModal', 'soilTypeLabelModal2'];
  soilLabelIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = payload.soilTypeLabel;
  });
  
  const minLabelIds = ['mineralsLabel', 'mineralsLabel2', 'mineralsLabelModal', 'mineralsLabelModal2'];
  minLabelIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = payload.mineralsLabel;
  });
  
  const presetBtnIds = ['presetBtn1', 'presetBtn2', 'presetBtn3', 'presetBtn4'];
  presetBtnIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = payload.usePresetBtn;
  });

  ['1', '2', '3', '4'].forEach(i => {
    const elN = document.getElementById(`labelN_${i}`);
    const elP = document.getElementById(`labelP_${i}`);
    const elK = document.getElementById(`labelK_${i}`);
    const elM = document.getElementById(`labelM_${i}`);
    
    if (elN) {
       const v = document.getElementById(`valN_${i}`)?.innerText || '50';
       elN.innerHTML = `${payload.nitrogenLabel}: <span id="valN_${i}">${v}</span>%`;
    }
    if (elP) {
       const v = document.getElementById(`valP_${i}`)?.innerText || '50';
       elP.innerHTML = `${payload.phosphorusLabel}: <span id="valP_${i}">${v}</span>%`;
    }
    if (elK) {
       const v = document.getElementById(`valK_${i}`)?.innerText || '50';
       elK.innerHTML = `${payload.potassiumLabel}: <span id="valK_${i}">${v}</span>%`;
    }
    if (elM) {
       const v = document.getElementById(`valM_${i}`)?.innerText || '50';
       elM.innerHTML = `${payload.moistureLabel}: <span id="valM_${i}">${v}</span>%`;
    }
  });

  // Update input placeholders
  const pn = document.getElementById('plantName');
  if (pn) pn.setAttribute('placeholder', payload.plantNamePlaceholder);
  const pt = document.getElementById('plantType');
  if (pt) pt.setAttribute('placeholder', payload.plantTypePlaceholder);
  const pc = document.getElementById('plantCity');
  if (pc) pc.setAttribute('placeholder', payload.plantCityPlaceholder);
  const aq = document.getElementById('aiQuestion');
  if (aq) aq.setAttribute('placeholder', payload.aiQuestionPlaceholder);
  const rc = document.getElementById('recommendCity');
  if (rc) rc.setAttribute('placeholder', payload.recommendCityPlaceholder);
  const dn = document.getElementById('diagnoseName');
  if (dn) dn.setAttribute('placeholder', payload.diagnosePlantNamePlaceholder);
  
  // Soil placeholders
  const soilInputs = ['plantSoilType', 'recommendSoilType', 'addPlantSoilType', 'recommendModalSoilType'];
  soilInputs.forEach(id => {
     const el = document.getElementById(id);
     if (el) el.setAttribute('placeholder', payload.soilTypePlaceholder);
  });
  const minInputs = ['plantMinerals', 'recommendMinerals', 'addPlantMinerals', 'recommendModalMinerals'];
  minInputs.forEach(id => {
     const el = document.getElementById(id);
     if (el) el.setAttribute('placeholder', payload.mineralsPlaceholder);
  });

  // Update buttons
  const apb = document.getElementById('addPlantBtn');
  if (apb) apb.textContent = payload.addButton;
  const tib = document.getElementById('talkAiBtn');
  if (tib) tib.textContent = payload.talkAIButton;
  const db = document.getElementById('diagnoseBtn');
  if (db) db.textContent = payload.diagnoseButton;
  const rb = document.getElementById('recommendBtn');
  if (rb) rb.textContent = payload.recommendButton;

  // Update modal buttons
  const apm = document.getElementById('addPlantBtnModal');
  if (apm) apm.textContent = payload.addPlantBtnModal;
  const dbm = document.getElementById('diagnoseBtnModal');
  if (dbm) dbm.textContent = payload.diagnoseBtnModal;
  const rbm = document.getElementById('recommendBtnModal');
  if (rbm) rbm.textContent = payload.recommendBtnModal;

  // Update modal titles
  const aptitle = document.getElementById('addPlantFormTitle');
  if (aptitle) aptitle.textContent = payload.addPlantFormTitle;
  const dgtitle = document.getElementById('diagnoseFormTitle');
  if (dgtitle) dgtitle.textContent = payload.diagnoseFormTitle;
  const retitle = document.getElementById('recommendFormTitle');
  if (retitle) retitle.textContent = payload.recommendFormTitle;

  // Update select options
  const rs = document.getElementById('recommendSeason');
  if (rs) {
    rs.options[0].textContent = payload.autoSeason;
    rs.options[1].textContent = payload.spring;
    rs.options[2].textContent = payload.summer;
    rs.options[3].textContent = payload.autumn;
    rs.options[4].textContent = payload.winter;
  }

  const rpt = document.getElementById('recommendPlantType');
  if (rpt) {
    rpt.options[0].textContent = payload.allTypes;
    rpt.options[1].textContent = payload.vegetables;
    rpt.options[2].textContent = payload.flowers;
    rpt.options[3].textContent = payload.cashcrops;
  }

  // Update chat intro
  const chatIntro = document.querySelector('.ai-intro');
  if (chatIntro) chatIntro.textContent = '🌱 ' + payload.chatIntro;

  // Update chat input placeholder
  const ci = document.getElementById('chatInput');
  if (ci) ci.setAttribute('placeholder', payload.aiQuestionPlaceholder);

  // Update intro section
  const introTag = document.getElementById('introTag');
  if (introTag) introTag.textContent = payload.introTag;
  const introTitle = document.getElementById('introTitle');
  if (introTitle) introTitle.innerHTML = payload.introHeading.replace('<br>', '<br>');
  const introText = document.getElementById('introText');
  if (introText) introText.textContent = payload.introContent;

  // Update feature card descriptions
  const card1 = document.getElementById('card1Desc');
  if (card1) card1.textContent = payload.card1Desc;
  const card2 = document.getElementById('card2Desc');
  if (card2) card2.textContent = payload.card2Desc;
  const card3 = document.getElementById('card3Desc');
  if (card3) card3.textContent = payload.card3Desc;
}

window.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('lang') || 'en';
  applyLanguage(lang);
  displayPlantsModal();

  const sb = document.querySelector('.send-btn');
  if (sb) sb.addEventListener('click', sendMessage);
  const ci = document.getElementById('chatInput');
  if (ci) ci.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  document.addEventListener('click', (e) => {
    const lp = document.getElementById('langPopup');
    if (lp && !e.target.closest('.lang-toggle') && !e.target.closest('.lang-popup')) {
      lp.classList.remove('active');
    }
  });
});

function showSection(type) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(s => s.classList.remove('active'));
  const sec = document.getElementById(type);
  if (sec) sec.classList.add('active');
}

function toggleAI() {
  const popup = document.getElementById('aiPopup');
  if (popup) popup.classList.toggle('active');
}

function toggleLang() {
  const lp = document.getElementById('langPopup');
  if (lp) lp.classList.toggle('active');
}

function setLang(lang) {
  applyLanguage(lang);
  const lp = document.getElementById('langPopup');
  if (lp) lp.classList.remove('active');
}

async function addPlant() {
  const nameEl = document.getElementById('addPlantName');
  const typeEl = document.getElementById('addPlantType');
  const cityEl = document.getElementById('addPlantCity');
  
  const name = (nameEl?.value || document.getElementById('plantName')?.value || '').trim();
  const plantType = (typeEl?.value || document.getElementById('plantType')?.value || '').trim();
  const city = (cityEl?.value || document.getElementById('plantCity')?.value || '').trim();
  const soilType = (document.getElementById('addPlantSoilType')?.value || document.getElementById('plantSoilType')?.value || '').trim();
  
  const n = document.getElementById('addPlantN')?.value || document.getElementById('plantN')?.value || 50;
  const p = document.getElementById('addPlantP')?.value || document.getElementById('plantP')?.value || 50;
  const k = document.getElementById('addPlantK')?.value || document.getElementById('plantK')?.value || 50;
  const m = document.getElementById('addPlantM')?.value || document.getElementById('plantM')?.value || 50;
  const minerals = `N: ${n}%, P: ${p}%, K: ${k}%, Moisture: ${m}%`;

  if (!name || !plantType || !city) {
    alert(getTranslation('fillAllFields'));
    return;
  }

  try {
    const params = new URLSearchParams({ soil_type: soilType, soil_minerals: minerals });
    const res = await fetch(`${API_BASE_URL}/plant?${params.toString()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, plant_type: plantType, city })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || err.error || 'Unable to add plant');
    }

    displayPlantsModal();
    clearInputs();
    alert(getTranslation('plantAddedSuccess'));
  } catch (error) {
    console.error(error);
    alert(getTranslation('addPlantError') + error.message);
  }
}

async function displayPlantsModal() {
  const list = document.getElementById('plantListModal');
  if (!list) return;

  try {
    const res = await fetch(`${API_BASE_URL}/plants`);
    if (!res.ok) throw new Error('Failed to load plants');

    const data = await res.json();
    const plants = data.plants || [];

    if (plants.length === 0) {
      list.innerHTML = getTranslation('noPlants');
      return;
    }

    list.innerHTML = '<strong>Your Plants:</strong><br>' + plants
      .map(p => `🌱 <b>${p.name}</b> (${p.plant_type}) - ${p.city}`)
      .join('<br>');
  } catch (error) {
    console.error(error);
    list.innerHTML = getTranslation('noPlants');
  }
}

async function displayPlants() {
  const list = document.getElementById('plantList');
  if (!list) return;

  try {
    const res = await fetch(`${API_BASE_URL}/plants`);
    if (!res.ok) throw new Error('Failed to load plants');

    const data = await res.json();
    const plants = data.plants || [];

    if (plants.length === 0) {
      list.innerHTML = getTranslation('noPlants');
      return;
    }

    list.innerHTML = plants
      .map(p => `🌱 <b>${p.name}</b> (${p.plant_type}) - ${p.city}`)
      .join('<br>');
  } catch (error) {
    console.error(error);
    list.innerHTML = getTranslation('noPlants');
  }
}

function clearInputs() {
  const ids = [
    'addPlantName', 'addPlantType', 'addPlantCity', 'addPlantSoilType', 'addPlantMinerals',
    'plantName', 'plantType', 'plantCity', 'plantSoilType', 'plantMinerals',
    'diagnoseModalName', 'diagnoseModalFile', 'diagnoseName',
    'recommendModalCity', 'recommendModalSeason', 'recommendModalPlantType', 'recommendModalSoilType', 'recommendModalMinerals',
    'recommendCity', 'recommendSoilType', 'recommendMinerals'
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

async function fetchPresetSoil(cityId, soilId, minId) {
  const city = document.getElementById(cityId)?.value.trim();
  if(!city) {
    alert(getTranslation('noCityRecommend') || 'Please enter a city first');
    return;
  }
  const prefix = minId.replace('Minerals', '');
  const btn = event.currentTarget;
  const originalText = btn.innerText;
  btn.innerText = getTranslation('thinking') || 'Thinking...';
  try {
    const res = await fetch(`${API_BASE_URL}/preset-soil/${encodeURIComponent(city)}`);
    const data = await res.json();
    const soilEl = document.getElementById(soilId);
    if (soilEl) soilEl.value = data.soil_type || 'Loamy';

    const indexMap = { 'plant': 1, 'recommend': 2, 'addPlant': 3, 'recommendModal': 4 };
    const idx = indexMap[prefix] || 1;

    const setSlider = (letter, val) => {
        const input = document.getElementById(prefix + letter);
        const span = document.getElementById('val' + letter + '_' + idx);
        if (input) input.value = val;
        if (span) span.innerText = val;
    };
    
    if (data.minerals) {
        setSlider('N', data.minerals.n);
        setSlider('P', data.minerals.p);
        setSlider('K', data.minerals.k);
    }
    setSlider('M', data.moisture || 50);

  } catch(e) {
    console.error(e);
  } finally {
    btn.innerText = originalText;
  }
}

async function askAI() {
  const question = document.getElementById('aiQuestion').value.trim();
  const respEl = document.getElementById('aiResponse');

  if (!question) {
    if (respEl) respEl.innerText = '⚠️ ' + getTranslation('noQuestion');
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/talk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, lang: document.documentElement.lang || 'en' })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || err.error || 'AI request failed');
    }

    const result = await res.json();
    if (respEl) respEl.innerText = getTranslation('botPrefix') + (result.answer || getTranslation('noAnswer'));
    clearInputs();
  } catch (error) {
    console.error(error);
    if (respEl) respEl.innerText = '❌ ' + getTranslation('aiRequestError') + error.message;
  }
}

async function getRecommendation() {
  const city = document.getElementById('recommendCity').value.trim();
  const season = document.getElementById('recommendSeason').value || '';
  const plantType = document.getElementById('recommendPlantType').value || '';
  const soilType = document.getElementById('recommendSoilType')?.value || '';
  const n = document.getElementById('recommendN')?.value || 50;
  const p = document.getElementById('recommendP')?.value || 50;
  const k = document.getElementById('recommendK')?.value || 50;
  const m = document.getElementById('recommendM')?.value || 50;
  const minerals = `N: ${n}%, P: ${p}%, K: ${k}%, Moisture: ${m}%`;
  const resultBox = document.getElementById('resultBox');

  if (!resultBox) return;

  if (!city) {
    resultBox.innerText = '⚠️ ' + getTranslation('noCityRecommend');
    return;
  }

  try {
    const params = new URLSearchParams({ city, season, plant_type: plantType, soil_type: soilType, soil_minerals: minerals });
    const res = await fetch(`${API_BASE_URL}/recommend?${params.toString()}`);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || err.error || 'Recommendation failed');
    }

    const data = await res.json();
    if (data.error) {
      resultBox.innerText = `⚠️ ${data.error}`;
    } else if (Array.isArray(data)) {
      resultBox.innerHTML = `<b>${getTranslation('recommendationsLabel')}</b><br>${data.join('<br>')}`;
    } else {
      resultBox.innerHTML = `<b>${getTranslation('resultLabel')}</b><br>${JSON.stringify(data, null, 2)}`;
    }
  } catch (error) {
    console.error(error);
    resultBox.innerText = '❌ ' + getTranslation('recommendationError') + error.message;
  }
}

function formatTextAsHTML(text) {
  if (!text) return '';
  return String(text)
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function formatDiagnosis(data) {
  let html = '';
  if (data.disease) {
    html += `<strong>Disease:</strong> ${data.disease}<br><br>`;
  }
  if (data.ai_advice) {
    html += `<div>${formatTextAsHTML(data.ai_advice)}</div>`;
  }
  if (!html) {
    html = formatTextAsHTML(JSON.stringify(data, null, 2));
  }
  return html;
}

async function diagnosePlant() {
  const name = document.getElementById('diagnoseName').value.trim();
  const fileInput = document.getElementById('diagnoseFile');
  const resultEl = document.getElementById('diagnosisResult');

  if (!name || !fileInput.files || fileInput.files.length === 0) {
    if (resultEl) resultEl.innerHTML = '⚠️ ' + getTranslation('plantImageMissing');
    return;
  }

  if (resultEl) {
    resultEl.innerHTML = `<span style="color: #4f772d;"><i class="fas fa-spinner fa-spin"></i> ${getTranslation('thinking')}</span>`;
  }

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  const lang = document.documentElement.lang || 'en';

  try {
    const res = await fetch(`${API_BASE_URL}/plant/${encodeURIComponent(name)}/diagnose?lang=${lang}`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Diagnose failed');
    if (resultEl) resultEl.innerHTML = getTranslation('diagnosisSuccessLabel') + '<br>' + formatDiagnosis(data);
  } catch (error) {
    console.error(error);
    if (resultEl) resultEl.innerHTML = '❌ ' + getTranslation('diagnoseError') + error.message;
  }
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const chatBox = document.getElementById('chatBox');
  const msg = input.value.trim();

  if (!msg || !chatBox) return;

  const userDiv = document.createElement('div');
  userDiv.textContent = getTranslation('userPrefix') + msg;
  chatBox.appendChild(userDiv);

  const loading = document.createElement('div');
  loading.textContent = '🌱 ' + getTranslation('thinking');
  chatBox.appendChild(loading);
  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = '';

  setTimeout(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/talk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: msg, lang: document.documentElement.lang || 'en' })
      });
      const result = await res.json();
      let fullText = getTranslation('botPrefix') + (result.answer || getTranslation('noAnswer'));
      if (res.ok) {
        // Typing effect
        loading.textContent = '';
        let i = 0;
        function typeChar() {
          if (i <= fullText.length) {
            loading.textContent = fullText.slice(0, i);
            i++;
            chatBox.scrollTop = chatBox.scrollHeight;
            setTimeout(typeChar, 18); // typing speed
          }
        }
        typeChar();
      } else {
        loading.textContent = getTranslation('botPrefix') + getTranslation('chatError') + (result.error || 'Unknown');
      }
    } catch (err) {
      loading.textContent = getTranslation('botPrefix') + getTranslation('chatError') + err.message;
      console.error(err);
    }
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    showSection(sectionId);
    setTimeout(() => {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

function scrollToFeaturesSection() {
  const featuresSection = document.querySelector('.intro');
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function toggleProjectInfo() {
  const modal = document.getElementById('projectInfoModal');
  if (modal) {
    modal.classList.toggle('active');
  }
}

function toggleGetStarted() {
  const modal = document.getElementById('getStartedModal');
  if (modal) {
    modal.classList.toggle('active');
  }
}

function toggleAddPlantsInfo() {
  const modal = document.getElementById('addPlantsModal');
  if (modal) {
    modal.classList.toggle('active');
  }
}

function toggleDiagnoseInfo() {
  const modal = document.getElementById('diagnoseModal');
  if (modal) {
    modal.classList.toggle('active');
  }
}

function toggleRecommendInfo() {
  const modal = document.getElementById('recommendModal');
  if (modal) {
    modal.classList.toggle('active');
  }
}

function toggleAddPlantForm() {
  const modal = document.getElementById('addPlantFormModal');
  if (modal) {
    modal.classList.toggle('active');
    displayPlantsModal();
  }
}

function toggleDiagnoseForm() {
  const modal = document.getElementById('diagnoseFormModal');
  if (modal) {
    modal.classList.toggle('active');
  }
}

function toggleRecommendForm() {
  const modal = document.getElementById('recommendFormModal');
  if (modal) {
    modal.classList.toggle('active');
  }
}

async function diagnosePlantModal() {
  const name = document.getElementById('diagnoseModalName').value.trim();
  const fileInput = document.getElementById('diagnoseModalFile');
  const resultEl = document.getElementById('diagnosisResultModal');

  if (!name || !fileInput.files || fileInput.files.length === 0) {
    if (resultEl) resultEl.innerHTML = '⚠️ ' + getTranslation('plantImageMissing');
    return;
  }

  if (resultEl) {
    resultEl.innerHTML = `<span style="color: #4f772d;"><i class="fas fa-spinner fa-spin"></i> ${getTranslation('thinking')}</span>`;
  }

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  const lang = document.documentElement.lang || 'en';

  try {
    const res = await fetch(`${API_BASE_URL}/plant/${encodeURIComponent(name)}/diagnose?lang=${lang}`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || data.error || 'Diagnose failed');
    if (resultEl) resultEl.innerHTML = getTranslation('diagnosisSuccessLabel') + '<br>' + formatDiagnosis(data);
    
  } catch (error) {
    console.error(error);
    if (resultEl) resultEl.innerHTML = '❌ ' + getTranslation('diagnoseError') + error.message;
  }
}

async function getRecommendationModal() {
  const city = document.getElementById('recommendModalCity').value.trim();
  const season = document.getElementById('recommendModalSeason').value || '';
  const plantType = document.getElementById('recommendModalPlantType').value || '';
  const soilType = document.getElementById('recommendModalSoilType')?.value || '';
  const n = document.getElementById('recommendModalN')?.value || 50;
  const p = document.getElementById('recommendModalP')?.value || 50;
  const k = document.getElementById('recommendModalK')?.value || 50;
  const m = document.getElementById('recommendModalM')?.value || 50;
  const minerals = `N: ${n}%, P: ${p}%, K: ${k}%, Moisture: ${m}%`;
  const resultBox = document.getElementById('resultBoxModal');

  if (!resultBox) return;

  if (!city) {
    resultBox.innerText = '⚠️ ' + getTranslation('noCityRecommend');
    return;
  }

  try {
    const params = new URLSearchParams({ city, season, plant_type: plantType, soil_type: soilType, soil_minerals: minerals });
    const res = await fetch(`${API_BASE_URL}/recommend?${params.toString()}`);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || err.error || 'Recommendation failed');
    }

    const data = await res.json();
    if (data.error) {
      resultBox.innerText = `⚠️ ${data.error}`;
    } else if (Array.isArray(data)) {
      resultBox.innerHTML = `<b>${getTranslation('recommendationsLabel')}</b><br>${data.join('<br>')}`;
    } else {
      resultBox.innerHTML = `<b>${getTranslation('resultLabel')}</b><br>${JSON.stringify(data, null, 2)}`;
    }
    clearInputs();
  } catch (error) {
    console.error(error);
    resultBox.innerText = '❌ ' + getTranslation('recommendationError') + error.message;
  }
}

function toggleUserDashboard() {
  const modal = document.getElementById('userDashboardModal');
  if (modal) {
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
      loadDashboardData();
    }
  }
}

async function loadDashboardData() {
  const container = document.getElementById('dashboardPlantsContainer');
  if (!container) return;
  container.innerHTML = `<span style="color: #4f772d;"><i class="fas fa-spinner fa-spin"></i> Loading your dashboard...</span>`;

  try {
    const res = await fetch(`${API_BASE_URL}/plants`);
    if (!res.ok) throw new Error('Failed to load plants');

    const data = await res.json();
    const plants = data.plants || [];

    if (plants.length === 0) {
      container.innerHTML = 'You have not added any plants yet.';
      return;
    }

    container.innerHTML = '';
    
    for (const p of plants) {
      const cardId = `plant-card-${p.name.replace(/\s+/g, '-')}`;
      
      const cardHTML = `
        <div id="${cardId}" style="border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 15px; background: rgba(0,0,0,0.2);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
            <div>
              <h3 style="margin: 0; color: #a3b18a;">🌱 ${p.name}</h3>
              <p style="margin: 5px 0 0 0; font-size: 14px;"><strong>Type:</strong> ${p.plant_type} | <strong>City:</strong> ${p.city} | <strong>Health Score:</strong> ${p.health_score !== undefined ? p.health_score : 'N/A'}/100</p>
              <p id="${cardId}-weather" style="margin: 5px 0 0 0; font-size: 14px; color: #d0d0d0;"><i class="fas fa-spinner fa-spin"></i> Fetching weather...</p>
            </div>
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              <input type="number" id="${cardId}-waterAmount" placeholder="Amount (Liters)" style="width: 120px; padding: 8px; border-radius: 4px; border: 1px solid #4f772d; background: transparent; color: white;">
              <button onclick="logWaterForPlant('${p.name}', '${cardId}-waterAmount')" style="padding: 8px 12px; font-size: 14px; cursor: pointer; border: none; border-radius: 4px; background: #4f772d; color: white;">💧 Add Water</button>
              <button onclick="showWaterHistory('${p.name}')" style="padding: 8px 12px; font-size: 14px; cursor: pointer; border: none; border-radius: 4px; background: rgba(82,183,136,0.2); color: #95d5b2; border: 1px solid rgba(82,183,136,0.4);">📋 Water History</button>
              <button onclick="analyzePlantDashboard('${p.name}', '${cardId}-analysis')" style="padding: 8px 12px; font-size: 14px; cursor: pointer; border: none; border-radius: 4px; background: #dda15e; color: white;">🤖 Analyze Strategy</button>
            </div>
          </div>
          <div id="${cardId}-analysis" style="margin-top: 15px; font-size: 14px;"></div>
        </div>
      `;
      container.innerHTML += cardHTML;
      
      // Async fetch weather to avoid blocking rendering of all cards
      fetch(`${API_BASE_URL}/watering/${encodeURIComponent(p.city)}`)
        .then(r => r.json())
        .then(wData => {
           let weatherText = 'Weather unavailable';
           if (wData && wData.weather) {
             weatherText = `<strong>Temp:</strong> ${wData.weather.temperature}°C | <strong>Humidity:</strong> ${wData.weather.humidity}% | <strong>Condition:</strong> ${wData.weather.description}`;
           }
           const wEl = document.getElementById(`${cardId}-weather`);
           if (wEl) wEl.innerHTML = weatherText;
        })
        .catch(err => {
           const wEl = document.getElementById(`${cardId}-weather`);
           if (wEl) wEl.innerHTML = 'Weather unavailable';
        });
    }
  } catch (err) {
    console.error(err);
    container.innerHTML = `Failed to load dashboard: ${err.message}`;
  }
}

async function logWaterForPlant(name, inputId) {
  const amountStr = document.getElementById(inputId).value;
  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount greater than 0');
    return;
  }
  
  try {
    const res = await fetch(`${API_BASE_URL}/plant/${encodeURIComponent(name)}/watering?amount=${amount}&unit=liters`, {
      method: 'POST'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to log water');
    alert(`Successfully logged ${amount} liters for ${name}.`);
    document.getElementById(inputId).value = '';
    // Optionally reload dashboard to fetch new logs if necessary
  } catch (err) {
    alert('Error logging water: ' + err.message);
  }
}

async function analyzePlantDashboard(name, resultId) {
  const resultContainer = document.getElementById(resultId);
  if (!resultContainer) return;
  
  resultContainer.innerHTML = `<span style="color: #dda15e;"><i class="fas fa-spinner fa-spin"></i> Analyzing plant information to generate growth strategy...</span>`;
  
  try {
    const lang = document.documentElement.lang || 'en';
    const res = await fetch(`${API_BASE_URL}/plant/${encodeURIComponent(name)}/analytics?lang=${lang}`);
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.error || 'Failed to analyze');
    
    const formattedAnalysis = formatDiagnosis({ ai_advice: data.ai_insights });
    resultContainer.innerHTML = `
      <div style="background: rgba(221, 161, 94, 0.1); padding: 15px; border-left: 4px solid #dda15e; border-radius: 4px; margin-top: 10px;">
        <h4 style="margin: 0 0 10px 0; color: #dda15e;">📈 AI Strategy Analysis</h4>
        ${formattedAnalysis}
      </div>
    `;
  } catch (err) {
    resultContainer.innerHTML = `<span style="color: #e63946;">❌ Error: ${err.message}</span>`;
  }
}

async function showWaterHistory(plantName) {
  const modal = document.getElementById('waterHistoryModal');
  const titleEl = document.getElementById('waterHistoryPlantName');
  const listEl = document.getElementById('waterHistoryList');

  if (!modal || !listEl) return;

  titleEl.textContent = `Plant: ${plantName}`;
  listEl.innerHTML = `<span style="color: #52b788;"><i class="fas fa-spinner fa-spin"></i> Loading history...</span>`;
  modal.classList.add('active');

  try {
    const res = await fetch(`${API_BASE_URL}/plant/${encodeURIComponent(plantName)}/watering`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to load history');

    const logs = (data.logs || []).filter(l => l.action === 'watering');

    if (logs.length === 0) {
      listEl.innerHTML = `<p style="color: #a8b8b0;">No watering history recorded yet.</p>`;
      return;
    }

    listEl.innerHTML = logs.slice().reverse().map((log) => {
      const details = log.data || log.details || {};
      const amount = details.amount ?? 'N/A';
      const unit = details.unit || 'liters';
      const time = log.timestamp ? new Date(log.timestamp).toLocaleString() : 'Unknown time';
      const temp = details.weather?.temperature ? `${details.weather.temperature}°C` : '';
      const humidity = details.weather?.humidity ? `${details.weather.humidity}% humidity` : '';
      const weatherInfo = [temp, humidity].filter(Boolean).join(' · ');

      return `
        <div style="
          background: rgba(82,183,136,0.07);
          border: 1px solid rgba(82,183,136,0.2);
          border-radius: 10px;
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        ">
          <div>
            <span style="font-size: 22px;">💧</span>
            <strong style="color: #95d5b2; margin-left: 6px;">${amount} ${unit}</strong>
          </div>
          <div style="text-align: right; font-size: 13px; color: #a8b8b0;">
            <div>🕐 ${time}</div>
            ${weatherInfo ? `<div>🌡️ ${weatherInfo}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');

  } catch (err) {
    listEl.innerHTML = `<span style="color: #e63946;">❌ Error: ${err.message}</span>`;
  }
}

function closeWaterHistory() {
  const modal = document.getElementById('waterHistoryModal');
  if (modal) modal.classList.remove('active');
}

// =============================================
// VOICE FEATURE — MediaRecorder + Backend STT
// =============================================

// =============================================
// VOICE FEATURE — Web Audio API + WAV Recorder
// =============================================

let audioContext = null;
let scriptProcessor = null;
let micStream = null;
let leftChannel = [];
let recordingStartTime = 0;
let recordingTimerInterval = null;
let isRecordingVoice = false;
let currentSpeechUtterance = null;

function toggleVoiceInput() {
  if (isRecordingVoice) {
    stopRecordingManually();
  } else {
    startVoiceInput();
  }
}

async function startVoiceInput() {
  if (window.location.protocol === 'file:') {
    alert('Talk to AI (Voice) requires the page to be served over HTTP.\n\nPlease open: http://localhost:8000');
    return;
  }

  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
    const source = audioContext.createMediaStreamSource(micStream);
    
    // Using ScriptProcessorNode for wide compatibility (WAV encoding needs raw samples)
    scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
    leftChannel = [];

    scriptProcessor.onaudioprocess = (event) => {
      if (!isRecordingVoice) return;
      const samples = new Float32Array(event.inputBuffer.getChannelData(0));
      leftChannel.push(samples);
    };

    source.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);

    const overlay = document.getElementById('voiceOverlay');
    const statusEl = document.getElementById('voiceStatusText');
    const micBtn = document.getElementById('micBtn');
    const timerEl = document.getElementById('voiceTimer');
    const interimEl = document.getElementById('voiceInterimText');

    const lang = document.documentElement.lang || 'en';
    const isHindi = lang === 'hi';
    
    statusEl.textContent = isHindi ? 'रिकॉर्डिंग चालू है...' : 'Recording...';
    interimEl.textContent = '';
    overlay.classList.add('active');
    micBtn && micBtn.classList.add('recording');
    
    isRecordingVoice = true;
    startTimer();

  } catch (err) {
    console.error('Microphone access error:', err);
    alert('Could not access microphone: ' + err.message);
  }
}

function stopRecordingManually() {
  if (!isRecordingVoice) return;
  isRecordingVoice = false;
  
  stopTimer();
  const statusEl = document.getElementById('voiceStatusText');
  const lang = document.documentElement.lang || 'en';
  const isHindi = lang === 'hi';
  statusEl.textContent = isHindi ? 'प्रोसेसिंग...' : 'Processing...';

  // Cleanup Web Audio nodes
  if (scriptProcessor) {
    scriptProcessor.disconnect();
    scriptProcessor.onaudioprocess = null;
  }
  if (micStream) {
    micStream.getTracks().forEach(track => track.stop());
  }
  if (audioContext) {
    audioContext.close();
  }

  // Create WAV blob
  const wavBlob = createWavBlob(leftChannel, 16000);
  sendAudioToBackend(wavBlob, lang);
}

async function sendAudioToBackend(audioBlob, lang) {
  const formData = new FormData();
  formData.append('file', audioBlob, 'voice.wav');
  
  try {
    const res = await fetch(`${API_BASE_URL}/transcribe?lang=${lang}`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    
    if (data.text) {
      sendVoiceMessage(data.text);
    } else if (data.error) {
      alert('Voice Error: ' + data.error);
    }
  } catch (err) {
    console.error('Transcription Error:', err);
    alert('Failed to connect to transcription service.');
  } finally {
    closeVoiceOverlay();
  }
}

function cancelVoiceInput() {
  isRecordingVoice = false;
  if (scriptProcessor) {
    scriptProcessor.disconnect();
    scriptProcessor.onaudioprocess = null;
  }
  if (micStream) {
    micStream.getTracks().forEach(track => track.stop());
  }
  if (audioContext) {
    audioContext.close();
  }
  closeVoiceOverlay();
  stopTimer();
}

/**
 * Encodes Float32 samples into a standard 16-bit PCM WAV blob.
 */
function createWavBlob(samplesList, sampleRate) {
  // Flatten chunks
  let totalLength = 0;
  for (let i = 0; i < samplesList.length; i++) {
    totalLength += samplesList[i].length;
  }
  const samples = new Float32Array(totalLength);
  let offset = 0;
  for (let i = 0; i < samplesList.length; i++) {
    samples.set(samplesList[i], offset);
    offset += samplesList[i].length;
  }

  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  /* file length */
  view.setUint32(4, 32 + samples.length * 2, true);
  /* RIFF type */
  writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, 1, true);
  /* channel count */
  view.setUint16(22, 1, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * 2, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, 2, true);
  /* bits per sample */
  view.setUint16(34, 16, true);
  /* data chunk identifier */
  writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, samples.length * 2, true);

  // Write samples (PCM 16-bit)
  let index = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(index, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    index += 2;
  }

  return new Blob([view], { type: 'audio/wav' });
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function closeVoiceOverlay() {
  const overlay = document.getElementById('voiceOverlay');
  const micBtn = document.getElementById('micBtn');
  overlay && overlay.classList.remove('active');
  micBtn && micBtn.classList.remove('recording');
  isRecordingVoice = false;
}

function startTimer() {
  recordingStartTime = Date.now();
  const timerEl = document.getElementById('voiceTimer');
  if (timerEl) timerEl.textContent = '00:00';
  
  recordingTimerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
    const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const secs = String(elapsed % 60).padStart(2, '0');
    if (timerEl) timerEl.textContent = `${mins}:${secs}`;
    
    if (elapsed >= 30) stopRecordingManually();
  }, 1000);
}

function stopTimer() {
  if (recordingTimerInterval) {
    clearInterval(recordingTimerInterval);
    recordingTimerInterval = null;
  }
}

function sendVoiceMessage(text) {
  const popup = document.getElementById('aiPopup');
  if (popup && !popup.classList.contains('active')) {
    popup.classList.add('active');
  }

  const chatBox = document.getElementById('chatBox');
  const input = document.getElementById('chatInput');
  if (!chatBox) return;

  const userDiv = document.createElement('div');
  userDiv.innerHTML = getTranslation('userPrefix') + text + '<span class="chat-voice-tag">🎤 voice</span>';
  chatBox.appendChild(userDiv);

  const loading = document.createElement('div');
  loading.textContent = '🌱 ' + getTranslation('thinking');
  chatBox.appendChild(loading);
  chatBox.scrollTop = chatBox.scrollHeight;
  if (input) input.value = '';

  setTimeout(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/talk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text,
          lang: document.documentElement.lang || 'en'
        })
      });
      const result = await res.json();
      const answer = result.answer || getTranslation('noAnswer');
      const fullText = getTranslation('botPrefix') + answer;

      if (res.ok) {
        loading.textContent = '';
        let i = 0;
        function typeChar() {
          if (i <= fullText.length) {
            loading.textContent = fullText.slice(0, i);
            i++;
            chatBox.scrollTop = chatBox.scrollHeight;
            setTimeout(typeChar, 18);
          } else {
            addSpeakButton(loading, answer);
            speakResponse(answer);
          }
        }
        typeChar();
      } else {
        loading.textContent = getTranslation('botPrefix') + getTranslation('chatError') + (result.error || 'Unknown');
      }
    } catch (err) {
      loading.textContent = getTranslation('botPrefix') + getTranslation('chatError') + err.message;
      console.error(err);
    }
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);
}

function addSpeakButton(el, text) {
  const btn = document.createElement('button');
  btn.className = 'speak-btn';
  btn.title = 'Read aloud';
  btn.innerHTML = '🔊';
  btn.onclick = () => {
    if (btn.classList.contains('speaking')) {
      stopSpeaking();
      btn.classList.remove('speaking');
    } else {
      stopSpeaking();
      document.querySelectorAll('.speak-btn.speaking').forEach(b => b.classList.remove('speaking'));
      btn.classList.add('speaking');
      speakResponse(text, () => btn.classList.remove('speaking'));
    }
  };
  el.appendChild(btn);
}

function speakResponse(text, onEnd) {
  if (!window.speechSynthesis) return;
  stopSpeaking();
  const lang = document.documentElement.lang || 'en';
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  utterance.rate = 0.95;
  utterance.pitch = 1.05;
  const voices = window.speechSynthesis.getVoices();
  const baseLang = utterance.lang.split('-')[0].toLowerCase();
  const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(baseLang));
  if (matchedVoice) utterance.voice = matchedVoice;
  utterance.onend = () => {
    currentSpeechUtterance = null;
    if (typeof onEnd === 'function') onEnd();
  };
  currentSpeechUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

function stopSpeaking() {
  if (window.speechSynthesis && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  currentSpeechUtterance = null;
}

if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}


