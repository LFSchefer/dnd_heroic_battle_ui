import { Campaign } from "../models/Campaign";
import client from "./AxiosClient";

export default class CampaignService {

  static getCampaigns = async (): Promise<Campaign[] | undefined> => {
    try {
      const {data} = await client.get<Campaign[]>('/campaigns');
      return data;
    } catch (error) {
      console.log(console.error());
    }
  }
}
