import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { MonsterPreview } from "../../models/monster/MonsterPreview";
import MonsterService from "../../services/MonsterService";


export default function BattleInit() {

    const navigate = useNavigate();
    const params = useParams();
    const [battleId, setBattleId] = useState<number>();
    const [ monsterViews, setMonsterViews] = useState<MonsterPreview[]>([]);

    const goTo404 = useCallback((): void => {
        navigate("/*");
    },[navigate])

    const getMonsterPreviews = async () => {
        const response = await MonsterService.getMonsterPreview();
        setMonsterViews(response!);
    }

    useEffect(() => {
        if (params.battleId !== undefined && parseInt(params.battleId)) {
            setBattleId(+params.battleId);
            getMonsterPreviews();
        } else {
            goTo404();
        }
    },[goTo404, params.battleId])

    console.log(monsterViews)

    return (
        <>
            <h1>Battle init !</h1>
            <ul>
                {monsterViews.map( (monster) => {
                    return <li key={monster.monsterId}><p>Name: {monster.monsterName}, challenge: {monster.challengeRating}</p></li>
                })}
            </ul>
        </>
    )
}