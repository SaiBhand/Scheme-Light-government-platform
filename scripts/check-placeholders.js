
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');

    if (content.includes('YOUR_SUPABASE_URL_HERE')) {
        console.log("PLACEHOLDERS_FOUND");
    } else {
        console.log("NO_PLACEHOLDERS");
    }

    if (content.includes('NEXT_PUBLIC_SUPABASE_URL=')) {
        console.log("KEY_PRESENT");
    } else {
        console.log("KEY_MISSING");
    }
} else {
    console.log("FILE_MISSING");
}
