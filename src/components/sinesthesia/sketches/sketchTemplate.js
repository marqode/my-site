import React from "react";
import PropTypes from "prop-types";
import p5 from "p5";

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

  sketch = (p) => {};

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
