import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default class SingleColorPalette extends Component {
    constructor(props){
        super(props);

        this.state = { format : "hex" }

        this._shades = this.gatherShades();

        this.handleFormatChange = this.handleFormatChange.bind(this);
    }

    gatherShades(){
        let shades = [];

        for(let color in this.props.palette.colors){
            shades.push(this.props.palette.colors[color].filter(
                (c) => c.id === this.props.colorId)[0]);
        }

        //get rid of first color since it is always white
        return shades.slice(1);
    }

    handleFormatChange(e){
        this.setState({format : e.target.value});
    }

    render() {
        const colorBoxes = this._shades.map(c =>
            <ColorBox key={c.name} 
            name={c.name} 
            color={c[this.state.format]}
            activeMore={false} />)
        return (
            <div className="SingleColorPalette Palette">
                <Navbar
                handleFormatChange={this.handleFormatChange}
                activeSlider={false}
                format={this.state.format} />

                <div className="Palette-colors">
                    {colorBoxes}
                    <div className="go-back ColorBox">
                        <Link to={`/palette/${this.props.palette.id}`} 
                        className="back-btn">Go Back</Link>
                    </div>
                </div>

                <footer className="Palette-footer">
                    {this.props.palette.paletteName}
                </footer>
            </div>
        )
    }
}
