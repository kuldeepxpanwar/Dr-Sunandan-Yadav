const https = require('https');
https.get('https://www.peckerschicken.co.uk/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    // Check Google Fonts
    const gFonts = data.match(/family=([^&\"\']+)/g) || [];
    console.log('--- Google Fonts Links ---');
    console.log(gFonts);
    
    // Check internal CSS
    const fontFaces = data.match(/font-family:\s*[^;}\"\']+/gi) || [];
    const unique = new Set(fontFaces.map(f => f.replace(/font-family:\s*/i, '').trim().replace(/'/g, '')));
    console.log('\n--- Font Families Used in HTML ---');
    console.log(Array.from(unique));
  });
}).on('error', (e) => console.error(e));
