import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from "react-intl";


type Props = {
    modelId: number,
    monsterName: string,
    challenge: number,
    handleAdd: (params: number) => void;
    handleDetail: (params: number) => void;
}

export default function MonsterSearchResult(props: Props) {

    const {modelId, monsterName, challenge, handleAdd, handleDetail} = props;

    return (
        <>
        <tr>
            <th className="font-semibold text-left">{monsterName}</th>
            <th className="font-semibold">{challenge}</th>
            <th className="link font-semibold" onClick={e => handleDetail(modelId)}><FormattedMessage id="details"/></th>
            <th><button className="dnd-btn-small" onClick={e => handleAdd(modelId)}><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} size="lg"/></button></th>
        </tr>
        </>
    )
}