let bgImg;
let carrotImg, breadImg, milkImg, spinachImg, eggsImg;
let srirachaImg, containerImg, onionImg, onionStoredImg, waterImg, asparagusImg, asparagusStoredImg, carrotStoredImg, spinachStoredImg;
let cupboardImg, cabinetImg, jarlong1Img, jarlong2Img, shortjarImg;

let endHappyImg, endGameOverImg;
let showEnding = false;
let gameWon = false;

let canvas;
let dayCount = 1;
const timeScale = 4000;

let musicStarted = false;
let bgMusic;

// Asparagus interaction
let asparagusStored = false;
let jarUsed = false;
let jarX = 700, jarY = 180;
let draggingJar = false;

// Bread interaction
let breadStoredCorrectly = false;
let draggingBread = false;
let breadX = 350, breadY = 570;
const breadWidth = 300, breadHeight = 300;
const correctBreadX = 300, correctBreadY = 150;

// Carrot interaction
let carrotStored = false;
let jar2Used = false;
let draggingJar2 = false;
let jar2X = 800, jar2Y = 200;
let carrotX = 190, carrotY = 650;
const carrotW = 200, carrotH = 200;

// Onion interaction
let onionStored = false;
let draggingOnion = false;
let onionX = 450, onionY = 300;
const onionW = 100, onionH = 100;

// Sriracha interaction
let srirachaStored = false;
let draggingSriracha = false;
let srirachaX = 70, srirachaY = 180;
const srirachaW = 250, srirachaH = 250;
const srirachaTargetX = 670, srirachaTargetY = 650, srirachaTargetW = 200, srirachaTargetH = 200;

// Milk interaction
let milkStoredCorrectly = false;
let draggingMilk = false;
let milkX = 700, milkY = 650;
const milkW = 200, milkH = 200;
const correctMilkX = 350, correctMilkY = 570;

// Spinach interaction
let spinachStored = false;
let draggingSpinach = false;
let spinachX = 850, spinachY = 480;
const spinachW = 200, spinachH = 200;
const containerX = 200, containerY = 180, containerW = 300, containerH = 300;

let instructionImg;
let showPopup = true;
let timeStarted = false;

let snowGif;


function preload() {
  instructionImg = loadImage('instructions.png');
  bgImg = loadImage('bg.png');
  carrotImg = loadImage('Carrots.png');
  breadImg = loadImage('Bread.png');
  milkImg = loadImage('Milk.png');
  spinachImg = loadImage('Spinach.png');
  spinachStoredImg = loadImage('SpinachJarred.png');
  eggsImg = loadImage('Eggs.png');
  srirachaImg = loadImage('Sriracha.png');
  containerImg = loadImage('Container.png');
  onionImg = loadImage('Onion.png');
  onionStoredImg = loadImage('OnionStored.png');
  waterImg = loadImage('Water.png');
  asparagusImg = loadImage('Asparagus.png');
  asparagusStoredImg = loadImage('AsparagusStored.png');
  carrotStoredImg = loadImage('CarrotsStored.png');
  cupboardImg = loadImage('cupboard.png');
  cabinetImg = loadImage('Cabinet2.png');
  jarlong1Img = loadImage('Jarlong.png');
  jarlong2Img = loadImage('Jarlong.png');
  shortjarImg = loadImage('Jarshort.png');
  bgMusic = loadSound('bg-music.mp3');
  endHappyImg = loadImage('congratulations.png');
endGameOverImg = loadImage('gameover.png');

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  centerCanvas();
  tryPlayMusic();
  //updateClock();
snowGif = createImg('snow.gif');
snowGif.position(0, 0); // adjust as needed
snowGif.size(width, height); // adjust as needed
snowGif.style('z-index', '1');
snowGif.hide();
}


function startSimulatedTime() {
  setInterval(() => {
    dayCount++;
    updateClock();
  }, timeScale);
}

