import React from 'react'
import styled from "styled-components";
import axios from 'axios';
import Header from './Header.js';
import Footer from './Footer.js';
import { Link } from 'react-router-dom';
import { UserContext } from './userContext.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export default function HistoryPage (){
    const {user} = React.useContext(UserContext)
return (
<Body>
    <Header>
    <h1>TrackIt</h1>
    <img src={user.image} alt="Foto de perfil do usuário" />
    </Header>
    <Container>
        <PageTitle color='#8FC549'>
            <h2>Histórico</h2>
        </PageTitle>
        <HabitList>
        </HabitList>
    </Container>
    <Footer>
        <Link to='/habitos'>
        <p>Hábitos</p>
        </Link>
        <Link to='/hoje'>
        <MenuButton>
        <div style={{ position:'absolute', padding:'6px'}}>
                <CircularProgressbar  
                    value={user.totalDone}  
                    maxValue={user.total}
                    styles={buildStyles({
                        pathColor: `#FFFFFF`,
                        trailColor: 'none',
                      })}  />
            </div>
            Hoje
            </MenuButton>
        </Link>
        <Link to='/historico'>
        <p>Histórico</p>
        </Link>
    </Footer>
</Body>
)
}

const Body= styled.div`
    background-color:#F2F2F2;
    height:100vh;
    position:fixed;
    width:100%;
    top:0;
    left:0;
    overflow-y:scroll;
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
const MenuButton =styled.div`
background-color: #52B6FF;
font-size: 20px;
display:flex;
align-items:center;
justify-content:center;
color: #FFFFFF;
border-radius:50%;
height: 90px;
width:90px;
margin-bottom:50px;
position:relative;
`