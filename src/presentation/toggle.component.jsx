import React, {Component} from 'react';

export default class Toggle extends Component {
    constructor(props) {
        super(props);
        this.localState = {
            isChecked: props.includeCurrentCandle,
            tickHandler: props.tickHandler
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.localState.isChecked = value;
        this.props.checkboxHandler(value)
    }

    render() {
        return (
            <input type="checkbox" onChange={this.handleChange} value={this.localState.isChecked}/>
        );
    }
}