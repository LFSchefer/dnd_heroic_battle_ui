import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./MonsterModelDetailModal.css"
import { FC, useCallback, useEffect, useState } from "react"
import { MonsterModelDetail } from "../../models/monster/MonsterDetail"
import MonsterModelService from "../../services/MonsterModelService"
import { FormattedMessage } from "react-intl"

type Props = {
    isOpen: boolean,
    modelId: number | undefined,
    close: () => void
}

const MonsterModelDetailModal: FC<Props> = (props: Props) => {

    const {isOpen, modelId, close} = props;
    const [monsterDetail, setMonsterDetail] = useState< MonsterModelDetail | undefined >(undefined);

    const fetchDetails = useCallback( async() => {
        const data = await MonsterModelService.getMonsterDetails(modelId!);
        setMonsterDetail(data);
    },[modelId]);

    useEffect(() => {
        if (modelId && isOpen) {
            fetchDetails();
        }
    },[fetchDetails, isOpen, modelId]);

    return (
        <>
        {isOpen && 
        <div className="bg-modal">
            <div className="detail-modal w-full rounded-lg shadow-md py-4 px-4 m-5 w-1/4">
                <div className="space-y-8 relative">
                    <button className="dnd-btn close-detail-modal" onClick={close}><FontAwesomeIcon icon={faXmark} style={{color: "#ffffff",}} size="lg"/></button>
                    {monsterDetail && 
                    <div>
                        {monsterDetail.imageUrl && 
                            <img src={monsterDetail.imageUrl} alt={monsterDetail.monsterName} />
                        }
                        <h2 className="font-bold">{monsterDetail.monsterName}</h2>
                        <div className="">
                            <p className="border-b-2 border-slate-950/50 mt-4 font-semibold"><FormattedMessage id="type"/></p>
                            <div className="flex justify-around">
                                <p>{monsterDetail.size}</p>
                                <p>{monsterDetail.monsterType}</p>
                            </div>
                            <p className="border-b-2 border-slate-950/50 mt-4 font-semibold"><FormattedMessage id="armor"/></p>
                            <div className="flex justify-around">
                                <p>{monsterDetail.armorClass}</p>
                                <p>{monsterDetail.armorType}</p>
                            </div>
                            <p className="border-b-2 border-slate-950/50 mt-4 font-semibold"><FormattedMessage id="hitPoints"/></p>
                            <div className="flex justify-around">
                                <p>{monsterDetail.hitPoints}</p>
                                <p>{monsterDetail.hitPointsRoll}</p>
                            </div>
                            <p className="border-b-2 border-slate-950/50 mt-4 font-semibold"><FormattedMessage id="stats"/></p>
                            <div className="flex justify-around">
                                <div>
                                    <p><FormattedMessage id="strength"/>: {monsterDetail.strength}</p>
                                    <p><FormattedMessage id="constitution"/>: {monsterDetail.constitution}</p>
                                    <p><FormattedMessage id="wisdom"/>: {monsterDetail.wisdom}</p>
                                </div>
                                <div>
                                    <p><FormattedMessage id="dexterity"/>: {monsterDetail.dexterity}</p>
                                    <p><FormattedMessage id="intelligence"/>: {monsterDetail.intelligence}</p>
                                    <p><FormattedMessage id="charisma"/>: {monsterDetail.charisma}</p>
                                </div>
                            </div>
                            <p className="border-b-2 border-slate-950/50 mt-4 font-semibold"><FormattedMessage id="perception"/></p>
                            <div className="flex justify-around">
                                <p><FormattedMessage id="passivePerception"/>: {monsterDetail.passivePerception}</p>
                                {monsterDetail.darkvision ?
                                <p><FormattedMessage id="darkvision"/>: {monsterDetail.darkvision} ft</p> : <p>Drakvision: no</p>
                                }
                            </div>
                            <p className="border-b-2 border-slate-950/50 mt-4 font-semibold"><FormattedMessage id="speed"/></p>
                            <div className="flex justify-around">
                                {monsterDetail.walk &&
                                <p><FormattedMessage id="walk"/>: {monsterDetail.walk} ft</p>
                                }
                                {monsterDetail.fly &&
                                <p><FormattedMessage id="fly"/>: {monsterDetail.fly} ft</p>
                                }
                                {monsterDetail.swim &&
                                <p><FormattedMessage id="swim"/>: {monsterDetail.swim} ft</p>
                                }
                            </div>
                            {monsterDetail.languages.length > 0 &&
                            <div>
                                <p className="border-b-2 border-slate-950/50 mt-4 font-semibold"><FormattedMessage id="languages"/></p>
                                <div className="grid grid-cols-2 gap-4">
                                    {monsterDetail.languages.map((language) => {
                                        return <p>{language}</p>
                                    })}
                                </div>
                            </div>
                            }
                            {monsterDetail.conditionsImmunities.length > 0 &&
                            <div>
                                <p className="border-b-2 border-slate-950/50 mt-4 font-semibold"><FormattedMessage id="conditionImmunities"/></p>
                                <div className="grid grid-cols-2 gap-4">
                                    {monsterDetail.conditionsImmunities.map((condition) => {
                                            return <p>{condition}</p>
                                        })}
                                </div>
                            </div>
                            }
                            {monsterDetail.monsterVulnerabilities.length > 0 &&
                            <div>
                                <p className="border-b-2 border-slate-950/50 mt-4 font-semibold"><FormattedMessage id="vulnerabilities"/></p>
                                <div className="grid grid-cols-2 gap-4">
                                    {monsterDetail.monsterVulnerabilities.map((vulnarability) => {
                                        return <p>{vulnarability}</p>
                                    })}
                                </div>
                            </div>
                            }
                            {monsterDetail.monsterResistances.length > 0 &&
                            <div>
                                <p className="border-b-2 border-slate-950/50 mt-4 font-semibold"><FormattedMessage id="resistances"/></p>
                                <div className="grid grid-cols-2 gap-4">
                                    {monsterDetail.monsterResistances.map((resistance) => {
                                        return <p>{resistance}</p>
                                    })}
                                </div>
                            </div>
                            }
                            {monsterDetail.monsterImunities.length > 0 &&
                            <div>
                                <p className="border-b-2 border-slate-950/50 mt-4 font-semibold"><FormattedMessage id="immunities"/></p>
                                <div className="grid grid-cols-2 gap-4">
                                    {monsterDetail.monsterImunities.map((immunities) => {
                                        return <p>{immunities}</p>
                                    })}
                                </div>
                            </div>
                            }
                            {monsterDetail.specialAbilities.length > 0 &&
                            <div>
                                <p className="border-b-2 border-slate-950/50 mt-4 font-semibold"><FormattedMessage id="specialAbilities"/></p>
                                <div className="grid grid-cols-2 gap-4">
                                    {monsterDetail.specialAbilities.map((specialAbility) => {
                                        return <p>{specialAbility}</p>
                                    })}
                                </div>
                            </div>
                            }
                            <p className="border-b-2 border-slate-950/50 mt-4 font-semibold"><FormattedMessage id="other"/></p>
                            <div className="text-left">
                            {monsterDetail.alignment &&
                            <p><FormattedMessage id="alignment"/>: {monsterDetail.alignment}</p>
                            }
                            <p><FormattedMessage id="challengeRating"/>: {monsterDetail.challengeRating}</p>
                            <p><FormattedMessage id="xp"/>: {monsterDetail.xp}</p>
                            
                            <p><FormattedMessage id="dndOriginal"/>: {monsterDetail.dnd5Native ? "Yes" : "No"}</p>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default MonsterModelDetailModal;