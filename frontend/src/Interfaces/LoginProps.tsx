import { Role } from "../Types/Role"

export interface LoginProps {
    setUserRole: React.Dispatch<React.SetStateAction<Role>>
}

export interface TokenPayload {
    username: string
    role: Role,
    iat: number
}