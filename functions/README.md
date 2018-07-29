
### Getting Started


```
npm i
npm run serve
```

http://localhost:3002/mypass-atx/us-central1/widgets


### Face API


Get API Swagger for Insomnia or PostMan

https://eastus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/export?DocumentFormat=Swagger&ApiName=Face%20API%20-%20V1.0

https://github.com/joshbalfour/node-cognitive-services/blob/680e456b907242d9df8c4e7c6b80f398673aef73/src/vision/face.js


## Training

You must train a PersonGroup before attempting to use the Register...

Use swagger / insomnia / postman...


configure functions env

```
firebase functions:config:set my_pass.api_key='KEY'
firebase functions:config:set my_pass.api_endpoint='ENDPOINT'
```