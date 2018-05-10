import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './skeleton/normalize.css';
import './skeleton/skeleton.css';

import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
