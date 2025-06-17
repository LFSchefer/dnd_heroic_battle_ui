import { useEffect, useState } from "react";
import { Monster } from "../../models/monster/Monster"
import "./MonsterFightCard.css"
import MonsterService from "../../services/MonsterService";
import { FormattedMessage } from "react-intl";

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
                        <label htmlFor="action"><FormattedMessage id="action"/></label>
                        <input className="ml-2" type="checkbox" name="" id="action" checked={monsterData?.action} onChange={updateAction}/>
                    </div>
                    <div>
                        <label htmlFor="move"><FormattedMessage id="move"/></label>
                        <input className="ml-2" type="checkbox" name="" id="move" checked={monsterData?.move} onChange={updateMove}/>
                    </div>
                    <div>
                        <label htmlFor="bonus-action"><FormattedMessage id="bonusAction"/></label>
                        <input className="ml-2" type="checkbox" name="" id="bonus-action" checked={monsterData?.bonusAction} onChange={updateBonusAction}/>
                    </div>
                </div>
                <p className="border-b-2 border-slate-950/50 font-bold">{monster.name}</p>
                <div className="flex justify-around">
                    <p><FormattedMessage id="strength"/>: {monster.monster.strength}</p>
                    <p><FormattedMessage id="dexterity"/>: {monster.monster.dexterity}</p>
                </div>
                <div className="flex justify-around">
                    <p><FormattedMessage id="constitution"/>: {monster.monster.constitution}</p>
                    <p><FormattedMessage id="intelligence"/>: {monster.monster.intelligence}</p>
                </div>
                <div className="flex justify-around">
                    <p><FormattedMessage id="wisdom"/>: {monster.monster.wisdom}</p>
                    <p><FormattedMessage id="charisma"/>: {monster.monster.charisma}</p>
                </div>

            </div>
        </div>
    )
}