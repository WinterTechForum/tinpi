const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface, bytecode} = require('../compile');

let accounts;
let conference;

beforeEach(async () => {
    // Get a list of all accounts from Ganache
    accounts = await web3.eth.getAccounts();

    // Use the first account found for tests
    conference = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: []})
        .send({from: accounts[0], gas: 2000000, gasPrice: '5'});

    conference.setProvider(provider);

    await conference
        .methods
        .addTopic(
            "Test Topic",
            "Test Topic Info")
        .send({from: accounts[0], gas: 3000000});


    await conference
        .methods
        .addParticipant(
            "First Last",
            "solc,skiing")
        .send({from: accounts[0], gas: 3000000});
});

describe('Create topics and participants and votes', () => {
    //TODO a competition test, with competition added to e2e test also
    it('deploys a contract', () => {
        assert.ok(conference.options.address);
    });
    it('e2e', async () => {

        const topicReceipt1 = await conference
            .methods
            .addTopic(
                "E2E Topic 1",
                "E2E Desc 1")
            .send({from: accounts[0], gas: 3000000});


        const topicReceipt2 = await conference
            .methods
            .addTopic(
                "E2E Topic 2",
                "E2E Desc 2")
            .send({from: accounts[1], gas: 3000000});


        const topicReceipt3 = await conference
            .methods
            .addTopic(
                "E2E Topic 3",
                "E2E Desc 3")
            .send({from: accounts[2], gas: 3000000});



        const voteReceipt1 = await conference
            .methods
            .voteForTopic(0, 0)
            .send({from: accounts[0], gas: 3000000});


        const voteReceipt2 = await conference
            .methods
            .voteForTopic(1, 0)
            .send({from: accounts[1], gas: 3000000});


        const voteReceipt3 = await conference
            .methods
            .voteForTopic(1, 0)
            .send({from: accounts[2], gas: 3000000});

        const retVals1 = voteReceipt1.events.VoteLog.returnValues;
        console.log("Vote retvals: ", retVals1);
        assert.equal(retVals1.voteCount, 1);


        //TODO this e2e test

    });
    it('votes for topic', () => {
        assert
            .ok(conference
                .methods
                .voteForTopic(0, 0)
                .send({from: accounts[0], gas: 3000000})
                .on('transactionHash', function (hash) {
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                })
                .on('receipt', function (receipt) {
                    const retVals = receipt.events.VoteLog.returnValues;
                    console.log("Vote retvals: ", retVals);
                    assert.equal(retVals.voteCount, 1);
                })
                .catch(e => {
                    console.log(e);
                    assert.fail("", e, "Error voting");
                }))
    });
    it('votes for topic are allowed only by address owner', () => {
        assert
            .ok(conference
                .methods
                .voteForTopic(0, 0)
                .send({from: accounts[1], gas: 3000000})
                .on('transactionHash', function (hash) {
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                })
                .on('receipt', function (receipt) {
                    const retVals = receipt.events.VoteLog.returnValues;
                    console.log("Vote retvals for vote not allowed: ", retVals);
                    assert.equal(retVals.voteCount, 0);
                })
                .catch(e => {
                    console.log(e);
                    assert.fail("", e, "Error voting");
                }))
    });
    it('adds a participant', () => {
        assert
            .ok(conference
                .methods
                .addParticipant(
                    "First2 Last2",
                    "clojure,datomic")
                .send({from: accounts[0], gas: 3000000})
                .on('transactionHash', function (hash) {
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                })
                .on('receipt', function (receipt) {
                    const retVals = receipt.events.ParticipantCreateLog.returnValues;
                    assert.equal(retVals._name, "First2 Last2");
                    assert.equal(retVals._interests, "clojure,datomic");
                })
                .catch(e => {
                    console.log(e);
                    assert.fail("", e, "Error creating participant");
                }))
    });
    it('fetches participant', () => {
        assert
            .ok(conference
                .methods
                .getParticipant(
                    0)
                .send({from: accounts[0], gas: 3000000})
                .on('transactionHash', function (hash) {
                    // console.log("Tx Hash:", hash);
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    // console.log("Confirmation: ", confirmationNumber, receipt);
                })
                .on('receipt', function (receipt) {
                    const retVals = receipt.events.ParticipantFetchLog.returnValues;

                    assert.equal(retVals._name, "First Last", "Created participant name");
                })
                .catch(e => console.log(e))
            );
    });
    it('adds a topic', () => {
        assert
            .ok(conference
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
                }))
    });
    it('fetches topic ids', () => {
        assert
            .ok(conference
                .methods
                .getTopicId(
                    0)
                .send({from: accounts[0], gas: 3000000})
                .on('transactionHash', function (hash) {
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                })
                .on('receipt', function (receipt) {
                    const retVals = receipt.events.TopicIdLog.returnValues;
                    console.log(
                        "1Receipt: ",
                        JSON.stringify(retVals));
                    assert.equal(retVals._topicId, 0);
                })
                .catch(e => console.log(e))
            );
    });
    it('fetches topic', () => {
        assert
            .ok(conference
                .methods
                .getTopic(
                    0)
                .send({from: accounts[0], gas: 3000000})
                .on('transactionHash', function (hash) {
                    // console.log("Tx Hash:", hash);
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    // console.log("Confirmation: ", confirmationNumber, receipt);
                })
                .on('receipt', function (receipt) {
                    const retVals = receipt.events.TopicFetchLog.returnValues;
                    console.log(
                        "2Receipt: ",
                        JSON.stringify(retVals));
                    assert.equal(retVals._name, "Test Topic", "Created topic name");
                })
                .catch(e => console.log(e))
            );
    });
    it('counts topics', () => {
        assert
            .ok(conference
                .methods
                .getTopicsCount()
                .send({from: accounts[0], gas: 3000000})
                .on('transactionHash', function (hash) {
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                })
                .on('receipt', function (receipt) {
                    const retVals = receipt.events.TopicCountLog.returnValues;
                    assert.equal(retVals.count, 1);
                })
                .catch(e => console.log(e))
            );
    });
});
