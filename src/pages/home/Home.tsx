import { FormattedMessage } from "react-intl";
import { useStoreState } from "../../store/hooks";

export default function Home() {

  const { userName, isLogin } = useStoreState(state => state.user);

  return (
    <>
      <h1 className="text-xl">
        <FormattedMessage id="welcome"/>
        {isLogin && ' ' + userName}
      </h1>
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
