/* ==========================================================================
   WHAT IF SIMULATOR - CORE INTERACTION ENGINE & RUNTIME DISPATCHER (app.js)
   SPECIFICATION: ASYNC TIMELINE ARCHITECTURE & STATE DECORATION ROUTER
   PERFORMANCE SPECIFICATION: MEMORY-SAFE DOM ORIENTED EVENTS LOOPS
   ========================================================================== */

"use strict";

// --- 1. ENGINE STATE & CONFIGURATION STORAGE CACHE ---
const MatrixEngineState = {
    currentTheme: "dark",
    isInitialized: false,
    isProcessing: false,
    activeProfile: {
        username: "Guest Traveler",
        skinColor: "#ffdbac",
        hairStyle: "classic",
        outfitModule: "minimalist"
    },
    telemetry: {
        fps: 60.0,
        ping: 0.02,
        entropy: 1.024,
        divergence: 0.00
    },
    historicalTimelines: []
};

// --- 2. CORE DOM NODE MATRIX REGISTRY ---
const DOM_MATRIX = {
    // Structural Window Layers
    htmlRoot: document.documentElement,
    appRoot: document.getElementById("app-root"),
    
    // Global Header Telemetry Channels
    themeToggleBtn: document.getElementById("theme-toggle-btn"),
    fpsTracker: document.getElementById("telemetry-fps"),
    pingTracker: document.getElementById("telemetry-ping"),
    stateTracker: document.getElementById("telemetry-state"),
    miniAvatarPreview: document.getElementById("mini-avatar-preview-target"),
    headerUsername: document.getElementById("header-username-string"),
    
    // Stage Viewports Panels
    stageCustomizer: document.getElementById("stage-customizer"),
    stageSimulator: document.getElementById("stage-simulator"),
    
    // Customizer UI Control Interactors
    inputUserName: document.getElementById("input-user-name"),
    skinSwatches: document.querySelectorAll(".skin-swatch"),
    hairOptions: document.querySelectorAll(".hair-option"),
    outfitOptions: document.querySelectorAll(".outfit-option"),
    btnInitializeSystem: document.getElementById("btn-initialize-system"),
    customizerErrorNode: document.getElementById("customizer-error-feedback-node"),
    
    // Live Vector Graphic Canvas Anchors
    avatarCanvas: document.getElementById("live-avatar-vector-canvas"),
    avatarSkinElement: document.getElementById("svg-element-head"),
    avatarNeckElement: document.getElementById("svg-element-neck"),
    badgeDisplayName: document.getElementById("badge-display-name"),
    
    // Simulator Control Sidebar Interface Rails
    sidebarAvatarMirror: document.getElementById("sidebar-avatar-mirror"),
    sidebarUserName: document.getElementById("sidebar-user-name"),
    simulationHistoryList: document.getElementById("simulation-history-list"),
    historyPlaceholder: document.getElementById("history-empty-placeholder"),
    logCounterNode: document.getElementById("log-counter-node"),
    metricEntropy: document.getElementById("metric-entropy"),
    metricDiverge: document.getElementById("metric-diverge"),
    
    // AI Dispatch Prompt Console Elements
    aiSimulatorInput: document.getElementById("ai-simulator-input"),
    btnFireSimulation: document.getElementById("btn-fire-simulation"),
    sampleSuggestionPills: document.querySelectorAll(".sample-suggestion-pill-tag"),
    simulationLoader: document.getElementById("simulation-loader"),
    simulationResultDisplay: document.getElementById("simulation-result-display"),
    loadingSubTicker: document.getElementById("loading-sub-ticker"),
    
    // Global Footer Diagnostics System
    footerTickerStream: document.getElementById("footer-system-ticker-stream"),
    
    // Overlay Dialog System Slots
    modalLayer: document.getElementById("global-system-modal-layer"),
    modalTitle: document.getElementById("modal-title-target"),
    modalBody: document.getElementById("modal-body-target"),
    btnModalClose: document.getElementById("btn-close-modal"),
    btnModalDismiss: document.getElementById("btn-modal-dismiss")
};

