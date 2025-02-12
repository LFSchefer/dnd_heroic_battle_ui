import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import MonsterSearch from "../../components/monster-search/MonsterModelSearch";
import { Battle } from "../../models/battle/Battle";
import BattleService from "../../services/BattleService";
import { FormattedMessage } from "react-intl";


export default function BattleInit() {

    const navigate = useNavigate();
    const params = useParams();
    const [battleId, setBattleId] = useState<number>();
    const [ battle, setBattle] = useState<Battle>();

    const getBattle = async (id: number): Promise<void> => {
        const response = await BattleService.getOneBattle(id);
        setBattle(response!);
    }

    const goTo404 = useCallback((): void => {
        navigate("/*");
    },[navigate])

    const backToBattle = (): void => {
       navigate(`/battles/${battleId}`); 
    }

    useEffect(() => {
        if (params.battleId !== undefined && parseInt(params.battleId)) {
            setBattleId(+params.battleId);
            getBattle(+params.battleId);
        } else {
            goTo404();
        }
    },[goTo404, params.battleId])

    const update = () => {
        getBattle(battleId!);
    }

    return (
        <div className="flex flex-col items-center">
            <h1>Battle init !</h1>
            <div className="border-2 border-sky-500">
                <h2>TODO</h2>
                <h3>Battle monsters list</h3>
                <p>Number of Monster: {battle?.battleMonsters.length}</p>
                <button className="dnd-btn" onClick={backToBattle}><FormattedMessage id="backToBattle"/></button>
            </div>
            <MonsterSearch
            updateBattle={update}/>
        </div>
    )
}