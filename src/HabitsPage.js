import React from 'react'
import styled from "styled-components";
import axios from 'axios';
import Header from './Header.js';
import Footer from './Footer.js';
import Input from './Input.js';
import DayBox from './DayBox.js';
import HabitBox from './HabitBox.js'
import Loading from './Loading'
import { Link } from 'react-router-dom';
import { UserContext } from './userContext.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function HabitsPage (){
    const {user} = React.useContext(UserContext)
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits'
    const [isLoading, setIsLoading] = React.useState(false)
    const [apiResult, setApiResult ] = React.useState('')
    const [newHabit, setNewHabit] = React.useState(false)
    const [name, setName] = React.useState('')
    const [daysArray, setDaysArray] = React.useState([])
    const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
 React.useEffect (() => getHabits(),[])
 function deleteHabits (id) {
     if (window.confirm('Tem certeza que deseja excluir essa hábito')){
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }
    axios.delete(`${URL}/${id}`,config)
    .then(getHabits())
    .catch(err=>console.log(err))
}
}
     function getHabits() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        axios.get(URL, config)
            .then(res=>
                {
                    const response = res.data
                    if (response.length>0){
                    setApiResult ( response.map(({name, days, id}, i)=>
                    <HabitBox key={i} name={name} days={days}  id={id} deleteHabits={deleteHabits}/>))
                    } else {setApiResult (<p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>)}
                })
            .catch(err=>{
                console.log(err)
            setApiResult (<p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>)} )

     }
     function postHabits (){
         setIsLoading(true)
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
         const body = {
             name,
             days:daysArray
         }
         axios.post(URL,body,config)
         .then(res=>{
            getHabits()
            setNewHabit(false)
            setName('')
            setDaysArray([])  
            setIsLoading(false)  
        })
         .catch(err=>{console.log(err)
         setIsLoading(false)} )
     }
   
return (
<Body>
    <Header>
    <h1>TrackIt</h1>
    <img src={user.image} alt="Foto de perfil do usuário" />
    </Header>
    <Container>
        <PageTitle>
            <h2>Meus hábitos</h2>
            <Button onClick={()=>setNewHabit(!newHabit)}><p>+</p></Button>
        </PageTitle>
        {newHabit? 
        <CreateHabit>
            <Input type="text" placeholder="nome do hábito" disabled={isLoading} value={name} onChange={(e)=> setName(e.target.value)}/>
            <DaysBar>
            {days.map((day,i)=>
            <DayBox day={day} key={i} i={i} setDaysArray={setDaysArray} daysArray={daysArray} isLoading={isLoading}/>)}
            </DaysBar>
            <OptionBar>
                <Cancel onClick={()=>isLoading? null:setNewHabit(!newHabit)}>Cancelar</Cancel>
                <Save onClick={()=>isLoading? null: postHabits()}>{isLoading? <Loading/>:'Salvar'}</Save>
            </OptionBar>
        </CreateHabit > : null
        }
        <HabitList>
            {apiResult}
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
padding: 30px 20px 10px 20px;;
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
    width: 40px;
    border-radius:5px;
    color:#FFFFFF;
    font-size:30px;
`
const HabitList = styled.div`
margin-bottom: 100px;
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
text-align:center;
width:90px;
border-radius: 5px;
height:36px;
`
const Cancel = styled.div`
font-size: 16px;
font-weight: 400;
color: #52B6FF;
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