import { ChangeEvent, FormEvent, useState } from "react";
import { ItemProps } from "../Interfaces/ItemProps";
import fetchJson from "../Scripts/fetchJson";

export function ChangePicture({item}: ItemProps){

    const [image, setImage] = useState<string>();

    async function onSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();

        console.log(item);

        if(image === undefined || image === "") return;

        const result = await fetchJson("/items/updateitemimage", "PATCH", {itemName:item.itemname, image: image});

        const resultJson = await result.json();

        console.log(resultJson);
        
    }

    function chosenFile(e:ChangeEvent){
        const target = e.target as HTMLInputElement;
        const files = target.files as FileList;
        const fileReader = new FileReader();

        fileReader.onloadend = (e) => {
            setImage(e.target?.result as string);
        }
        
        fileReader.readAsDataURL(files[0])
    }

    return (
    <div className="black-background">
        <form onSubmit={onSubmit}>
            <img src={image} alt="chosen"/>
            <input onChange={chosenFile} type="file"/>
            <button type="submit">Set picture</button>
        </form>
    </div>);
}