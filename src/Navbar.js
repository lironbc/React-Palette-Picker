import React, { Component } from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import sizes from "./sizes";

const styles = {
  logo: {
    marginRight: "15px",
    padding: "0 13px",
    fontSize: "18px",
    background: "#eceff1",
    fontFamily: "Roboto",
    height: "100%",
    display: "flex",
    alignItems: "center",
    "& a": {
      textDecoration: "none",
      color: "black"
    },

    [sizes.down("xs")]: {
      display: "none"
    }
  },
  slider: {
    width: "340px",
    display: "inline-block",
    padding: "0 10px",

    [sizes.down("sm")]: {
      width: "150px"
    }
  }
};

class Navbar extends Component {
  static defaultProps = { format: "hex" };
  render() {
    return (
      <div className="Navbar">
        <div className={this.props.classes.logo}>
          {/* Logo brings you back to home */}
          <Link to="/">PALETTE PICKER</Link>
        </div>

        {/* Slider only shows when not in more tab */}
        {this.props.activeSlider && (
          <div className="slider-container">
            <span>Level {this.props.level}</span>
            <div className={this.props.classes.slider}>
              <Slider
                defaultValue={this.props.level}
                min={100}
                max={900}
                step={100}
                // updates which colors are shown
                onAfterChange={this.props.handleSliderChange}
              />
            </div>
          </div>
        )}
        <div className="select-container">
          <Select
            value={this.props.format}
            onChange={this.props.handleFormatChange}
          >
            <MenuItem value="hex">Hex - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
