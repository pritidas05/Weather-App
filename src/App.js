import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";

function App() {
  const apiKey = "8d72f2a33433e64be35e2adb1332d2fa";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  const getCurrentDateAndTime = () => {
    const date = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  };

  const getCurrentSeason = () => {
    const date = new Date();
    const month = date.getMonth();
    if (month >= 2 && month <= 4) {
      return "Summer";
    } else if (month >= 5 && month <= 7) {
      return "Monsoon";
    } else if (month >= 8 && month <= 10) {
      return "Autumn";
    } else {
      return "Winter";
    }
  };

  const convertMStoKmHr = (metersPerSec) => {
    return (metersPerSec * 3.6).toFixed(2);
  };

  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input
            type="text"
            className="form-control"
            value={inputCity}
            onChange={handleChangeInput}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {Object.keys(data).length > 0 && (
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded wetherResultBox">
            <div className="weatherInfo">
              <img
                className="weathorIcon"
                src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
                alt=""
              />
              <h5 className="weathorCity">{data?.name}</h5>
              <h6 className="weathorTemp">
                {((data?.main?.temp) - 273.15).toFixed(2)}°C
              </h6>
            </div>
            <div className="additionalInfo">
              <p>
                <i className="far fa-calendar-alt"></i> Date and Time:{" "}
                {getCurrentDateAndTime()}
              </p>
              <p>
                <i className="fas fa-sun"></i> Season: {getCurrentSeason()}
              </p>
              <p>
                <i className="fas fa-wind"></i> Wind Speed:{" "}
                {convertMStoKmHr(data?.wind?.speed)} km/hr
              </p>
              <p>
                <i className="fas fa-tint"></i> Humidity: {data?.main?.humidity}%
              </p>
              <p>
                <i className="fas fa-cloud-rain"></i> Light Rain:{" "}
                {data?.weather?.[0]?.main === "Rain" ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
