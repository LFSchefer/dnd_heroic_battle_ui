import { FormattedMessage } from "react-intl";
import "./ConfimModal.css"
import { FC } from "react";

type Props = {
    isOpen: boolean;
    handleClick: (params: string) => void;
}

const ConfirmModal: FC<Props> = (props: Props) => {

    const {isOpen, handleClick} = props;

    return (
        <>
        {isOpen && 
        <div className="confirm-bg">
            <div className="confimr-modal w-full max-w-96 rounded-lg shadow-md py-4 px-4 m-5">
                <h1><FormattedMessage id="areYouSure" /></h1>
                <div className="flex justify-between mt-8">
                    <button onClick={e => handleClick("yes")} className="dnd-btn"><FormattedMessage id="yes" /></button>
                    <button onClick={e => handleClick("no")} className="dnd-btn"><FormattedMessage id="no" /></button>
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default ConfirmModal;