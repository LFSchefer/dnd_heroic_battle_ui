import { SearchInput } from "../models/monster/SearchInput";
import { SearchResult } from "../models/monster/SearchResult";
import axiosClient from "./AxiosClient"

export default class MonsterModelService {

    static getMonsterPreview = async (searchInput: SearchInput): Promise<SearchResult | undefined> => {
        try {
            const {data} = await axiosClient.get("/monster-models", 
                { params: {name: searchInput.name , limit: searchInput.limit, page: searchInput.page } })
            return data;
        } catch (error) {
            
        }
    }

}