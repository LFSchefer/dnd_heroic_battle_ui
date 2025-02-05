import { SearchInput } from "../models/monster/SearchInput";
import { SearchResult } from "../models/monster/SearchResult";
import {MonsterPreviewCreation} from "../models/monster/MonsterPreviewCreation";
import axiosClient from "./AxiosClient"

export default class MonsterModelService {

    static getMonsterPreview = async (searchInput: SearchInput): Promise< SearchResult | undefined > => {
        try {
            const {data} = await axiosClient.get("/monster-models", 
                { params: {name: searchInput.name , limit: searchInput.limit, page: searchInput.page } })
            return data;
        } catch (error) {
            Promise.reject(error);
        }
    }

    static getMonsterPreviewCreation = async (modelId: number): Promise< MonsterPreviewCreation | undefined > => {
        try {
            const {data} = await axiosClient.get(`/monster-models/${modelId}`)
            return data;
        } catch (error) {
            Promise.reject(error)
        }
    }

}