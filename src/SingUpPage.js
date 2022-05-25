import React from 'react'
import logo from "./assets/img/logo.svg";
import Input from './Input.js';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
export default function SingUpPage (){
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [image, setImage] = React.useState('')
    const [password, setPassword] = React.useState('')
    function singUp (){
        const body = {
            email,
            name,
            image,
            password
        }
        axios.post(URL, body)
            .then((res)=>navigate('/'))
            .catch((err)=>console.log(err))
    }

    return (
    <Container>
        <img src={logo} alt="Logo TrackIt" />
        <Input type="text" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
        <Input type="text" placeholder="senha" value={password} onChange={(e)=> setPassword(e.target.value)} />
        <Input type="text" placeholder="nome" value={name} onChange={(e)=> setName(e.target.value)} />
        <Input type="text" placeholder="foto" value={image} onChange={(e)=> setImage(e.target.value)} />
        <Button onClick={()=>singUp()}><p>Cadastrar</p></Button>
        <Text><p>Já tem uma conta? Faça login!</p></Text>
    </Container>
    )
}
const Container = styled.div`
display:flex;
flex-direction:column;
align-items: center;
padding: 70px 40px;
max-width: 800px;
margin: auto;
img {
    width:200px;
    height: 200px;
    margin-bottom: 40px
}
`
const Button = styled.div`
    text-align:center;
    background-color: #52B6FF;
    color: #FFFFFF;
    width: 100%;
    border-radius: 10px;
    font-size: 20px;
    font-weight:400;
    padding: 10px 0;
    margin-bottom: 40px;
    cursor: pointer;
  `
const Text = styled.div `
    width:100%;
    font-size: 14px;
    text-align: center;
    color: #52B6FF;
    text-decoration-line: underline;
    cursor: pointer;
`