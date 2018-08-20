const chai = require('chai');
chai.use(require('chai-string'));
global.expect = chai.expect;

const takeScreenshot = async err => await this.client.screenshot('error').then(() => {
  throw err;
});

global.test = (name, instructions) => it(name, () => {
  return instructions().catch();
});

global.scenario = (name, tests, clientName, close = false) =>
  describe(name, () => {
    const PrestClient = require("./mocha/clients/" + clientName);
    const client = new PrestClient();
    before(() => this.client = client);
    tests(client);
    if (close) {
      after(async () => {
        await this.client.stopTracing();
        await this.client.close();
      });
    }
  });