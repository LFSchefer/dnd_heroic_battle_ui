import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import MonsterService from "../../services/MonsterService";
import { MonsterInitiative } from "../../models/battle-monster/MonterInitiative";
import InitiativeCard from "../initiative-card/InitiativeCard";

type Props = {
    updateBattle:() => void
}

export default function BattleInitiative(props: Props) {

    const {updateBattle} = props;

    const params = useParams();
    const battleId = +params?.battleId!;

    const [ monsterInitiativePreview, setMonsterInitiativePreview] = useState<MonsterInitiative[]>([])
    

    const fetchInitiatives = useCallback(async (battleId: number) => {
        const response = await MonsterService.getMonstersInitiativesFromBattle(battleId);
        setMonsterInitiativePreview(response);
    },[])

    const update = useCallback(() => {
        updateBattle();
    },[updateBattle])

    const handleCalculateAll = useCallback(async(): Promise<void> => {
        await MonsterService.calculateAllInitiative(monsterInitiativePreview);
        updateBattle();
    },[monsterInitiativePreview, updateBattle])

    useEffect(() => {
        if (battleId) {
            fetchInitiatives(battleId);
        }
    },[battleId, fetchInitiatives, update])

    return (
        <div className="calculate-initiative-container mt-4">
            <button className="dnd-btn" onClick={handleCalculateAll}>Calculate all Inititative</button>
            { monsterInitiativePreview.sort((a,b) => a.id - b.id).map((monster) => {
                return <InitiativeCard
                key={monster.id}
                monster={monster}
                update={update}
                />
            })}
        </div>
    )
}