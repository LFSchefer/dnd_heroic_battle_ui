import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage, FormattedNumber } from "react-intl";
import type { FC } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";


type Props = {
    modelId: number,
    monsterName: string,
    challenge: number,
    handleAdd: (params: number) => void;
    handleDetail: (params: number) => void;
}

const MonsterSearchResult: FC<Props> = (props: Props) => {

    const {modelId, monsterName, challenge, handleAdd, handleDetail} = props;

    return (
        <>
        <tr>
            <th className="text-left border border-slate-700/50 font-medium">{monsterName}</th>
            <th className="border border-slate-700/50 font-medium"><FormattedNumber minimumFractionDigits={1}  value={challenge}/></th>
            <th className="link border border-slate-700/50 font-medium" onClick={() => handleDetail(modelId)}><FormattedMessage id="details"/></th>
            <th className="border border-slate-700/50"><button className="dnd-btn-small" onClick={() => handleAdd(modelId)}><FontAwesomeIcon icon={faPlus as IconDefinition} style={{color: "#ffffff",}} size="lg"/></button></th>
        </tr>
        </>
    )
}

export default MonsterSearchResult;