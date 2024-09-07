import axios from "axios";
import axiosClient from "./AxiosClient";
import { Battle } from "../models/battle/Battle";
import { BattleCreate } from "../models/battle/BattleCreate";

export default class BattleService {

  static IsValid = (params: string): boolean => {
    let valid = false;
    if (params.trim().length >= 5 && params.trim().length <= 50) {
      valid = true;
    }
    return valid;
  }

  static getAllByCampaignId = async (campaignId:number): Promise<Battle[]> => {
    try {
      const {data} = await axiosClient.get(`battles/campaign?id=${campaignId}`)
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(console.error());
        return []
      } else {
        return []
      }
    }
  }

  static createBattle = async (battle:BattleCreate): Promise<void> => {
    try {
      await axiosClient.post("battles",battle);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(console.error());
      }
      console.log("oups");
    }
  }

  static updateBattle = async (battle: Battle): Promise<void> => {
    try {
      const data = {
        id: battle.battleId,
        battleName: battle.battleName,
        turn: battle.turn
      }
      await axiosClient.patch("battles", data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(console.error());
      }
      console.log("oups");
    }
  }

  static deleteBattle = async (id: number): Promise<void> => {
    try {
      await axiosClient.delete(`battles/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(console.error());
      }
      console.log("oups");
    }
  }

}
