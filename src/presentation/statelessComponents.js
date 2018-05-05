import React from 'react';

function PropertyValueDisplay(props) {
    return (
        <div className="key-value-element">
            {props.property}: {props.value}
        </div>
    )
}

function CandleData(props) {
    const candleClass = 'candle-data';
    const colorClass = props.candleData.deltaPrice > 0 ? 'up-candle' : 'down-candle';

    return (
        <div className={[candleClass, colorClass].join(' ')}>
            {Object.keys(props.candleData).map((property, index) => {
                return <PropertyValueDisplay key={index} property={property} value={props.candleData[property]}/>;
            })}
        </div>
    )
}

export { PropertyValueDisplay, CandleData };