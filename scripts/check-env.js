const fs = require('fs');
const path = require('path');
const envPath = path.join(process.cwd(), '.env.local');

try {
    if (!fs.existsSync(envPath)) {
        console.log("FILE_MISSING");
        process.exit(1);
    }
    const envFile = fs.readFileSync(envPath, 'utf8');

    let urlFound = false;
    let keyFound = false;

    const lines = envFile.split('\n');
    lines.forEach(line => {
        line = line.trim();
        if (!line || line.startsWith('#')) return;

        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const val = parts.slice(1).join('=').trim();

            if (key === 'NEXT_PUBLIC_SUPABASE_URL') {
                urlFound = true;
                console.log(`URL_CHECK: Length=${val.length}`);
                console.log(`URL_VAL: ${val.substring(0, 12)}...`);
                if (!val.startsWith('https://')) {
                    console.log("URL_ERROR: Does not start with https://");
                } else {
                    console.log("URL_OK");
                }
            }

            if (key === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') {
                keyFound = true;
                console.log(`KEY_CHECK: Length=${val.length}`);
                console.log(`KEY_VAL: ${val.substring(0, 5)}...`);
                if (!val.startsWith('ey')) {
                    console.log("KEY_ERROR: Does not start with 'ey'.");
                } else {
                    const parts = val.split('.');
                    if (parts.length !== 3) {
                        console.log(`KEY_ERROR: Invalid JWT format (parts=${parts.length}).`);
                    } else {
                        console.log("KEY_OK");
                    }
                }
            }
        }
    });

    if (!urlFound) console.log("URL_MISSING");
    if (!keyFound) console.log("KEY_MISSING");

} catch (e) {
    console.log("Error reading .env.local: " + e.message);
}
