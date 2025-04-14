import { BattleMonsterPreview } from "../../models/battle-monster/BattleMonsterPreview"

type Props = {
    monster: BattleMonsterPreview,
}

export default function MonsterPreviewCard(props: Props) {
    const { monster} = props;
    return (
        <div className="monster-preview-card">
            <p>{monster.name}</p>
            <p>HP: {monster.currentHitPoints}/{monster.maxHitPoints}</p>
            <p>Initiative: {monster.initiative ? monster.initiative : "null"}</p>
        </div>
    )
}