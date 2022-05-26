import styled from "styled-components";
import React from 'react'
import { UserContext } from './userContext.js';

export default function TodayHabitBox({name, done, currentSequence, highestSequence, id, habitDone}){
    const CurrentSequenceLength = (currentSequence>1)
    const HighestSequenceLength = (highestSequence>1)
       
    return (
    <TodayHabit >
        
        <HabitInfo>
            <h1>{name}</h1>
            <p>Sequência atual: {currentSequence? currentSequence:0} {CurrentSequenceLength? 'dias': 'dia' }</p>
            <p>Seu recorde: {highestSequence} {HighestSequenceLength? 'dias' : 'dia'}</p>
        </HabitInfo>
        
        <DoneButton done={done} onClick={()=>habitDone(id, done)}> <ion-icon name="checkmark-outline"></ion-icon> </DoneButton>
    </ TodayHabit>
    )
}
const TodayHabit = styled.div`
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
const HabitInfo = styled.div`
width: 100%;
`
const DoneButton = styled.div`
display:flex;
align-items:center;
justify-content:center;
border: 1px solid #E7E7E7;
background-color: ${props=>props.done? '#8FC549':'#EBEBEB'};
border-radius:5px;
ion-icon{
 color:#ffffff;
 height: 90px;
 width: 90px;
}
`