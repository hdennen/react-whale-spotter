import React, {Component} from 'react';
import {CandleData} from './statelessComponents.jsx';

export default class TradingData extends Component {

    render() {

        return (
            <div>
                {this.props.tradingData.map((candleData, index) => {
                    return <CandleData key={index} candleData={candleData}/>;
                })}
            </div>
        )
    }
}