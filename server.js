/* ==========================================================================
   WHAT IF SIMULATOR - SECURE AI PROXY BACKEND ENGINE (server.js)
   SPECIFICATION: EXPRESS HYDRATION CORE & LIVE GEMINI API COUPLING
   PERFORMANCE PROFILE: NON-BLOCKING ASYNC I/O DISPATCH LOOP
   ========================================================================== */

const express = require('express');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config(); // Securely maps variables from your local .env file

const app = express();
// Render or Railway will dynamically assign a port, fallback to 3000 locally
const PORT = process.env.PORT || 3000;

// Initialize the Google Gen AI client using your secret key
const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });

// Middleware to parse incoming JSON data payloads
app.use(express.json());

// Serve your premium frontend static files (index.html, style.css, etc.) directly from the root
app.use(express.static(path.join(__dirname, '.')));

/* ==========================================================================
   🚀 LIVE AI ROUTE INTERCEPTOR
   ========================================================================== */
app.post('/api/simulate', async (req, res) => {
    const { prompt, profile } = req.body;

    // Safety check: verify the API Key variable exists
    if (!process.env.AI_API_KEY) {
        return res.status(500).json({ 
            simulationResult: "[CRITICAL CONFIG ERROR] Backend API key configuration is missing from the environment architecture." 
        });
    }

    try {
        // Construct a highly detailed system instruction wrapper parsing the avatar configurations
        const engineeredPrompt = `
            You are a multi-million dollar quantum alternate-timeline simulation machine engine.
            The user's customized profile parameters are:
            - Identity: ${profile.username}
            - Current Outfit Profile: ${profile.outfitModule}
            - Aesthetics: ${profile.hairStyle} style
            
            Write a highly creative, detailed, exactly 3-sentence alternate reality summary answering the question: "What if ${prompt}".
            Prefix the output with "[Calculated Continuity Node Group: ${profile.outfitModule.toUpperCase()}]".
            Make the response incredibly deep, sci-fi grounded, and professional. Do not break character.
        `;

        // Execute live cloud request using gemini-2.5-flash for real-time speed profiles
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: engineeredPrompt,
        });

        const aiOutputText = response.text || "[System Anomaly] Empty timeline data stream returned.";

        // Channel the real AI generated content straight back to your liquid-glass browser panel
        res.json({ simulationResult: aiOutputText });

    } catch (error) {
        console.error("Gemini Engine Core Fault:", error);
        res.status(500).json({ 
            simulationResult: "[QUANTUM RIFT CORE COLLAPSE] The cloud AI engine failed to process this specific paradox layer. Log paths interrupted." 
        });
    }
});

// Always route secondary traffic requests cleanly straight into your frontend entry point
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Run the engine
app.listen(PORT, () => {
    console.log(`\n==================================================================`);
    console.log(`🚀 MULTI-MILLION DOLLAR SIMULATOR ENGINE RUNNING OPERATIONAL`);
    console.log(`🔗 Local Gateway Access Point: http://localhost:${PORT}`);
    console.log(`==================================================================\n`);
});
