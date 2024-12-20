import { MonsterPreview } from "../models/monster/MonsterPreview";
import axiosClient from "./AxiosClient"

export default class MonsterService {

    static getMonsterPreview = async (): Promise<MonsterPreview[] | undefined> => {
        try {
            const {data} = await axiosClient.get("/monsters")
            return data;
        } catch (error) {
            
        }
    }
}