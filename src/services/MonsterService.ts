import axiosClient from "./AxiosClient"

export default class MonsterService {
   
   static createBattleMonster = async(monsterId: number, name: string, currentHitPoints: number, maxHitPoints: number, battleId: number): Promise<void> => {
        try {
            const data = {monsterId, name, currentHitPoints, maxHitPoints, battleId}
            await axiosClient.post("/monsters", data );
        } catch (error) {
            console.log(error);
            Promise.reject(error)
        }
   }
}