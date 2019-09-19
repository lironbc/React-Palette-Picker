import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className="Navbar">
                <div className="logo">
                    <a href="/">PALETTE PICKER</a>
                </div>

                <div className="slider-container">
                    <span>Level {this.props.level}</span>
                    <div className="slider">
                        <Slider defaultValue={this.props.level}
                            min={100}
                            max={900}
                            step={100}
                            onAfterChange={this.props.handleSliderChange} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;