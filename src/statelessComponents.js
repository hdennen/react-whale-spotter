import React from 'react';

function PropertyValueDisplay(props) {
    return (
        <div>
            {props.property}: {props.value}
        </div>
    )
}

function CandleData(props) {
    return (
        <div>
            {Object.keys(props.candleData).map((property, index) => {
                return <PropertyValueDisplay key={index} property={property} value={props.candleData[property]}/>;
            })}
        </div>
    )
}

export {PropertyValueDisplay};
export {CandleData};