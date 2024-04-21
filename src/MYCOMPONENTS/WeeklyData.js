import React, { useEffect, useState } from 'react'
import { UseWeatherAppContext } from '../CONTEXT/Context'
import Weatherbox from './Weatherbox';

const WeeklyData = () => {

    const [selectedcard, setselectedcard] = useState(0);

    const { state: { daily }, dispatch, fetchData, data } = UseWeatherAppContext();
    console.log(daily)

    const updatecurrent = () => {
        fetchData(Number(daily[selectedcard]?.temp?.day), Number(daily[selectedcard]?.humidity), Number(daily[selectedcard]?.wind_speed))

        return (
            dispatch({
                type: 'SET_CURRENT',
                payload: daily[selectedcard]

            })

        )
    }

    useEffect(() => {
        updatecurrent();

    }, [daily, selectedcard])

    return (
        <div className="cardWrap">
            <ul className="cardList">
                {
                    daily && daily.length > 0 ?

                        daily.map((item, index) => {
                            if (index < 6)
                                return <Weatherbox key={index} item={item}
                                    className={index === selectedcard ? 'active' : ''}
                                    onClick={() => {
                                        setselectedcard(index)
                                        updatecurrent()
                                    }} />
                        })

                        : ""
                }
            </ul>
        </div>
    )
}

export default WeeklyData
