import {React, useState} from 'react';
import ReactDOM from 'react-dom';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import {Select, FormControl, InputLabel, AppBar, Button, Link} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridCellParams , } from '@material-ui/data-grid';
import { useGridApiRef } from '@material-ui/x-grid';
import { render } from '@testing-library/react';
import { redirectUri } from './config_example';

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
  
    //var sound;
    var [playlist_id, setPlaylist_id] = useState('');
    //var [result,setResult]= useState([]);
    var [artists,setArtist]= useState([]);
    var [tracks,setTrack]= useState([]);
    var [previews,setPreview]= useState([]);
    
    const accessToken=useAuth(code);
    console.log(accessToken)
    const classes= useStyles();
    const [value, setValue] = useState('');
    const handleChange = e => setValue(e.target.value)//hold on to the value the user selected
    const apiRef = useGridApiRef();

    useEffect(() =>{
      if (!accessToken) return
      spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(()=>{
      if (!value) return
      spotifyApi.setAccessToken(accessToken)
      if (!accessToken) return
      setArtist([]);
      setTrack([]);
      setPreview([])
      //setResult([])
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
      setArtist([]);
      setTrack([]);
      setPreview([])
      
      spotifyApi.getPlaylistTracks(playlist_id,{//37i9dQZEVXbMXbN3EUUhlg
            fields: 'items'
          }).then(
          function(data) {
            console.log('made it')
          console.log('The playlist contains these tracks', data.body);
          for (var i = 0; i < 15; i++) {
            var artist=data.body.items[i].track.artists[0].name
            var track=data.body.items[i].track.name
            var preview= data.body.items[i].track.preview_url
            var val=[[artist],[track],[preview]]
            previews.push(preview)
            artists.push(artist)
            tracks.push(track)
            //console.log(v)
            //result.push(val)
            
            console.log('tracks', tracks)
            
            //result.push(val)
            //rows[i]={id:i, col1: artist , col2: track, col3: preview}
            //console.log(rows[i])
          
          }
          setArtist(artists);
          setTrack(tracks);
          console.log('tracks2', tracks)
          setPreview(previews)
          ///console.log('final result', result)
          })
          
    }, [accessToken, value,playlist_id])
    

    //console.log(result)
    const rows: GridRowsProp = [
      { id: 1, col1: artists[0] , col2: tracks[0], col3: previews[0]},
      { id: 2, col1: artists[1] , col2: tracks[1], col3: previews[1] },
      { id: 3, col1: artists[2] , col2: tracks[2], col3: previews[2] },
      { id: 4, col1: artists[3] , col2: tracks[3], col3: previews[3] },
      { id: 5, col1: artists[4] , col2: tracks[4], col3: previews[4] },
      { id: 6, col1: artists[5] , col2: tracks[5], col3: previews[5] },
      { id: 7, col1: artists[6] , col2: tracks[6], col3: previews[6] },
      { id: 8, col1: artists[7] , col2: tracks[7], col3: previews[7] },
      { id: 9, col1: artists[8] , col2: tracks[8], col3: previews[8] },
      { id: 10, col1: artists[9] , col2: tracks[9], col3: previews[9] },
      { id: 11, col1: artists[10] , col2: tracks[10], col3: previews[10] },
      { id: 12, col1: artists[11] , col2: tracks[11], col3: previews[11] },
      { id: 13, col1: artists[12] , col2: tracks[12], col3: previews[12] },
      { id: 14, col1: artists[13] , col2: tracks[13], col3: previews[13] },
      { id: 15, col1: artists[14] , col2: tracks[14], col3: previews[14] },
  
    ];
    const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Artist', width: 200 },
  { field: 'col2', headerName: 'Song', width: 300 },
  {field: 'col3', headerName: 'Preview', width: 200, hide:true},
  {field: 'col4', headerName: 'Button', width:200,
  renderCell: (params: GridCellParams) => (
    <strong>
      {console.log(params.getValue(params.id,'col1'))}
      

      <a style={{ color:'blue'}}  href={params.getValue(params.id,'col3')} target="_blank">
        <h3>preview </h3>
      </a>
    </strong>
  ),
  }
  ];

  let output;
  console.log('tracks3', tracks)
  if (tracks.length==15) {
    output = <DataGrid checkboxSelection rows={rows} columns={columns} />;
  } else {
    output ='';
  }
  //var l=result.length

    
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
            
          <div style={{ height: 500, width: '100%' }}>
            
            {output}
          </div>

        </div>
      </div>

    
  );
}
