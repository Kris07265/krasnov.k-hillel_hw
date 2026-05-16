import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const countToAdd = newItem.quantity || 1;
            const existingItem = state.items.find((item) => item.id === newItem.id);

            state.totalQuantity += countToAdd;

            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: countToAdd,
                    totalPrice: newItem.price * countToAdd,
                    title: newItem.title,
                    thumbnail: newItem.thumbnail
                });
            } else {
                existingItem.quantity += countToAdd;
                existingItem.totalPrice += newItem.price * countToAdd;
            }

            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },

        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (!existingItem) return;

            state.totalQuantity--;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }

            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },

        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;