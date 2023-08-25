export interface ItemEditProps{
    item: ItemValues,
    setSelectedItem: React.Dispatch<React.SetStateAction<ItemValues | undefined>>
}

export interface ItemProps{
    key:string,
    item:ItemValues
}

export interface ItemValues{
    itemname: string,
    image?: string,
    price: number,
    quantity: number,
    type: string
}