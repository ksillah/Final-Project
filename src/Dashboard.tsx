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
//const cors=require('cors');


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
    var [playlist_id, setPlaylist_id] = useState('');
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
      console.log(value)
      spotifyApi.searchPlaylists("Top 50 - "+ value).then(function(data) {
        setPlaylist_id( data.body.playlists.items[0].id)
        console.log('Found playlists are', data.body);
        console.log(playlist_id)
      })
      console.log(playlist_id)
    }, [accessToken, value,playlist_id])
    
    useEffect(()=>{
      console.log('here',playlist_id)
      if (playlist_id=='') return
      spotifyApi.setAccessToken(accessToken)
      if (!accessToken) return
      
      spotifyApi.getPlaylistTracks(playlist_id,{//37i9dQZEVXbMXbN3EUUhlg
            fields: 'items'
          }).then(
          function(data) {
            console.log('made it')
          console.log('The playlist contains these tracks', data.body);
          })
    }, [accessToken, value,playlist_id])

    

    // useEffect(()=>{
    //   if (!value) return
    //   spotifyApi.setAccessToken(accessToken)
    //   if (!accessToken) return
    //   console.log('HERE:',playlist_id)
    //   console.log(accessToken)
    //   spotifyApi.getPlaylistTracks({playlist_id},{
    //     fields: 'items'
    //   }).then(
    //   function(data) {
    //   console.log(playlist_id)
    //   console.log('The playlist contains these tracks', data.body);
    //   })
  
    // }, [accessToken, value, playlist_id])

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
          
          
          <h1>you chose {value}</h1>
          
        </div>
      </div>

    
  );
}