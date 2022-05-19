const fs = require('fs');

const readContent = () => {
  const response = fs.readFileSync('./talker.json', 'utf-8');
  return JSON.parse(response);
};

module.exports = { readContent };
