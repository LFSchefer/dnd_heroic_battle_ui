import axiosClient from "./AxiosClient"

export default class BattleMonsterService {
   
   static createBattleMonster = async(monsterId: number, name: string, battleId: number): Promise<void> => {
        try {
            const data = {monsterId, name, battleId}
            await axiosClient.post("/battle-monsters", data );
        } catch (error) {
            console.log(error);
        }
   }
}