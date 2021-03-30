import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Home';
import Search from './Components/Search';
import Details from './Components/Details';
import Header from './Components/Header';
import PlaceOrder from './Components/placeorder';


const Router = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Route exact path="/" component={Home}/>
            <Route path="/Search" component={Search}/>
            <Route path="/Details" component={Details}/>
            <Route path="/placeorder" component={PlaceOrder}/>
        </BrowserRouter>
    )
}

export default Router;