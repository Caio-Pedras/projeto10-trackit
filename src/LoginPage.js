import React from 'react'
import logo from "./assets/img/logo.svg";
import Input from './Input.js';
import styled from "styled-components";
import {useNavigate, Link} from "react-router-dom";
import axios from 'axios';
import Loading from './Loading'
import { UserContext } from './userContext';

export default function LoginPage (){
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login'
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const {setUser} = React.useContext(UserContext)
    const navigate = useNavigate()
    
    function logIn (){
      
        setIsLoading(true)
        const body = {
            email,
            password,
        }
        axios.post(URL, body)
            .then((res)=>{
                setIsLoading(false)
                let userInfo = {
                    token:res.data.token,
                    image:res.data.image,
                }
                localStorage.setItem('USER',JSON.stringify(userInfo))
                setUser({token:res.data.token,
                    image:res.data.image,
                })
                navigate('/hoje')
                
            })
            .catch((err)=>{alert(err)
                setIsLoading(false)
                })
    }
    if (localStorage.getItem('USER') !== null){
        const UserLocal=JSON.parse(localStorage.getItem('USER'));
        setUser(UserLocal)
        navigate('/hoje')
    }
return (
    <Container>
        <img src={logo} alt="Logo TrackIt" />
        <Input type="text" placeholder="email" disabled={isLoading} value={email} onChange={(e)=> setEmail(e.target.value)} />
        <Input type="password" placeholder="senha" disabled={isLoading} value={password} onChange={(e)=> setPassword(e.target.value)} />
        <Button onClick={()=>logIn()}> {isLoading? <Loading/>:<p>Entrar</p>}</Button>
        <Link to="/cadastro">
        <Text><p>Não tem uma conta? Cadastre-se!</p></Text>
        </Link>  
    </Container>
)
}
const Container = styled.div`
display:flex;
flex-direction:column;
align-items: center;
padding: 100px 40px;
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