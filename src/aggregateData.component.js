import React, {Component} from 'react';

function AggregateDataProperty(props) {
    return (
        <div>
            {props.property}: {props.value}
        </div>
    )
}

export default class AggregateData extends Component {

    render() {

        return (
            <div>
                {Object.keys(this.props.aggregateData).map((key, index) => {
                    return <AggregateDataProperty key={index} property={key} value={this.props.aggregateData[key]}/>;
                })}
            </div>

        )
    }
}