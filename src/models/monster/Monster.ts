import { MonsterModelDetail } from "./MonsterDetail"

export type Monster = {
    monsterId: number,
    currentHitPoints: number,
    maxHitPoints: number,
    name: string,
    initiative: number,
    havePlayThisround: boolean,
    monster: MonsterModelDetail,
}