import React from 'react';
import { Container } from "react-bootstrap"
import { makeStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
    root:{
        padding: '0',
        margin: '0'
    },
    navbar_container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#78909c',
        Color:'#c1d5e0'
        
    },
    logo:{
        margin: '0 0 0 0.45em'
    },
    logo_a: {
        color: 'white'
    },
    logo_navigation: {
        listStyle: 'none',
        textTransform: 'uppercase',
        textDecoration: 'none'
    },
    navigation: {
        display: 'flex',
        align: 'center',
        margin: 'auto'
    },
    nav_a:{
        display: 'block',
        padding: '1em',
        color: 'white',
         
    },
    main: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ccf5ff',//light blue
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: '#002699',
        position: 'fixed',
        textAlign: 'center',
        paddingTop: '250px',
    },
    my_name:{
        textAlign: 'center',
        position: 'relative',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '',
        fontFamily: 'Arsenal, monospace',
        letterSpacing:'10px',
        fontSize: '22px'
    },
    login_button:{
        color:'#002699', //dark blue
        textDecoration:'None',
        background:'white',
        border : 'solid',
        borderWidth: '4px',
        //textAlign: 'center',
        
        fontSize:'30px',
        width:'30%',
        //alignItems: 'center',
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
  "playlist-modify-public"
];

const AUTH_URL =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

const got_data= ()=>{
};


const code = new URLSearchParams(window.location.search).get("code")

    

export default function SignIn() {
  const classes = useStyles();
    return (
        <div>
            <AppBar  position="fixed" style= {{paddingLeft: '15px' }}>
                <h1>Sounds of the World</h1>
            </AppBar>
          <Container className={classes.main} >
              <h1>Listen to the music of your next travel destination!</h1>
            <a className={classes.login_button} href= ''> Sign In Here! </a>
{/*             
            <a className={classes.login_button} href={AUTH_URL}> Sign up </a> */}
            
          </Container>

           
            
        </div>
    )
}