import React from "react";
import SketchTemplate from "./sketchTemplate";
import p5 from "p5";
import "p5/lib/addons/p5.sound";

class FFTTest extends SketchTemplate {
  sketch = (p) => {
    let mic;
    const fft = new p5.FFT();

    p.setup = () => {
      let cnv = p.createCanvas(800, 800);
      if (this.props.playing) {
        p.userStartAudio;
        console.log("starting audio");
      }
      p.textAlign(p.CENTER);

      mic = new p5.AudioIn();
      mic.start();
      fft.setInput(mic);
    };

    p.draw = () => {
      p.background(220);
      //   p.ellipse(p.width / 2, p.height / 2, 100, 100);
      let spectrum = fft.analyze();
      p.noStroke();
      p.fill(255, 0, 255);
      for (let i = 0; i < spectrum.length; i++) {
        let x = p.map(i, 0, spectrum.length, 0, p.width);
        let h = -p.height + p.map(spectrum[i], 0, 255, p.height, 0);
        p.rect(x, p.height, p.width / spectrum.length, h);
      }

      let waveform = fft.waveform();
      p.noFill();
      p.beginShape();
      p.stroke(20);
      for (let i = 0; i < waveform.length; i++) {
        let x = p.map(i, 0, waveform.length, 0, p.width);
        let y = p.map(waveform[i], -1, 1, 0, p.height);
        p.vertex(x, y);
      }
      p.endShape();
    };
  };
}

export function FFTFacts() {
  let mic;
  const fft = new p5.FFT();
  mic = new p5.AudioIn();
  mic.start();
  fft.setInput(mic);
  return { mic, fft };
}

export default FFTTest;
