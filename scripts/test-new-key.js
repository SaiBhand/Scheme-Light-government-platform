
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyDcaDZWHVYflXdt_MfTEo4lGQ15diGUE7c";
console.log("Testing API Key:", apiKey.substring(0, 10) + "...");

async function testGemini() {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = "Reply with 'Success'";
        console.log("Sending prompt...");

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Response:", text);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

testGemini();
