import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ComparisonData from "./comparisonData.component";
import VolumeDevianceChart from "./volumeDevianceChart.component";

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={ComparisonData} />
            <Route exact path='/chart' component={VolumeDevianceChart} />
        </Switch>
    </main>
);

export default Main