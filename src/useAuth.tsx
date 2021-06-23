import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function useAuth(code) {
    const [accessToken, setAccessToken]= useState()
    const [refreshToken, setRefreshToken]= useState()
    const [expiresIn, setExpiresIn]= useState()

    useEffect(() =>{
        //axios.post( 'http://localhost:3001/login',{
        axios.post('https://sounds-of-the-world-6b630.web.app/login',{
           code, 
        }).then(res =>{
            
            setAccessToken(res.data.accessToken)
            console.log(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            console.log(res.data.refreshToken)
            setExpiresIn(res.data.setExpiresIn)
            //console.log(res.data)
            console.log(accessToken,refreshToken,expiresIn)
            window.history.pushState({}, '', '/')

        }).catch(() => {//makes url clean
            window.location.href ='/' 
        })
    }, [code])
    return accessToken
    

}