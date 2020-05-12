import React from "react";
import PropTypes from "prop-types";
import p5 from "p5";

// TODO: grow total length on each iteration
class Petals extends React.Component {
  constructor(props) {
    super(props);
    const { bg, params } = props;
    const { speed, variance, color } = params;
    this.delta = false;
    this.myRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      this.delta = true;
    }
  }

  sketch = (p) => {
    let counter = 0;
    let angle;
    let scale = 0.02;
    let len = 0;

    p.setup = () => {
      p.createCanvas((p.W = 720), p.W);
      p.fill(p.W, 50);
      p.colorMode(p.HSB);
    };

    function drawGradient(bg) {
      //   console.log("draw gradient");
      p.noStroke();
      let radius = p.width;
      let h = bg[0]; //p.random(0, 360);
      for (let r = radius; r > 0; r -= 10) {
        p.fill(h, 50, 50, 5);
        p.ellipse(p.W / 2, p.W / 2, r, r);
        h = (h + 1) % 360;
      }
      p.stroke(0);
    }

    p.draw = () => {
      counter++;
      if (this.props.bg) {
        drawGradient(this.props.bg);
      }
      if (this.delta) {
        p.frameRate(this.speed);
        scale = this.props.params.variance / 20;
        this.delta = false;
      }
      //   p.rect(0, 0, p.W, p.W);
      angle = (p.PI + p.sin(counter * scale)) / 7;
      for (let j = 0; j < p.TWO_PI; j += p.TWO_PI / 8) {
        Tree(7, p.W / 2, p.W / 2, j, 45);
      }
      p.copy(10, 10, p.W - 20, p.W - 20, 0, 0, p.W, p.W);
    };

    const Tree = (step, x, y, rad, lengs) => {
      if (step > 0) {
        let inf = 20 - step; // influence of noise
        let n = p.noise((x + counter) / p.W, (y - counter) / p.W) * inf;
        p.line(
          x,
          y,
          (x += p.cos(rad) * lengs + p.cos(n) * inf),
          (y += p.sin(rad) * lengs + p.sin(n) * inf)
        );
        step--;
        lengs *= 0.9;
        Tree(step, x, y, rad + angle, lengs);
        Tree(step, x, y, rad - angle, lengs);
      }
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.sketch, this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

Petals.propTypes = {
  params: PropTypes.object,
  bg: PropTypes.array,
  speed: PropTypes.number,
  colorMode: PropTypes.string,
};

export default Petals;
