import { useState } from "react";
import { Campaign } from "../../models/campaign/Campaign";
import { FormattedDate, FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faCheck } from '@fortawesome/free-solid-svg-icons';
import CampaignService from "../../services/CampaignService";
import './CampaignCard.css'

type Props = {
  campaignProps: Campaign,
  onUpdate: () => Promise<void>
};

export default function CampaignCard({campaignProps, onUpdate}:Props) {

  const [campaign, setCampaign] = useState<Campaign>(campaignProps);
  const [isInEdition, setIsInEdition] = useState<boolean>(false);
  const [isInFocus, setIsInFocus] = useState<boolean>(false);

  const toggleEdition = (): void => {
    setIsInEdition(!isInEdition);
  };

  const toggleInFocus = (): void => {
    setIsInFocus(!isInFocus);
  };

  const updateState = (input: string): void => {
    // TODO validation
    setCampaign( prev => {
      return { ...prev,
        campaignName: input
      };
    });
  };

  const saveChange = async (): Promise<void> => {
    await CampaignService.updateCampaign(campaign);
    onUpdate();
    toggleEdition();
  }

  const deleteCampaign = async (): Promise<void> => {
    // TODO confirm ?
    await CampaignService.deleteCampaign(campaign);
    onUpdate();
  }

  return (
    <div className="campaign-card bg-blue-200 w-full max-w-96 rounded-lg shadow-md py-4 px-4 m-5" onMouseEnter={toggleInFocus} onMouseLeave={toggleInFocus}>
      {isInFocus && !isInEdition ?
        <div className="edition">
          <FontAwesomeIcon icon={faPenToSquare} className="link opacity-70 edit" onClick={toggleEdition} />
          <FontAwesomeIcon icon={faTrashCan} className="link opacity-70 trash" onClick={deleteCampaign} />
        </div>
        :
        <></>
       }
      {isInEdition ?
      <>
      <input id="campaign-name" name="campaign-name" type="text" className="rounded-md py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300"
      value={campaign.campaignName} onChange={e => updateState(e.target.value)}/>
      <FontAwesomeIcon icon={faCheck} size="lg"  className="link mx-3" onClick={saveChange} />
      </>
      :
      <p className="link transition-all hover:underline capitalize hover:-indent-1 text-lg font-semibold">{campaign.campaignName}</p>
      }
      <p><FormattedMessage id="creationDate" /> <FormattedDate value={campaign.creationDate} year = 'numeric' month= 'long' day = 'numeric' weekday = 'long' /></p>
    </div>
  )

}
