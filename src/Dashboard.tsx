import {React, useState} from 'react';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import {Select, FormControl, InputLabel, AppBar} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';
import code from './App';


const countries = [
  {
    value: 'USA',
    label: 'United States',
  },
  {
    value: 'Iceland',
    label: 'Iceland',
  },
  {
    value: 'Brazil',
    label: 'Brazil',
  },
];

const useStyles = makeStyles(theme =>({
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
  formControl:{
    position: 'relative',
    minWidth:300,
  }
}));

const spotifyApi= new SpotifyWebApi({
  clientId: "27f19ced5a414e7498169bdd52708cd5",
})

export default function Dashboard({code} ) {
    const accessToken=useAuth(code);
    console.log(accessToken)
    const classes= useStyles();
    const [value, setValue] = useState('');

    const handleChange = e => setValue(e.target.value)//hold on to the value the user selected

    useEffect(() =>{
      if (!accessToken) return
      spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(()=>{
      if (!value) return
      spotifyApi.setAccessToken(accessToken)
      if (!accessToken) return
      spotifyApi.searchTracks(value).then(res=>{
        console.log(res.body.tracks)
      })
      console.log(accessToken)

    }, [accessToken, value])

    return (
      <div>
      <AppBar  position="fixed" style= {{paddingLeft: '15px' }}>
                <h1>Sounds of the World</h1>
      </AppBar>
      

        <div className ={classes.main}>
          <FormControl className= {classes.formControl}>
            <InputLabel style= {{font: '10px' }}> What Country are you visiting?</InputLabel>
          <Select onChange={handleChange}>
            <MenuItem value={'USA'}>United States</MenuItem>
            <MenuItem value={'Brazil'}>Brazil</MenuItem>
            <MenuItem value={'Iceland'}>Iceland</MenuItem>
          </Select>
          </FormControl>
          
          
          <h1>you chose {value},{code}</h1>
          
        </div>
      </div>

    
  );
}