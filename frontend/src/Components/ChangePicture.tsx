import { ChangeEvent, FormEvent, useState } from "react";
import { ItemProps } from "../Interfaces/ItemProps";
import fetchJson from "../Scripts/fetchJson";
import { useEffect, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

export function ChangePicture({item}: ItemProps){
    const navigate = useNavigate();
    const [image, setImage] = useState<string>();
    const [serverMessage, setServerMessage] = useState<string>("");

    async function onSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();

        if(image === undefined || image === "") return;

        const result = await fetchJson("/items/updateitemimage", "PATCH", {itemName:item.itemname, image: image});

        const resultJson = await result.json();

        setServerMessage(resultJson.message);
    }

    function chosenFile(e:ChangeEvent){
        const target = e.target as HTMLInputElement;
        const files = target.files as FileList;

        if(files.length === 0)return;
        
        const fileReader = new FileReader();

        fileReader.onloadend = (e) => {
            setImage(e.target?.result as string);
        }
        
        fileReader.readAsDataURL(files[0])
    }

    function backgroundClick(e: MouseEvent){
        const className = (e.target as HTMLDivElement).className;

        if(className === "black-background"){
            setServerMessage("");
            setImage("");
            navigate("/admin");
        }
    }

    useEffect(() => {
        if(item === undefined) navigate("/admin");
    },[navigate, item]);

    return (
    <div className="black-background" onClick={backgroundClick}>
        <form className="image-change-form" onSubmit={onSubmit}>
            <label htmlFor="imgInput" className="img-label">Choose picture</label>
            <input id="imgInput" onChange={chosenFile} type="file"/>
             
            <img src={image} alt="preview"/>
            <button disabled={image === undefined || image === ""} type="submit">Set picture</button>
            
            <p>{serverMessage}</p>
        </form>
    </div>);
}