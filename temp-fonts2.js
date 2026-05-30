const fs = require('fs');
if (!fs.existsSync('peckers.html')) {
  console.log('peckers.html not found');
  process.exit();
}
const data = fs.readFileSync('peckers.html', 'utf8');
const fontFaces = data.match(/@font-face\s*{[^}]+}/gi);
console.log('--- Font Faces ---');
console.log(fontFaces ? fontFaces.join('\n') : 'No inline @font-face found');

const cssLinks = data.match(/<link[^>]+rel=[\"']stylesheet[\"'][^>]*>/gi);
console.log('\n--- CSS Links ---');
console.log(cssLinks);
