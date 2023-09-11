import React, {Suspense} from 'react';
import '../scss/app.scss'
import {Home} from '../features/Pizza/Home';
import {Route, Routes} from 'react-router-dom';
import {Layout} from '../components/Layout/Layout';


const Cart =
    React.lazy(() => import(/* webpackChunkName: 'Cart' */ '../features/Cart/Cart'))

const PizzaProfile =
    React.lazy(() => import(/* webpackChunkName: 'PizzaProfile' */ '../features/Pizza/PizzaProfile/PizzaProfile'))

const NotFound =
    React.lazy(() => import(/* webpackChunkName: 'NotFound' */ '../components/ui/NotFoundBlock/NotFound'))

function App() {


    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={'/pizza/:id'} element={<Suspense fallback={'Loading'}><PizzaProfile/></Suspense>}/>
                <Route path={'/cart'} element={ <Suspense fallback={'Loading'}><Cart/></Suspense>}/>
                <Route path={'*'} element={ <Suspense fallback={'Loading'}><NotFound/></Suspense>}/>
            </Route>
        </Routes>
    );
}


export default App;
