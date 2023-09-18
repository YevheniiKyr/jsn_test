import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import HeroPage from "./pages/hero";
import {HOME_ROUTE} from "./utils/constRoutes";


const AppRouter = () => {
    return (
        <Routes>
            <Route key={'superheroes'} path={''} element={<Home/>}/>
            <Route key={'superhero_page'} path={'superhero/:id'} element={<HeroPage/>}/>
            <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
        </Routes>
    );
};

export default AppRouter;