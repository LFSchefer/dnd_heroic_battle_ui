export type SignInResponse = {
    userName: string | undefined,
    email: string | undefined,
    token: string | undefined,
    error?: any
}