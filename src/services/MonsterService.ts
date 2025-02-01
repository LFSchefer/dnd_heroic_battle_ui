import axiosClient from "./AxiosClient"

export default class MonsterService {
   
   static createBattleMonster = async(monsterId: number, name: string, battleId: number): Promise<void> => {
        try {
            const data = {monsterId, name, battleId}
            await axiosClient.post("/monsters", data );
        } catch (error) {
            console.log(error);
            return Promise.reject(error)
        }
   }
}