import React from "react";
import PropTypes from "prop-types";
import p5 from "p5";
import { FFTFacts } from "./FFTTest";

// TODO: grow total length on each iteration
class Petals extends React.Component {
  constructor(props) {
    super(props);
    const { bg, params, version } = props;
    const { speed, speedAdj, variance, color } = params;
    this.delta = false;
    this.myRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      this.delta = true;
    }
    if (this.props.version !== prevProps.version) {
      this.reset = true;
    }
  }

  sketch = (p) => {
    let counter = 0;
    let angle;
    let bg = this.props.bg;
    let scale = 0.02;
    let rate = 60;
    let len = 0;
    let { mic, fft } = FFTFacts();

    p.setup = () => {
      p.createCanvas((p.W = 720), p.W);
      p.fill(p.W, 50);
      p.colorMode(p.HSB);
    };

    p.draw = () => {
      if (this.reset) {
        p.setup();
        counter = 0;
        this.reset = false;
      }
      if (this.delta) {
        rate = p.max(this.props.params.speedAdj, 80);
        p.frameRate(rate);
        console.log("rate: " + rate);
        bg = this.props.bg;
        scale = this.props.params.variance / 20;
        this.delta = false;
      }
      // let { cMin, cMax } = () => {
      //   console.log("getting c max and min with bg" + this.props.bg);
      //   return this.props.bg
      //     ? drawGradient(this.props.bg)
      //     : { cMin: 0, cMax: 120 };
      // };
      let { cMin, cMax } = drawGradient(this.props.bg);
      cMin = (cMin + 128) % 360;
      cMax = (cMax + 164) % 360;

      rate > 80 ? (counter += 2) : counter++;
      let spectrum = fft.analyze();
      let max = 0;
      // p.noStroke();
      for (let i = 0; i < spectrum.length; i++) {
        // p.stroke(p.map(i, 0, spectrum.length, 0, 360), 80, 50);
        p.stroke(p.map(spectrum[i], 0, 255, cMin, cMax), 90, 60);
        let x = p.map(i, 0, spectrum.length, 0, p.width * 2);
        let h = -p.height + p.map(spectrum[i], 0, 255, p.height, 0);
        h *= 1.5;
        p.rect(x, p.height, (p.width * 2) / spectrum.length, h);
        max = spectrum[i] > max ? spectrum[i] : max;
      }
      bg[0] = p.map(max, 0, 255, bg[0] - 20, bg[0] + 20) % 360;
      p.stroke(0);

      //   p.rect(0, 0, p.W, p.W);
      angle = (p.PI + p.sin(counter * scale)) / 7;
      for (let j = 0; j < p.TWO_PI; j += p.TWO_PI / 8) {
        Tree(7, p.W / 2, p.W / 2, j, 45);
      }
      p.copy(10, 10, p.W - 20, p.W - 20, 0, 0, p.W, p.W);
    };

    function drawGradient(bg) {
      //   console.log("draw gradient");
      p.noStroke();
      let radius = p.width;
      let h = bg[0];
      let cMin = bg[0]; //p.random(0, 360);
      for (let r = radius; r > 0; r -= 10) {
        p.fill(h, 50, 50, 5);
        p.ellipse(p.W / 2, p.W / 2, r, r);
        h = (h + 1) % 360;
      }
      let cMax = h;
      p.stroke(0);
      return { cMin, cMax };
    }

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
