import { ItemProps } from "../Interfaces/ItemProps";

import noProdImg from "../Assets/pictures/No_ProductImg.webp";

export default function Item({item}:ItemProps) {

    const itemPictureStyle = { backgroundImage: item.image || `url(${noProdImg})` }

    const itemPicture = 
    <div className="item-picture" style={itemPictureStyle}>
        {item.image !== undefined && <p>No product image</p>}
        <button className="item-add-to-cart-btn">Lägg i varukorg</button>
    </div>;

    return (
    <div className="item">
        {itemPicture}
        <p className="item-type">{item.type}</p>
        <p className="item-name">{item.itemname}</p>
        <p className="item-price">{item.price} kr</p>
    </div>)
}