const Gaurdian = artifacts.require('./ESigner.sol');

contract('Gaurdian', accounts => {
  it('constructor works', async () => {
    const storage = await Gaurdian.deployed();
    assert(accounts[0] === (await storage.owner()));
  });
});
