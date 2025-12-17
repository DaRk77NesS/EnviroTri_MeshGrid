// --- STATE & DATA ---
let cart = [];
let currentCategory = 'All';
let sortOption = 'recommended';
let searchQuery = '';

const products = [
    { id: 1, name: "Li-Ion Cell (Recovered)", category: "Power", price: 250, description: "Grade A 18650 cell harvested from laptop packs. Tested >85% capacity.", specs: ["Capacity: 2200mAh", "Voltage: 3.7V", "Cycles: 45"] },
    { id: 2, name: "NEMA 17 Stepper Motor", category: "Motors", price: 450, description: "reclaimed from printers. High torque, perfect for CNC/3D print.", specs: ["Step Angle: 1.8 deg", "Torque: 40Ncm", "Current: 1.2A"] },
    { id: 3, name: "12V Cooling Fan", category: "Cooling", price: 120, description: "Brushless DC fan. Quiet operation. Cleaned and lubed.", specs: ["Size: 80mm", "RPM: 2000", "Noise: 22dBA"] },
    { id: 4, name: "LCD Screen Module", category: "Displays", price: 300, description: "16x2 character display with I2C adapter.", specs: ["Backlight: Blue", "Interface: I2C", "Contrast: Adjustable"] },
    { id: 5, name: "Aluminum Heatsink", category: "Cooling", price: 80, description: "Extruded aluminum profile. Various sizes.", specs: ["Material: Al 6063", "Thermal Res: 2.5 C/W"] },
    { id: 6, name: "Microswitch Pack (5pcs)", category: "Components", price: 50, description: "Limit switches for robotics.", specs: ["Rating: 5A 125VAC", "Life: 1M cycles"] },
    { id: 7, name: "Arduino Uno R3 (Used)", category: "Microcontrollers", price: 850, description: "Genuine board, fully pin-tested. USB cable included.", specs: ["Chip: ATmega328P", "IO: 14 Digital, 6 Analog", "Cond: Excellent"] },
    { id: 8, name: "ESP8266 WiFi Module", category: "Microcontrollers", price: 280, description: "IoT ready NodeMCU board. Desoldered from smart plugs.", specs: ["WiFi: 2.4GHz", "Flash: 4MB", "Logic: 3.3V"] },
    { id: 9, name: "SG90 Micro Servo", category: "Motors", price: 150, description: "Small servo for RC planes or robotic arms. Nylon gears.", specs: ["Torque: 1.6kg/cm", "Speed: 0.12s/60deg", "Weight: 9g"] },
    { id: 10, name: "OLED Display 0.96\"", category: "Displays", price: 350, description: "Crisp white/blue OLED. I2C interface.", specs: ["Res: 128x64", "Driver: SSD1306", "Pins: 4"] },
    { id: 11, name: "Ultrasonic Sensor HC-SR04", category: "Sensors", price: 90, description: "Distance measuring module. Tested for echo accuracy.", specs: ["Range: 2cm-400cm", "Accuracy: 3mm", "Voltage: 5V"] },
    { id: 12, name: "BMS 3S 20A", category: "Power", price: 180, description: "Battery Management System for 12V packs.", specs: ["Cells: 3 Series", "Current: 20A Max", "Balance: Yes"] },
    { id: 13, name: "Rotary Encoder", category: "Components", price: 75, description: "Digital volume/menu knob with push button.", specs: ["Type: Incremental", "Detents: 20", "Push Switch: Yes"] },
    { id: 14, name: "Solenoid Valve 12V", category: "Motors", price: 320, description: "Liquid control valve. Reclaimed from coffee machines.", specs: ["Pressure: 0.02-0.8Mpa", "Type: Normally Closed", "Fluid: Water"] },
    { id: 15, name: "Raspberry Pi 3B+", category: "Microcontrollers", price: 2800, description: "Quad-core computer. Thermal paste reapplied.", specs: ["RAM: 1GB", "BT/WiFi: Yes", "USB: 4 Ports"] },
    { id: 16, name: "LM2596 Buck Converter", category: "Power", price: 85, description: "Step-down voltage regulator module.", specs: ["Input: 4-35V", "Output: 1.2-30V", "Eff: 92%"] },
    { id: 17, name: "Peltier Module 12706", category: "Cooling", price: 210, description: "Thermoelectric cooler/heater plate.", specs: ["Voltage: 12V", "Max Temp Diff: 65C", "Power: 60W"] },
    { id: 18, name: "Relay Module 4-CH", category: "Components", price: 240, description: "Control AC loads from Arduino.", specs: ["Channels: 4", "Logic: 5V isolated", "Load: 10A 250V"] },
    // --- NEW EXPANSION (PCB Salvage & Specifics) ---
    { id: 19, name: "Gold-Plated Pins (10g)", category: "Precious Metals", price: 650, description: "High-grade gold plated connector pins recovered from server backplanes.", specs: ["Purity: High", "Source: Server RAM/CPU", "Weight: 10g"] },
    { id: 20, name: "IRFP260N MOSFET", category: "Components", price: 120, description: "Heavy duty power MOSFET. Desoldered from industrial UPS.", specs: ["Vds: 200V", "Id: 50A", "Pkg: TO-247"] },
    { id: 21, name: "High-Volt Capacitor 450V", category: "Components", price: 150, description: "Large electrolytic cap for power supplies/coilguns.", specs: ["Cap: 470uF", "Volt: 450V", "Temp: 105C"] },
    { id: 22, name: "Vintage Intel 486 CPU", category: "Vintage", price: 1200, description: "Collectible ceramic CPU. Perfect pins. Museum quality.", specs: ["Year: 1989", "Socket: 3", "Architecture: x86"] },
    { id: 23, name: "Rubycon Capacitor Kit", category: "Components", price: 200, description: "Assorted high-quality Japanese caps (Low ESR).", specs: ["Count: 20pcs", "Voltage: 16-50V", "Type: Electrolytic"] },
    { id: 24, name: "Omron Industrial Relay", category: "Industrial", price: 350, description: "Heavy duty clear-case relay with socket base.", specs: ["Coil: 24VDC", "Contact: 10A 240VAC", "Poles: DPDT"] },
    { id: 25, name: "Ferrite Toroid Core", category: "Components", price: 60, description: "Large noise-suppression ring for power cables/RF.", specs: ["OD: 30mm", "Material: MnZn", "Permeability: High"] },
    { id: 26, name: "Linear Regulator L7805", category: "Components", price: 25, description: "Classic 5V regulator. Bulk pack available.", specs: ["Output: 5V", "Current: 1.5A", "Pkg: TO-220"] },
    { id: 27, name: "Neodymium Magnet Set", category: "Industrial", price: 400, description: "Extremely strong magnets salvaged from Hard Drives.", specs: ["Shape: Arc", "Pull: >5kg", "Coating: Ni-Cu-Ni"] },
    { id: 28, name: "DDR3 RAM Stick 4GB", category: "Computer Parts", price: 350, description: "Desktop memory module. Memtest86 passed.", specs: ["Speed: 1600MHz", "Type: DIMM", "Brand: Mixed"] },
    { id: 29, name: "Tantalum Cap Assortment", category: "Components", price: 450, description: "Yellow tantalum capacitors. High stability/reliability.", specs: ["Values: Mixed", "Voltage: 16-35V", "Count: 50pcs"] },
    { id: 30, name: "USB Type-A Connectors", category: "Connectors", price: 40, description: "Through-hole female USB ports. Desoldered clean.", specs: ["Type: USB 2.0", "Mount: R/A PCB", "Pins: 4"] },
    { id: 31, name: "Bridge Rectifier GBJ2510", category: "Components", price: 90, description: "Convert AC to DC. From power supply units.", specs: ["Rating: 25A", "Voltage: 1000V", "Pkg: Inline"] },
    { id: 32, name: "Stepper Driver A3988", category: "Motors", price: 120, description: "Small driver module for 3D printers.", specs: ["Microstep: 1/16", "Current: 2A", "Heatsink: Included"] },
    { id: 33, name: "VFD Display Tube", category: "Vintage", price: 600, description: "Vacuum Fluorescent Display. Beautiful cyan glow.", specs: ["Digits: 8", "Color: Teal", "Voltage: Grid/Filament"] },
    { id: 34, name: "Ceramic CPU Gold Scrap", category: "Precious Metals", price: 2500, description: "Damaged vintage CPUs rich in gold content for refining.", specs: ["Weight: 50g", "Type: Ceramic", "Yield: High"] },
    { id: 35, name: "Nixie Tube IN-12", category: "Vintage", price: 1500, description: "Soviet era cold cathode display. Orange glow.", specs: ["Digit: 0-9", "Base: 12-pin", "Voltage: 170V"] },
    { id: 36, name: "Laptop WiFi Card", category: "Computer Parts", price: 150, description: "Mini PCIe wireless adapters.", specs: ["Band: Dual", "Model: Intel/Atheros", "Bluetooth: No"] },
    { id: 37, name: "Heavy Duty Heat Sink", category: "Cooling", price: 550, description: "Copper core aluminum fin stack from servers.", specs: ["Weight: 400g", "Material: Cu/Al", "Fan: No"] },
    { id: 38, name: "Precision Resistors 1%", category: "Components", price: 100, description: "Blue metal film resistors. Mixed bag.", specs: ["Tol: 1%", "Power: 1/4W", "Count: 100pcs"] }
];

