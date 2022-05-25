import React from 'react'
import styled from "styled-components";
import axios from 'axios';
import Header from './Header.js';
import { useEffect } from 'react/cjs/react.production.min';

export default function TodayPage ({token}){
    const dayjs = require('dayjs')
    dayjs().format()
    console.log('aaa',dayjs)
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
 React.useEffect (() =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    axios.get(URL, config)
        .then(res=>console.log(res))
        .catch(err=> console.log(err))
 },[])
     
 
return (
<Body>
    <Header>
    <h1>TrackIt</h1>
    <img src="https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" alt="" />
    </Header>
    <Container>
        <PageTitle>
            <h2>DATA</h2>
            <p>Nenhum hábito concluído ainda</p>
        </PageTitle>
    </Container>
</Body>
)
}

const Body= styled.div`
    background-color:#e5e5e5;
    height:100vh;
`
const Container = styled.div`
margin-top:80px;
padding: 30px 20px;
width: 100%;
height:100vh;
h2{
    color: #126BA5;
    font-size: 30px;
    font-weight: 400;
}
`
const PageTitle = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
`
const Button = styled.div`
    display:flex;   
    justify-content:center;
    align-items:center;
    background-color: #52B6FF;
    height: 100%;
    width: 40px;
    border-radius:10px;
    color:#FFFFFF;
    font-size:30px;
   
`