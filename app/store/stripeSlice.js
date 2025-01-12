// store/stripeSlice.js
export const createStripeSlice = (set) => ({
    loading: false,
    error: null,
    verifying: true,
    status: null,
    transactions: [],
    setTransactions: (transactions) => set({ transactions }),
    setLoading: (loading) => set({ loading }),
    setVerifying: (verifying) => set({ verifying }),
    setError: (error) => set({ error }),
    setStatus: (status) => set({ status }),
});
