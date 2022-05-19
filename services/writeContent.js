const fs = require('fs');

const writeContent = (fileName, content) => {
  const newContent = JSON.stringify(content);
  fs.writeFileSync(fileName, newContent);
};

module.exports = { writeContent };