const fs = require('fs');
const path = require('path');
const adminDir = path.join(process.cwd(), 'app', 'admin');

function traverseAndReplace(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseAndReplace(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const newContent = content.replace(/(^|[^'"`A-Za-z0-9\-])(var\(--admin-[a-z-]+\))([^'"`A-Za-z0-9\-]|$)/g, "$1'$2'$3");
      
      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Fixed ' + fullPath);
      }
    }
  }
}
traverseAndReplace(adminDir);
