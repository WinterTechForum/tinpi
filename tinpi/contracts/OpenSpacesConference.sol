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

    event TopicCountLog(uint count);

    uint lastTopicId = 0;
    uint lastParticipantId = 0;
    mapping(uint => Topic) topics;
    mapping(uint => Participant) participants;

    function addTopic(string name, string description)
    public returns (uint topicId) {
        // create topic; add to topics
        address creator = msg.sender;

        topicId = lastTopicId++;
        topics[topicId] = Topic(
            topicId,
            name,
            description,
            creator,
            new address[](0)
        );


        TopicCreateLog(topicId, name, description, creator, 0);
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
        TopicCountLog(lastTopicId);
        _count = lastTopicId;
    }
}
