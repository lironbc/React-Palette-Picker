import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    root : {
        backgroundColor : "white",
        borderRadius : "5px",
        padding : "0.5rem",
        position : "relative",
        overflow : "hidden",
        "&:hover" : {
            cursor : "pointer"
        }
    },

    colors : {
        backgroundColor : "#dae134",
        width : "100%",
        height: "150px",
        borderRadius : "5px",
        overflow : "hidden"
    },

    title : {
        display : "flex",
        justifyContent : "space-between",
        alignItems : "center",
        margin : "0",
        color : "black",
        paddingTop : "0.5rem",
        fontSize : "1rem",
        position : "relative"
    },

    miniColorBoxes : {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin : "0 auto",
        position : "relative",
        marginBottom : "-4px"
    }
}

class MiniPalette extends Component{

    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.handleClick(`palette/${this.props.id}`);
    }

    render(){
        const miniColorBoxes = this.props.colors.map(color => 
            <div 
            className={this.props.classes.miniColorBoxes} 
            style={{backgroundColor : color.color}}
            key={color.name}></div>);

        return (
        <div className={this.props.classes.root} onClick={this.handleClick}>
            <div className={this.props.classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={this.props.classes.title}>
                {this.props.paletteName}
            </h5>
            
        </div>
        );
    }
}  


export default withStyles(styles)(MiniPalette);