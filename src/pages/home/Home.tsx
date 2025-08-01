import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";
import { useStoreState } from "../../store/hooks";

export default function Home() {

  const { userName, isLogin } = useStoreState(state => state.user);

  const navigate = useNavigate();


  const goToCampaigns = (): void => {
    navigate("/campaigns");
  };


  return (
    <>
      <h1 className="text-xl">
        <FormattedMessage id="welcome"/>
        {isLogin && ' ' + userName}
      </h1>
      <button onClick={goToCampaigns} className="my-5 dnd-btn">
        <FormattedMessage id="goToCampaigns"/>
      </button>
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
