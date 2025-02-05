import { useCallback, useEffect, useState } from "react";
import { MonsterPreview } from "../../models/monster/MonsterPreview";
import MonsterModelService from "../../services/MonsterModelService";
import { SearchInput } from "../../models/monster/SearchInput";
import MonsterSearchResult from "../monster-search-result/MonsterSearchResult";
import AddBattleMonsterModal from "../add-battle-monster-modal/AddMonsterModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faL } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";
import MonsterService from "../../services/MonsterService";
import MonsterModelDetailModal from "../monster-model-detail-modal/MonsterModelDetailModal";

type Props = {
    updateBattle:() => void
}


export default function MonsterModelSearch(props: Props) {

    const {updateBattle} = props;

    const params = useParams();
    const battleId = +params?.battleId!;

    const [creationModalIsOpen, setCreationModalIsOpen] = useState<boolean>(false);
    const [detailModalIsOpen, setDetailModalIsOpen] = useState<boolean>(false);
    const [monsterViews, setMonsterViews] = useState<MonsterPreview[]>([]);
    const [totalpages, setTotalPages] = useState<number>(1);
    const [selectMonster, setSelectMonster] = useState<MonsterPreview | null>(null)
    const [searchInput, setSearchInput] = useState<SearchInput>({
        name: "",
        limit: 10,
        page: 1
    });

    const getMonsterPreviews = useCallback( async () => {
        const response = await MonsterModelService.getMonsterPreview(searchInput);
        setMonsterViews(response?.result!);
        setTotalPages(response?.totalPages!);
    },[searchInput])

    useEffect(() => {
        getMonsterPreviews();
    },[getMonsterPreviews])

    const updateName = (input: string): void => {
        setSearchInput( prev => {
            return {
                ...prev,
                name: input,
                page: 1
            }
        })
    }

    const updateLimit = (input: string): void => {
        setSearchInput( prev => {
            return {
                ...prev,
                limit: Number.parseInt(input),
                page: 1
            }
        })
    }

    const nextPage = (): void => {
        setSearchInput( prev => {
            return {
                ...prev,
                page: prev.page +1
            }
        })
    }

    const prevPage = (): void => {
        setSearchInput( prev => {
            return {
                ...prev,
                page: prev.page - 1
            }
        })
    }

    const openCreation = (monsterId: number) => {
        setCreationModalIsOpen(true);
        setSelectMonster(monsterViews.filter(m => m.modelId === monsterId)[0]);
    }

    const openDetail = (monsterId: number) => {
        setDetailModalIsOpen(true);
        setSelectMonster(monsterViews.filter(m => m.modelId === monsterId)[0]);
    }

    const closeDetailModal = () => {
        setDetailModalIsOpen(false);
    }


    const closeCreationModal = () => {
        setCreationModalIsOpen(false);
    }

    const saveMonster = async (id: number, name: string, currentHitPoints: number, maxHitPoints: number) => {
        await MonsterService.createBattleMonster(id, name.trim(), currentHitPoints, maxHitPoints, battleId);
        closeCreationModal();
        updateBattle();
    }

    return (
        <div className="monster-search flex flex-col items-center w-8/12">
            <div className="search-form">
                <form noValidate>
                    <label htmlFor="monster-name"><FormattedMessage id="search"/></label>
                    <input type="text" name="monster-name" id="monster-name" onChange={e => updateName(e.target.value)} value={searchInput.name} />
                    <label htmlFor="limit"><FormattedMessage id="limit"/></label>
                    <select name="limit" id="limit" value={searchInput.limit} onChange={ e => updateLimit(e.target.value)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </form>
            </div>
            <div className="result-search">
                <table className="">
                    <thead>
                        <tr>
                            <th><FormattedMessage id="name"/></th>
                            <th><FormattedMessage id="challenge"/></th>
                            <th><FormattedMessage id="showDetail"/></th>
                            <th><FormattedMessage id="addToBattle"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {monsterViews.map( (monster) => {
                            return <MonsterSearchResult 
                                    key={monster.modelId} 
                                    monsterId={monster.modelId}
                                    monsterName={monster.monsterName}
                                    challenge={monster.challengeRating}
                                    handleAdd={openCreation}
                                    handleDetail={openDetail}
                                    />
                        })}
                    </tbody>
                </table>
                <AddBattleMonsterModal
                isOpen={creationModalIsOpen}
                monsterId={selectMonster?.modelId}
                close={closeCreationModal}
                save={saveMonster}
                />
                <MonsterModelDetailModal
                isOpen={detailModalIsOpen}
                monsterId={selectMonster?.modelId}
                close={closeDetailModal}
                />
            </div>
            <div className="page-navigation flex">
                {searchInput.page > 1 &&
                <button className="dnd-btn-small" onClick={prevPage}><FontAwesomeIcon icon={faArrowLeft} size="lg" /></button>
                }
                {totalpages > 1 &&
                <p><FormattedMessage id="page"/>: {searchInput.page}/{totalpages}</p>
                }
                { searchInput.page < totalpages &&
                <button className="dnd-btn-small" onClick={nextPage}><FontAwesomeIcon icon={faArrowRight} size="lg" /></button>
                }
            </div>
        </div>
    )
}