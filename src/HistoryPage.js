import React from 'react'
import styled from "styled-components";
import axios from 'axios';
import Header from './Header.js';
import Footer from './Footer.js';
import { Link } from 'react-router-dom';
import { UserContext } from './userContext.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
// import 'react-circular-progressbar/dist/styles.css';
import dayjs from 'dayjs';
import locale from "dayjs/locale/pt-br"
import CalendarStyle from "./CalendarStyle.js";
export default function HistoryPage() {
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily';
    const { user, progress } = React.useContext(UserContext)
    const [taskArray, setTaskArray] = React.useState(null)
    React.useEffect (() => getCalendarInfo(),[user])
    function ajudarocaio(str) {
        let arr = str.split('/')
        let arr2 = []
        arr2.push(arr[2])
        arr2.push(arr[1])
        arr2.push(arr[0])
        let output = arr2.join('-')
        return output
    }
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
                        />
                     </CalendarStyle>
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
                <h1 onClick={() => console.log(user)}>TrackIt</h1>
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