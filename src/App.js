import React, { Component } from 'react';
import './App.css';
import TradingData from './presentation/tradingData.component';

import AggregateData from './presentation/aggregateData.component';
import VolumeDeviance from './domain/volumeDeviance';
import ApiAdapter from './communication/api.adapter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fullCandlesData: [{data: 'No data'}],
        aggregateData: {data: 'No data'},
        fetchButtonText: 'Update Data'
    };

    this.volumeDeviance = new VolumeDeviance();
    this.api = new ApiAdapter();
  }

  crunchData(jsonData) {
      const tradingData = this.volumeDeviance.augmentTradingData(jsonData);
      const aggregateData = this.volumeDeviance.calcPeriodData(tradingData.slice());
      const fullCandlesData = this.volumeDeviance.measureAgainstAggregates(tradingData.slice(), aggregateData);

      return { aggregateData, fullCandlesData };
  }

    updateData() {
      this.setState({
          fetchButtonText: 'Updating'
      });

      this.api.fetchData()
          .then((myJson) => {
              const { fullCandlesData, aggregateData } = this.crunchData(myJson.Data);
              this.setState({
                  fullCandlesData,
                  aggregateData,
                  fetchButtonText: 'Update Data'
              });
          });
  }

  render() {
    return (
      <div className="App">
          <div className="container">
              <div className="row">
                  <div className="twelve columns flex-center">
                  </div>
              </div>

              <div className="row">
                  <div className="six columns">
                      <TradingData tradingData={this.state.fullCandlesData}/>
                  </div>
                  <div className="six columns">
                      <div className="side-bar">
                          <div>
                              <button onClick={() => this.updateData()}>
                                  {this.state.fetchButtonText}
                              </button>
                          </div>
                          <AggregateData aggregateData={this.state.aggregateData}/>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
