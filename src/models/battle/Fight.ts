import { Monster } from "../monster/Monster"

export type FightType = {
    battleId: number,
    battleName: string,
    turn: number,
    monsters: Monster[]
}