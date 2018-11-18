import React from 'react'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { GoogleAPI_Key } from '../Credentials/CredentialVariables.js'


export class MapContainer extends React.Component {
  state =    {
     showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
  	};

//Fires the info window for the selected marker
    onMarkerClick = (props, marker, e) =>
      this.setState({
        activeMarker: marker,
        selectedPlace: props,
        showingInfoWindow: true
      });

//Closes the clicked marker by selecting the "X"
      onClose = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
        }}

  render() {
    const {defaultLocation, filteredLocations, ListItemClicked,
            infoWindowListMarker, onListMarkerClick, fourSquareFetchError} = this.props
    const mapStyles = {
      //width: '100%',
      height: '92vh',
      position: 'relative',

    };

    return (
      <Map
        google={this.props.google}
        zoom={11}
        containerStyle={mapStyles}
        initialCenter={defaultLocation}
        >

        {(fourSquareFetchError) ? <div>Unable to obtain location data at this time.</div>
          : (ListItemClicked.length > 0) ? (
        <Marker
          key={ListItemClicked[0].id}
          name={ListItemClicked[0].name}
          position={ListItemClicked[0].location}
          animation={this.props.google.maps.Animation.BOUNCE}
          onClick={(e) => onListMarkerClick(e)}
        />
        )
          : (
          filteredLocations.map(marker => (
            <Marker
              key={marker.id}
              name={marker.name}
              position={marker.location}
              onClick={this.onMarkerClick}
            />
            ))
        )}

        { (ListItemClicked.length > 0) ? (
          <InfoWindow
            position={{lat: (infoWindowListMarker.lat), lng: infoWindowListMarker.lng}}
            pixelOffset={this.props.google.maps.Size(0,-48)}
            visible={true}
            tabindex="1">
                <div>
                    <h2>{ListItemClicked[0].name}</h2>
                    <h4>Brought to you by FourSquare</h4>
                    <h4>**Close window and click marker to show all results**</h4>
                </div>
          </InfoWindow>
            ): (
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
              tabindex="1"
              >
                <div>
                    <h2>{this.state.selectedPlace.name}</h2>
                    <h4>Brought to you by FourSquare</h4>
                </div>
            </InfoWindow>
        )}
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${GoogleAPI_Key}`
})(MapContainer);
