import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import CharacterCreator from './pages/CharacterCreator'
import LogoSign from './components/LogoSign'
import EditCharacter from './pages/EditCharacter'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <LogoSign/>
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
              
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;