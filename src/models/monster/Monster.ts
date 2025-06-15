import { MonsterModelDetail } from "./MonsterDetail"

export type Monster = {
    monsterId: number,
    currentHitPoints: number,
    maxHitPoints: number,
    name: string,
    initiative: number,
    havePlayThisround: boolean,
    action: boolean,
    move: boolean,
    bonusAction: boolean,
    monster: MonsterModelDetail,
}