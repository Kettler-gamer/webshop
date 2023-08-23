import { ItemProps } from "../Interfaces/ItemProps";

import noProdImg from "../Assets/pictures/No_ProductImg.webp";

export default function Item({item}:ItemProps) {

    return (
    <div>
        <div style={{
            backgroundImage: item.image || `url(${noProdImg})`, 
            backgroundSize: "contain",
        width: "100px", 
        height:"100px"} }><p>No product image</p></div>
        <button>Lägg i varukorg</button>
        <p>{item.type}</p>
        <p>{item.itemname}</p>
        <p>{item.price} kr</p>
    </div>)
}