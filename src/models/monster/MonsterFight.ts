import { MonsterModel } from "./MonsterModel";

export type MonsterFight = {
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
    monster: MonsterModel,
}