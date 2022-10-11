const multiplyFunc = (trivia, item, timer) => {
  const multiplic = 10;
  const numberHard = 3;
  const numberEasy = 1;
  const numberMedium = 2;
  let dificultyValue = 0;
  const dificulty = trivia[item].difficulty;
  if (dificulty === 'hard') {
    dificultyValue = multiplic + (timer * numberHard);
  } else if (dificulty === 'medium') {
    dificultyValue = multiplic + (timer * numberMedium);
  } else {
    dificultyValue = multiplic + (timer * numberEasy);
  }
  return dificultyValue;
};

export default multiplyFunc;
