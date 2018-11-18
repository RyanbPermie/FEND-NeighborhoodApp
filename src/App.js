import React, { Component } from 'react';
import MapContainer from './Components/MapContainer.js'
import LocationsList from './Components/LocationsList.js'
import escapeRegExp from 'escape-string-regexp'
import {FourSquareClientID, FourSquareClientSecret} from './Credentials/CredentialVariables.js'

class App extends Component {

  state = {
    defaultLocation: {
      lat: 38.949896,
      lng: -92.327946
    },
    locations: [],
    query: '',
    clickedLocation: '',
    infoWindowListMarker: {},
    fourSquareFetchError: false,
    sidebarOpen: false
  };

  componentDidMount() {
    let lat = this.state.defaultLocation.lat
    let lng = this.state.defaultLocation.lng
    let clientID = `&client_id=${FourSquareClientID}`
    let clientSecret = `&client_secret=${FourSquareClientSecret}`
    let version = '&v=20181111'
    let limit = '&limit=8'
    let category = '&categoryId=50327c8591d4c4b30a586d5d'
    let radius = '&radius=10000'
    fetch('https://api.foursquare.com/v2/venues/search?ll='+lat+','+lng+limit+category+radius+clientID+clientSecret+version)
      .then(response => response.json())
        .then(data => data.response.venues)
          .catch(err => {this.setState({ fourSquareFetchError: true})
        }).then(breweries => {this.setState({locations : breweries})
            })
  }

  onFiltering = (query) => {
    console.log(query);
    this.setState({ query : query });
  }

//When a list item is clicked sets state so that only that one marker will be visible and an infowindow popsup
  onLocationClick = (event, key, position) => {
    this.setState({clickedLocation: key})
    this.setState({infoWindowListMarker: position})
  }

//Sets the map back to the default view right before a list item was clicked for more info
  DefaultMap = (e) => {
    this.setState({infoWindowListMarker: {}})
    this.setState({clickedLocation: '' })
  }

  openCloseSidebar = (e) => {
    if (this.state.sidebarOpen===false) {this.setState({sidebarOpen: true}) }
      else if (this.state.sidebarOpen===true) {this.setState({sidebarOpen: false})}
  }

  render() {
    let filteredLocations
      if (this.state.query) {
        const match = new RegExp(escapeRegExp(this.state.query), 'i')
        filteredLocations = this.state.locations.filter((location) => match.test(location.name));
        } else {
          filteredLocations = this.state.locations;
      }

      let ListItemClicked
        if (this.state.clickedLocation) {
              ListItemClicked =  this.state.locations.filter((location) => (location.id === this.state.clickedLocation))
            }
                else {ListItemClicked = ''}

    return (
      <div className="app">
        <header className="app-header">
          <h1 id="title">CoMo Breweries</h1>
          <button id="hamburger" tabIndex="-1" onClick={this.openCloseSidebar}>&#9776;</button>
        </header>
        <div id="main-container">
          <LocationsList
            locations = {this.state.locations}
            filteredLocations = {filteredLocations}
            onFiltering = {(query) => this.onFiltering(query)}
            onListClick = {this.onLocationClick}
            sidebarOpen = {this.state.sidebarOpen}
            fourSquareFetchError = {this.state.fourSquareFetchError}
            />
            <div className="map-section">
            <MapContainer
              defaultLocation={this.state.defaultLocation}
              filteredLocations = {filteredLocations}
              clickedLocation = {this.state.clickedLocation}
              ListItemClicked = {ListItemClicked}
              infoWindowListMarker={this.state.infoWindowListMarker}
              onListMarkerClick = {this.DefaultMap}
              fourSquareFetchError = {this.state.fourSquareFetchError}
            />
            </div>
        </div>
      </div>
    );
  }
}

export default App

//Blog that helped establish base for development:
  //https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
