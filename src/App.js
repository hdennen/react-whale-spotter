import React, { Component } from 'react';
import './App.css';
import TradingData from "./tradingData";

import VolumeDeviance from './volumeDeviance';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tradingData: [],
        fetchButtonText: 'Fetch Data'
    }
    this.volumeDeviance = new VolumeDeviance();
  }

  fetchData() {
      this.setState({
          fetchButtonText: 'Fetching'
      });

      fetch('https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=10')
          .then((response) => {
              return response.json();
          })
          .then((myJson) => {
          console.log(myJson.Data);
            return this.volumeDeviance.augmentTradingData(myJson.Data);
            })
          .then((augmentedArray) => {
          console.log(augmentedArray);
            this.setState({
                tradingData: augmentedArray,
                fetchButtonText: 'Fetch Data'
            });
          });
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => this.fetchData()}>
            {this.state.fetchButtonText}
        </button>
          <TradingData tradingData={this.state.tradingData}/>
      </div>
    );
  }
}

export default App;
