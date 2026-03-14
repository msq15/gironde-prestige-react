// --- STATE & DATABASE ---
const state = {
    step: 1,
    maxSteps: 4,
    data: { type: 'Maison', zone: '', area: 85, rooms: 3, bonus: [] }
};

const ZONE_DB = {
    "Bordeaux Triangle": { lat: 44.842, lng: -0.575, price: 6800 },
    "Chartrons": { lat: 44.852, lng: -0.570, price: 5900 },
    "Cauderan": { lat: 44.848, lng: -0.608, price: 4500 },
    "Bastide": { lat: 44.841, lng: -0.552, price: 4200 },
    "Pessac": { lat: 44.806, lng: -0.628, price: 3800 },
    "Bassin": { lat: 44.661, lng: -1.168, price: 8500 },
    "Vignobles": { lat: 44.894, lng: -0.158, price: 3200 }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMobileMenu = () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        if (isOpen) {
            mobileMenu.classList.remove('scale-y-100', 'opacity-100');
            setTimeout(() => mobileMenu.classList.add('hidden'), 200);
        } else {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => mobileMenu.classList.add('scale-y-100', 'opacity-100'), 10);
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMobileMenu));

    // 2. Logo Reset
    document.getElementById('resetLogo').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.reload();
    });

    // 3. Form Forms Prevent Default
    document.getElementById('calcForm').addEventListener('submit', (e) => e.preventDefault());
    document.getElementById('leadForm').addEventListener('submit', (e) => {
        e.preventDefault();
        unlockResults();
    });

    // 4. Sliders (Area & Rooms)
    document.getElementById('area').addEventListener('input', (e) => {
        state.data.area = parseInt(e.target.value);
        document.getElementById('areaVal').innerText = state.data.area;
    });

    document.getElementById('rooms').addEventListener('input', (e) => {
        state.data.rooms = parseInt(e.target.value);
        document.getElementById('roomsVal').innerText = state.data.rooms;
    });

    // 5. Checkboxes (Bonus features)
    document.querySelectorAll('.feature-checkbox').forEach(box => {
        box.addEventListener('change', (e) => {
            if (e.target.checked) state.data.bonus.push(e.target.id);
            else state.data.bonus = state.data.bonus.filter(id => id !== e.target.id);
        });
    });

    // 6. Navigation Buttons
    document.getElementById('nextBtn').addEventListener('click', () => moveStep(1));
    document.getElementById('prevBtn').addEventListener('click', () => moveStep(-1));

    // 7. Auto-advance for Radio Buttons (Step 1)
    document.querySelectorAll('.radio-auto-advance').forEach(radio => {
        radio.addEventListener('change', () => {
            state.data.type = document.querySelector('input[name="type"]:checked').value;
            setTimeout(() => moveStep(1), 300);
        });
    });

    // Start UI
    updateUI();
});

// --- CORE LOGIC ---

function updateUI() {
    const formScreens = document.querySelectorAll('.form-step');
    const progressBar = document.getElementById('progressBar');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    // Update screen visibility
    formScreens.forEach((el, index) => {
        const stepNum = index + 1;
        if (stepNum === state.step) {
            el.classList.remove('hidden-step', 'hidden');
            el.classList.add('active-step');
        } else {
            el.classList.remove('active-step');
            el.classList.add('hidden-step');
            setTimeout(() => { if (state.step !== stepNum) el.classList.add('hidden'); }, 400);
        }
    });

    // Update progress bar
    const percent = (state.step / state.maxSteps) * 100;
    progressBar.style.width = `${percent}%`;

    // Update Headers dynamically
    const titles = ["Type de bien", "Localisation", "Caractéristiques", "Les plus"];
    const subs = ["Type de propriété ?", "L'emplacement est clé.", "Détails du bien.", "Atouts valorisants."];
    const header = document.getElementById('headerText');

    header.style.opacity = 0;
    setTimeout(() => {
        document.getElementById('stepTitle').innerText = titles[state.step - 1];
        document.getElementById('stepSubtitle').innerText = subs[state.step - 1];
        header.style.opacity = 1;
    }, 300);

    // Update Buttons states
    prevBtn.classList.toggle('opacity-0', state.step === 1);
    prevBtn.classList.toggle('cursor-default', state.step === 1);

    if (state.step === state.maxSteps) {
        nextBtn.innerHTML = `Calculer l'estimation <i class="fa-solid fa-calculator ml-2"></i>`;
        nextBtn.classList.replace('bg-gray-900', 'bg-bordeaux');
    } else {
        nextBtn.innerHTML = `Suivant`;
        nextBtn.classList.replace('bg-bordeaux', 'bg-gray-900');
    }
}

