const CampaignFactory = require("/home/lavesh/Documents/Dcube/CrowdFunding/HardHat/artifacts/contracts/Campaign.sol/CampaignFactory.json");
const { ethers } = require("ethers");
require("dotenv").config({ path: "./.env.local" });

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.QUICKNODE_HTTP_URL
  );

  const contract = new ethers.Contract(
     "HTTP://172.27.224.1:7545",
    CampaignFactory.abi,
     provider
  );

  const getDeployedCampaign=contract.filters.campaignCreated();
  let events=await contract.queryFilter(getDeployedCampaign);
  let event= events.reverse();
  console.log(event);
}
main();