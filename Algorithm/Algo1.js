function isValid(i, j, k, marks, count) {
  if (i + 2 * j + 3 * k == marks && i + j + k == count) return true;
  return false;
}

function generateBank() {
  questionBank_1M = [];
  for (i = 0; i < 2000; i++) {
    diff = Math.floor(Math.random() * 3) + 1;
    // marks1 = Math.floor(Math.random() * 3) + 1;
    ID = (diff + 1) * (Math.floor(Math.random() * 1000) + 1);
    CO = Math.floor(Math.random() * 5) + 1;
    Chapter = Math.floor(Math.random() * 16) + 1;
    questionBank_1M.push({
      id: ID,
      marks: 1,
      difficulty: diff,
      co: CO,
      chapter: Chapter,
      included: false,
    });
  }
  questionBank_2M = [];
  for (i = 0; i < 2000; i++) {
    diff = Math.floor(Math.random() * 3) + 1;
    // marks1 = Math.floor(Math.random() * 3) + 1;
    ID = (diff + 1) * (Math.floor(Math.random() * 1000) + 1);
    CO = Math.floor(Math.random() * 5) + 1;
    Chapter = Math.floor(Math.random() * 16) + 1;
    questionBank_2M.push({
      id: ID,
      marks: 2,
      difficulty: diff,
      co: CO,
      chapter: Chapter,
      included: false,
    });
  }
  questionBank_3M = [];
  for (i = 0; i < 2000; i++) {
    diff = Math.floor(Math.random() * 3) + 1;
    // marks1 = Math.floor(Math.random() * 3) + 1;
    ID = (diff + 1) * (Math.floor(Math.random() * 1000) + 1);
    CO = Math.floor(Math.random() * 5) + 1;
    Chapter = Math.floor(Math.random() * 16) + 1;
    questionBank_3M.push({
      id: ID,
      marks: 3,
      difficulty: diff,
      co: CO,
      chapter: Chapter,
      included: false,
    });
  }
  questionBank = [];
  questionBank.push(questionBank_1M);
  questionBank.push(questionBank_2M);
  questionBank.push(questionBank_3M);
  return questionBank;
}

function generatePopulation(marks, count) {
  m1 = [];
  m2 = [];
  m3 = [];
  if (marks == count) {
    m1.push(count);
    m2.push(0);
    m3.push(0);
  } else {
    buf1 = marks - 5;
    for (i = 1; i <= buf1; i++) {
      temp = (marks - i) / 2;
      for (j = 1; j <= temp; j++) {
        buf = (marks - i - j * 2) / 3;
        for (k = 1; k <= buf; k++) {
          if (isValid(i, j, k, marks, count)) {
            m1.push(i);
            m2.push(j);
            m3.push(k);
            // console.log(i, j, k);
          }
        }
      }
    }
  }
  res = [];
  res.push(m1);
  res.push(m2);
  res.push(m3);
  return res;
}

//TODO
function selection(solutionSet, i, questionBank) {
  i = Math.floor(i);
  var map = {};
  a = solutionSet[0][i];
  b = solutionSet[1][i];
  c = solutionSet[2][i];
  questionPaper = [];

  for (let i = 0; i < a; i++) {
    buf = Math.floor(Math.random() * (questionBank[0].length - 1));
    if (map.length > 0 && map[questionBank[0][buf].id]) {
      while (map[questionBank[0][buf].id])
        buf = Math.floor(Math.random() * (questionBank[0].length - 1));
    }
    map[questionBank[0][buf].id] = true;
    questionPaper.push(questionBank[0][buf]);
  }

  for (let i = 0; i < b; i++) {
    buf = Math.floor(Math.random() * (questionBank[1].length - 1));
    if (map.length > 0 && map[questionBank[1][buf].id]) {
      while (map[questionBank[1][buf].id])
        buf = Math.floor(Math.random() * (questionBank[1].length() - 1));
    }
    map[questionBank[1][buf].id] = true;
    questionPaper.push(questionBank[1][buf]);
  }

  for (let i = 0; i < c; i++) {
    buf = Math.floor(Math.random() * (questionBank[2].length - 1));
    if (map.length > 0 && map[questionBank[2][buf].id]) {
      while (map[questionBank[2][buf].id])
        buf = Math.floor(Math.random() * (questionBank[2].length - 1));
    }
    map[questionBank[2][buf].id] = true;
    questionPaper.push(questionBank[2][buf]);
  }

  return questionPaper;
}

