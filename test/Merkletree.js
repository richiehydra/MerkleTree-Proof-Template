const {expect}=require("chai")
const {ethers} =require("hardhat");
const keccak256=require("keccak256");
const {MerkleTree}=require("merkletreejs");

function EncodeLeaf(address,spots)
{
    return ethers.utils.defaultAbiCoder.encode(["address","uint"],[address,spots]);
}

describe("Verify The Merkle tree root",()=>
{
    it("It show verify the root of the tree",async()=>
    {
     const [owner,addr1,addr2,addr3,addr4,addr5]=await ethers.getSigners();
     const list=[
      EncodeLeaf(owner.address,2),
      EncodeLeaf(addr1.address,2),
      EncodeLeaf(addr2.address,2),
      EncodeLeaf(addr3.address,2),
      EncodeLeaf(addr4.address,2),
      EncodeLeaf(addr5.address,2),
     ];

     const merkleTree=new MerkleTree(list,keccak256,{
        hashLeaves:true,
        sortPairs:true,})
 

     const root=await merkleTree.getHexRoot()
     const WhiteList=await ethers.getContractFactory("WhiteList");
     const Whitelist=await WhiteList.deploy(root);
     await Whitelist.deployed();

     const leaf = keccak256(list[0]);
    const proof = merkleTree.getHexProof(leaf);

   
    let verified = await Whitelist.Verfication(proof, 2);
    expect(verified).to.equal(true);
   
    verified = await Whitelist.Verfication([], 2);
    expect(verified).to.equal(false);

     })
});
