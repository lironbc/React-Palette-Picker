import React, { Component } from 'react'
import Palette from './Palette';
import PaletteList from './PaletteList';
import './App.css';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from './colorHelpers';
import {Route, Switch} from 'react-router-dom';
import SingleColorPalette from './SingleColorPalette';

class App extends Component {
    constructor(props){
        super(props);

        const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
        this.state = { palettes : savedPalettes || seedColors }

        this.savePalette = this.savePalette.bind(this);
        this.findPalette = this.findPalette.bind(this);
        this.deletePalette = this.deletePalette.bind(this);
    }

    /* Helper function used to get the color to generate a palette for
       when clicking more. This returns the specific color and then
       generatePalette will create the gradient for the color.
     */
    findPalette(id){
        return this.state.palettes.find((palette) => palette.id === id);
    }

    savePalette(newPalette){
        this.setState({palettes : [...this.state.palettes,newPalette]},
            this.syncLocalStorage);
    }

    deletePalette(id){
        this.setState(st => ({ palettes : st.palettes.filter(palette => palette.id !== id)}),
            this.syncLocalStorage)
    }

    //saves palettes to local storage
    syncLocalStorage(){
        window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
    }

    render (){
        return(
        <div className="App">
            {/* Home route contains the list of palettes to view */}
            <Switch>
                <Route exact path="/" render={(routeProps) => <PaletteList 
                {...routeProps}
                deletePalette={this.deletePalette}
                palettes={this.state.palettes}/>}/>

                {/* Used to create new palette */}
                <Route exact path="/palette/new" render={(routeProps) => 
                    <NewPaletteForm 
                    savePalette={this.savePalette}
                    palettes={this.state.palettes}
                    {...routeProps}/>} />

                {/* View of an individual palette */}
                <Route exact path="/palette/:id" 
                render={(routeProps) => <Palette palette={generatePalette(
                    this.findPalette(routeProps.match.params.id)
                    )} /> }/>
                
                {/* View of all shades of a single color in a palette */}
                <Route exact path="/palette/:paletteId/:color"
                render={(routeProps) => <SingleColorPalette 
                    palette={generatePalette(
                    this.findPalette(routeProps.match.params.paletteId)
                    )}
                    colorId={routeProps.match.params.color} />} />
            </Switch>
        </div>
        );
    };
}

export default App;
