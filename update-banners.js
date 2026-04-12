const fs = require('fs');
const path = require('path');

function replaceRecursively(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceRecursively(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('className="bg-gradient-to-br from-green-900 to-green-700')) {
                content = content.replace(
                    /className="bg-gradient-to-br from-green-900 to-green-700/g,
                    'style={{ backgroundImage: "linear-gradient(to right, rgba(16, 73, 40, 0.85), rgba(21, 128, 61, 0.85)), url(\'/images/banner.png\')" }} className="bg-cover bg-center'
                );
                fs.writeFileSync(fullPath, content);
                console.log('Updated ' + fullPath);
            }
        }
    }
}
replaceRecursively(path.join(process.cwd(), 'app'));
