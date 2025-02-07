import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./MonsterModelDetailModal.css"
import { useCallback, useEffect, useState } from "react"
import { MonsterModelDetail } from "../../models/monster/MonsterDetail"
import MonsterModelService from "../../services/MonsterModelService"

type Props = {
    isOpen: boolean,
    monsterId: number | undefined,
    close: () => void
}

export default function MonsterModelDetailModal(props: Props) {

    const {isOpen, monsterId, close} = props;
    const [monsterDetail, setMonsterDetail] = useState< MonsterModelDetail | undefined >(undefined);

    const fetchDetails = useCallback( async() => {
        const data = await MonsterModelService.getMonsterDetails(monsterId!);
        setMonsterDetail(data);
    },[monsterId]);

    useEffect(() => {
        if (monsterId && isOpen) {
            fetchDetails();
        }
    },[fetchDetails, isOpen, monsterId]);

    console.log(monsterDetail)

    return (
        <>
        {isOpen && 
        <div className="bg-modal">
            <button className="dnd-btn close-detail-modal" onClick={close}><FontAwesomeIcon icon={faXmark} style={{color: "#ffffff",}} size="lg"/></button>
            <div className="detail-modal w-full rounded-lg shadow-md py-4 px-4 m-5 w-1/4">
                <div className="space-y-8">
                    {monsterDetail && 
                    <div>
                        {monsterDetail.imageUrl && 
                            <img src={monsterDetail.imageUrl} alt={monsterDetail.monsterName} />
                        }
                        <h2 className="font-bold">{monsterDetail.monsterName}</h2>
                        <div className="">
                            <p className="border-b-2 border-slate-950/50 mt-4 font-semibold">Type</p>
                            <div className="flex justify-around">
                                <p>{monsterDetail.size}</p>
                                <p>{monsterDetail.monsterType}</p>
                            </div>
                            <p className="border-b-2 border-slate-950/50 mt-4 font-semibold">Armor</p>
                            <div className="flex justify-around">
                                <p>{monsterDetail.armorClass}</p>
                                <p>{monsterDetail.armorType}</p>
                            </div>
                            <p className="border-b-2 border-slate-950/50 mt-4 font-semibold">Hit points</p>
                            <div className="flex justify-around">
                                <p>{monsterDetail.hitPoints}</p>
                                <p>{monsterDetail.hitPointsRoll}</p>
                            </div>
                            <p className="border-b-2 border-slate-950/50 mt-4 font-semibold">Stats</p>
                            <div className="flex justify-around">
                                <div>
                                    <p>Strength: {monsterDetail.strength}</p>
                                    <p>Constitution: {monsterDetail.constitution}</p>
                                    <p>Wisdom: {monsterDetail.wisdom}</p>
                                </div>
                                <div>
                                    <p>Dexterity: {monsterDetail.dexterity}</p>
                                    <p>Intelligence: {monsterDetail.intelligence}</p>
                                    <p>Charisma: {monsterDetail.charisma}</p>
                                </div>
                            </div>
                            <p className="border-b-2 border-slate-950/50 mt-4 font-semibold">Perception</p>
                            <div className="flex justify-around">
                                <p>Passive perception: {monsterDetail.passivePerception}</p>
                                {monsterDetail.darkvision ?
                                <p>Darkvision: {monsterDetail.darkvision} ft</p> : <p>Drakvision: no</p>
                                }
                            </div>
                            <p className="border-b-2 border-slate-950/50 mt-4 font-semibold">Speed</p>
                            <div className="flex justify-around">
                                {monsterDetail.walk &&
                                <p>Walk: {monsterDetail.walk} ft</p>
                                }
                                {monsterDetail.fly &&
                                <p>Fly: {monsterDetail.fly} ft</p>
                                }
                                {monsterDetail.swim &&
                                <p>Swim: {monsterDetail.swim} ft</p>
                                }
                            </div>
                            {monsterDetail.languages.length > 0 &&
                            <div>
                                <p className="border-b-2 border-slate-950/50 mt-4 font-semibold">Languages</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {monsterDetail.languages.map((language) => {
                                        return <p>{language}</p>
                                    })}
                                </div>
                            </div>
                            }
                            {monsterDetail.conditionsImmunities.length > 0 &&
                            <div>
                                <p className="border-b-2 border-slate-950/50 mt-4 font-semibold">Condition immunities</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {monsterDetail.conditionsImmunities.map((condition) => {
                                            return <p>{condition}</p>
                                        })}
                                </div>
                            </div>
                            }
                            {monsterDetail.monsterVulnerabilities.length > 0 &&
                            <div>
                                <p className="border-b-2 border-slate-950/50 mt-4 font-semibold">Vulnerabilities</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {monsterDetail.monsterVulnerabilities.map((vulnarability) => {
                                        return <p>{vulnarability}</p>
                                    })}
                                </div>
                            </div>
                            }
                            {monsterDetail.monsterResistances.length > 0 &&
                            <div>
                                <p className="border-b-2 border-slate-950/50 mt-4 font-semibold">Resistances</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {monsterDetail.monsterResistances.map((resistance) => {
                                        return <p>{resistance}</p>
                                    })}
                                </div>
                            </div>
                            }
                            {monsterDetail.monsterImunities.length > 0 &&
                            <div>
                                <p className="border-b-2 border-slate-950/50 mt-4 font-semibold">Immunities</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {monsterDetail.monsterImunities.map((immunities) => {
                                        return <p>{immunities}</p>
                                    })}
                                </div>
                            </div>
                            }
                            {monsterDetail.specialAbilities.length > 0 &&
                            <div>
                                <p className="border-b-2 border-slate-950/50 mt-4 font-semibold">Special abilities</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {monsterDetail.specialAbilities.map((specialAbility) => {
                                        return <p>{specialAbility}</p>
                                    })}
                                </div>
                            </div>
                            }
                            <p className="border-b-2 border-slate-950/50 mt-4 font-semibold">Other</p>
                            <div className="text-left">
                            {monsterDetail.alignment &&
                            <p>Alignment: {monsterDetail.alignment}</p>
                            }
                            <p>Challenge rating: {monsterDetail.challengeRating}</p>
                            <p>Xp: {monsterDetail.xp}</p>
                            
                            <p>Dnd original monster: {monsterDetail.dnd5Native ? "Yes" : "No"}</p>
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