import { useState } from "react"
import { Battle } from "../../models/battle/Battle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import './BattleCard.css'
import { FormattedMessage } from "react-intl";
import BattleService from "../../services/BattleService";
import { useNavigate } from "react-router-dom";


type Props = {
  battle: Battle,
  onUpdate: (params: number) => Promise<void>
};

export default function BattleCard(props:Props) {

  const [battle, setBattle] = useState<Battle>(props.battle);
  const [isInFocus, setIsInFocus] = useState<boolean>(false);
  const [isInEdition, setIsInEdition] = useState<boolean>(false);
  const [nameIsValid, setNameIsValid] = useState<boolean>(true);

  const navigate = useNavigate();

  const goToBattle = (): void => {
    //TODO
  }

  const toggleIsInFocus = (): void => {
    setIsInFocus( prev => !prev);
  };

  const toggleEdition = (): void => {
    setIsInEdition(prev => !prev)
  }

  const updateState = (params: string) => {
    let valid = BattleService.IsValid(params);
    setNameIsValid(valid);
      setBattle( prev => {
        return { ...prev,
          battleName:params
        }
      })
  }

  const deleteBattle = async (): Promise<void> => {
    await BattleService.deleteBattle(battle.battleId);
    props.onUpdate(battle.campaignId);
  }

  const saveChange = async (): Promise<void> => {
    if (nameIsValid) {
      await BattleService.updateBattle(battle);
    }
    props.onUpdate(battle.campaignId);
    toggleEdition();
  }

  const isValidInputStyle = nameIsValid ? {outlineColor: "rgb(24 187 63)"  } : { outlineColor: "rgb(171 25 25)"};
  const isValidBtnStyle = nameIsValid ? {color: "rgb(255 255 255)"  } : { color: "rgb(171 25 25)"};
  const validationBtn = nameIsValid ? <button className="dnd-btn-small mx-1"><FontAwesomeIcon icon={faCheck} size="lg"  className="link mx-3" onClick={saveChange} style={isValidBtnStyle}/></button> :
  <FontAwesomeIcon icon={faX}  className="link mx-3" style={isValidBtnStyle} onClick={toggleEdition} />


  return (
    <>
      <div className="battle-card bg-blue-200 w-full max-w-96 rounded-lg shadow-md py-4 px-4 m-5" onMouseEnter={toggleIsInFocus} onMouseLeave={toggleIsInFocus}>
      {isInFocus && !isInEdition ?
        <div className="edition">
          <FontAwesomeIcon icon={faPenToSquare} className="link opacity-70 edit" onClick={toggleEdition} />
          <FontAwesomeIcon icon={faTrashCan} className="link opacity-70 trash" onClick={deleteBattle} />
        </div>
        :
        <></>
       }
      {isInEdition ?
      <>
      <div className="inline-grid">
      <input id="campaign-name" name="campaign-name" type="text" className="rounded-md py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300"
      value={battle.battleName} onChange={e => updateState(e.target.value)} style={isValidInputStyle} autoFocus/>
      {nameIsValid ? <></> : <span className="text-red-700 text-sm"><FormattedMessage id="campaignNameValidation"/></span>}
      </div>
      <button>{validationBtn}</button>
      </>
      :
      <p className="link transition-all hover:underline capitalize hover:-indent-1 text-lg font-semibold" onClick={goToBattle} >{battle.battleName}</p>
      }
        <p className="text-lg">turn: {battle.turn}</p>
      </div>
    </>
  )
}
