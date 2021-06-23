
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({accessToken, trackUri}){
    const [play, setplay]= useState(false)
    useEffect(()=> setplay(true),[trackUri])

    if (!accessToken) return null
    return (<SpotifyPlayer
    token={accessToken}
    showSaveIcon
    callback={state =>{
        if(!state.isPlaying) setplay(false)
    }}
    play={play}
    uris={trackUri ? [trackUri]: []}
    />
    )
}