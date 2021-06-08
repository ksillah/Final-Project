import React from 'react';
import { Container } from "react-bootstrap"

const SpotifyWebApi = require('spotify-web-api-node');


const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "27f19ced5a414e7498169bdd52708cd5";
const redirectUri = "http://localhost:3000/callback/"; 
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-modify-public"
];

const AUTH_URL =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

const got_data= ()=>{
  console.log('here')
};


const code = new URLSearchParams(window.location.search).get("code")

    
interface Props{
    title: string;
}

export const Home = ( props:Props) => {
    return (
        <div>
          <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }} >
            <a className="btn btn-success btn-lg" href={AUTH_URL}> Login With Spotify </a>
            <h1>here</h1>
            <button onClick={got_data}>mkldmklms</button>
          </Container>

           
            
        </div>
    )
}