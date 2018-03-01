pragma solidity ^0.4.18;
contract Voting {
    struct Topic {
        uint id;
        string name;
        string description;
        address creator;
        address[] votes;
    }

    event Stuff(uint _topicId);

    uint lastId = 0;
    mapping (uint => Topic) topics;
    function addTopic(string name, string description) public returns (uint id) {
        // create topic; add to topics
        address creator = msg.sender;

        uint topicId = generateTopicId();
        topics[topicId] = Topic({
            id : topicId,
            name : name,
            description : description,
            creator : creator,
            votes : new address[](0)
            });

        return topicId;
    }
    function generateTopicId() private returns (uint newId) {
        newId = lastId + 1;
        lastId = newId;
    }


    function getTopicId(uint idx) public constant returns (uint topid) {
        Stuff(idx);
        return topics[idx].id;
    }
}
