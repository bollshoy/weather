import "./styles.css";
import useWeather from "@/hooks/useWeather.js";

const App = () => {
  const {
    city,
    handleClick,
    handleWeather,
    getWeather,
    statusMessage,
    weather,
  } = useWeather();
  return (
    <main className="weather-page">
      <section className="weather-card">
        <header className="weather-header">
          <div>
            <span className="weather-label">WEATHER</span>
            <h1>Current conditions</h1>
          </div>

          <span className="weather-date">TODAY</span>
        </header>

        <div className="weather-divider" />

        <div className="search-row">
          <input
            type="text"
            value={city}
            placeholder="Enter city"
            onChange={handleWeather}
            onKeyDown={handleClick}
          />

          <button onClick={getWeather}>Search</button>
        </div>

        <div className="weather-main">
          <div className="weather-location">
            <span className="location-dot" />
            <span>{city || "Unknown city"}</span>
          </div>

          <div className="weather-temperature">
            {!Math.round(statusMessage())
              ? "Введите название города"
              : Math.round(statusMessage())}
            <span>°C</span>
          </div>

          <div className="weather-condition">
            <div className="weather-icon">☁</div>

            <div>
              <span>По відчуттям</span>
              <strong>
                {!Math.round(weather?.main.feels_like)
                  ? "Город не найден"
                  : Math.round(weather?.main.feels_like)}
                °C
              </strong>
            </div>
          </div>
        </div>

        <div className="weather-stats">
          <div className="weather-stat">
            <span className="stat-label">ВОЛОГІСТЬ</span>
            <strong>{weather?.main?.humidity}%</strong>
          </div>

          <div className="weather-stat">
            <span className="stat-label">ВІТЕР</span>
            <strong>{weather?.wind.speed} m/s</strong>
          </div>

          <div className="weather-stat">
            <span className="stat-label">ТИСК</span>
            <strong>{weather?.main?.pressure} hPa</strong>
          </div>

          <div className="weather-stat">
            <span className="stat-label">ВИДИМІСТЬ</span>
            <strong>{weather?.visibility} km</strong>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
