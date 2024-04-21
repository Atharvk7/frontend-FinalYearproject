import React from 'react'
import dayjs from 'dayjs'

const Weatherbox = ({ item, className, onClick }) => {

    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const idx = dayjs.unix(item.dt).day()

    return (
        <>
            <li key={item.moonrise} className={className} onClick={onClick} >
                <img alt="img" className="day-icon" src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
                <span>
                    {week[idx].slice(0, 3)}
                </span>
                <span className="day-temp">
                    {dayjs.unix(item.dt).format("DD MMM")}

                </span>
                <span className="day-temp">
                    {Math.round(item.temp.max)}<sup>o</sup>C

                </span>
                <span className="day-temp">
                    {Math.round((item.temp.max * 9 / 5) + 32)}<sup>o</sup>F
                </span>
            </li>
        </>
    )
}

export default Weatherbox
