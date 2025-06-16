import { useEffect, useState } from "react";
import { Monster } from "../../models/monster/Monster"
import "./MonsterFightCard.css"
import MonsterService from "../../services/MonsterService";

type Props = {
    monster: Monster,
    updateMonster(input: Monster) :void,
}

export default function MonsterFightCard(props: Props) {

    const {monster, updateMonster} = props;
    const [monsterData, setMonsterData] = useState<Monster>();

    useEffect(() => {
        if (monster) {
            setMonsterData(monster);
        }
    },[monster]);

    const updateActions = async(monsterId: number, action: boolean, move: boolean, bonusAction: boolean) => {
        const data = await MonsterService.updateActions(monsterId, action, move, bonusAction);
        if (data) {
            updateMonster(data);
        }
    }

    const updateAction = () => {
        updateActions(monsterData!.monsterId,!monsterData!.action, monsterData!.move, monsterData!.bonusAction);
    }

    const updateMove = () => {
        updateActions(monsterData!.monsterId,monsterData!.action, !monsterData!.move, monsterData!.bonusAction);
    }

    const updateBonusAction = () => {
        updateActions(monsterData!.monsterId,monsterData!.action, monsterData!.move, !monsterData!.bonusAction);
    }



    return (
        <div className="monster-fight-card p-4 m-4 flex flex-col justify-between shadow-md border border-black/20 rounded-md">
            <div className="monster-image-container">
                <img className="monster-image" src={monster.monster.imageUrl ? monster.monster.imageUrl : ""} alt={`monster-${monster.name}-image`} />
                <p className="dnd-btn-small w-fit monster-display-on-card-hp">HP: {monster.currentHitPoints}/{monster.maxHitPoints}</p>
                <p className="dnd-btn-small w-fit monster-display-on-card-ac">AC: {monster.monster.armorClass}</p>
            </div>
            <div className="monster-info">
                <div className="flex justify-around">
                    <div>
                        <label htmlFor="action">action</label>
                        <input className="ml-2" type="checkbox" name="" id="action" checked={monsterData?.action} onChange={updateAction}/>
                    </div>
                    <div>
                        <label htmlFor="move">move</label>
                        <input className="ml-2" type="checkbox" name="" id="move" checked={monsterData?.move} onChange={updateMove}/>
                    </div>
                    <div>
                        <label htmlFor="bonus-action">bonus action</label>
                        <input className="ml-2" type="checkbox" name="" id="bonus-action" checked={monsterData?.bonusAction} onChange={updateBonusAction}/>
                    </div>
                </div>
                <p className="border-b-2 border-slate-950/50 font-bold">{monster.name}</p>
                <div className="flex justify-around">
                    <p>Strenght: {monster.monster.strength}</p>
                    <p>Dexterity: {monster.monster.dexterity}</p>
                </div>
                <div className="flex justify-around">
                    <p>Constitution: {monster.monster.constitution}</p>
                    <p>Intelligence: {monster.monster.intelligence}</p>
                </div>
                <div className="flex justify-around">
                    <p>Wisdom: {monster.monster.wisdom}</p>
                    <p>Charisma: {monster.monster.charisma}</p>
                </div>

            </div>
        </div>
    )
}