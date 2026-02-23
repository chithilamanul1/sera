const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgBuffer = fs.readFileSync(path.join(__dirname, 'public/favicon.svg'));

async function generate() {
    console.log("Generating icon.png 512x512");
    await sharp(svgBuffer)
        .resize(512, 512)
        .png()
        .toFile(path.join(__dirname, 'public/icon.png'));

    console.log("Generating apple-icon.png 180x180");
    await sharp(svgBuffer)
        .resize(180, 180)
        .png()
        .toFile(path.join(__dirname, 'public/apple-icon.png'));

    console.log("Generating og-image.png 1200x630");
    // For OG image, let's create a 1200x630 background with the SVG centered
    await sharp({
        create: {
            width: 1200,
            height: 630,
            channels: 4,
            background: { r: 2, g: 6, b: 23, alpha: 1 } // #020617
        }
    })
        .composite([{
            input: await sharp(svgBuffer).resize(400, 400).toBuffer(),
            gravity: 'center'
        }])
        .png()
        .toFile(path.join(__dirname, 'public/og-image.png'));

    console.log("Done generating icons.");
}

generate().catch(console.error);
