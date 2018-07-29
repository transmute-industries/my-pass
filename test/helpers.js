const openpgp = require('openpgp');
const _sodium = require('libsodium-wrappers');
const utils = require('ethereumjs-util');
const web3Utils = require('web3-utils')
const Wallet = require('ethereumjs-wallet');

const faker = require('faker');
const Transaction = require('ethereumjs-tx');

const getFakeProfile = async () => {
  await _sodium.ready;
  let sodium = _sodium;

  let name = faker.name.findName();
  let email = faker.internet.email();
  let passphrase = faker.company.bsAdjective();

  const secOptions = {
    userIds: [
      {
        name: name,
        email: email
      }
    ],
    curve: 'secp256k1',
    passphrase: passphrase
  };

  const secKeyPair = await openpgp.generateKey(secOptions);
  const secPrivKey = openpgp.key.readArmored(secKeyPair.privateKeyArmored)
    .keys[0];
  await secPrivKey.decrypt(passphrase);
  const secPrivKeyPrimaryKey = secPrivKey.primaryKey;
  const privateKeyHex = sodium.to_hex(secPrivKeyPrimaryKey.params[2].data);
  const wallet = Wallet.fromPrivateKey(new Buffer(privateKeyHex, 'hex'));
  const wallet_address = '0x' + wallet.getAddress().toString('hex');

  return {
    name,
    email,
    wallet,
    address: wallet_address,
    public: secPrivKey.toPublic().armor(),
    privateKey: secPrivKey.armor(),
    passphrase
  };
};

const encryptMessage = async (message, privkey, pubkey) => {
  const privKeyObj = openpgp.key.readArmored(privkey).keys[0];
  // await privKeyObj.decrypt(passphrase);

  const options = {
    data: message, // input as String (or Uint8Array)
    publicKeys: openpgp.key.readArmored(pubkey).keys, // for encryption
    privateKeys: [privKeyObj] // for signing (optional)
  };

  return openpgp.encrypt(options).then(ciphertext => {
    let encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
    return encrypted;
  });
};

const decryptMessage = async (encrypted, privkey, pubkey) => {
  const privKeyObj = openpgp.key.readArmored(privkey).keys[0];
  // await privKeyObj.decrypt(passphrase);

  const options = {
    message: openpgp.message.readArmored(encrypted), // parse armored message
    publicKeys: openpgp.key.readArmored(pubkey).keys, // for verification (optional)
    privateKeys: [privKeyObj] // for decryption
  };

  return openpgp.decrypt(options).then(plaintext => {
    // console.log(plaintext.data);
    return plaintext.data; // 'Hello, World!'
  });
};

const sendEth = async (web3, from, to, amountETH) => {
  let receipt = await web3.eth.sendTransaction({
    from: from,
    to: to,
    value: web3.toWei(amountETH, 'ether'),
    gasLimit: 21000,
    gasPrice: 20000000000
  });
  return receipt;
};

const getBalance = (web3, someAddress) => {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(someAddress, (err, balance) => {
      if (err) {
        reject(err);
      } else {
        resolve(balance.toNumber());
      }
    });
  });
};

const sendEthFromWallet = async (web3, wallet, amountEth, toAdress) => {
  const txData = {
    nonce: '0x00',
    gasPrice: '0x04a817c800',
    gasLimit: '0x5208',
    to: toAdress,
    value: web3Utils.numberToHex(web3.toWei(amountEth, 'ether')),
    data: '0x',
    chainId: 0
  };
  const tx = new Transaction(txData);
  tx.sign(wallet.getPrivateKey());
  return await web3.eth.sendRawTransaction(
    '0x' + tx.serialize().toString('hex')
  );
};

module.exports = {
  getFakeProfile,
  encryptMessage,
  decryptMessage,
  sendEth,
  getBalance,
  sendEthFromWallet
};