// --- 3. THEME MANIPULATION PIPELINE (DARK / LIGHT MANAGEMENT) ---
function initializeThemeEngine() {
    // Read cached state layer attributes
    const cachedTheme = localStorage.getItem("whatif-core-theme") || "dark";
    MatrixEngineState.currentTheme = cachedTheme;
    DOM_MATRIX.htmlRoot.setAttribute("data-theme", cachedTheme);
    updateFooterTicker(`System Core Matrix Theme Initialized to: [${cachedTheme.toUpperCase()}_MODE]`);
}

function handleThemeToggleTransition() {
    const targetTheme = MatrixEngineState.currentTheme === "dark" ? "light" : "dark";
    MatrixEngineState.currentTheme = targetTheme;
    
    // Atomic DOM attribute change trigger
    DOM_MATRIX.htmlRoot.setAttribute("data-theme", targetTheme);
    localStorage.setItem("whatif-core-theme", targetTheme);
    
    updateFooterTicker(`Interface theme matrix adjusted. Presenting layout in: ${targetTheme.toUpperCase()}`);
    triggerTelemetryFlicker();
}

// --- 4. LIVE AVATAR GEOMETRY & STATE DECORATION ROUTER ---
function updateAvatarVisualMatrix() {
    const profile = MatrixEngineState.activeProfile;
    
    // 1. Process Dermal Tone Swapping safely on SVG elements
    if (DOM_MATRIX.avatarSkinElement && DOM_MATRIX.avatarNeckElement) {
        DOM_MATRIX.avatarSkinElement.setAttribute("fill", profile.skinColor);
        DOM_MATRIX.avatarNeckElement.setAttribute("fill", profile.skinColor);
    }
    
    // 2. Map structural state variables to data attributes for module.css paths overrides
    if (DOM_MATRIX.avatarCanvas) {
        DOM_MATRIX.avatarCanvas.setAttribute("data-active-hair", profile.hairStyle);
        DOM_MATRIX.avatarCanvas.setAttribute("data-active-outfit", profile.outfitModule);
    }
    
    // 3. Update related text labels simultaneously
    const dynamicName = profile.username.trim() !== "" ? profile.username.toUpperCase() : "UNKNOWN_TRAVELER";
    DOM_MATRIX.badgeDisplayName.textContent = `DESIGNATION: ${dynamicName}`;
}

function bindCustomizerOptionPickers() {
    // Bind Melanin Swatches Arrays
    DOM_MATRIX.skinSwatches.forEach(swatch => {
        swatch.addEventListener("click", (e) => {
            DOM_MATRIX.skinSwatches.forEach(btn => btn.classList.remove("active"));
            swatch.classList.add("active");
            MatrixEngineState.activeProfile.skinColor = swatch.getAttribute("data-skin-val");
            updateAvatarVisualMatrix();
        });
    });

    // Bind Hair Synthesizer Option Chips
    DOM_MATRIX.hairOptions.forEach(chip => {
        chip.addEventListener("click", () => {
            DOM_MATRIX.hairOptions.forEach(btn => btn.classList.remove("active"));
            chip.classList.add("active");
            MatrixEngineState.activeProfile.hairStyle = chip.getAttribute("data-hair-id");
            updateAvatarVisualMatrix();
        });
    });

    // Bind Apparel Suite Equipment Chips
    DOM_MATRIX.outfitOptions.forEach(chip => {
        chip.addEventListener("click", () => {
            DOM_MATRIX.outfitOptions.forEach(btn => btn.classList.remove("active"));
            chip.classList.add("active");
            MatrixEngineState.activeProfile.outfitModule = chip.getAttribute("data-outfit-id");
            updateAvatarVisualMatrix();
        });
    });

    // Real-Time Reflection of User Username Inputs
    DOM_MATRIX.inputUserName.addEventListener("input", (e) => {
        MatrixEngineState.activeProfile.username = e.target.value.trim() !== "" ? e.target.value : "Guest Traveler";
        const dynamicName = MatrixEngineState.activeProfile.username.toUpperCase();
        DOM_MATRIX.badgeDisplayName.textContent = `DESIGNATION: ${dynamicName}`;
    });
}

