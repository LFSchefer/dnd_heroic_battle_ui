import axios from "axios";
import axiosClient from "./AxiosClient";
import { Battle } from "../models/battle/Battle";

export default class BattleService {

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

}
