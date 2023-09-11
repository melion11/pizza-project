import React from 'react';
import '../scss/app.scss'
import {Home} from '../features/Pizza/Home';
import {Route, Routes} from 'react-router-dom';
import {NotFound} from '../components/ui/NotFoundBlock/NotFound';
import {PizzaProfile} from '../features/Pizza/PizzaProfile/PizzaProfile';
import {Layout} from '../components/Layout/Layout';
import {Cart} from "../features/Cart/Cart";


function App() {


    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={'/pizza/:id'} element={<PizzaProfile/>}/>
                <Route path={'/cart'} element={<Cart/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Route>
        </Routes>
    );
}


export default App;
