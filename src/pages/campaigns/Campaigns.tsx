import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Campaign } from "../../models/campaign/Campaign";
import CampaignService from "../../services/CampaignService";
import CampaignCard from "../../components/campaign-card/CampaignCard";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { CampaignCreate } from "../../models/campaign/CampaignCreate";


export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isNewCampaign, setIsNewCampaign] = useState<boolean>(false);
  const [newCampaign, setNewCampaign] = useState<CampaignCreate>();
  const [nameIsValid, setNameIsValid] = useState<boolean>(false);

  const navigate = useNavigate();

  const  getCampaings = async (): Promise<void> => {
    const result: Campaign[] = await CampaignService.getCampaigns();
    setCampaigns(result);
  };

  const createCampaign = async (): Promise<void> => {
      if (nameIsValid && newCampaign) {
        await CampaignService.createCampaign(newCampaign);
        getCampaings();
        toggleCampaignCreation();
      }
  }

  useEffect(() => {
    getCampaings();
  }, []);

  const goBackHome = (): void => {
    navigate("/");
  };

  const toggleCampaignCreation = (): void => {
    setIsNewCampaign(!isNewCampaign);
  };

  const updateNewCampaign = (params: string): void => {
    // TODO validation unique name ?
    setNameIsValid(CampaignService.isValid(params));
    setNewCampaign({campaignName: params});
  };

  const isValidInputStyle = nameIsValid ? {outlineColor: "rgb(24 187 63)"  } : { outlineColor: "rgb(171 25 25)"};
  const isValidBtnStyle = nameIsValid ? {color: "rgb(24 187 63)"  } : { color: "rgb(171 25 25)"};
  const validationBtn = nameIsValid ? <FontAwesomeIcon icon={faCheck} size="lg"  className="link mx-3" onClick={createCampaign} style={isValidBtnStyle}/> :
  <FontAwesomeIcon icon={faX}  className="link mx-3" style={isValidBtnStyle} onClick={toggleCampaignCreation} />

  return (
    <div className="w-10/12 m-auto">
      <button onClick={goBackHome} className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none test"><FormattedMessage id="backHome"/></button>
      {isNewCampaign ?
        <>
        <div className="inline-grid">
        <input type="text" className="rounded-md py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300" onChange={(e) => updateNewCampaign(e.target.value)} style={isValidInputStyle}/>
        {nameIsValid ? <></> : <span className="text-red-700 text-sm"><FormattedMessage id="campaignNameValidation"/></span>}
        </div>
        <button>{validationBtn}</button>

        </>
      :
      <button onClick={toggleCampaignCreation} className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none test"><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} size="lg"/> <FormattedMessage id="createNewCampaign"/></button>
      }
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {campaigns.map( campaign => {
          return <div className="card-container flex justify-center content-center"><CampaignCard key={campaign.campaignId} campaignProps={{
            campaignId: campaign.campaignId,
            campaignName: campaign.campaignName,
            creationDate: campaign.creationDate
          }} onUpdate={getCampaings}
          /></div>
        })}
      </div>
    </div>
  )
}
