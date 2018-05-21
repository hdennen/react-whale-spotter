import React, {Component} from 'react';

function PropertyValueDisplay(props) {
    let value = props.value;
    if (props.property === 'time') value = new Date(props.value * 1000).toUTCString();

    return (
        <div className="key-value-element">
            {props.property}: {value}
        </div>
    )
}

function CandleData(props) {
    const candleClass = 'candle-data';
    const colorClass = props.candleData.deltaPrice > 0 ? 'up-candle' : 'down-candle';

    return (
        <div className={[candleClass, colorClass].join(' ')}>
            <div id={props.id}>
                ID: {props.id}
            </div>
            {Object.keys(props.candleData).map((property, index) => {
                return <PropertyValueDisplay key={index} property={property} value={props.candleData[property]}/>;
            })}
        </div>
    )
}

function AggregateTotals(props) {
    let value, link;
    return (
        <div>
            {Object.keys(props.totals).map((key, index) => {
                value = props.totals[key].length;

                if (value > 0) {
                    link = '#' + index.toString();

                    return (
                        <div>
                            <PropertyValueDisplay key={index} property={key} value={value} />
                            <Links candleLinks={props.totals[key]} />
                        </div>
                    )
                }
                return <PropertyValueDisplay key={index} property={key} value={value}/>;
            })}
        </div>
    )
}

function Links(props) {
    let value, link, delimiter = ', ';

    return (
        <div>
            {Object.keys(props.candleLinks).map((key, index) => {
                if (props.candleLinks.length === index + 1) delimiter = '';
                value = props.candleLinks[key];
                link = '#' + value;
                return <div className="inline"><a href={link}>{value}</a>{delimiter} </div>
            })}
        </div>
    )
}

export { PropertyValueDisplay, CandleData, AggregateTotals };