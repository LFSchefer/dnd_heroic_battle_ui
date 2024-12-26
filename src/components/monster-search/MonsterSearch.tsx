import { useCallback, useEffect, useState } from "react";
import { MonsterPreview } from "../../models/monster/MonsterPreview";
import MonsterService from "../../services/MonsterService";
import { SearchInput } from "../../models/monster/SearchInput";


export default function MonsterSearch() {

    const [ monsterViews, setMonsterViews] = useState<MonsterPreview[]>([]);
    const [searchInput, setSearchInput] = useState<SearchInput>({
        name: "",
        limit: 20,
        offset: 0
    });

    const getMonsterPreviews = useCallback( async () => {
        console.log(searchInput)
        const response = await MonsterService.getMonsterPreview(searchInput);
        setMonsterViews(response!);
    },[searchInput])

    useEffect(() => {
        getMonsterPreviews();
    },[getMonsterPreviews])

    const updateName = (input: string) => {
        setSearchInput( prev => {
            return {
                ...prev,
                name: input
            }
        })
    }


    console.log(searchInput)

    return (
        <div className="monster-search">
            <form noValidate>
                <input type="text" onChange={e => updateName(e.target.value)} value={searchInput.name} />
            </form>
            <ul>
                {monsterViews.map( (monster) => {
                    return <li key={monster.monsterId}><p>Name: {monster.monsterName}, challenge: {monster.challengeRating}</p></li>
                })}
            </ul>
        </div>
    )
}