// --- 5. INITIALIZATION LOCK & APPLICATION STAGE GATE SWITCHER ---
function executeSystemInitialization() {
    const profile = MatrixEngineState.activeProfile;
    
    // Validate input fields logic checks safely
    if (DOM_MATRIX.inputUserName.value.trim() === "") {
        DOM_MATRIX.customizerErrorNode.style.color = "#ff453a";
        DOM_MATRIX.customizerErrorNode.querySelector(".warning-text-string").textContent = "CRITICAL FAILURE: Identity Signature string parameters cannot remain empty.";
        triggerTelemetryFlicker();
        return;
    }

    // Lock Initialization State Parameters
    MatrixEngineState.isInitialized = true;
    updateFooterTicker("Identity profiles verified. Initializing secure quantum simulation channels...");

    // Mount structural user components to Workspace Sidebar Nodes
    DOM_MATRIX.headerUsername.textContent = profile.username;
    DOM_MATRIX.sidebarUserName.textContent = profile.username;
    
    // Duplicate clean SVG graphic structure to Sidebar Profile Preview Target
    if (DOM_MATRIX.avatarCanvas && DOM_MATRIX.sidebarAvatarMirror) {
        DOM_MATRIX.sidebarAvatarMirror.innerHTML = DOM_MATRIX.avatarCanvas.outerHTML;
        // Mirror the state attributes inside the static cloned graphic container frame
        DOM_MATRIX.sidebarAvatarMirror.firstElementChild.setAttribute("id", "cloned-avatar-canvas");
    }
    
    if (DOM_MATRIX.miniAvatarPreview) {
        DOM_MATRIX.miniAvatarPreview.style.backgroundColor = profile.skinColor;
    }

    // Trigger visual Stage Gate Shift with clear performance timing delays
    DOM_MATRIX.stageCustomizer.classList.add("panel-hidden");
    DOM_MATRIX.stageCustomizer.classList.remove("panel-active");
    
    setTimeout(() => {
        DOM_MATRIX.stageSimulator.classList.remove("panel-hidden");
        DOM_MATRIX.stageSimulator.classList.add("panel-active");
        DOM_MATRIX.stateTracker.textContent = "SIMULATOR_ACTIVE";
        updateFooterTicker("Quantum Simulation Engine Pipeline Mounted. System Operational Feed Ready.");
    }, 400);
}

// --- 6. AI DISPATCH ENGINE MOCK ARCHITECTURE & ASYNC DATA STREAMING ---
async function dispatchSimulationPromptQuery(promptText) {
    if (MatrixEngineState.isProcessing || promptText.trim() === "") return;
    
    MatrixEngineState.isProcessing = true;
    DOM_MATRIX.btnFireSimulation.disabled = true;
    
    // Swap Viewport Result Sub-Components States Layouts
    DOM_MATRIX.simulationResultDisplay.classList.add("clear-state");
    DOM_MATRIX.simulationLoader.classList.remove("component-layer-hidden");
    
    updateFooterTicker(`Processing Alternate Continuity Rarity Array request for schema: "${promptText}"`);

    // Array of mock processing sub-step log loops strings
    const executionSubTicks = [
        "Isolating universal branching parameters coordinates...",
        "Measuring entropy deviations and atmospheric friction variants...",
        "Executing localized data processing algorithm matrices...",
        "Structuring timeline summaries document elements..."
    ];

    // Async simulated thread loops for step feedback tickers
    for (let i = 0; i < executionSubTicks.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 900));
        DOM_MATRIX.loadingSubTicker.textContent = executionSubTicks[i];
        
        // Jitter structural simulation diagnostic counters metrics programmatically
        MatrixEngineState.telemetry.entropy = (Math.random() * 0.5 + 1.0).toFixed(4);
        MatrixEngineState.telemetry.divergence = (Math.random() * 85 + 5).toFixed(2);
        DOM_MATRIX.metricEntropy.textContent = MatrixEngineState.telemetry.entropy;
        DOM_MATRIX.metricDiverge.textContent = `${MatrixEngineState.telemetry.divergence}%`;
    }

    // Call internal processing function to assemble and mount text response summaries elements
    generateSimulationPayloadDocument(promptText);
}

