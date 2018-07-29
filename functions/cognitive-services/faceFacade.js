const cognitiveServices = require('cognitive-services');
const functions = require('firebase-functions');

let config = require('../.runtimeconfig.json') || functions.config();

const face = new cognitiveServices.face({
  apiKey: config.my_pass.api_key,
  endpoint: config.my_pass.api_endpoint
});

const personGroupId = 'my-pass-0';

const createPersonGroup = personGroupId => {
  return face.createAPersonGroup({
    parameters: {
      personGroupId
    },
    body: {
      name: personGroupId
    }
  });
};

const createPerson = (personGroupId, name) => {
  return face.createAPerson({
    parameters: {
      personGroupId
    },
    body: {
      name
    }
  });
};

const deleteAPerson = (personGroupId, personId) => {
  return face.deleteAPerson({
    parameters: {
      personGroupId,
      personId
    }
  });
};

const listPersonGroups = () => {
  return face.listPersonGroups({
    parameters: {}
  });
};

const getAPersonGroup = personGroupId => {
  return face.getAPersonGroup({
    parameters: {
      personGroupId
    }
  });
};

const detect = buffer => {
  const parameters = {
    returnFaceId: 'true',
    returnFaceLandmarks: 'true',
    returnFaceAttributes: 'age,gender,glasses'
  };
  const headers = {
    'Content-type': 'application/octet-stream'
  };
  const body = buffer;

  return face.detect({
    parameters,
    headers,
    body
  });
};

const identify = ({ personGroupId, faceIds }) => {
  const parameters = {
    personGroupId,
    faceIds
  };
  const headers = {
    'Content-type': 'application/json'
  };
  const body = { personGroupId, faceIds };

  return face.identify({
    parameters,
    headers,
    body
  });
};

module.exports = {
  detect,
  identify,
  getAPersonGroup
};

// ( () => {
//   console.log('do it ');
//   //   let { personId } =  createPerson('johndoe');
//   //   console.log(personId);
//   //   let data =  listPersonGroups();
//   //   let data =  getAPersonGroup(personGroupId);
//   console.log(data);
// })();

// var parameters = {
//     "personGroupId": personGroupId
// };
// var body = {
//     "name": personGroupId
// };

// face.createAPersonGroup({
//     parameters,
//     body
// }).then((response) => {
//     should(response).be.undefined();
//     // create a person
//     body = {
//         "name": "johndoe"
//     }
//     parameters = {
//         'personGroupId': personGroupId
//     }

//     return face.createAPerson({
//         parameters,
//         body
//     })
// }).then((response) => {
//     should(response).not.be.undefined();
//     should(response).has.property('personId');
//     personId = response.personId;
//     done();
// }).catch((err) => {
//     done(err);
// })
