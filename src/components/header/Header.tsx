import { useLocation } from "react-router";
import "./Header.css"
import { useEffect, useState } from "react";

export default function Header() {

    const navigation = useLocation();

    const [userLogin, setUserLogin] = useState<boolean>(false);

    useEffect(() => {
        if (!sessionStorage.getItem('access_token')) {
            setUserLogin(false);
        } else {
            setUserLogin(true);
        }
    },[navigation])


    return(
        <header className="header">
            <div className="flex justify-between min-h-full items-center mx-4">
                <div>DND HEROIC BATTLE</div>
                <div className="sign-in-up-logout">
                    <nav>
                        {!userLogin ? 
                        <div>sign</div>
                        :
                        <div>log</div>
                        }
                    </nav>
                </div>
            </div>
        </header>
    )
}