function isAvailable(questionBank, solutionSet, i) {
  one_mark = solutionSet[0][i];
  two_mark = solutionSet[1][i];
  three_mark = solutionSet[2][i];
  if (
    one_mark > questionBank[0].length ||
    two_mark > questionBank[1].length ||
    three_mark > questionBank[2].length
  )
    return false;
  return true;
}

function Algo(marks, numberOfQuestions, difficulty, questionBank) {
  solutionSet = generatePopulation(marks, numberOfQuestions);
  // console.log(solutionSet);
  iterations = 100;
  finalFitness = -1;
  finalQuestionPaper = [];
  let i = Math.floor(solutionSet.length / 2 - 1);
  let j = Math.floor(solutionSet.length / 2 + 1);
  if (isAvailable(questionBank, solutionSet, solutionSet.length / 2)) {
    // questionPaper = [];
    for (let i = 0; i < iterations; i++) {
      questionPaper = selection(
        solutionSet,
        solutionSet.length / 2,
        questionBank
      );
      console.log(questionPaper.length);
      fitness = CalcFitness(
        solutionSet[0][Math.floor(solutionSet.length / 2)],
        solutionSet[1][Math.floor(solutionSet.length / 2)],
        solutionSet[2][Math.floor(solutionSet.length / 2)],
        difficulty,
        questionPaper
      );
      console.log(fitness);
      if (fitness > finalFitness) {
        finalFitness = fitness;
        finalQuestionPaper = questionPaper;
      }
    }
    console.log(finalFitness, finalQuestionPaper);

    return finalQuestionPaper;
  }
  while (i >= 0 && j < solutionSet.length) {
    if (
      isAvailable(questionBank, solutionSet, i) &&
      isAvailable(questionBank, solutionSet, j)
    ) {
      c1 = [];
      c2 = [];
      c1.push(solutionSet[0][i]);
      c1.push(solutionSet[1][i]);
      c1.push(solutionSet[2][i]);

      c2.push(solutionSet[0][j]);
      c2.push(solutionSet[1][j]);
      c2.push(solutionSet[2][j]);
      final = [];
      final = betterCombination(c1, c2);
      if (final == c1) {
        comb = i;
      } else {
        comb = j;
      }
      questionPaper = [];
      for (let i = 0; i < iterations; i++) {
        questionPaper = selection(solutionSet, comb, questionBank);
        fitness = CalcFitness(
          solutionSet[0][comb],
          solutionSet[1][comb],
          solutionSet[2][comb],
          difficulty,
          questionPaper
        );
        if (fitness > finalFitness) {
          finalFitness = fitness;
          finalQuestionPaper = questionPaper;
        }
      }
      return finalQuestionPaper;
    }
  }
}

function CalcFitness(
  one_mark_questions,
  two_mark_questions,
  three_mark_questions,
  difficulty,
  questionSet
) {
  diff = 0;
  diff += Math.abs(one_mark_questions - two_mark_questions);
  diff += Math.abs(two_mark_questions - three_mark_questions);
  diff += Math.abs(three_mark_questions - one_mark_questions);
  avg_difficulty = 0;
  for (let i = 0; i < questionSet.length; i++) {
    avg_difficulty += questionSet[i].difficulty;
  }
  avg_difficulty /= questionSet.length;
  difficultyDiff = difficulty - avg_difficulty;
  console.log(
    "Inside calcfitness diff and difficultyDiff ",
    diff,
    " ",
    difficultyDiff
  );
  if (difficultyDiff == 0 && diff == 0) return 1;
  if (difficultyDiff == 0) return 1 / diff;
  if (diff == 0) return 1 / difficultyDiff;
  return 1 / (difficultyDiff * diff);
}

function betterCombination(combination1, combination2) {
  diff1 = 0;
  diff2 = 0;
  diff1 += Math.abs(combination1[0] - combination1[1]);
  diff1 += Math.abs(combination1[1] - combination1[2]);
  diff1 += Math.abs(combination1[2] - combination1[0]);

  diff2 += Math.abs(combination2[0] - combination2[1]);
  diff2 += Math.abs(combination2[1] - combination2[2]);
  diff2 += Math.abs(combination2[2] - combination2[0]);

  if (diff1 < diff2) return combination1;
  else return combination2;
}

Algo(100, 60, 2, generateBank());
