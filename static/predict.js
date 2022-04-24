// $("#image-selector").change(function () {
//     let reader = new FileReader();
//     reader.onload = function () {
//         let dataURL = reader.result;
//         $('#selected-image').attr("src", dataURL);
//         $("#prediction-list").empty();
//     }
//     let file = $("#image-selector").prop('files')[0];
//     reader.readAsDataURL(file);
// });

// let model;
// (async function() {
//     model = await tf.loadLayersModel('http://localhost:81/tfjs-models/model/model.json');
//     $('.progress-bar').hide();
// })();

// $("#predict-button").click(async function () {
//     let image = $('#selected-image').get(0);
//     let tensor = tf.browser.fromPixels(image).toFloat().div(tf.scalar(255)).resizeBilinear([1024, 1024]).pad([[0, 0], [0, 0], [-1, -1]]).reshape([-1, 64, 64, 1]);

//     // let tensor_image = tensor.reshape([32, 32, 1]).reverse(2).expandDims();
//     // let tensor_image = tf.fromPixels(image).toFloat().div(255);
//     // console.log(tensor_image)

//     // let tensor = tensor_image.resizeBilinear([64, 64]).pad([[0, 0], [0, 0], [-1, -1]]).reshape([64, 64, 1]).reverse(2).expandDims();
//         // .resizeNearestNeighbor([64,64])
//         // .toFloat()
//         // .expandDims(0);
//     console.log(tensor)
//     let predictions = await model.predict(tensor).data();
//     console.log(predictions)
//     let top5 = Array.from(predictions)
//     .map(function (p, i) {
//         return {
//             probability: p,
//             className: IMAGE_CLASSES[i]
//         };}).slice(0, 38);
//     // }).sort(function(a, b) {
//     //     return b.probability - a.probability;
//     // }).slice(0, 28);

//     $("#prediction-list").empty();
//     top5.forEach(function (p) {
//         $('#prediction-list').append(`<li>${p.className}: ${p.probability}</li>`);
//     });
// });

// New One
const canvas = document.getElementById('main-canvas');
const smallCanvas = document.getElementById('small-canvas');
const smallMainCanvas = document.getElementById('small-main-canvas');
const displayBox = document.getElementById('prediction');

const inputBox = canvas.getContext('2d');
const smBox = smallCanvas.getContext('2d');
const smMBox = smallMainCanvas.getContext('2d');

let isDrawing = false;
let model;

/* Loads trained model */
async function init() {
  model = await tf.loadModel('http://localhost:3232/tfjs-models/model/model.json');
}


canvas.addEventListener('mousedown', event => {
  isDrawing = true;

  inputBox.strokeStyle = 'white';
  inputBox.lineWidth = '15';
  inputBox.lineJoin = inputBox.lineCap = 'round';
  inputBox.beginPath();
});

canvas.addEventListener('mousemove', event => {
  if (isDrawing) drawStroke(event.clientX, event.clientY);
});

canvas.addEventListener('mouseup', event => {
  isDrawing = false;
//   updateDisplay(predict());
});

/* Draws on canvas */
function drawStroke(clientX, clientY) {
  // get mouse coordinates on canvas
  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  // draw
  inputBox.lineTo(x, y);
  inputBox.stroke();
  inputBox.moveTo(x, y);
}

/* Makes predictions */
function predict() {
  let values = getPixelData(flipAndRotate());
  let predictions = model.predict(values).dataSync();

  return predictions;
}

/* Returns pixel data from canvas after applying transformations */
function getPixelData(imgData) {
//   smBox.drawImage(inputBox.canvas, 0, 0, smallCanvas.width, smallCanvas.height);
//   const imgData = smBox.getImageData(0, 0, smallCanvas.width, smallCanvas.height);
  

  // preserve and normalize values from red channel only
  let values = [];
  for (let i = 0; i < imgData.data.length; i += 4) {
    values.push(imgData.data[i] / 255);
  }
  values = tf.reshape(values, [1, 64, 64, 1]);
  return values;
}

/* Displays predictions on screen */
function updateDisplay() {
    smMBox.drawImage(inputBox.canvas, 0, 0, smallCanvas.width, smallCanvas.height);
    const imageData = smMBox.getImageData(0, 0, smallCanvas.width, smallCanvas.height);
  
  // Find index of best prediction, which corresponds to the predicted value
  predictions = predict()
  // console.log(predictions);
  const bestPred = predictions.indexOf(Math.max(...predictions));
  displayBox.innerText = bestPred;
  label.innerText = IMAGE_CLASSES[bestPred];
}

document.getElementById('erase').addEventListener('click', erase);
document.getElementById('predict').addEventListener('click', updateDisplay);

function flipAndRotate() {

    // smBox.save();
    // smBox.scale(-1, 1);
    // smBox.drawImage(inputBox.canvas, 0, 0, smallCanvas.width*-1, smallCanvas.height);
    // smBox.restore();
    smBox.save();
    smBox.translate(smallCanvas.width/2,smallCanvas.height/2);
    smBox.rotate(270*Math.PI/180);
    smBox.scale(-1, 1);
    smBox.drawImage(smMBox.canvas,-smallCanvas.width/2,-smallCanvas.height/2);
    smBox.restore();
    return smBox.getImageData(0, 0, smallCanvas.width, smallCanvas.height);
}

/* Clears canvas */
function erase() {
  inputBox.fillStyle = 'black';
  inputBox.fillRect(0, 0, canvas.width, canvas.height);
  displayBox.innerText = '';
  label.innerText = '';
}

function drawRotated(){
    smBox.clearRect(0,0,smallCanvas.width,smallCanvas.height);
    smBox.save();
    smBox.translate(smallCanvas.width/2,smallCanvas.height/2);
    smBox.rotate(-90*Math.PI/180);
    smBox.drawImage(image,-smallCanvas.width/2,-smallCanvas.height/2);
    smBox.restore();
}

  // inputBox.strokeStyle = 'white';
  // inputBox.lineWidth = '15';
  // inputBox.lineJoin = inputBox.lineCap = 'round';
  // inputBox.beginPath();
	var start = function(e) {
    isDrawing = true;


    inputBox.strokeStyle = 'white';
    inputBox.lineWidth = '15';
    inputBox.lineJoin = inputBox.lineCap = 'round';
		inputBox.beginPath();
		// x = e.changedTouches[0].pageX;
		// y = e.changedTouches[0].pageY-44;
    // console.log(x,y);
		// inputBox.moveTo(x,y);
	};
	var move = function(e) {
		e.preventDefault();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-44;
    // console.log(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    if (isDrawing) drawStroke(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
		// inputBox.lineTo(x,y);
		// inputBox.stroke();
	};

  var end = function(e) {
    isDrawing = false;
  };
  document.getElementById("main-canvas").addEventListener("touchstart", start, false);
	document.getElementById("main-canvas").addEventListener("touchmove", move, false);
  document.getElementById("main-canvas").addEventListener("touchend", end, false);

erase();
init();