import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import MonsterService from "../../services/MonsterService";
import { MonsterInitiative } from "../../models/battle-monster/MonterInitiative";

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

    useEffect(() => {
        if (battleId) {
            fetchInitiatives(battleId);
        }
    },[battleId, fetchInitiatives])

    return (
        <>
        </>
    )
}