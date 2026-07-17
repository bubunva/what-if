/**
 * ==========================================================================
 * WHAT IF SIMULATOR - APPLICATION ENGINE DRIVER (app.js)
 * PERFORMANCE PROTOCOL: HIGH-FIDELITY ASYNC RENDER MATRIX
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SYSTEM DOM REGISTER INITIALIZATION ---
    const DOM = {
        html: document.documentElement,
        themeToggle: document.getElementById('theme-toggle-btn'),
        usernameInput: document.getElementById('input-user-name'),
        badgeName: document.getElementById('badge-display-name'),
        sidebarName: document.getElementById('sidebar-user-name'),
        
        // Avatar Layers
        skinLayer: document.querySelector('.skin-layer'),
        avatarMirror: document.getElementById('sidebar-avatar-mirror'),
        skinSwatches: document.querySelectorAll('.skin-swatch'),
        hairOptions: document.querySelectorAll('.hair-option'),
        outfitOptions: document.querySelectorAll('.outfit-option'),
        
        // Stage Switching Matrix
        btnInitialize: document.getElementById('btn-initialize-system'),
        stageCustomizer: document.getElementById('stage-customizer'),
        stageSimulator: document.getElementById('stage-simulator'),
        
        // AI Simulation Elements
        aiInput: document.getElementById('ai-simulator-input'),
        btnFire: document.getElementById('btn-fire-simulation'),
        loaderState: document.getElementById('simulation-loader'),
        resultDisplay: document.getElementById('simulation-result-display'),
        historyList: document.getElementById('simulation-history-list')
    };

    // --- 2. GLOBAL STATE MACHINE ---
    const AppState = {
        theme: 'dark',
        user: {
            name: 'Anonymous Traveler',
            skinColor: '#ffdbac',
            hairStyle: 'classic',
            outfit: 'minimalist'
        },
        logs: []
    };

    // --- 3. AUDIO-VISUAL & THEME REACTION MECHANISMS ---
    const SystemEngine = {
        /**
         * Switches UI color profiles matching absolute user requirements
         * Dark: #080071 Matrix | Light: Pink & White Luxury
         */
        toggleTheme() {
            const TargetTheme = AppState.theme === 'dark' ? 'light' : 'dark';
            AppState.theme = TargetTheme;
            
            // Fast DOM Attribute Mutation (Triggers CSS Variables Hardware Update)
            DOM.html.setAttribute('data-theme', TargetTheme);
            
            // Haptic/Visual Feedback simulation
            DOM.themeToggle.style.transform = 'scale(0.9) rotate(-45deg)';
            setTimeout(() => {
                DOM.themeToggle.style.transform = '';
            }, 150);
        },

        /**
         * Updates dynamic textual references globally
         */
        updateIdentityStrings(rawName) {
            const cleanName = rawName.trim() || 'Anonymous Traveler';
            AppState.user.name = cleanName;
            DOM.badgeName.textContent = cleanName;
            DOM.sidebarName.textContent = cleanName;
        },

        /**
         * Generates and mounts clone of vector layers for profile matrix mirror
         */
        syncAvatarMirrors() {
            const sourceNode = document.getElementById('avatar-render-target');
            if (sourceNode) {
                DOM.avatarMirror.innerHTML = '';
                const clonedAvatar = sourceNode.cloneNode(true);
                clonedAvatar.id = 'avatar-render-mirror';
                DOM.avatarMirror.appendChild(clonedAvatar);
            }
        },

        /**
         * Transitions UI pipeline stages with high fluid curves
         */
        transitionStage(currentStage, nextStage) {
            currentStage.style.opacity = '0';
            currentStage.style.transform = 'scale(0.95) translateY(-30px)';
            
            setTimeout(() => {
                currentStage.classList.remove('panel-active');
                currentStage.classList.add('panel-hidden');
                
                nextStage.classList.remove('panel-hidden');
                nextStage.classList.add('panel-active');
                
                // Trigger profile reflection rendering exactly midway through screen wipe
                SystemEngine.syncAvatarMirrors();
            }, 400); // Perfect duration pairing for style.css cubic-bezier curves
        }
    };

    // --- 4. DATA BUS INTERFACE (API CONNECTION) ---
    const AISimulator = {
        /**
         * Dispatches prompt data to local backend Node instance
         */
        async executeQuery() {
            const promptValue = DOM.aiInput.value.trim();
            if (!promptValue) return;

            // Interface Locking State Mutation
            DOM.btnFire.disabled = true;
            DOM.loaderState.classList.remove('hidden');
            DOM.resultDisplay.classList.add('clear-state');
            DOM.resultDisplay.innerHTML = '';

            try {
                // Send payload data directly across environmental network link
                const response = await fetch('/api/simulate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        question: promptValue,
                        userMetadata: AppState.user
                    })
                });

                if (!response.ok) throw new Error('Quantum pipeline communication breakdown.');
                const payload = await response.json();
                
                // Present output payload with typography tracking
                AISimulator.renderResult(payload.summary);
                AISimulator.appendLog(promptValue);
                
            } catch (error) {
                DOM.resultDisplay.innerHTML = `
                    <div class="error-node-glass">
                        <p>⚠️ System Exception: Failed to rupture timeline vectors. Check your server cluster setup.</p>
                    </div>`;
                console.error('[Engine Exception]', error);
            } finally {
                DOM.loaderState.classList.add('hidden');
                DOM.btnFire.disabled = false;
                DOM.aiInput.value = '';
            }
        },

        renderResult(summaryText) {
            DOM.resultDisplay.classList.remove('clear-state');
            DOM.resultDisplay.innerHTML = `
                <div class="simulation-payload-wrapper">
                    <span class="timeline-stamp">[TIMELINE RUPTURED SUCCESSFUL]</span>
                    <p class="summary-text-flow">${summaryText}</p>
                </div>`;
        },

        appendLog(prompt) {
            AppState.logs.unshift(prompt);
            const logItem = document.createElement('li');
            logItem.className = 'history-log-item-node';
            logItem.innerHTML = `<span class="log-bullet">⚡</span> <p class="log-truncate">${prompt}</p>`;
            DOM.historyList.prepend(logItem);
        }
    };

    // --- 5. BUS EVENT LISTENERS REGISTER ---
    DOM.themeToggle.addEventListener('click', SystemEngine.toggleTheme);
    
    DOM.usernameInput.addEventListener('input', (e) => {
        SystemEngine.updateIdentityStrings(e.target.value);
    });

    // Customizer Selection Matrices loops
    DOM.skinSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            DOM.skinSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            const targetColor = swatch.getAttribute('data-skin-val');
            AppState.user.skinColor = targetColor;
            DOM.skinLayer.style.backgroundColor = targetColor;
        });
    });

    DOM.hairOptions.forEach(chip => {
        chip.addEventListener('click', () => {
            DOM.hairOptions.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            AppState.user.hairStyle = chip.getAttribute('data-hair-id');
            DOM.skinLayer.parentElement.querySelector('.hair-layer').setAttribute('data-style', AppState.user.hairStyle);
        });
    });

    DOM.outfitOptions.forEach(chip => {
        chip.addEventListener('click', () => {
            DOM.outfitOptions.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            AppState.user.outfit = chip.getAttribute('data-outfit-id');
            DOM.skinLayer.parentElement.querySelector('.outfit-layer').setAttribute('data-outfit', AppState.user.outfit);
        });
    });

    // Stage Gate Trigger Execution
    DOM.btnInitialize.addEventListener('click', () => {
        SystemEngine.transitionStage(DOM.stageCustomizer, DOM.stageSimulator);
    });

    // Fire execution listeners
    DOM.btnFire.addEventListener('click', AISimulator.executeQuery);
    DOM.aiInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') AISimulator.executeQuery();
    });
});
