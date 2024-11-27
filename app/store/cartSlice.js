// store/cartSlice.js
export const createCartSlice = (set) => ({
    cart: [],
    loadingCart: false,
    clearCart: () => set({ cart: [] }),
    setCart: (cart) => set({ cart }),
    setLoadingCart: (loadingCart) => set({ loadingCart }),
    addToCart: (item) => set((state) => ({
        cart: [...state.cart, item]
    })),
    removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== itemId)
    }))
});
