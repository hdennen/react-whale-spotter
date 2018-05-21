import React, {Component} from 'react';
import {CandleData} from './statelessComponents.jsx';

export default class TradingData extends Component {

    render() {

        return (
            <div>
                {this.props.tradingData.map((candleData, index) => {
                    return <CandleData id={index} key={index} candleData={candleData}/>;
                })}
            </div>
        )
    }
}