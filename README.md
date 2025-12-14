# 🌍 EnviroTri_MeshGrid

**Open-Source Sustainable Engineering Solutions for Agriculture, Industry, and Home.**

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Active_Development-blue)
![Tech Stack](https://img.shields.io/badge/IoT-LoRa_|_AI_|_Biotech-orange)

## 📖 Overview

**EnviroTri_MeshGrid** is a monorepo containing low-cost, high-impact hardware and software solutions designed to tackle specific environmental challenges in developing regions. From reducing methane in rice paddies to recycling e-waste using AI, these projects aim to bridge the gap between advanced technology and grassroots application.

### 🚀 The Solutions Suite

| Project | Domain | Tech Stack | Status |
| :--- | :--- | :--- | :--- |
| **[🌊 AWD-Mesh](#-awd-mesh-smart-irrigation)** | Agriculture | LoRa Mesh, Satellite Data, Sensors | Pilot Testing |
| **[🦀 Mag-Chito Loop](#-mag-chito-loop-textile-wastewater)** | Industrial Waste | Biotech (Chitosan), Magnetics, Automation | Prototype |
| **[⚡ eCycle Micro-Factory](#-ecycle-micro-factory-ai-e-waste-recovery)** | E-Waste | AI/Computer Vision, Robotics, Heating | Concept/Dev |
| **[🧺 ECaundry](#-ecaundry-laundry-water-recycling)** | Consumer Water | IoT, UF Filtration, UV Disinfection | Design |

---

## 🌾 AWD-Mesh: Smart Irrigation

**A community-coordinated irrigation system to reduce methane emissions in rice farming.**

> **Problem:** Shared canals make "Alternate Wetting and Drying" (AWD) difficult, leading to water wastage and high methane emissions.  
>  **Solution:** A synchronized LoRa mesh network that coordinates irrigation schedules for entire villages[cite: 6, 21].

<details>
<summary><b>🔍 How It Works (Click to Expand)</b></summary>

### 1. Water-Level Sensors
Low-cost float sensors measure water depth in paddies and canals.  These are connected to LoRa nodes that function even in rain, heat, and dust[cite: 7, 18].

### 2. LoRa Communication Mesh
A village-wide network broadcasts start/stop irrigation signals.  Farmers receive alerts via SMS or LoRa beacons to open/close inlets simultaneously[cite: 9, 10].

### 3. Satellite + Forecasting Intelligence
The central dashboard integrates:
* **Soil Moisture Data:** From SMAP and Sentinel-1 satellites.
* **Weather:** Local rainfall forecasts.
*  **Result:** The system predicts the optimal drying window to minimize water use without hurting yields[cite: 11].

### 4. Biochar Integration
 Locally produced rice-husk biochar is applied to soil to prevent methane spikes during re-flooding[cite: 12].
</details>

<details>
<summary><b>📊 Impact & MRV</b></summary>

*  **Methane Reduction:** 30–50% reduction[cite: 15].
*  **Water Savings:** 20–25% less pumped water[cite: 15].
*  **Carbon Credits:** Generates MRV (Monitoring, Reporting, Verification) data compatible with standards like **Verra VM0042**[cite: 14].
</details>

---

## 🦀 Mag-Chito Loop: Textile Wastewater

**A low-cost, magnetic wastewater treatment system for SME dyeing factories.**

> **Problem:** Small factories cannot afford biological ETPs, leading to toxic river pollution.  
>  **Solution:** Reusable chitosan-magnetite beads that capture dye and are recovered using magnets[cite: 22, 23].

<details>
<summary><b>⚙️ Technology Stack (Click to Expand)</b></summary>

### The Core: Magnetic Beads
Derived from shrimp shells (Chitosan) mixed with magnetite.
* **Function:** Adsorbs dye molecules from water.
*  **Recovery:** Magnetic separation means no sludge filtration is needed[cite: 26].

### Automation Loop
1.  **Sensing:** Color sensors monitor effluent in real-time.
2.   **Control:** Microcontroller adjusts flow rate and contact time to ensure discharge is **≤ 200 ADMI** (DOE Standard)[cite: 28].
3.  **Regeneration:** Beads are washed with mild acid to release dye, then reused.

### Pigment Recovery
 The concentrated dye sludge is treated via **Electrocoagulation (EC)** to create a solid pigment cake usable in craft paints or inks[cite: 30, 31].
</details>

<details>
<summary><b>💰 Cost vs. Benefit</b></summary>

*  **OpEx:** $0.30–0.40 per m³ (vs $1.00 for chemical ETPs)[cite: 36].
*  **Sludge:** 70% reduction in hazardous sludge generation[cite: 33].
*  **Efficiency:** ≥ 80% dye removal and 50–60% COD reduction[cite: 33].
</details>

---

## ⚡ eCycle Micro-Factory: AI E-Waste Recovery

**A table-top machine that "un-manufactures" electronics to save components.**

> **Problem:** Traditional recycling shreds devices, destroying valuable chips.  
>  **Solution:** An AI-powered vision system that surgically removes and tests components for reuse[cite: 37, 38].

<details>
<summary><b>🛠️ System Architecture (Click to Expand)</b></summary>

### 1. Vision & AI
A camera scans waste PCBs.  Computer vision algorithms (YOLO/OpenCV) identify ICs, MOSFETs, and microcontrollers[cite: 41, 42].

### 2. Precision Depopulation
* **Heating:** Infrared or hot-air modules heat specific areas to loosen solder.
*  **Robotics:** A pick-and-place arm removes the part without thermal damage[cite: 43].

### 3. Testing & Sorting
Components undergo basic continuity/power tests.  Working parts are sorted into trays and automatically listed on a digital marketplace for repair shops or hobbyists[cite: 44, 45].
</details>

<details>
<summary><b>🌍 Sustainability Goals</b></summary>

* **Circular Economy:** Keeps microcontrollers and sensors in use.
* **Safe:** No acid baths or open burning.
*  **Economic:** Estimated processing cost of $0.50 – $1.00 per kg[cite: 56].
</details>

---

## 🧺 ECaundry: Laundry Water Recycling

**Retrofit IoT filtration system for household washing machines.**

> **Problem:** Laundry consumes massive amounts of potable water.  
>  **Solution:** Captures, filters, and disinfects up to 90% of wastewater for reuse (toilet flushing, irrigation)[cite: 58].

<details>
<summary><b>💧 Filtration & Logic (Click to Expand)</b></summary>

### The 4-Stage Process
1.   **Ultrafiltration (UF):** PVDF Hollow Fiber membranes (0.01µm) remove microplastics, bacteria, and dirt[cite: 60, 61].
2.   **Activated Carbon:** Removes detergents, dyes, and odors[cite: 65].
3.   **UV Disinfection:** UV-C light neutralizes DNA of pathogens for immediate sterilization[cite: 98].
4.   **Chlorination:** Dosing pump adds residual chlorine to prevent re-contamination in the storage tank[cite: 105].

### IoT Integration
* **Sensors:** Turbidity, pH, and Conductivity sensors monitor water quality 24/7.
*  **Alerts:** Mobile app notifies users when to backwash filters or refill chlorine[cite: 85, 89].
</details>

---

## 🛠️ Installation & Setup

*(General instructions for deploying these projects - specific firmware is in subfolders)*

1.  **Clone the Repo:**
    ```bash
    git clone [https://github.com/DaRk77NesS/EnviroTri_MeshGrid.git](https://github.com/DaRk77NesS/EnviroTri_MeshGrid.git)
    ```
2.  **Hardware Requirements:**
    * **AWD:** ESP32/LoRa modules (SX1276), Ultrasonic sensors.
    * **Mag-Chito:** Magnetic stirrer, Peristaltic pumps, Color sensor (TCS3200).
    * **eCycle:** Cartesian robot frame, Camera module, Heating element.
    * **ECaundry:** UF Filter cartridge, Solenoid valves, Arduino/ESP32.

3.  **Flash Firmware:**
    Navigate to the project folder and flash the microcontroller:
    ```bash
    cd AWD-Mesh/Firmware
    pio run -t upload
    ```

## 🤝 Contributing

We welcome contributions from engineers, environmentalists, and coders!
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with ❤️ for a cleaner planet.*
