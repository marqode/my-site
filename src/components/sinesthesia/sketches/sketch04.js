import React from "react";
import PropTypes from "prop-types";
import p5 from "p5";
// import PropTypes from "prop-types";
import DoublePendulum from "./doublePendulum";

class Sketch04 extends React.Component {
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
    //For colors
    // let r = 1;
    // let g = 1;
    // let b = 1;
    // let r_value = 0;
    // let g_value = 0;
    // let b_value = 0;
    // let white = p.color(255, 255, 255, 5);
    let black = p.color(215, 100, 3, 95);
    // let brown = p.color(112, 61, 0, 35);
    // let pink = p.color(255, 192, 203);  // rgb
    let pink = p.color(309, 100, 25, 5);
    let sat = 80;
    const dt = 0.000095; // change this based on props

    //Initialize pendulums
    let pendulum;
    let pupil_pendulum;
    // let pendulum = new DoublePendulum();
    // let pendulum2 = new DoublePendulum();
    // let pupil_pendulum = new DoublePendulum();

    p.setup = () => {
      // get canvas size from props
      p.createCanvas(800, 800, p.WEBGL);
      p.smooth(8);
      p.frameRate(this.props.params.speed);
      init(30, 10);
      if (this.props.params.colorMode === "HSB") p.colorMode(p.HSB);
      else p.colorMode(p.RGB);
      // p.colorMode(p.HSB);
      if (this.props.bg) {
        // drawGradient(this.props.bg);
        p.background(this.props.bg);
      }
    };

    function showCoor() {
      console.log(p.mouseX + ", " + p.mouseY);
    }

    function drawGradient(bg) {
      console.log("draw gradient");
      let radius = p.width;
      let h = bg[0]; //p.random(0, 360);
      for (let r = radius; r > 0; --r) {
        p.fill(h, bg[1], bg[2]);
        p.ellipse(p.width / 2, p.height / 2, r, r);
        h = (h + 1) % 360;
      }
    }

    // p.draw = () => {
    //   p.background(0);
    //   p.fill(0, 250, 100);
    //   p.rect(p.width / 2, p.height / 2, 50, 50);
    // };
    p.draw = () => {
      if (this.delta) {
        p.frameRate(this.props.params.speed);
        this.delta = false;
      }
      if (p.frameCount % 10 == 0) {
        showCoor();
      }

      // p.fill(255, 0, 0);
      // p.ellipse(50, 50, 100, 100);
      for (let i = 0; i < 50; i++) {
        //Include as many pendulums as you want
        // pendulum.draw(pendulum.update(p), pendulum.update(p), p);
        sat = p.noise(this.props.params.variance) * 100;
        let c1 = p.color(
          this.props.params.color * 360,
          sat,
          50,
          this.props.params.color
        );
        let c2 = p.color(
          this.props.params.color * 360 - 100,
          sat,
          50,
          this.props.params.color
        );
        pendulum.update(p);

        pendulum.draw(c1, c2, p);
        // pendulum.draw(a, b, c, d, p);

        //pendulum2.draw();
        //pendulum2.update();

        //Using black as color2 here makes it a pupil
        // pupil_pendulum.draw_weighted(pink, black, p);
        pupil_pendulum.draw_weighted(pink, black, p);
        pupil_pendulum.update(p);
      }
    };

    const init = (cx, cy) => {
      /* 
     a higher dt makes the simulation go much faster, while a lower (or negative!)
     friction causes wacky, unrealistic but fascinating behavior.
     add gravitational constant (gc) back here when you want the pendulums to have standardized gravity (it's currently a member object
     of the pendulum class because you were trying to give them each different gravities, you crazy God you
    */
      //   dt = 0.000095;
      //   friction= -0.271828;
      p.background(255); //255 for white 0 for black

      /* Pendulum parameters: 
       DoublePendulum(center x coords, center y coords, length1, l2, mass1, mass2, angle1, angle2, angular velocity1, angular velocity2, gravitational constant)
    */

      //Create three pendulum objects
      //TODO: an interesting follow up would be to enclose this portion in a kind of genetic algorithm to produce stronger results over time
      //I could write code to assign scores to each of the output pendulums based on a variety of factors: # of times the pendulum goes around,
      //dominating color, distance from being a full circle upon completion, etc.
      //Then, I could optimize these values based on those criteria and create a more interesting simulator
      pendulum = new DoublePendulum(
        cx,
        cy,
        1,
        1,
        5.0,
        3.0,
        p.radians(p.random(360)),
        p.radians(p.random(360)),
        0.0,
        0.0,
        9.81,
        dt
      );
      //   pendulum2 = new DoublePendulum(
      //     p.width / 2,
      //     p.height / 2,
      //     1,
      //     1,
      //     3.0,
      //     5.0,
      //     p.radians(p.random(360)),
      //     p.radians(p.random(360)),
      //     0.0,
      //     0.0,
      //     9.81
      //   );
      pupil_pendulum = new DoublePendulum(
        cx,
        cy,
        0.001,
        0.65,
        2.0,
        2.0,
        p.radians(p.random(360)),
        p.radians(p.random(360)),
        0.0,
        0.0,
        9.81,
        dt
      );
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.sketch, this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

Sketch04.propTypes = {
  params: PropTypes.object,
  bg: PropTypes.array,
  speed: PropTypes.number,
  colorMode: PropTypes.string,
};

export default Sketch04;