function generateSimulationPayloadDocument(query) {
    // Comprehensive pre-built response objects matching current date parameters benchmarks
    const simulatedKnowledgeBase = {
        "dinosaurs": "Timeline Branch Calculated: Earth Orbit Vector Alpha-7. The asteroid misses Chicxulub entirely. Mammalian development is compressed as non-avian theropods continue to dominate terrestrial niches. High intelligent bipedal saurian evolutionary branches emerge by the Miocene epoch, developing high-density architectural structures that prioritize thermal balancing grids.",
        "internet": "Timeline Branch Calculated: Chronos Steampunk Industrial Core. Charles Babbage and Ada Lovelace complete the Analytical Engine using vacuum tube circuitry running on localized steam-powered grids. By 1870, London houses the primary copper-wire databank core network. Society bypasses traditional manufacturing explosions, transitioning directly into a mechanical automation infrastructure phase.",
        "gravity": "Timeline Branch Calculated: Gravitational Shift Layer Delta. A localized dark matter current intersects Earth's orbit, permanently decreasing G forces by 50%. Structural engineering architectures undergo immediate shifts: mega-tall fiber-reinforced towers extend miles into the upper atmosphere. Human biological profiles shift toward accelerated bone lengthening and adjusted circulatory pressures.",
        "underground": "Timeline Branch Calculated: Geocentric Isolation Grid. Surface solar flares sterilize the crust during the early Neolithic era. Civilizations move downward into extensive thermal networks inside the mantle. Modern metropolitan grids occupy deep structural geodes running entirely on geothermal kinetic collectors, creating closed-loop recycling eco-systems."
    };

    // Fallback parsing pattern logic selector matches keywords cleanly
    let targetedResponseText = `Timeline Branch Calculated: Quantum Anomaly Node detected for prompt request. Your configuration matrix query: "${query}" has generated an unpredictable temporal rift loop. Core simulation models indicate cascading geographical modifications across standard settlement zones, requiring deep ecosystem shifts to prevent permanent societal collapse.`;
    
    const normalizedQuery = query.toLowerCase();
    for (const key in simulatedKnowledgeBase) {
        if (normalizedQuery.includes(key)) {
            targetedResponseText = simulatedKnowledgeBase[key];
            break;
        }
    }

    // Clear loading display and configure text into document template container element slots
    DOM_MATRIX.simulationLoader.classList.add("component-layer-hidden");
    DOM_MATRIX.simulationResultDisplay.classList.remove("clear-state");
    DOM_MATRIX.simulationResultDisplay.classList.remove("timeline-canvas-empty-state");
    
    const timestampString = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    DOM_MATRIX.simulationResultDisplay.innerHTML = `
        <div class="simulation-payload-wrapper">
            <span class="timeline-stamp">SIMULATED CHRONO-NODE // LOG_SECURE: ${timestampString}</span>
            <p class="summary-text-flow">${targetedResponseText}</p>
        </div>
    `;

    // Append history data model items array
    const recordPayload = { id: Date.now(), query: query, summary: targetedResponseText };
    MatrixEngineState.historicalTimelines.unshift(recordPayload);
    
    // Sync UI elements lists updates
    appendTimelineRecordItemNode(recordPayload);
    
    // Reset global processing flags
    MatrixEngineState.isProcessing = false;
    DOM_MATRIX.btnFireSimulation.disabled = false;
    DOM_MATRIX.aiSimulatorInput.value = "";
    
    updateFooterTicker("Alternate Causality Paradox Map rendered completely. Operational channels clear.");
}

