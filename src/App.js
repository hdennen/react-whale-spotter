import React, { Component } from 'react';
import './App.css';
import TradingData from './tradingData.component';

import AggregateData from './aggregateData.component';
import VolumeDeviance from './volumeDeviance';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tradingData: [],
        aggregateData: {},
        fetchButtonText: 'Fetch Data'
    };
    this.volumeDeviance = new VolumeDeviance();
  }

  crunchData(jsonData) {
      const tradingData = this.volumeDeviance.augmentTradingData(jsonData);
      const aggregateData = this.volumeDeviance.calcPeriodData(tradingData.slice());

      this.setState({
          tradingData,
          aggregateData,
          fetchButtonText: 'Fetch Data'
      });
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
            this.crunchData(myJson.Data);
          });
  }

  render() {
    return (
      <div className="App">
          <button onClick={() => this.fetchData()}>
            {this.state.fetchButtonText}
          </button>
          <TradingData tradingData={this.state.tradingData}/>
          <AggregateData aggregateData={this.state.aggregateData}/>
      </div>
    );
  }
}

export default App;
