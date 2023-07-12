song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 350);
    canvas.position(385, 200);


    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResult);
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function gotResult(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist x=" + leftWristX + " and y=" + leftWristY);
        console.log("Right Wrist x=" + rightWristX + " and y=" + rightWristY);

    }
}

function draw() {
    image(video, 0, 0, 600, 350);

    fill('#000000');
    stroke('#0000FF');


    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);

        inNumberLeftWristY = Number(leftWristY);
        round = floor(inNumberLeftWristY);
        decimal_value = round / 500;
        volume = decimal_value;
        song.setVolume(volume)
        document.getElementById("volume").innerHTML = "Volume - " + volume;
    }
}

function play() {
    song.play();
    song.volume(1);
    song.setValue(1);
}