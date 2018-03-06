pragma solidity ^0.4.18;

contract OpenSpacesConference {

    struct Topic {
        uint id;
        string name;
        string description;
        address creator;
        address[] votes;
    }

    struct Participant {
        uint id;
        string name;
        string interests;
        address voterAddr;
    }


    event TopicIdLog(uint _topicId);
    event TopicLog(
        uint _id,
        string _name,
        string _desc,
        address _creator,
        uint _votes);

    uint lastId = 0;
    mapping(uint => Topic) topics;

    mapping(uint => Participant) participants;

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
        TopicIdLog(idx);
        return topics[idx].id;
    }

    function getTopic(uint idx) public constant returns
    (uint _id, string _name, string _desc, address _creator, uint _votes)
    {

        TopicLog(
            topics[idx].id,
            topics[idx].name,
            topics[idx].description,
            topics[idx].creator,
            topics[idx].votes.length
        );
        return (
        topics[idx].id,
        topics[idx].name,
        topics[idx].description,
        topics[idx].creator,
        topics[idx].votes.length
        );
    }

    function getTopicsCount() public constant returns (uint _count) {
        return lastId;
    }
}
