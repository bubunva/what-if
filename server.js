/* ==========================================================================
   WHAT IF SIMULATOR - ADVANCED MULTI-ROUTE BACKEND ENGINE (server.js)
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

// ROUTE 1: PRIMARY SIMULATION GENERATOR
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
                    content: `You are a hyper-realistic scientific simulation engine for kids. 
                    Answering the user's question, analyze exactly what would happen using the real laws of physics and science.
                    Explain the changes and consequences using very simple, kid-friendly language, exciting tones, and easy-to-understand examples. Avoid complicated jargon.
                    Write a detailed, exactly 3-sentence summary. Do not use fantasy elements.
                    Prefix the output string with "[Scientific Analysis Node]".`
                },
                {
                    role: 'user',
                    content: `What if ${prompt} (Context user identity: ${profile.username}, outfit: ${profile.outfitModule})`
                }
            ],
            model: 'llama-3.3-70b-versatile',
            max_tokens: 250,
            temperature: 0.75 
        });

        const aiOutputText = chatCompletion.choices[0]?.message?.content?.trim();
        res.status(200).json({ simulationResult: aiOutputText || "[Error generating simulation data stream]" });

    } catch (error) {
        res.status(200).json({ simulationResult: `[SERVER CORE FAULT] Connection lost: ${error.message}` });
    }
});

// ROUTE 2: DYNAMIC DEDICATED AI SHUFFLE ENGINE
app.get('/api/shuffle', async (req, res) => {
    try {
        const shuffleCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `Generate a single, unique, incredibly fascinating "What if" science question suitable for kids. 
                    The question should look at major physical shifts, astronomy, nature, or the human body.
                    Example format: "What if gravity vanished for 5 seconds?" or "What if the sun turned blue?"
                    Return ONLY the raw question text. Do not include quotes, intro text, or explanation.`
                }
            ],
            model: 'llama-3.3-70b-versatile',
            max_tokens: 50,
            temperature: 0.9 // Higher temperature for high randomness
        });

        let randomQuestion = shuffleCompletion.choices[0]?.message?.content?.trim();
        // Clean out any accidental wrapping quotes from the model response
        randomQuestion = randomQuestion.replace(/^["']|["']$/g, '');
        
        res.status(200).json({ question: randomQuestion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Quantum Sci-Core running on port ${PORT}`);
});
