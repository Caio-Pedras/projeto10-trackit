import React from 'react'
import styled from "styled-components";
import Header from './Header.js';
import Footer from './Footer.js';
import { Link } from 'react-router-dom';
import { UserContext } from './userContext.js';
import dayjs from 'dayjs';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import locale from "dayjs/locale/pt-br"
import TodayHabitBox from './TodayHabitBox.js';

export default function TodayPage() {

    const NOW = dayjs().locale("pt-br")
    const dayNow = CapitalizeDay(NOW)
    const [render,setRender] = React.useState('')
    const { user, apiResult,progress, getTodayHabits} = React.useContext(UserContext)
    const [Block, setBlock] = React.useState(false)
    function CapitalizeDay(str) {
        str = str.format("dddd").replace("-feira", '')
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function checkTotalDone(element) {
        if (element > 0) return true
        else return false
    }
    function RenderTodayHabits(array) {           
        if (array === null) return  
        setRender(array.map(({ name, done, currentSequence, highestSequence, id }, i) => 
        <TodayHabitBox key={i} name={name} done={done} currentSequence={currentSequence} highestSequence={highestSequence} id={id}  habitDone={habitDone} Block={Block} setBlock={setBlock}/>))
    }
function habitDone(id, done) {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            if (!done) {
                const body = {
                    done: true
                }
                axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, body, config)
                    .then( setBlock(false),getTodayHabits())
                    .catch(err => {alert('Houve um erro', err);})
            }
            else if (done) {
                const body = {
                    done: false
                }
                axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, body, config)
                    .then( setBlock(false),getTodayHabits())
                    .catch(err => console.log('erro no unchekc', err))
            }      
    }

React.useEffect(()=>RenderTodayHabits(apiResult), [apiResult])

    if (user !== null) {
        return (
            <Body>
                <Header>
                    <h1>TrackIt</h1>
                    <img src={user.image} alt="Foto de perfil do usuário" />
                </Header>
                <Container>
                    <PageTitle color={checkTotalDone(progress.totalDone) ? '#8FC549' : '#BABABA'}>
                        <h2>{dayNow}, {NOW.format("DD/MM")}</h2>
                        {progress.totalDone ? <p>{(progress.totalDone * 100 / progress.total).toFixed(0)}% dos hábitos concluídos</p> : <p>Nenhum hábito concluído ainda</p>}
                    </PageTitle>
                    <HabitList>
                        {render}
                    </HabitList>
                </Container>
                <Footer>
                    <Link to='/habitos'>
                        <p>Hábitos</p>
                    </Link>
                    <Link to='/hoje'>

                        <MenuButton>
                            <div style={{ position: 'absolute', padding: '6px' }}>
                                <CircularProgressbar
                                    value={progress.totalDone}
                                    maxValue={progress.total}
                                    styles={buildStyles({
                                        pathColor: `#FFFFFF`,
                                        trailColor: 'none',
                                    })} />
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
    } else return (
        <Body>
            <Header>
                <h1>TrackIt</h1>
            </Header>
            <Container>
                <PageTitle>
                    <h2>É necessário estar logado para acessar essa página</h2>
                </PageTitle>
            </Container>
            <Footer>
            </Footer>
        </Body>
    )
}

const Body = styled.div`
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
    color: ${props => props.color};
  }
`
const HabitList = styled.div`
margin-bottom: 100px; 
`
const MenuButton = styled.div`
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