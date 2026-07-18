/* ==========================================================================
   WHAT IF SIMULATOR - GROQ NATIVE PERFORMANCE ENGINE (server.js)
   ========================================================================== */

const express = require('express');
const path = require('path');
const { Groq } = require('groq-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Groq using your secure environment token
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/api/simulate', async (req, res) => {
    const { prompt, profile } = req.body;

    if (!process.env.GROQ_API_KEY) {
        return res.json({ 
            simulationResult: "[CONFIG FAULT] Your GROQ_API_KEY variable is missing from your Render dashboard settings." 
        });
    }

    // Build the master query string
    const engineeredInputText = `
        You are a quantum alternate-timeline simulation machine engine. 
        The user's profile parameters are: Identity is ${profile.username}, outfit profile is ${profile.outfitModule}.
        Write a highly creative, detailed, exactly 3-sentence alternate reality summary answering the question. 
        Prefix the output string with "[Calculated Continuity Node]". Do not break character.
        
        Question: What if ${prompt}
    `;

    try {
        // Utilizing Groq's high-speed response creation architecture
        const response = await groq.responses.create({
            model: 'openai/gpt-oss-20b',
            input: engineeredInputText
        });

        // Pull the text data cleanly from the official property lane
        const aiOutputText = response.output_text ? response.output_text.trim() : null;
        
        if (!aiOutputText) {
            throw new Error("Data channel loaded, but output_text artifact returned missing.");
        }

        res.status(200).json({ simulationResult: aiOutputText });

    } catch (error) {
        console.error("Groq Processing Exception:", error);
        res.status(200).json({ 
            simulationResult: `[ENGINE EXCEPTION] Connection dropped. Details: ${error.message}` 
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Simulator Engine online via native Groq pathways`);
});
