import { MonsterPreview } from "../models/monster/MonsterPreview";
import { SearchInput } from "../models/monster/SearchInput";
import axiosClient from "./AxiosClient"

export default class MonsterService {

    static getMonsterPreview = async (searchInput: SearchInput): Promise<MonsterPreview[] | undefined> => {
        try {
            const {data} = await axiosClient.get("/monsters", { params: {name: searchInput.name , limit: searchInput.limit, offset: searchInput.offset } })
            return data;
        } catch (error) {
            
        }
    }

}