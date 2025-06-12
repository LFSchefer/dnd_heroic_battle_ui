import { MonsterModelDetail } from "./MonsterDetail"

export type Monster = {
    monsterId: number,
    currentHitPoints: number,
    maxHitpoints: number,
    name: string,
    initiative: number,
    havePlayThisround: boolean,
    monster: MonsterModelDetail,
}