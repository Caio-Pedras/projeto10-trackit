import React from 'react'
import styled from "styled-components";
import axios from 'axios';
import Header from './Header.js';
import Footer from './Footer.js';
import { useEffect } from 'react/cjs/react.production.min';
import TodayHabitBox from './TodayHabitBox.js'
import { Link } from 'react-router-dom';
import { UserContext } from './userContext.js';

export default function TodayPage (){
    const [apiResult, setApiResult ] = React.useState('')
    const {user, setUser} = React.useContext(UserContext)
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
 React.useEffect (() => getTodayHabits(),[])
 function habitDone (id, done){    
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }
    if (!done) {
    const body = {
        done:true
    }
    axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,body,config)
        .then(getTodayHabits ())
        .catch(err=>console.log(err))
    }
    else if (done){
        const body = {
            done:false
        }
        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,body,config)
            .then(getTodayHabits ())
            .catch(err=>console.log(err))
        }
 }
 function getTodayHabits (){
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }
    axios.get(URL, config)
        .then(res=>{
            const response = res.data
                setApiResult (
                    response.map(({name, done, currentSequence, highestSequence, id}, i)=>
                <TodayHabitBox key={i}  name={name} done={done} currentSequenc={currentSequence} highestSequence={highestSequence} id={id} habitDone={habitDone}/>))
                    
        })
        .catch(err=> console.log(err))
 }
 
 
return (
<Body>
    <Header>
    <h1>TrackIt</h1>
    <img src={user.image} alt="Foto de perfil do usuário" />
    </Header>
    <Container>
        <PageTitle color='#8FC549'>
            <h2>Data, 25/05</h2>
            <p>Nenhum hábito concluído ainda</p>
        </PageTitle>
        <HabitList>
        {apiResult}
        </HabitList>
    </Container>
    <Footer>
        <Link to='/habitos'>
        <p>Hábitos</p>
        </Link>
        <p>Histórico</p>
    </Footer>
</Body>
)
}

const Body= styled.div`
    background-color:#F2F2F2;
    height:100vh;
`
const Container = styled.div`
background-color:#F2F2F2;
margin-top:80px;
padding: 30px 20px;
width: 100%;

h2{
    color: #126BA5;
    font-size: 30px;
    font-weight: 400;
}
`
const PageTitle = styled.div`
  margin-bottom:20px;
  p{ 
    margin-top:4px;
    font-size: 18px;
    color: ${props=>props.color};
  }
`
const HabitList = styled.div`
margin-bottom: 100px;
  
`