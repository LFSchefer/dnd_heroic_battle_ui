import { FormattedMessage } from "react-intl";
import "./AddMonsterModal.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck} from '@fortawesome/free-solid-svg-icons';
import { FC, useCallback, useEffect, useState } from "react";
import MonsterModelService from "../../services/MonsterModelService";

type Props = {
    isOpen: boolean,
    modelId: number | undefined,
    close: () => void,
    save: (id: number, name: string, currentHitPoints: number, maxHitPoints: number) => void
}

const AddMonsterModal: FC<Props> = (props: Props) => {

    const {isOpen, modelId, close, save} = props;
    const [customName, setCustomName] = useState<string>("");
    const [maxHitPoints, setMaxHitPoints] = useState<number>(0);
    const [hitPointsRoll, setHitPointsRoll] = useState<string>("");
    const [currentHitPoints, setCurrentHitPoints] = useState<number>(0);
    const [inputsAreValid, setInputsAreValid] = useState({
        name: true,
        currentHitPoints: true,
        maxHitPoints: true
    });

    const getModel = useCallback( async(): Promise<void> =>  {
        const data = await MonsterModelService.getMonsterPreviewCreation(modelId!);
        setCustomName(data?.monsterName!)
        setMaxHitPoints(data?.hitPoints!)
        setHitPointsRoll(data?.hitPointsRoll!)
    },[modelId])

    useEffect(() => {
        if (isOpen && modelId) {
            getModel()
        }
    },[getModel, isOpen, modelId])

    useEffect(() => {
        setCurrentHitPoints(maxHitPoints)
    },[maxHitPoints])

    const validateInputs = useCallback(() => {
        if (customName.trim().length >= 1) {
            setInputsAreValid(prev => {
                return {
                    ...prev,
                    name: true
                }
            })
        } else {
            setInputsAreValid(prev => {
                return {
                    ...prev,
                    name: false
                }
            })
        }
        if (currentHitPoints <= maxHitPoints && currentHitPoints > 0) {
            setInputsAreValid(prev => {
                return {
                    ...prev,
                    currentHitPoints: true
                }
            })
        } else {
            setInputsAreValid(prev => {
                return {
                    ...prev,
                    currentHitPoints: false
                }
            })
        }
        if (maxHitPoints > 0) {
            setInputsAreValid(prev => {
                return {
                    ...prev,
                    maxHitPoints: true
                }
            })
        } else {
            setInputsAreValid(prev => {
                return {
                    ...prev,
                    maxHitPoints: false
                }
            })
        }
    },[currentHitPoints, customName, maxHitPoints])

    useEffect(() => {
        validateInputs()
    },[currentHitPoints, customName, maxHitPoints, validateInputs])

    const updateName = (input: string): void => {
        validateInputs()
        setCustomName(input);
    }

    const updateCurrentHitPoints = (input: number): void => {
        validateInputs()
        setCurrentHitPoints(input);
    }

    const updateMaxHitPoints = (input: number): void => {
        validateInputs()
        setMaxHitPoints(input);
    }

    return (
        <>
        {isOpen &&
        <div className="bg-modal">
            <div className="add-modal w-full max-w-96 rounded-lg shadow-md py-4 px-4 m-5 h-auto">
                <div className="space-y-8">
                    <form noValidate className="my-6">
                        <div className="mb-5">
                            <label htmlFor="custom-name" className="mx-5"><FormattedMessage id="name"/></label>
                            <input name="custom-name" className="mt-1" type="text" value={customName} onChange={e => updateName(e.target.value)} />
                            {!inputsAreValid.name && <div><span className="text-red-700 text-sm mx-5"><FormattedMessage id="nameBlank"/></span></div>}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="current-hit-points" ><FormattedMessage id="currentHitPoints"/></label>
                            <input name="current-hit-points" className="mt-1" type="number" value={currentHitPoints} onChange={e => updateCurrentHitPoints(+e.target.value)} />
                            {!inputsAreValid.currentHitPoints && <div><span className="text-red-700 text-sm"><FormattedMessage id="currentHpValid"/></span></div>}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="max-hit-points" ><FormattedMessage id="maxHitPoints"/></label>
                            <input name="max-hit-points" className="mt-1" type="number" value={maxHitPoints} onChange={e => updateMaxHitPoints(+e.target.value)} />
                            {!inputsAreValid.maxHitPoints && <div><span className="text-red-700 text-sm"><FormattedMessage id="maxHpValid"/></span></div>}
                        </div>
                        <p><FormattedMessage id="wantToRollYourself"/></p>
                        <p>{hitPointsRoll}</p>
                    </form>
                    <div className="flex justify-around">
                        <button className="dnd-btn" onClick={close}><FontAwesomeIcon icon={faXmark} style={{color: "#ffffff",}} size="lg"/></button>
                        {inputsAreValid.name && inputsAreValid.currentHitPoints && inputsAreValid.maxHitPoints &&
                        <button className="dnd-btn" onClick={e => save(modelId!, customName, currentHitPoints, maxHitPoints)}><FontAwesomeIcon icon={faCheck} style={{color: "#ffffff",}} size="lg"/></button>
                        }
                    </div>
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default AddMonsterModal;