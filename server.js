/* ==========================================================================
   WHAT IF SIMULATOR - GROQ ENGINE STABLE CORE (server.js)
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
            simulationResult: "[CONFIG FAULT] GROQ_API_KEY is missing from Render variables." 
        });
    }

    try {
        // Calling an ultra-stable model on Groq's fast layer
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
            model: 'openai/gpt-oss-20b',
            max_tokens: 150,
            temperature: 0.8
        });

        const aiOutputText = chatCompletion.choices[0]?.message?.content?.trim();
        
        if (!aiOutputText) {
            throw new Error("Received an empty text stream from the backend layer.");
        }

        res.status(200).json({ simulationResult: aiOutputText });

    } catch (error) {
        console.error("Groq Pipeline Failure:", error);
        // We print the real error directly to the user box instead of static placeholder text!
        res.status(200).json({ 
            simulationResult: `[SERVER CORE FAULT] Connection to AI cluster dropped. Details: ${error.message}` 
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Simulator Core running`);
});
