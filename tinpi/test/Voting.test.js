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

    await voting
        .methods
        .addTopic(
            "Test Topic",
            "Test Topic Info")
        .send({from: accounts[0], gas: 3000000});
});

describe('Create and vote for topics', () => {
    it('deploys a contract', () => {
        assert.ok(voting.options.address);
    });
    it('adds a topic', () => {
        voting
            .methods
            .addTopic(
                "Test Topic 2",
                "Topic Descrip 2")
            .send({from: accounts[0], gas: 3000000})
            .on('transactionHash', function (hash) {
            })
            .on('confirmation', function (confirmationNumber, receipt) {
            })
            .on('receipt', function (receipt) {
                const retVals = receipt.events.TopicCreateLog.returnValues;
                console.log(
                    "0Receipt: ",
                    JSON.stringify(retVals));
                assert.equal(retVals._name, "Test Topic 2");
                assert.equal(retVals._desc, "Topic Descrip 2");
            })
            .catch(e => {
                console.log(e);
                assert.fail("", e, "Error creating topic");
            })
    });
    it('fetches topic ids', () => {
        assert
            .ok(voting
                .methods
                .getTopicId(
                    0)
                .send({from: accounts[0], gas: 3000000})
                .on('transactionHash', function (hash) {
                    // console.log(hash);
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    // console.log(confirmationNumber, receipt);
                })
                .on('receipt', function (receipt) {
                    console.log(
                        "1Receipt: ",
                        JSON.stringify(receipt.events.TopicIdLog.returnValues));
                })
                .catch(e => console.log(e))
            );
    });
    it('fetches topic', () => {
        assert
            .ok(voting
                .methods
                .getTopic(
                    0)
                .send({from: accounts[0], gas: 3000000})
                .on('transactionHash', function (hash) {
                    console.log("Tx Hash:", hash);
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    console.log("Confirmation: ", confirmationNumber, receipt);
                })
                .on('receipt', function (receipt) {
                    console.log(
                        "2Receipt: ",
                        JSON.stringify(receipt.events.TopicFetchLog.returnValues));
                })
                .catch(e => console.log(e))
            );
    });
    it('counts topics', () => {
        assert
            .ok(voting
                .methods
                .getTopicsCount()
                .send({from: accounts[0], gas: 3000000})
                .on('transactionHash', function (hash) {
                    // console.log(hash);
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    // console.log(confirmationNumber, receipt);
                })
                .on('receipt', function (receipt) {
                    console.log(
                        // JSON.stringify(receipt.events)
                    );
                })
                .catch(e => console.log(e))
            );
    });
});
