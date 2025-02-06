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
            <div className="detail-modal w-full max-w-96 rounded-lg shadow-md py-4 px-4 m-5 h-auto">
                <div className="space-y-8">
                    <button className="dnd-btn" onClick={close}><FontAwesomeIcon icon={faXmark} style={{color: "#ffffff",}} size="lg"/></button>
                    {monsterDetail && 
                    <div>
                        <h2>Name: {monsterDetail.monsterName}</h2>
                        <p>Type: {monsterDetail.monsterType}</p>
                        <p>Size: {monsterDetail.size}</p>
                        <p>Armor type: {monsterDetail.armorType}</p>
                        <p>Armor class: {monsterDetail.armorClass}</p>
                        <p>Hit points: {monsterDetail.hitPoints}</p>
                        <p>Hit points roll: {monsterDetail.hitPointsRoll}</p>
                        <p>Strength: {monsterDetail.strength}</p>
                        <p>Dexterity: {monsterDetail.dexterity}</p>
                        <p>Constitution: {monsterDetail.constitution}</p>
                        <p>Intelligence: {monsterDetail.intelligence}</p>
                        <p>Wisdom: {monsterDetail.wisdom}</p>
                        <p>Charisma: {monsterDetail.charisma}</p>
                        <p>Passive perception: {monsterDetail.passivePerception}</p>
                        {monsterDetail.darkvision &&
                        <p>Darkvision: {monsterDetail.darkvision} ft</p>
                        }
                        <p>Challenge rating: {monsterDetail.challengeRating}</p>
                        <p>Xp: {monsterDetail.xp}</p>
                        {monsterDetail.imageUrl && 
                        <p>Image: {monsterDetail.imageUrl}</p>
                        }
                        <p>Dnd original monster: {monsterDetail.dnd5Native ? "Yes" : "No"}</p>
                        {monsterDetail.walk &&
                        <p>Walk speed: {monsterDetail.walk} ft</p>
                        }
                        {monsterDetail.fly &&
                        <p>Fly speed: {monsterDetail.fly} ft</p>
                        }
                        {monsterDetail.swim &&
                        <p>Swim speed: {monsterDetail.swim} ft</p>
                        }
                        {monsterDetail.alignment &&
                        <p>Alignment: {monsterDetail.alignment}</p>
                        }
                        {monsterDetail.languages.length > 0 &&
                        <ul>Languages: 
                            {monsterDetail.languages.map((language) => {
                                return <li>{language}</li>
                            })}
                        </ul>
                        }
                        {monsterDetail.conditionsImmunities.length > 0 &&
                        <ul>Condition immunities: 
                            {monsterDetail.conditionsImmunities.map((condition) => {
                                return <li>{condition}</li>
                            })}
                        </ul>
                        }
                        {monsterDetail.monsterVulnerabilities.length > 0 &&
                        <ul>Vulnerabilities: 
                            {monsterDetail.monsterVulnerabilities.map((vulnarability) => {
                                return <li>{vulnarability}</li>
                            })}
                        </ul>
                        }
                        {monsterDetail.monsterResistances.length > 0 &&
                        <ul>Resistances: 
                            {monsterDetail.monsterResistances.map((resistance) => {
                                return <li>{resistance}</li>
                            })}
                        </ul>
                        }
                        {monsterDetail.monsterImunities.length > 0 &&
                        <ul>Immunities: 
                            {monsterDetail.monsterImunities.map((immunities) => {
                                return <li>{immunities}</li>
                            })}
                        </ul>
                        }
                        {monsterDetail.specialAbilities.length > 0 &&
                        <ul>Special abilities: 
                            {monsterDetail.specialAbilities.map((specialAbility) => {
                                return <li>{specialAbility}</li>
                            })}
                        </ul>
                        }
                    </div>
                    }
                </div>
            </div>
        </div>
        }
        </>
    )
}