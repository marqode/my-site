import React from "react";
import PropTypes from "prop-types";
import p5 from "p5";
// import PropTypes from "prop-types";
import DoublePendulum from "./doublePendulum";

class Sketch04 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: props.params,
      bg: props.bg,
      colorMode: props.colorMode,
      speed: props.speed || 60,
    };
    this.myRef = React.createRef();
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
    let a = this.state.params.a;
    let b = this.state.params.b;
    let c = this.state.params.c;
    let d = this.state.params.d;
    // let c1 = p.color(this.state.params.a * 255, 250, 120);
    // let c2 = p.color(this.state.params.b * 255, 250, 120);
    // let c3 = p.color(this.state.params.c * 255, 250, 120);
    const dt = 0.000095; // change this based on props

    //Initialize pendulums
    let pendulum;
    let pupil_pendulum;
    // let pendulum = new DoublePendulum();
    // let pendulum2 = new DoublePendulum();
    // let pupil_pendulum = new DoublePendulum();

    p.setup = () => {
      // get canvas size from props
      p.createCanvas(800, 600, p.WEBGL);
      p.smooth(8);
      p.frameRate(this.state.speed);
      init(30, 10);
      if (this.state.colorMode === "HSB") p.colorMode(p.HSB);
      else p.colorMode(p.RGB);
      // p.colorMode(p.HSB);
      if (this.state.bg) {
        p.background(this.state.bg);
      }
    };

    // p.draw = () => {
    //   p.background(0);
    //   p.fill(0, 250, 100);
    //   p.rect(p.width / 2, p.height / 2, 50, 50);
    // };
    p.draw = () => {
      // p.fill(255, 0, 0);
      // p.ellipse(50, 50, 100, 100);
      for (let i = 0; i < 50; i++) {
        //Include as many pendulums as you want
        // pendulum.draw(pendulum.update(p), pendulum.update(p), p);
        a = p.noise(a) * 360;
        b = p.noise(b) * 100;
        c = p.noise(c) * 100;
        d = p.noise(d) * 360;
        pendulum.update(p);

        // pendulum.draw(c1, c2, p);
        pendulum.draw(a, b, c, d, p);

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
