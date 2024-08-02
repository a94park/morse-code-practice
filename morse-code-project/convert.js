const morseCode = {
    "A": ".-",    "B": "-...",  "C": "-.-.",  "D": "-..",
    "E": ".",     "F": "..-.",  "G": "--.",   "H": "....",
    "I": "..",    "J": ".---",  "K": "-.-",   "L": ".-..",
    "M": "--",    "N": "-.",    "O": "---",   "P": ".--.",
    "Q": "--.-",  "R": ".-.",   "S": "...",   "T": "-",
    "U": "..-",   "V": "...-",  "W": ".--",   "X": "-..-",
    "Y": "-.--",  "Z": "--..",
    "0": "-----", "1": ".----", "2": "..---", "3": "...--",
    "4": "....-", "5": ".....", "6": "-....", "7": "--...",
    "8": "---..", "9": "----.",
    ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.",
    "!": "-.-.--", "/": "-..-.", "(": "-.--.",  ")": "-.--.-",
    "&": ".-...",  ":": "---...", ";": "-.-.-.", "=": "-...-",
    "+": ".-.-.",  "-": "-....-", "_": "..--.-", "\"": ".-..-.",
    "$": "...-..-", "@": ".--.-.", " ": "/"
  };
  
  const textToMorse = (text) => {
    return text.toUpperCase().split('').map(char => morseCode[char] || '').join(' ');
  };
  
  const morseToText = (morse) => {
    const morseToChar = Object.entries(morseCode).reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {});
    return morse.split(' ').map(code => morseToChar[code] || '').join('');
  };
  
  document.getElementById('translateToMorse').addEventListener('click', () => {
    const textInput = document.getElementById('textInput').value;
    const morseOutput = textToMorse(textInput);
    document.getElementById('morseOutput').value = morseOutput;
  });
  
  document.getElementById('translateToText').addEventListener('click', () => {
    const morseInput = document.getElementById('morseInput').value;
    const textOutput = morseToText(morseInput);
    document.getElementById('textOutput').value = textOutput;
  });