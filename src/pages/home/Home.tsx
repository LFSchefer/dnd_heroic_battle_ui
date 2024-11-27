import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
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
      <button onClick={goToCampaigns} className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none test">
        <FormattedMessage id="goToCampaigns"/>
      </button>
      <div className="login">
        {!isLogin ? 
        <>
        <button onClick={goToSignIn} className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none test">
          <FormattedMessage id="signIn"/>
        </button>
        <button onClick={goToSignUp} className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none test">
          <FormattedMessage id="signUp"/>
        </button>
        </>
        :
        <button onClick={handleLogout} className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none test">
          <FormattedMessage id="logout"/>
        </button>
        }
      </div>
      < DiceRoller/>
      <button className="dnd-btn">Test go on</button>
    </>
  )
}
