import React, {Component} from 'react';

export default class Toggle extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.inputHandler({includeCurrentCandle: event.target.checked});
    }

    render() {
        return (
            <label>Include Current Candle
                <input type="checkbox" onChange={this.handleChange} value={this.props.isChecked} />
            </label>
        );
    }
}