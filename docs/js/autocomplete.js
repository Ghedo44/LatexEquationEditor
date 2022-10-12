
// Code By Webdevtrick ( https://webdevtrick.com )
// console.clear();

const textInputEl = document.querySelector("#latex_editor");
const suggestionEl = document.querySelector(".suggestion-container");

const ENTER_KEYCODE = 13;
const TAB_KEYCODE = 9;
const BACKSPACE_KEYCODE = 8;
const UP_ARROW_KEYCODE = 38;
const DOWN_ARROW_KEYCODE = 40;
const SPACE_KEYCODE = 32;
const LEFT_ARROW_KEYCODE = 37;
const RIGHT_ARROW_KEYCODE = 39;


let suggestedWord = "";
let suggestedWordsArray = [];
let currentWordIndex = 0;
let insertText = false;


textInputEl.addEventListener("input", e => {
	if (e.data != " ") {
		insertText = true;
	}
	if (insertText == false) {
		textInputEl.value = "";
	}

	let caretPosition = e.target.selectionStart;
	let inputValue = e.target.value.substring(e.target.value.lastIndexOf('\\', caretPosition), caretPosition);
	
	suggestedWordsArray = filterArray(latexCodes, inputValue);
	if (suggestedWordsArray.length>0) suggestedWord = latexCodes[suggestedWordsArray[0]]+latexCodes[suggestedWordsArray[0]+1];

	if (suggestedWord != undefined) {
		suggestionEl.innerHTML = suggestedWord;
	}

	if (inputValue.length == 0 || suggestedWordsArray.length == 0) {
		suggestionEl.innerHTML = "";
	}

	if (textInputEl.value.length == 0) {
		insertText = false;
      	suggestionEl.innerHTML = "";

		suggestedWord = "";
		suggestedWordsArray = [];
		currentWordIndex = 0;
	}
});

textInputEl.addEventListener("keydown", e => {

   if (textInputEl.value.length == 0) {
      suggestionEl.innerHTML = "";
   }

	if (textInputEl.value.length != 0) {
		if (e.keyCode == UP_ARROW_KEYCODE) {
			e.preventDefault();
			if (currentWordIndex == 0) return;
			currentWordIndex--;
			suggestionEl.innerHTML = latexCodes[suggestedWordsArray[currentWordIndex]]+latexCodes[suggestedWordsArray[currentWordIndex]+1]; //suggestedWordsArray[currentWordIndex];
		}

		if (e.keyCode == DOWN_ARROW_KEYCODE) {
			e.preventDefault();
			if (currentWordIndex == suggestedWordsArray.length - 1 || suggestedWordsArray.length == 0) return;
			currentWordIndex++;
			suggestionEl.innerHTML = latexCodes[suggestedWordsArray[currentWordIndex]]+latexCodes[suggestedWordsArray[currentWordIndex]+1]; //suggestedWordsArray[currentWordIndex];
		}
	}

	
	if (e.keyCode == TAB_KEYCODE) {
		e.preventDefault();
		if (suggestedWord != undefined && suggestedWord != "") {
			let caretPosition = e.target.selectionStart;
			let inputValue = e.target.value.substring(e.target.value.lastIndexOf('\\', caretPosition), caretPosition);

			let text = textInputEl.value
			let textBeforeCaret = text.slice(0, caretPosition - inputValue.length);
			let textAfterCaret = text.slice(caretPosition);
			
			textInputEl.setRangeText(`${textBeforeCaret}${textAfterCaret}`, 0, text.length, 'start');
        	textInputEl.selectionStart = textBeforeCaret.length;

			applyLatex(suggestedWordsArray[currentWordIndex])
			suggestionEl.innerHTML = "";
         	renderEquation(editor.value);

			 suggestedWord = "";
			 suggestedWordsArray = [];
			 currentWordIndex = 0;
		}
	}
});


function filterArray(array, item) {

	return array.reduce(function(acc, curr, index) {
		if (compareTwoStrings(curr, item)) {
		  acc.push(index);
		}
		return acc;
	  }, []);
	  
}

function compareTwoStrings(string, subString) {
	let temp = string.split("", subString.length).join("");
	if (subString == temp) return true;
}
