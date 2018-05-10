import React, {Component} from 'react';

export default class SymbolSelection extends Component {
    constructor(props) {
        super(props);
        this.localState = {
            fromSymbol: this.props.symbolPair.fromSymbol,
            toSymbol: this.props.symbolPair.toSymbol
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.localState[event.target.id] = event.target.value;

        this.props.inputHandler(this.localState);
    }


    render() {
        return (
            <form>
                <label>
                    from symbol:
                    <input type="text" id="fromSymbol" value={this.props.symbolPair.fromSymbol} onChange={this.handleChange} />
                </label>
                <label>
                    to symbol:
                    <input type="text" id="toSymbol" value={this.props.symbolPair.toSymbol} onChange={this.handleChange} />
                </label>
            </form>
        )
    }
}