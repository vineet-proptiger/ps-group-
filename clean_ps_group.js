const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  for (const { search, replace } of replacements) {
    // using split join to replace all occurrences
    content = content.split(search).join(replace);
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

// 1. layout.js
replaceInFile('app/layout.js', [
  { search: ' By PS Group', replace: '' },
  { search: 'by PS Group. Backed by PS Group', replace: 'with premium lifestyle amenities. Spread' },
  { search: 'by PS Group. Backed by top-tier developers', replace: 'with premium lifestyle amenities. Spread' },
  { search: 'by PS Group', replace: '' }
]);

// 2. manifest.js
replaceInFile('app/manifest.js', [
  { search: ' by PS Group', replace: '' }
]);

// 3. globals.css
replaceInFile('app/globals.css', [
  { search: '(PS Group Signature Golden Yellow & Contrast Black)', replace: '(Signature Golden Yellow & Contrast Black)' }
]);

// 4. Footer.jsx
replaceInFile('components/Footer.jsx', [
  { search: 'PS Group is one of the leading', replace: 'The developer is one of the leading' },
  { search: 'PS Group', replace: 'The Developer' }
]);

// 5. Highlights.jsx
replaceInFile('components/Highlights.jsx', [
  { search: 'Developed by PS Group, a well-known name', replace: 'Developed by a well-known name' }
]);

// 6. AboutDeveloper.jsx
replaceInFile('components/AboutDeveloper.jsx', [
  { search: '>PS Group<', replace: '>The Developer<' },
  { search: 'PS Group brings its legacy', replace: 'The developer brings its legacy' },
  { search: 'PS Group creates iconic', replace: 'the developer creates iconic' },
  { search: 'PS Group', replace: 'The Developer' }
]);

// 7. FAQ.jsx
replaceInFile('components/FAQ.jsx', [
  { search: ' architecture by PS Group', replace: ' architecture' },
  { search: "PS Group's legacy", replace: "the developer's legacy" },
  { search: 'PS Group', replace: 'the developer' }
]);

// 8. Overview.jsx
replaceInFile('components/Overview.jsx', [
  { search: 'By PS Group', replace: 'Premium Development' },
  { search: 'Backed by PS Group, the', replace: 'The' },
  { search: 'PS Group', replace: 'The Developer' }
]);

// Also double check config.js if it was somehow left
replaceInFile('lib/config.js', [
  { search: 'PS Group', replace: 'The Developer' }
]);

console.log('Cleanup complete');
