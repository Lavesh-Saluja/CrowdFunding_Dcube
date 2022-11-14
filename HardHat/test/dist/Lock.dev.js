"use strict";

var CampaignFactory = require("/home/lavesh/Documents/Dcube/CrowdFunding/HardHat/artifacts/contracts/Campaign.sol/CampaignFactory.json");

var _require = require("ethers"),
    ethers = _require.ethers;

require("dotenv").config({
  path: "./.env.local"
});

var main = function main() {
  var provider, contract, getDeployedCampaign, events, event;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          provider = new ethers.providers.JsonRpcProvider(process.env.QUICKNODE_HTTP_URL);
          contract = new ethers.Contract("HTTP://172.27.224.1:7545", CampaignFactory.abi, provider);
          getDeployedCampaign = contract.filters.campaignCreated();
          _context.next = 5;
          return regeneratorRuntime.awrap(contract.queryFilter(getDeployedCampaign));

        case 5:
          events = _context.sent;
          event = events.reverse();
          console.log(event);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

main();