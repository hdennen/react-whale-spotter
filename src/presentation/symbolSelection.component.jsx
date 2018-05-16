import React, {Component} from 'react';

export default class SymbolSelection extends Component {
    constructor(props) {
        super(props);
        this.localState = {
            fromSymbol: this.props.queryOptions.fromSymbol,
            toSymbol: this.props.queryOptions.toSymbol,
            queryLimit: this.props.queryOptions.queryLimit
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.localState[event.target.id] = event.target.value.toUpperCase();

        this.props.inputHandler(this.localState);
    }


    render() {
        return (
            <form>
                <label>
                    from symbol:
                    <input type="text" id="fromSymbol" value={this.props.queryOptions.fromSymbol} onChange={this.handleChange} />
                </label>
                <label>
                    to symbol:
                    <input type="text" id="toSymbol" value={this.props.queryOptions.toSymbol} onChange={this.handleChange} />
                </label>
                <label>
                    limit:
                    <input type="text" id="queryLimit" value={this.props.queryOptions.queryLimit} onChange={this.handleChange} />
                </label>
            </form>
        )
    }
}