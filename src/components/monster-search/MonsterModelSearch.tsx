import { useCallback, useEffect, useState } from "react";
import { MonsterPreview } from "../../models/monster/MonsterPreview";
import MonsterModelService from "../../services/MonsterModelService";
import { SearchInput } from "../../models/monster/SearchInput";
import MonsterSearchResult from "../monster-search-result/MonsterSearchResult";
import AddBattleMonsterModal from "../add-battle-monster-modal/AddMonsterModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
        setSelectMonster(null);
    }


    const closeCreationModal = () => {
        setCreationModalIsOpen(false);
        setSelectMonster(null);
    }

    const saveMonster = async (modelId: number, name: string, currentHitPoints: number, maxHitPoints: number) => {
        await MonsterService.createBattleMonster(modelId, name.trim(), currentHitPoints, maxHitPoints, battleId);
        closeCreationModal();
        updateBattle();
    }

    return (
        <div className="monster-search flex flex-col items-center w-8/12">
            <div className="search-form border-2 border-neutral-800/10 rounded-md m-4 p-2 bg-blue-200 shadow-md">
                <form noValidate className="flex justify-around">
                    <div className="monster-name mx-4">
                        <label htmlFor="monster-name" className="mx-2"><FormattedMessage id="search"/></label>
                        <input type="text" name="monster-name" id="monster-name" className="rounded-md" onChange={e => updateName(e.target.value)} value={searchInput.name} />
                    </div>
                    <div className="limit mx-4">
                        <label htmlFor="limit" className="mx-2"><FormattedMessage id="limit"/></label>
                        <select name="limit" id="limit" className="rounded-md" value={searchInput.limit} onChange={ e => updateLimit(e.target.value)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="result-search border-2 border-neutral-800/10 rounded-md p-6 m-4 bg-blue-200 shadow-md">
                <table className="border-collapse border border-slate-500">
                    <thead>
                        <tr>
                            <th className="border border-slate-600"><FormattedMessage id="name"/></th>
                            <th className="border border-slate-600"><FormattedMessage id="challenge"/></th>
                            <th className="border border-slate-600"><FormattedMessage id="showDetail"/></th>
                            <th className="border border-slate-600"><FormattedMessage id="addToBattle"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {monsterViews.map( (monster) => {
                            return <MonsterSearchResult 
                                    key={monster.modelId} 
                                    modelId={monster.modelId}
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
                modelId={selectMonster?.modelId}
                close={closeCreationModal}
                save={saveMonster}
                />
                <MonsterModelDetailModal
                isOpen={detailModalIsOpen}
                modelId={selectMonster?.modelId}
                close={closeDetailModal}
                />
            </div>
            <div className="page-navigation flex m-4">
                {searchInput.page > 1 &&
                <button className="dnd-btn-small mx-2" onClick={prevPage}><FontAwesomeIcon icon={faArrowLeft} size="lg" /></button>
                }
                {totalpages > 1 &&
                <p className="mx-2"><FormattedMessage id="page"/>: {searchInput.page}/{totalpages}</p>
                }
                { searchInput.page < totalpages &&
                <button className="dnd-btn-small mx-2" onClick={nextPage}><FontAwesomeIcon icon={faArrowRight} size="lg" /></button>
                }
            </div>
        </div>
    )
}