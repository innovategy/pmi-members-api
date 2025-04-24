// Cross-platform WSDL copy script for Node.js
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '../src/dep/wsdl/DEPService.wsdl');
const dest = path.resolve(__dirname, '../dist/dep/wsdl/DEPService.wsdl');

// Ensure destination directory exists
fs.mkdirSync(path.dirname(dest), { recursive: true });

fs.copyFile(src, dest, (err) => {
  if (err) {
    console.error('Failed to copy WSDL file:', err);
    process.exit(1);
  } else {
    console.log('WSDL file copied successfully.');
  }
});
