const openpgp = require('openpgp');
const _sodium = require('libsodium-wrappers');
const utils = require('ethereumjs-util');
const Wallet = require('ethereumjs-wallet');
console.log('registration_to_pgp test....');

const reg_data = require('./reg_data.json');
let sodium;

(async () => {
  await _sodium.ready;
  sodium = _sodium;

  console.log(
    'A registerd users looks like: \n',
    JSON.stringify(reg_data, null, 2)
  );

  let personId = reg_data.firstCanidate.personId;

  let name = 'john doe';
  let email = `${personId}@mypass.transmute.live`;
  let passphrase = 'correct horse battery staple';

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

  let userProfile = {
    address: wallet_address,
    public: secPrivKey.toPublic().armor(),
    privateKey: secPrivKey.armor()
  };

  console.log('Your keys are: \n', JSON.stringify(userProfile, null, 2));
})();
