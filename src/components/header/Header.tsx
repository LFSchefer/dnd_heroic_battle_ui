import { useNavigate } from "react-router";
import "./Header.css"
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useStoreActions } from "../../store/hooks";
import HeaderNavigation from "../header-navigation/HeaderNavigation";

export default function Header() {

    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState<boolean>(false);
    const { logout } = useStoreActions(action => action.user);
    

    useEffect(() => {
        if (!sessionStorage.getItem('access_token')) {
            setUserLogin(false);
        } else {
            setUserLogin(true);
        }
    },[navigate])

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