var text1 = document.getElementById("text1");
var text2 = document.getElementById("text2");
var diffLine = document.getElementById("diff-line");
var diffWord = document.getElementById("diff-word");
var diffChar = document.getElementById("diff-char");
var output = document.getElementById("output");
var heading = document.querySelector('.container h1');
//var infoLine = document.querySelector('.container p');
var resultsHeading = document.createElement('h2');

resultsHeading.textContent = 'Results';
resultsHeading.style.display = 'none';
var container = document.querySelector('.container');
container.insertBefore(resultsHeading, container.firstChild);


function countWords(text) {
  var words = text.split(/\s+/);
  return words.filter(function(word) {
    return word.length > 0;
  }).length;
}

diffLine.addEventListener("click", function() {
  rearrangeLayout();
  var text1Value = text1.value;
  var text2Value = text2.value;
  var changes = Diff.diffLines(text1Value, text2Value);
  var diffOutput = Diff.convertChangesToXML(changes);
  var lineCount = text1Value.split(/\r\n|\r|\n/).length;

  output.innerHTML = `<b>Total Lines </b>: ${lineCount}<br><br>${diffOutput}`;
});

diffWord.addEventListener("click", function() {
  rearrangeLayout();
  var text1Value = text1.value;
  var text2Value = text2.value;
  var changes = Diff.diffWords(text1Value, text2Value);
  var diffOutput = Diff.convertChangesToXML(changes);
  var countWordsResult = countWords(text1Value);

  output.innerHTML = `<b>Total Words </b>: ${countWordsResult}<br><br>${diffOutput}`;
});

diffChar.addEventListener("click", function() {
  rearrangeLayout();
  var text1Value = text1.value;
  var text2Value = text2.value;
  var changes = Diff.diffChars(text1Value, text2Value);
  var diffOutput = Diff.convertChangesToXML(changes);
  var charCount = text1Value.length;

  output.innerHTML = `<b>Total Characters </b>: ${charCount}<br><br>${diffOutput}`;
});

document.getElementById('reset-btn').addEventListener('click', function() {
  document.getElementById('text1').value = '';
  document.getElementById('text2').value = '';
  document.getElementById('output').innerHTML = '';
  resetLayout();
});

function resetLayout() {
  output.style.display = 'none';
  text1.style.width = '100%';
  text1.style.height = '18rem';
  text1.style.marginRight = '0';
  text2.style.width = '100%';
  text2.style.height = '18rem';
  text2.style.marginLeft = '0';
  //infoLine.style.display = 'none';
  heading.style.display = 'block';
  resultsHeading.style.display = 'none';
  document.getElementById('text-selector').style.display = 'block';
  document.querySelector('.text-container label').style.display = 'block';
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
  document.getElementById('text-selector').style.display = 'none';
  document.querySelector('.text-container label').style.display = 'none';
}

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
  '27': 'text/CapitalisationPractice.txt'
};

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

for (var fileName in providedTexts) {
  var option = document.createElement('option');
  option.value = fileName; // Use file name as value
  option.textContent = providedTexts[fileName].split('/').pop().split('.').slice(0, -1).join('.'); 
  document.getElementById('text-selector').appendChild(option);
}
