import React from "react";
import PropTypes from "prop-types";
import p5 from "p5";

// https://www.openprocessing.org/sketch/889652
class PerlinNoise extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.delta = false;
    this.reset = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      //     this.setState({ params: this.props.params });
      this.delta = true;
    }
    if (this.props.version !== prevProps.version) {
      console.log("re render");
      this.reset = true;
    }
    //   if (this.props.bg !== prevProps.bg) {
    //     this.setState({ bg: this.props.bg });
    //   }
  }

  sketch = (p) => {
    console.log(
      "setting up sketch with params " + JSON.stringify(this.props.params)
    );
    var particles_a = [];
    var particles_b = [];
    var particles_c = [];
    var nums = 100;
    var noiseScale = this.props.params.variance * 600; // map to params.variance
    let c1 = [69, 33, 124];

    p.setup = () => {
      p.createCanvas(800, 600);
      // p.background(21, 8, 50); // map to params.color
      p.background(this.props.bg);
      p.frameRate(this.props.params.speed);
      for (var i = 0; i < nums; i++) {
        particles_a[i] = new Particle(
          p.random(0, p.width),
          p.random(0, p.height),
          p
        );
        particles_b[i] = new Particle(
          p.random(0, p.width),
          p.random(0, p.height),
          p
        );
        particles_c[i] = new Particle(
          p.random(0, p.width),
          p.random(0, p.height),
          p
        );
      }
    };

    p.draw = () => {
      if (this.delta) {
        console.log("changed params");
        p.frameRate(this.props.params.speed);
        noiseScale = this.props.params.variance * 600; // map to params.variance
        p.colorMode(p.RGB, this.props.params.color * 500);
        this.delta = false;
      }
      if (this.reset) {
        p.background(this.props.bg);
        this.reset = false;
      }
      p.noStroke();
      p.smooth();
      for (var i = 0; i < nums; i++) {
        var radius = p.map(i, 0, nums, 1, 2);
        var alpha = p.map(i, 0, nums, 0, 250);

        p.fill(69, 33, 124, alpha);
        particles_a[i].move();
        particles_a[i].display(radius);
        particles_a[i].checkEdge();

        p.fill(7, 153, 242, alpha);
        particles_b[i].move();
        particles_b[i].display(radius);
        particles_b[i].checkEdge();

        p.fill(255, 255, 255, alpha);
        particles_c[i].move();
        particles_c[i].display(radius);
        particles_c[i].checkEdge();
      }
    };

    function Particle(x, y, p) {
      let dir = p.createVector(0, 0);
      let vel = p.createVector(0, 0);
      let pos = p.createVector(x, y);
      let speed = 0.4;

      this.move = function () {
        var angle =
          p.noise(pos.x / noiseScale, pos.y / noiseScale) *
          p.TWO_PI *
          noiseScale;
        dir.x = p.cos(angle);
        dir.y = p.sin(angle);
        vel = dir.copy();
        vel.mult(speed);
        pos.add(vel);
      };

      this.checkEdge = function () {
        if (pos.x > p.width || pos.x < 0 || pos.y > p.height || pos.y < 0) {
          pos.x = p.random(50, p.width);
          pos.y = p.random(50, p.height);
        }
      };

      this.display = (r) => {
        p.ellipse(pos.x, pos.y, r, r);
      };
    }
  };

  componentDidMount() {
    this.myP5 = new p5(this.sketch, this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

PerlinNoise.propTypes = {
  params: PropTypes.object,
  bg: PropTypes.array,
  version: PropTypes.number,
  colorMode: PropTypes.string,
};

export default PerlinNoise;
