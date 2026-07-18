/* ==========================================================================
   WHAT IF SIMULATOR - OFFICIAL GROQ SDK LAYER (server.js)
   ========================================================================== */

const express = require('express');
const path = require('path');
const { Groq } = require('groq-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the official Groq client using your secure Render key
const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY 
});

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
        // Correct syntax using Groq's high-speed chat completion engine
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `You are a quantum alternate-timeline simulation machine engine. 
                    The user's customized parameters: Identity is ${profile.username}, outfit profile is ${profile.outfitModule}.
                    Write a highly creative, detailed, exactly 3-sentence alternate reality summary answering the user's question. 
                    Prefix the output string with "[Calculated Continuity Node]". Do not break character.`
                },
                {
                    role: 'user',
                    content: `What if ${prompt}`
                }
            ],
            // Running on Groq's rock-solid free-tier workhorse model
            model: 'llama-3.3-70b-versatile',
            max_tokens: 200,
            temperature: 0.8
        });

        // Pull the text data cleanly from the official message properties array
        const aiOutputText = chatCompletion.choices[0]?.message?.content?.trim();
        
        if (!aiOutputText) {
            throw new Error("AI linked up correctly but returned a blank message content layout.");
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
    console.log(`🚀 Simulator Engine live and fully operational on port ${PORT}`);
});
