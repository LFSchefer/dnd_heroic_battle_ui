import { MonsterModelDetail } from "./MonsterDetail"

export type Monster = {
    monsterId: number,
    currentHitPoints: number,
    maxHitPoints: number,
    name: string,
    initiative: number,
    hisTurn: boolean,
    havePlayThisRound: boolean,
    action: boolean,
    move: boolean,
    bonusAction: boolean,
    monster: MonsterModelDetail,
}