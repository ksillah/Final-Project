const variables=require('../variables.js')
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors=require('cors')
const bodyParser= require("body-parser")
require('dotenv').config();
const clientid= variables.REACT_APP_CLIENTID
const clientsecret=variables.REACT_APP_CLIENTSECRET

const app = express();
app.use(cors())
app.use(bodyParser.json())
//refreshes token aften an hour
app.post('/refresh', (req,res) =>{
    const refreshToken= req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        clientId : clientid,
        redirectUri : "http://localhost:3000/callback/",
        clientSecret : clientsecret,
        refreshToken
    })

    spotifyApi.refreshAccessToken().then(
        (data)=> {
          res.json({
              accessToken:data.body.accessToken,
              expiresIn: data.body.expiresIn
          })
        }).catch(() =>{
            res.sendStatus(400)
        })
})

app.post('/login', (req, res)=>{
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        clientId : clientid,
        redirectUri : "http://localhost:3000/callback/",
        clientSecret : clientsecret,
    })
    

    spotifyApi.authorizationCodeGrant(code).then(data =>{
        res.json({
            accessToken: data.body.access_token,
            refreshToken : data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.listen(3001)