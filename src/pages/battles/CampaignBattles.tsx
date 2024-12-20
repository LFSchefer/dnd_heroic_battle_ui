import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FormattedMessage } from "react-intl";
import BattleService from "../../services/BattleService";
import { Battle } from "../../models/battle/Battle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { BattleCreate } from "../../models/battle/BattleCreate";
import BattleCard from "../../components/battle-card/BattleCard";

export default function CampaignBattles() {

  const params = useParams();
  const navigate = useNavigate();
  const [campaignId, setCampaignId] = useState<number>(0)
  const [battles, setBattles] = useState<Battle[]>([])
  const [isBattleCreation, setIsBattleCreation] = useState<boolean>(false);
  const [nameIsValid, setNameIsValid] = useState<boolean>(false);
  const [newBattle, setNewBattle] = useState<BattleCreate>();

  const backToCampaigns = useCallback((): void => {
    navigate("/campaigns")
  },[navigate])

  const getBattles = useCallback(async (id:number): Promise<void> => {
    const data: Battle[] = await BattleService.getAllByCampaignId(id);
    setBattles(data);
  },[])

  useEffect(() => {
    if (params.campaignId !== undefined) {
      getBattles(+params.campaignId);
      setCampaignId(+params.campaignId)
    } else {
      backToCampaigns()
    }
  }, [backToCampaigns, getBattles, params.campaignId])

  const toggleBattleCreation = (): void => {
    setIsBattleCreation(prev => !prev)
  }

  const updateNewBattle = (params:string): void => {
    setNameIsValid(BattleService.IsValid(params));
    setNewBattle({battleName: params, campaignId: campaignId});
  }

  const createBattle = async (): Promise<void> => {
    if (nameIsValid && newBattle) {
      await BattleService.createBattle(newBattle);
      getBattles(campaignId);
      setIsBattleCreation(false);
    };
  }

  const isValidInputStyle = nameIsValid ? {outlineColor: "rgb(24 187 63)"  } : { outlineColor: "rgb(171 25 25)"};
  const isValidBtnStyle = nameIsValid ? {color: "rgb(255 255 255)"  } : { color: "rgb(171 25 25)"};
  const validationBtn = nameIsValid ? <button className="dnd-btn-small"><FontAwesomeIcon icon={faCheck} size="lg"  className="link mx-3" onClick={createBattle} style={isValidBtnStyle}/></button> :
  <FontAwesomeIcon icon={faX}  className="link mx-3" style={isValidBtnStyle} onClick={toggleBattleCreation} />

  return (
    <div className="w-10/12 m-auto">
    <button onClick={backToCampaigns} className="dnd-btn m-4">
      <FormattedMessage id="backToCampaigns"/>
    </button>
    <h1>Campaign Battles</h1>
    {!isBattleCreation && 
    <button onClick={toggleBattleCreation} className="dnd-btn m-2">
      <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} size="lg"/> <FormattedMessage id="createNewBattle"/>
    </button>
    }
    {isBattleCreation &&
            <>
            <div className="inline-grid">
            <input type="text" className="rounded-md py-1.5 pl-7 pr-20 ring-1 ring-inset ring-gray-300" onChange={(e) => updateNewBattle(e.target.value)} style={isValidInputStyle} autoFocus/>
            {nameIsValid ? <></> : <span className="text-red-700 text-sm"><FormattedMessage id="campaignNameValidation"/></span>}
            </div>
            <button>{validationBtn}</button>
            </>
    }
    { ( campaignId && battles[0] !== undefined ) ? (
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {battles.map( (battle) => {
          return <div className="card-container flex justify-center content-center" key={battle.battleId}>
            <BattleCard  battle={{
            battleId: battle.battleId,
            battleName: battle.battleName,
            turn: battle.turn,
            campaignId: campaignId
          }} onUpdate={getBattles} />
          </div>
        })}
      </div>
    )
    : (<h1><FormattedMessage id="noBattle" /></h1>)
    }
    </div>
  )
}
