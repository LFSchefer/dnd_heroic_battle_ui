/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Campaign } from "../../models/Campaign";
import CampaignService from "../../services/CampaignService";
import CampaignCard from "../../components/CampaignCard";

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  async function getCampaings() {
    const result = await CampaignService.getCampaigns();
    setCampaigns( result === undefined ? [] : result)
  }

  useEffect(() => {
    getCampaings();
  }, [])

  return (
    <>
    <h1 className="text-xl">
      <FormattedMessage id="test"/>
    </h1>
    <button className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none test">coucou</button>
    <ul>
      {campaigns.map( campaign => {
        return <CampaignCard key={campaign.campaignId}
            campaignId={campaign.campaignId}
            campaignName={campaign.campaignName}
            creationDate={campaign.creationDate}
          />
      })}
    </ul>
    </>
  )
}
