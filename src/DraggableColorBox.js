import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'

const styles = {
    root : {
        width : "20%",
        height : "25%",
        margin: "0 auto",
        display : "inline-block",
        position: "relative",
        cursor: "pointer",
        marginTop : "-5px"
    }
};

class DraggableColorBox extends Component {
    render() {
        return (
            <div className={this.props.classes.root}
            style={{backgroundColor : this.props.color}}>
                
            </div>
        )
    }
}

export default withStyles(styles)(DraggableColorBox);
