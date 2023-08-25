import { ItemValues } from "./ItemProps";

export interface ItemSearchProps {
    setFoundItems: React.Dispatch<React.SetStateAction<Array<ItemValues>>>
}