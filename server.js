/**
 * ==========================================================================
 * WHAT IF SIMULATOR - MICRO-ENGINE BACKEND RUNTIME (server.js)
 * PROTOCOL: SECURE ENV EXPRESS ASYNC CLUSTER PIPELINE
 * ==========================================================================
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const CONFIG = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

// --- 1. CORE PIPELINE MIDDLEWARE CONFIGURATION ---
app.use(cors());
app.use(express.json());
// Serve static client assets automatically out of the root folder
app.use(express.static(path.join(__dirname, './')));

// --- 2. SECURE AI APIS ROUTING ROUTE ---
app.use('/api/simulate', async (req, res) => {
    try {
        const { question, userMetadata } = req.body;

        if (!question) {
            return res.status(400).json({ error: 'Inquiry vector is null or empty.' });
        }

        console.log(`[Timeline Breach Request] User: ${userMetadata?.name || 'Anon'} asked: "${question}"`);

        // --- MOCK INTEGRATION SIMULATION (REPLACE WITH REAL OPENAI / GEMINI SDK FETCH) ---
        // To deploy live: await fetch('https://api.openai.com/v1/chat/completions', { headers: { Authorization: `Bearer ${CONFIG.AI_CORE_KEY}` } ... })
        const timelineResponses = [
            `Simulating alternative reality vectors where "${question}" occurred. This ripple completely shifts global geography, altering the socio-technological paradigm.`,
            `Timeline analysis complete for traveler ${userMetadata?.name || 'Traveler'}. The omission of this event shifts atmospheric conditions by 14% and creates an unexpected cascade of technological advancements.`,
            `Calculations reveal a severe causality loop. If "${question}" came to pass, global mammalian lines would mutate rapidly, rendering current infrastructure non-existent.`
        ];
        
        const selectedSummary = timelineResponses[Math.floor(Math.random() * timelineResponses.length)] + 
                                `\n\n[System Matrix Report]: Analysis complete for avatar utilizing ${userMetadata?.hairStyle || 'default'} aesthetics.`;

        // Artificial latency block to show off your custom CSS fluid glass loading animation
        setTimeout(() => {
            return res.status(200).json({
                success: true,
                summary: selectedSummary,
                timestamp: Date.now()
            });
        }, 1500);

    } catch (error) {
        console.error('[Pipeline Internal Fault]', error);
        return res.status(500).json({ error: 'Quantum calculation failure down the wire.' });
    }
});

// --- 3. RUNTIME INITIALIZATION ---
app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 WHAT IF SIMULATOR MATRIX ACTIVE ON: http://localhost:${PORT}`);
    console.log(`🔒 SYSTEM ENVIRONMENT RUNNING: ${CONFIG.ENV}`);
    console.log(`=======================================================`);
});
