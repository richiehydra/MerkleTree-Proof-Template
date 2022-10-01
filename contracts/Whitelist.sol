// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.5.0 < 0.9.0;
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
contract WhiteList{
    bytes32 public merkleroot;

    constructor(bytes32 _root)
    {
        merkleroot=_root;
    }

    function Verfication(bytes32[] memory proof,uint maxallowance)public view returns(bool)
    {
        bytes32 leaf=keccak256(abi.encode(msg.sender,maxallowance));
        bool verified=MerkleProof.verify(proof, merkleroot, leaf);
        return verified;
    }
}
