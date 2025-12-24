import { type FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import BattleService from "../../services/BattleService";
import type { FightType } from "../../models/battle/Fight";
import MonsterFightCard from "../../components/monster-fight-card/MonsterFightCard";
import type { Monster } from "../../models/monster/Monster";
import MonsterDamageHealModal from "../../components/monster-damage-heal-modal/MonsterDamageHealModal";
import MonsterService from "../../services/MonsterService";
import { DamageHeal } from "../../models/monster/DamageHeal";
import FightInfo from "../../components/fight-info/FightInfo";


const Fight: FC = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [battleId, setBattleId] = useState<number>();
    const [fight, setFight] = useState<FightType>();
    const [damageModal, setDamageModal] = useState<boolean>(false);
    const [selectedMonsterId, setSelectedMonsterId] = useState<number | null>(null);

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

    const handleDamageModal = (monsterId: number) => {
        setSelectedMonsterId(monsterId)
        setDamageModal(true);
    }

    const closeDamageModal = () => {
        setDamageModal(false);
    }

    const findMonsterIndex = (input: Monster): number => {
        return fight!.monsters.findIndex((_m, i, arr) => {
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

    const updateMonsterHp = async(monsterId: number, amount: number, type: DamageHeal, damageTypeId: number | null): Promise<void> => {
        const response = await MonsterService.updateHp(monsterId, amount, type, damageTypeId);
        if (response) {
            setDamageModal(false);
            updateMonster(response);            
        }
    }

    const handleNextTurn = async(): Promise<void> => {
        if (battleId) {
            const data = await BattleService.nextTurn(battleId);
            setFight(data);
        }
    }
    
    return (
        <div className="fight-container py-5">
            <FightInfo
            battleName={fight?.battleName ?? "null"}
            turn={fight?.turn ?? 0}
            havePlayThisRound={fight?.monsters.filter( monster => monster.havePlayThisRound).length ?? 0}
            totalMonsters={fight?.monsters.length ?? 0}
            handleNextTurn={handleNextTurn}
            />
            <div className="grid max-lg:grid-cols-1 max-2xl:grid-cols-3 grid-cols-4 gap-4 max-2xl:w-full w-8/12 mx-auto">
                { 
                    fight?.monsters.map( monster => {
                        return <MonsterFightCard 
                                    key={monster.monsterId} 
                                    monster={monster}
                                    updateMonster={updateMonster}
                                    handleDamageModal={handleDamageModal}
                                    />
                    })
                }
            </div>
            {damageModal &&
                <MonsterDamageHealModal
                    monster={fight?.monsters.filter(m => m.monsterId === selectedMonsterId)[0]}
                    isOpen={damageModal}
                    close={closeDamageModal}
                    updateMonsterHp={updateMonsterHp}
                    />
            }
        </div>
    )
}

export default Fight;