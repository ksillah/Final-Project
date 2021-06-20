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
//import countries from './countries';

//const cors=require('cors');


const countries = [
 'Austria','Argentina','Australia','Belgium','Bolivia','Brazil','Bulgaria','Canada','Chile','Colombia','Costa Rica','Czech Republic',
'Denmark','Dominican Republic','Ecuador','El Salvador','Estonia','France','Germany','Greece','Guatemala','Honduras','Hong Kong','Hungary',
'Iceland','India','Indonesia', 'Ireland','Israel','Italy','Japan','Latvia','Lithuania','Luxembourg','Malaysia','Mexico','Morocco','Netherlands',
'New Zealand','Nicaragua','Nigeria','Norway','Panama','Paraguay','Peru','Philippines','Poland','Portugal','Puerto Rico','Romania','Russia','Saudi Arabia',
'Singapore','Slovakia','South Africa','South Korea','Spain','Sweden','Switzerland','Taiwan','Thailand','Turkey','Ukraine','United Emirates',
'United Kingdom','United States','Uruguay', 'Vietnam',
]


const useStyles = makeStyles(theme =>({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccf5ff',//light blue
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    color: '#002699',
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
    var [artists,setArtist]= useState([]);
    var [tracks,setTrack]= useState([]);
    var [previews,setPreview]= useState([]);

    //Gets the user selected country
    const accessToken=useAuth(code);
    //console.log(accessToken)
    const classes= useStyles();
    const [value, setValue] = useState('');
    const handleChange = e => setValue(e.target.value)//identifies the user selected country
    const apiRef = useGridApiRef();

    useEffect(() =>{
      if (!accessToken) return
      spotifyApi.setAccessToken(accessToken)
      setArtist([]);
      setTrack([]);
      setPreview([]);
    }, [accessToken])

    useEffect(()=>{
      if (!value) return
      if (!accessToken) return
      spotifyApi.setAccessToken(accessToken)
      setArtist([]);
      setTrack([]);
      setPreview([]);
      console.log(value)
      spotifyApi.searchPlaylists("Top 50 - "+ value).then(function(data) {//finds the top 50 playlist for the selected country
        setPlaylist_id( data.body.playlists.items[0].id)
        console.log('Found playlists are', data.body);
        //console.log(playlist_id)
      })
    }, [accessToken, value,playlist_id])
    
    useEffect(()=>{//puts the top 25 songs into table
      if (!accessToken) return
      if (playlist_id=='') return
      console.log('here',playlist_id)
      spotifyApi.setAccessToken(accessToken)
      
        spotifyApi.getPlaylistTracks(playlist_id,{fields: 'items'}).then(
        function(data) {
          artists=[]
          tracks=[]
          previews=[]
          console.log('made it')
          console.log('The playlist contains these tracks', data.body);
          for (var i = 0; i < 25; i++) {
            var artist=data.body.items[i].track.artists[0].name
            var track=data.body.items[i].track.name
            var preview= data.body.items[i].track.preview_url
            var val=[[artist],[track],[preview]]
            previews.push(preview)
            artists.push(artist)
            tracks.push(track)
        }
          setArtist(artists);
          setTrack(tracks);
          setPreview(previews)
          })
          
    }, [accessToken, value,playlist_id])
    
    // let ready=false
    // console.log('ready',ready)
    let output=''
    function createPlaylist() {
      //if (output=='') return
      spotifyApi.setAccessToken(accessToken)
      spotifyApi.createPlaylist( `My ${value} playlist`, { 'description': `My favorite songs from the top 25 songs in ${value} right now`, 'public': true })
      .then(function(data) {
      console.log('Created playlist!');
      }, function(err) {
        console.log('Something went wrong!', err);
        return;
        });
        
    };
    
    
    //structure of table
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
      { id: 16, col1: artists[15] , col2: tracks[15], col3: previews[15] },
      { id: 17, col1: artists[16] , col2: tracks[16], col3: previews[16] },
      { id: 18, col1: artists[17] , col2: tracks[17], col3: previews[17] },
      { id: 19, col1: artists[18] , col2: tracks[18], col3: previews[18] },
      { id: 20, col1: artists[19] , col2: tracks[19], col3: previews[19] },
      { id: 21, col1: artists[20] , col2: tracks[20], col3: previews[20] },
      { id: 22, col1: artists[21] , col2: tracks[21], col3: previews[21] },
      { id: 23, col1: artists[22] , col2: tracks[22], col3: previews[22] },
      { id: 24, col1: artists[23] , col2: tracks[23], col3: previews[23] },
      { id: 25, col1: artists[24] , col2: tracks[24], col3: previews[24] },

  
    ];
    const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Artist', width: 200 },
  { field: 'col2', headerName: 'Song', width: 300 },
  {field: 'col3', headerName: 'Preview', width: 200, hide:true},
  {field: 'col4', headerName: 'Button', width:200,
  renderCell: (params: GridCellParams) => (//creates preview link
    <strong>
      <a style={{ color:'blue'}}  href={params.getValue(params.id,'col3')} target="_blank">
        <h3>preview </h3>
      </a>
    </strong>
  ),
  }
  ];
//determines if the data table should be shown
  
  //console.log('tracks3', tracks)
  if (tracks.length==25) {
    output = <DataGrid checkboxSelection rows={rows} columns={columns} />;
    // ready=true
    // console.log('ready',ready)
  }
  //creates drop down for countries
  const items=[]
    for (let i = 0; i < countries.length; i++){ 
    items.push(<MenuItem value={countries[i]}>{countries[i]}</MenuItem>)
    }
    
  

    return (
      
      <div>
        <AppBar  position="fixed" style= {{paddingLeft: '15px' }}>
                  <h1>Sounds of the World</h1>
        </AppBar>
        <div className ={classes.main}>
          <FormControl className= {classes.formControl}>
            <InputLabel style= {{}}> What Country are you visiting?</InputLabel>
            <Select onChange={handleChange}>
              {items}
            </Select> 
          </FormControl>
          <button onClick={createPlaylist}  style= {{font: '40px', height:'40px',marginLeft: '40px', background:'#002699', color:'white'  }}>Create New PLaylist</button>
          <div style={{ height: 500, width: '80%', }} >
            {output}
          </div >
        </div>
      </div>
    
  );
}
