import { FormattedMessage } from "react-intl";
import "./AddBattleMonsterModal.css"
import { MonsterPreview } from "../../models/monster/MonsterPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";


type Props = {
    isOpen: boolean,
    monster: MonsterPreview,
    close: () => void,
    save: (id: number, name: string) => void
}

export default function AddBattleMonsterModal(props: Props) {

    const {isOpen, monster, close, save} = props;
    const [customName, setCustomName] = useState<string>("");

    useEffect(() => {
        if (isOpen && monster !== null) {
            setCustomName(monster.monsterName)
        }
    },[isOpen, monster])

    const updateName = (input: string): void => {
        setCustomName(input);
    }

    return (
        <>
        {isOpen &&
        <div className="bg-modal">
            <div className="add-modal w-full max-w-96 rounded-lg shadow-md py-4 px-4 m-5">
                <div className="space-y-8">
                    <form noValidate>
                        <label htmlFor="custom-name"><FormattedMessage id="name"/>: </label>
                        <input id="custom-name" type="text" value={customName} onChange={e => updateName(e.target.value)} />
                    </form>
                    <div className="flex justify-around">
                        <button className="dnd-btn" onClick={close}><FontAwesomeIcon icon={faXmark} style={{color: "#ffffff",}} size="lg"/></button>
                        <button className="dnd-btn" onClick={e => save(monster.modelId, customName)}><FontAwesomeIcon icon={faCheck} style={{color: "#ffffff",}} size="lg"/></button>
                    </div>
                </div>
            </div>
        </div>
        }
        </>
    
    )
}