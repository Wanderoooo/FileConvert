document.addEventListener('DOMContentLoaded', () => {

let submitButton = document.getElementById('subButton');

let fileName;
let fileInput;
let fileExtension;

let resultImg = document.getElementById('converted');

let downloadButton = document.getElementById('download');

let redoButton = document.getElementById('redo');


submitButton.addEventListener('click', tryConvert());



function tryConvert() {
  getFileExtension();

  const selectElement = document.getElementById('files');
  const convertToType = selectElement.value;

  if (fileExtension == convertToType) {
    resultImg.innerHTML("No conversion necessary, file already in requested format");
  } else if (convertToType == PDF) {
    
  }
}



function getFileExtension() {
fileInput = document.getElementById('fileInputer');

fileName = fileInput.files[0].name;

fileExtension = fileName.split('.').pop().toUpperCase();

}

})

