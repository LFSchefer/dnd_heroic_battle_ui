import { DamageType } from "../models/damage-type/DamageType"
import axiosClient from "./AxiosClient"


export default class DamageTypeService {

    static getAll = async(): Promise< DamageType[] | undefined> =>{
        try {
            const {data} = await axiosClient.get("/damage-types");
            return data;
        } catch (error) {
            Promise.reject(error);
        }
    }  
}