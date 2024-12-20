import { TokenRenewal } from "./TokenRenewal"

export type SignInResponse = {
    userName: string | undefined,
    email: string | undefined,
    tokens: TokenRenewal | undefined,
    error?: any
}