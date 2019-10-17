import React, { Component } from "react";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import "./App.css";
import seedColors from "./seedColors";
import NewPaletteForm from "./NewPaletteForm";
import { generatePalette } from "./colorHelpers";
import { Route, Switch } from "react-router-dom";
import SingleColorPalette from "./SingleColorPalette";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class App extends Component {
  constructor(props) {
    super(props);

    // palettes are saved to local storage. They're retrieved here upon
    // loading the app.
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    //if there are no saved palettes, then savedPalettes will be empty
    //and the app will default to the seed colors.
    this.state = { palettes: savedPalettes || seedColors };

    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  /* Helper function used to get the color to generate a palette for
       when clicking more. This returns the specific color and then
       generatePalette will create the gradient for the color.
     */
  findPalette(id) {
    return this.state.palettes.find(palette => palette.id === id);
  }

  //Appends newPalette to the list of palettes and updates local storages
  savePalette(newPalette) {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  }

  //Filters out a palette from the palette list.
  deletePalette(id) {
    this.setState(
      st => ({
        palettes: st.palettes.filter(palette => palette.id !== id)
      }),
      this.syncLocalStorage
    );
  }

  //saves palettes to local storage
  syncLocalStorage() {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }

  render() {
    return (
      <div className="App">
        <Route
          render={({ location }) => (
            <TransitionGroup>
              {/* CSSTransition used to fade out one route to another */}
              <CSSTransition classNames="fade" timeout={400} key={location.key}>
                <Switch location={location}>
                  {/* Home route contains the list of palettes to view */}
                  <Route
                    exact
                    path="/"
                    render={routeProps => (
                      <div className="page">
                        <PaletteList
                          {...routeProps}
                          deletePalette={this.deletePalette}
                          palettes={this.state.palettes}
                        />
                      </div>
                    )}
                  />

                  {/* Used to create new palette */}
                  <Route
                    exact
                    path="/palette/new"
                    render={routeProps => (
                      <div className="page">
                        <NewPaletteForm
                          savePalette={this.savePalette}
                          palettes={this.state.palettes}
                          {...routeProps}
                        />
                      </div>
                    )}
                  />

                  {/* View of an individual palette */}
                  <Route
                    exact
                    path="/palette/:id"
                    render={routeProps => (
                      <div className="page">
                        <Palette
                          palette={generatePalette(
                            this.findPalette(routeProps.match.params.id)
                          )}
                        />
                      </div>
                    )}
                  />

                  {/* View of all shades of a single color in a palette */}
                  <Route
                    exact
                    path="/palette/:paletteId/:color"
                    render={routeProps => (
                      <div className="page">
                        <SingleColorPalette
                          palette={generatePalette(
                            this.findPalette(routeProps.match.params.paletteId)
                          )}
                          colorId={routeProps.match.params.color}
                        />
                      </div>
                    )}
                  />
                  {/* Invalid pages return to home */}
                  <Route
                    render={routeProps => (
                      <div className="page">
                        <PaletteList
                          {...routeProps}
                          deletePalette={this.deletePalette}
                          palettes={this.state.palettes}
                        />
                      </div>
                    )}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </div>
    );
  }
}

export default App;
