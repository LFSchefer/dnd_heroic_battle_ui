import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import DiceRoller from "../../components/dice-roller/diceRoller";
import { useStoreState } from '../../store/hooks';
import store from "../../store";
import { UserModel } from "../../store/models/user";

export default function Home() {

  const {userName, email} = useStoreState<UserModel>((store) => store.user)
  const navigate = useNavigate();

  const goToCampaigns = (): void => {
    navigate("/campaigns")
  }

  return (
    <>
    <h1 className="text-xl">
      <FormattedMessage id="test"/>
    </h1>
    <button onClick={goToCampaigns} className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none test">
      <FormattedMessage id="goToCampaigns"/>
    </button>
    < DiceRoller/>
    </>
  )
}
