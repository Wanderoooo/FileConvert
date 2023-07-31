// Initialize pdfjsLib
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

let fileName;
let fileInput;
let fileExtension;
let submittedFile;

let failConvertWarning = document.getElementById('outputImages');
let downloadButton = document.getElementById('download');
let redoButton = document.getElementById('redo');
let canvas = document.getElementById('canvas');
let outputImagesDiv = document.getElementById('outputImages');

async function convertPDFToImage(pdfData) {
  try {
    const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
    const page = await pdfDoc.getPage(1);

    const viewport = page.getViewport({ scale: 1 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext('2d');
    await page.render({ canvasContext: context, viewport }).promise;

    const imageURL = canvas.toDataURL('image/png');
    const image = new Image();
    image.src = imageURL;

    return image;
  } catch (error) {
    console.error('Error converting PDF to image:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}


function getFileExtension() {
  fileName = fileInput.files[0].name;
  fileExtension = fileName.split('.').pop().toUpperCase();
}

async function tryConvert(event) {
  event.preventDefault();
  console.log('tryConvert called');
  fileInput = document.getElementById('fileInputer')

  let selectElement = document.getElementById('files');
  const convertToType = selectElement.options[selectElement.selectedIndex].text;

    submittedFile = fileInput.files[0];
    if (!submittedFile) {
      failConvertWarning.innerHTML = '<p>No file(s) were submitted, please try again</p>';
      return;
    }

  await getFileExtension();

  if (fileExtension == convertToType) {
    failConvertWarning.innerHTML = '<p>No conversion necessary, file already in requested format</p>';
  } else if (fileExtension == "PDF" && convertToType == "PNG") {
    // Read the PDF file using FileReader
    const reader = new FileReader();
    reader.onload = async (event) => {
      const pdfData = event.target.result;
      try {
        const image = await convertPDFToImage(pdfData);
        outputImagesDiv.innerHTML = ''; // Clear previous images
        outputImagesDiv.appendChild(image);
      } catch (error) {
        console.error('Error converting PDF to image:', error);
      }
    };
    reader.readAsDataURL(submittedFile);
  }
}