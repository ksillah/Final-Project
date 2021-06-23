import {useState} from 'react';
import Player from './Player'
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import {Select, FormControl, InputLabel, AppBar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridCellParams, } from '@material-ui/data-grid';
import { useGridApiRef } from '@material-ui/x-grid';
const cors=require('cors')

const countries = [
 'Austria','Argentina','Australia','Belgium','Bolivia','Brazil','Bulgaria','Canada','Chile','Colombia','Costa Rica','Czech Republic',
'Denmark','Dominican Republic','Ecuador','El Salvador','Estonia','France','Germany','Greece','Guatemala','Honduras','Hong Kong','Hungary',
'Iceland','India','Indonesia', 'Ireland','Israel','Italy','Japan','Latvia','Lithuania','Luxembourg','Malaysia','Mexico','Morocco','Netherlands',
'New Zealand','Nicaragua','Nigeria','Norway','Panama','Paraguay','Peru','Philippines','Poland','Portugal','Puerto Rico','Romania','Russia','Saudi Arabia',
'Singapore','Slovakia','South Africa','South Korea','Spain','Sweden','Switzerland','Taiwan','Thailand','Turkey','Ukraine','United Emirates',
'United Kingdom','United States','Uruguay', 'Vietnam']
let my_id=''


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
    paddingTop: '100px',
},
  formControl:{
    position: 'relative',
    maxWidth:'30%',
    width: '50%',
    
  },
  made:{
    paddingLeft:'200px', 
    display:'block',
    margin:'10px',
    padding:'10px',

  }
}));

