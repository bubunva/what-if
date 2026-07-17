/* ==========================================================================
   WHAT IF SIMULATOR - GROQ HIGH-SPEED ENGINE (server.js)
   ========================================================================== */

const express = require('express');
const path = require('path');
const { Groq } = require('groq-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Groq securely
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/api/simulate', async (req, res) => {
    const { prompt, profile } = req.body;

    if (!process.env.GROQ_API_KEY) {
        return res.json({ 
            simulationResult: "[CONFIG FAULT] Your GROQ_API_KEY is missing from Render environment variables." 
        });
    }

    try {
        // Ping Groq's high-speed engine layer using Llama 3.1
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `You are a quantum alternate-timeline simulation machine engine. 
                    The user's profile parameters are: Identity is ${profile.username}, outfit profile is ${profile.outfitModule}.
                    Write a highly creative, detailed, exactly 3-sentence alternate reality summary answering the question. 
                    Prefix the output string with "[Calculated Continuity Node]". Do not break character.`
                },
                {
                    role: 'user',
                    content: `What if ${prompt}`
                }
            ],
            model: 'llama-3.1-8b-instant',
            max_tokens: 150,
            temperature: 0.8
        });

        const aiOutputText = chatCompletion.choices[0]?.message?.content?.trim() || "[System Anomaly] Empty timeline data.";
        res.status(200).json({ simulationResult: aiOutputText });

    } catch (error) {
        console.error("Groq Core Pipeline Fault:", error);
        res.status(200).json({ 
            simulationResult: `[API ERROR] Groq failed to process request. Reason: ${error.message}` 
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Simulator Engine active via Groq hardware core on port ${PORT}`);
});
