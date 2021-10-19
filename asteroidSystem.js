class AsteroidSystem {
  // creates arrays to store each asteroid's data
  constructor() {
    this.locations = [];
    this.velocities = [];
    this.accelerations = [];
    this.diams = [];
    this.score = 0;
  }

  // compilation of all method as it calls every method of this class
  run() {
    this.spawns();
    this.move();
    this.draw();
  }

  // spawns asteroid at random intervals
  spawns() {
    if (random(1) < 0.01) {
      // accelerates in y axis
      this.accelerations.push(new createVector(0, random(0.1, 1)));
      this.velocities.push(new createVector(0, 0));
      this.locations.push(new createVector(random(width), 0));
      this.diams.push(random(30, 50));
    }
  }

  // moves all asteroids
  move() {
    for (let i = 0; i < this.locations.length; i++) {
      this.velocities[i].add(this.accelerations[i]);
      this.locations[i].add(this.velocities[i]);
      this.accelerations[i].mult(0);
    }
  }

  // adding force
  applyForce(f) {
    for (let i = 0; i < this.locations.length; i++) {
      this.accelerations[i].add(f);
    }
  }

  // draws all asteroids
  draw() {
    noStroke();
    fill(200);
    for (let i = 0; i < this.locations.length; i++) {
      ellipse(this.locations[i].x, this.locations[i].y, this.diams[i], this.diams[i]);
    }
  }

  // functions that calculates effect of gravity on each asteroid and accelerates it
  calcGravity(centerOfMass) {
    for (let i = 0; i < this.locations.length; i++) {
      // subtract two vector
      let gravity = p5.Vector.sub(centerOfMass, this.locations[i]);
      gravity.normalize(); // make unit vector 
      gravity.mult(0.001); // multiply unit vector with 0.001
      this.applyForce(gravity); // add vector as force
    }
  }

  // destroys all data associated with each asteroid
  destroy(index) {
    this.locations.splice(index, 1);
    this.velocities.splice(index, 1);
    this.accelerations.splice(index, 1);
    this.diams.splice(index, 1);
    this.score++;
  }
}
