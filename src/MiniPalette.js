import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  root: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover svg": {
      opacity: 1
    }
  },

  colors: {
    backgroundColor: "black",
    width: "100%",
    height: "160px",
    borderRadius: "5px",
    overflow: "hidden"
  },

  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative"
  },

  miniColorBoxes: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-4px"
  },

  deleteIcon: {
    color: "white",
    backgroundColor: "#eb4034",
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "0px",
    top: "0px",
    padding: "5px",
    borderRadius: "15%",
    zIndex: 10,
    opacity: 0,
    transition: "all 0.15s ease-in-out !important"
  }
};

class MiniPalette extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  handleClick() {
    this.props.handleClick(`palette/${this.props.id}`);
  }

  deletePalette(e) {
    e.stopPropagation();
    this.props.deletePalette(this.props.id);
  }

  render() {
    const miniColorBoxes = this.props.colors.map(color => (
      <div
        className={this.props.classes.miniColorBoxes}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    ));

    return (
      //Delete icon here is hidden until mini palette is hovered over.
      <div className={this.props.classes.root} onClick={this.handleClick}>
        <DeleteIcon
          className={this.props.classes.deleteIcon}
          onClick={this.deletePalette}
        />
        <div className={this.props.classes.colors}>{miniColorBoxes}</div>
        <h5 className={this.props.classes.title}>{this.props.paletteName}</h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
