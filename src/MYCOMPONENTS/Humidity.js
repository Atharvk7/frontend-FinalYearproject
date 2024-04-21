import React, { useState, useEffect } from 'react'
import { UseWeatherAppContext } from '../CONTEXT/Context'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Humidity = () => {

    let { state: { current }, fetchData, data, setAge, age } = UseWeatherAppContext();

    const uvlevel = (uvlevel) => {

        if (uvlevel <= 2) return 'Low';
        if (uvlevel <= 5) return 'Meduim';
        if (uvlevel <= 7) return 'High';
        if (uvlevel > 7) return 'Very High';

    }

    const getAverage = () => {
        let cnt = 0;

        let avg = 0;

        for (const [key, value] of Object.entries(current.temp)) {
            avg += value;
            cnt += 1;
        }

        return Math.round((avg / cnt))
    }
    const handleChange = (event) => {
        setAge(event.target.value);
        fetchData(getAverage(), current.humidity, Math.round(current.wind_speed))
    };
    useEffect(() => {

    }, [data])
    // async function fetchData(age) {
    //     try {
    //         fetch(`http://127.0.0.1:8000?id=${age}&temp=${getAverage()}&hum=${current.humidity}&wind=${Math.round(current.wind_speed)}`)
    //             .then((res) => {
    //                 return res.json();
    //             })
    //             .then((data) => {
    //                 console.log(data);
    //                 setData(data);
    //             });

    //     } catch (error) {
    //         console.error(error)
    //     }

    // }

    return (
        <>
            {current ? <div className="humidityWrap">
                <div className="humidityData">
                    <div className="title">
                        UV Index
                    </div>
                    <div>
                        {Math.round(current.uvi)} ({uvlevel(Math.round(current.uvi))})
                    </div>


                </div>

                <div className="humidityData">
                    <div className="title">
                        Humidity
                    </div>
                    <div>
                        {current.humidity} %
                    </div>
                </div>
                <div className="humidityData">
                    <div className="title">
                        Average Temperature
                    </div>
                    <div>
                        {getAverage()} <sup>o</sup>C
                    </div>
                </div>
                <div className="humidityData">
                    <div className="title">
                        Wind
                    </div>
                    <div>
                        {Math.round(current.wind_speed)} km/h
                    </div>
                </div>
                {/* <div className="humidityData">
                    <div className="title">
                        Water required
                    </div>
                    <div>
                        {data && data[0]?.toFixed(2)} {"   "} {"L/acre"}
                    </div>
                </div> */}
                <div className="humidityData">
                    <div className="title">
                        Water need to be supplied
                    </div>
                    <div>
                        {data && data[2]?.toFixed(2)} {"   "} {"L/acre"}
                    </div>
                </div>
                <FormControl style={{ width: "150px", color: 'white', marginTop: "8vh" }}>
                    <InputLabel id="demo-simple-select-label" style={{ color: 'white' }}>Crop</InputLabel>
                    <Select style={{ color: 'white' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Crop"
                        onChange={handleChange}
                    >
                        <MenuItem value={"tomato"}>Tomato</MenuItem>
                        <MenuItem value={"wheat"}>Wheat</MenuItem>
                        <MenuItem value={"soyabean"}>Soyabean</MenuItem>
                        <MenuItem value={"maize"}>Maize</MenuItem>
                        <MenuItem value={"onion"}>Onion</MenuItem>

                    </Select>
                </FormControl>
            </div> : ""
            }
        </>
    )
}

export default Humidity
