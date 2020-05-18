import React from "react";
import PropTypes from "prop-types";
import p5 from "p5";
import "p5/lib/addons/p5.sound";

class SoundTest extends React.Component {
  constructor(props) {
    super(props);
    this.delta = false;
    this.myRef = React.createRef();
  }

  sketch = (p) => {
    let mic;

    p.setup = () => {
      let cnv = p.createCanvas(400, 400);
      cnv.mousePressed(p.userStartAudio);
      p.textAlign(p.CENTER);
      mic = new p5.AudioIn();
      mic.start();
    };
    p.draw = () => {
      p.background(0);
      p.fill(255);
      p.text("tap to start", p.width / 2, 20);

      let micLevel = mic.getLevel();
      let y = p.height - micLevel * p.height;
      p.ellipse(p.width / 2, y, 10, 10);
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.sketch, this.myRef.current);
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

// SoundTest.propTypes = {
//   params: PropTypes.object,
//   bg: PropTypes.array,
//   speed: PropTypes.number,
//   colorMode: PropTypes.string,
// };

export default SoundTest;
