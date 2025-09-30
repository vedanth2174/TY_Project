// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DocumentRegistry {
    struct Document {
        bytes32 docHash;
        string cid;
        address issuer;
        address issuedTo;
        uint256 timestamp;
        bool revoked;
    }

    mapping(bytes32 => Document) public documents;

    event DocumentIssued(bytes32 indexed docHash, string cid, address indexed issuer, address indexed issuedTo);
    event DocumentRevoked(bytes32 indexed docHash);

    function issueDocument(bytes32 docHash, string memory cid, address issuedTo) public {
        require(documents[docHash].timestamp == 0, "Already exists");
        documents[docHash] = Document(docHash, cid, msg.sender, issuedTo, block.timestamp, false);
        emit DocumentIssued(docHash, cid, msg.sender, issuedTo);
    }

    function revokeDocument(bytes32 docHash) public {
        require(documents[docHash].issuer == msg.sender, "Only issuer can revoke");
        documents[docHash].revoked = true;
        emit DocumentRevoked(docHash);
    }

    function verifyDocument(bytes32 docHash) public view returns (bool, string memory, address, address, uint256, bool) {
        Document memory doc = documents[docHash];
        return (doc.timestamp != 0, doc.cid, doc.issuer, doc.issuedTo, doc.timestamp, doc.revoked);
    }
}
