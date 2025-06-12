import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import BattleService from "../../services/BattleService";
import { FightType } from "../../models/battle/Fight";


export default function Fight() {

    const params = useParams();
    const navigate = useNavigate();
    const [battleId, setBattleId] = useState<number>();
    const [fight, setFight] = useState<FightType>();

    const goTo404 = useCallback((): void => {
        navigate("/*");
    },[navigate])

    const getFight = useCallback(async () => {
        if (battleId) {
            const data = await BattleService.getFight(battleId!);
            setFight(data);
        }
    },[battleId])

    useEffect(() => {
        if (params.battleId !== undefined && parseInt(params.battleId)) {
            setBattleId(+params.battleId);
            getFight()
        } else {
            goTo404();
        }
    },[getFight, goTo404, params.battleId])
    
    return (
        <div>
            <div className="fight-info">
                <h1>Fight info</h1>
                <h2>{fight?.battleName}</h2>
                <h2>turn: {fight?.turn}</h2>
                <h2>have played: {fight?.monsters.filter( monster => monster.havePlayThisround).length}/{fight?.monsters.length}</h2>
            </div>

        </div>
    )
}