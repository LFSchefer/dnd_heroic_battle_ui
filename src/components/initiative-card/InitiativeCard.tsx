import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { MonsterInitiative } from "../../models/battle-monster/MonterInitiative"
import MonsterService from "../../services/MonsterService";

type Props = {
    monster: MonsterInitiative
    update:() => void
}

export default function InitiativeCard(props: Props) {
    const {monster, update} = props;
    const [d20, setD20] = useState<string>('');
    const [initiative, setinitiative] = useState<string>('');

    useEffect(() => {
        if(monster.initiative !== null) {
            setinitiative(monster.initiative.toString());
            setD20((monster.initiative - monster.bonus).toString());
        }
    },[monster.bonus, monster.initiative])


    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.value === '') {
                setD20('');
                setinitiative('');
            }
        else {
                if (event.target.name === "d20") {
                    setD20(event.target.value);
                    setinitiative((+event.target.value + monster.bonus).toString());
                } else if (event.target.name === "initiative") {
                    setinitiative(event.target.value);
                    setD20((+event.target.value - monster.bonus).toString());
                }
            }
        
    }

    const initiativeCanBeSave = (): boolean => {
        let disable = true;
        if (initiative !== '' && !Number.isNaN(Number.parseInt(initiative)) && Number.parseInt(initiative) !== monster.initiative) {
            disable = false;
        }
        return disable;
    }

    const handleSave = async (event: SyntheticEvent): Promise<void> => {
        event.preventDefault();
        await MonsterService.updateMonsterInitiative(monster.id, initiative);
        update();
    }

    const handleAutomatic = async (): Promise<void> => {
        await MonsterService.calculateInitiative(monster);
        update();
    }

    return(
        <div className="initiative-card bg-blue-200 rounded-md border-2 border-neutral-800/10 p-4 my-2 text-left">
            <p><b>{monster.name}</b></p>
            <div className="flex justify-between my-2">
                <p className="mx-2">dexterity: {monster.dexterity}</p>
                <p className="mx-2">bonus: {monster.bonus}</p>
                <p className="mx-2">initiative: {monster.initiative ? monster.initiative : "null"}</p>
                <button className="dnd-btn" onClick={handleAutomatic}>automatic</button>
            </div>
            <div className="my-2">
                <p>How to calculate: roll a D20 + bonus = initiative</p>
            </div>
            <div className="my-2">
                <form noValidate className="flex" onSubmit={handleSave}>
                    <label htmlFor="d20">D20: </label>
                    <input name="d20" type="number" value={d20} onChange={handleChange}/>
                    <p className="mx-2">bonus: {monster.bonus}</p>
                    <label htmlFor="initiative">total: </label>
                    <input type="number" name="initiative" value={initiative} onChange={handleChange}/>
                    <button className="dnd-btn ml-4" disabled={initiativeCanBeSave()} >save</button>
                </form>
            </div>
        </div>
    )
}
