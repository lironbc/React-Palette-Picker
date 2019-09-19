import React, { Component } from 'react';
import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
        return (
            <div className="ColorBox" style={{background : this.props.color}}>
                <div className={copyClass} style={{background : this.props.color}}></div>
                <div className="box-content">
                    <span>{this.props.name}</span>
                </div>
                <CopyToClipboard text={this.props.color} onCopy={this.expandAnimation}>
                    <button className="copy-btn">
                        Copy
                    </button>
                </CopyToClipboard>
                
                <div className="see-more">
                    <span>More</span>
                </div>

                {/* Render the word Copied! and the color copied while the copy animation
                    is active */}
                {this.state.copied ? 
                    <div className="copy-msg">
                        <h1>Copied!</h1> 
                        <p>{this.props.color}</p>
                    </div> 
                : null}
            </div>
        )
    }
}

export default ColorBox;
