import Item from "../Components/Item";
import { ItemSearch } from "../Components/ItemSearch";
import { ItemValues } from "../Interfaces/ItemProps";
import fetchJson from "../Scripts/fetchJson"
import { useState, useEffect } from "react";

export default function ShopBrowsing(){

    const [items, setItems] = useState(Array<ItemValues>());

    
    useEffect(() => {
        fetchJson("/items/getitems","GET").then(result => result.json()).then(data => setItems(data));
    },[]);

    return (<main className="shop-browsing">
    <div className="browsing-search">
        <ItemSearch setFoundItems={setItems}/>
    </div>
    <div className="item-container">
        {items.map((item, index) => <Item key={`item-${index}`} item={item}/>)}
        </div>
    </main>);
}