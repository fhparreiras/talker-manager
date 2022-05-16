const elements = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', 'w',
0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 
'M', 'N', 'O', 'P', 'Q', 'R', 'S',
'T', 'U', 'V', 'X', 'Y', 'W', 'Z'];

const tokenGenerator = () => {
  const tokenArray = [];
  for (let i = 0; i <= 15; i += 1) {
    const tokenElement = elements[Math.floor(Math.random() * elements.length)];
    tokenArray.push(tokenElement);
  }
  
  return tokenArray.join('');
};

module.exports = { tokenGenerator };
