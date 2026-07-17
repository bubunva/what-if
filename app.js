/* ==========================================================================
   WHAT IF SIMULATOR - CORE INTERACTION ENGINE & RUNTIME DISPATCHER (app.js)
   SPECIFICATION: ASYNC TIMELINE ARCHITECTURE & LIVE AI FETCH CONTROLLER
   PERFORMANCE SPECIFICATION: MEMORY-SAFE COMPOSITOR OPTIMIZED EVENT LOOPS
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
    const cachedTheme = localStorage.getItem("whatif-core-theme") || "dark";
    MatrixEngineState.currentTheme = cachedTheme;
    DOM_MATRIX.htmlRoot.setAttribute("data-theme", cachedTheme);
    updateFooterTicker(`System Core Matrix Theme Initialized to: [${cachedTheme.toUpperCase()}_MODE]`);
}

function handleThemeToggleTransition() {
    const targetTheme = MatrixEngineState.currentTheme === "dark" ? "light" : "dark";
    MatrixEngineState.currentTheme = targetTheme;
    
    DOM_MATRIX.htmlRoot.setAttribute("data-theme", targetTheme);
    localStorage.setItem("whatif-core-theme", targetTheme);
    
    updateFooterTicker(`Interface theme matrix adjusted. Presenting layout in: ${targetTheme.toUpperCase()}`);
    triggerTelemetryFlicker();
}

// --- 4. LIVE AVATAR GEOMETRY & STATE DECORATION ROUTER ---
function updateAvatarVisualMatrix() {
    const profile = MatrixEngineState.activeProfile;
    
    if (DOM_MATRIX.avatarSkinElement && DOM_MATRIX.avatarNeckElement) {
        DOM_MATRIX.avatarSkinElement.setAttribute("fill", profile.skinColor);
        DOM_MATRIX.avatarNeckElement.setAttribute("fill", profile.skinColor);
    }
    
    if (DOM_MATRIX.avatarCanvas) {
        DOM_MATRIX.avatarCanvas.setAttribute("data-active-hair", profile.hairStyle);
        DOM_MATRIX.avatarCanvas.setAttribute("data-active-outfit", profile.outfitModule);
    }
    
    const dynamicName = profile.username.trim() !== "" ? profile.username.toUpperCase() : "UNKNOWN_TRAVELER";
    if (DOM_MATRIX.badgeDisplayName) {
        DOM_MATRIX.badgeDisplayName.textContent = `DESIGNATION: ${dynamicName}`;
    }
}

function bindCustomizerOptionPickers() {
    DOM_MATRIX.skinSwatches.forEach(swatch => {
        swatch.addEventListener("click", () => {
            DOM_MATRIX.skinSwatches.forEach(btn => btn.classList.remove("active"));
            swatch.classList.add("active");
            MatrixEngineState.activeProfile.skinColor = swatch.getAttribute("data-skin-val");
            updateAvatarVisualMatrix();
        });
    });

    DOM_MATRIX.hairOptions.forEach(chip => {
        chip.addEventListener("click", () => {
            DOM_MATRIX.hairOptions.forEach(btn => btn.classList.remove("active"));
            chip.classList.add("active");
            MatrixEngineState.activeProfile.hairStyle = chip.getAttribute("data-hair-id");
            updateAvatarVisualMatrix();
        });
    });

    DOM_MATRIX.outfitOptions.forEach(chip => {
        chip.addEventListener("click", () => {
            DOM_MATRIX.outfitOptions.forEach(btn => btn.classList.remove("active"));
            chip.classList.add("active");
            MatrixEngineState.activeProfile.outfitModule = chip.getAttribute("data-outfit-id");
            updateAvatarVisualMatrix();
        });
    });

    DOM_MATRIX.inputUserName.addEventListener("input", (e) => {
        MatrixEngineState.activeProfile.username = e.target.value.trim() !== "" ? e.target.value : "Guest Traveler";
        const dynamicName = MatrixEngineState.activeProfile.username.toUpperCase();
        if (DOM_MATRIX.badgeDisplayName) {
            DOM_MATRIX.badgeDisplayName.textContent = `DESIGNATION: ${dynamicName}`;
        }
    });
}

// --- 5. INITIALIZATION LOCK & APPLICATION STAGE GATE SWITCHER ---
function executeSystemInitialization() {
    const profile = MatrixEngineState.activeProfile;
    
    if (DOM_MATRIX.inputUserName.value.trim() === "") {
        if (DOM_MATRIX.customizerErrorNode) {
            DOM_MATRIX.customizerErrorNode.style.color = "#ff453a";
            DOM_MATRIX.customizerErrorNode.querySelector(".warning-text-string").textContent = "CRITICAL FAILURE: Identity Signature string parameters cannot remain empty.";
        }
        triggerTelemetryFlicker();
        return;
    }

    MatrixEngineState.isInitialized = true;
    updateFooterTicker("Identity profiles verified. Initializing secure quantum simulation channels...");

    if (DOM_MATRIX.headerUsername) DOM_MATRIX.headerUsername.textContent = profile.username;
    if (DOM_MATRIX.sidebarUserName) DOM_MATRIX.sidebarUserName.textContent = profile.username;
    
    if (DOM_MATRIX.avatarCanvas && DOM_MATRIX.sidebarAvatarMirror) {
        DOM_MATRIX.sidebarAvatarMirror.innerHTML = DOM_MATRIX.avatarCanvas.outerHTML;
        DOM_MATRIX.sidebarAvatarMirror.firstElementChild.setAttribute("id", "cloned-avatar-canvas");
    }
    
    if (DOM_MATRIX.miniAvatarPreview) {
        DOM_MATRIX.miniAvatarPreview.style.backgroundColor = profile.skinColor;
    }

    DOM_MATRIX.stageCustomizer.classList.add("panel-hidden");
    DOM_MATRIX.stageCustomizer.classList.remove("panel-active");
    
    setTimeout(() => {
        DOM_MATRIX.stageSimulator.classList.remove("panel-hidden");
        DOM_MATRIX.stageSimulator.classList.add("panel-active");
        if (DOM_MATRIX.stateTracker) DOM_MATRIX.stateTracker.textContent = "SIMULATOR_ACTIVE";
        updateFooterTicker("Quantum Simulation Engine Pipeline Mounted. System Operational Feed Ready.");
    }, 400);
}

// --- 6. LIVE AI DISPATCH ENGINE (ASYNC ENDPOINT FETCH LAYER) ---
async function dispatchSimulationPromptQuery(promptText) {
    if (MatrixEngineState.isProcessing || promptText.trim() === "") return;
    
    MatrixEngineState.isProcessing = true;
    DOM_MATRIX.btnFireSimulation.disabled = true;
    
    DOM_MATRIX.simulationResultDisplay.classList.add("clear-state");
    DOM_MATRIX.simulationLoader.classList.remove("component-layer-hidden");
    
    updateFooterTicker(`Routing query to live AI Matrix: "${promptText}"`);

    // Dynamic telemetry updates while spinning network request
    const tickerInterval = setInterval(() => {
        MatrixEngineState.telemetry.entropy = (Math.random() * 0.4 + 1.1).toFixed(4);
        MatrixEngineState.telemetry.divergence = (Math.random() * 90 + 5).toFixed(2);
        if (DOM_MATRIX.metricEntropy) DOM_MATRIX.metricEntropy.textContent = MatrixEngineState.telemetry.entropy;
        if (DOM_MATRIX.metricDiverge) DOM_MATRIX.metricDiverge.textContent = `${MatrixEngineState.telemetry.divergence}%`;
    }, 300);

    try {
        /* 🚀 LIVE NETWORK UPLINK
           Points directly to your local node endpoint or serverless server pipeline.
           Passes the user's prompt alongside the customizer's profile parameters.
        */
        const response = await fetch('/api/simulate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                prompt: promptText,
                profile: MatrixEngineState.activeProfile 
            })
        });

        clearInterval(tickerInterval);

        if (!response.ok) throw new Error("Network cloud connection matrix drops.");
        const data = await response.json();
        
        renderLiveAIPayload(promptText, data.simulationResult);

    } catch (error) {
        clearInterval(tickerInterval);
        console.error("AI Node Processing Fault:", error);
        updateFooterTicker("AI Uplink dropped. Running local emergency procedural mesh...");
        
        // Instant structural recovery fallback pattern matching keywords
        setTimeout(() => {
            let recoveryText = `Timeline Branch Calculated: Global structure shifted toward clean industrial automation models under prompt rules: "${promptText}". Technical integration limits manual worker overhead down to 12% across centralized structural hubs.`;
            if (promptText.toLowerCase().includes("dinosaur")) {
                recoveryText = "Timeline Branch Calculated: Non-avian dinosaurs escape catastrophic mass extinction layers entirely. Architectural frameworks evolve to optimize geothermal and thermal shielding grids across temperate geographical regions.";
            }
            renderLiveAIPayload(promptText, recoveryText);
        }, 1200);
    }
}

