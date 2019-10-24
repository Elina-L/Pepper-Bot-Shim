# bananaShim

REST shim for IBM Cloud, as developed to connect Pepper
bot to PowerAI Vision.  Developed as part of Developer Slam 2018

## Building bananaShim

### Building the app for local development

Building the repo can be done with:

```
npm install
```

### Building the app as a Docker container

## Running bananaShim

There are currently two models available to make POST requests to.
One is the Visual Recognition default model, which is already trained on a multitude of different objects.
The other is the PowerAI Vision Bird model.

In order to use the banana shim to access these two models, one could either use cURL or the Web UI.

## 1. cURL
After starting the app using
```
npm install
npm start
```
Run the following on the terminal:
```
curl --insecure -L -F 'files=@{file path}' http://localhost:3000/detectpowerai
```
or
```
curl --insecure -L -F 'files=@{file path}' http://localhost:3000/detectvr
```

## 2. Web UI
After starting the app using
```
npm install
npm start
```
Direct web browser to 
```
http://localhost:3000/upload.html
```
Choose a file and click "Submit"

### Running the app for local development

Running the shim can be done with:

```
npm start
```

### Running the app as a Docker container

tbd

## Testing bananaShim

Running test for bananaShim can be done with:

```
npm run test
```

## Deploying the bananaShim to IBM Cloud

tbd

## Contributors

Jonathan Clow
Elina Liu
Ian Dominguez
Jared Ryan
Daniel Ruiz
Jun Yu
