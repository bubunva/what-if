/* ==========================================================================
   WHAT IF SIMULATOR - OPENAI PROXY BACKEND ENGINE (server.js)
   ========================================================================== */

const express = require('express');
const path = require('path');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI using the key securely mapped by Render
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/api/simulate', async (req, res) => {
    const { prompt, profile } = req.body;

    // Safety fallback check
    if (!process.env.OPENAI_API_KEY) {
        return res.json({ 
            simulationResult: "[CONFIG FAULT] Your OPENAI_API_KEY is missing from your Render environment variables." 
        });
    }

    try {
        // Execute a fast chat completion stream using gpt-4o-mini
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
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
            max_tokens: 150,
            temperature: 0.8
        });

        // Extract the generated text cleanly from OpenAI's data structure
        const aiOutputText = response.choices[0].message.content.trim();
        
        res.status(200).json({ simulationResult: aiOutputText });

    } catch (error) {
        console.error("OpenAI Core Pipeline Fault:", error);
        res.status(200).json({ 
            simulationResult: `[API ERROR] OpenAI failed to process request. Reason: ${error.message}` 
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Simulator Engine active via OpenAI core on port ${PORT}`);
});
