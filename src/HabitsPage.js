import React from 'react'
import styled from "styled-components";
import axios from 'axios';
import Header from './Header.js';
import Footer from './Footer.js';
import Input from './Input.js';
import DayBox from './DayBox.js';
import HabitBox from './HabitBox.js'
import { useEffect } from 'react/cjs/react.production.min';

export default function HabitsPage ({token}){
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits'
    const [apiResult, setApiResult ] = React.useState('')
    const [newHabit, setNewHabit] = React.useState(false)
    const [name, setName] = React.useState('')
    const [daysArray, setDaysArray] = React.useState([])
    const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
 React.useEffect (() => getHabits(),[])
     function getHabits() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.get(URL, config)
            .then(res=>
                {
                    const response = res.data
                    setApiResult ( response.map(({name, days}, i)=>
                    <HabitBox name={name} days={days} key={i}/>))
        //    <p>Você  tem  hábito cadastrado</p>)
                })
            .catch(err=>{
                console.log(err)
            setApiResult (<p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>)} )

     }
     function postHabits (){
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
         const body = {
             name,
             days:daysArray
         }
         axios.post(URL,body,config)
         .then(res=>console.log(res))
         .catch(err=>console.log(err))
     }
return (
<Body>
    <Header>
    <h1 onClick={()=>console.log(daysArray)}>TrackIt</h1>
    <img src="https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" alt="" />
    </Header>
    <Container>
        <PageTitle>
            <h2>Meus hábitos</h2>
            <Button onClick={()=>setNewHabit(!newHabit)}><p>+</p></Button>
        </PageTitle>
        {newHabit? <CreateHabit>
            <Input type="text" placeholder="nome do hábito" value={name} onChange={(e)=> setName(e.target.value)}/>
            <DaysBar>
            {days.map((day,i)=>
            <DayBox day={day} key={i} i={i} setDaysArray={setDaysArray} daysArray={daysArray}/>)}
            </DaysBar>
            <OptionBar>
                <Cancel onClick={()=>setNewHabit(!newHabit)}>Cancelar</Cancel>
                <Save onClick={()=>postHabits()}>Salvar</Save>
            </OptionBar>
        </CreateHabit > : null}
        <HabitList>
            {apiResult}
        </HabitList>
    </Container>
    <Footer>
        <p>Hábitos</p>
        <p>Histórico</p>
    </Footer>
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
    margin-bottom:30px;
`
const Button = styled.div`
    display:flex;   
    justify-content:center;
    align-items:center;
    background-color: #52B6FF;
    height: 30px;
    width: 40px;
    border-radius:10px;
    color:#FFFFFF;
    font-size:30px;
`
const HabitList = styled.div`
    p{   
        color: #666666;
        font-size: 18px;
        font-weight: 400;
    }
`
const CreateHabit = styled.div`
width: 100%;
border-radius: 5px;
background: #FFFFFF;
margin-bottom: 20px;
padding:20px;
`
const DaysBar= styled.div `
display: flex;
column-gap: 5px;
`

const OptionBar = styled.div`
    margin-top: 30px;
    display: flex;
    align-items:center;
    column-gap:20px;
    justify-content:flex-end;
`
const Save= styled.div`
font-size: 16px;
font-weight: 400;
color:#FFFFFF;
background-color: #52B6FF;
padding:10px 20px ;
border-radius: 5px;
`
const Cancel = styled.div`
font-size: 16px;
font-weight: 400;
color: #52B6FF;
`
