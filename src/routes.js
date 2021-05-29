import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Register from './pages/Register';
import Address from './pages/Address';



export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Register} />
                <Route path="/address" exact component={Address} />

            </Switch>
        </BrowserRouter>
    );
}