import React, { useReducer, useContext, Children, useState } from "react";


import { ActionReducer } from "./Action";

const WeatherAppcontext = React.createContext();

const WeatherAppProvider = ({ children }) => {
    const [age, setAge] = useState("")
    const [state, dispatch] = useReducer(ActionReducer, {
        city: 'Pune',
        current: '',
        daily: ''

    });
    const [data, setData] = useState()
    async function fetchData(averagetemp, humidity, wind_speed) {

        setData()
        console.log(age)
        try {
            fetch(`http://127.0.0.1:8000?id=${age}&temp=${averagetemp}&hum=${humidity}&windspeed=${wind_speed}`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setData(data);
                });

        } catch (error) {
            console.error(error)
        }

    }
    return (
        <>
            <WeatherAppcontext.Provider value={{ state, dispatch, fetchData, setData, data, setAge, age }}>

                {children}
            </WeatherAppcontext.Provider>

        </>

    )

}

export default WeatherAppProvider

export const UseWeatherAppContext = () => {
    return useContext(WeatherAppcontext)
}