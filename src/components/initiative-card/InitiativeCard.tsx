import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { MonsterInitiative } from "../../models/battle-monster/MonterInitiative"
import MonsterService from "../../services/MonsterService";
import { FormattedMessage } from "react-intl";

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
                <p className="mx-2"><FormattedMessage id="dexterity"/>: {monster.dexterity}</p>
                <p className="mx-2"><FormattedMessage id="bonus"/>: {monster.bonus}</p>
                <p className="mx-2"><FormattedMessage id="initiative"/>: {monster.initiative ? monster.initiative : "null"}</p>
                <button className="dnd-btn" onClick={handleAutomatic}><FormattedMessage id="automatic"/></button>
            </div>
            <div className="my-2">
                <p><FormattedMessage id="howToInitiative"/></p>
            </div>
            <div className="my-2">
                <form noValidate className="flex item-center" onSubmit={handleSave}>
                    <label htmlFor="d20" className="self-center"><FormattedMessage id="d20"/>: </label>
                    <input name="d20" type="number" value={d20} onChange={handleChange} className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm/6 px-4 w-24 mx-4"/>
                    <p className="mx-2 mr-8 self-center"><FormattedMessage id="bonus"/>: {monster.bonus}</p>
                    <label htmlFor="initiative" className="self-center"><FormattedMessage id="total"/>: </label>
                    <input type="number" name="initiative" value={initiative} onChange={handleChange} className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm/6 px-4 w-24 mx-4"/>
                    <button className="dnd-btn ml-4" disabled={initiativeCanBeSave()} ><FormattedMessage id="save"/></button>
                </form>
            </div>
        </div>
    )
}
