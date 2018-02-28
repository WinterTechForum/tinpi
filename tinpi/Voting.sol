pragma solidity ^0.4.18; //We have to specify what version of compiler this code will use

contract Voting {
    struct Topic {
        uint id;
        bytes32 name;
        bytes32 description;
        address creator;
        address[] votes;
    }

    mapping(uint => Topic) public topics;

    function Voting() public {
    }

    function addTopic(bytes32 name, bytes32 description) public returns (uint8) {
        // ensure topic doesn't exist
        // create topic; add to topics; return id
    }

    function removeTopic(uint id) returns (bool) {
        // ensure topic exists
        // remove topic from topics; return true on success
    }

    function voteForTopic(uint id) public returns (bool) {
        // ensure topic exists
        // ensure address of caller hasn't already voted for this topic
        // add caller's address to the `votes` field of the topic
        // return true on success
    }

    function rescindVoteForTopic(uint id) public returns (bool) {
        // ensure topic exists
        // ensure address of caller has already voted for this topic
        // remove caller's address from the `votes` field of the topic
        // return true on success
    }

    function totalVotesForTopic(uint id) view public returns (uint8) {
        // ensure topic exists
        // return count of address in the `votes` field
    }

    function getAllTopicsAndVoteCounts() view public returns (mapping(uint => uint8)) {
        // sort topics by length of `votes` field
        // return mapping of topic `id` to length of `votes` field
    }
}

