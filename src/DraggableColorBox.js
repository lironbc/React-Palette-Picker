import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement, SortableContainer} from 'react-sortable-hoc';

const styles = {
    root : {
        width : "20%",
        height : "23%",
        margin: "0 auto",
        display : "inline-block",
        position: "relative",
        cursor: "pointer",
        marginTop : "-6px",
        "&:hover svg":{
            color: "white",
            transform : "scale(1.5)"
        }
    },

    name : {
        position : "absolute",
        left : "0%",
        bottom : "0%",
        padding : "5px",
        fontSize : ".8rem",
        color : "rgba(0,0,0,0.5)"
    },

    deleteIcon : {
        position : "absolute",
        right : "0%",
        padding : "5px",
        fontSize : "2rem",
        bottom : "0%",
        color : "rgba(0,0,0,0.5)",
        transition : "all 0.3s ease-in-out"
    }
};

const DraggableColorBox = SortableElement((props) => {

    function removeColor(){
        props.removeColor(props.name);
    }

    return (
        <div className={props.classes.root}
        style={{backgroundColor : props.color}}>
            <div>
                <span className={props.classes.name}>{props.name}</span>
                <DeleteIcon 
                className={props.classes.deleteIcon}
                onClick={removeColor} />
            </div>
        </div>
    )
});

export default withStyles(styles)(DraggableColorBox);
