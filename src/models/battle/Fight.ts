import { MonsterFight } from "../monster/MonsterFight"

export type FightType = {
    battleId: number,
    battleName: string,
    turn: number,
    monsters: MonsterFight[]
}