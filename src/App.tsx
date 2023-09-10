import React from 'react';
import './App.css';
import './scss/app.scss'
import {Home} from './pages/Home';
import {Route, Routes} from 'react-router-dom';
import {CartPage} from './pages/CartPage';
import {NotFoundPage} from './pages/NotFoundPage';
import {PizzaProfile} from './pages/PizzaProfile';
import {Layout} from './layouts/Layout';


function App() {


    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={'/pizza/:id'} element={<PizzaProfile/>}/>
                <Route path={'/cart'} element={<CartPage/>}/>
                <Route path={'*'} element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    );
}


export default App;
