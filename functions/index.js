const functions = require("firebase-functions");
const variables=require('../variables.js')
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors=require('cors')
const bodyParser= require("body-parser")
require('dotenv').config();
//const clientid= variables.REACT_APP_CLIENTID
const clientid= '27f19ced5a414e7498169bdd52708cd5'
//const clientsecret=variables.REACT_APP_CLIENTSECRET
const clientsecret='40510d1bf3c045149e137ef235d75092'

const app = express();
app.use(cors())
app.use(bodyParser.json())
//refreshes token aften an hour
app.post('/refresh', (req,res) =>{
    const refreshToken= req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        clientId : clientid,
        //redirectUri : "https://sounds-of-the-world-6b630.web.app/callback/",
        redirectUri : "https://sounds-of-the-world-6b630.web.app/",
        //redirectUri : "http://localhost:3000/callback/",
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
        //redirectUri : "https://sounds-of-the-world-6b630.web.app/callback/",
        redirectUri : "https://sounds-of-the-world-6b630.web.app/",
        //redirectUri : "http://localhost:3000/callback/",
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
exports.app = functions.https.onRequest(app)
//app.listen("https://sounds-of-the-world-6b630.web.app")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
