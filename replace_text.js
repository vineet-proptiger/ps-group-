const fs = require('fs');
const path = require('path');

const targetStr = /PS Group Project\s*/g;
const replacement = 'New Launch Projects in Newtown';

function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Exclude node_modules, .next, etc if they existed, though this is clean
      if (!fullPath.includes('node_modules') && !fullPath.includes('.next') && !fullPath.includes('.git')) {
        processDirectory(fullPath);
      }
    } else {
      // only touch js, jsx, css
      if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        if (content.match(targetStr)) {
          // Special case for Footer? The prompt says "except footter section", but Footer.jsx only has "PS Group", not "PS Group Project".
          // If it happens to have it, we skip.
          if (fullPath.endsWith('Footer.jsx')) continue;
          
          let newContent = content.replace(targetStr, replacement + ' ');
          
          // Clean up any double spaces introduced
          newContent = newContent.replace(/New Launch Projects in Newtown  /g, 'New Launch Projects in Newtown ');
          
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log(`Updated: ${fullPath}`);
        }
      }
    }
  }
}

processDirectory('./app');
processDirectory('./components');
processDirectory('./lib');
