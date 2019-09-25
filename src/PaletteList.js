import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import {Link} from 'react-router-dom';

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
        gridTemplateColumns : "repeat(3, 33%)",
        gridGap : "3%",
        marginBottom : "200%"
    },

    nav : {
        display : "flex",
        color : "white",
        width : "100%",
        justifyContent : "space-between",
        alignItems : "center",
        "& a" : {
            color: "white"
        }
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
                        <h1>React Colors</h1>
                        <Link to="/palette/new">Create New Palette</Link>
                    </nav>
                
                    <div className={this.props.classes.MiniPalette}>
                        {this.props.palettes.map(
                            (palette) =>
                                <MiniPalette {...palette} 
                                key={palette.paletteName}
                                deletePalette={this.props.deletePalette} 
                                handleClick={this.goToPalette} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(PaletteList);