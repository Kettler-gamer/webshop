import fetchJson from "../Scripts/fetchJson"

export default function ShopBrowsing(props: object){

    fetchJson("/items/getitems","GET").then(result => result.json()).then(data => console.log(data));
    

    return <main></main>
}