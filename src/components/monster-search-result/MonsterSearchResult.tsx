import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from "react-intl";


type Props = {
    monsterId: number,
    monsterName: string,
    challenge: number,
    handleAdd: (params: number) => void;
}

export default function MonsterSearchResult(props: Props) {

    const {monsterId, monsterName, challenge, handleAdd} = props;

    const showDetails = () => {
    };

    return (
        <>
        <tr>
            <th>{monsterName}</th>
            <th>{challenge}</th>
            <th className="link" onClick={showDetails}><FormattedMessage id="details"/></th>
            <th><button className="dnd-btn-small" onClick={e => handleAdd(monsterId)}><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} size="lg"/></button></th>
        </tr>
        </>
    )
}