import Item from "../Components/Item";
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
        <div className="search-input-container">
            <input className="search-input"/>
            <svg className="magnifying-glas" width={37} height={37}>
                <circle className="outer-circle" cx={20} cy={18} r={13}/>
                <circle className="inner-circle" cx={20} cy={18} r={8}/>
                <rect className="handle" x={24} y={28} width={15} height={5} rx="5" ry="5" />
            </svg>
        </div>
    </div>
    <div className="item-container">
        {items.map((item, index) => <Item key={`item-${index}`} item={item}/>)}
        </div>
    </main>);
}