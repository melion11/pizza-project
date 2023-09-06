import React, {useState} from 'react';
import './App.css';
import './scss/app.scss'
import {Header} from "./components/Header/Header";
import {Home} from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import {CartPage} from "./pages/CartPage";
import {NotFoundPage} from "./pages/NotFoundPage";


function App() {

    const [searchValue, setSearchValue] = useState('')

    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="content">
                    <Routes>
                        <Route path={'/'} element={<Home searchValue={searchValue}/>}/>
                        <Route path={'/cart'} element={<CartPage/>}/>
                        <Route path={'*'} element={<NotFoundPage/>}/>
                    </Routes>
                </div>
            </div>
    );
}


export default App;
