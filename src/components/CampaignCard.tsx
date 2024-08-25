import { useState } from "react";
import { Campaign } from "../models/Campaign";

export default function CampaignCard(params:Campaign) {

  const [campaign, setCampaign] = useState<Campaign>(params)

  return (
    <li className="campaign-card">
      <p className="link">{campaign.campaignName}</p>
      <p>Creation date: {new Date(campaign.creationDate).toDateString()}</p>
    </li>
  )

}
