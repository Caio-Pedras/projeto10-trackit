import React from 'react'
import {ThreeDots} from  'react-loader-spinner'
import styled from "styled-components";
const Loading = () => {
  return (
    <Loader>
      <ThreeDots color= '#ffffff'/>
    </Loader>
  )
}
export default Loading
const Loader = styled.div`
*{
text-align:center; 
height: 20px;
width:100%;
}
`
