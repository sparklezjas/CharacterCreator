import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import CharacterCreator from './pages/CharacterCreator'
import EditCharacter from './pages/EditCharacter'
import GameComponent from './pages/GameComponent'
import SecondPage from './pages/SecondPage'
import Fight from './pages/Fight'
import AudioPlayer from './components/AudioPlayer'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>

          <AudioPlayer/>
          <Navbar />
          
        <div className="pages">
          <Routes>
            <Route
              path="/characters/all"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/characters/all" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/characters/all" />}
            />
            <Route
              path="/characters/new"
              element={!user ? <Login /> : <CharacterCreator/>}/>
            
            <Route
              path="/characters/edit/:id"
              element={!user ? <Login /> : <EditCharacter/>}/>
          <Route
              path="/typingtrials"
              element={!user ? <Login /> : <GameComponent/>}/>  
          <Route
              path="/typingtrials2"
              element={!user ? <Login /> : <SecondPage/>}/>  
          <Route
              path="/typingtrials3"
              element={!user ? <Login /> : <Fight/>}/>  
              
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;