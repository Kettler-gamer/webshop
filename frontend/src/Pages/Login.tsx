import React, {useState} from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LoginProps, TokenPayload } from "../Interfaces/LoginProps";
import fetchJson from "../Scripts/fetchJson"
import { getJwtPayload } from "../Scripts/sessionService";

export function Login({setUserRole}: LoginProps){

    const navigate: NavigateFunction = useNavigate();

    const [serverMessage, setServerMessage] = useState<string>("");

    async function loginSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setServerMessage("");

        const formData: FormData = new FormData(e.target as HTMLFormElement);

        const values = Object.fromEntries(formData);

        const response = await fetchJson("/auth/login", "POST", values);

        const responseJson = await response.json();
        
        setServerMessage(responseJson.message);

        if(response.status < 400){
            sessionStorage.setItem("token", responseJson.token);
            const payload: TokenPayload = getJwtPayload() as TokenPayload;
            setUserRole(payload.role);
            navigate("/");
        }
        
    }

    return (<div>
        <form onSubmit={loginSubmit}>
            <input name="username" required placeholder="Username..."/>
            <input name="password" required placeholder="Password..." type="password"/>
            <button type="submit">Login</button>
            <p>{serverMessage}</p>
        </form>
        </div>)
}