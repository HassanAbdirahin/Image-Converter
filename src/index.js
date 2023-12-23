import './styles/style.css';
const uploadedPhoto = document.querySelector('#upload');
const output = document.querySelector('.output');
const outputImg = document.querySelector('#output-img');
const downBtn = document.querySelector('.download-btn');
const inputFile = document.querySelector('#input-file');
const uploadBtn = document.querySelector('label');

inputFile.onchange = function() {
    uploadedPhoto.src = URL.createObjectURL(inputFile.files[0]);

    output.style.display = 'flex';
    outputImg.src = uploadedPhoto.src;
    outputImg.style.filter = 'invert(100%)';
    downBtn.disabled = false;
    uploadBtn.textContent = 'Upload another';
};

downBtn.addEventListener('click', () => {
    // Create canvas to draw image with style(filter)
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas dimentions to match the image
    canvas.width = outputImg.width;
    canvas.height = outputImg.height;

    // Draw the image with the filter onto canvas
    context.filter = 'invert(100%)';
    context.drawImage(outputImg, 0, 0, canvas.width, canvas.height);

    // Create data URL for the canvas content
    const dataUrl = canvas.toDataURL('image/png');

    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = 'Output.png';

    // Trigger a click event on the anchor element
    downloadLink.click();

    // Clean up: remove the temporary elements
    document.body.removeChild(downloadLink);
    document.body.removeChild(canvas);
})