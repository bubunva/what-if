/* ==========================================================================
   WHAT IF SIMULATOR - KID-FRIENDLY SCIENCE ENGINE (server.js)
   ========================================================================== */

const express = require('express');
const path = require('path');
const { Groq } = require('groq-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/api/simulate', async (req, res) => {
    const { prompt, profile } = req.body;

    if (!process.env.GROQ_API_KEY) {
        return res.json({ 
            simulationResult: "[CONFIG FAULT] Your GROQ_API_KEY variable is missing from Render." 
        });
    }

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    // 🌟 THE UPDATE: We command the AI to explain real science using simple, kid-friendly language!
                    content: `You are a hyper-realistic scientific simulation engine for kids. 
                    Answering the user's question, analyze exactly what would happen using the real laws of physics and science.
                    Explain the changes and consequences using very simple, kid-friendly language, exciting tones, and easy-to-understand examples. Avoid overly complicated scientific jargon.
                    Write a detailed, exactly 3-sentence summary. 
                    Prefix the output string with "[Scientific Analysis Node]".`
                },
                {
                    role: 'user',
                    content: `What if ${prompt}`
                }
            ],
            model: 'llama-3.3-70b-versatile',
            max_tokens: 250,
            temperature: 0.75 
        });

        const aiOutputText = chatCompletion.choices[0]?.message?.content?.trim();
        
        if (!aiOutputText) {
            throw new Error("AI linked up correctly but returned a blank message layout.");
        }

        res.status(200).json({ simulationResult: aiOutputText });

    } catch (error) {
        console.error("Groq Engine Error:", error);
        res.status(200).json({ 
            simulationResult: `[SERVER CORE FAULT] Connection to AI cluster dropped. Details: ${error.message}` 
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Kid-Friendly Scientific Simulator Engine active on port ${PORT}`);
});
