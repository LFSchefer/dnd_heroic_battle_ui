import { FormattedMessage } from "react-intl";
import "./AddMonsterModal.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck} from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from "react";
import MonsterModelService from "../../services/MonsterModelService";

type Props = {
    isOpen: boolean,
    monsterId: number | undefined,
    close: () => void,
    save: (id: number, name: string) => void
}

export default function AddMonsterModal(props: Props) {

    const {isOpen, monsterId, close, save} = props;
    const [customName, setCustomName] = useState<string>("");
    const [maxHitPoints, setMaxHitPoints] = useState<number>(0);
    const [hitPointsRoll, setHitPointsRoll] = useState<string>("");
    const [currentHitPoints, setCurrentHitPoints] = useState<number>(0);

    const getModel = useCallback( async(): Promise<void> =>  {
        const data = await MonsterModelService.getMonsterPreviewCreation(monsterId!);
        setCustomName(data?.monsterName!)
        setMaxHitPoints(data?.hitPoints!)
        setHitPointsRoll(data?.hitPointsRoll!)
    },[monsterId])

    useEffect(() => {
        if (isOpen && monsterId) {
            getModel()
        }
    },[getModel, isOpen, monsterId])

    useEffect(() => {
        setCurrentHitPoints(maxHitPoints)
    },[maxHitPoints])

    const updateName = (input: string): void => {
        setCustomName(input);
    }

    const updateCurrentHitPoints = (input: number): void => {
        setCurrentHitPoints(input);
    }

    const updateMaxHitPoints = (input: number): void => {
        setMaxHitPoints(input);
    }

    return (
        <>
        {isOpen &&
        <div className="bg-modal">
            <div className="add-modal w-full max-w-96 rounded-lg shadow-md py-4 px-4 m-5 h-auto">
                <div className="space-y-8">
                    <form noValidate className="my-4">
                        <label htmlFor="custom-name" className="mx-5"><FormattedMessage id="name"/></label>
                        <input id="custom-name" className="mb-3" type="text" value={customName} onChange={e => updateName(e.target.value)} />
                        <label htmlFor="current-hit-points"><FormattedMessage id="currentHitPoints"/></label>
                        <input id="current-hit-points" className="mb-3" type="number" value={currentHitPoints} onChange={e => updateCurrentHitPoints(+e.target.value)} />
                        <label htmlFor="max-hit-points"><FormattedMessage id="maxHitPoints"/></label>
                        <input id="max-hit-points" className="mb-3" type="number" value={maxHitPoints} onChange={e => updateMaxHitPoints(+e.target.value)} />
                        <p><FormattedMessage id="whenToRollYourself"/></p>
                        <p>{hitPointsRoll}</p>
                    </form>
                    <div className="flex justify-around">
                        <button className="dnd-btn" onClick={close}><FontAwesomeIcon icon={faXmark} style={{color: "#ffffff",}} size="lg"/></button>
                        <button className="dnd-btn" onClick={e => save(monsterId!, customName)}><FontAwesomeIcon icon={faCheck} style={{color: "#ffffff",}} size="lg"/></button>
                    </div>
                </div>
            </div>
        </div>
        }
        </>
    )
}