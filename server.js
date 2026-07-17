/* ==========================================================================
   WHAT IF SIMULATOR - SECURE AI PROXY BACKEND ENGINE (server.js)
   ========================================================================== */

const express = require('express');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = process.env.AI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/api/simulate', async (req, res) => {
    const { prompt, profile } = req.body;

    if (!process.env.AI_API_KEY || process.env.AI_API_KEY === "your_actual_secret_api_key_here") {
        return res.json({ 
            simulationResult: "[CONFIG FAULT] Your AI_API_KEY is missing or unconfigured in Render environment variables." 
        });
    }

    const engineeredPrompt = `
        You are a quantum alternate-timeline simulation machine engine.
        The user's customized profile parameters are:
        - Identity: ${profile.username}
        - Current Outfit Profile: ${profile.outfitModule}
        
        Write a highly creative, detailed, exactly 3-sentence alternate reality summary answering the question: "What if ${prompt}".
        Prefix the output with "[Calculated Continuity Node]". Do not break character.
    `;

    // --- AUTOMATED FALLBACK MATRIX ENGINE ---
    try {
        console.log("Attempting Primary Engine Matrix (gemini-2.5-flash)...");
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: engineeredPrompt,
        });

        let aiOutputText = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!aiOutputText) throw new Error("Empty payload matrix stream.");
        
        return res.status(200).json({ simulationResult: aiOutputText });

    } catch (primaryError) {
        console.warn("Primary engine high demand or locked. Rerouting to Backup Grid...");

        try {
            // Fallback back to the ultra-stable alternative model path
            const backupResponse = await ai.models.generateContent({
                model: 'gemini-1.5-flash',
                contents: engineeredPrompt,
            });

            let backupText = backupResponse.text || backupResponse.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!backupText) throw new Error("Backup core failure.");

            return res.status(200).json({ simulationResult: backupText });

        } catch (backupError) {
            console.error("Critical Cloud Matrix Failure:", backupError);
            res.status(200).json({ 
                simulationResult: "[QUANTUM OVERLOAD] Both primary and secondary Google channels are experiencing maximum capacity loops. Please try firing the node again in a few moments." 
            });
        }
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Simulator Engine active on port ${PORT}`);
});
