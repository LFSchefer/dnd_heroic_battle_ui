import { SyntheticEvent, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../models/user/loginForm";
import UserService from "../../services/UserService";
import { LoginResponse } from "../../models/user/loginResponse";
import { useStoreActions } from "../../store/hooks";

export default function Login() {

    const [formInput, setFormInput] = useState<LoginForm>({email: '', password:''});
    const [apiResponse, setApiResponse] = useState<LoginResponse | undefined>(undefined);
    const {setUser} = useStoreActions( action => action.user)

    const navigate = useNavigate();

    const setField = (input: string, field: string): void => {
        setFormInput( prev => {
            return {
                ...prev,
                [field]: input
            }
        })
    }

    const handleClick = async (event: SyntheticEvent) => {
        event.preventDefault();
        const response: LoginResponse = await UserService.login(formInput);
        setApiResponse(response)
        if (!response.error) {
            setUser(response)
            navigate("/")
        }
    }

    const goToSignIn = (): void => {
        navigate("/");
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
                <form className="border rounded-lg border-cyan-800/20 px-8 py-12 space-y-10" onSubmit={handleClick} noValidate>
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
                        onChange={e => setField(e.target.value, "email")}
                        />
                    </div>
                    </div>

                    <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                            < FormattedMessage id="password"/>
                        </label>
                        <div className="text-sm">
                        <a href="#" className="font-semibold text-cyan-500 hover:text-cyan-600">
                            < FormattedMessage id="passwordForgot"/>
                        </a>
                        </div>
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
                        onChange={e => setField(e.target.value, "password")}
                        />
                    </div>
                    </div>

                    <div>
                        {apiResponse?.error && <p className="my-2 text-red-600">< FormattedMessage id="loginError"/></p>}
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-cyan-500 hover:bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        < FormattedMessage id="signIn"/>
                    </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    < FormattedMessage id="notAMember"/>{' '}
                    <a onClick={goToSignIn} className="font-semibold text-cyan-500 hover:text-cyan-600">
                        < FormattedMessage id="createAAccount"/>
                    </a>
                </p>
                </div>
            </div>
        </>
    )
};