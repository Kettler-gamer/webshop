import { useState } from "react";
import { ItemSearch } from "../Components/ItemSearch";
import { ItemValues } from "../Interfaces/ItemProps";
import { ItemEdit } from "../Components/ItemEdit";

export function Admin(){

    const [foundItems, setFoundItems] = useState(Array<ItemValues>());

    return (<div>
        <h1>Admin Page</h1>

        <ItemSearch setFoundItems={setFoundItems}/>

        <div className="item-container">{
        foundItems.map((item, index) => 
        <ItemEdit key={`item-${index}`} item={item}/>)
        }</div>
        
    </div>);
}