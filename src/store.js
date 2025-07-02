import { create } from "zustand"

const useWeatherStore = create((set) => ({
    inputCity: "",
    weather:  null,
    error: "",
    loading: false,

    setInputCity: (city) => set({inputCity: city}),
    setWeather: (data) => set({weather: data}),
    setError: (err) => set({error: err}),
    setLoading: (state) => set({loading : state}),

}))

export default useWeatherStore