// --- INIT ---
window.addEventListener('DOMContentLoaded', () => {
    try {
        // Render initial state
        renderCategories();
        renderProducts();
        updateCartUI();
        createParticles();

        // Add Event Listeners
        document.getElementById('search-input').addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderProducts();
        });

        document.getElementById('sort-select').addEventListener('change', (e) => {
            sortOption = e.target.value;
            renderProducts();
        });

        // Initialize Scroll Reveal
        setupScrollReveal();

    } catch (e) {
        console.error("Init failed:", e);
    }
});

// --- EFFECTS ---

// --- EFFECTS ---
function createParticles() {
    // Target the specific Global Background container we created in HTML
    let container = document.getElementById('global-bg');

    // Fallback if not found (though it should be there)
    if (!container) {
        console.warn("Global background container #global-bg not found, creating fallback.");
        container = document.createElement('div');
        container.id = 'global-bg';
        container.className = 'fixed inset-0 z-0 pointer-events-none overflow-hidden bg-brand-dark';
        document.body.prepend(container);
    }

    const particleCount = 40; // Reduced from 120

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('i');
        // FontAwesome microchip icon, hollow/outline style isn't fully available as fa-regular for simple icons sometimes, but we use fa-solid with low opacity or text-stroke if needed. 
        // User asked for "microchip logo, but very small and kind of hollow type".  
        // fa-microchip is solid. We can stick to standard or try to emulate hollow with CSS text-stroke or opacity.
        // Let's use opacity for simplicity + "glow" effect.
        p.className = 'fa-solid fa-microchip chip-particle';

        // Random properties
        const size = Math.random() * 15 + 10; // 10px to 25px
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 15 + 20; // 20-35s slow float
        const delay = Math.random() * -20; // Start at different times

        // Random movement vector
        const tx = (Math.random() - 0.5) * 150;
        const ty = (Math.random() - 0.5) * 150;
        const r = (Math.random() - 0.5) * 360; // Spin

        p.style.cssText = `
            font-size: ${size}px;
            left: ${left}%;
            top: ${top}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            --tx: ${tx}px;
            --ty: ${ty}px;
            --r: ${r}deg;
            opacity: 0.05; /* Reduced opacity */
        `;

        container.appendChild(p);
    }
}

