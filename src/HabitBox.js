import styled from "styled-components";
import React from 'react'
export default function HabitBox({name, days, id, deleteHabits}){
    const [existInFront, setExistInFront] = React.useState(true)
    function deleteInFront(id){
        if (window.confirm('Tem certeza que deseja excluir essa hábito')){
        deleteHabits(id)
        setExistInFront(false)
    }
    }
    if (existInFront === true){
    return (
    <Habit >
        <ion-icon name="trash-outline" onClick={()=>deleteInFront(id)}></ion-icon>
        <HabitTitle>{name}</HabitTitle>
        <DaysBar>
            <HabitDay selected={days.some((element)=> element===0)}>D</HabitDay>
            <HabitDay selected={days.some((element)=> element===1)}>S</HabitDay>
            <HabitDay selected={days.some((element)=> element===2)}>T</HabitDay>
            <HabitDay selected={days.some((element)=> element===3)}>Q</HabitDay>
            <HabitDay selected={days.some((element)=> element===4)}>Q</HabitDay>
            <HabitDay selected={days.some((element)=> element===5)}>S</HabitDay>
            <HabitDay selected={days.some((element)=> element===6)}>S</HabitDay>
        </DaysBar>
    </ Habit>
    )
}
else return <></>
}
const Habit = styled.div`
width: 100%;
border-radius: 5px;
background: #FFFFFF;
margin-bottom: 20px;
padding:20px;
color:#666666;
position:relative;
 ion-icon{
     position:absolute;
     width:20px;
     height: 20px;
     right:10px;
     top:10px;
 }
`
const HabitTitle = styled.div`
font-size: 20px;
font-weight: 400;
color:#666666;
margin-bottom:10px;
`
const DaysBar= styled.div `
display: flex;
column-gap: 5px;
`
const HabitDay = styled.div`
display:flex;
justify-content:center;
align-items:center;
border-radius:4px;
width: 30px;
height: 30px;
border: 1px solid #D4D4D4;
background-color:${props=>props.selected? '#CFCFCF': '#FFFFFF' };;
color: ${props=>props.selected? '#FFFFFF'  : '#DBDBDB'};
font-size: 20px;
font-weight: 400;
`