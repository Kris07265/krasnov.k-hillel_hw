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
            const stock = newItem.stock;

            if (!existingItem) {
                const actualCountToAdd = stock !== undefined ? Math.min(countToAdd, stock) : countToAdd;

                if (actualCountToAdd > 0) {
                    state.totalQuantity += actualCountToAdd;
                    state.items.push({
                        id: newItem.id,
                        price: newItem.price,
                        quantity: actualCountToAdd,
                        totalPrice: newItem.price * actualCountToAdd,
                        title: newItem.title,
                        thumbnail: newItem.thumbnail,
                        stock: stock
                    });
                }
            } else {
                const availableToAdd = existingItem.stock !== undefined ? existingItem.stock - existingItem.quantity : Infinity;
                const actualCountToAdd = Math.min(countToAdd, availableToAdd);

                if (actualCountToAdd > 0) {
                    existingItem.quantity += actualCountToAdd;
                    existingItem.totalPrice += newItem.price * actualCountToAdd;
                    state.totalQuantity += actualCountToAdd;
                }
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

        deleteItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.items = state.items.filter((item) => item.id !== id);
                state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
            }
        },

        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    },
});

export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;