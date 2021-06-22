import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import {  Login } from './components';
import Playlists from './Playlists';
import{BrowserRouter as Router, Switch, Route} from 'react-router-dom';


const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return code ? <Dashboard code={code} /> : <Login />
  
  
}

export default App ;

