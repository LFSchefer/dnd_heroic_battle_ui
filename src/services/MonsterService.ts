import { MonsterInitiative } from "../models/battle-monster/MonterInitiative";
import axiosClient from "./AxiosClient"

export default class MonsterService {
   
   static createBattleMonster = async(modelId: number, name: string, currentHitPoints: number,
     maxHitPoints: number, battleId: number): Promise<void> => {
        try {
            const data = {modelId, name, currentHitPoints, maxHitPoints, battleId}
            await axiosClient.post("/monsters", data );
        } catch (error) {
            console.log(error);
            Promise.reject(error)
        }
   }

   static getMonstersInitiativesFromBattle = async(battleId: number): Promise<MonsterInitiative[]> => {
        try{
            const {data} = await axiosClient.get(`/monsters/get-initiatives`, {
                params: {battle: battleId}
            })
            return data;
        } catch (error) {
            console.log(error);
            Promise.reject(error)
            return [];
        }
   }
}