import React, {createContext, useState} from 'react';
import './App.css';
import './scss/app.scss'
import {Header} from "./components/Header/Header";
import {Home} from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import {CartPage} from "./pages/CartPage";
import {NotFoundPage} from "./pages/NotFoundPage";

type SearchContextType = {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}


export const SearchContext = createContext<SearchContextType>({
    searchValue: '',
    setSearchValue: () => {}
});

function App() {

    const [searchValue, setSearchValue] = useState('')

    return (
        <SearchContext.Provider value={{searchValue, setSearchValue}}>
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/cart'} element={<CartPage/>}/>
                        <Route path={'*'} element={<NotFoundPage/>}/>
                    </Routes>
                </div>
            </div>
        </SearchContext.Provider>
    );
}


export default App;
