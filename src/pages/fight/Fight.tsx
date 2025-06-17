import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import BattleService from "../../services/BattleService";
import { FightType } from "../../models/battle/Fight";
import MonsterFightCard from "../../components/monster-fight-card/MonsterFightCard";
import { Monster } from "../../models/monster/Monster";
import { FormattedMessage } from "react-intl";


export default function Fight() {

    const params = useParams();
    const navigate = useNavigate();
    const [battleId, setBattleId] = useState<number>();
    const [fight, setFight] = useState<FightType>();

    const goTo404 = useCallback((): void => {
        navigate("/*");
    },[navigate])

    const getFight = useCallback(async () => {
        if (battleId) {
            const data = await BattleService.getFight(battleId!);
            setFight(data);
        }
    },[battleId])

    useEffect(() => {
        if (params.battleId !== undefined && parseInt(params.battleId)) {
            setBattleId(+params.battleId);
            getFight()
        } else {
            goTo404();
        }
    },[getFight, goTo404, params.battleId])

    const findMonsterIndex = (input: Monster): number => {
        return fight!.monsters.findIndex((m, i, arr) => {
            if (arr[i].monsterId === input.monsterId) {
                return true;
            }
            return false;
        })
    }

    const updateMonster = (input: Monster): void => {
        if(fight && fight.monsters) {
            setFight( prev => {

            if (!prev) return prev;

            const monsterIndex = findMonsterIndex(input);
            const updatedMonsters = [...prev.monsters];
            updatedMonsters[monsterIndex] = input;

                return {...prev!,
                    monsters: updatedMonsters
                }
            })
        }
    }
    
    return (
        <div className="fight-container py-5">
            <div className="fight-info bg-blue-200 rounded-md border-2 border-neutral-800/10 p-5 mb-5 flex justify-evenly w-2/4 mx-auto">
                <h2><FormattedMessage id="fight"/>: {fight?.battleName}</h2>
                <h2><FormattedMessage id="turn"/>: {fight?.turn}</h2>
                <h2><FormattedMessage id="havePlayed"/>: {fight?.monsters.filter( monster => monster.havePlayThisround).length}/{fight?.monsters.length}</h2>
            </div>
            <div className="grid max-lg:grid-cols-1 max-2xl:grid-cols-3 grid-cols-4 gap-4 max-2xl:w-full w-8/12 mx-auto">
                { 
                    fight?.monsters.map( monster => {
                        return <MonsterFightCard 
                                key={monster.monsterId} 
                                monster={monster}
                                updateMonster={updateMonster}
                                />
                    })
                }
            </div>
        </div>
    )
}