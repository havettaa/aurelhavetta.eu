import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import "@amyscript/custom-info-card";
import "@amyscript/custom-input";
import CustomInputButtonComponent from "./components/CustomInputButton";

import { getWeatherData } from "./getWeatherData";

class App extends Component {
  state = {
    city: "",
    hourlyConditions: [],
    currentConditions: null,
    currentDate: "",
    queryLocation: "",
    showHourly: false
  };

  componentDidMount() {
    document.addEventListener("buttonClicked", async e => {
      if (e.detail.button === "city-input-button") {
        const inputCustomElement = document.getElementById(
          "city-custom-input-element"
        );
        this.setState({
          city: inputCustomElement.getAttribute("cityprop")
        });
        await this.handleCityUpdate(this.state.city);
      }
    });
  }

  parseData = weatherData => {
    const hourlyConditions = weatherData.weather[0].hourly;
    const currentConditions = weatherData.current_condition[0];
    const currentDate = weatherData.weather[0].date;
    const queryLocation = weatherData.request[0].query;
    this.setState({
      hourlyConditions,
      currentConditions,
      currentDate,
      queryLocation
    });
  };

  handleCityUpdate = city => {
    let weatherData = "";
    if (city !== "" || city !== undefined) {
      getWeatherData(city).then(res => {
        if (res !== null) {
          weatherData = res;
          this.parseData(weatherData);
        }
      });
    }
    const inputCustomElement = document.getElementById(
      "city-custom-input-element"
    );
    inputCustomElement.setAttribute("cityprop", "");
  };

  callback = () => {
    console.log("callback");
  };

  render() {
    return (
      <Wrapper>
        <div className="App">
          <InputSection>
            <custom-input id="city-custom-input-element" inputId="city-input" />
            <CustomInputButtonComponent
              buttonFunction={this.callback}
              buttonId="city-input-button"
            />
          </InputSection>
          {this.state.currentConditions ? (
            <WeatherWrapper>
              <custom-info-card
                cardTitle={this.state.city}
                cardwidth="300px"
                heading={this.state.currentConditions.temp_C + "℃"}
                imageurl={this.state.currentConditions.weatherIconUrl[0].value}
                text={this.state.currentConditions.weatherDesc[0].value}
              />
            </WeatherWrapper>
          ) : null}
        </div>
      </Wrapper>
    );
  }
}

const InputSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  custom-input {
    padding-right: 10px;
  }
`;

const Wrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  height: 100vh;
  padding-top: 40px;
`;

const WeatherWrapper = styled.div`
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  align-items: center;
`;

export default App;
