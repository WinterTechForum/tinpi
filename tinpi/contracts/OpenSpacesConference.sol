pragma solidity ^0.4.18;

contract OpenSpacesConference {

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

    event ParticipantCreateLog(
        uint _id,
        string _name,
        string _interests
    );

    event ParticipantFetchLog(
        uint _id,
        string _name,
        string _interests,
        address _voterAddr,
        uint[] _topicsVoted
    );

    event VoteLog(uint voteCount);

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
        uint[] topicsVoted;
    }

    uint lastTopicId = 0;
    uint lastParticipantId = 0;
    mapping(uint => Topic) topics;
    mapping(uint => Participant) participants;

    function voteForTopic(uint topicId, uint participantId)
    public  {
        address voter = msg.sender;
        Participant p = participants[participantId];
        participantId = p.id;
        if (p.voterAddr == voter) {
            Topic t = topics[topicId];
            address[] topicsVotes = t.votes;
            uint[] votersTopics = p.topicsVoted;
            topicsVotes.push(voter);
            votersTopics.push(topicId);
            Participant memory p2 = Participant(p.id, p.name, p.interests, voter, votersTopics);
            Topic memory t2 = Topic(t.id, t.name, t.description, t.creator, topicsVotes);
            participants[participantId] = p2;
            topics[topicId] = t2;
            VoteLog(topicsVotes.length);
        } else {
            VoteLog(0);
        }
    }

    function addParticipant(string name, string interests)
    public returns (uint participantId) {
        address creator = msg.sender;
        participantId = lastParticipantId++;
        participants[participantId] = Participant(participantId, name, interests, creator, new uint[](0));
        ParticipantCreateLog(participantId, name, interests);
    }

    function addTopic(string name, string description)
    public
    returns (uint topicId) {
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
    public constant
    returns (uint topid) {
        topid = topics[idx].id;
        TopicIdLog(topid);
    }

    function getTopic(uint idx)
    public constant
    returns (uint _id, string _name, string _desc, address _creator, uint _votes)
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

    function getParticipant(uint idx)
    public constant
    returns (uint _id, string _name, string _interests, address _voteAddr, uint[] _topicsVoted)
    {

        _id = participants[idx].id;
        _name = participants[idx].name;
        _interests = participants[idx].interests;
        _voteAddr = participants[idx].voterAddr;
        _topicsVoted = participants[idx].topicsVoted;
        ParticipantFetchLog(_id, _name, _interests, _voteAddr, _topicsVoted);
    }

    function getTopicsCount()
    public constant
    returns (uint _count) {
        TopicCountLog(lastTopicId);
        _count = lastTopicId;
    }
}
