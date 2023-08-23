import Item from "../Components/Item";
import { ItemValues } from "../Interfaces/ItemProps";
import fetchJson from "../Scripts/fetchJson"
import { useState, useEffect } from "react";

export default function ShopBrowsing(){

    const [items, setItems] = useState(Array<Object>());

    
    useEffect(() => {
        fetchJson("/items/getitems","GET").then(result => result.json()).then(data => setItems(data));
    },[]);

    return (<main>
    <div>
        <input />
    </div>
    <div className="item-container">
        {items.map((item, index) => <Item key={`item-${index}`} item={item as ItemValues}/>)}
        </div>
    </main>);
}