// --- NAVIGATION & UI ---


// Global Observer
let scrollObserver;

function setupScrollReveal() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed if you want it to happen only once
                // observer.unobserve(entry.target);
            }
        });
    }, options);

    // Target all reveal elements
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });
}

// --- NAVIGATION & UI ---
function navigate(sectionId) {
    // Hide all sections
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('shop-section').classList.add('hidden');
    document.getElementById('about-section').classList.add('hidden');
    document.getElementById('contact-section').classList.add('hidden');

    // Show selected
    document.getElementById(`${sectionId}-section`).classList.remove('hidden');

    // Scroll to top
    window.scrollTo(0, 0);

    // Re-trigger observer for new section content shortly after render
    setTimeout(() => {
        setupScrollReveal();
    }, 100);
}

// --- RENDER FUNCTIONS ---

function renderCategories() {
    const categories = ['All', ...new Set(products.map(p => p.category))].sort();
    const container = document.getElementById('category-list');

    container.innerHTML = categories.map(cat => `
            <li>
                <button 
                    onclick="setCategory('${cat}')" 
                    class="w-full text-left px-3 py-2 rounded text-sm transition ${currentCategory === cat ? 'bg-brand-accent/80 text-brand-dark font-bold backdrop-blur' : 'text-gray-400 hover:text-white hover:bg-white/10'}"
                >
                    ${cat}
                </button>
            </li>
        `).join('');
}

