import { FC, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import BattleService from "../../services/BattleService";
import { FormattedMessage } from "react-intl";
import { Battle } from "../../models/battle/Battle";
import MonsterBattlePreview from "../../components/monster-battle-preview/MonsterBattlePreview";
import { allMonstersHaveInitiative } from "../../utils/utils";

const BattlePage: FC = () => {

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const [ battle, setBattle] = useState<Battle>();


    const goTo404 = useCallback((): void => {
        navigate("/*");
    },[navigate])

    const goToFight = (): void => {
        navigate(`${path}/fight`);
    };

    const getBattle = async (id: number): Promise<void> => {
        const response = await BattleService.getOneBattle(id);
        setBattle(response!);
    }

    const goToBattleInit = (): void => {
        navigate(`${path}/initialize`);
    }
    
    useEffect(() => {
        if (params.battleId !== undefined && parseInt(params.battleId)) {
            getBattle(+params.battleId);
        } else {
            goTo404();
        }
    },[goTo404, params.battleId])

    const fightCanStart = useCallback(() => {
        return allMonstersHaveInitiative(battle);
    },[battle]);

    return (
        <>
        { battle && 
        <>  
        <div className="flex justify-center">
            <MonsterBattlePreview battleMonsters={battle.battleMonsters}/>
        </div>
        <div className="flex justify-center">
            <div className="init mx-4 m-2">
                <button className="dnd-btn" onClick={goToBattleInit}>
                    <FormattedMessage id="goToBattleInit"/>
                </button>
            </div>
            {fightCanStart() && 
            <div className="fight mx-4 m-2">
                <button className="dnd-btn" onClick={goToFight}>
                    <FormattedMessage id="startFight"/>
                </button>
            </div>
            }
        </div>
        </>
        }
        </>
    )
}

export default BattlePage;