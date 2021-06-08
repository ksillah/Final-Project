const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

app.post('/home', (req, res)=>{
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        clientId = "27f19ced5a414e7498169bdd52708cd5",
        redirectUri = "http://localhost:3000/callback/",
        clientSecret = '40510d1bf3c045149e137ef235d75092',
    })

    spotifyApi.authorizationCodeGrant(code).then(data =>{
        res.json({
            accessToken: data.body.access_token,
            refreshToken : data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch(() => {
        res.sendStatus(400)
    })


})
