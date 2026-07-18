/* ==========================================================================
   WHAT IF SIMULATOR - ULTRA-DEFENSIVE GROQ CORE (server.js)
   ========================================================================== */

const express = require('express');
const path = require('path');
const { Groq } = require('groq-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the Groq hardware acceleration client securely
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/api/simulate', async (req, res) => {
    const { prompt, profile } = req.body;

    if (!process.env.GROQ_API_KEY) {
        return res.json({ 
            simulationResult: "[CONFIG FAULT] Your GROQ_API_KEY variable is not defined inside your Render dashboard settings." 
        });
    }

    try {
        // Ping Groq's high-speed generation pipeline using their fast open-weights workhorse
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `You are a quantum alternate-timeline simulation machine engine. 
                    The user's parameters: Identity is ${profile.username}, outfit profile is ${profile.outfitModule}.
                    Write a highly creative, detailed, exactly 3-sentence alternate reality summary answering the user's question. 
                    Prefix the output string with "[Calculated Continuity Node]". Do not break character.`
                },
                {
                    role: 'user',
                    content: `What if ${prompt}`
                }
            ],
            model: 'openai/gpt-oss-20b',
            max_tokens: 200,
            temperature: 0.85
        });

        // 🔍 ULTRA-DEFENSIVE TEXT EXTRACTION MATRIX
        // This inspects every layer where Groq or OpenAI protocols store text content
        let aiOutputText = "";
        
        if (chatCompletion.choices?.[0]?.message?.content) {
            aiOutputText = chatCompletion.choices[0].message.content.trim();
        } else if (chatCompletion.choices?.[0]?.text) {
            aiOutputText = chatCompletion.choices[0].text.trim();
        } else if (chatCompletion.output_text) {
            aiOutputText = chatCompletion.output_text.trim();
        } else {
            // Log the raw artifact block to your Render console so you can inspect it if needed
            console.log("Raw API Packet Log:", JSON.stringify(chatCompletion));
            throw new Error("The AI returned a successful link but text was stored in an unrecognizable structure.");
        }

        res.status(200).json({ simulationResult: aiOutputText });

    } catch (error) {
        console.error("Groq System Loop Exception:", error);
        res.status(200).json({ 
            simulationResult: `[API ENGINE EXCEPTION] Failed to capture timeline stream. Details: ${error.message}` 
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Simulator Engine live and fully operational.`);
});
