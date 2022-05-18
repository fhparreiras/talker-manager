const fs = require('fs').promises;

const writeContent = (fileName, content) => {
  const newContent = JSON.stringify(content);
  fs.writeFile(fileName, newContent);
};

module.exports = { writeContent };