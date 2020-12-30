import { useState, useEffect, useCallback } from 'react';

const fetchWeatherForecast = ({authorizationKey,cityName}) => {
    return fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizationKey}&locationName=${cityName}`)
        .then((res) => res.json())
        .then((data) => {
            const locationData = data.records.location[0];
            const weatherElements = locationData.weatherElement.reduce(
                (neededElements, item) => {
                    if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
                        neededElements[item.elementName] = item.time[0].parameter;
                    }
                    return neededElements;
                }, {}
            );
            return {
                description: weatherElements.Wx.parameterName,
                weatherCode: weatherElements.Wx.parameterValue,
                rainPossibility: weatherElements.PoP.parameterName,
                comfortability: weatherElements.CI.parameterName,
            }
        });
};

const fetchCurrentWeather = ({authorizationKey,locationName}) => {
    return fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}&locationName=${locationName}`)
        .then((res) => res.json())
        .then((data) => {
            const locationData = data.records.location[0];
            const weatherElements = locationData.weatherElement.reduce(
                (neededElements, item) => {
                    if (['WDSD', 'TEMP'].includes(item.elementName)) {
                        neededElements[item.elementName] = item.elementValue;
                    }
                    return neededElements;
                }, {}
            );
            return {
                locationName: locationData.locationName,
                windSpeed: weatherElements.WDSD,
                temperature: weatherElements.TEMP,
                observationTime: locationData.time.obsTime,
            }
        })
};

const useWeatherAPI = ({locationName,cityName,authorizationKey}) => {
    const [weatherElement, setWeatherElement] = useState({
        locationName: '',
        description: '',
        windSpeed: 0,
        temperature: 0,
        rainPossibility: 0,
        observationTime: new Date(),
        isLoading: true,
        weatherCode: 0,
        comfortability: '',
    });

    const fetchData = useCallback(async () => {
        setWeatherElement((prevState) => ({
            ...prevState,
            isLoading: true,
        }));
        const [currentWeather, weatherForecast] = await Promise.all([fetchCurrentWeather({authorizationKey,locationName}), fetchWeatherForecast({authorizationKey,cityName})]);
        setWeatherElement({
            ...currentWeather,
            ...weatherForecast,
            isLoading: false
        });
    }, [locationName,cityName,authorizationKey]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [weatherElement,fetchData];
};

export default useWeatherAPI;