import { useNavigate } from "react-router";
import "./Header.css"
import { FC, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useStoreActions, useStoreState } from "../../store/hooks";
import HeaderNavigation from "../header-navigation/HeaderNavigation";

const Header: FC = () => {

    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState<boolean>(false);
    const { isLogin } = useStoreState( state => state.user);
    const { logout } = useStoreActions(action => action.user);
    

    useEffect(() => {
        if (!isLogin) {
            setUserLogin(false);
        } else {
            setUserLogin(true);
        }
    },[isLogin, navigate])

    const goToHome = (): void => {
        navigate("/");
    }

    const goToSignIn = (): void  => {
        navigate("/sign-in")
    }

    const goToSignUp = (): void  => {
        navigate("/sign-up")
    }

      const handleLogout = (): void => {
        logout();
    };

    return(
        <header className="header">
            <div className="flex justify-between min-h-full items-center mx-4">
                <div className="link" onClick={goToHome}>
                    <h2 className="text-lg font-bold">DND HEROIC BATTLES</h2>
                </div>
                <HeaderNavigation/>
                <div className="sign-in-up-logout">
                    <nav>
                        {!userLogin ? 
                        <div className="flex">
                            <div className="mx-2 dnd-btn-small-invert" onClick={goToSignIn}><FormattedMessage id="signIn"/></div>
                            <div className="mx-2 dnd-btn-small-invert" onClick={goToSignUp}><FormattedMessage id="signUp"/></div>
                        </div>
                        :
                        <div className="mx-2 dnd-btn-small-invert" onClick={handleLogout}><FormattedMessage id="logout"/></div>
                        }
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;