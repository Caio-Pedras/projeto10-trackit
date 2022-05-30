import React from 'react'
import styled from "styled-components";
import axios from 'axios';
import Header from './Header.js';
import Footer from './Footer.js';
import { Link } from 'react-router-dom';
import { UserContext } from './userContext.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import {useState, useContext, useEffect} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import dayjs from 'dayjs';
import locale from "dayjs/locale/pt-br"
import CalendarStyle from "./CalendarStyle.js";
import react from 'react';

export default function HistoryPage() {
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily';
    const { user, progress } = useContext(UserContext)
    const [taskArray, setTaskArray] = useState(null)
	const [habitsList, setHabitList] = useState(null);
    const [render, setRender] = useState(null)
    const [title, setTitle] = useState(null)
    useEffect (() => getCalendarInfo(),[user])
    useEffect(()=>setHabitsContent(),[habitsList])
    useEffect(()=>setHabitsTitle(),[habitsList])
    function getCalendarInfo(){
        if (user === null) return
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        axios.get(URL,config)
            .then(res=> setTaskArray(res.data))
            .catch(err=>alert(err.response.statusText))
    }
    function setDayClass(date) {
        if(taskArray===null) return
		let dateFormated = dayjs(date).format("DD/MM/YYYY");
		let currentHabits = null;
        
		taskArray.map((taskArray) => {
			if (taskArray.day === dateFormated) {
				currentHabits = taskArray.habits;
			}
		});
		if ( !currentHabits || dayjs(date).format("DD/MM/YYYY") === dayjs().locale("pt-br").format("DD/MM/YYYY")) {
			return dayjs(date).format("DD");
        }
		let habitsDone = currentHabits.filter((h) => h.done);
		if (habitsDone.length === currentHabits.length){
		    return <p className="completed">{dayjs(date).format("DD")}</p>;
        }
		else return <p className="incompleted">{dayjs(date).format("DD")}</p>;
	}
	function listHabits(date) {
		const dateFormated = dayjs(date).format("DD/MM/YYYY");
		let currentHabits = null;
		taskArray.forEach((task) => {
			if (task.day === dateFormated) {
				currentHabits = task.habits;
			}
		});

		setHabitList(currentHabits);
	}

	function setHabitsContent() {
        if (habitsList === null) return
        setRender(habitsList.map((habit, index) => (
            <HabitBox key={index}>
                <h1>{habit.name} </h1>
                <DoneButton color={habit.done? '#8FC549':'#E95766'}> <ion-icon name={habit.done? "checkmark-outline" :'close-outline'}></ion-icon> </DoneButton>
            </HabitBox>
        )))				
    }

	function setHabitsTitle() {
        if (habitsList === null) return
        let selectedDay = habitsList[0].date;
         setTitle(
         <PageTitle>
             <h2>Hábitos do dia {dayjs(selectedDay).locale("pt-br").format("DD/MM")}</h2>
         </PageTitle>)
	}
    
    if (user !== null) {
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
                    <CalendarStyle>
                        <Calendar
                        formatDay={(locale, date) => setDayClass(date)}
                        onClickDay={(date) => listHabits(date)}
                        />
                     </CalendarStyle>
                     {title}
                     {render}
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
        </Body>)
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
margin-bottom:60px;


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
const HabitBox = styled.div `
width: 100%;
border-radius: 5px;
background: #FFFFFF;
margin-bottom: 20px;
padding:20px;
color:#666666;
display: flex;
justify-content: space-between;
align-items:center;
 h1{
   font-size:20px;
   margin-bottom:10px;  
 }
 p{
    font-size:14px; 
 }
`
const DoneButton = styled.div`
display:flex;
align-items:center;
justify-content:center;
border: 1px solid #E7E7E7;
background-color: ${props=>props.color};
border-radius:5px;
ion-icon{
 color:#ffffff;
 height: 90px;
 width: 90px;
}
`