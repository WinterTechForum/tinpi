const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface, bytecode} = require('../compile');

let accounts;
let voting;

beforeEach(async () => {
    // Get a list of all accounts from Ganache
    accounts = await web3.eth.getAccounts();

    // Use the first account found for tests
    voting = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: []})
        .send({from: accounts[0], gas: 1000000, gasPrice: '50'});

    voting.setProvider(provider);
});

describe('Voting - has addr', () => {
    it('deploys a contract', () => {
        assert.ok(voting.options.address);
    });
});


describe('Voting - calls addTopic', () => {
    it('deploys a contract', () => {
        assert
            .ok(voting
                .methods
                .addTopic(web3.utils.asciiToHex("name"),
                    web3.utils.asciiToHex("desc and stuff"))
                .call({from: web3.eth.accounts[0]})
                .then(contractInstance => {
                    console.log(contractInstance.options)
                    return contractInstance
                }).catch(e => {
                    console.error(e);
                    assert.equal(0, 1);
                })
            );
    });
});