import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import MonsterSearch from "../../components/monster-search/MonsterSearch";


export default function BattleInit() {

    const navigate = useNavigate();
    const params = useParams();
    const [battleId, setBattleId] = useState<number>();


    const goTo404 = useCallback((): void => {
        navigate("/*");
    },[navigate])

    useEffect(() => {
        if (params.battleId !== undefined && parseInt(params.battleId)) {
            setBattleId(+params.battleId);
        } else {
            goTo404();
        }
    },[goTo404, params.battleId])

    return (
        <>
            <h1>Battle init !</h1>
            <MonsterSearch/>
        </>
    )
}