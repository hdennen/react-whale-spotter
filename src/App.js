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
          <div className="container">
              <div className="row">
                  <div className="twelve columns flex-center">
                      <div>
                          <button onClick={() => this.fetchData()}>
                              {this.state.fetchButtonText}
                          </button>
                      </div>
                  </div>
              </div>

              <div className="row">
                  <div className="six columns">
                      <TradingData tradingData={this.state.tradingData}/>
                  </div>
                  <div className="six columns">
                      <AggregateData aggregateData={this.state.aggregateData}/>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
