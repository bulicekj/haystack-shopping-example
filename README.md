<img src="/shopping-frontend/public/logo_with_title_transparent.png" width="300" />

# Haystack-Shopping-Example
Haystack-shopping-example is an app that is designed to be used in parallel with [Haystack Docker](https://github.com/expediadotcom/haystack-docker/). It consists of two javascript servers: a [create-react-app](https://github.com/facebook/create-react-app/) frontend that uses webpack-dev-server, and an express backend that acts as a dummy database. Both servers use [haystack-client-node](https://github.com/expediadotcom/haystack-client-node/) to create and dispatch traces. 

When used in conjunction with haystack-docker, the shopping-frontend will be exposed to port 3000. Navigating around the frontend will dispatch different traces via [haystack agent](https://github.com/expediadotcom/haystack-agent/) on port 34000, which, if deployed, will be visible on [haystack-ui](https://github.com/expediadotcom/haystack-ui/) on `localhost:8080`. 

## Development

### Pre-requisites
Ensure you have `node >= 8.10` installed. 

Clone the repository: 
```
$ git clone https://github.com/jbulicek/haystack-shopping-example.git
$ cd haystack-shopping-example
```


### Docker 
We have provided `make` commands to facilitate building. For creating a local docker image for development use -
```
$ make build 

```


### Build and Run
Both the frontend and backend will need to be installed and ran separately for local development. 

The frontend is written to proxy requests to the backend. As such, `proxy` in package.json will need to be changed to the location of the backend server. For local development, you will want to change this to `localhost:3001` 

After this change has been made, in two separate terminal windows, run the following command inside the shopping-frontend and shopping-backend directories: 

```
$ npm install                # install dependencies
$ npm run start              # start server in dev mode
```

Once start is successful you can visit [http://localhost:3000/](http://localhost:3000/) to view the UI. Bear in mind, traces will not be dispatched to the agent unless it is deployed as part of haystack-docker.