var capture;
var canvas = document.getElementById("sketch-holder");
var isCocoSsdModelLoaded = false;
var cocoSsdModel;

function setup() {
    var p5canvas = createCanvas(960, 960);
    p5canvas.parent('sketch-holder');
    capture = createCapture(VIDEO);
    capture.hide();

    // Load the model.
    cocoSsd.load().then(_cocoSsdModel => {
        cocoSsdModel = _cocoSsdModel;
        isCocoSsdModelLoaded = true;
        console.log('model loaded');
    });

    noLoop();

    setInterval(function () { draw(); }, 100);
}

function draw() {
    // translate(width, 0);
    // scale(-1.0, 1.0);
    image(capture, 0, 0, width, width * capture.height / capture.width);

    if (cocoSsdModel) {
        cocoSsdModel.detect(canvas).then(predictions => {
            console.log(predictions);
            for(var i = 0; i < predictions.length; i++) {
                var prediciton = predictions[i];
                var bbox = prediciton.bbox;
                var leftX = bbox[0] / 2
                var topY = bbox[1] / 2
                var bottomY = (bbox[1] + bbox[3]) / 2
                var rightX =  (bbox[0] + bbox[2]) / 2
                stroke('rgb(0,255,0)');
                strokeWeight(4);
                line(leftX, topY, rightX, topY);
                // stroke('rgb(0,255,0)');
                // strokeWeight(4);
                line(leftX, bottomY, rightX, bottomY);
                // stroke('rgb(0,255,0)');
                // strokeWeight(4);
                line(leftX, topY, leftX, bottomY);
                // stroke('rgb(0,255,0)');
                // strokeWeight(4);
                line(rightX, topY, rightX, bottomY);
            }
            console.log('prediction done');
        });

    }
}