import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import LoginPage from "./LoginPage.js"
import SingUpPage from "./SingUpPage.js"
import TodayPage from './TodayPage.js'
import HabitsPage from './HabitsPage.js'

import "./assets/css/reset.css";
import "./assets/css/style.css";


export default function App(){
const [token, setToken] = React.useState('')
    return (
        <BrowserRouter>
           
            
            <Routes>
                <Route path="/" element={<LoginPage setToken={setToken} />} />
                <Route path="/cadastro" element={<SingUpPage />}/>
                <Route path="/hoje" element={<TodayPage token={token} />}/>
                <Route path="/habitos" element={<HabitsPage token={token}/>}/>
            </Routes>
            
        </BrowserRouter>
    )
} 

 {/* <Header /> */}
/* <Route path="/cadastro" element={}/>
<Route path="/habitos" element={}/>
<Route path="/hoje" element={}/>
<Route path="/historico" element={}/> */