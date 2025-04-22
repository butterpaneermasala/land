// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";

/**
 * @title Land Registration System with Multi-Signature Transfer Approval
 * @author Sahil Kaushik
 * @notice This contract digitizes land registration and ensures land transfers require approval from the owner, registrar, and two witnesses.
 */

contract Land is ERC721, Ownable {
    /// @notice Structure for agricultural land
    struct Agro {
        OwnerDetails owner;
        string basrakramank;
        string district;
        string tehsil;
        string gram;
        string hectare;
        string father;
        string map;
        string b1;
        string p2;
    }

    /// @notice Structure for converted (non-agriculture) land
    struct Converted {
        OwnerDetails owner;
        string bhukhand;
        string district;
        string tehsil;
        string gram;
        uint256 blockNo;
        string father;
        uint256 foot;
        string map;
    }

    /// @notice Structure to store land owner details
    struct OwnerDetails {
        string name;
        address id;
        uint256 tokenId;
    }

    /// @notice Structure for signature approvals
    struct Sign {
        address signer;
        string name;
        bool flag;
    }

    /// @notice Structure to track approvals for land transfer
    struct TransferApproval {
        Sign owner;
        Sign registrar;
        Sign witness1;
        Sign witness2;
        address newOwner;
        string newOwnerName;
        string newFather;
    }

    mapping(uint256 => Converted) public convertedLands;
    mapping(uint256 => Agro) public agriculturalLands;
    mapping(uint256 => TransferApproval) public transferApprovals;
    address public registrar;

    uint256 private totalCounter;

    /// @notice Events
    event ConvertedLandRegistered(
        string name,
        address indexed id,
        uint256 indexed tokenId,
        string bhukhand,
        string district,
        string tehsil,
        string gram,
        uint256 blockNo,
        string father,
        uint256 foot,
        string map
    );

    event AgroLandRegistered(
        string name,
        address indexed id,
        uint256 indexed tokenId,
        string basrakramank,
        string district,
        string tehsil,
        string gram,
        string hectare,
        string father,
        string map,
        string b1,
        string p2
    );

    event LandTransferInitiated(
        uint256 indexed tokenId,
        address indexed newOwner
    );

    event LandTransferApproved(
        uint256 indexed tokenId,
        address indexed approver
    );

    event LandTransferred(
        uint256 indexed tokenId,
        address indexed from,
        address indexed to,
        string newOwnerName,
        string newFather
    );

    /// @notice Constructor initializes ERC-721 token collection
    constructor() ERC721("Property", "PROP") Ownable(msg.sender) {
        totalCounter = 0;
    }

    /// @notice Register converted land
    function registerConverted(
        string memory name,
        address to,
        string memory bhukhand,
        string memory district,
        string memory tehsil,
        string memory gram,
        uint256 blockNo,
        string memory father,
        uint256 foot,
        string memory map
    ) external onlyOwner {
        totalCounter++;
        uint256 tokenId = totalCounter;
        _safeMint(to, tokenId);

        convertedLands[tokenId] = Converted(
            OwnerDetails(name, to, tokenId),
            bhukhand,
            district,
            tehsil,
            gram,
            blockNo,
            father,
            foot,
            map
        );

        emit ConvertedLandRegistered(
            name,
            to,
            tokenId,
            bhukhand,
            district,
            tehsil,
            gram,
            blockNo,
            father,
            foot,
            map
        );
    }

    /// @notice Register agricultural land
    function registerAgro(
        string memory name,
        address to,
        string memory basrakramank,
        string memory district,
        string memory tehsil,
        string memory gram,
        string memory hectare,
        string memory father,
        string memory map,
        string memory b1,
        string memory p2
    ) external onlyOwner {
        totalCounter++;
        uint256 tokenId = totalCounter;
        _safeMint(to, tokenId);

        agriculturalLands[tokenId] = Agro(
            OwnerDetails(name, to, tokenId),
            basrakramank,
            district,
            tehsil,
            gram,
            hectare,
            father,
            map,
            b1,
            p2
        );

        emit AgroLandRegistered(
            name,
            to,
            tokenId,
            basrakramank,
            district,
            tehsil,
            gram,
            hectare,
            father,
            map,
            b1,
            p2
        );
    }

    function setTransferDetails(
        uint256 tokenId,
        string memory name,
        address to,
        string memory regName,
        address regAddress,
        string memory witness1Name,
        address witness1Address,
        string memory witness2Name,
        address witness2Address,
        address newowner,
        string memory ownername,
        string memory father
    ) external {
        transferApprovals[tokenId] = TransferApproval(
            Sign(to, name, false),
            Sign(regAddress, regName, false),
            Sign(witness1Address, witness1Name, false),
            Sign(witness2Address, witness2Name, false),
            newowner,
            ownername,
            father
        );
    }

    /// @notice Approve transfer - Owner, Registrar, Witnesses
    function approveTransfer(uint256 tokenId) external {
        TransferApproval storage approval = transferApprovals[tokenId];
        require(approval.newOwner != address(0), "Transfer not initiated");

        if (msg.sender == approval.owner.signer) {
            approval.owner.flag = true;
        } else if (msg.sender == approval.registrar.signer) {
            approval.registrar.flag = true;
        } else if (msg.sender == approval.witness1.signer) {
            approval.witness1.flag = true;
        } else if (msg.sender == approval.witness2.signer) {
            approval.witness2.flag = true;
        } else {
            revert("Not authorized to approve");
        }

        emit LandTransferApproved(tokenId, msg.sender);
    }

    /// @notice Execute transfer after all approvals
    function executeTransfer(uint256 tokenId) external {
        TransferApproval storage approval = transferApprovals[tokenId];
        require(
            approval.owner.flag &&
                approval.registrar.flag &&
                approval.witness1.flag &&
                approval.witness2.flag,
            "All approvals required"
        );

        address currentOwner = ownerOf(tokenId);
        _transfer(currentOwner, approval.newOwner, tokenId);

        if (convertedLands[tokenId].blockNo > 0) {
            convertedLands[tokenId].owner = OwnerDetails(
                approval.newOwnerName,
                approval.newOwner,
                tokenId
            );
            convertedLands[tokenId].father = approval.newFather;
        } else {
            agriculturalLands[tokenId].owner = OwnerDetails(
                approval.newOwnerName,
                approval.newOwner,
                tokenId
            );
            agriculturalLands[tokenId].father = approval.newFather;
        }

        delete transferApprovals[tokenId];

        emit LandTransferred(
            tokenId,
            currentOwner,
            approval.newOwner,
            approval.newOwnerName,
            approval.newFather
        );
    }

    /// @notice Function to get owner details and land information
    function getOwnerDetails(
        uint256 tokenId
    )
        external
        view
        returns (
            string memory name,
            address ownerAddress,
            string memory landType,
            string memory district,
            string memory tehsil,
            string memory gram
        )
    {
        if (convertedLands[tokenId].blockNo > 0) {
            return (
                convertedLands[tokenId].owner.name,
                convertedLands[tokenId].owner.id,
                "Converted",
                convertedLands[tokenId].district,
                convertedLands[tokenId].tehsil,
                convertedLands[tokenId].gram
            );
        } else {
            return (
                agriculturalLands[tokenId].owner.name,
                agriculturalLands[tokenId].owner.id,
                "Agricultural",
                agriculturalLands[tokenId].district,
                agriculturalLands[tokenId].tehsil,
                agriculturalLands[tokenId].gram
            );
        }
    }
}
