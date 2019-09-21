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
    /* Helper function used to get the color to generate a palette for
       when clicking more. This returns the specific color and then
       generatePalette will create the gradient for the color.
     */
    findPalette(id){
        return seedColors.find((palette) => palette.id === id);
    }

    render (){
        return(
        <div className="App">
            {/* Home route contains the list of palettes to view */}
            <Switch>
                <Route exact path="/" render={(routeProps) => <PaletteList {...routeProps}
                palettes={seedColors}/>}/>

                {/* Used to create new palette */}
                <Route exact path="/palette/new" render={() => <NewPaletteForm />} />

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
