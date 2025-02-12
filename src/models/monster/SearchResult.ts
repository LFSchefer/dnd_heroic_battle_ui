import { MonsterPreview } from "./MonsterPreview"

export type SearchResult = {
    result: MonsterPreview[],
    currentPage: number,
    totalPages: number
}