import React from 'react';
import { Container } from "react-bootstrap"
import { makeStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Dashboard } from './components';
//import background from '../../assets/images/map.jpg';
//import {Link} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Drawer as MUIDrawer, 
    ListItem, 
    List, 
    ListItemIcon, 
    ListItemText, 
    Theme,
    useTheme, 
    createStyles,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
} from '@material-ui/core';
const drawerWidth = 240;



const useStyles = makeStyles( (theme:Theme) =>
createStyles({
   
    main: {  
        width: '100%',
        height: '100%',
        backgroundColor: '#ccf5ff',//light blue
        textAlign: 'center',
        paddingTop: '250px',
        marginBottom:'10px',
        position:'absolute',
        
    },
    login_button:{
        color:'#ccf5ff', 
        background:'#00008B',
        textDecoration:'None',
        border: 'solid',
        fontSize:'25px',
        width:'30%',
        paddingTop:''
    },
    
}));

const SpotifyWebApi = require('spotify-web-api-node');


const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "27f19ced5a414e7498169bdd52708cd5";
const redirectUri = "http://localhost:3000/callback/"; 
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-modify-public",
  "playlist-read-collaborative"
];

const AUTH_URL =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=streaming%20user-read-email%20user-read-private%20playlist-modify-public%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`




const code = new URLSearchParams(window.location.search).get("code")

    

export const Login = ()=>{
//export default function Login() {
  const classes = useStyles();
    return (
        <div>
        <AppBar  position="fixed" style= {{paddingLeft: '15px' }}>
                  <h1>Sounds of the World</h1> 
        </AppBar>
        
          <div className={classes.main} >
              <h3 style={{fontSize: '30px',color:'#00008B'}}>Learn which songs are popular in other countries.</h3> 
            <a className={classes.login_button} href={AUTH_URL}> Login With Spotify </a>
            
          </div>

           
            
        </div>
        
    )
}