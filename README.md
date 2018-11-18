# CoMo Breweries
## Udacity Neightborhood Map with React

This is the final project for Udacity's Front End Web Development course (FEND). Project was completed using React and two API's, Google Map and FourSquare

## Installation
To deploy this project you will need to:
1. Download or clone the project locally
2. Ensure npm is installed on your machine and then in the project directory run `npm install`
3. Install `create-react-app`
4. Install `google-maps-react`
5. API credentials:
	a. Obtain API credentials from Google Maps and FourSquare
	b. Either add your APIs in the App.js and MapCotainer.js files directly or create a CredentialVariable.js file under the 'Credentials' directory and popoulate with the following lines and your API keys
		* export const GoogleAPI_Key = ''
		* export const FourSquareClientID = ''
		* export const FourSquareClientSecret = ''
6. After libraries have been installed then run `npm start` to deploy the server
7. If a browser doesn't automatically open then you can acess via [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Production Mode
When redy to deploy this for production:
1. In the project directory run `npm run build`
2. If not already installed, run `npm install -g serve` then `serve -s build`
3. Access via [http://localhost:5000](http://localhost:5000)

## Project Dependencies

* `create-react-app`  - This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

* `google-maps-react` - Google Map API library by Fullstack [google-maps-react](https://github.com/fullstackreact/google-maps-react).

* Google Maps API - 3rd Party API for map functionality

* FourSquare API - 3rd party API for location information. List is populated via the category query and limited to eight of the first returned locations
