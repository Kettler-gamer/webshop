import { ItemEditProps } from "../Interfaces/ItemProps";
import { NavigateFunction, useNavigate } from "react-router-dom";
import noProdImg from "../Assets/pictures/No_ProductImg.webp";

export function ItemEdit({item, setSelectedItem}: ItemEditProps) {
    const itemPictureStyle = { backgroundImage: `url(${item.image || noProdImg})` }
    const navigate: NavigateFunction = useNavigate();

    const itemPicture = 
    <div className="item-picture" style={itemPictureStyle}>
        {item.image === null && <p>No product image</p>}
        <button className="item-add-to-cart-btn" onClick={changePictureClick}>Ändra bild</button>
    </div>;

    function changePictureClick() {
        setSelectedItem(item);
        navigate("/admin/changepicture");
    }

    return (
    <div className="item">
        {itemPicture}
        <p className="item-type">{item.type}</p>
        <p className="item-name">{item.itemname}</p>
        <p className="item-price">{item.price} kr</p>
    </div>)
}