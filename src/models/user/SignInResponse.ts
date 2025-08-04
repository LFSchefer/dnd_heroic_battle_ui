import { AxiosError } from "axios"
import { TokenRenewal } from "./TokenRenewal"

export type SignInResponse = {
    userName: string | undefined,
    email: string | undefined,
    tokens: TokenRenewal | undefined,
    error?: AxiosError | any
}