
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Manually read .env.local
try {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match && match[1]) {
        process.env.GEMINI_API_KEY = match[1].trim();
    }
} catch (e) {
    console.error("Could not read .env.local", e);
}

if (!process.env.GEMINI_API_KEY) {
    console.error("No API KEY found");
    process.exit(1);
}

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Test multiple likely model names
    const modelsToTest = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-001",
        "gemini-1.5-pro",
        "gemini-pro",
        "gemini-1.0-pro"
    ];

    console.log("Testing models with key ending in: ..." + process.env.GEMINI_API_KEY.slice(-4));

    for (const modelName of modelsToTest) {
        console.log(`\nTesting model: ${modelName}`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello, are you there?");
            console.log(`✅ Success with ${modelName}!`);
            console.log(`Response: ${result.response.text()}`);
            return; // Stop after finding the first working one
        } catch (e) {
            console.log(`❌ Failed: ${modelName}`);
            console.log(`Error: ${e.message.split('\n')[0]}`); // First line of error
        }
    }
}

listModels();
