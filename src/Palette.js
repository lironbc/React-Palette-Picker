import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Navbar from './Navbar';

class Palette extends Component {
    constructor(props){
        super(props);

        this.state = {
            level : 500,
            format : "hex"
        };

        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleFormatChange = this.handleFormatChange.bind(this);
    }

    handleSliderChange(newLevel){
        this.setState({level : newLevel});
    }

    handleFormatChange(e){
        this.setState({format : e.target.value});
    }

    render() {
        let colors = this.props.palette.colors[this.state.level].map(
            item => {
            return <ColorBox color={item[this.state.format]}
                        name={item.name} 
                        key={item.name} />
            }
        );
        return (
            <div className="Palette">
                <Navbar level={this.state.level} 
                handleSliderChange={this.handleSliderChange}
                handleFormatChange={this.handleFormatChange}
                format={this.state.format} />

                <div className="Palette-colors">
                    {colors}
                </div>
            </div>
        )
    }
}

export default Palette;
