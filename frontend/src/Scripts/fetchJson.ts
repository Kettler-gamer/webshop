export default async function fetchJson(url: string, method: string, body:object = {}){
    const headers: HeadersInit = [
        [ "Content-Type", "application/json"],
        [ "Authorization", sessionStorage.getItem("token") || ""]
    ]

    const fetchOptions: RequestInit = {
        headers,
        method
    }

    if(method !== "GET"){
        fetchOptions.body = JSON.stringify(body) as BodyInit;
    }

    return await fetch(url, fetchOptions);
}