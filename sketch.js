sketch.js


/// 1. SELL-SIDE

let t = 0;
let duration = 5; // duração total (ida e volta) em segundos
let baseRadius = 140;

function setup() {
  createCanvas(300, 300);
  strokeWeight(1.2);
  noFill();
}

function draw() {
  background(20);
  translate(width / 2, height / 2);

  // tempo "vai e volta" usando seno
  let totalFrames = duration * 60;
  let progress = frameCount % totalFrames;
  let normalizedTime = progress / (totalFrames / 2);
  if (normalizedTime > 1) {
    normalizedTime = 2 - normalizedTime; // reverso
  }

  let easedT = easeInOutCubic(normalizedTime);

  let minRadius = baseRadius * 0.6;
  let maxOffset = 40;

  let r1 = lerp(baseRadius, 0, easedT);
  let r2 = minRadius;
  let offset = lerp(0, maxOffset, easedT);

  let alpha1 = map(easedT, 0, 0.6, 255, 0);
  alpha1 = constrain(alpha1, 0, 255);

  let alpha2 = map(easedT, 0.4, 1, 0, 255);
  alpha2 = constrain(alpha2, 0, 255);

  if (alpha1 > 0) {
    stroke(255, alpha1);
    ellipse(0, 0, r1 * 2);
  }

  if (alpha2 > 0) {
    stroke(255, alpha2);
    ellipse(-offset, 0, r2 * 2);
    ellipse(offset, 0, r2 * 2);
  }
}

function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - pow(-2 * t + 2, 3) / 2;
}
