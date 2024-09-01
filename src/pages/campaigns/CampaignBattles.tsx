import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import BattleService from "../../services/BattleService";
import { Battle } from "../../models/battle/Battle";

export default function CampaignBattles() {

  const params = useParams();
  const navigate = useNavigate();
  const [campaignId, setCampaignId] = useState<number>(0)
  const [battles, setBattles] = useState<Battle[]>([])

  useEffect(() => {
    if (params.campaignId !== undefined) {
      getBattles(+params.campaignId);
      setCampaignId(+params.campaignId)
    } else {
      backToCampaigns()
    }
  }, [params.campaignId])

  const getBattles = async (params:number): Promise<void> => {
    const data: Battle[] = await BattleService.getAllByCampaignId(params);
    setBattles(data);
  }

  const backToCampaigns = (): void => {
    navigate("/campaigns")
  }


  return (
    <>
    <button onClick={backToCampaigns} className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none test"><FormattedMessage id="backToCampaigns"/></button>
    <h1>CampaignBattles</h1>
    { campaignId ? <></> : <h1>sorry not campaign match</h1>
    }
    </>
  )
}
