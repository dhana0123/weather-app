import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { GiDrop } from "react-icons/gi";

import { AiOutlineColumnWidth } from "react-icons/ai";
import { WiStrongWind, WiBarometer } from "react-icons/wi";
import { IoCloud, IoEyeSharp } from "react-icons/io5";

const INITAL_STATE = {
  main: {
    humidity: "--",
    temp: "--",
    pressure: "--",
  },
  wind: {
    speed: "--",
  },
  clouds: {
    all: "--",
  },
  visibility: "--",
};

//NOTE: no money to host django project thats why im using the direclty..

function App() {
  const [weatherData, setWeatherData] = React.useState(INITAL_STATE);
  const [loading, setLoading] = React.useState(false);
  const [city, setCity] = React.useState("");
  const [error, setError] = React.useState("");

  const WEATHER_API = "d6ba33612f69b756eb4a4c8dc8acd6d1";

  const getCurrentWeather = () => {
    setLoading(true);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API}`
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || "Network error");
          });
        }
        return response.json();
      })
      .then((jsonData) => {
        setLoading(false);
        setError("");
        setWeatherData(jsonData);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (city.length === 0) {
      setWeatherData(INITAL_STATE);
      setError("");
    }
  }, [city]);

  return (
    <div>
      <Container>
        <Header />
        <div className="input__container">
          <input
            className="search__input"
            type="search"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name"
            required
          />
          <button
            className="search__button"
            onClick={() => getCurrentWeather()}
          >
            Get Details
          </button>
        </div>

        <div style={{ maxWidth: "50rem", margin: "auto", paddingTop: "2rem" }}>
          {loading ? (
            <p className="mt-4  ms-5 text-white" style={{ fontSize: "4rem" }}>
              Loading...
            </p>
          ) : error ? (
            <p className="mt-4  ms-5 text-white " style={{ fontSize: "4rem" }}>
              {error}
            </p>
          ) : (
            <>
              <Row className="">
                <Col sm={4}>
                  <InfoBox
                    title={"Humidity"}
                    value={weatherData.main.humidity}
                    unit={"%"}
                    Icon={<GiDrop size={70} />}
                  />
                </Col>
                <Col sm={4}>
                  <InfoBox
                    title={"Tempature"}
                    value={weatherData.main.temp}
                    unit={"K"}
                    Icon={<AiOutlineColumnWidth size={70} />}
                  />
                </Col>
                <Col sm={4}>
                  <InfoBox
                    title={"Wind Speed"}
                    value={weatherData.wind.speed}
                    unit={"m/s"}
                    Icon={<WiStrongWind size={70} />}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                  <InfoBox
                    title={"Clouds"}
                    value={weatherData.clouds.all}
                    unit={"%"}
                    Icon={<IoCloud size={70} />}
                  />
                </Col>
                <Col sm={4}>
                  <InfoBox
                    title={"Visibility"}
                    value={weatherData.visibility}
                    unit={"m"}
                    Icon={<IoEyeSharp size={70} />}
                  />
                </Col>
                <Col sm={4}>
                  <InfoBox
                    title={"Pressure"}
                    value={weatherData.main.pressure}
                    unit={"hPa"}
                    Icon={<WiBarometer size={70} />}
                  />
                </Col>
              </Row>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
