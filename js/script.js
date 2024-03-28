var text1 = document.getElementById("text1");
var text2 = document.getElementById("text2");
var diffWord = document.getElementById("diff-word");
var diffChar = document.getElementById("diff-char");
var output = document.getElementById("output");
var heading = document.querySelector('.container h1');
var resultsHeading = document.createElement('h2');
//var infoLine = document.querySelector('.container p');
var container = document.querySelector('.container');
var calButton = document.getElementById('cal');
var calculationContainer = document.getElementById('calculation-container');
var calculationOutput = document.getElementById('calculation-output');
var fullMistakesInput = document.getElementById('full-mistakes');
var halfMistakesInput = document.getElementById('half-mistakes');
var totalWordsInput = document.getElementById('total-words');
var calculateButton = document.getElementById('calculate-errors');
let timerInterval;
let timeLeft = 600;
let timerStarted = false;
let currentFontSize = 16;
const ttBtn = document.getElementById('tt-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');


resultsHeading.textContent = 'Results';
resultsHeading.style.display = 'none';
container.insertBefore(resultsHeading, container.firstChild);


fullscreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
        // Exit full-screen mode
        document.exitFullscreen();
    } else {
        // Enter full-screen mode
        document.documentElement.requestFullscreen();
    }
}); 

function startTimer() {
    if (!timerStarted) {
        timerInterval = setInterval(updateTimer, 1000);
        timerStarted = true;
    }
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft === 0) {
        clearInterval(timerInterval);
        alert("Time's up!");
    } else {
        timeLeft--;
    }
}

function parseTimeToSeconds(timeString) {
    const [minutes, seconds] = timeString.split(':').map(parseFloat);
    return minutes * 60 + seconds;
}

function countWords(text) {
  var words = text.split(/\s+/);
  return words.filter(function(word) {
    return word.length > 0;
  }).length;
}

function rearrangeLayout() {
  resultsHeading.style.display = 'block';
  output.style.display = 'block';
  heading.style.display = 'none';
  //infoLine.style.display = 'none';
  text1.style.width = 'calc(100%)';
  text1.style.height = '14rem';
  //text1.style.marginRight = '2rem';
  text2.style.width = 'calc(100%)';
  text2.style.height = '14rem';
  //text2.style.marginLeft = '2rem';
  document.getElementById('calculator').style.display = 'block';
  calButton.style.display = 'block';
  document.getElementById('calculation-container').style.display = 'none';
  document.getElementById('text-selector').style.display = 'none';
  document.querySelector('.text-container label').style.display = 'none';
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

document.getElementById('text2').addEventListener('input', startTimer);

diffWord.addEventListener("click", function() {
  rearrangeLayout();
  var text1Value = text1.value;
  var text2Value = text2.value;
  var changes = Diff.diffWords(text2Value, text1Value);
  var diffOutput = Diff.convertChangesToXML(changes);
  var countWordsResult = countWords(text1Value);

  output.innerHTML = `<b>Total Words </b>: ${countWordsResult}<br><br>${diffOutput}`;
});

diffChar.addEventListener("click", function() {
  rearrangeLayout();
  var text1Value = text1.value;
  var text2Value = text2.value;
  var changes = Diff.diffChars(text2Value, text1Value);
  var diffOutput = Diff.convertChangesToXML(changes);
  var charCount = text1Value.length;
  output.innerHTML = `<b>Total Characters </b>: ${charCount}<br><br>${diffOutput}`;
});

document.getElementById('reset-btn').addEventListener('click', function() {
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

    document.getElementById('text1').style.fontSize = currentFontSize + 'px';
    document.getElementById('text2').style.fontSize = currentFontSize + 'px';
});

document.getElementById('text-selector').addEventListener('change', function() {
  var selectedFileName = this.value;
  var selectedFileUrl = providedTexts[selectedFileName];
  if (selectedFileUrl) {
    
    loadTextFile(selectedFileUrl)
      .then(content => {
        // Populate text1 with the content of the text file
        document.getElementById('text1').value = content;
      });
  } else {
    document.getElementById('text1').value = ''; 
  }
});

document.getElementById('timer').addEventListener('click', function() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
});

document.getElementById('apply-btn').addEventListener('click', function() {
    const newTime = document.getElementById('timer-input').value;
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = `Time: ${newTime}`;
    timeLeft = parseTimeToSeconds(newTime); // Update timeLeft with new value
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
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

calButton.addEventListener('click', function() {
  calculationContainer.style.display = 'block';
  calButton.style.display = 'none';
});

calculateButton.addEventListener('click', function() {
  var fullMistakes = parseInt(fullMistakesInput.value);
  var halfMistakes = parseInt(halfMistakesInput.value);
  var totalWords = parseInt(totalWordsInput.value);

  if (!isNaN(fullMistakes) && !isNaN(halfMistakes) && !isNaN(totalWords)) {
    var errorsPercentage = ((fullMistakes + (halfMistakes / 2)) / totalWords) * 100;
    calculationOutput.textContent = 'Errors Percentage: ' + errorsPercentage.toFixed(2) + '%';
  } else {
    calculationOutput.textContent = 'Invalid input!';
  }
});
