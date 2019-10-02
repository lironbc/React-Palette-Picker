import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import {Link} from 'react-router-dom';
import sizes from './sizes';
import bg from './bg.svg';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const styles = {
    "@global" : {
        ".fade-exit" : {
            opacity : 1
        },
        ".fade-exit-active" : {
            opacity : 0,
            transition : "opacity 500ms ease-in"
        },
    },
    root : props => ({
        height : props.palettes.length > 6 ? "100%" : "100vh",
        overflowY: "scroll",
        display : "flex",
        alignItems : "flex-start",
        justifyContent : "center",
        flexWrap : "wrap",
        backgroundColor : "#008BAA",
        backgroundImage : `url(${bg})`,
        [sizes.down("sm")] : {
            height : props.palettes.length > 4 ? "100% !important" : "100vh !important" 
        }

    }),

    container : {
        width : "50%",
        display : "flex",
        alignItems : "flex-start",
        flexDirection : "column",
        flexWrap : "wrap",
        [sizes.down("lg")] : {
            width : "70%"
        }
    },

    MiniPalette : {
        boxSizing : "border-box",
        width : "100%",
        display : "grid",
        gridTemplateColumns : "repeat(3, 33%)",
        gridGap : "1.5rem",
        [sizes.down("sm")] : {
            gridTemplateColumns : "repeat(2, 50%)"
        }, 
        [sizes.down("xs")] : {
            gridTemplateColumns : "repeat (1, 100%)"
        }
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
            <div className={this.props.classes.root} >
            {/* // style={palettesLength >= 7 ? {height : "100%"} : {height : "100vh"}}> */}
                <div className={this.props.classes.container}>
                    <nav className={this.props.classes.nav}>
                        <h1>React Colors</h1>
                        <Link to="/palette/new">Create New Palette</Link>
                    </nav>
                
                        <TransitionGroup className={this.props.classes.MiniPalette}>
                            {this.props.palettes.map(
                                (palette) =>
                                    <CSSTransition key={palette.id} 
                                    classNames="fade"
                                    timeout={500}>
                                        <MiniPalette {...palette} 
                                        key={palette.paletteName}
                                        deletePalette={this.props.deletePalette} 
                                        handleClick={this.goToPalette} />
                                    </CSSTransition>
                            )}
                        </TransitionGroup>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(PaletteList);