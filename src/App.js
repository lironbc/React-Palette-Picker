import React, { Component } from 'react'
import Palette from './Palette';
import PaletteList from './PaletteList';
import './App.css';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import {Route, Switch} from 'react-router-dom';
import SingleColorPalette from './SingleColorPalette';

class App extends Component {
    findPalette(id){
        return seedColors.find((palette) => palette.id === id);
    }

    render (){
        return(
        <div className="App">
            <Switch>
                <Route exact path="/" render={(routeProps) => <PaletteList {...routeProps}
                palettes={seedColors}/>}/>

                <Route exact path="/palette/:id" 
                render={(routeProps) => <Palette palette={generatePalette(
                    this.findPalette(routeProps.match.params.id)
                    )} /> }/>
                
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
