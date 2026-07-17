/**
 * ==========================================================================
 * WHAT IF SIMULATOR - SYSTEM CONFIGURATION VECTOR (config.js)
 * PROTOCOL: APPLICATION DECOUPLING AND ENVIRONMENT HYDRATION
 * ==========================================================================
 */

const CONFIG = {
    // Application States
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,

    // AI Core Security Configuration Gateways
    // NEVER put raw API keys explicitly here! Use process.env variables.
    AI_CORE_KEY: process.env.AI_SIMULATOR_SECRET_KEY || 'MOCK_KEY_DEVELOPMENT_ACTIVE',
    AI_MODEL_TARGET: 'gpt-4o-mini', // Or 'gemini-1.5-flash' depending on your engine preference
    
    // Performance Metrics Flags
    HARDWARE_ACCELERATION_ACTIVE: true,
    MAX_LOG_STACK_SIZE: 50
};

// Export pattern compatibility wrapper so both browser layers and node modules can read it safely
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}
