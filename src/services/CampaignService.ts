import axios from "axios";
import { Campaign } from "../models/campaign/Campaign";
import axiosClient from "./AxiosClient";
import { CampaignCreate } from "../models/campaign/CampaignCreate";
import renewalToken from "./RenewalToken";

export default class CampaignService {

  static getCampaigns = async (): Promise<Campaign[]> => {
    try {
      const {data} = await axiosClient.get<Campaign[]>('/campaigns')
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401 && error.response.data.type) {
          const {status, data} = await renewalToken(error.response.data.type);
          if (status === 201) {
            sessionStorage.setItem('access_token', data.token);
            return this.getCampaigns();
          }
        }
      } 
      return [];
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

  static isValid = (params:string): boolean => {
    let isValid = false;
    if (params.trim().length >= 5 && params.trim().length <= 50) {
      isValid = true;
    }
    return isValid;
  }
}
