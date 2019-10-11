let capture;
let cocoSsdModel;
let loadingImage;

var canvas = document.getElementById("sketch-holder");

function setup() {
    const p5canvas = createCanvas(680, 480);
    p5canvas.parent('sketch-holder');
    capture = createCapture(VIDEO);
    capture.hide();

    // Load the model.
    cocoSsd.load().then(_cocoSsdModel => {
        cocoSsdModel = _cocoSsdModel;
    });

    frameRate(10);

    loadingImage = loadImage('img/loading.gif');
}

function draw() {
    if (!cocoSsdModel) {
        // Show a loading frame when model is still loading
        textSize(48);
        textAlign(CENTER, CENTER);
        text('LOADING', 0, 0, width, height);
    } else {
        image(capture, 0, 0, width, width * capture.height / capture.width);
        cocoSsdModel.detect(canvas).then(predictions => {
            for (let i = 0; i < predictions.length; i++) {
                let prediciton = predictions[i];
                let bbox = prediciton.bbox;
                let leftX = bbox[0] / 2
                let topY = bbox[1] / 2
                let bottomY = (bbox[1] + bbox[3]) / 2
                let rightX = (bbox[0] + bbox[2]) / 2
                stroke('green');
                strokeWeight(4);
                line(leftX, topY, rightX, topY);
                line(leftX, bottomY, rightX, bottomY);
                line(leftX, topY, leftX, bottomY);
                line(rightX, topY, rightX, bottomY);
                textAlign(LEFT, TOP);
                textSize(18);
                fill(0);
                text(prediciton.class, leftX, topY, 120, 40);
            }
        });
    }
}