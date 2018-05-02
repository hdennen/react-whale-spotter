import React, {Component} from 'react';

class TradingData extends Component {
    constructor(props) {
        super(props);
    }


    render() {

        let data = 'no data';

        if (this.props.tradingData[0]) {
            data = this.props.tradingData[0].volumePriceCorrelation;
        }

        return (
            <div>
                {data}
            </div>
        )
    }


}

export default TradingData