function moveStep(dir) {
    // Validation before moving next from Step 2
    if (dir > 0 && state.step === 2) {
        state.data.zone = document.getElementById('zone').value;
        if (!state.data.zone) {
            document.getElementById('zone').classList.add('ring-2', 'ring-red-500');
            return;
        } else {
            document.getElementById('zone').classList.remove('ring-2', 'ring-red-500');
        }
    }

    const nextStep = state.step + dir;
    if (nextStep > state.maxSteps) {
        runSimulation();
        return;
    }
    if (nextStep > 0) {
        state.step = nextStep;
        updateUI();
    }
}

function runSimulation() {
    document.getElementById('navControls').classList.add('hidden');
    document.getElementById('loaderLayer').classList.remove('hidden');
    document.getElementById('loaderLayer').classList.add('flex');

    const txts = ["Analyse comparative...", "Interrogation base Perval...", "Finalisation du rapport..."];
    let i = 0;
    setInterval(() => {
        if (i < txts.length) document.getElementById('loaderText').innerText = txts[i++];
    }, 1000);

    setTimeout(() => {
        document.getElementById('spinnerStage').classList.add('hidden');
        document.getElementById('emailGate').classList.remove('hidden');
    }, 3000);
}

function unlockResults() {
    // Business Logic / Calculation
    const zoneInfo = ZONE_DB[state.data.zone] || ZONE_DB["Bordeaux Triangle"];
    let basePrice = zoneInfo.price * state.data.area;
    if (state.data.type === 'Appartement') basePrice *= 0.95; // 5% décote

    const bonusMult = 1 + (state.data.bonus.length * 0.05); // 5% par bonus
    let finalPrice = Math.round((basePrice * bonusMult) / 1000) * 1000;

    // Populate Summary
    document.getElementById('sumType').innerText = state.data.type;
    document.getElementById('sumArea').innerText = state.data.area + ' m²';
    document.getElementById('sumRooms').innerText = state.data.rooms;
    document.getElementById('sumZone').innerText = state.data.zone;

    // Format & Insert Prices
    document.getElementById('finalPrice').innerText = finalPrice.toLocaleString('fr-FR');
    document.getElementById('lowPrice').innerText = Math.round(finalPrice * 0.94).toLocaleString('fr-FR') + " €";
    document.getElementById('highPrice').innerText = Math.round(finalPrice * 1.06).toLocaleString('fr-FR') + " €";
    document.getElementById('resLocation').innerText = state.data.zone;

    // Visual FX
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#800020', '#D4AF37'] });

    // Show Results & Scroll
    const resultSec = document.getElementById('results');
    resultSec.classList.remove('hidden');
    resultSec.scrollIntoView({ behavior: 'smooth' });

    // Init Leaflet Map after a small delay to ensure DOM is ready
    setTimeout(() => {
        const map = L.map('resultMap', { zoomControl: false, attributionControl: false }).setView([zoneInfo.lat, zoneInfo.lng], 15);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);
        L.circle([zoneInfo.lat, zoneInfo.lng], { color: '#800020', fillColor: '#800020', fillOpacity: 0.15, radius: 400 }).addTo(map);
        L.marker([zoneInfo.lat, zoneInfo.lng]).addTo(map);
    }, 500);
}