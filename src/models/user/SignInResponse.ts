import { AxiosError } from "axios"
import type { TokenRenewal } from "./TokenRenewal"

export type SignInResponse = {
    userName: string | undefined,
    email: string | undefined,
    tokens: TokenRenewal | undefined,
    error?: AxiosError | unknown
}