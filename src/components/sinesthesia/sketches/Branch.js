///////////////////////////////////////////////////////////
// Class that handles the branches ////////////////////////
///////////////////////////////////////////////////////////
export default class Branch {
  ///////////////////////////////////////////////////////////
  // Variable definitions ///////////////////////////////////
  // ///////////////////////////////////////////////////////////
  // let y;
  // let x;
  // float angleOffset;
  // float growth = 0;
  // float windForce = 0;
  // float blastForce = 0;
  // Branch branchA;
  // Branch branchB;
  // Branch parent;

  ///////////////////////////////////////////////////////////
  // Constructor ////////////////////////////////////////////
  ///////////////////////////////////////////////////////////
  constructor(parent, x, y, angleOffset, length, p) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    let angle;
    this.length;
    this.branchA = new Branch();
    this.branchB = new Branch();
    this.angleOffset;
    this.growth = 0;
    this.windForce = 0;
    this.blastForce = 0;

    if (parent != null) {
      angle = parent.angle + angleOffset;
      this.angleOffset = angleOffset;
    } else {
      angle = angleOffset;
      this.angleOffset = -0.2 + p.random(0.4);
    }
    this.length = length;
    let xB = x + p.sin(angle) * length;
    let yB = y + p.cos(angle) * length;
    if (length > 10) {
      if (length + p.random(length * 10) > 30)
        this.branchA = new Branch(
          this,
          xB,
          yB,
          -0.1 -
            p.random(0.4) +
            (angle % p.TWO_PI > p.PI ? -1 / length : +1 / length),
          length * (0.6 + p.random(0.3))
        );
      if (length + p.random(length * 10) > 30)
        this.branchB = new Branch(
          this,
          xB,
          yB,
          0.1 +
            p.random(0.4) +
            (angle % p.TWO_PI > p.PI ? -1 / length : +1 / length),
          length * (0.6 + p.random(0.3))
        );
      if (this.branchB != null && this.branchA == null) {
        this.branchA = this.branchB;
        this.branchB = null;
      }
    }
    minX = p.min(xB, minX);
    maxX = p.max(xB, maxX);
    minY = p.min(yB, minY);
    maxY = p.max(yB, maxY);
  }

  ///////////////////////////////////////////////////////////
  // Set scale //////////////////////////////////////////////
  ///////////////////////////////////////////////////////////
  setScale(scale) {
    this.length *= scale;
    if (this.branchA != null) {
      this.branchA.setScale(scale);
      if (this.branchB != null) this.branchB.setScale(scale);
    }
  }

  ///////////////////////////////////////////////////////////
  // Update /////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////
  update() {
    if (parent != null) {
      this.x = parent.x + p.sin(parent.angle) * parent.length * parent.growth;
      this.y = parent.y + p.cos(parent.angle) * parent.length * parent.growth;
      this.windForce =
        parent.windForce * (1.0 + 5.0 / length) + this.blastForce;
      this.blastForce =
        (this.blastForce + (p.sin(this.x / 2 + windAngle) * 0.005) / length) *
        0.98;
      this.angle =
        parent.angle + this.angleOffset + this.windForce + this.blastForce;
      this.growth = p.min(this.growth + 0.1 * parent.growth, 1);
    } else this.growth = p.min(this.growth + 0.1, 1);
    if (this.branchA != null) {
      this.branchA.update();
      if (this.branchB != null) this.branchB.update();
    }
  }

  ///////////////////////////////////////////////////////////
  // Render /////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////
  render() {
    if (this.branchA != null) {
      let xB = this.x;
      let yB = this.y;
      if (parent != null) {
        xB += (this.x - parent.x) * 0.4;
        yB += (this.y - parent.y) * 0.4;
      } else {
        xB += p.sin(this.angle + this.angleOffset) * length * 0.3;
        yB += p.cos(this.angle + this.angleOffset) * length * 0.3;
      }
      /* PROCESSING WAY (slow)
                  //stroke(floor(1100/length));
                  //strokeWeight(length/5);
                  //beginShape();
                  //vertex(x, y);
                  //bezierVertex(xB, yB, xB, yB, branchA.x, branchA.y);
                  //endShape();
                  */
      curContext.beginPath();
      curContext.moveTo(this.x, this.y);
      curContext.bezierCurveTo(xB, yB, xB, yB, this.branchA.x, this.branchA.y);
      let branchColor = p.floor(1100 / length);
      curContext.strokeStyle =
        "rgb(" + branchColor + "," + branchColor + "," + branchColor + ")";
      curContext.lineWidth = length / 5;
      curContext.stroke();
      this.branchA.render();
      if (this.branchB != null) this.branchB.render();
    } else {
      p.pushMatrix();
      p.translate(this.x, this.y);
      p.rotate(-this.angle);
      p.image(leaveImage, -leaveImage.width / 2, 0);
      p.popMatrix();
    }
  }
}
