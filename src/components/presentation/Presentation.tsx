import { FormattedMessage } from "react-intl";

export default function Presentation() {

    return (
        <>
        <div className="presentation-text bg-blue-200 w-3/6 rounded-lg shadow-md py-4 px-4 mx-auto my-5 text-left">
            <div>
                <FormattedMessage id="presentationText"/>
            </div>
            <div className="mt-2">
                <FormattedMessage id="presentationTextDetail1"/>
            </div>
            <div className="mt-2">
                <FormattedMessage id="presentationTextDetail2"/>
            </div>
            <div className="mt-2">
                <FormattedMessage id="presentationTextDetail3"/>
            </div>
            <div className="mt-2">
                <FormattedMessage id="presentationTextDetail4"/>
            </div>
        </div>
        </>
    )
}