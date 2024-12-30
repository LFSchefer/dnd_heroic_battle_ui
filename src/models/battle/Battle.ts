import { BattleMonsterPreview } from "../battle-monster/BattleMonsterPreview"

export type Battle = {
    battleId: number,
    battleName: string,
    turn: number,
    campaignId: number,
    battleMonsters: BattleMonsterPreview[]
}