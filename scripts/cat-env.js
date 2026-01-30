
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
    const buffer = fs.readFileSync(envPath);
    console.log("--- HEX DUMP ---");
    console.log(buffer.toString('hex'));
    console.log("----------------");
}
