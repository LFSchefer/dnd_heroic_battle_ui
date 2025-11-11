import { FC } from "react";
import { FormattedMessage } from "react-intl";

type Props = {
    battleName: string,
    turn: number,
    havePlayThisRound: number,
    totalMonsters: number,
    handleNextTurn(): void
}

const FightInfo: FC<Props> = (props: Props) => {

    const { battleName , turn, havePlayThisRound, totalMonsters, handleNextTurn} = props

    const handleClick = () => {
        handleNextTurn();
    }

    return (
            <div className="fight-info bg-blue-200 rounded-md border-2 border-neutral-800/10 p-5 mb-5 flex justify-evenly flex-col lg:flex-row w-2/4 mx-auto">
                <h2><FormattedMessage id="fight"/>: {battleName}</h2>
                <h2><FormattedMessage id="turn"/>: {turn}</h2>
                <h2><FormattedMessage id="havePlayed"/>: {havePlayThisRound}/{totalMonsters}</h2>
                <div>
                    <button className="dnd-btn w-fit" onClick={handleClick}>next</button>
                </div>
            </div>
    )
}

export default FightInfo;