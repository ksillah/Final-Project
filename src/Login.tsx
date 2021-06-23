
import { makeStyles } from '@material-ui/core';
import {CLIENTID} from './variables'
import {Theme,createStyles,AppBar} from '@material-ui/core';

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


const clientId = CLIENTID;
const redirectUri = "http://localhost:3000/callback/"; 
const AUTH_URL =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=streaming%20user-read-email%20user-read-private%20playlist-modify-public%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export const Login = ()=>{
  const classes = useStyles();
    return (
        <div>
        <AppBar  position="fixed" style= {{paddingLeft: '15px' }}>
                  <h1>Sounds of the World</h1> 
        </AppBar>
          <div className={classes.main} >
              <h3 style={{fontSize: '30px',color:'#00008B'}}>Learn Which Songs Are Popular In Other Countries</h3> 
            <a className={classes.login_button} href={AUTH_URL}> Login With Spotify </a>
          </div> 
        </div>
        
    )
}