function renderLiveAIPayload(query, resultText) {
    DOM_MATRIX.simulationLoader.classList.add("component-layer-hidden");
    DOM_MATRIX.simulationResultDisplay.classList.remove("clear-state");
    
    const timestampString = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    DOM_MATRIX.simulationResultDisplay.innerHTML = `
        <div class="simulation-payload-wrapper">
            <span class="timeline-stamp">LIVE AI CHRONO-NODE // LOG_SECURE: ${timestampString}</span>
            <p class="summary-text-flow">${resultText}</p>
        </div>
    `;

    const recordPayload = { id: Date.now(), query: query, summary: resultText };
    MatrixEngineState.historicalTimelines.unshift(recordPayload);
    appendTimelineRecordItemNode(recordPayload);
    
    MatrixEngineState.isProcessing = false;
    DOM_MATRIX.btnFireSimulation.disabled = false;
    DOM_MATRIX.aiSimulatorInput.value = "";
    updateFooterTicker("Alternate Causality Paradox Map rendered completely via live system data.");
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

    if (DOM_MATRIX.simulationHistoryList) {
        DOM_MATRIX.simulationHistoryList.insertBefore(listItem, DOM_MATRIX.simulationHistoryList.firstChild);
    }
    if (DOM_MATRIX.logCounterNode) {
        DOM_MATRIX.logCounterNode.textContent = MatrixEngineState.historicalTimelines.length;
    }
}

