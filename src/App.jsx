import React, { Component } from 'react';
import './App.css';
import Main from "./presentation/main.component";
import Header from "./presentation/header.component";

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Main/>
            </div>
        )
    }
}

export default App;
