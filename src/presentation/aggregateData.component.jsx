import React, {Component} from 'react';

import { PropertyValueDisplay } from './statelessComponents';

export default class AggregateData extends Component {

    render() {

        return (
            <div>
                {Object.keys(this.props.aggregateData).map((key, index) => {
                    return <PropertyValueDisplay key={index} property={key} value={this.props.aggregateData[key]}/>;
                })}
            </div>

        )
    }
}