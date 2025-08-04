import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import MonsterService from "../../services/MonsterService";
import { MonsterInitiative } from "../../models/battle-monster/MonterInitiative";
import InitiativeCard from "../initiative-card/InitiativeCard";
import { FormattedMessage } from "react-intl";

type Props = {
    updateBattle:() => void
}

const BattleInitiative: FC<Props> = (props: Props) => {

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
            {monsterInitiativePreview.filter( monster => monster.initiative === null).length > 0 &&
                <button className="dnd-btn" onClick={handleCalculateAll}><FormattedMessage id="calculateAllInititative"/></button>
            }
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

export default BattleInitiative;