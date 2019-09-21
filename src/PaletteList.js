import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';

const styles = {
    root : {
        backgroundColor : "blue",
        height : "100%",
        display : "flex",
        alignItems : "flex-start",
        justifyContent : "center",
        flexWrap : "wrap"
    },

    container : {
        width : "50%",
        display : "flex",
        alignItems : "flex-start",
        flexDirection : "column",
        flexWrap : "wrap"
    },

    MiniPalette : {
        boxSizing : "border-box",
        width : "100%",
        display : "grid",
        gridTemplateColumns : "repeat(3, 30%)",
        gridGap : "5%"
    },

    nav : {
        display : "flex",
        color : "white",
        width : "100%",
        justifyContent : "space-between"
    }
}
class PaletteList extends Component {

    constructor(props){
        super(props);

        this.goToPalette = this.goToPalette.bind(this);
    }
    
    /* redirects to a new route based on the palette clicked on.
       allows for user to click back button to get back to main
       page */
    goToPalette(id){
        this.props.history.push(id);
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <div className={this.props.classes.container}>
                    <nav className={this.props.classes.nav}>
                    React Colors
                    </nav>
                
                    <div className={this.props.classes.MiniPalette}>
                        {this.props.palettes.map(
                            (palette) =>
                            <MiniPalette {...palette} 
                            key={palette.paletteName} 
                            handleClick={this.goToPalette} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(PaletteList);