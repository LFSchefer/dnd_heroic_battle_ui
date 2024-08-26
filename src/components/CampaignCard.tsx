import { useState } from "react";
import { Campaign } from "../models/Campaign";

export default function CampaignCard(params:Campaign) {

  const [campaign, setCampaign] = useState<Campaign>(params)

  return (
    <li className="campaign-card bg-blue-200 w-full max-w-96 rounded-lg shadow-md py-4 px-4 my-5">
      <p className="link">{campaign.campaignName}</p>
      <p>Creation date: {new Date(campaign.creationDate).toDateString()}</p>
    </li>
  )

}
