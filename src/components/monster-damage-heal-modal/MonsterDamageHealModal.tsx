import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedMessage } from "react-intl";
import { Monster } from "../../models/monster/Monster";
import { useEffect, useState } from "react";
import "./MonsterDamageHealModal.css"
import { DamageHeal } from "../../models/monster/DamageHeal";


type Props = {
    monster: Monster | undefined;
    isOpen: boolean;
    close(): void;
    updateMonsterHp(monsterId: number, amount: number, type: string): void;
}

export default function MonsterDamageHealModal(props: Props) {

    const {isOpen, close, monster, updateMonsterHp} = props;
    const [amount, setAmount] = useState<string>("");
    const [type, setType] = useState<DamageHeal>(DamageHeal.Damage);
    const [isAmountValid, setIsAmountValid] = useState<boolean>(true);
    const [isNoInteraction, setIsNoInteraction] = useState<boolean>(true);

    const handleType = (type: string): void => {
        setType(DamageHeal.Damage === type ? DamageHeal.Damage : DamageHeal.Heal);
    };

    const handleAmount = (input: string): void => {
        setAmount(input);
        setIsNoInteraction(false);
    };

    useEffect(() => {
        if ((amount.trim() !== "" && Number.parseInt(amount) > 0) || isNoInteraction) {
            setIsAmountValid(true);
        } else {
            setIsAmountValid(false);
        }

    },[amount, isNoInteraction])

    const updateHp = (): void => {
        if (isAmountValid && monster?.monsterId) {
            updateMonsterHp(monster?.monsterId, Number.parseInt(amount), type)
        } 
    }

    return (
        <>
        {isOpen && 
        <div className="confirm-bg">
            <div className="damage-modal w-full max-w-96 rounded-lg shadow-md py-4 px-4 m-5">
                <h1 className="font-bold">{monster?.name}</h1>
                <div className="flex justify-evenly mt-8">
                    <label htmlFor="damage-or-heal">type</label>
                    <select name="damage-or-heal" id="damage-or-heal" value={type} onChange={e => handleType(e.target.value)}>
                        <option value="damage">{DamageHeal.Damage}</option>
                        <option value="heal">{DamageHeal.Heal}</option>
                    </select>
                </div>
                <div className="flex justify-evenly mt-8 amount">
                    <label htmlFor="damage-amount">amount</label>
                    <input id="damage-amount" type="number" value={amount} onChange={e => handleAmount(e.target.value)}/>
                </div>
                {!isAmountValid && <p className="-mb-5 pt-1 text-red-600 italic text-sm feedback-amount">< FormattedMessage id="invalidAmount"/></p>}
                <button className="dnd-btn mx-auto mt-12" onClick={updateHp} disabled={isNoInteraction || !isAmountValid}><FormattedMessage id="save"/></button>
                <button className="close-damage-modal dnd-btn" onClick={close}><FontAwesomeIcon icon={faXmark} style={{color: "#ffffff",}} size="lg"/></button>
            </div>
        </div>
        }
        </>
    )
}