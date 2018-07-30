# MyPass

##### [https://mypass.transmute.live/](https://mypass.transmute.live/)

> Soverign Idenitity for People Experiencing Homelessness

[![Build Status](https://travis-ci.org/transmute-industries/my-pass.svg?branch=master)](https://travis-ci.org/transmute-industries/my-pass)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub top language](https://img.shields.io/github/languages/top/badges/shields.svg)

### [Hackathon](https://www.eventbrite.com/e/the-mayors-blockchain-challenge-tickets-48004157728)

### [Pitch Deck](https://docs.google.com/presentation/d/15m1KqA66fksI1kxDzz2qjHzRDfiW0gxVMYua3fy57Tw)

### [Prototype](https://www.figma.com/proto/34LXePpcyGvw8tQf59Ikot/MyPass-Quick-Prototype)

## Overview

This repo contains code for a web app, cloud functions and smart contracts, as well as docker services for ethereum and ipfs. Together, these components and services provide a hybrid app (built using centralized and decentralized tech), which supports identity and secure document managment using machine learning, blockchain and cryptgrography which as been around for decades (PGP).

We think it's important to get a great user experience built first, before completing the integration of these services, or adding additional blockchain or machine learning features.

## Getting Started

Start local Ethereum and IPFS nodes.

```
# test, build and deploy the web app
docker-compose up
npm run start
npm run build
npm run deploy

# test smart contracts and decentralized storage with ipfs
npm i -g truffle
truffle text
```

## Biometric Hybrid Wallet

This wallet design is not safe. It is for demonstration purposes only. The concept is to derive a keypair from biometry + codes.

It uses [Microsoft Azure Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/) to detect and identify the face (and gender, age) of a user within a group of users. This solution might have trouble scaling, but could work well if regional accounts were used. Face identification can be fooled easily, and is generally not secure... especially by itself, or implemented the way we have done so here.

Identity is often bootstraped from:

- Something you are.
- Something you have.
- Something you know.

Ideally, when registering an identity we will capture as many factors as possible. This improves the robustness of the identity while reducing the user friendliness, and the privacy of the principal.

For the purposes of this hackathon, we assume that everything can be stolen, but that the user can remember a secret (or somehow secure a code). Additional factors should be added to improve the security of this system, some possible improvements:

- Additional biometric factors (Retina, Fingerprints)
- Hardware tokens (Yubikey, Ledger, Trezor, etc...)
- Email / Password
- Social Auth (Google, Facebook, LinkedIn)

The end result is an idenity rooted in a public and private keypair. The keypair is compatable with the Ethereum blockchain, and can be used to sign transactions, send and receive ETH or other Ethereum based tokens, as well as encrypt, decrypt, sign and verify.

By layering these common cryptographic operations on top of document storage, we can achieve confidentiality and integrity. By relying on Google backed centralized data storage, we can achieve availability, but also have the ability to censor or redact information should keys become compromised in the future.

This approach leverages the best properites of public cloud and decentralized application infrastructure.

## Immutable Audit Log

Using PGP, Ethereum and IPFS, we can provide an immutable audit log, with authenticated encryption, allowing only select individuals to access data, while ensuring that a trace is always available.

The event data below shows how PGP, Ethereum Smart Contracts and IPFS are used to save encrypted data an immutable audit log.

See `./test/Integration.spec.js` for how this was generated. There are also continious integration tests for the audit log functionality [here](https://travis-ci.org/transmute-industries/my-pass).

```
{
  "event": {
    "sender": "0x88b088c4c978c8b2cf20986565ae70641610fc38",
    "key": {
      "type": "ENCRYPTED_EVENT_WRITTEN"
    },
    "value": {
      "encrypted_msg": "-----BEGIN PGP MESSAGE-----\r\nVersion: OpenPGP.js v3.0.11\r\nComment: https://openpgpjs.org\r\n\r\nwX4De+91nvPiEVISAgME0L2nyrfTh3sZCfrdQyxI3wpHfaEd0+73wgvYe71o\nvr9jxUiTNOr524CbENcO9p1Ck470okeACwE+icB3Zf0o9DDPTBROjFI57ww8\n+gu9VzU35l5hNCZpLuqAv0w1jqVMG826ieuhehHcVqmyKpzycpvSwA8BhCKD\n15oE92SGEAbii++SaPeAvEfOrPiJU+mLWHiTjkw70llkzc8HIZeyYiwPrakB\nPMu8LunI/naq/0Xv1+583Pk02rSiB9lXXPNp5uQWXNdhABkg2bStO2oeLmfy\n1ortinKUAUEnQmsuF9GbMT0DlsIRhrKkzsHg2B9FLAZaH7etzhdMcTvAsyjJ\nB+eY5FSVxJWG0PBFT6WWZDyBjmcNxDu7yi3L9BacYnWHL7HReuOkNH9dEn3j\nGQFZiOr8Weq43770eocJ7wHzLTQzA6I=\r\n=jAp2\r\n-----END PGP MESSAGE-----\r\n",
      "timestamp": 1532841609,
      "for": "-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v3.0.11\r\nComment: https://openpgpjs.org\r\n\r\nxk8EW10+HxMFK4EEAAoCAwS3/wKwL5KgxeXMsqIA208MS5/BbsTPABxrCo0q\npgLBS7FpWDDvNDk+LKMe8ru7KxMuV8noF2Xgw4hgaeq0q39vzSxCYXJ0aG9s\nb21lIEZhZGVsIDxNYXJjZWxvLkJvZWhtMzdAZ21haWwuY29tPsJ3BBATCAAp\nBQJbXT4fBgsJBwgDAgkQP2gKHFlTmh0EFQgKAgMWAgECGQECGwMCHgEAANSX\nAP9UmIr5GtQ+lv8K2YWSMqhZO2MsF2YbPuNJAzMMKYAq+QEA/WZmMqbdSHEM\nNWwCZ+nvUy+UbIK9at/g0ZHbTN4zze7OUwRbXT4fEgUrgQQACgIDBM76tN/5\n8rlABwe0elMT8PvixgfOLM6hxA57ftsKt0BwVKapV0C0Pmi7+3xTnTGGN091\nJcSnJ06ondSO0OivhsMDAQgHwmEEGBMIABMFAltdPh8JED9oChxZU5odAhsM\nAABEiQEAiiHSNrqEAo9gC7lPWWZmghB+dIcB/5aK9XMYFJCSdIEBANaTcs3Y\nzqWo5oE2Bk8NsDT4GPxPPh6TTXbN0cATjjIJ\r\n=tpNF\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n\r\n"
    }
  },
  "meta": {
    "tx": {
      "tx": "0x563a20b823b2706be49f1f1d4d3075ba3bde60083f9558212694b91c5b2e70c3",
      "receipt": {
        "transactionHash": "0x563a20b823b2706be49f1f1d4d3075ba3bde60083f9558212694b91c5b2e70c3",
        "transactionIndex": 0,
        "blockHash": "0xb7bea1522f5b6992bc7423a5010b4321d00d1e7a1e5b39708379e7f834e4263c",
        "blockNumber": 441,
        "gasUsed": 116247,
        "cumulativeGasUsed": 116247,
        "contractAddress": null,
        "logs": [
          {
            "logIndex": 0,
            "transactionIndex": 0,
            "transactionHash": "0x563a20b823b2706be49f1f1d4d3075ba3bde60083f9558212694b91c5b2e70c3",
            "blockHash": "0xb7bea1522f5b6992bc7423a5010b4321d00d1e7a1e5b39708379e7f834e4263c",
            "blockNumber": 441,
            "address": "0x87b0bc5034f1d30955f17b727b95cfbcfc480066",
            "data": "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000088b088c4c978c8b2cf20986565ae70641610fc383d25b94a9fcd8829383c3c7317b0910fdcd6e958cddefd1012b6721041b873e8a129d3ddb508e0d901dd97dadd27e199a54533b3f67ede7243ebbef261a1bfa2",
            "topics": [
              "0x4c7900e30963aa4aed068e34036112a44f45ef40623e8892337b84316e5fcb64"
            ],
            "type": "mined"
          }
        ],
        "status": "0x01",
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000004000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000008000000000000000000000000000000000000"
      },
      "logs": [
        {
          "logIndex": 0,
          "transactionIndex": 0,
          "transactionHash": "0x563a20b823b2706be49f1f1d4d3075ba3bde60083f9558212694b91c5b2e70c3",
          "blockHash": "0xb7bea1522f5b6992bc7423a5010b4321d00d1e7a1e5b39708379e7f834e4263c",
          "blockNumber": 441,
          "address": "0x87b0bc5034f1d30955f17b727b95cfbcfc480066",
          "type": "mined",
          "event": "TransmuteEvent",
          "args": {
            "index": "0",
            "sender": "0x88b088c4c978c8b2cf20986565ae70641610fc38",
            "key": "0x3d25b94a9fcd8829383c3c7317b0910fdcd6e958cddefd1012b6721041b873e8",
            "value": "0xa129d3ddb508e0d901dd97dadd27e199a54533b3f67ede7243ebbef261a1bfa2"
          }
        }
      ]
    },
    "ipfs": {
      "key": "QmSTLwbsSQSzhtHHKQhd92ekfT2uR1t2CAbkjDkaU4QNj9",
      "value": "QmZBmLkns8VsH1hddE5MfMXfGfVNu5rTa3spiTZqoPC9fF"
    },
    "bytes32": {
      "key": "0x3d25b94a9fcd8829383c3c7317b0910fdcd6e958cddefd1012b6721041b873e8",
      "value": "0xa129d3ddb508e0d901dd97dadd27e199a54533b3f67ede7243ebbef261a1bfa2"
    },
    "receipt": null
  }
}
```

## AI Agents and Secure Document Management

Constructing conversational AI in the form of chat bots or devices such as Google Home or Alexa, have potential to provide assistance whenever it is needed.

AIs don't sleep, cost less than humans, and can be trusted to handle sensitive information, but also come with serious risks, such as algorithmic bias.

The availability of machine learning solutions for vision, speech and text processing, such as Cognitive Services (used in this demo), Dialog Flow from Google, or Alexa Skills from Amazon, could be integrated to assist PEH with a variety of issues.

Blockchain can be applied alongside ai to provide integrity for training data and models, as well as payment channels and markets for interactive content or digital or physical work.

## Decentralization

Apps like this should be developed using traditional cloud technologies first. The user experience should be perfected using technologies that scale. Decentralized security should added only after the experience has been developed and accepted by key stakeholders.

It is possible to reward identities for verified work, providing a verified work history, game theory can be applied to share the reward for performing, verifying and faciliating work, in both digital and physical form. Rewards can be delivered in tokens, which could be converted directly to USD via 3rd party integrations in the future.

Due to the immutable nature of the blockchain, it is critical that PII not be stored on it, and if decentralized storage tech, such as IPFS is used, all data should be encrypted first. A better scenario would be to used trusted georeplicated, and SLA covered storage from major public cloud providers, such as Google, Amazon or Microsoft.

## Privacy

Biometrics are generally usernames, not passwords. The privacy of user information require careful analysis and review, an all idenitiers that can be linked to an individual should be treated with care. In our case, we have faceIds which correspond to images of people, personIds which corrospond to people, and personGroupIds which corrospond to regions. We also have the public and private key used by the user, and of course their IP address. The app does not currently collect anything other than images. But there are tests showing how encryption must be applied to protect user messages and documents.

## How PGP Works

Encryption helps you safely share secrets with people you trust.

```
my social security number is 123-45-6789
```

Becomes...

```
 -----BEGIN PGP MESSAGE-----
Version: OpenPGP.js v3.0.11
Comment: https://openpgpjs.org

wX4DdixqjIRJcHcSAgMEm59JRYJw9I9Rd/vutMal+TBDhkSpPCsaujRQKAwo
RqQ4IPN3cI8w15t94FAO9kTnSF6d036RwMBkrdE/B0QzkDDna8D01UXVaBED
H6OTr5einxSTGPmP55rUlQSV52ZBM8MIx2WhdMjYl+BbxNOgPO3SwA8B/GiC
o9u7CBivGCWEMhybnerfP5efR7dBQ7kKTr0YGT+x3HOGICQ5zyLL3HvD6Pz5
czOvo+yKKfLaBMNYr6iA2bbzjgbV83LS+AIuR0XFmrdpaPiR5GsnVi6agDCl
I+o5jvisPWHBHZcmOKLnK3oRVMo1FLSLOZUQRaCl75TOYr3Bal0mImXY7FY5
U9YGj521I1EADMg83ohpxsPCPmXnhwSUIK6m7nbxncqYrpYJUyhqd5XEct/y
J9bOnna2NiNko/VR3FBXvzkwOQ2QI6w=
=hCf6
-----END PGP MESSAGE-----
```

For everyone except the message recipient.

If you are the message recipient, this acts like a vault for your secrets, things you need to remember, but are afraid to write down because they may be stolen.

If the message recipient is an agent or social worker, you can rest assured that they are the only one who will be able to read your message.

## Technologies Used

React, Redux, Material UI, Firebase, Ethereum, IPFS, Truffle, Docker, Lodash, React-Camera, OpenPGP.js, Firebase Functions, Express, Azure Cognitive Services, Travis CI, Github, Transmute Framework
