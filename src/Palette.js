import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Navbar from './Navbar';

class Palette extends Component {
    constructor(props){
        super(props);

        this.state = {
            level : 500
        };

        this.handleSliderChange = this.handleSliderChange.bind(this);
    }

    handleSliderChange(newLevel){
        this.setState({level : newLevel});
    }

    render() {
        let colors = this.props.palette.colors[this.state.level].map(
            item => <ColorBox color={item.hex}
                        name={item.name} 
                        key={item.name} />
        );
        return (
            <div className="Palette">
                <Navbar level={this.state.level} handleSliderChange={this.handleSliderChange} />
                <div className="Palette-colors">
                    {colors}
                </div>
            </div>
        )
    }
}

export default Palette;
