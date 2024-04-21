import React from 'react'
import dayjs from 'dayjs'
import { UseWeatherAppContext } from '../CONTEXT/Context'


const Left = () => {

    const { state: { city, current } } = UseWeatherAppContext();

    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    if (!current || !city) return <div>Loading...</div>
    const index = dayjs.unix(current.dt).day();
    return (
        <>
            <div className="leftWrap">
                <div className="dateWrap">
                    <h2>{week[index]}</h2>
                    <span>
                        {dayjs.unix(current.dt).format("DD MMM YYYY")}
                    </span>
                    <span className="locationName">
                        {city}-India
                    </span>
                </div>

                <div className="weatherContainer">
                    <img alt="img" className="weathericon" src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`} />
                    <h1 className="weatherTemp">{Math.round(current.temp.max)}<sup>o</sup>C</h1>
                    <h1 className="weatherTemp">{Math.round((current.temp.max * 9 / 5) + 32)}<sup>o</sup>F</h1>
                    <h3 className="weatherDesc">{current.weather[0].main}</h3>

                </div>

            </div>
        </>
    )
}

export default Left
