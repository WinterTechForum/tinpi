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

    event TopicFetchLog(
        uint _id,
        string _name,
        string _desc,
        address _creator,
        uint _votes);

    event TopicCreateLog(
        uint _id,
        string _name,
        string _desc,
        address _creator,
        uint _votes);

    uint lastTopicId = 0;
    uint lastParticipantId = 0;
    mapping(uint => Topic) topics;
    mapping(uint => Participant) participants;

    function addTopic(string name, string description)
    public returns (uint id) {
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


        TopicCreateLog(topicId, name, description, creator, 0);

        return topicId;
    }

    function generateTopicId() private returns (uint newId) {
        newId = lastTopicId + 1;
        lastTopicId = newId;
    }

    function generateParticipantId() private returns (uint newId) {
        newId = lastParticipantId + 1;
        lastParticipantId = newId;
    }


    function getTopicId(uint idx)
    public constant returns (uint topid) {
        topid = topics[idx].id;
        TopicIdLog(topid);
    }

    function getTopic(uint idx) public constant returns
    (uint _id, string _name, string _desc, address _creator, uint _votes)
    {

        _id = topics[idx].id;
        _name = topics[idx].name;
        _desc = topics[idx].description;
        _creator = topics[idx].creator;
        _votes = topics[idx].votes.length;

        TopicFetchLog(
            _id, _name, _desc, _creator, _votes
        );


    }

    function getTopicsCount() public constant returns (uint _count) {
        _count = lastTopicId;
    }
}
