pragma solidity ^0.4.18;

contract Voting {
    struct Topic {
        uint id;
        bytes32 name;
        bytes32 description;
        address creator;
        address[] votes;
    }

    Topic[] public topics;
    uint lastId = 0;

    function Voting() public {
    }

    function addTopic(bytes32 name, bytes32 description) public returns (uint) {
        // ensure topic doesn't exist
        for (uint i = 0; i < topics.length; i++) {
            Topic memory t = topics[i];

            if (t.name == name && t.description == description) {
                return 0;
            }
        }

        // create topic; add to topics
        address creator = msg.sender;

        Topic memory topic = Topic({
            id : generateTopicId(),
            name : name,
            description : description,
            creator : creator,
            votes : new address[](0)
            });

        topics.push(topic);

        return topic.id;
    }

    function removeTopic(uint id) public returns (bool) {
        // ensure topic exists
        // remove topic from topics; return true on success
        for(uint i=0; i < topics.length; i++) {
            Topic memory t = topics[i];

            if (t.id == id) {
                removeFromTopic(topics, i);
                return true;
            }   
        }
        return false;
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

    function getAllTopicsAndVoteCounts() view public returns (uint[], bytes32[], bytes32[], address, uint[]) {
        // sort topics by length of `votes` field
        // return list of topics
        uint[] memory ids = new uint[](topics.length);
        bytes32[] memory names = new bytes32[](topics.length);
        bytes32[] memory descriptions = new bytes32[](topics.length);
        uint[] memory voteCounts = new uint[](topics.length);

        for (uint i = 0; i < topics.length; i++) {
            Topic storage topic = topics[i];
            ids[i] = topic.id;
            names[i] = topic.name;
            descriptions[i] = topic.description;
            voteCounts[i] = topic.votes.length;
        }

        return (ids, names, descriptions, topic.creator, voteCounts);
    }

    function generateTopicId() private returns (uint newId) {
        newId = lastId + 1;
        lastId = newId;
    }

    // removes element at specified index from an array
    function removeFromTopic(Topic[] array, uint index) internal returns(Topic[] value) {
        if (index >= array.length) 
            return;

        Topic[] memory arrayNew = new Topic[](array.length-1);
        for (uint i = 0; i<arrayNew.length; i++) {
            if (i != index && i<index) {
                arrayNew[i] = array[i];
            } else {
                arrayNew[i] = array[i+1];
            }
        }
        delete array;
        return arrayNew;
    }
}

