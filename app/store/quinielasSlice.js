// store/quinielasSlice.js
export const createQuinielasSlice = (set) => ({
    quinielas: null,
    quiniela: null,
    userQuinielas: null,
    winners: null,
    dummy: false,
    loadingQuinielas: false,
    clearQuinielas: () => set({ quinielas: null, quiniela: null, userQuinielas: null, winners: null }),
    setQuiniela: (quiniela) => set({ quiniela }),
    setQuinielas: (quinielas) => set({ quinielas }),
    setUserQuinielas: (userQuinielas) => set({ userQuinielas }),
    setWinners: (winners) => set({ winners }),
    setDummy: (dummy) => set({ dummy }),
    setLoadingQuinielas: (loadingQuinielas) => set({ loadingQuinielas }),
    addQuiniela: (quiniela) => set((state) => ({ quinielas: [quiniela, ...state.quinielas] })),
    removeQuiniela:(id) => set((state) => ({ quinielas: state.quinielas.filter((quiniela) => quiniela.id !== id) }))
});