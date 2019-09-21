import React, { Component } from 'react';
import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import {Link} from 'react-router-dom';

class ColorBox extends Component {

    constructor(props){
        super(props);

        this.state = {
            copied : false
        };

        this.expandAnimation = this.expandAnimation.bind(this);
    }

    expandAnimation(){
        this.setState({copied : true},
            () => setTimeout(() => this.setState({copied : false}), 1500));
    }

    render() {
        const copyClass = this.state.copied ? "copy-animation copied" : "copy-animation";
        const isDarkColor = chroma(this.props.color).luminance() < .15;
        const isLightColor = chroma(this.props.color).luminance() >= .6;
        return (
            <CopyToClipboard text={this.props.color} onCopy={this.expandAnimation}>
            <div className="ColorBox" style={{background : this.props.color}}>
                <div className={copyClass} style={{background : this.props.color}}></div>
                <div className="box-content">
                    <span className={isDarkColor && "light-txt"}>{this.props.name}</span>
                </div>
                
                    <button className={isLightColor ? "copy-btn dark-txt dark-background" :
                                             "copy-btn"}>
                        Copy
                    </button>
                
                {/* only render More button in multi color palette */}
                {this.props.activeMore &&
                <Link to={`/palette/${this.props.paletteId}/${this.props.id}`} 
                onClick={e => e.stopPropagation()}>

                    <div className="see-more">
                        <span className={isLightColor && "see-more dark-txt"}>More</span>
                    </div>
                </Link>
                }

                {/* Render the word Copied! and the color copied while the copy animation
                    is active */}
                {this.state.copied ? 
                    <div className="copy-msg">
                        <h1>Copied!</h1> 
                        <p className={isLightColor && "dark-txt"}>
                            {this.props.color}
                        </p>
                    </div> 
                : null}
            </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;
