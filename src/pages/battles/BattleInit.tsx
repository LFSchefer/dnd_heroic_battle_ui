import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import MonsterSearch from "../../components/monster-search/MonsterModelSearch";
import { Battle } from "../../models/battle/Battle";
import BattleService from "../../services/BattleService";
import { FormattedMessage } from "react-intl";
import MonsterBattlePreview from "../../components/monster-battle-preview/MonsterBattlePreview";
import BattleInitiative from "../../components/battle-initiative/BattleInitiative";
import { allMonstersHaveInitiative } from "../../utils/utils";


export default function BattleInit() {

    const navigate = useNavigate();
    const params = useParams();
    const [battleId, setBattleId] = useState<number>();
    const [battle, setBattle] = useState<Battle>();
    const [searchIsOpen, setSearchIsOpen] = useState<boolean>(true);
    const [initiativeIsOpen, setInitiativeIsOpen] = useState<boolean>(false);

    const getBattle = async (id: number): Promise<void> => {
        const response = await BattleService.getOneBattle(id);
        setBattle(response!);
    }

    const goTo404 = useCallback((): void => {
        navigate("/*");
    },[navigate])

    const backToBattle = (): void => {
       navigate(`/battles/${battleId}`); 
    };

    const goToFight = (): void => {
        navigate(`/battles/${battleId}/fight`);
    };

    useEffect(() => {
        if (params.battleId !== undefined && parseInt(params.battleId)) {
            setBattleId(+params.battleId);
            getBattle(+params.battleId);
        } else {
            goTo404();
        }
    },[goTo404, params.battleId])

    const toggleSearch = () => {
        setSearchIsOpen(!searchIsOpen)
        if (initiativeIsOpen) {
            setInitiativeIsOpen(false)
        }
    }

    const toggleInitiative = () => {
        setInitiativeIsOpen(!initiativeIsOpen)
        if (searchIsOpen) {
            setSearchIsOpen(false)
        }
    }

    const update = () => {
        getBattle(battleId!);
    }

    const fightCanStart = useCallback(() => {
        return allMonstersHaveInitiative(battle);
    },[battle]);

    return (
        <div className="flex flex-col items-center">
            <h1>Battle initialization !</h1>
            <button className="dnd-btn" onClick={backToBattle}><FormattedMessage id="backToBattle"/></button>
            <MonsterBattlePreview battleMonsters={battle?.battleMonsters}/>
            <div className="flex">
                <button className="dnd-btn mx-4" onClick={toggleSearch}>
                    <FormattedMessage id={searchIsOpen ? "closeMonsterSearch" : "addMonster"}/>
                </button>
                {battle?.battleMonsters && battle?.battleMonsters.length > 0 &&
                <button className="dnd-btn mx-4" onClick={toggleInitiative}>
                    <FormattedMessage id={initiativeIsOpen ? "closeInitiative" : "calculateInitiative" }/>
                </button>
                }
            </div>
            {fightCanStart() && 
            <div className="m-5">
                <button className="dnd-btn mx-4" onClick={goToFight}>
                    <FormattedMessage id={"startFight"}/>
                </button>
            </div>
            }
            {searchIsOpen && 
            <MonsterSearch
            updateBattle={update}/>
            }
            {initiativeIsOpen && 
            <BattleInitiative
            updateBattle={update}/>
            }
        </div>
    )
}