const fs = require('fs');

const talkersJson = fs.readFileSync('./talker.json');

const talkers = JSON.parse(talkersJson);

module.exports = talkers;
