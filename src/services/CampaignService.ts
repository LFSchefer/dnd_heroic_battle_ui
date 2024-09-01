import axios from "axios";
import { Campaign } from "../models/campaign/Campaign";
import axiosClient from "./AxiosClient";
import { CampaignCreate } from "../models/campaign/CampaignCreate";

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

  static updateCampaign = async (params:Campaign): Promise<void> => {
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

  static deleteCampaign = async (params:Campaign): Promise<void> => {
    const data = params.campaignId;
    try {
      await axiosClient.delete(`/campaigns/${data}`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(console.error());
      }
      console.log("oups");
    }
  }

  static createCampaign = async (params:CampaignCreate): Promise<void> => {
    try {
      await axiosClient.post('/campaigns', params)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(console.error());
      }
      console.log("oups");
    }
  }
}
