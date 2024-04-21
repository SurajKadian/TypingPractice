var text1 = document.getElementById("text1");
var text2 = document.getElementById("text2");
var submit = document.getElementById("submit");
var result =  document.getElementById('result');
var output = document.getElementById("output");
var output2 = document.getElementById('detailedOutput');
var heading = document.querySelector('.container h1');
//var resultsHeading = document.createElement('h2');
var container = document.querySelector('.container');
const timer = document.getElementById('timer');
let timerInterval;
let timeLeft = 600;
var time = "Time left: ";
let timerStarted = false;
let submitButtonClicked = false;
let increaseTime = false;
let currentFontSize = 16;
const ttBtn = document.getElementById('tt-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');

fullscreenBtn.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
});

function startTimer() {
  if (!timerStarted && !submitButtonClicked) {
    timerInterval = setInterval(updateTimer, 1000);
    timerStarted = true;
  }
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timer = document.getElementById('label');
  timer.textContent = `${time} ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  if (timeLeft === 0) {
    if (confirm("Time's up! Do you want to submit?")) {
      clearInterval(timerInterval);
      submit.click();
    } else {
      increaseTime = true;
      timeLeft = 1;
    }
  }
  else {
    if (!increaseTime) {
      timeLeft--;
      if (timeLeft < 240) {
        timer.style.color = 'red';
      }
    } else {
      timeLeft++;
      time = "Time Elapsed: ";
      timer.style.color = 'green';
      timer.style.fontWeight = 'semi-bold';
    }
  }
}

function parseTimeToSeconds(timeString) {
  const [minutes, seconds] = timeString.split(':').map(parseFloat);
  return minutes * 60 + seconds;
}

function rearrangeLayout() {
  document.body.style.height = '200vh';
  result.style.display = 'block';
  output.style.display = 'block';
  output2.style.display = 'block';
  heading.textContent = 'Results';
  text1.style.height = '12rem';
  text2.style.height = '12rem';
  clearInterval(timerInterval);
  
  //document.getElementById('r-label').style.display = 'none';
}

function loadTextFile(fileUrl) {
  return fetch(fileUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

text2.addEventListener('input', startTimer);

document.getElementById('reset').addEventListener('click', function() {
  location.reload();
});

var providedTexts = {
    '1': 'text/CGL58.txt',
  '2': 'text/CGL61.txt',
  '3': 'text/CGL62.txt',
  '4': 'text/CGL64.txt',
  '5': 'text/CGL66.txt',
  '6': 'text/CHSL109.txt',
  '7': 'text/CHSL25.txt',
  '8': 'text/CHSL26.txt',
  '9': 'text/CHSL27.txt',
  '10': 'text/CHSL28.txt',
  '11': 'text/CHSL30.txt',
  '12': 'text/CHSL43.txt',
  '13': 'text/CHSL44.txt',
  '14': 'text/CHSL45.txt',
  '15': 'text/CHSL46.txt',
  '16': 'text/CHSL47.txt',
  '17': 'text/CHSL48.txt',
  '18': 'text/CHSL50.txt',
  '19': 'text/CHSL52.txt',
  '20': 'text/CHSL55.txt',
  '21': 'text/CHSL56.txt',
  '22': 'text/CHSL58.txt',
  '23': 'text/CHSL60.txt',
  '24': 'text/CHSL62.txt',
  '25': 'text/CHSL7PY.txt',
  '26': 'text/CHSL8PY.txt',
  '27': 'text/CapitalisationPractice.txt',
  '28': 'text/SpellingPractice.txt'
};

ttBtn.addEventListener('click', () => {
  currentFontSize += 2;
  if (currentFontSize > 22) {
    currentFontSize = 16;
  }
  text1.style.fontSize = currentFontSize + 'px';
  text2.style.fontSize = currentFontSize + 'px';
});

document.getElementById('file-upload-icon').addEventListener('click', function() {
  document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const text = e.target.result;
      text1.value = text;
    };
    reader.readAsText(file);
  }
});

document.getElementById('text-selector').addEventListener('change', function() {
  var selectedFileName = this.value;
  var selectedFileUrl = providedTexts[selectedFileName];
  if (selectedFileUrl) {
    loadTextFile(selectedFileUrl)
      .then(content => {
        text1.value = content;
      });
  } else {
    text1.value = '';
  }
});

document.querySelector('.text-container label').addEventListener('click', function(event) {
  event.preventDefault();
});

for (var fileName in providedTexts) {
  var option = document.createElement('option');
  option.value = fileName; // Use file name as value
  option.textContent = providedTexts[fileName].split('/').pop().split('.').slice(0, -1).join('.');
  document.getElementById('text-selector').appendChild(option);
}


timer.addEventListener('click', function() {
if (!submitButtonClicked) {
  const newTime = window.prompt('Enter new time (mm:ss):', '10:00');
  if (newTime !== null) {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = `Time: ${newTime}`;
    timeLeft = parseTimeToSeconds(newTime);
  }
}
});

function errorsPercentage(fullMistakes, halfMistakes, totalWords) {
  if (!isNaN(fullMistakes) && !isNaN(halfMistakes) && !isNaN(totalWords)) {
    var errorsPercentage = ((fullMistakes + (halfMistakes / 2)) / totalWords) * 100;
    return errorsPercentage.toFixed(2);
  } else {
    return 'Could not calculate Error Percentage!';
  }
}

function ld(word1, word2) {
  var m = word1.length;
  var n = word2.length;
  var dp = [];

  for (var i = 0; i <= m; i++) {
    dp[i] = [];
    for (var j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  var distance = dp[m][n];
  var maxLength = Math.max(m, n);
  var similarityPercentage = ((maxLength - distance) / maxLength) * 100;

  return {
    distance: distance,
    similarityPercentage: similarityPercentage
  };
}

// new function, it also includes the cases when one of the text input is longer than the other 
function lcs(text1, text2) {
  var m = text1.length;
  var n = text2.length;
  var output = '';
  var redWords = [];
  var orangeWords = [];
  var blueWords = [];

  // Initialize a 2D array to store the results of subproblems
  var dp = [];
  for (var i = 0; i <= m; i++) {
    dp[i] = [];
    for (var j = 0; j <= n; j++) {
      dp[i][j] = -1;
    }
  }

  // Function to find the length of LCS using dynamic programming
  function lcsLength(i, j) {
    if (i === 0 || j === 0) {
      return 0;
    }

    // If the result is already computed, return it
    if (dp[i][j] !== -1) {
      return dp[i][j];
    }

    if (text1[i - 1] === text2[j - 1]) {
      dp[i][j] = 1 + lcsLength(i - 1, j - 1);
    } else if (ld(text1[i - 1], text2[j - 1]).similarityPercentage >= 60
      && ld(text1[i - 1], text2[j - 1]).similarityPercentage < 100) {
      dp[i][j] = 0.5 + lcsLength(i - 1, j - 1);
    } else {
      dp[i][j] = Math.max(lcsLength(i - 1, j), lcsLength(i, j - 1));
    }

    return dp[i][j];
  }

  // Function to construct the LCS
  function constructLCS(i, j) {
    if (i === 0 && j === 0) {
      return '';
    } else if (i === 0) {
      redWords.push(text2[j - 1]);
      return '<span class="red">' + text2[j - 1] + '</span> ' + constructLCS(i, j - 1);
    } else if (j === 0) {
      orangeWords.push(text1[i - 1]);
      return '<span class="red orange">' + text1[i - 1] + '</span> ' + constructLCS(i - 1, j);
    } else if (text1[i - 1] === text2[j - 1]) {
      return constructLCS(i - 1, j - 1)
        + '<span>' + text1[i - 1] + '</span> ';
    } else if (ld(text1[i - 1], text2[j - 1]).similarityPercentage >= 60
      && ld(text1[i - 1], text2[j - 1]).similarityPercentage < 100) {
      blueWords.push(text1[i - 1]);
      return constructLCS(i - 1, j - 1)
        + '<span class="blue">' + text1[i - 1]
        + '<span class="green">{'+text2[j - 1] + '}</span></span> ';
    } else {
      if (lcsLength(i - 1, j) >= lcsLength(i, j - 1)) {
        orangeWords.push(text1[i - 1]);
        return constructLCS(i - 1, j)
          + '<span class="red orange">' + text1[i - 1] + '</span> ';
      } else {
        redWords.push(text2[j - 1]);
        return constructLCS(i, j - 1)
          + '<span class="red">' + text2[j - 1] + '</span> ';
      }
    }
  }

  output = constructLCS(m, n);

  return {
    output: output,
    redWords: redWords,
    orangeWords: orangeWords,
    blueWords: blueWords
  };
}

submit.addEventListener('click', function() {
  rearrangeLayout();
  submitButtonClicked= true;
  var word1 = text1.value.trim().split(/\s+/);
  var word2 = text2.value.trim().split(/\s+/);
  var wordCount1 = word1.length;
  var wordCount2 = word2.length;
  var charCount1 = text1.value.length;
  var charCount2 = text2.value.length;
  var charWord1 = Math.round(charCount1 / 5);
  var charWord2 = Math.round(charCount2 / 5);
  var L = lcs(word2, word1);
  var redWords = L.redWords.slice().reverse();
  var orangeWords = L.orangeWords.slice().reverse();
  var blueWords = L.blueWords.slice().reverse();
  var red = redWords.length;
  var orange = orangeWords.length;
  var blue = blueWords.length;
  var fm = red + orange;
  var error = errorsPercentage(fm, blue, wordCount1);

  //result
  result.innerHTML = '<b>Total Words: </b>' + wordCount1 + '[~' + charWord1 + ']' + ' words; <br>';
  result.innerHTML += '<b>Words typed: </b>' + wordCount2 + '[~' + charWord2 + ']' + ' words; <br>';
  result.innerHTML += '<b>Full Mistakes : </b>' + fm + '; <br>';
  result.innerHTML += '<b>Half Mistakes : </b>' + blue + '; <br>';
  result.innerHTML += '<b>Error Percentage: </b>' + error + '%; <br>';


  // output
  output.innerHTML = L.output + '<br>';

  //output2
  output2.innerHTML = '<b>Half Mistakes:</b><ol>';
  blueWords.forEach(function(word, index) {
    output2.innerHTML += (index + 1) + '.<span class="blue">' + word + '</span>; ';
  });
  output2.innerHTML += '</ol><br>';

  output2.innerHTML += '<b>Missing Words:</b><ol>';
  redWords.forEach(function(word, index) {
    output2.innerHTML += (index + 1) + '.<span class="red">' + word + '</span>; ';
  });
  output2.innerHTML += '</ol><br>';

  output2.innerHTML += '<b>Extra Words:</b><ol>';
  orangeWords.forEach(function(word, index) {
    output2.innerHTML += (index + 1) + '.<span class="red orange">' + word + '</span>; ';
  });
  output2.innerHTML += '</ol><br>';
});


