/* ==========================================================================
   WHAT IF SIMULATOR - OMNI-RANDOM MULTI-ROUTE CORE (server.js)
   ========================================================================== */

const express = require('express');
const path = require('path');
const { Groq } = require('groq-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Groq AI Engine connection
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Middleware parsing rules
app.use(express.json());

// ⚡ CRITICAL FIX FOR RENDER: Serve static asset files directly from root directory
app.use(express.static(__dirname));

// 🧠 ROUTE 1: PRIMARY KID-FRIENDLY SCIENTIFIC ANALYSIS ENGINE
app.post('/api/simulate', async (req, res) => {
    const { prompt, profile } = req.body;

    if (!process.env.GROQ_API_KEY) {
        return res.json({ 
            simulationResult: "[CONFIG FAULT] GROQ_API_KEY is unconfigured in Render." 
        });
    }

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `You are a hyper-realistic scientific simulation engine for kids. 
                    Answering the user's question, analyze exactly what would happen using the real laws of physics and science.
                    Explain the changes and consequences using very simple, kid-friendly language, exciting tones, and easy-to-understand examples. Avoid complicated jargon.
                    Write a detailed, exactly 3-sentence summary. Do not use fantasy elements.
                    Prefix the output string with "[Scientific Analysis Node]".`
                },
                {
                    role: 'user',
                    content: `What if ${prompt} (User details: Name is ${profile.username || 'Traveler'}, Hair Style is ${profile.hairStyle}, Eye Color is ${profile.eyeColor})`
                }
            ],
            model: 'llama-3.3-70b-versatile',
            max_tokens: 300,
            temperature: 0.75 
        });

        const aiOutputText = chatCompletion.choices[0]?.message?.content?.trim();
        res.status(200).json({ simulationResult: aiOutputText || "[Data transmission failure]" });

    } catch (error) {
        res.status(200).json({ simulationResult: `[SERVER FAULT] AI Node inaccessible: ${error.message}` });
    }
});

// 🎲 ROUTE 2: UNRESTRICTED OMNI-RANDOM QUESTION ENGINE
app.get('/api/shuffle', async (req, res) => {
    try {
        const shuffleCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `Generate a single, completely random, fascinating "What if" question for kids. 
                    It must be completely unpredictable and can be about ANYTHING in the entire universe (nature, animals, history, space, technology, human behavior, everyday items, physics, or concepts).
                    Ensure it varies wildly every time. Never repeat the same topic twice.
                    Example formats: "What if cats could talk?", "What if all cars suddenly turned into giant jellybeans?", "What if gravity vanished for ten seconds?"
                    Return ONLY the raw question text. Do not include quotes, numbering, or introductory chatter.`
                }
            ],
            model: 'llama-3.3-70b-versatile',
            max_tokens: 60,
            temperature: 1.0 // Maximum randomness setting
        });

        let randomQuestion = shuffleCompletion.choices[0]?.message?.content?.trim() || "What if trees walked?";
        randomQuestion = randomQuestion.replace(/^["']|["']$/g, '');
        
        res.status(200).json({ question: randomQuestion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ⚡ CRITICAL FIX FOR RENDER: Handle all fallback routing to explicitly deliver index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Initialize Framework Engine
app.listen(PORT, () => {
    console.log(`🚀 Quantum Core operational on port ${PORT}`);
});
