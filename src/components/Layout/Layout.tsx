import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from '../index';



export const Layout = () => {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    );
};

