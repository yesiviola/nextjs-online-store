import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Item = {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    };


const initialState: {
    total: any; items: Item[] 
} = {
    items: [],
    total: undefined
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload];
        },
        removeFromBasket: (state, action) => {
            const index = state.items.findIndex(
                (basketItem) => basketItem.id === action.payload.id
            );
            let newBasket = [...state.items];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`Cant remove product`);
            }
            state.items = newBasket;
        },
    },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectItems = (state: { basket: { items: any; }; }) => state.basket.items;
export const seleectTotal = (state: { basket: { items: { reducer: (arg0: (acc: any, item: any) => any, arg1: number) => any; }; }; }) => 
    state.basket.items.reducer((acc, item) => acc + item.price, 0);

export default basketSlice.reducer;