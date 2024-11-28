// store/cartSlice.js
export const createCartSlice = (set) => ({
    cart: [],
    loadingCart: false,
    freeQuinielasAmount: 0, // Add this line
    setUserFreeQuinielasAmount: (amount) => set({ freeQuinielasAmount: amount }), // Add this function
    clearCart: () => set({ cart: [] }),
    setCart: (cart) => set({ cart }),
    setLoadingCart: (loadingCart) => set({ loadingCart })
});