const spotifyApi= new SpotifyWebApi({
  clientId: "27f19ced5a414e7498169bdd52708cd5",
})


 export default function Dashboard({code} ) {
  
    var [playlist_id, setPlaylist_id] = useState('');
    var [artists,setArtist]= useState([] as any);
    var [tracks,setTrack]= useState([] as any);
    var [previews,setPreview]= useState([] as any);
    var[uris,setUris]=useState([] as any);
    var [select,setSelection] = useState([]);
    var [made, setmade]=useState([] as any);
    var [titles, setTitles]=useState([] as any);
    var[recent, setrecent]=useState([] as any);
    var[old, setOld]= useState([]);

    //Gets the user selected country
    const accessToken=useAuth(code);
    console.log('access', accessToken)
    const classes= useStyles();
    const [value, setValue] = useState('');
    const handleChange = e => setValue(e.target.value)//identifies the user selected country
    const apiRef = useGridApiRef();

    useEffect(() =>{
      if (!accessToken) return
      spotifyApi.setAccessToken(accessToken!)
    }, [accessToken])

    useEffect(()=>{
      if (!value) return
      if (!accessToken) return
      spotifyApi.setAccessToken(accessToken!)
      spotifyApi.searchPlaylists("Top 50 - "+ value).then(function(data) {//finds the top 50 playlist for the selected country
        if (value=="United Kingdom"){
          setPlaylist_id( (data.body.playlists!).items[3].id)
        }
        else{
          setPlaylist_id( (data.body.playlists!).items[0].id)

        }
        
      })
    }, [accessToken, value,playlist_id])
    
    useEffect(()=>{//puts the top 25 songs into table
      
      if (!accessToken) return
      if (playlist_id=='') return
      spotifyApi.setAccessToken(accessToken!)
      
        spotifyApi.getPlaylistTracks(playlist_id,{fields: 'items'}).then(//Gets data for the top 25 tracks
        function(data) {
          
          artists=[];
          tracks=[];
          previews=[];
          uris=[];
          for (var i = 0; i < 25; i++) {
            var artist=data.body.items[i].track.artists[0].name
            var track=data.body.items[i].track.name
            var preview= data.body.items[i].track.preview_url
            if(preview==null){
              preview=data.body.items[i].track.uri
              }
            var uri= data.body.items[i].track.uri
            previews.push(preview)
            artists.push(artist)
            tracks.push(track)
            uris.push(uri)
        }
          setArtist(artists);
          setTrack(tracks);
          setPreview(previews)
          setUris(uris)
          })
          
    }, [accessToken, value,playlist_id])
    let output;
    
    function createPlaylist() {
      if (!accessToken) return
      if (output=='') return
      spotifyApi.setAccessToken(accessToken!)
      spotifyApi.createPlaylist( `My ${value} playlist`, { 'description': `My favorite songs from the top 25 songs in ${value} right now!`, 'public': true })
      .then(function(data) {
      my_id=data.body.id
      alert('Your new playlist has been created')
      made.push(data.body.uri)
      setmade(made)
      titles.push(data.body.name)
      setTitles(titles)
      }, function(err) {
        console.log('Something went wrong!', err);
        });
    };
    
    function addTracks() {//adds tracks to playlist
      spotifyApi.setAccessToken(accessToken!)
      var selectedSongs=[] as  any;
      var x
      for (let x=0; x< select.length;x++){
        selectedSongs.push(uris[(select[x]-1)])
      }
      spotifyApi.addTracksToPlaylist(my_id,selectedSongs)
      .then(function(data) {
      alert('The tracks have been added to your playlist')
      }, function(err) {
        console.log('Something went wrong add tracks!', err);
        return;
        });
        
    };
    function addToLibrary() {//Addds tracks to liked songs instead of creating a playlist
      spotifyApi.setAccessToken(accessToken!)
      var selectedSongs=[] as any;
      var x
      var val=''
      for (let x=0; x< select.length;x++){
        val=uris[(select[x]-1)]
        selectedSongs.push(val.slice(14) )
      }
      spotifyApi.addToMySavedTracks(selectedSongs)
      .then(function(data) {
      alert('The tracks have been added to your library')
      }, function(err) {
        console.log('Something went wrong add tracks!', err);
        return;
        });
    };
    
    //structure of table
    const rows: GridRowsProp = [
      { id: 1, col1: artists[0] , col2: tracks[0], col3: previews[0], col4: uris[0]},
      { id: 2, col1: artists[1] , col2: tracks[1], col3: previews[1], col4: uris[1] },
      { id: 3, col1: artists[2] , col2: tracks[2], col3: previews[2], col4: uris[2] },
      { id: 4, col1: artists[3] , col2: tracks[3], col3: previews[3], col4: uris[3] },
      { id: 5, col1: artists[4] , col2: tracks[4], col3: previews[4], col4: uris[4] },
      { id: 6, col1: artists[5] , col2: tracks[5], col3: previews[5], col4: uris[5] },
      { id: 7, col1: artists[6] , col2: tracks[6], col3: previews[6], col4: uris[6] },
      { id: 8, col1: artists[7] , col2: tracks[7], col3: previews[7], col4: uris[7] },
      { id: 9, col1: artists[8] , col2: tracks[8], col3: previews[8], col4: uris[8] },
      { id: 10, col1: artists[9] , col2: tracks[9], col3: previews[9], col4: uris[9] },
      { id: 11, col1: artists[10] , col2: tracks[10], col3: previews[10], col4: uris[10] },
      { id: 12, col1: artists[11] , col2: tracks[11], col3: previews[11], col4: uris[11] },
      { id: 13, col1: artists[12] , col2: tracks[12], col3: previews[12], col4: uris[12] },
      { id: 14, col1: artists[13] , col2: tracks[13], col3: previews[13], col4: uris[13] },
      { id: 15, col1: artists[14] , col2: tracks[14], col3: previews[14], col4: uris[14] },
      { id: 16, col1: artists[15] , col2: tracks[15], col3: previews[15], col4: uris[15] },
      { id: 17, col1: artists[16] , col2: tracks[16], col3: previews[16], col4: uris[16] },
      { id: 18, col1: artists[17] , col2: tracks[17], col3: previews[17], col4: uris[17] },
      { id: 19, col1: artists[18] , col2: tracks[18], col3: previews[18], col4: uris[18] },
      { id: 20, col1: artists[19] , col2: tracks[19], col3: previews[19], col4: uris[19] },
      { id: 21, col1: artists[20] , col2: tracks[20], col3: previews[20], col4: uris[20] },
      { id: 22, col1: artists[21] , col2: tracks[21], col3: previews[21], col4: uris[21] },
      { id: 23, col1: artists[22] , col2: tracks[22], col3: previews[22], col4: uris[22] },
      { id: 24, col1: artists[23] , col2: tracks[23], col3: previews[23], col4: uris[23] },
      { id: 25, col1: artists[24] , col2: tracks[24], col3: previews[24], col4: uris[24] },
    ];
    const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Artist', width: 200 },
  { field: 'col2', headerName: 'Song', width: 300 },
  {field: 'col3', headerName: 'Preview', width: 200, hide:true},
  {field:'col4', headerName:'Uri', width:200,hide:true },
  {field: 'col5', headerName: 'Button', width:200,
  renderCell: (params: GridCellParams) => (//creates preview link
    <strong>
      <a style={{ color:'blue'}}  href={String(params.getValue(params.id,'col4'))} >

        <h3>PREVIEW </h3>
      </a>
    </strong>),}
  
  ];
  const handleRowSelection = (e) => {//keeps track of the current list of selected songs and the previous list of selected songs
    setOld(select)
    setSelection(e.selectionModel);
    
  }
  useEffect(()=>{//identifies which song was just selected and should be played on the spotify player
  if (select.length==1){
    setrecent(select[0]-1)
    return
  }
  for (let x=0; x < old.length; x++ in old){
    if(old[x]!=select[x]){
      setrecent(select[x]-1)
      return
    }
  }
  setrecent(select[select.length-1]-1)
  }, [old,select]);
  

  //determines if the data table should be shown
  if (tracks.length>0) {
    output = <DataGrid checkboxSelection   onSelectionModelChange = {handleRowSelection} rows={rows} columns={columns} />;
    
  }
  //displays created playlists
  let userPlaylists=[] as any
  if (made.length>0){
    userPlaylists=[<h3>View Your Playlists Here </h3>]
    for (let i = 0; i < made.length; i++){ 
  
      userPlaylists.push(<a style={{textDecoration:'none', fontSize:'20px', padding: '20px'}}href={made[i]} >{titles[i]} </a>)
      userPlaylists.push( <br></br>)
      userPlaylists.push( <br></br>)
    }
  }
  
  //creates drop down for countries
    const items=[] as any
    for (let i = 0; i < countries.length; i++){ 
    items.push(<MenuItem value={countries[i]}>{countries[i]}</MenuItem>)
    }
    return (
      
      <div>
        <AppBar  position="fixed" style= {{paddingLeft: '15px' }}>
                  <h1>Sounds of the World</h1> 
        </AppBar>
        <div className ={classes.main}>
        <div style={{paddingBottom: '100px'}} >
            <Player accessToken={accessToken} trackUri={uris[recent]} />
            </div>
          <FormControl className= {classes.formControl}>
            <InputLabel style= {{}}> Please Select A Country</InputLabel>
            <Select onChange={handleChange}>
              {items}
            </Select> 
          </FormControl>
          <button onClick={createPlaylist}  style= {{font: '40px', height:'40px',marginLeft: '40px', background:'#002699', color:'white'  }}>Create New PLaylist</button>
          <button onClick={addTracks}  style= {{font: '40px', height:'40px',marginLeft: '40px', background:'#002699', color:'white'  }}>Add Tracks</button> 
          <button onClick={addToLibrary}  style= {{font: '40px', height:'40px',marginLeft: '40px', background:'#002699', color:'white'  }}>Add To liked tracks</button> 
          <div style={{ height: 500, width: '100%', display:'flex',  }} >
            <div style={{width: '60%'}}>
            {output}
            </div>
            <div className={classes.made}>
              {userPlaylists}
            </div>
          </div >
        </div>
      </div> 
    );
    }
