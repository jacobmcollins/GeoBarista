# GeoBarista

## Install dependencies for server and client

```
yarn install
cd client
yarn install
cd ..
```

## Development Build

```
yarn start-dev
```

## Production Build

```
yarn start-prod
```

## Docker Build

The first line creates an image called geobarista.
Line 2 runs a container from that image, exposes the necessary ports and runs 'yarn start-prod'.
Replace 'yarn start-prod' with whatever command you want to try out
For 'yarn start-prod' you will eventually see the app show up on localhost:3001 like normal.
When you are done make sure to run 'docker ps' to find the running container and close it so the ports close.

```
docker build -t geobarista .
docker run -p 3000:3000 -p 3001:3001 -d geobarista:latest yarn start-prod
```

NOTE: use 'yarn dist' in the run command and then 'docker cp <container>:/Dock/dist dist' when it completes to get the linux build
NOTE: running 'yarn dist' successfully means it is working on linux!