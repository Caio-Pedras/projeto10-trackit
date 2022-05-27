import styled from "styled-components";
import React from 'react'
import { UserContext } from './userContext.js';

export default function TodayHabitBox({name, done, currentSequence, highestSequence, id, habitDone}){
    const {user,setUser, setProgress, progress} = React.useContext(UserContext)
    const [doneFront, setDoneFront] = React.useState(done) 
    const [currentSequenceFront, setCurrentSequenceFront] = React.useState(currentSequence)
    const [highestSequenceFront, setHighestSequenceFront] = React.useState(highestSequence) 
    let CurrentSequenceLength = (currentSequenceFront>1)
    let HighestSequenceLength = (highestSequenceFront>1)
    let IsCurrentEqualHighest = (currentSequenceFront === highestSequenceFront) 
    function frontHabitDone (id, done){
        habitDone(id, done);
        if (doneFront){
            if (currentSequenceFront===highestSequenceFront){
                setHighestSequenceFront(highestSequenceFront-1)  
            }
        setCurrentSequenceFront(currentSequenceFront-1)
        setProgress({...progress,
            totalDone: progress.totalDone-1})
        }
        if (!doneFront){
            if (currentSequenceFront===highestSequenceFront || currentSequenceFront>highestSequenceFront){
                setHighestSequenceFront(currentSequenceFront+1)
            }
            setProgress({...progress,
                totalDone: progress.totalDone+1})
        setCurrentSequenceFront(currentSequenceFront+1)
        
  
        }
        setDoneFront(!doneFront)
    }
    return (
    <TodayHabit >
        
        <HabitInfo >
            <h1>{name}</h1>

            <Current color={doneFront? '#8FC549' :'#666666'}><p>Sequência atual: <span>{currentSequenceFront? currentSequenceFront:0} {CurrentSequenceLength? 'dias': 'dia' }</span></p></Current>
            <Record color={IsCurrentEqualHighest? '#8FC549' :'#666666'}><p>Seu recorde: <span>{highestSequenceFront} {HighestSequenceLength? 'dias' : 'dia'}</span></p></Record>
        </HabitInfo>
        
        <DoneButton color={doneFront? '#8FC549':'#EBEBEB'} onClick={()=>frontHabitDone(id,doneFront)}> <ion-icon name="checkmark-outline"></ion-icon> </DoneButton>
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
const Record =styled.div`
span{
    color:${props=>props.color}
}
`
const Current = styled.div`
span{
    color:${props=>props.color}
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