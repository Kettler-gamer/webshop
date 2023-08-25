import { useState } from "react";
import { ItemSearch } from "../Components/ItemSearch";
import { ItemValues } from "../Interfaces/ItemProps";
import { ItemEdit } from "../Components/ItemEdit";
import { Route, Routes } from "react-router-dom";
import { ChangePicture } from "../Components/ChangePicture";

export function Admin(){

    const [selectedItem, setSelectedItem] = useState<ItemValues>();
    const [foundItems, setFoundItems] = useState(Array<ItemValues>());

    return (<div>
        <h1>Admin Page</h1>

        <ItemSearch setFoundItems={setFoundItems}/>

        <div className="item-container">{
        foundItems.map((item, index) => 
        <ItemEdit key={`item-${index}`} item={item} setSelectedItem={setSelectedItem}/>)
        }</div>

        <Routes>
            <Route path="/changepicture" element={<ChangePicture key="" item={selectedItem as ItemValues}/>}/>
        </Routes>

    </div>);
}