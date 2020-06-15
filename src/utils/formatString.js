export const capSentence = (sentence) => {
  let wordsArr = sentence.split(' ');
  wordsArr[0] = wordsArr[0][0].toUpperCase() + wordsArr[0].slice(1);
  return wordsArr.join(' ');
};
