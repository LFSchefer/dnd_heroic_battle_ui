import { FC } from "react";
import { BattleMonsterPreview } from "../../models/battle-monster/BattleMonsterPreview";
import MonsterPreviewCard from "../MonsterPreviewCard/MonsterPreviewCard";

type Props = {
    battleMonsters?: BattleMonsterPreview[];
}

const MonsterBattlePreview: FC<Props> = (props: Props) => {

    const {battleMonsters} = props;

    return (
        <div className="monster-battle-preview p-4 border-2 border-sky-500">
                <h3 className="mb-4">Battle monsters list:</h3>
                { battleMonsters && 
                    <div className="grid grid-cols-4 gap-4">
                        {
                            battleMonsters.sort((a,b) => { return a.id - b.id}).map( monster => {
                                return <MonsterPreviewCard 
                                key={monster.id}
                                monster={monster} />
                            })
                        }
                    </div> 
                }
        </div>
    )
}

export default MonsterBattlePreview;