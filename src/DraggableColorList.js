import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from "react-sortable-hoc";
import sizes from "./sizes";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    height: "98.5%"
  },
  [sizes.down("xs")]: {
    height: "90%"
  }
};

const DraggableColorList = SortableContainer(props => {
  return (
    <div className={props.classes.root}>
      {props.colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          color={color.color}
          key={color.name}
          name={color.name}
          removeColor={props.removeColor}
        />
      ))}
    </div>
  );
});

export default withStyles(styles)(DraggableColorList);
