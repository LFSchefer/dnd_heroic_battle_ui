import { ChangeEvent, SyntheticEvent, useState } from "react";
import { FormattedMessage } from "react-intl";
import { NavLink, useNavigate } from "react-router";
import { signUpForm } from "../../models/user/signUpForm";
import { validateEmail, validatePassword } from "../../utils/utils";
import UserService from "../../services/UserService";
import { FormErrors } from "../../models/errors/FormErrors";

export default function SignUp() {

    const [signUpData, setSignUpData] = useState<signUpForm>({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errorSignUpForm, setErrorSignUpForm] = useState({
        userName: false,
        email: false,
        password: false,
        confirmPassword: false
    });
    const [apiError, setApiError] = useState<FormErrors | undefined>(undefined);

    const navigate = useNavigate();

    const setField = (event: ChangeEvent<HTMLInputElement>): void => {
        setSignUpData( prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
        event.preventDefault();
        if (validateInputs()) {
            const response = await UserService.signUp(signUpData);
            if (!response.error) {
                setApiError(undefined)
                navigate("/sign-in")
            }
            setApiError(response.error)
        }
    }

    const validateInputs = (): boolean => {
        let isValid = true;
        if (signUpData.userName.trim().length < 5 || signUpData.userName.trim().length > 50) {
            setErrorSignUpForm( prev => {
                return {
                    ...prev,
                    userName: true
                }
            })
            isValid = false;
        } else {
            setErrorSignUpForm( prev => {
                return {
                    ...prev,
                    userName: false
                }
            })
        }
        if (!validateEmail(signUpData.email)) {
            setErrorSignUpForm( prev => {
                return {
                    ...prev,
                    email: true
                }
            })
            isValid = false;
        } else {
            setErrorSignUpForm( prev => {
                return {
                    ...prev,
                    email: false
                }
            })
        }
        if (!validatePassword(signUpData.password)) {
            setErrorSignUpForm( prev => {
                return {
                    ...prev,
                    password: true
                }
            })
            isValid = false;
        } else {
            setErrorSignUpForm( prev => {
                return {
                    ...prev,
                    password: false
                }
            })
        }
        if (signUpData.password !== signUpData.confirmPassword) {
            setErrorSignUpForm( prev => {
                return {
                    ...prev,
                    confirmPassword: true
                }
            })
            isValid = false;
        } else {
            setErrorSignUpForm( prev => {
                return {
                    ...prev,
                    confirmPassword: false
                }
            })
        }
        return isValid;
    }

    return (
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                < FormattedMessage id="createAAccount"/>
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-7/12">
            <form className="border rounded-lg border-cyan-800/20 px-8 py-12 bg-sky-600/10 shadow-md" onSubmit={handleSubmit} noValidate>
                <div className="part-one md:flex md:justify-between">

                    <div className="user-name w-full md:w-6/12 mx-2 mt-4">
                        <div className="flex items-center justify-start">
                            <label htmlFor="user-name" className="block text-sm/6 font-medium text-gray-900">
                                < FormattedMessage id="userName"/>
                            </label>
                        </div>
                    <div className="mt-2">
                        <input
                        id="user-name"
                        name="userName"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-400 sm:text-sm/6 px-4"
                        value={signUpData.userName}
                        onChange={setField}
                        />
                        {errorSignUpForm.userName && <span className="text-red-600 italic text-sm"><FormattedMessage id="invalidUserName"/></span>}
                        {apiError?.fieldErros?.userName![0] === "Size" && <span className="text-red-600 italic text-sm"><FormattedMessage id="invalidUserName"/></span>}
                        {apiError?.globalErrors![0] === "UniqueUserCreate" && <span className="text-red-600 italic text-sm"><FormattedMessage id="uniqueUserCreate"/></span>}
                    </div>
                    </div>
                    <div className="email w-full md:w-6/12 mx-2 mt-4">
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
                        onChange={setField}
                        />
                        {errorSignUpForm.email && <span className="text-red-600 italic text-sm"><FormattedMessage id="invalidEmail"/></span>}
                        {apiError?.fieldErros?.email![0] === "Email" && <span className="text-red-600 italic text-sm"><FormattedMessage id="invalidEmail"/></span>}
                        {apiError?.globalErrors![0] === "UniqueUserCreate" && <span className="text-red-600 italic text-sm"><FormattedMessage id="uniqueUserCreate"/></span>}
                    </div>
                    </div>

                </div>
                <div className="part-two md:flex md:justify-between md:mt-6">

                    <div className="password mx-2 mt-4 w-full md:w-6/12">
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
                            onChange={setField}
                            />
                            {apiError?.fieldErros?.password![0] === "ValidPassword" && <span className="text-red-600 italic text-sm"><FormattedMessage id="invalidPassword"/></span>}
                            {errorSignUpForm.password && <span className="text-red-600 italic text-sm"><FormattedMessage id="invalidPassword"/></span>}
                        </div>
                    </div>
                    <div className="confirm w-full md:w-6/12 mx-2 mt-4">
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
                            value={signUpData.confirmPassword}
                            onChange={setField}
                            />
                            {errorSignUpForm.confirmPassword && <span className="text-red-600 italic text-sm"><FormattedMessage id="invalidPasswordConfirm"/></span>}
                        </div>
                    </div>

                </div>
                <div className="submit-btn mt-10 flex justify-center md:justify-end">
                    <button
                        type="submit"
                        className="w-6/12 md:w-4/12 md:mx-2 dnd-btn"
                    >
                        < FormattedMessage id="signUp"/>
                    </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
                < FormattedMessage id="allReadyMember"/>{' '}
                <NavLink to="/sign-in" className="text-sm font-semibold text-cyan-500 hover:text-cyan-600">
                    < FormattedMessage id="signIn"/>
                </NavLink>
            </p>
            </div>
        </div>
    </>
    )
}