const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.name === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const hasFooter = content.includes('{/* Footer */}');
      
      if (hasFooter) {
          console.log(`Processing: ${fullPath}`);
          
          // Remove the Footer block entirely
          content = content.replace(/\{\/\* Footer \*\/\}\s*<footer[\s\S]*?<\/footer>/, '');
          
          // Add the import if not present
          if (!content.includes('ServiceLocations')) {
              let relativePath = '../../components/ServiceLocations';
              content = content.replace(/import Link from 'next\/link';/, `import Link from 'next/link';\nimport ServiceLocations from '${relativePath}';`);
          }
          
          // Inject <ServiceLocations /> before the final closing div layout
          // The files end with: 
          //      </div>
          //    </>
          //  );
          // }
          if (!content.includes('<ServiceLocations />')) {
                content = content.replace(/(<\/div>\s*<\/>\s*\);\s*\})$/, '  <ServiceLocations />\n      $1');
          }
          
          fs.writeFileSync(fullPath, content);
          console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

// Start from the services root, excluding the main services/page.tsx which we already fixed
processDir('c:\\Users\\LENOVO\\Desktop\\advertisement\\src\\app\\services\\');
console.log('Refactoring complete!');
