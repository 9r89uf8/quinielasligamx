// store/quinielasSlice.js
export const createJornadaSlice = (set) => ({
    jornadas: null,
    jornada: null,
    buyJornada: null,
    loadingJornada: false,
    setJornada: (jornada) => set({ jornada }),
    setJornadas: (jornadas) => set({ jornadas }),
    setBuyJornada:(buyJornada) => set({ buyJornada}),
    setLoadingJornada: (loadingJornada) => set({ loadingJornada }),
});