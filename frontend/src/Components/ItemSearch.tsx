import { ChangeEvent, useState } from "react";
import { ItemSearchProps } from "../Interfaces/ItemSearchProps";
import fetchJson from "../Scripts/fetchJson";

export function ItemSearch({setFoundItems}:ItemSearchProps) {

    const [searchQuery, setSearchQuery] = useState<string>("");

    function onSearchChange(e: ChangeEvent){
        const target = e.target as HTMLInputElement;
        setSearchQuery(target.value);
    }

    async function searchClick(){
        const response = await fetchJson(`/items/searchitems?itemname=${searchQuery}`, "GET");

        const responseJson = await response.json();

        setFoundItems(responseJson);
    }

    return (<div className="search-input-container">
    <input className="search-input" value={searchQuery} onChange={onSearchChange}/>
    <svg className="magnifying-glas" onClick={searchClick} width={37} height={37}>
        <circle className="outer-circle" cx={20} cy={18} r={13}/>
        <circle className="inner-circle" cx={20} cy={18} r={8}/>
        <rect className="handle" x={24} y={28} width={15} height={5} rx="5" ry="5" />
    </svg>
</div>);
}