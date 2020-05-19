
# GeoBarista v1.0.0

GeoBarista is a cross-platform application built on web technology to sort/filter/view/convert geo-referenced imagery on a map. 

## How to use

This will create the dist directory to be filled based on the current operating system.

```
yarn dist
```

## Getting Started

### Install dependencies for server and client

First you have to install the node dependencies for the client and server.

```
yarn setup
```

### Running a development build

The former development build does not work where you run everything in the browser. This will build the client static page, serve it in Express, and will run on Electron.

```
yarn start-electron
```

### Project Structure

| Directory | Description                                                                                     |
|-----------|-------------------------------------------------------------------------------------------------|
| client    | Everything front end related. This includes the React application that calls the API endpoints. |
| server    | Everything back end related. This includes the Express API endpoints that connect to MongoDB.   |
| tests     | Everything to test the server and client. Currently only holds server API tests.                |

## Running tests

We currently have Express endpoint tests. The current tests expect you to have tests/data/Pearl6_Alcatraz filled with all of the .ntf, and .ppj files.

```
yarn test
```


## Built With

- MERN Web stack
	- MongoDB
	- Express
	- React
	- Node
- Electron
- Material UI
- Leaflet
- Turf

## Authors

- Jacob
- Jomar
- Khoi
- Mike
- Shayan
- Tim
- Trevor