var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

// write the setup function for initiating canvas
function setup() {
  createCanvas(1200, 800);
  spaceship = new Spaceship(); // creating instance of the Spaceship() constructor
  asteroids = new AsteroidSystem();

  // location and size of the earth and it's atmosphere
  atmosphereLoc = new createVector(width / 2, height * 2.9);
  atmosphereSize = new createVector(width * 3, width * 3);
  earthLoc = new createVector(width / 2, height * 3.1);
  earthSize = new createVector(width * 3, width * 3);

  lives = 3;
}

// draw function for drawing elements in the canvas
function draw() {
  background(0);
  sky(); // calling sky() for drawing sky
  spaceship.run();
  asteroids.run();
  drawEarth(); // calling drawEarth() for drawing the earth

  checkCollisions(spaceship, asteroids);

  score();
}


// draws earth and atmosphere
function drawEarth() {
  noStroke();
  // draw atmosphere
  fill(0, 0, 255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x, atmosphereSize.y);
  // draw earth
  fill(100, 255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);

  // image(live_icon, earthLoc.x, earthLoc.y);
}

// check collisions between all types of bodies
function checkCollisions(spaceship, asteroids) {
  // spaceship to asteroid collisions
  for (let i = 0; i < asteroids.locations.length; i++) {
    if (isInside(spaceship.location, spaceship.size, asteroids.locations[i], asteroids.diams[i])) {
      gameOver();
    }
  }

  // asteroid - 2 - earth collision
  for (let i = 0; i < asteroids.locations.length; i++) {
    if (isInside(earthLoc, earthSize.x, asteroids.locations[i], asteroids.diams[i])) {
      gameOver();
    }
  }

  // spaceship-2-earth collision
  if (isInside(spaceship.location, spaceship.size, earthLoc, earthSize.x)) {
    gameOver();
  }

  // spaceship-2-atmosphere collision
  if (isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize.x)) {
    spaceship.setNearEarth();
  }

  // bullet collisions 
  for (let i = 0; i < asteroids.locations.length; i++) {
    for (let j = 0; j < spaceship.bulletSys.bullets.length; j++) {
      if (isInside(spaceship.bulletSys.bullets[j], spaceship.bulletSys.diam, asteroids.locations[i], asteroids.diams[i])) {
        asteroids.destroy(i);
        break;
      }
    }
  }
}

// helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB) {
  // calculating the distance between two points
  var d = dist(locA.x, locA.y, locB.x, locB.y);
  // checking whether the calculated distance is less than the addition of two radius
  if (d < (sizeA / 2 + sizeB / 2)) {
    return true;
  } else {
    return false;
  }
} // ---- STEP 4 ----


// firing from spaceship
function keyPressed() {
  if (keyIsPressed && keyCode === 32) {
    spaceship.fire();
  }
}


// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver() {
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2);
  noLoop();
}


// function that creates a star lit sky
function sky() {
  push();
  // push stars which is located in random positions in the starLocs 
  // array until the total number of star is less than 300
  while (starLocs.length < 300) {
    starLocs.push(new createVector(random(width), random(height)));
  }

  // drawing the stars
  fill(255);
  for (let i = 0; i < starLocs.length; i++) {
    rect(starLocs[i].x, starLocs[i].y, 2, 2);
  }

  // removing the stars
  if (random(1) < 0.3) {  // if a random number is less than 0.3
    starLocs.splice(int(random(starLocs.length)), 1); // remove 1 star from the array of stars
  }
}

// function that keeps score of how many asteroids have been hit
function score() {
  fill(255);
  textSize(30);
  textAlign(CENTER);
  text("Score: " + asteroids.score, width / 2, height - 20);
}