function setCategory(cat) {
    currentCategory = cat;
    renderCategories(); // Re-render to update active style
    renderProducts();
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    const noResults = document.getElementById('no-results');

    // 1. Filter
    let filtered = products.filter(p => {
        const matchCat = currentCategory === 'All' || p.category === currentCategory;
        const matchSearch = p.name.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery);
        return matchCat && matchSearch;
    });

    // 2. Sort
    if (sortOption === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sortOption === 'price-high') filtered.sort((a, b) => b.price - a.price);
    if (sortOption === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

    // 3. Render
    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        grid.innerHTML = filtered.map((product, index) => `
                <div class="bg-brand-surface/30 backdrop-blur-md rounded-lg shadow-md hover:shadow-xl hover:border-brand-accent border border-brand-accent/10 transition flex flex-col overflow-hidden group animate-enter-card" style="animation-delay: ${index * 50}ms">
                    <div class="h-32 bg-gray-900 flex items-center justify-center relative">
                         <!-- Placeholder Image Generator -->
                        <i class="fa-solid fa-microchip text-5xl text-gray-700 group-hover:text-brand-accent transition"></i>
                        <div class="absolute top-2 right-2">
                            <span class="bg-brand-accent/10 text-brand-accent text-xs font-bold px-2 py-1 rounded border border-brand-accent/20">Tested</span>
                        </div>
                    </div>
                    <div class="p-4 flex-1 flex flex-col">
                        <div class="text-xs text-brand-muted mb-1">${product.category}</div>
                        <h3 class="text-lg font-bold text-white mb-1 cursor-pointer hover:text-brand-accent" onclick="openProductModal(${product.id})">${product.name}</h3>
                        <p class="text-sm text-gray-400 mb-4 line-clamp-2">${product.description}</p>
                        
                        <div class="mt-auto flex items-center justify-between">
                            <span class="text-lg font-bold text-white">৳${product.price}</span>
                            <button onclick="addToCart(${product.id})" class="bg-brand-dark border border-gray-600 hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent text-white px-3 py-1.5 rounded text-sm transition">
                                Add <i class="fa-solid fa-plus ml-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
    }
}

// --- CART LOGIC ---

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.product.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.product.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) removeFromCart(productId);
        else updateCartUI();
    }
}

function updateCartUI() {
    // Update badge
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').innerText = count;

    // Render list
    const cartList = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('empty-cart-msg');
    const totalEl = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartList.innerHTML = '';
        emptyMsg.classList.remove('hidden');
        totalEl.innerText = '৳0';
        return;
    }

    emptyMsg.classList.add('hidden');
    let total = 0;

    cartList.innerHTML = cart.map(item => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;
        return `
                <li class="flex py-6">
                    <div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-600 bg-gray-800 flex items-center justify-center">
                         <i class="fa-solid fa-microchip text-2xl text-gray-500"></i>
                    </div>
                    <div class="ml-4 flex flex-1 flex-col">
                        <div>
                            <div class="flex justify-between text-base font-medium text-white">
                                <h3>${item.product.name}</h3>
                                <p class="ml-4">৳${itemTotal}</p>
                            </div>
                            <p class="mt-1 text-sm text-gray-400">${item.product.category}</p>
                        </div>
                        <div class="flex flex-1 items-end justify-between text-sm">
                            <div class="flex items-center space-x-2 text-gray-300">
                                <button onclick="updateQuantity(${item.product.id}, -1)" class="px-2 hover:text-white">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateQuantity(${item.product.id}, 1)" class="px-2 hover:text-white">+</button>
                            </div>
                            <button type="button" onclick="removeFromCart(${item.product.id})" class="font-medium text-red-400 hover:text-red-300">Remove</button>
                        </div>
                    </div>
                </li>
            `;
    }).join('');

    totalEl.innerText = '৳' + total;
}

function toggleCart() {
    const overlay = document.getElementById('cart-overlay');
    overlay.classList.toggle('hidden');
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    // Mock checkout
    alert(`Thank you for your order! \nTotal: ${document.getElementById('cart-total').innerText}\n\nSince this is a demo, no charge was made. Your components would be packed and shipped from the Micro-Factory.`);
    cart = [];
    updateCartUI();
    toggleCart();
}

// --- MODAL LOGIC ---

function openProductModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    document.getElementById('modal-title').innerText = product.name;
    document.getElementById('modal-category').innerText = product.category;
    document.getElementById('modal-desc').innerText = product.description;
    document.getElementById('modal-price').innerText = `৳${product.price}`;

    const specsContainer = document.getElementById('modal-specs');
    specsContainer.innerHTML = product.specs.map(s => `<li>${s}</li>`).join('');

    // Configure Add button
    const btn = document.getElementById('modal-add-btn');
    btn.onclick = function () {
        addToCart(product.id);
        closeModal();
    };

    document.getElementById('product-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}


// --- RECOVERY LAB INTERACTIVITY ---

const recoveryData = {
    'gpu': {
        name: 'RTX 3080 Gaming PCB',
        labelColor: 'text-green-300',
        parts: [
            { name: 'Gold-Plated Fingers', type: 'Precious Metal', value: 'High', icon: 'fa-coins' },
            { name: 'DrMOS Power Stages', type: 'IC', value: 'Medium', icon: 'fa-bolt' },
            { name: 'MLCC Capacitors (10g)', type: 'Passive', value: 'Low', icon: 'fa-car-battery' }
        ]
    },
    'server': {
        name: 'Dual Xeon Server Blade',
        labelColor: 'text-blue-300',
        parts: [
            { name: 'Palladium MLCCs', type: 'Precious Metal', value: 'Very High', icon: 'fa-gem' },
            { name: 'Tantalum Capacitors', type: 'Rare Earth', value: 'High', icon: 'fa-cubes' },
            { name: 'Copper Heatsinks', type: 'Metal', value: 'Medium', icon: 'fa-layer-group' }
        ]
    },
    'phone': {
        name: 'iPhone 12 Logic Board',
        labelColor: 'text-purple-300',
        parts: [
            { name: 'SoC (Gold Wires)', type: 'Processor', value: 'Medium', icon: 'fa-microchip' },
            { name: 'Rare Earth Sensors', type: 'Sensor', value: 'High', icon: 'fa-magnet' },
            { name: 'Platinum Contacts', type: 'Precious Metal', value: 'High', icon: 'fa-ring' }
        ]
    }
};

function startRecovery(type) {
    const stage = document.getElementById('machine-stage');
    const pcb = document.getElementById('anim-pcb');
    const arm = document.getElementById('anim-arm');
    const laser = document.getElementById('anim-laser');
    const part = document.getElementById('anim-part');
    const resultsPanel = document.getElementById('results-panel');
    const statusText = document.getElementById('machine-status');
    const moduleText = document.getElementById('machine-module');
    const pcbLabel = document.getElementById('pcb-label');

    // 1. Reset State
    stage.classList.remove('hidden');
    setTimeout(() => stage.classList.remove('opacity-0'), 50); // Fade in stage
    resultsPanel.classList.add('hidden');

    // Clear animations (hack: void offsetWidth triggers reflow)
    pcb.classList.remove('anim-slide-in');
    arm.classList.remove('anim-operate');
    laser.classList.remove('anim-laser-fire');
    part.classList.remove('anim-extract');
    void pcb.offsetWidth;

    // Update Text
    moduleText.innerText = recoveryData[type].name;
    pcbLabel.classList.value = `absolute font-mono text-[10px] font-bold bg-black/60 px-1 ${recoveryData[type].labelColor}`;

    // 2. Start Sequence
    statusText.innerText = 'LOADING PCB...';
    pcb.classList.add('anim-slide-in');

    // 3. Scan & Extract (Timings match CSS)
    setTimeout(() => {
        statusText.innerText = 'AI SCANNING...';
        statusText.className = 'text-yellow-400 animate-pulse';
        arm.classList.add('anim-operate');
    }, 1500);

    setTimeout(() => {
        statusText.innerText = 'DESOLDERING...';
        statusText.className = 'text-red-500 animate-pulse';
        laser.classList.add('anim-laser-fire');
    }, 2300);

    setTimeout(() => {
        statusText.innerText = 'EXTRACTING...';
        statusText.className = 'text-brand-accent animate-pulse';
        part.classList.add('anim-extract');
    }, 3500);

    // 4. Show Results
    setTimeout(() => {
        statusText.innerText = 'COMPLETE';
        statusText.className = 'text-green-500';
        showResults(type);
    }, 5500);

    // Scroll to view
    stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showResults(type) {
    const data = recoveryData[type];
    const grid = document.getElementById('results-grid');
    const panel = document.getElementById('results-panel');

    grid.innerHTML = data.parts.map((p, i) => `
        <div class="result-card-pop bg-brand-surface border border-brand-accent/30 p-4 rounded-xl w-48 shadow-lg" style="animation-delay: ${i * 100}ms">
            <div class="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center mx-auto mb-3 border border-brand-accent/20">
                <i class="fa-solid ${p.icon} text-brand-accent"></i>
            </div>
            <div class="text-white font-bold text-sm mb-1">${p.name}</div>
            <div class="text-xs text-gray-400 font-mono">${p.type}</div>
            <div class="mt-2 text-[10px] uppercase font-bold text-green-400 bg-green-500/10 inline-block px-2 py-0.5 rounded">Value: ${p.value}</div>
        </div>
    `).join('');

    panel.classList.remove('hidden');
}

function resetMachine() {
    document.getElementById('machine-stage').classList.add('hidden', 'opacity-0');
    document.getElementById('results-panel').classList.add('hidden');
    // Scroll back to selectors
    document.querySelector('#recovery-demo').scrollIntoView({ behavior: 'smooth' });
}
