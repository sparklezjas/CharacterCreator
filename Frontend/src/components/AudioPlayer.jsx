import React from 'react'
import ReactPlayer from 'react-player'
import ReactDOM from 'react-dom'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import song1 from '../music/Kirk Osamayo - 8 Bit Ancient Ruins.mp3'
import song2 from '../music/Kevin MacLeod - Call to Adventure.mp3'
import song3 from '../music/Kevin MacLeod - Master of the Feast.mp3'


const AudioPlayer = () => {

// class App extends React.Component {
//   constructor() {
//     this.audioInstance = null
//   }
// }

  return (
    
    <div className="AudioPlayer" style={{
      width:"300px",
      margin:"auto",
      marginTop:"20px",
      marginBottom:"10px",
      opacity:"25%"

    }}>
        
      <ReactPlayer 
      url={song3}
      playing={true}
      light={false}
      volume={.4}
      loop={true}
      controls={true}
      width="350px"
      height="30px"
      />


        {/* <ReactJkMusicPlayer
        getAudioInstance={(instance) => {
          this.audioInstance = instance
        }}
        />
        <button onClick={() => this.audioInstance.play()}>play</button>
        <button onClick={() => this.audioInstance.pause()}>pause</button>
        <button onClick={() => this.audioInstance.load()}>reload</button>
        <button onClick={() => this.audioInstance.currentTime = 40}>
          change current play time
        </button>
        <button onClick={() => this.audioInstance.playbackRate = 2}>
          change play back rate
        </button>
        <button onClick={() => this.audioInstance.volume = 0.2}>
          change volume
        </button>
        <button onClick={() => this.audioInstance.destroy()}>
          destroy player
        </button>
        <button onClick={this.audio.togglePlay}>toggle play</button>
        <button onClick={this.audio.clear}>clear audio lists</button>
        <button onClick={this.audio.playNext}>play next</button>
        <button onClick={this.audio.playPrev}>play prev</button>
        <button onClick={() => this.audio.playByIndex(1)}>play by index</button>
        <button onClick={() => this.audio.updatePlayIndex(1)}>
          update play index</button> */}
        
    </div>
  )
}

export default AudioPlayer