// --- 7. GLOBAL CONSOLE HUD FEED INTERACTION UTILITIES ---
function updateFooterTicker(messageString) {
    if (DOM_MATRIX.footerTickerStream) {
        DOM_MATRIX.footerTickerStream.textContent = `SYSTEM BROADCAST FEED DATA CACHE // ${messageString.toUpperCase()}`;
    }
}

function triggerTelemetryFlicker() {
    if (!DOM_MATRIX.fpsTracker || !DOM_MATRIX.pingTracker) return;
    
    DOM_MATRIX.fpsTracker.textContent = (57.4 + Math.random() * 2.5).toFixed(1);
    DOM_MATRIX.pingTracker.textContent = `${(0.01 + Math.random() * 0.05).toFixed(3)}ms`;
    DOM_MATRIX.fpsTracker.style.color = "#ff007f";
    
    setTimeout(() => {
        DOM_MATRIX.fpsTracker.textContent = "60.0";
        DOM_MATRIX.pingTracker.textContent = "0.02ms";
        DOM_MATRIX.fpsTracker.style.color = "var(--accent-glow)";
    }, 300);
}

function bindGlobalInputEventsListeners() {
    if (DOM_MATRIX.themeToggleBtn) {
        DOM_MATRIX.themeToggleBtn.addEventListener("click", handleThemeToggleTransition);
    }
    
    if (DOM_MATRIX.btnInitializeSystem) {
        DOM_MATRIX.btnInitializeSystem.addEventListener("click", executeSystemInitialization);
    }

    if (DOM_MATRIX.btnFireSimulation) {
        DOM_MATRIX.btnFireSimulation.addEventListener("click", () => {
            const promptText = DOM_MATRIX.aiSimulatorInput.value.trim();
            dispatchSimulationPromptQuery(promptText);
        });
    }

    if (DOM_MATRIX.aiSimulatorInput) {
        DOM_MATRIX.aiSimulatorInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const promptText = DOM_MATRIX.aiSimulatorInput.value.trim();
                dispatchSimulationPromptQuery(promptText);
            }
        });
    }

    DOM_MATRIX.sampleSuggestionPills.forEach(pill => {
        pill.addEventListener("click", () => {
            const targetsPrompt = pill.getAttribute("data-sample-prompt");
            if (DOM_MATRIX.aiSimulatorInput) DOM_MATRIX.aiSimulatorInput.value = targetsPrompt;
            dispatchSimulationPromptQuery(targetsPrompt);
        });
    });
}

// --- 8. SYSTEM MOTOR ENGINE BOOTSTRAP GATE ---
document.addEventListener("DOMContentLoaded", () => {
    initializeThemeEngine();
    updateAvatarVisualMatrix();
    bindCustomizerOptionPickers();
    bindGlobalInputEventsListeners();
    updateFooterTicker("All Core System Matrix Channels Live. Awaiting identity verification inputs.");
});
