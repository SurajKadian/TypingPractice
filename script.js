var text1 = document.getElementById("text1");
var text2 = document.getElementById("text2");
var diffLine = document.getElementById("diff-line");
var diffWord = document.getElementById("diff-word");
var diffChar = document.getElementById("diff-char");
var output = document.getElementById("output");

function countWords(text) {
    var words = text.split(/\s+/);
    return words.filter(function (word) {
        return word.length > 0;
    }).length;
}

diffLine.addEventListener("click", function () {
    rearrangeLayout();
    var text1Value = text1.value;
    var text2Value = text2.value;
    var changes = Diff.diffLines(text1Value, text2Value);
    var diffOutput = Diff.convertChangesToXML(changes);
    var lineCount = text1Value.split(/\r\n|\r|\n/).length;

    output.innerHTML = `<b>Total Lines </b>: ${lineCount}<br><br>${diffOutput}`;
});

diffWord.addEventListener("click", function () {
    rearrangeLayout();
    var text1Value = text1.value;
    var text2Value = text2.value;
    var changes = Diff.diffWords(text1Value, text2Value);
    var diffOutput = Diff.convertChangesToXML(changes);
    var countWordsResult = countWords(text1Value);

    output.innerHTML = `<b>Total Words </b>: ${countWordsResult}<br><br>${diffOutput}`;
});

diffChar.addEventListener("click", function () {
    rearrangeLayout();
    var text1Value = text1.value;
    var text2Value = text2.value;
    var changes = Diff.diffChars(text1Value, text2Value);
    var diffOutput = Diff.convertChangesToXML(changes);
    var charCount = text1Value.length;

    output.innerHTML = `<b>Total Characters </b>: ${charCount}<br><br>${diffOutput}`;
});

document.getElementById('reset-btn').addEventListener('click', function () {
    document.getElementById('text1').value = '';
    document.getElementById('text2').value = '';
    document.getElementById('output').innerHTML = '';
    resetLayout();
});

function resetLayout() {
    output.style.display = 'none';
    text1.style.width = '100%';
    text2.style.width = '100%';
}

function rearrangeLayout() {
    output.style.display = 'block';
    text1.style.width = 'calc(50% - 16px)';
    text2.style.width = 'calc(50% - 16px)';
}

function applySimpleFont() {
    text1.style.fontWeight = 'normal';
    text2.style.fontWeight = 'normal';
}

function applyBoldFont() {
    text1.style.fontWeight = 'bold';
    text2.style.fontWeight = 'bold';
}

text1.addEventListener('focus', function () {
    applyBoldFont();
});

text2.addEventListener('focus', function () {
    applyBoldFont();
});

text1.addEventListener('blur', function () {
    applySimpleFont();
});

text2.addEventListener('blur', function () {
    applySimpleFont();
});
