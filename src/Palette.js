import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Navbar from "./Navbar";

class Palette extends Component {
  constructor(props) {
    super(props);

    //hold shade in a certain format. shades range from 100 to 900
    //format can be hex/rgb/rgba
    this.state = {
      level: 500,
      format: "hex"
    };

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleFormatChange = this.handleFormatChange.bind(this);
  }

  /* Used to update which colors are shown depending on the slider
       position */
  handleSliderChange(newLevel) {
    this.setState({ level: newLevel });
  }

  /* sets the text of the dropdown menu in the top right
        to display the chosen format : hex/rgb/rgba */
  handleFormatChange(e) {
    this.setState({ format: e.target.value });
  }

  render() {
    let colors = this.props.palette.colors[this.state.level].map(item => {
      return (
        <ColorBox
          color={item[this.state.format]}
          name={item.name}
          key={item.name}
          paletteId={this.props.palette.id}
          id={item.id}
          activeMore={true}
        />
      );
    });
    return (
      <div className="Palette">
        <Navbar
          level={this.state.level}
          handleSliderChange={this.handleSliderChange}
          handleFormatChange={this.handleFormatChange}
          format={this.state.format}
          activeSlider={true}
        />

        <div className="Palette-colors">{colors}</div>

        <footer className="Palette-footer">
          {this.props.palette.paletteName}
        </footer>
      </div>
    );
  }
}

export default Palette;
