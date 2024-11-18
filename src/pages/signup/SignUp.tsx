import { SyntheticEvent, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { signUpForm } from "../../models/user/signUpForm";

export default function SignUp() {

    const [signUpData, setSignUpData] = useState<signUpForm>({
        userName: '',
        email: '',
        password: ''
    });
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorSignUpForm, setErrorSignUpForm] = useState({
        userName: false,
        email: false,
        password: false,
        confirmPassword: false
    });
    const navigate = useNavigate();

    const setField = (input: string, field: string): void => {
        setSignUpData( prev => {
            return {
                ...prev,
                [field]: input
            }
        })
    }

    const handleChangeConfirmPassword = (value: string): void => {
        setConfirmPassword(value);
    }

    const handleSubmit = (event: SyntheticEvent): void => {
        event.preventDefault();
        validateInputs();
    }

    const validateInputs = (): void => {
        if (signUpData.userName.trim().length < 5 && signUpData.userName.trim().length > 50) {
            setErrorSignUpForm( prev => {
                return {
                    ...prev,
                    userName: true
                }
            })
        } else if (!signUpData.email) {
            setErrorSignUpForm( prev => {
                return {
                    ...prev,
                    email: true
                }
            })
        } else if (!signUpData.password) {
            setErrorSignUpForm( prev => {
                return {
                    ...prev,
                    password: true
                }
            })
        } else if (signUpData.password !== confirmPassword) {
            setErrorSignUpForm( prev => {
                return {
                    ...prev,
                    confirmPassword: true
                }
            })
        } else {
            setErrorSignUpForm({
                userName: false,
                email: false,
                password: false,
                confirmPassword: false
            })
            // TODO API CALL
        }
    }

    const goToSignIn = (): void => {
        navigate("/sign-in");
    };

    return (
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                < FormattedMessage id="createAAccount"/>
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="border rounded-lg border-cyan-800/20 px-8 py-12 space-y-8" onSubmit={handleSubmit} noValidate>
                <div>
                    <div className="flex items-center justify-start">
                        <label htmlFor="user-name" className="block text-sm/6 font-medium text-gray-900">
                            < FormattedMessage id="userName"/>
                        </label>
                    </div>
                <div className="mt-2">
                    <input
                    id="user-name"
                    name="user-name"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm/6 px-4"
                    value={signUpData.userName}
                    onChange={e => setField(e.target.value, "userName")}
                    />
                </div>
                </div>
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
                    value={signUpData.email}
                    onChange={e => setField(e.target.value, "email")}
                    />
                </div>
                </div>
                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                        < FormattedMessage id="password"/>
                    </label>
                </div>
                <div className="mt-2">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm/6 px-4"
                    value={signUpData.password}
                    onChange={e => setField(e.target.value, "password")}
                    />
                </div>
                </div>
                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="passwordConfirm" className="block text-sm/6 font-medium text-gray-900">
                        < FormattedMessage id="confirmPassword"/>
                    </label>
                </div>
                <div className="mt-2">
                    <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm/6 px-4"
                    value={confirmPassword}
                    onChange={e => handleChangeConfirmPassword(e.target.value)}
                    />
                </div>
                </div>
                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-cyan-500 hover:bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    < FormattedMessage id="signIn"/>
                </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
                < FormattedMessage id="allReadyMember"/>{' '}
                <a onClick={goToSignIn} className="font-semibold text-cyan-500 hover:text-cyan-600">
                    < FormattedMessage id="signIn"/>
                </a>
            </p>
            </div>
        </div>
    </>

    )
}