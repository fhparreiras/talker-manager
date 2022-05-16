const fs = require('fs');

const readContent = (fileName) => {
  const response = fs.readFileSync(fileName, 'utf-8');
  console.log('Response: ', response);
  return JSON.parse(response);
};

module.exports = { readContent };
