import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import LoginPage from "./LoginPage.js"
import SingUpPage from "./SingUpPage.js"
import TodayPage from './TodayPage.js'
import HabitsPage from './HabitsPage.js'
import HistoryPage from './HistoryPage.js'
import { UserProvider } from "./userContext.js";

import "./assets/css/reset.css";
import "./assets/css/style.css";


export default function App(){

    return (
        <BrowserRouter>
           
           <UserProvider>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/cadastro" element={<SingUpPage />}/>
                    <Route path="/hoje" element={<TodayPage />}/>
                    <Route path="/habitos" element={<HabitsPage/>}/>
                    <Route path="/historico" element={<HistoryPage/>}/>
                </Routes>
            </UserProvider>
            
            
        </BrowserRouter>
    )
} 
