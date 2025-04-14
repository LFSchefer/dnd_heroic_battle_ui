import { BattleMonsterPreview } from "../../models/battle-monster/BattleMonsterPreview";
import MonsterPreviewCard from "../MonsterPreviewCard/MonsterPreviewCard";

type Props = {
    battleMonsters?: BattleMonsterPreview[];
}

export default function MonsterBattlePreview(props: Props) {

    const {battleMonsters} = props;

    return (
        <div className="monster-battle-preview">
            <div className="border-2 border-sky-500">
                <h3>Battle monsters list</h3>
                <p>Number of Monster: {battleMonsters?.length}</p>
                { battleMonsters && 
                    <div className="grid grid-cols-4 gap-4">
                        {
                            battleMonsters.map( monster => {
                                return <MonsterPreviewCard 
                                key={monster.id}
                                monster={monster} />
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}