import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import BattleService from "../../services/BattleService";
import { FormattedMessage } from "react-intl";
import { Battle } from "../../models/battle/Battle";

export default function BattlePage() {

    const params = useParams();
    const navigate = useNavigate();
    const [ battleId, setBattleId] = useState<number>();
    const [ battle, setBattle] = useState<Battle>();


    const goTo404 = useCallback((): void => {
        navigate("/*");
    },[navigate])

    const getBattle = async (id: number): Promise<void> => {
        const response = await BattleService.getOneBattle(id);
        setBattle(response!);
    }

    const goToBattleInit = (): void => {
        navigate(`/battles/${battleId}/initialize`);
    }

    const goToBattleList = (): void => {
        navigate(`/campaigns/${battle?.campaignId}`);
    }
    
    useEffect(() => {
        if (params.battleId !== undefined && parseInt(params.battleId)) {
            setBattleId(+params.battleId);
            getBattle(+params.battleId);
        } else {
            goTo404();
        }
    },[goTo404, params.battleId])

    return (
        <>
        <h1>TODO</h1>
        <button className="dnd-btn" onClick={goToBattleList}><FormattedMessage id="backToBattleList"/></button>
        { battle?.turn === 0 && 
        <>
            <div className="border-2 border-sky-500">
                <h2>TODO</h2>
                <h3>Battle monsters list</h3>
                <p>Number of Monster: {battle?.battleMonsters.length}</p>
            </div>
            <h1>Initialize your battle !</h1>
            <button className="dnd-btn" onClick={goToBattleInit}>
                <FormattedMessage id="goToBattleInit"/>
            </button>
        </>
        }
        </>
    )
}