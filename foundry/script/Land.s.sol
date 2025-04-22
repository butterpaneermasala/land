// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.26;
import {Script} from "lib/forge-std/src/Script.sol";
import {Land} from "../src/LandRegistry.sol";

contract DeployLand is Script {
    Land land;

    function run() external returns (Land) {
        vm.startBroadcast();
        land = new Land();
        vm.stopBroadcast();
        return land;
    }
}
