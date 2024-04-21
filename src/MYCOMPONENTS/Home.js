import React from 'react'
import Cityinput from './Cityinput'
import WeeklyData from './WeeklyData'
import Humidity from './Humidity'
import Left from './Left'

const Home = () => {
    return (
        <div className="homeWrap">
            <div className="weatherSection">
                <Left />
                <div className="right">
                    {/* get the cityinput from user */}
                    <Cityinput />
                    <br />
                    {/* Display the weekly data to user */}
                    <WeeklyData />

                    {/* detail  description of weather */}
                    <Humidity />

                </div>
            </div>

        </div>
    )
}

export default Home
