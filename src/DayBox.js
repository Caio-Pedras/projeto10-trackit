import styled from "styled-components";
import React from 'react'
export default function DayBox ({day, i, setDaysArray, daysArray}){
const [isSelected, setIsSelected] = React.useState(false);
function selectDay () {
    if (isSelected === false){ 
        setDaysArray([...daysArray, i])
        setIsSelected(true)
    } else if (isSelected=== true){
        setDaysArray(daysArray.filter((daysArray)=> daysArray !== i))
        setIsSelected(false)
    }
    
}
return(
    <Day selected={isSelected} onClick={()=>selectDay (i)}> {day} </Day>
    )
}
const Day = styled.div `
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