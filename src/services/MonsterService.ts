import { MonsterInitiative } from "../models/battle-monster/MonterInitiative";
import { DamageHeal } from "../models/monster/DamageHeal";
import { Monster } from "../models/monster/Monster";
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

   static updateMonsterInitiative = async (monsterID: number, initiative: string): Promise<void> => {
    try {
        const data = {
            monsterId: monsterID,
            initiative: Number.parseInt(initiative),
        }
        await axiosClient.put(`/monsters/update-initiative`, data);
    } catch (error) {
        console.log(error);
        Promise.reject(error);
    }
   }

    static calculateInitiative = async(monster: MonsterInitiative): Promise<void> => {
        try {
        await axiosClient.put(`/monsters/calculate-initiative`, monster);
    } catch (error) {
        console.log(error);
        Promise.reject(error);
    }
   }

   static calculateAllInitiative = async(monstersInitiative: MonsterInitiative[]): Promise<void> => {
    try {
        await axiosClient.put(`/monsters/calculate-all-initiative`, monstersInitiative)
    } catch (error) {
        console.log(error);
        Promise.reject(error);
    }
   }

   static updateActions = async(monsterId: number, action: boolean, move: boolean, bonusAction: boolean): Promise<Monster | undefined> => {
    try {
        const dto = {
            monsterId: monsterId,
            action: action,
            move: move,
            bonusAction: bonusAction
        }
        const {data} = await axiosClient.put(`/monsters/update-actions`, dto);
        return data;
    } catch (error) {
        console.log(error);
        Promise.reject(error);
    }
   }

   static updateHp = async(monsterId: number, amount: number, type: DamageHeal): Promise<Monster | undefined> => {
    try {
        const dto = {
            monsterId: monsterId,
            amount: amount,
            type: type
        };
        const {data} = await axiosClient.patch(`/monsters/update-hp`, dto);
        return data;
    } catch (error) {
        console.log(error);
        Promise.reject(error);
    }
   }
}