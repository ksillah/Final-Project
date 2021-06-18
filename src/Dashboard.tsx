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
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';

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
    //position: 'fixed',
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
  const rows: GridRowsProp = [
    { id: 1, col1: '' , col2: '', col3: '' },
    { id: 2, col1: '', col2: '', col3: '' },
    { id: 3, col1: '', col2: '', col3: '' },
    { id: 4, col1: '', col2: '', col3: '' },
    { id: 5, col1: '', col2: '', col3: '' },
    { id: 6, col1: '', col2: '', col3: '' },
    { id: 7, col1: '', col2: '', col3: '' },
    { id: 8, col1: '', col2: '', col3: '' },
    { id: 9, col1: '', col2: '', col3: '' },
    { id: 10, col1: '', col2: '', col3: '' },
    { id: 11, col1: '', col2: '', col3: '' },
    { id: 12, col1: '', col2: '', col3: '' },
    { id: 13, col1: '', col2: '', col3: '' },
    { id: 14, col1: '', col2: '', col3: '' },
    { id: 15, col1: '', col2: '', col3: '' },

  ];
  const columns: GridColDef[] = [
{ field: 'col1', headerName: 'Artist', width: 150 },
{ field: 'col2', headerName: 'Song', width: 150 },
{field: 'col3', headerName: 'Preview', width: 150 },
];
    var [playlist_id, setPlaylist_id] = useState('');
    var result: string[]=[];
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
          for (var i = 0; i < 15; i++) {
            var artist=data.body.items[i].track.artists[0].name
          console.log(artist)
          var track=data.body.items[i].track.name
          console.log(track)
          var preview=data.body.items[i].track.preview_url
          console.log(preview)
          var val=[artist,track,preview]
          result.push(val)
          //rows[i]={id:i, col1: artist , col2: track, col3: preview}
          console.log(rows[i])
          }
          console.log(result)
          })
          
    }, [accessToken, value,playlist_id])

    var { data } = useDemoData({
      dataSet: 'Commodity',
      rowLength: 10,
      maxColumns: 6,
    });
    
          // var newtag =document.createElement('h4')
          // newtag.append(val)
          // var element= document.getElementById('new');
          // element.appendChild(newtag);

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
            
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </div>

        </div>
      </div>

    
  );
}