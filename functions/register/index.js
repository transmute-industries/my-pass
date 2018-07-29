var express = require('express');
var router = express.Router();

const admin = require('../firebase');

const face = require('../cognitive-services/faceFacade');

const _ = require('lodash');

const dataUriToBuffer = dataUri => {
  var regex = /^data:.+\/(.+);base64,(.*)$/;
  var matches = dataUri.match(regex);
  var ext = matches[1];
  var data = matches[2];
  var buffer = new Buffer(data, 'base64');
  return buffer;
};

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define the home page route
router.get('/', (req, res) => {
  console.log(admin);
  const original = 'foo';
  return admin
    .database()
    .ref('/messages')
    .push({ original: original })
    .then(snapshot => {
      return res.json(snapshot);
    });
});

router.post('/', (req, res) => {
  console.log('yolo!', req.body.name);
  let buffer = dataUriToBuffer(req.body.dataUri);
  let detectedData;
  return face
    .detect(buffer)
    .then(_detectedData => {
      detectedData = _detectedData;
      console.log(detectedData);
      return face.identify({
        personGroupId: 'my-pass-0',
        faceIds: [detectedData[0].faceId]
      });
    })
    .then(identifedData => {
      // console.log(identifedData)

      let results = identifedData[0];

      let sorted = _.sortBy(results.candidates, candidate => {
        return candidate.confidence;
      });

      // console.log(sorted);
      let firstCanidate;
      if (sorted.length) {
        firstCanidate = sorted[0];

        if (firstCanidate.confidence > 0.5) {
          console.log('Looks like you already exist...');
        } else {
          console.log('You are new, you should be registerd....');
        }
      } else {
        console.log('You are new, you should be registerd....');
      }
      let fakeProfile = require('./fakeProfile.json');
      return res.json({
        identifedData,
        detectedData,
        firstCanidate,
        isNewUser: false,
        userProfile: fakeProfile
      });
    });
});

module.exports = router;
