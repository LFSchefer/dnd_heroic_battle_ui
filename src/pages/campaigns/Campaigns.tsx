import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Campaign } from "../../models/Campaign";
import CampaignService from "../../services/CampaignService";
import CampaignCard from "../../components/campaign-card/CampaignCard";
import { useNavigate } from "react-router-dom";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const navigate = useNavigate();

  async function getCampaings() {
    const result: Campaign[] = await CampaignService.getCampaigns();
    setCampaigns(result)
  }

  useEffect(() => {
    getCampaings();
  }, [])

  const goBackHome = () => {
    navigate("/");
  }

  return (
    <>
    <button onClick={goBackHome} className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none test"><FormattedMessage id="backHome"/></button>
    <div className="flex justify-center">
      {campaigns.map( campaign => {
        return <CampaignCard key={campaign.campaignId} campaignProps={{
          campaignId: campaign.campaignId,
          campaignName: campaign.campaignName,
          creationDate: campaign.creationDate
        }} onUpdate={getCampaings}
        />
      })}
    </div>
    </>
  )
}
