/* ==========================================================================
   WHAT IF SIMULATOR - SECURE AI PROXY BACKEND ENGINE (server.js)
   ========================================================================== */

const express = require('express');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the Google Gen AI client using the key
const apiKey = process.env.AI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/api/simulate', async (req, res) => {
    const { prompt, profile } = req.body;

    // Check if the key is actually present in the environment
    if (!process.env.AI_API_KEY || process.env.AI_API_KEY === "your_actual_secret_api_key_here") {
        return res.json({ 
            simulationResult: "[CONFIG FAULT] Your AI_API_KEY is missing or unconfigured in Render environment variables." 
        });
    }

    try {
        const engineeredPrompt = `
            You are a quantum alternate-timeline simulation machine engine.
            The user's customized profile parameters are:
            - Identity: ${profile.username}
            - Current Outfit Profile: ${profile.outfitModule}
            
            Write a highly creative, detailed, exactly 3-sentence alternate reality summary answering the question: "What if ${prompt}".
            Prefix the output with "[Calculated Continuity Node]". Do not break character.
        `;

        // 🚀 UPGRADED TO GEN-3.5 ENGINE CAPSULE FOR LOCK-STEP STABILITY
        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: engineeredPrompt,
        });

        // Safe extraction of text from the SDK object
        let aiOutputText = "";
        if (response && response.text) {
            aiOutputText = response.text;
        } else if (response && response.candidates && response.candidates[0]) {
            aiOutputText = response.candidates[0].content.parts[0].text;
        } else {
            aiOutputText = "[System Anomaly] Empty timeline data stream returned from cloud provider.";
        }

        res.status(200).json({ simulationResult: aiOutputText });

    } catch (error) {
        console.error("Gemini Engine Core Fault:", error);
        res.status(200).json({ 
            simulationResult: `[API ERROR] Gemini failed to process request. Reason: ${error.message || error}` 
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Simulator Engine active on port ${PORT}`);
});
