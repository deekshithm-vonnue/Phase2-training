import type { Request } from "express"


export type AuthUser = {
    userId: string
}


export type AuthenticateUser = Request & {
    user?: AuthUser
}