function appendTimelineRecordItemNode(record) {
    if (DOM_MATRIX.historyPlaceholder) {
        DOM_MATRIX.historyPlaceholder.style.display = "none";
    }

    const listItem = document.createElement("li");
    listItem.className = "history-log-item-node";
    listItem.innerHTML = `
        <span class="log-bullet">⑆</span>
        <div class="log-truncate">
            <strong>What if ${record.query}</strong>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${record.summary}</p>
        </div>
    `;

    DOM_MATRIX.simulationHistoryList.insertBefore(listItem, DOM_MATRIX.simulationHistoryList.firstChild);
    DOM_MATRIX.logCounterNode.textContent = MatrixEngineState.historicalTimelines.length;
}

// --- 7. GLOBAL CONSOLE HUD FEED INTERACTION UTILITIES ---
function updateFooterTicker(messageString) {
    if (DOM_MATRIX.footerTickerStream) {
        DOM_MATRIX.footerTickerStream.textContent = `SYSTEM BROADCAST FEED DATA CACHE // ${messageString.toUpperCase()}`;
    }
}

function triggerTelemetryFlicker() {
    // Add micro jitter metrics fluctuations to simulate massive local processor stress loads
    DOM_MATRIX.fpsTracker.textContent = (58.2 + Math.random() * 1.8).toFixed(1);
    DOM_MATRIX.pingTracker.textContent = `${(0.01 + Math.random() * 0.04).toFixed(3)}ms`;
    DOM_MATRIX.fpsTracker.style.color = "#ff007f";
    
    setTimeout(() => {
        DOM_MATRIX.fpsTracker.textContent = "60.0";
        DOM_MATRIX.pingTracker.textContent = "0.02ms";
        DOM_MATRIX.fpsTracker.style.color = "var(--accent-glow)";
    }, 300);
}

function bindGlobalInputEventsListeners() {
    // Bind click handlers to theme changes toggler elements
    DOM_MATRIX.themeToggleBtn.addEventListener("click", handleThemeToggleTransition);
    
    // Bind click handles to main customizer gateway deployment submit controls
    DOM_MATRIX.btnInitializeSystem.addEventListener("click", executeSystemInitialization);

    // Bind click handlers to prompt execution firing actions
    DOM_MATRIX.btnFireSimulation.addEventListener("click", () => {
        const promptText = DOM_MATRIX.aiSimulatorInput.value.trim();
        dispatchSimulationPromptQuery(promptText);
    });

    // Bind keyboard enter key listener arrays over input text elements console nodes
    DOM_MATRIX.aiSimulatorInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const promptText = DOM_MATRIX.aiSimulatorInput.value.trim();
            dispatchSimulationPromptQuery(promptText);
        }
    });

    // Bind click events on interactive suggestion pill nodes
    DOM_MATRIX.sampleSuggestionPills.forEach(pill => {
        pill.addEventListener("click", () => {
            const targetsPrompt = pill.getAttribute("data-sample-prompt");
            DOM_MATRIX.aiSimulatorInput.value = targetsPrompt;
            dispatchSimulationPromptQuery(targetsPrompt);
        });
    });
}

// --- 8. SYSTEM MOTOR ENGINE BOOTSTRAP GATE ---
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Interface Theme Modules Configuration Profiles
    initializeThemeEngine();
    
    // Process base visual states maps profiles across active interactive SVG layers
    updateAvatarVisualMatrix();
    
    // Mount custom selections listener matrices
    bindCustomizerOptionPickers();
    
    // Mount global UI input triggers listener loops controls arrays
    bindGlobalInputEventsListeners();
    
    updateFooterTicker("All Core Systems Loaded. Ready to capture and process initialization protocol signature properties.");
});
