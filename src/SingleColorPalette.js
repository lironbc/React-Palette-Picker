import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import sizes from "./sizes";

const styles = {
  SingleColorPalette: {
    "& colorBox": {
      height: "50%"
    },
    height: "100vh"
  },

  colorBox: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginTop: "-4.5px",
    [sizes.down("lg")]: {
      width: "25%",
      height: "33.3333%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%"
    },

    [sizes.down("xs")]: {
      width: "100%",
      height: "10%"
    }
  },

  goBack: {
    backgroundColor: "black",

    "& a": {
      color: "white",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      textDecoration: "none"
    }
  }
};

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);

    //which format colors are copied in: hex/rgb/rgba. default is hex
    this.state = { format: "hex" };

    // calls helper function to get all shades of a color
    this._shades = this.gatherShades();

    this.handleFormatChange = this.handleFormatChange.bind(this);
  }

  /* gets each shade of a color from each of the 10 color
       arrays generated in the home route.
       Ex: red will give the shade of red present in the 50 array, 100 array,
       200 array ... 900 array. */
  gatherShades() {
    let shades = [];

    //create a new array w/ just the shade of the hue being viewed
    //this will go through each color in the palette until it finds the
    //correct color. Could be more efficient but list is relatively small
    for (let color in this.props.palette.colors) {
      shades.push(
        this.props.palette.colors[color].filter(
          c => c.id === this.props.colorId
        )[0]
      );
    }

    /* get rid of first color since it is always white */
    return shades.slice(1);
  }

  // updates what option is selected in dropdown menu showing hex/rgb/rbga
  handleFormatChange(e) {
    this.setState({ format: e.target.value });
  }

  render() {
    const colorBoxes = this._shades.map(c => (
      <ColorBox
        key={c.name}
        name={c.name}
        color={c[this.state.format]}
        activeMore={false}
      />
    ));
    return (
      <div className={this.props.classes.SingleColorPalette}>
        {/* create navbar without slider */}
        <Navbar
          handleFormatChange={this.handleFormatChange}
          activeSlider={false}
          format={this.state.format}
        />

        {/* show colors and a go back link in the bottom right box */}
        <div className="Palette-colors">
          {colorBoxes}
          <div
            className={`${this.props.classes.goBack} ${this.props.classes.colorBox} `}
          >
            <Link to={`/palette/${this.props.palette.id}`}>Go Back</Link>
          </div>
        </div>

        {/* display footer */}
        <footer className="Palette-footer">
          {this.props.palette.paletteName}
        </footer>
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
