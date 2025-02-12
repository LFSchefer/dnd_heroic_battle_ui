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
            <th className="text-left border border-slate-700/50 font-medium">{monsterName}</th>
            <th className="border border-slate-700/50 font-medium">{challenge}</th>
            <th className="link border border-slate-700/50 font-medium" onClick={e => handleDetail(modelId)}><FormattedMessage id="details"/></th>
            <th className="border border-slate-700/50"><button className="dnd-btn-small" onClick={e => handleAdd(modelId)}><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} size="lg"/></button></th>
        </tr>
        </>
    )
}