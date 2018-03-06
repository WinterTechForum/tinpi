const path = require('path');
const fs = require('fs');
const solc = require('solc');

const votingPath = path.resolve(__dirname, 'contracts', 'OpenSpacesConference.sol');
const source = fs.readFileSync(votingPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':OpenSpacesConference'];