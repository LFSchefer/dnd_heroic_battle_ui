import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";
import DiceRoller from "../../components/dice-roller/diceRoller";
import { useStoreActions, useStoreState } from "../../store/hooks";

export default function Home() {

  const { userName, isLogin } = useStoreState(state => state.user);
  const { logout } = useStoreActions(action => action.user)

  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
  };

  const goToCampaigns = (): void => {
    navigate("/campaigns");
  };

  const goToSignIn = ():void => {
    navigate("/sign-in");
  };

  const goToSignUp = ():void => {
    navigate("/sign-up");
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
      <div className="login">
        {!isLogin ? 
        <>
        <button onClick={goToSignIn} className="dnd-btn mx-4">
          <FormattedMessage id="signIn"/>
        </button>
        <button onClick={goToSignUp} className="dnd-btn mx-4">
          <FormattedMessage id="signUp"/>
        </button>
        </>
        :
        <button onClick={handleLogout} className="dnd-btn">
          <FormattedMessage id="logout"/>
        </button>
        }
      </div>
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
      < DiceRoller/>
    </>
  )
}
