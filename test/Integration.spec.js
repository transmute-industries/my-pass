const T = require('transmute-framework');
const transmuteConfig = require('../src/transmute-config');

const Gaurdian = artifacts.require('./Gaurdian.sol');

const moment = require('moment');

const {
  getFakeProfile,
  encryptMessage,
  decryptMessage,
  sendEth,
  getBalance,
  sendEthFromWallet
} = require('./helpers');

let nat = require('./users/nat.json');
let bart = require('./users/bart.json');
let dangerous_message = 'my social security number is 123-45-6789';

contract('Integration', accounts => {
  // it('generate fake user', async () => {
  //   let user1 = await getFakeProfile();
  //   console.log(JSON.stringify(user1, null, 2));
  // });
  it('users can receive eth', async () => {
    let natBalanceBefore = await getBalance(web3, nat.address);
    let receipt = await sendEth(web3, accounts[0], nat.address, 1);
    let natBalanceAfter = await getBalance(web3, nat.address);
    // console.log(receipt, natBalanceBefore, natBalanceAfter);
    assert(natBalanceAfter > natBalanceBefore);
  });
  it('users can send eth', async () => {
    let user1 = await getFakeProfile();
    let user2 = await getFakeProfile();
    let user2_bal_before = await getBalance(web3, user2.address);
    let receipt = await sendEth(web3, accounts[0], user1.address, 1);
    // console.log(receipt);
    receipt = await sendEthFromWallet(web3, user1.wallet, 0.03, user2.address);
    let user2_bal_after = await getBalance(web3, user2.address);
    assert(user2_bal_after > user2_bal_before);
  });
  it('users can encrypt messages for themselves', async () => {
    let encrypted_msg = await encryptMessage(
      dangerous_message,
      nat.privateKey,
      nat.public
    );
    // console.log('message plaintext: \n', dangerous_message);
    // console.log();
    // console.log('message ciphertext: \n', encrypted_msg);
    let decrypted_msg = await decryptMessage(
      encrypted_msg,
      nat.privateKey,
      nat.public
    );
    assert(decrypted_msg === dangerous_message);
  });
  it('users can encrypt messages for other users', async () => {
    let encrypted_msg = await encryptMessage(
      dangerous_message,
      nat.privateKey,
      bart.public
    );
    let decrypted_msg = await decryptMessage(
      encrypted_msg,
      bart.privateKey,
      nat.public
    );
    assert(decrypted_msg === dangerous_message);
  });

  it('uses the transmute framework', async () => {
    const storage = await Gaurdian.deployed();
    const eventStore = new T.EventStore({
      eventStoreArtifact: Gaurdian,
      ...transmuteConfig
    });
    eventStore.eventStoreContractInstance = await eventStore.eventStoreContract.at(
      storage.address
    );
    let eventCount = (await eventStore.eventStoreContractInstance.count.call()).toNumber();
    assert(eventCount === 0);
    let event = {
      key: {
        type: 'EVENT_WRITTEN'
      },
      value: {
        timestamp: moment().unix()
      }
    };
    let result = await eventStore.write(accounts[0], event.key, event.value);
    // console.log('event write result: ', JSON.stringify(result, null, 2));
    eventCount = (await eventStore.eventStoreContractInstance.count.call()).toNumber();
    // console.log('Event Count: ', eventCount);
    const filter = event => {
      // process all events
      return event;
    };
    const reducer = (state, event) => {
      switch (event.key.type) {
        // record all events index'ed by timestamp
        case 'EVENT_WRITTEN': {
          return {
            ...state,
            events: {
              ...state.events,
              [event.value.timestamp]: event
            }
          };
        }
        default: {
          return state;
        }
      }
    };
    const streamModel = new T.StreamModel(eventStore, filter, reducer, null);
    await streamModel.sync();
    // console.log(
    //   'streamModel after sync: ',
    //   JSON.stringify(streamModel.state, null, 2)
    // );
  });

  it('immutable, authenticated encryption vault', async () => {
    const storage = await Gaurdian.deployed();
    const eventStore = new T.EventStore({
      eventStoreArtifact: Gaurdian,
      ...transmuteConfig
    });
    eventStore.eventStoreContractInstance = await eventStore.eventStoreContract.at(
      storage.address
    );

    let encrypted_msg = await encryptMessage(
      dangerous_message,
      nat.privateKey,
      bart.public
    );

    let event = {
      key: {
        type: 'ENCRYPTED_EVENT_WRITTEN'
      },
      value: {
        encrypted_msg: encrypted_msg,
        timestamp: moment().unix(),
        for: bart.public
      }
    };
    let result = await eventStore.write(accounts[0], event.key, event.value);
    // console.log(JSON.stringify(result, null, 2));
  });
});
