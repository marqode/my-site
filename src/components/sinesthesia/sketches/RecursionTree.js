import React from "react";
import PropTypes from "prop-types";
import p5 from "p5";
// import PropTypes from "prop-types";
// import DoublePendulum from "./doublePendulum";

class RecursionTree extends React.Component {
  constructor(props) {
    super(props);
    this.delta = false;
    this.myRef = React.createRef();
  }
  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      this.delta = true;
    }
  }

  sketch = (p) => {
    ///////////////////////////////////////////////////////////
    // Variable definitions ///////////////////////////////////
    ///////////////////////////////////////////////////////////
    let tree; //= new Branch();
    let windAngle = 0;
    let minX;
    let maxX;
    let minY;
    let maxY;
    let blinkUpdate;
    let typedText;
    let lastSeed;
    let leaveImage;
    let curContext; // Javascript drawing context (for faster rendering)

    ///////////////////////////////////////////////////////////
    // Init ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    p.setup = () => {
      p.createCanvas(600, 600, p.P2D); // Set screen size & renderer
      //   p.textFont(p.createFont("Verdana", 24, true), 24); // Create font
      let back = p.createGraphics(p.width, p.height, p.P2D);
      leaveImage = createLeaveImage();
      createNewTree("OpenProcessing");
      curContext = p.externals.context; // Get javascript drawing context
    };

    ///////////////////////////////////////////////////////////
    // Return a random string /////////////////////////////////
    ///////////////////////////////////////////////////////////
    function getRandomSeed() {
      p.randomSeed(p.millis());
      return (p.random(9999999) + p.random(999999) + p.random(99999)).toString(
        36
      );
    }

    ///////////////////////////////////////////////////////////
    // Create leave image /////////////////////////////////////
    ///////////////////////////////////////////////////////////
    function createLeaveImage() {
      let buffer = p.createGraphics(12, 18, p.P2D);
      //   buffer.beginDraw();
      buffer.background("#000000");
      buffer.stroke("#5d6800");
      buffer.line(6, 0, 6, 6);
      buffer.noStroke();
      buffer.fill("#749600");
      buffer.beginShape();
      buffer.vertex(6, 6);
      buffer.bezierVertex(0, 12, 0, 12, 6, 18);
      buffer.bezierVertex(12, 12, 12, 12, 6, 6);
      buffer.endShape();
      buffer.fill("#8bb800");
      buffer.beginShape();
      buffer.vertex(6, 9);
      buffer.bezierVertex(0, 13, 0, 13, 6, 18);
      buffer.bezierVertex(12, 13, 12, 13, 6, 9);
      buffer.endShape();
      buffer.stroke("#659000");
      buffer.noFill();
      buffer.bezier(6, 9, 5, 11, 5, 12, 6, 15);
      //   buffer.endDraw();
      return buffer.get();
    }

    ///////////////////////////////////////////////////////////
    // Create new tree ////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    function createNewTree(seed) {
      lastSeed = seed;
      p.randomSeed(420); // Set seed
      minX = p.width / 2;
      maxX = p.width / 2;
      minY = p.height;
      maxY = p.height;
      tree = new Branch(null, p.width / 2, p.height, p.PI, 110);
      let xSize = maxX - minX;
      let ySize = maxY - minY;
      let scale = 1;
      if (xSize > ySize) {
        if (xSize > 500) scale = 500 / xSize;
      } else {
        if (ySize > 500) scale = 500 / ySize;
      }
      tree.setScale(scale);
      tree.x = p.width / 2 - (xSize / 2) * scale + (tree.x - minX) * scale;
      tree.y = p.height / 2 + (ySize / 2) * scale + (tree.y - maxY) * scale;
      blinkUpdate = -1; // Set/reset variables
      typedText = "";
    }

    ///////////////////////////////////////////////////////////
    // Render /////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    p.draw = () => {
      p.background("#d7d7d7");
      p.fill("#009cff");
      p.noStroke();
      p.rect(120, 120, p.width - 240, p.height - 240);
      p.noFill();
      windAngle += 0.003;
      tree.windForce = p.sin(windAngle) * 0.02;
      tree.update();
      tree.render();
      p.fill("#d7d7d7");
      p.noStroke();
      p.rect(tree.x - 80, p.height - 120, 160, 120);
      p.fill("#a0a0a0");
      //   p.text(
      //     lastSeed,
      //     floor(width / 2 - textWidth(lastSeed) / 2),
      //     floor(height - 40 + textAscent() / 2)
      //   );
      if (blinkUpdate > -1) {
        // Render text input
        p.rect(
          0,
          p.floor(32 - p.textAscent() / 2),
          p.width,
          p.floor(p.textAscent() + 16)
        );
        p.fill("#d7d7d7");
        // p.text(
        //   typedText + ((millis() - blinkUpdate) % 800 < 400 ? "|" : ""),
        //   floor(width / 2 - textWidth(typedText) / 2),
        //   floor(40 + textAscent() / 2)
        // );
      }
    };

    ///////////////////////////////////////////////////////////
    // Compute text input /////////////////////////////////////
    ///////////////////////////////////////////////////////////
    p.keyReleased = () => {
      blinkUpdate = p.millis();
      if (p.key != p.CODED) {
        // Compute ASCII key input
        switch (p.key) {
          case p.BACKSPACE:
          case p.DELETE:
            typedText = typedText.substring(
              0,
              p.max(0, typedText.length() - 1)
            );
            break;
          case p.TAB:
            typedText += "   ";
            break;
          case p.ENTER:
          case p.RETURN:
            createNewTree(typedText);
            break;
          default:
            typedText += p.key > 31 ? String.fromCharCode(p.key) : "";
        }
      }
      switch (
        p.keyCode // Compute Non-ASCII key input
      ) {
        case 127: // Workaround: If BACKSPACE/DELETE do not work on your browser
          typedText = typedText.substring(0, p.max(0, typedText.length() - 2));
          break;
        case 17: // Workaround: If RETURN/ENTER do not work on your browser
          createNewTree(typedText);
          break;
        case 18: // Save tree
          if (typedText.length() == 0) {
            p.saveFrame("YourTree.png");
            blinkUpdate = -1;
          }
      }
    };

    ///////////////////////////////////////////////////////////
    // Create new random tree /////////////////////////////////
    ///////////////////////////////////////////////////////////
    p.mouseClicked = () => {
      createNewTree(getRandomSeed());
    };

    ///////////////////////////////////////////////////////////
    // Class that handles the branches ////////////////////////
    ///////////////////////////////////////////////////////////
    class Branch {
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
      constructor(parent, x, y, angleOffset, length) {
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
          this.x =
            parent.x + p.sin(parent.angle) * parent.length * parent.growth;
          this.y =
            parent.y + p.cos(parent.angle) * parent.length * parent.growth;
          this.windForce =
            parent.windForce * (1.0 + 5.0 / length) + this.blastForce;
          this.blastForce =
            (this.blastForce +
              (p.sin(this.x / 2 + windAngle) * 0.005) / length) *
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
          curContext.bezierCurveTo(
            xB,
            yB,
            xB,
            yB,
            this.branchA.x,
            this.branchA.y
          );
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
  };

  componentDidMount() {
    this.myP5 = new p5(this.sketch, this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

RecursionTree.propTypes = {
  params: PropTypes.object,
  bg: PropTypes.array,
  speed: PropTypes.number,
  colorMode: PropTypes.string,
};

export default RecursionTree;
