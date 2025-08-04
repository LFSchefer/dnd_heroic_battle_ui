import { FC, useState } from "react";
import { Campaign } from "../../models/campaign/Campaign";
import { FormattedDate, FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import CampaignService from "../../services/CampaignService";
import { useLocation, useNavigate } from "react-router";
import './CampaignCard.css'
import ConfirmModal from "../confirm-modal/ConfirmModal";

type Props = {
  campaignProps: Campaign,
  onUpdate: () => Promise<void>
};

const CampaignCard: FC<Props> = ({campaignProps, onUpdate}:Props) => {

  const [campaign, setCampaign] = useState<Campaign>(campaignProps);
  const [isInEdition, setIsInEdition] = useState<boolean>(false);
  const [isInFocus, setIsInFocus] = useState<boolean>(false);
  const [nameIsValid, setNameIsValid] = useState<boolean>(true);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState<boolean>(false);


  const navigate = useNavigate();
  const location = useLocation()

  const goToCampaign = (): void => {
    navigate(`${location.pathname}/${campaign.campaignId}`)
  };

  const toggleEdition = (): void => {
    setIsInEdition(prev => !prev);
  };

  const toggleInFocus = (): void => {
    setIsInFocus(prev => !prev);
  };

  const updateState = (input: string): void => {
    setNameIsValid(CampaignService.isValid(input));
    setCampaign( prev => {
      return { ...prev,
        campaignName: input
      };
    });
  };

  const saveChange = async (): Promise<void> => {
    if (nameIsValid) {
      await CampaignService.updateCampaign(campaign);
      onUpdate();
      toggleEdition();
    }
  }

  const deleteCampaign = async (): Promise<void> => {
    await CampaignService.deleteCampaign(campaign);
    onUpdate();
  }

  const openModal = (): void => {
    setConfirmModalIsOpen(true);
  }

  const closeModal = (params: string): void => {
    setConfirmModalIsOpen(false);
    if (params === "yes") {
      deleteCampaign()
    }
  }

  const isValidInputStyle = nameIsValid ? {outlineColor: "rgb(24 187 63)"  } : { outlineColor: "rgb(171 25 25)"};
  const isValidBtnStyle = nameIsValid ? {color: "rgb(255 255 255)"  } : { color: "rgb(171 25 25)"};
  const validationBtn = nameIsValid ? <button className="dnd-btn-small" onClick={saveChange}><FontAwesomeIcon icon={faCheck} size="lg"  className="link mx-3" style={isValidBtnStyle}/></button> :
  <FontAwesomeIcon icon={faX}  className="link mx-3" style={isValidBtnStyle} onClick={toggleEdition} />


  return (
    <>
    <div className="campaign-card bg-blue-200 w-full max-w-96 rounded-lg shadow-md py-4 px-4 m-5" onMouseEnter={toggleInFocus} onMouseLeave={toggleInFocus}>
      {isInFocus && !isInEdition ?
        <div className="edition">
          <FontAwesomeIcon icon={faPenToSquare} className="link opacity-70 edit" onClick={toggleEdition} />
          <FontAwesomeIcon icon={faTrashCan} className="link opacity-70 trash" onClick={openModal} />
        </div>
        :
        <></>
      }
      {isInEdition ?
      <>
      <div className="inline-grid">
      <input id="campaign-name" name="campaign-name" type="text" className="rounded-md py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300"
      value={campaign.campaignName} onChange={e => updateState(e.target.value)} style={isValidInputStyle} autoFocus/>
      {nameIsValid ? <></> : <span className="text-red-700 text-sm"><FormattedMessage id="campaignNameValidation"/></span>}
      </div>
      <button>{validationBtn}</button>
      </>
      :
      <p className="link transition-all hover:underline capitalize hover:-indent-1 text-lg font-semibold" onClick={goToCampaign} >{campaign.campaignName}</p>
    }
      <p><FormattedMessage id="creationDate" /> <FormattedDate value={campaign.creationDate} year = 'numeric' month= 'long' day = 'numeric' weekday = 'long' /></p>
    </div>
    <ConfirmModal 
        isOpen={confirmModalIsOpen}
        handleClick={closeModal}
        />
    </>
  )

}


export default CampaignCard;