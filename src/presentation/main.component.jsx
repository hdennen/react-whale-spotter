import React, {Component} from 'react';

import TradingData from './tradingData.component.jsx';
import AggregateData from './aggregateData.component.jsx';
import Toggle from './toggle.component.jsx';

import VolumeDeviance from '../domain/volumeDeviance';
import ApiAdapter from '../communication/api.adapter';
import SymbolSelection from "./symbolSelection.component.jsx";
import { AggregateTotals } from "./statelessComponents";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullCandlesData: [{data: 'No data'}],
            aggregateData: {data: 'No data'},
            totals: {},
            fetchButtonText: 'Update Data',
            includeCurrentCandle: false,
            queryOptions: {
                fromSymbol: 'BTC',
                toSymbol: 'USD',
                queryLimit: 24
            }
        };

        this.volumeDeviance = new VolumeDeviance();
        this.api = new ApiAdapter();

        this.inputHandler = this.inputHandler.bind(this);
        this.includeCurrentCandleHandler = this.includeCurrentCandleHandler.bind(this);
    }

    updateData() {
        this.setState({
            fetchButtonText: 'Updating'
        });

        const fetchOptions = {
            ...this.state.queryOptions
        };

        this.api.fetchData(fetchOptions)
            .then((myJson) => {
                if (!this.state.includeCurrentCandle) myJson.Data.pop();

                const { fullCandlesData, aggregateData, totals } = this.volumeDeviance.crunchData(myJson.Data);

                this.setState({
                    fullCandlesData,
                    aggregateData,
                    totals,
                    fetchButtonText: 'Update Data'
                });
            });
    }

    inputHandler(queryOptions) {
        this.setState({queryOptions});
    }

    includeCurrentCandleHandler(value) {
        this.setState(value);
    }


    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <div className="twelve columns flex-center">
                            <SymbolSelection queryOptions={this.state.queryOptions} inputHandler={this.inputHandler} />
                            <Toggle includeCurrentCandle={this.state.includeCurrentCandle} inputHandler={this.includeCurrentCandleHandler} />
                            <div>
                                <button onClick={() => this.updateData()}>
                                    {this.state.fetchButtonText}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="six columns">
                            <TradingData tradingData={this.state.fullCandlesData}/>
                        </div>
                        <div className="six columns">
                            <div className="side-bar">
                                <AggregateData aggregateData={this.state.aggregateData}/>
                                <AggregateTotals totals={this.state.totals}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}