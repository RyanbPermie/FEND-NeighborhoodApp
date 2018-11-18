import React, { Component } from 'react';

class LocationsList extends Component {

  render() {
    const {filteredLocations, onFiltering, onListClick, sidebarOpen, fourSquareFetchError} = this.props

    return (
      <div id="info-container" className={ sidebarOpen  ? "sidebar open" : "sidebar close" }>
        <div id="search-container">
          <input type="text" title="Location filter" tabIndex="0" placeholder="Filter locations here"
          onChange={(event) => onFiltering(event.target.value)}/>
        </div>
        <div id="list-container">
          <ul id="locations-list" >
          {(fourSquareFetchError) ? <div className="LocationListLoadError">Unable to obtain location data at this time.</div>
            : filteredLocations.map(location => (
              <li key={location.id} className="location-item" tabIndex="0"
                  onClick={(event, key, position) => onListClick(event, location.id, location.location)}
                  onKeyDown={(event, key, position) => (event.keyCode === 13) ? onListClick(event, location.id, location.location) : console.log("not the enter key") }
                 >{location.name}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default LocationsList
