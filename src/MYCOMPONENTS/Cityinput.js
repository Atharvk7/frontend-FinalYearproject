import React, { useEffect, useState } from 'react'
import { UseWeatherAppContext } from '../CONTEXT/Context'
import cities from '../DATA/city.json'


const Cityinput = () => {

    const [selectedcity, selectedSetcity] = useState({ city: 'Pune', lat: '18.5203', long: '73.8567' })

    const { state: { city }, dispatch } = UseWeatherAppContext()

    const handlsubmit = (e) => {

        if (e.key !== 'Enter') return;

        // @ts-ignore
        let currentcity = document.getElementById('cityinput').value


        currentcity = currentcity.toLowerCase();

        currentcity = currentcity[0].toUpperCase() + currentcity.substring(1);



        const citydata = cities.map((city) => {

            return { 'city': city.city, 'lat': city.lat, 'long': city.lng }
        })

        const selectedCity = citydata.filter((city) => {
            return city.city === currentcity
        })


        if (!selectedCity[0]) {
            alert("city not exist please check the spelling");
        }
        else {
            selectedSetcity(selectedCity[0]);
            dispatch({
                type: 'SET_CITY',
                payload: currentcity
            })
        }

    }


    const ApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${selectedcity.lat}&lon=${selectedcity.long}&exclude=hourly,minutely&units=metric&lang=tr&appid=34480b98aa332da53123a0ac63a4ea9d`

    const Apicall = async () => {

        await fetch(ApiUrl).then(async (result) => {

            const parsedresult = await result.json();

            console.log(parsedresult)

            let daily = parsedresult.daily;


            dispatch({
                type: 'SET_DAILY',
                payload: daily
            })

        }).catch((error) => {

            console.log("The error is ", error)
        })

    }

    useEffect(() => {
        Apicall();
    }, [selectedcity])


    return (
        <div className="citydiv">

            <input type="text" id="cityinput" placeholder="Enter the city and press Enter ..." onKeyDown={handlsubmit} />

        </div>
    )
}

export default Cityinput
