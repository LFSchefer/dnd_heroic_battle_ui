import axios from "axios";
import { Campaign } from "../models/Campaign";
import axiosClient from "./AxiosClient";

export default class CampaignService {

  static getCampaigns = async (): Promise<Campaign[]> => {
    try {
      const {data} = await axiosClient.get<Campaign[]>('/campaigns')
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return [];
        // handleAxiosError(error);
      } else {
        // handleUnexpectedError(error);
        return [];
      }
    }
  }

  static updateCampaign = async (params:Campaign) => {
    const data = {
      campaignId: params.campaignId,
      campaignName: params.campaignName
    }
    try {
      await axiosClient.patch('/campaigns', data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(console.error());
      }
      console.log("oups");

    }
  }
}
