const fs = require('fs');
const path = require('path');

function refactorBanners(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            refactorBanners(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            const hasBannerPS = content.includes('style={{ backgroundImage: "linear-gradient(to right, rgba(20, 83, 45, 0.9), rgba(13, 158, 92, 0.8)), url(\'/images/banner.png\')" }}');
            const hasBannerNode = content.includes('style={{ backgroundImage: "linear-gradient(to right, rgba(16, 73, 40, 0.85), rgba(21, 128, 61, 0.85)), url(\'/images/banner.png\')" }}');

            if (hasBannerPS || hasBannerNode) {
                // Add import
                if (!content.includes('import { PageBanner } from \'@/components/ui/PageBanner\'')) {
                    const importStatement = `import { PageBanner } from '@/components/ui/PageBanner'\n`;
                    const lastImportIndex = content.lastIndexOf('import ');
                    if (lastImportIndex !== -1) {
                        const endOfLastImport = content.indexOf('\n', lastImportIndex);
                        content = content.slice(0, endOfLastImport + 1) + importStatement + content.slice(endOfLastImport + 1);
                    } else {
                        content = importStatement + content;
                    }
                }

                // Replace opening tags. 
                const openingRegex = /<section\s*style=\{\{\s*backgroundImage:\s*"linear-gradient\(to right, rgba\(\d+, \d+, \d+, 0\.\d+\), rgba\(\d+, \d+, \d+, 0\.\d+\)\), url\('\/images\/banner\.png'\)"\s*\}\}\s*className="bg-cover bg-center py-2[24] text-white"\s*>\s*<Container>/g;

                content = content.replace(openingRegex, '<PageBanner>');

                // Replace the closing tags.
                content = content.replace(/<\/Container>\s*<\/section>/, '</PageBanner>');
                fs.writeFileSync(fullPath, content);
                console.log('Refactored ' + fullPath);
            }
        }
    }
}
refactorBanners(path.join(process.cwd(), 'app'));
