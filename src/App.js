import styled from '@emotion/styled';
import WeatherCard from './view/WeatherCard';
import { ThemeProvider } from '@emotion/react';
import { useState, useEffect,useCallback,useMemo } from 'react';
import { getMoment,findLocation } from './utils/helpers';
import useWeatherAPI from './hooks/useWeatherAPI';
import WeatherSetting from './view/WeatherSetting';

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AUTHORIZATION_KEY = 'CWB-DF363BD8-F314-4B22-9D70-66FDE90068E2';

const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  }
}

function App() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [currentPage,setCurrentPage]=useState('WeatherCard');
  const storageCity=localStorage.getItem('cityName') || '臺北市';
  const [currentCity,setCurrentCity]=useState(storageCity);
  const currentLocation=useMemo(()=>findLocation(currentCity),[currentCity]);
  const {cityName,locationName,sunriseCityName}=currentLocation;
  const moment=useMemo(()=>getMoment(sunriseCityName),[sunriseCityName]);

  const handleCurrentPageChange=(currentPage)=>{
    setCurrentPage(currentPage);
  };

  const [weatherElement,fetchData]=useWeatherAPI({
    locationName,cityName,authorizationKey:AUTHORIZATION_KEY
  });

  const handleCurrentCityChange=(currentCity)=>{
    setCurrentCity(currentCity);
  };

  useEffect(() => {
    setCurrentTheme(moment==='day'?'light':'dark');
  }, [moment]);

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        {currentPage === 'WeatherCard' &&(
          <WeatherCard
        cityName={cityName}
        weatherElement={weatherElement}
        moment={moment}
        fetchData={fetchData}
        handleCurrentPageChange={handleCurrentPageChange} />
        )}
        {currentPage === 'WeatherSetting' && (<WeatherSetting handleCurrentPageChange={handleCurrentPageChange} handleCurrentCityChange={handleCurrentCityChange} cityName={cityName} />)}
      </Container>
    </ThemeProvider>
  );
}

export default App;
