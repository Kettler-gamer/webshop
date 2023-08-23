export default async function fetchJson(url: string, method: string, body:object = {}){
    const headers: HeadersInit = [
        [ "Content-Type", "application/json"],
        [ "Authorization", sessionStorage.getItem("token") || ""],
        [ "Method", method]
    ]

    const fetchOptions: RequestInit = {
        headers
    }

    if(method !== "GET"){
        fetchOptions.body = JSON.stringify(body) as BodyInit;
    }

    return await fetch(url, fetchOptions);
}