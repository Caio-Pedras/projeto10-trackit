import React from 'react'
import { UserContext } from "./userContext.js";
import axios from 'axios';
import TodayHabitBox from './TodayHabitBox.js'
export default function UserContextProvider(props) {
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
    const [user, setUser] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [apiResult, setApiResult] = React.useState(null)
    const [progress, setProgress] = React.useState('')
    React.useEffect(() => verifyLocalStorage(), [])
    React.useEffect(() => { console.log('toentrando no effect', user); getTodayHabits() }, [user])
    function verifyLocalStorage() {
        if (localStorage.getItem('USER') !== null) {
            const UserLocal = JSON.parse(localStorage.getItem('USER'));
            setUser(UserLocal)
        }
    }
    function getTodayHabits() {
        if (user === null) return
        if (isLoading) return
        setIsLoading(true)
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        axios.get(URL, config)
            .then(res => {
                const response = res.data
                setIsLoading(false)
                console.log(response)
                setApiResult(response)
                let doneCount = response.filter((obj) => obj.done === true)
                setProgress({
                    total: response.length,
                    totalDone: doneCount.length
                })
                
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            }
            )
    }

    return (
        <UserContext.Provider value={{ user, setUser, apiResult,progress, setProgress, getTodayHabits}}>
            {props.children}
        </UserContext.Provider>
    )
}
