// store/postSlice.js
export const createCartSlice = (set) => ({
    cart: null,
    loadingCart: false,
    clearCart: () => set({ cart: null }),
    setCart: (cart) => set({ cart }),
    setLoadingCart: (loadingCart) => set({ loadingCart })
});
