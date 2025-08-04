import { ChangeEvent, SyntheticEvent, useState } from "react";
import { FormattedMessage } from "react-intl";
import { NavLink, useNavigate } from "react-router";
import UserService from "../../services/UserService";
import { SignInForm } from "../../models/user/SignInForm";
import { SignInResponse } from "../../models/user/SignInResponse";
import { useStoreActions } from "../../store/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";

export default function SignIn() {

    const [formInput, setFormInput] = useState<SignInForm>({email: '', password:''});
    const [apiResponse, setApiResponse] = useState<SignInResponse | undefined >({
                    userName: '',
                    email: '',
                    tokens: undefined,
                });
    const [loginInProgess, setLoginInProgess] = useState<boolean>(false);
    const {setUser} = useStoreActions( action => action.user)

    const navigate = useNavigate();

    const setField = (event: ChangeEvent<HTMLInputElement>): void => {
        setFormInput( prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleClick = async (event: SyntheticEvent) => {
        event.preventDefault();
        setApiResponse(undefined);
        setLoginInProgess(true);
        const response: SignInResponse = await UserService.signIn(formInput);
        setApiResponse(response);
        setLoginInProgess(false);
        if (!response.error && response.tokens) {
            setUser(response);
            navigate("/");
        }
    };
    
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    < FormattedMessage id="signInToAccount"/>
                </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="border rounded-lg border-cyan-800/20 px-8 py-12 space-y-10 bg-sky-600/10 shadow-md" onSubmit={handleClick} noValidate>
                    <div>
                        <div className="flex items-center justify-start">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                < FormattedMessage id="emailAdresse"/>
                            </label>
                        </div>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm/6 px-4"
                        value={formInput.email}
                        onChange={setField}
                        />
                    </div>
                    </div>

                    <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                            < FormattedMessage id="password"/>
                        </label>
                        <NavLink to="#" className="text-sm font-semibold text-cyan-500 hover:text-cyan-600">
                            < FormattedMessage id="passwordForgot"/>
                        </NavLink>
                    </div>
                    <div className="mt-2">
                        <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm/6 px-4"
                        value={formInput.password}
                        onChange={setField}
                        />
                    </div>
                    </div>

                    <div className="pt-6">
                        {(apiResponse?.error?.message === "Network Error") && <p className="mb-4 -mt-9 text-red-600 italic text-sm">< FormattedMessage id="networkError"/></p>}
                        {(apiResponse?.error && apiResponse?.error?.message !== "Network Error") && <p className="mb-4 -mt-9 text-red-600 italic text-sm">< FormattedMessage id="loginError"/></p>}
                    <button
                        type="submit"
                        className="flex w-full justify-center dnd-btn"
                    >
                        {loginInProgess ? 
                            <FontAwesomeIcon icon={faDiceD20} size="xl" style={{color: "#ffffff",}} spin /> :
                            < FormattedMessage id="signIn"/>
                        }
                    </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    < FormattedMessage id="notAMember"/>{' '}
                    <NavLink to="/sign-up" className="text-sm font-semibold text-cyan-500 hover:text-cyan-600">
                        < FormattedMessage id="createAAccount"/>
                    </NavLink>
                </p>
                </div>
            </div>
        </>
    )
};