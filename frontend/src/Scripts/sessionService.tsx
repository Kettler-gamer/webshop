import { TokenPayload } from "../Interfaces/LoginProps";

export function getJwtPayload(): TokenPayload | undefined{

    const token = sessionStorage.getItem("token");

    if(token === null) return;
    
    const payload: TokenPayload = JSON.parse(atob(token.split(".")[1])) as TokenPayload

    return payload;
}