import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import BattleService from "../../services/BattleService";


export default function Fight() {

    const params = useParams();
    const navigate = useNavigate();
    const [battleId, setBattleId] = useState<number>();
    const [fight, setFight] = useState();

    const goTo404 = useCallback((): void => {
        navigate("/*");
    },[navigate])

    const getFight = useCallback(async () => {
        const data = await BattleService.getFight(battleId!);
        setFight(data);
    },[battleId])

    useEffect(() => {
        if (params.battleId !== undefined && parseInt(params.battleId)) {
            setBattleId(+params.battleId);
            getFight();
        } else {
            goTo404();
        }
    },[getFight, goTo404, params.battleId])
    
    return (
        <>
        <h1>toto</h1>
        </>
    )
}