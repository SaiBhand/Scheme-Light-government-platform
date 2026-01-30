
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Manually read .env.local
let apiKey = process.env.GEMINI_API_KEY;
try {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match && match[1]) {
        process.env.GEMINI_API_KEY = match[1].trim();
    }
} catch (e) { }

async function checkSpecificModel() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const modelName = "models/gemini-flash-lite-latest";

    console.log(`Testing requested model: ${modelName}`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        console.log(`✅ Success! Response: ${result.response.text()}`);
    } catch (e) {
        console.log(`❌ Failed: ${e.message}`);
    }
}

checkSpecificModel();
