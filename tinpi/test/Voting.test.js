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
        .send({from: accounts[0], gas: 2000000, gasPrice: '5'});

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
                .addTopic(
                    web3.utils.asciiToHex("name"),
                    web3.utils.asciiToHex("desc and stuff"))
                .send({from: accounts[0], gas: 3000000})
                .on('transactionHash', function (hash) {
                    console.log(hash);
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    console.log(confirmationNumber, receipt);
                })
                .on('receipt', function (receipt) {
                    console.log(receipt);
                })
                .catch(e => console.log(e))
            );
    });
});


describe('Voting - gets topic by ID', () => {
    it('works', () => {
        assert
            .ok(voting
                .methods
                .getTopicId(
                    0)
                .send({from: accounts[0], gas: 3000000})
                .on('transactionHash', function (hash) {
                    console.log(hash);
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    console.log(confirmationNumber, receipt);
                })
                .on('receipt', function (receipt) {
                    console.log(receipt);
                })
                .catch(e => console.log(e))
            );
    });
});