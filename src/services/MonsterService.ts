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
}