import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    root : {
        width : "20%",
        height : "25%",
        margin: "0 auto",
        display : "inline-block",
        position: "relative",
        cursor: "pointer",
        marginTop : "-5px",
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

class DraggableColorBox extends Component {

    constructor(props){
        super(props);

        this.removeColor = this.removeColor.bind(this);
    }

    removeColor(){
        this.props.removeColor(this.props.name);
    }

    render() {
        return (
            <div className={this.props.classes.root}
            style={{backgroundColor : this.props.color}}>
                <div>
                    <span className={this.props.classes.name}>{this.props.name}</span>
                    <DeleteIcon 
                    className={this.props.classes.deleteIcon}
                    onClick={this.removeColor} />
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(DraggableColorBox);
