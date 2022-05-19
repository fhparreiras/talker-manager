const fs = require('fs');

const readContent = () => {
  const response = fs.readFileSync('./talker.json', 'utf-8');
  const result = JSON.parse(response);
  return result;
};

module.exports = { readContent };