function updateClock() {
  const clockEl = document.getElementById('clock');
  if (clockEl) {
    clockEl.textContent = `Day ${dayCount}`;
  }
}
function draw() {
  image(bgImg, 0, 0, width, height);

  if (showPopup) {
    let popupW = width;
    let popupH = height;
    image(instructionImg, width / 2 - popupW / 2, height / 2 - popupH / 2, popupW, popupH);
    return;
  }

  if (!musicStarted) {
    textSize(16);
    fill(0, 100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    text('Click anywhere to enable audio', width / 2, height - 10);
  }

  
  // Spinach logic
  if (!spinachStored && dayCount < 5) {
    let spinachOverContainer = collideRectRect(spinachX, spinachY, spinachW, spinachH, containerX, containerY, containerW, containerH);
    if (spinachOverContainer && !draggingSpinach) {
      spinachStored = true;
    }
  }

  // Draw game items
  if (dayCount >= 1) {
    if (!carrotStored && dayCount < 5) image(carrotImg, carrotX, carrotY, carrotW, carrotH);
    else if (carrotStored) image(carrotStoredImg, 120, 600, 250, 250);

    if (!breadStoredCorrectly && dayCount < 4) image(breadImg, breadX, breadY, breadWidth, breadHeight);
    else if (breadStoredCorrectly) image(breadImg, correctBreadX, correctBreadY, breadWidth, breadHeight);

    if (!onionStored && dayCount < 3) image(onionImg, onionX, onionY, onionW, onionH);
    else if (onionStored) image(onionStoredImg, 900, 200, 200, 200);

    if (!milkStoredCorrectly && dayCount < 7) {
      let shakeX = 0, shakeY = 0;
      if (dayCount >= 6) {
        shakeX = random(-5, 5);
        shakeY = random(-5, 5);
      }
      image(milkImg, milkX + shakeX, milkY + shakeY, milkW, milkH);
    } else if (milkStoredCorrectly) {
      image(milkImg, correctMilkX, correctMilkY, 300, 300);
    }

    if (spinachStored) {
      image(spinachStoredImg, 200, 180, 300, 300);
    } else {
      image(containerImg, 200, 180, 300, 300);
    }

    image(eggsImg, 900, 530, 200, 200);
    image(waterImg, 800, 700, 300, 300);
    image(srirachaImg, srirachaX, srirachaY, srirachaW, srirachaH);
    if (!jar2Used) image(jarlong2Img, jar2X, jar2Y, 200, 200);
    image(shortjarImg, 900, 200, 200, 200);
  }

  if (dayCount < 5 && !asparagusStored) {
    push();
    translate(250, 700);
    rotate(radians(90));
    image(asparagusImg, 0, 0, 200, 200);
    pop();
  } else if (asparagusStored) {
    image(asparagusStoredImg, 20, 550, 300, 300);
  }

  if (!spinachStored && dayCount < 5) {
    image(spinachImg, spinachX, spinachY, spinachW, spinachH);
  }

  if (!jarUsed) image(jarlong1Img, jarX, jarY, 200, 200);

  // INTERACTIONS
  if (!asparagusStored && dayCount < 5) {
    let jarOverAsparagus = collideRectRect(jarX, jarY, 200, 200, 250, 700, 200, 200);
    if (jarOverAsparagus && !draggingJar) {
      asparagusStored = true;
      jarUsed = true;
    }
  }

  if (!carrotStored && dayCount < 5) {
    let jarOverCarrot = collideRectRect(jar2X, jar2Y, 200, 200, carrotX, carrotY, carrotW, carrotH);
    if (jarOverCarrot && !draggingJar2) {
      carrotStored = true;
      jar2Used = true;
    }
  }

  if (!onionStored && dayCount < 3) {
    let shortJarOverOnion = collideRectRect(900, 200, 200, 200, onionX, onionY, onionW, onionH);
    if (shortJarOverOnion) {
      onionStored = true;
    }
  }

  if (!srirachaStored) {
    let srirachaOverTarget = collideRectRect(srirachaX, srirachaY, srirachaW, srirachaH, srirachaTargetX, srirachaTargetY, srirachaTargetW, srirachaTargetH);
    if (srirachaOverTarget && !draggingSriracha) {
      srirachaStored = true;
    }
  }

if (showPopup) {
  // show instructions
  return;
}

// GAME STUFF here

// move these just before the ending popup!
image(cupboardImg, 670, height - 500, 500, 500);
image(cabinetImg, 0, 0, width, height);

// === ENDING CONDITION POPUP ===
if (dayCount >= 14 && !showEnding) {
  showEnding = true;

  // Check all tasks completed
  gameWon = (
    asparagusStored &&
    breadStoredCorrectly &&
    carrotStored &&
    onionStored &&
    milkStoredCorrectly &&
    srirachaStored &&
    spinachStored
  );
}

if (showEnding) {
  let imgToShow = gameWon ? endHappyImg : endGameOverImg;
  image(imgToShow, width / 2 - 400, height / 2 - 300, 800, 600);
}
snowGif.show();
}
function mousePressed() {
  if (showPopup) {
    showPopup = false;
    if (!timeStarted) {
      startSimulatedTime();  // ✅ Only starts now
      timeStarted = true;
    }
    return;
    }
  if (!musicStarted) tryPlayMusic();
  if (!jarUsed && mouseX > jarX && mouseX < jarX + 200 && mouseY > jarY && mouseY < jarY + 200) draggingJar = true;
  if (!jar2Used && mouseX > jar2X && mouseX < jar2X + 200 && mouseY > jar2Y && mouseY < jar2Y + 200) draggingJar2 = true;
  if (!breadStoredCorrectly && mouseX > breadX && mouseX < breadX + breadWidth && mouseY > breadY && mouseY < breadY + breadHeight) draggingBread = true;
  if (!onionStored && mouseX > onionX && mouseX < onionX + onionW && mouseY > onionY && mouseY < onionY + onionH) draggingOnion = true;
  if (!srirachaStored && mouseX > srirachaX && mouseX < srirachaX + srirachaW && mouseY > srirachaY && mouseY < srirachaY + srirachaH) draggingSriracha = true;
  if (!milkStoredCorrectly && mouseX > milkX && mouseX < milkX + milkW && mouseY > milkY && mouseY < milkY + milkH) draggingMilk = true;
  if (!spinachStored && mouseX > spinachX && mouseX < spinachX + spinachW && mouseY > spinachY && mouseY < spinachY + spinachH) {
    draggingSpinach = true;  
  }
  if (showEnding) {
    location.reload(); // Reloads the game
  }
  snowGif.hide();
  
}

function mouseDragged() {
  if (draggingJar) {
    jarX = mouseX - 100;
    jarY = mouseY - 100;
  }
  if (draggingJar2) {
    jar2X = mouseX - 100;
    jar2Y = mouseY - 100;
  }
  if (draggingBread) {
    breadX = mouseX - breadWidth / 2;
    breadY = mouseY - breadHeight / 2;
  }
  if (draggingOnion) {
    onionX = mouseX - onionW / 2;
    onionY = mouseY - onionH / 2;
  }
  if (draggingSriracha) {
    srirachaX = mouseX - srirachaW / 2;
    srirachaY = mouseY - srirachaH / 2;
  }
  if (draggingMilk) {
    milkX = mouseX - milkW / 2;
    milkY = mouseY - milkH / 2;
  }
  if (draggingSpinach) {
    spinachX = mouseX - spinachW / 2;
    spinachY = mouseY - spinachH / 2;
  }  
}

function mouseReleased() {
  draggingJar = false;
  draggingJar2 = false;
  draggingOnion = false;
  draggingSriracha = false;
  draggingSpinach = false;

  if (draggingBread) {
    let overCorrectShelf = collideRectRect(breadX, breadY, breadWidth, breadHeight, correctBreadX, correctBreadY, breadWidth, breadHeight);
    if (overCorrectShelf) breadStoredCorrectly = true;
  }
  draggingBread = false;

  if (draggingMilk) {
    if (!milkStoredCorrectly && milkX + milkW > correctMilkX && milkX < correctMilkX + 300 && milkY + milkH > correctMilkY && milkY < correctMilkY + 300) {
      milkStoredCorrectly = true;
    }
  }
  draggingMilk = false;
}

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function tryPlayMusic() {
  if (!musicStarted && bgMusic && bgMusic.isLoaded()) {
    bgMusic.loop();
    musicStarted = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerCanvas();
}

function collideRectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2;
}
