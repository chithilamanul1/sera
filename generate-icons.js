const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load the HTML content
    const htmlPath = 'file://' + path.resolve(__dirname, 'public/render-logo.html');
    await page.goto(htmlPath);

    // Capture icon.png (512x512)
    await page.setViewport({ width: 512, height: 512 });
    await page.screenshot({ path: path.resolve(__dirname, 'public/icon.png') });

    // Capture apple-icon.png (180x180)
    await page.setViewport({ width: 180, height: 180 });
    // Reload is recommended when resizing viewports heavily to ensure layout triggers properly, though for SVG it might be fine.
    await page.goto(htmlPath);
    await page.screenshot({ path: path.resolve(__dirname, 'public/apple-icon.png') });

    // Capture og-image.png (1200x630)
    await page.setViewport({ width: 1200, height: 630 });
    // Write a different HTML for OG image, with the logo scaled up
    const ogHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body, html {
                margin: 0; padding: 0; width: 1200px; height: 630px;
                background: #020617; display: flex; align-items: center; justify-content: center; overflow: hidden;
            }
            svg { width: 500px; height: 500px; }
            path { stroke: #ffffff; stroke-width: 8; stroke-linecap: round; fill: none; }
        </style>
    </head>
    <body>
        <svg viewBox="0 0 100 100">
            <path d="M 40 15 C 15 15 15 45 40 45 C 65 45 65 75 40 75 M 60 25 C 35 25 35 55 60 55 C 85 55 85 85 60 85" />
        </svg>
    </body>
    </html>
    `;
    await page.setContent(ogHtml);
    await page.screenshot({ path: path.resolve(__dirname, 'public/og-image.png') });

    await browser.close();
    console.log("Icons generated successfully.");
})();
