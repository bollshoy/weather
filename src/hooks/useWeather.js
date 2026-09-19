import React, { useEffect, useState } from "react";
import axios from "axios";

const UseWeather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [errorSearch, setErrorSearch] = useState(false);
  const [errorCity, setErrorCity] = useState(null); //  проверка на правописание города

  // API
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},ua&appid=${apiKey}&units=metric`;

  // GET WEATHER
  const getWeather = async () => {
    setIsLoading(true);
    if (city.trim() === "") {
      setIsLoading(false);
      setErrorSearch(true);
    } else {
      setErrorCity(false);
      setErrorSearch(false);
      try {
        const response = await axios.get(url);
        setWeather(response.data);
      } catch (error) {
        setErrorCity(true);
        console.error("Error request: ", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const handleWeather = (event) => {
    setCity(event.target.value);
  };

  // ENTER KEYDOWN
  const handleClick = (event) => {
    if (event.key === "Enter") {
      getWeather();
    }
  };

  // Проверка на ошибки и пустую строку в инпуте
  const statusMessage = () => {
    let errorMess = "";
    if (loading) {
      errorMess = "Загрузка...";
    } else if (errorSearch) {
      errorMess = "Введите название города...";
    } else if (errorCity) {
      errorMess = "Неверный город";
    } else {
      errorMess = weather?.main?.temp;
    }

    return errorMess;
  };
  return {
    handleWeather,
    handleClick,
    getWeather,
    statusMessage,
    city,
    weather,
  };
};

export default UseWeather;
